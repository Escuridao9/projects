-- usar base dados do sistema
USE master;
GO

-- criar a nossa base dados (se ainda nao existir)
IF NOT EXISTS(SELECT *
FROM sys.databases
WHERE NAME='bd_test')
BEGIN
    CREATE DATABASE "bd_test"
END
GO

-- usar a nossa base de dados
USE bd_test
GO

-- limpeza preventiva (apaga antigas se voltar a executar)
DROP TABLE IF EXISTS [payment_records];
DROP TABLE IF EXISTS [charge_session_records];
DROP TABLE IF EXISTS [clients_records];
DROP TABLE IF EXISTS [tariff_records];
DROP TABLE IF EXISTS [maintenance_records];
DROP TABLE IF EXISTS [station_records];
DROP TABLE IF EXISTS [payment];
DROP TABLE IF EXISTS [charge_session];
DROP TABLE IF EXISTS [reservation];
DROP TABLE IF EXISTS [maintenance];
DROP TABLE IF EXISTS [vehicle];
DROP TABLE IF EXISTS [station_connector];
DROP TABLE IF EXISTS [client_role];
DROP TABLE IF EXISTS [station];
DROP TABLE IF EXISTS [client];
DROP TABLE IF EXISTS [tariff];
DROP TABLE IF EXISTS [role];
DROP TABLE IF EXISTS [connector];
DROP TABLE IF EXISTS [municipality];
GO

--TABELAS INDEPENDENTES (sem FK's): municipality, connector, role, tariff

CREATE TABLE [municipality]
(
    [id_municipality] INT IDENTITY(1,1), 
    [name] VARCHAR(100) NOT NULL,

    CONSTRAINT PK_municipality PRIMARY KEY ([id_municipality]),
    CONSTRAINT UQ_municipality_name UNIQUE ([name])
);
GO

CREATE TABLE [connector]
(
    [id_connector] INT IDENTITY(1,1),
    [name] CHAR(3) NOT NULL,
    [description] VARCHAR(250) NULL,

    CONSTRAINT PK_connector PRIMARY KEY ([id_connector]),
    CONSTRAINT UQ_connector_name UNIQUE ([name]),
    CONSTRAINT CHK_connector_name_upper CHECK ([name] NOT LIKE '%[^A-Z ]%' COLLATE Latin1_General_CS_AS),
    -- permitir null ou aceitar tudo com acentos e cedilhas (menos strings vazias)
    CONSTRAINT CHK_connector_description CHECK ([description] IS NULL OR LTRIM(RTRIM([description])) <> '')
);
GO

CREATE TABLE [role] 
(
    [id_role] INT IDENTITY(1,1),
    [name] VARCHAR(50) NOT NULL,
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_role PRIMARY KEY ([id_role]),
    CONSTRAINT UQ_role_name UNIQUE ([name]),
    CONSTRAINT CHK_role_name CHECK ([name] NOT LIKE '%[^a-z ]%' COLLATE Latin1_General_CI_AI),
    CONSTRAINT CHK_role_observations CHECK ([observations] IS NULL OR LTRIM(RTRIM([observations])) <> '')

    );
GO

CREATE TABLE [tariff]
(
    [id_tariff] INT IDENTITY(1,1),
    [name] VARCHAR(50) NOT NULL,
    [charge_type] VARCHAR(20) NOT NULL,
    [price] DECIMAL(4,2) NOT NULL,
    [activation_fee] DECIMAL (4,2) NULL,
    [active] BIT NOT NULL DEFAULT 1,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [cessation_date] DATETIME NULL,

    CONSTRAINT PK_tariff PRIMARY KEY ([id_tariff]),
    CONSTRAINT CHK_tariff_name CHECK ([name] NOT LIKE '%[^a-z ]%' COLLATE Latin1_General_CI_AI),
    CONSTRAINT CHK_tariff_charge_type CHECK ([charge_type] NOT LIKE '%[^a-z ]%' COLLATE Latin1_General_CI_AI),
    CONSTRAINT CHK_tariff_price CHECK ([price] > 0),
    CONSTRAINT CHK_tariff_activation_fee CHECK ([activation_fee] IS NULL OR [activation_fee] >= 0),
    CONSTRAINT CHK_tariff_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_tariff_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL) 
        )
);
GO

-- nome único apenas para tarifas ativas (não podemos por unique em cima)
CREATE UNIQUE INDEX UQ_active_tariff_name 
ON [tariff]([name]) 
WHERE [active] = 1;
GO

-- TABELAS DE ENTIDADES PRINCIPAIS

CREATE TABLE [station] (
    [id_station] INT IDENTITY(1,1),
    [code] CHAR(4) NOT NULL,
    [id_municipality] INT NOT NULL,
    [power] DECIMAL(5,2) NOT NULL,
    [active] BIT NOT NULL DEFAULT 1,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [cessation_date] DATETIME NULL,

    CONSTRAINT PK_station PRIMARY KEY ([id_station]),
    CONSTRAINT UQ_station_code UNIQUE ([code]),
    CONSTRAINT FK_station_municipality FOREIGN KEY ([id_municipality]) REFERENCES [municipality]([id_municipality]),
    CONSTRAINT CHK_station_code CHECK ([code] COLLATE Latin1_General_CS_AS LIKE 'S[0-9][0-9][0-9]'),
    CONSTRAINT CHK_station_power CHECK ([power] > 0),
    CONSTRAINT CHK_station_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_station_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL) 
        )
);
GO

CREATE TABLE [client] (
    [id_client] INT IDENTITY(1,1),
    [first_name] VARCHAR(50) NOT NULL,
    [last_name] VARCHAR(50) NOT NULL,
    [tif] CHAR(9) NOT NULL,
    [sex] CHAR(1) NOT NULL,
    [dob] DATE NULL,
    [address] VARCHAR(100) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [type] VARCHAR(20) NOT NULL,
    [active] BIT NOT NULL DEFAULT 1,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [cessation_date] DATETIME NULL,

    CONSTRAINT PK_client PRIMARY KEY ([id_client]),  
    CONSTRAINT UQ_client_tif UNIQUE ([tif]),
    CONSTRAINT UQ_client_email UNIQUE ([email]),

    -- Primeira letra maiuscula e apenas letras/espacos no restante
    CONSTRAINT CHK_client_first_name_upper CHECK (LEFT([first_name], 1) COLLATE Latin1_General_CS_AI LIKE '[A-Z]'),
    CONSTRAINT CHK_client_first_name_chars CHECK ([first_name] NOT LIKE '%[^a-z ]%' COLLATE Latin1_General_CI_AI),

    -- Primeira letra maiuscula e apenas letras/espacos/pontos no restante (para S.A. / Lda.)
    CONSTRAINT CHK_client_last_name_upper CHECK (LEFT([last_name], 1) COLLATE Latin1_General_CS_AI LIKE '[A-Z]'),
    CONSTRAINT CHK_client_last_name_chars CHECK ([last_name] NOT LIKE '%[^a-z .]%' COLLATE Latin1_General_CI_AI),

    CONSTRAINT CHK_client_tif_chars CHECK ([tif] NOT LIKE '%[^0-9]%'),
    CONSTRAINT CHK_client_type CHECK ([type] IN ('individual', 'company')),
    
    -- Empresa (sex 'N'): null, Particular: obrigatoriamente preenchido (F, M, Other) 
    CONSTRAINT CHK_client_type_coherence CHECK (
        ([type] = 'empresa' AND [sex] = 'N' AND [dob] IS NULL) OR
        ([type] = 'particular' AND [sex] IN ('M', 'F', 'O') AND [dob] IS NOT NULL AND [dob] <= DATEADD(YEAR, -18, GETDATE()))
    ),
    
    CONSTRAINT CHK_client_registration_date CHECK ([registration_date] <= GETDATE()),
    CONSTRAINT CHK_client_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_client_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL) 
        )
);
GO

-- TABELAS DE ASSOCIACAO E SECUNDARIAS

CREATE TABLE [station_connector]
(
    [id_station] INT NOT NULL,
    [id_connector] INT NOT NULL,

    CONSTRAINT PK_station_connector PRIMARY KEY ([id_station], [id_connector]),
    CONSTRAINT FK_station_connector_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]), 
    CONSTRAINT FK_station_connector_connector FOREIGN KEY ([id_connector]) REFERENCES [connector]([id_connector])
);
GO

CREATE TABLE [client_role] 
(
    [id_client] INT NOT NULL,
    [id_role] INT NOT NULL,

    CONSTRAINT PK_client_role PRIMARY KEY ([id_client], [id_role]),
    CONSTRAINT FK_clientrole_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_clientrole_role FOREIGN KEY ([id_role]) REFERENCES [role]([id_role])
);
GO

CREATE TABLE [vehicle] 
(
    [id_vehicle] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [licence_plate] VARCHAR(20) NOT NULL,
    [country] VARCHAR(50) NOT NULL,
    [year] INT NOT NULL,
    [brand] VARCHAR(50) NOT NULL,

    CONSTRAINT PK_vehicle PRIMARY KEY ([id_vehicle]),
    CONSTRAINT FK_vehicle_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT UQ_vehicle_licence_plate UNIQUE ([licence_plate]),
    CONSTRAINT CHK_vehicle_licence_plate CHECK ([licence_plate] NOT LIKE '%[^a-zA-Z0-9 -]%'),
    CONSTRAINT CHK_vehicle_country_chars CHECK ([country] NOT LIKE '%[^a-zA-Z ]%'),
    CONSTRAINT CHK_vehicle_country_first_upper CHECK (LEFT([country], 1) COLLATE Latin1_General_CS_AS LIKE '[A-Z]'),
    CONSTRAINT CHK_vehicle_year CHECK ([year] >= 1900 AND [year] <= YEAR(GETDATE())),
    CONSTRAINT CHK_vehicle_brand_chars CHECK ([brand] NOT LIKE '%[^a-zA-Z0-9 -]%')
);
GO

CREATE TABLE [maintenance] 
(
    [id_maintenance] INT IDENTITY(1,1),
    [id_station] INT NOT NULL,
    [type] VARCHAR(50) NOT NULL,
    [description] VARCHAR(250) NULL,
    [status] VARCHAR(20) NOT NULL,
    [start_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [end_date] DATETIME NULL,
    [cost] DECIMAL(10,2) NULL,

    CONSTRAINT PK_maintenance PRIMARY KEY ([id_maintenance]),
    CONSTRAINT FK_maintenance_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]),
    CONSTRAINT CHK_maintenance_type_chars CHECK ([type] NOT LIKE '%[^a-z ]%' COLLATE Latin1_General_CI_AI),
    CONSTRAINT CHK_maintenance_description CHECK ([description] IS NULL OR LTRIM(RTRIM([description])) <> ''),
    
    CONSTRAINT CHK_maintenance_status CHECK ([status] IN ('open', 'in process', 'resolved')),
    CONSTRAINT CHK_maintenance_status_coherence CHECK (
        ([status] IN ('open', 'in process') AND [end_date] IS NULL AND [cost] IS NULL) OR
        ([status] = 'resolved' AND [end_date] IS NOT NULL AND [cost] IS NOT NULL)),
    CONSTRAINT CHK_maintenance_end_date_after_start_date CHECK ([end_date] IS NULL OR [end_date] >= [start_date]),
    CONSTRAINT CHK_maintenance_cost CHECK ([cost] IS NULL OR [cost] >= 0)
);
GO

CREATE TABLE [reservation] 
(
    [id_reservation] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [id_station] INT NOT NULL,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [start_date_hour] DATETIME NOT NULL,
    [end_date_hour] DATETIME NOT NULL,
    [status] VARCHAR(20) NOT NULL,

    CONSTRAINT PK_reservation PRIMARY KEY ([id_reservation]),
    CONSTRAINT FK_reservation_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_reservation_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]),
    CONSTRAINT CHK_reservation_end_date_after_start_date CHECK ([end_date_hour] > [start_date_hour]),
    CONSTRAINT CHK_reservation_registration CHECK ([start_date_hour] >= [registration_date]),
    CONSTRAINT CHK_reservation_registration_past CHECK ([registration_date] <= GETDATE()),
    CONSTRAINT CHK_reservation_status CHECK ([status] IN ('active', 'completed', 'cancelled', 'expired'))
);
GO

-- TABELA CENTRAL DE OPERACAO

CREATE TABLE [charge_session] 
(
    [id_charge] INT IDENTITY(1,1),
    [id_station] INT NOT NULL,
    [id_client] INT NOT NULL,
    [id_driver] INT NOT NULL,
    [id_vehicle] INT NOT NULL,
    [id_tariff] INT NOT NULL,
    [id_connector] INT NOT NULL,
    [id_reservation] INT NULL,
    [start_date_hour] DATETIME NOT NULL DEFAULT GETDATE(),
    [end_date_hour] DATETIME NULL,
    [energy] DECIMAL(6,2) NULL,
    [status] VARCHAR(20) NOT NULL,

    CONSTRAINT PK_charge_session PRIMARY KEY ([id_charge]),
    CONSTRAINT FK_charge_session_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]),
    CONSTRAINT FK_charge_session_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_charge_session_driver FOREIGN KEY ([id_driver]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_charge_session_vehicle FOREIGN KEY ([id_vehicle]) REFERENCES [vehicle]([id_vehicle]),
    CONSTRAINT FK_charge_session_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT FK_charge_session_connector FOREIGN KEY ([id_connector]) REFERENCES [connector]([id_connector]),
    CONSTRAINT FK_charge_session_reservation FOREIGN KEY ([id_reservation]) REFERENCES [reservation]([id_reservation]),
    CONSTRAINT CHK_charge_session_end_date CHECK ([end_date_hour] IS NULL OR [end_date_hour] >= [start_date_hour]),
    CONSTRAINT CHK_charge_session_energy CHECK ([energy] IS NULL OR [energy] >= 0),
    CONSTRAINT CHK_charge_session_status_coherence CHECK (
    -- "in process" - obrigatoriamente nao tem end_date nem energy
    ([status] = 'in progress' AND [end_date_hour] IS NULL AND [energy] IS NULL) OR 
    -- "terminated" ou "invoiced" - obrigatoriamente tem end_data e energy
    ([status] IN ('terminated', 'invoiced') AND [end_date_hour] IS NOT NULL AND [energy] IS NOT NULL) OR
    -- "cancelled"
    ([status] = 'cancelled' AND [end_date_hour] = [start_date_hour] AND [energy] = 0.00))
);
GO

--TABELAS FINANCEIRAS E HISTORICOS

CREATE TABLE [payment] 
(
    [id_payment] INT IDENTITY(1,1),
    [id_charge] INT NOT NULL,
    [invoiced_amount] DECIMAL(10,2) NOT NULL,
    [paid_amount] DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    [method] VARCHAR(30) NULL,
    [frequency] VARCHAR(30) NOT NULL,
    [status] VARCHAR(20) NOT NULL,
    [invoice_date] DATE NOT NULL DEFAULT GETDATE(),
    [payment_deadline] DATE NOT NULL DEFAULT DATEADD(DAY, 30, GETDATE()), -- default é 30 dias a partir da invoice_date

    CONSTRAINT PK_payment PRIMARY KEY ([id_payment]),
    CONSTRAINT FK_payment_charge_session FOREIGN KEY ([id_charge]) REFERENCES [charge_session]([id_charge]),
    CONSTRAINT CHK_payment_invoiced_amount CHECK ([invoiced_amount] > 0),
    CONSTRAINT CHK_payment_paid_amount CHECK ([paid_amount] >= 0 AND [paid_amount] <= [invoiced_amount]),
    CONSTRAINT CHK_payment_method CHECK (
        [method] IS NULL OR 
        [method] IN ('mb way', 'credit card', 'debit card', 'direct debit', 'bank transfer', 'cash')),
    CONSTRAINT CHK_payment_frequency CHECK ([frequency] IN ('immediate', 'monthly')),
    CONSTRAINT CHK_payment_invoice_date CHECK ([invoice_date] <= CAST(GETDATE() AS DATE)),
    CONSTRAINT CHK_payment_deadline CHECK ([payment_deadline] >= [invoice_date]),
    CONSTRAINT CHK_payment_status_coherence CHECK (
        ([status] = 'paid' AND [paid_amount] = [invoiced_amount]) OR
        ([status] IN ('pending', 'overdue') AND [paid_amount] < [invoiced_amount]) OR
        ([status] = 'cancelled'))
);
GO

CREATE TABLE [station_records] 
(
    [id_station_record] INT IDENTITY(1,1),
    [id_station] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(20) NOT NULL,
    [new_value] VARCHAR(20) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_station_records PRIMARY KEY ([id_station_record]),
    CONSTRAINT FK_stationrecords_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]),
    CONSTRAINT CHK_station_records_mod_date CHECK ([modification_date] <= GETDATE())

);
GO

CREATE TABLE [client_records] 
(
    [id_client_record] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_client_records PRIMARY KEY ([id_client_record]),
    CONSTRAINT FK_client_records_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT CHK_client_records CHECK ([modification_date] <= GETDATE()) 
);
GO

CREATE TABLE [tariff_records]
(
    [id_tariff_record] INT IDENTITY(1,1),
    [id_tariff] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_tariff_records PRIMARY KEY ([id_tariff_record]),
    CONSTRAINT FK_tariff_records_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT CHK_tariff_records_mod_date CHECK ([modification_date] <= GETDATE())

);
GO

CREATE TABLE [charge_session_records] 
(
    [id_charge_record] INT IDENTITY(1,1),
    [id_charge] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_charge_session_records PRIMARY KEY ([id_charge_record]),
    CONSTRAINT FK_charge_session_records_charge_session FOREIGN KEY ([id_charge]) REFERENCES [charge_session]([id_charge]),
    CONSTRAINT CHK_charge_session_records_mod_date CHECK ([modification_date] <= GETDATE()),
);
GO

CREATE TABLE [payment_records] 
(
    [id_payment_record] INT IDENTITY(1,1),
    [id_payment] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_payment_records PRIMARY KEY ([id_payment_record]),
    CONSTRAINT FK_payment_records_payment FOREIGN KEY ([id_payment]) REFERENCES [payment]([id_payment]),
    CONSTRAINT CHK_payment_records_mod_date CHECK ([modification_date] <= GETDATE()),
);
GO

CREATE TABLE [maintenance_records] 
(
    [id_maintenance_record] INT IDENTITY(1,1),
    [id_maintenance] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] NVARCHAR(250) NULL,

    CONSTRAINT PK_maintenance_records PRIMARY KEY ([id_maintenance_record]),
    CONSTRAINT FK_maintenancerecords_maintenance FOREIGN KEY ([id_maintenance]) REFERENCES [maintenance]([id_maintenance]),
    CONSTRAINT CHK_maintenance_records_mod_date CHECK ([modification_date] <= GETDATE())

);
GO