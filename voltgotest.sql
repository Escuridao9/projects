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
DROP TABLE IF EXISTS [client_records];
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

CREATE TABLE [municipality] (
    [id_municipality] INT IDENTITY(1,1), 
    [name] VARCHAR(100) NOT NULL,

    CONSTRAINT PK_municipality PRIMARY KEY ([id_municipality]),
    CONSTRAINT UQ_municipality_name UNIQUE ([name]),
    CONSTRAINT CHK_municipality_name CHECK (TRIM([name]) <> ''));
GO

CREATE TABLE [connector] (
    [id_connector] INT IDENTITY(1,1),
    [name] CHAR(3) NOT NULL,
    [description] VARCHAR(250) NULL,

    CONSTRAINT PK_connector PRIMARY KEY ([id_connector]),
    CONSTRAINT UQ_connector_name UNIQUE ([name]),
    -- garante 3 letras maiusculas
    CONSTRAINT CHK_connector_name_upper CHECK ([name] COLLATE Latin1_General_CS_AS LIKE '[A-Z][A-Z][A-Z]'),
    -- tirar os espaços do início e do fim e impede string vazia
    CONSTRAINT CHK_connector_description CHECK ([description] IS NULL OR TRIM([description]) <> ''));
GO

CREATE TABLE [role] (
    [id_role] INT IDENTITY(1,1),
    [name] VARCHAR(50) NOT NULL,
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_role PRIMARY KEY ([id_role]),
    CONSTRAINT UQ_role_name UNIQUE ([name]),
    CONSTRAINT CHK_role_name CHECK ([name] COLLATE Latin1_General_CS_AS IN ('account holder', 'driver', 'paying entity')),
    CONSTRAINT CHK_role_observations CHECK ([observations] IS NULL OR TRIM([observations]) <> ''));
GO

CREATE TABLE [tariff] (
    [id_tariff] INT IDENTITY(1,1),
    [name] VARCHAR(50) NOT NULL,
    [version] INT NOT NULL DEFAULT 1,
    [charge_type] VARCHAR(20) NOT NULL,
    [price] DECIMAL(4,2) NOT NULL,
    [activation_fee] DECIMAL (4,2) NULL,
    [active] BIT NOT NULL DEFAULT 1,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [cessation_date] DATETIME NULL,

    CONSTRAINT PK_tariff PRIMARY KEY ([id_tariff]),
    CONSTRAINT UQ_tariff_name_version UNIQUE ([name], [version]),
    CONSTRAINT CHK_tariff_name CHECK (
        TRIM([name]) <> ''
        AND [name] NOT LIKE '%[^a-zA-Zà-üÀ-Ü]%'
        AND [name] COLLATE Latin1_General_CS_AS = UPPER(LEFT([name], 1)) + LOWER(SUBSTRING([name], 2, LEN([name])))),    
    CONSTRAINT CHK_tariff_version CHECK ([version] >= 1),
    CONSTRAINT CHK_tariff_charge_type CHECK ([charge_type] COLLATE Latin1_General_CS_AS IN ('standard', 'fast')),
    CONSTRAINT CHK_tariff_price CHECK ([price] > 0),
    CONSTRAINT CHK_tariff_activation_fee CHECK ([activation_fee] IS NULL OR [activation_fee] >= 0),
    CONSTRAINT CHK_tariff_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_tariff_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL))
        );
GO

-- para garantir que apenas 1 versão ativa por nome de tarifa)
CREATE UNIQUE INDEX UQ_active_tariff_name 
ON [tariff]([name]) 
WHERE [active] = 1;
GO

-- TABELAS DE ENTIDADES PRINCIPAIS

CREATE TABLE [station] (
    [id_station] INT IDENTITY(1,1),
    [id_municipality] INT NOT NULL,
    [code] CHAR(4) NOT NULL,
    [standard_power] DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    [fast_power] DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    [active] BIT NOT NULL DEFAULT 1,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [cessation_date] DATETIME NULL,

    CONSTRAINT PK_station PRIMARY KEY ([id_station]),
    CONSTRAINT FK_station_municipality FOREIGN KEY ([id_municipality]) REFERENCES [municipality]([id_municipality]),
    CONSTRAINT UQ_station_code UNIQUE ([code]),
    CONSTRAINT CHK_station_code CHECK ([code] COLLATE Latin1_General_CS_AS LIKE 'S[0-9][0-9][0-9]'),
    CONSTRAINT CHK_station_standard_power CHECK ([standard_power] <= 20.00),
    CONSTRAINT CHK_station_fast_power CHECK ([fast_power] > 20.00),
    CONSTRAINT CHK_station_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_station_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL) 
        ));
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
    -- primeira letra maiuscula e apenas letras/espacos no restante
    CONSTRAINT CHK_client_first_name_upper CHECK (LEFT([first_name], 1) COLLATE Latin1_General_CS_AS LIKE '[A-ZÀ-Ü]'),
    CONSTRAINT CHK_client_first_name_chars CHECK ([first_name] COLLATE Latin1_General_CS_AS NOT LIKE '%[^a-zA-Zà-üÀ-ÜçÇ -]%'),
    -- primeira letra maiuscula e apenas letras/espacos/pontos/traços no restante (para S.A. / Lda.)
    CONSTRAINT CHK_client_last_name_upper CHECK (LEFT([last_name], 1) COLLATE Latin1_General_CS_AS LIKE '[A-ZÀ-Ü]'),
    CONSTRAINT CHK_client_last_name_chars CHECK ([last_name] COLLATE Latin1_General_CS_AS NOT LIKE '%[^a-zA-Zà-üÀ-ÜçÇ .-]%'),
    CONSTRAINT CHK_client_tif CHECK ([tif] LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
    CONSTRAINT CHK_client_sex CHECK ([sex] COLLATE Latin1_General_CS_AS IN ('M', 'F', 'O', 'N')),
    CONSTRAINT CHK_client_dob CHECK ([dob] >= '1900-01-01'),
    -- evita que seja uma string vazia
    CONSTRAINT CHK_client_address CHECK (TRIM([address]) <> ''),
    CONSTRAINT CHK_client_email CHECK ([email] LIKE '%_@_%._%'),
    CONSTRAINT CHK_client_type CHECK ([type] IN ('individual', 'company')),
    -- empresa (sex 'N'): null; particular: obrigatoriamente preenchido (F, M, Other) 
    CONSTRAINT CHK_client_type_sex_coherence CHECK (
        ([type] = 'company' AND [sex] = 'N' AND [dob] IS NULL) OR
        ([type] = 'individual' AND [sex] IN ('M', 'F', 'O') AND [dob] IS NOT NULL)),
    CONSTRAINT CHK_client_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_client_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL)));
GO

-- TABELAS DE ASSOCIACAO E SECUNDARIAS

CREATE TABLE [station_connector] (
    [id_station] INT NOT NULL,
    [id_connector] INT NOT NULL,

    CONSTRAINT PK_station_connector PRIMARY KEY ([id_station], [id_connector]),
    CONSTRAINT FK_station_connector_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]), 
    CONSTRAINT FK_station_connector_connector FOREIGN KEY ([id_connector]) REFERENCES [connector]([id_connector]));
GO

CREATE TABLE [client_role] (
    [id_client] INT NOT NULL,
    [id_role] INT NOT NULL,

    CONSTRAINT PK_client_role PRIMARY KEY ([id_client], [id_role]),
    CONSTRAINT FK_clientrole_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_clientrole_role FOREIGN KEY ([id_role]) REFERENCES [role]([id_role]));
GO

CREATE TABLE [vehicle] (
    [id_vehicle] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [licence_plate] VARCHAR(20) NOT NULL,
    [country] VARCHAR(50) NOT NULL,
    [year] INT NOT NULL,
    [brand] VARCHAR(50) NOT NULL,

    CONSTRAINT PK_vehicle PRIMARY KEY ([id_vehicle]),
    CONSTRAINT FK_vehicle_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT UQ_vehicle_licence_plate UNIQUE ([licence_plate]),
    CONSTRAINT CHK_vehicle_licence_plate CHECK (TRIM([licence_plate]) <> ''),        
    CONSTRAINT CHK_vehicle_country CHECK (TRIM([country]) <> ''),
    CONSTRAINT CHK_vehicle_year CHECK ([year] >= 1990),
    CONSTRAINT CHK_vehicle_brand CHECK (TRIM([brand]) <> '' AND [brand] COLLATE Latin1_General_CS_AS NOT LIKE '%[^a-zA-Z0-9à-üÀ-Ü -]%')
    );
GO

CREATE TABLE [maintenance]  (
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
    CONSTRAINT CHK_maintenance_type CHECK (TRIM([type]) <> '' AND [type] COLLATE Latin1_General_CS_AS NOT LIKE '%[^a-zA-Zà-üÀ-Ü -]%'),
    CONSTRAINT CHK_maintenance_description CHECK ([description] IS NULL OR TRIM([description]) <> ''),    
    CONSTRAINT CHK_maintenance_status CHECK ([status] IN ('open', 'in process', 'resolved')),
    CONSTRAINT CHK_maintenance_status_coherence CHECK (
        ([status] IN ('open', 'in process') AND [end_date] IS NULL AND [cost] IS NULL) OR
        ([status] = 'resolved' AND [end_date] IS NOT NULL AND [cost] IS NOT NULL)),
    CONSTRAINT CHK_maintenance_end_date_after_start_date CHECK ([end_date] IS NULL OR [end_date] >= [start_date]),
    CONSTRAINT CHK_maintenance_cost CHECK ([cost] IS NULL OR [cost] >= 0));
GO

CREATE TABLE [reservation] (
    [id_reservation] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [id_station] INT NOT NULL,
    [id_connector] INT NOT NULL,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [start_date_hour] DATETIME NOT NULL,
    [end_date_hour] DATETIME NOT NULL,
    [status] VARCHAR(20) NOT NULL,

    CONSTRAINT PK_reservation PRIMARY KEY ([id_reservation]),
    CONSTRAINT FK_reservation_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_reservation_station_connector FOREIGN KEY ([id_station], [id_connector]) REFERENCES [station_connector]([id_station], [id_connector]),
    CONSTRAINT CHK_reservation_end_date_after_start_date CHECK ([end_date_hour] > [start_date_hour]),
    -- damos uma tolerância de 1 minuto na star_date (para evitar erros com os milisegundos)
    CONSTRAINT CHK_reservation_registration CHECK ([start_date_hour] >= DATEADD(MINUTE, -1, [registration_date])),
    CONSTRAINT CHK_reservation_status CHECK ([status] IN ('active', 'completed', 'cancelled', 'expired')));
GO

-- TABELA CENTRAL DE OPERACAO

CREATE TABLE [charge_session] (
    [id_charge] INT IDENTITY(1,1),
    [id_station] INT NOT NULL,
    [id_connector] INT NOT NULL,
    [id_client] INT NOT NULL,
    [id_driver] INT NOT NULL,
    [id_vehicle] INT NOT NULL,
    [id_tariff] INT NOT NULL,
    [id_reservation] INT NULL,
    [start_date_hour] DATETIME NOT NULL DEFAULT GETDATE(),
    [end_date_hour] DATETIME NULL,
    [energy] DECIMAL(6,2) NULL,
    [status] VARCHAR(20) NOT NULL,

    CONSTRAINT PK_charge_session PRIMARY KEY ([id_charge]),
    CONSTRAINT FK_charge_session_station_connector FOREIGN KEY ([id_station], [id_connector]) REFERENCES [station_connector]([id_station], [id_connector]),
    CONSTRAINT FK_charge_session_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_charge_session_driver FOREIGN KEY ([id_driver]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_charge_session_vehicle FOREIGN KEY ([id_vehicle]) REFERENCES [vehicle]([id_vehicle]),
    CONSTRAINT FK_charge_session_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT FK_charge_session_reservation FOREIGN KEY ([id_reservation]) REFERENCES [reservation]([id_reservation]),
    CONSTRAINT CHK_charge_session_end_date CHECK ([end_date_hour] IS NULL OR [end_date_hour] >= [start_date_hour]),
    CONSTRAINT CHK_charge_session_energy CHECK ([energy] IS NULL OR [energy] >= 0),
    CONSTRAINT CHK_charge_session_status CHECK ([status] IN ('in progress', 'terminated', 'invoiced', 'cancelled')),
    CONSTRAINT CHK_charge_session_status_coherence CHECK (
    -- "in process" - obrigatoriamente nao tem end_date nem energy
    ([status] = 'in progress' AND [end_date_hour] IS NULL AND [energy] IS NULL) OR 
    -- "terminated" ou "invoiced" - obrigatoriamente tem end_data e energy
    ([status] IN ('terminated', 'invoiced') AND [end_date_hour] IS NOT NULL AND [energy] IS NOT NULL) OR
    -- "cancelled"
    ([status] = 'cancelled' AND [end_date_hour] = [start_date_hour] AND [energy] = 0.00)));
GO

-- garante que cada reserva só pode ser associada a NO MÁXIMO 1 carregamento 
-- não pode estar no create pois, se uma reservation = NULL, não poderia haver mais nenhuma reservation = NULL
CREATE UNIQUE NONCLUSTERED INDEX UQ_charge_session_reservation 
ON [charge_session]([id_reservation]) 
WHERE [id_reservation] IS NOT NULL;
GO

--TABELAS FINANCEIRAS E HISTORICOS

CREATE TABLE [payment] (
    [id_payment] INT IDENTITY(1,1),
    [id_charge] INT NOT NULL,
    [invoiced_amount] DECIMAL(10,2) NOT NULL,
    [paid_amount] DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    [method] VARCHAR(30) NULL,
    [frequency] VARCHAR(30) NOT NULL,
    [status] VARCHAR(20) NOT NULL,
    [invoice_date] DATE NOT NULL DEFAULT CONVERT(DATE, GETDATE()),
    [payment_deadline] DATE NOT NULL DEFAULT CONVERT(DATE, DATEADD(DAY, 30, GETDATE())), -- default é 30 dias a partir da invoice_date

    CONSTRAINT PK_payment PRIMARY KEY ([id_payment]),
    CONSTRAINT FK_payment_charge_session FOREIGN KEY ([id_charge]) REFERENCES [charge_session]([id_charge]),
    CONSTRAINT CHK_payment_invoiced_amount CHECK ([invoiced_amount] > 0),
    CONSTRAINT CHK_payment_paid_amount CHECK ([paid_amount] >= 0 AND [paid_amount] <= [invoiced_amount]),
    CONSTRAINT CHK_payment_method CHECK (
        [method] IS NULL OR 
        [method] IN ('mb way', 'credit card', 'debit card', 'direct debit', 'bank transfer', 'cash')),
    CONSTRAINT CHK_payment_frequency CHECK ([frequency] IN ('immediate', 'monthly')),
    CONSTRAINT CHK_payment_deadline CHECK ([payment_deadline] >= [invoice_date]),
    CONSTRAINT CHK_payment_status_coherence CHECK (
        ([status] = 'paid' AND [paid_amount] = [invoiced_amount] AND [method] IS NOT NULL) OR
        ([status] IN ('pending', 'overdue') AND [paid_amount] < [invoiced_amount]) OR
        ([status] = 'cancelled' AND [paid_amount] = 0.00)));
GO

CREATE TABLE [station_records]  (
    [id_station_record] INT IDENTITY(1,1),
    [id_station] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_station_records PRIMARY KEY ([id_station_record]),
    CONSTRAINT FK_stationrecords_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]),
    CONSTRAINT CHK_station_records_field CHECK (TRIM([field_changed]) <> ''),
    CONSTRAINT CHK_station_records_obs CHECK ([observations] IS NULL OR TRIM([observations]) <> ''));
GO

CREATE TABLE [client_records] (
    [id_client_record] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_client_records PRIMARY KEY ([id_client_record]),
    CONSTRAINT FK_client_records_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT CHK_client_records_field CHECK (TRIM([field_changed]) <> ''),
    CONSTRAINT CHK_client_records_obs CHECK ([observations] IS NULL OR TRIM([observations]) <> ''));
GO

CREATE TABLE [tariff_records] (
    [id_tariff_record] INT IDENTITY(1,1),
    [id_tariff] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_tariff_records PRIMARY KEY ([id_tariff_record]),
    CONSTRAINT FK_tariff_records_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT CHK_tariff_records_field CHECK (TRIM([field_changed]) <> ''),
    CONSTRAINT CHK_tariff_records_obs CHECK ([observations] IS NULL OR TRIM([observations]) <> ''));
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
    CONSTRAINT CHK_charge_session_records_field CHECK (TRIM([field_changed]) <> ''),
    CONSTRAINT CHK_charge_session_records_obs CHECK ([observations] IS NULL OR TRIM([observations]) <> '')
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
    CONSTRAINT CHK_payment_records_field CHECK (TRIM([field_changed]) <> ''),
    CONSTRAINT CHK_payment_records_obs CHECK ([observations] IS NULL OR TRIM([observations]) <> '')
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
    CONSTRAINT CHK_maintenance_records_field CHECK (TRIM([field_changed]) <> ''),
    CONSTRAINT CHK_maintenance_records_obs CHECK ([observations] IS NULL OR TRIM([observations]) <> '')
);
GO

-- INSERÇÃO DE DADOS

INSERT INTO [municipality] ([name]) VALUES 
('Braga'), ('Porto'), ('Lisboa'), ('Évora'), ('Viana do Castelo'), ('Bragança');
GO

INSERT INTO [connector] ([name], [description]) VALUES 
('CCS', 'Combined Charging System - Fast DC standard in Europe'),
('CHA', 'CHAdeMO - Japanese fast DC standard'),
('TSP', 'Tesla Supercharger Protocol'),
('TYP', 'Type 2 Mennekes - European AC three-phase standard');
GO

INSERT INTO [role] ([name], [observations]) VALUES 
('account holder', 'Account owner responsible for the subscription'),
('driver', 'Vehicle driver conducting charge sessions'),
('paying entity', 'Entity responsible for invoice payments');
GO

INSERT INTO [tariff] ([name], [charge_type], [price], [activation_fee]) VALUES 
('Normal', 'standard', 0.35, 0.50),
('Premium', 'fast', 0.65, 1.00);
GO

INSERT INTO [client] ([first_name], [last_name], [tif], [sex], [dob], [address], [email], [type], [active]) VALUES 
('Ana Maria', 'Silva', '213456789', 'O', '1992-02-29', 'Rua Direita 10, Porto', 'anasilva@email.com', 'individual', 1),
('João', 'Santos', '207654321', 'M', '1985-11-23', 'Avenida Central 45, Lisboa', 'joao.santos@email.com', 'individual', 1),
('Maria', 'Ferreira', '256123789', 'F', '1992-02-14', 'Praca da Republica 5, Coimbra', 'maria_ferreira@email.com', 'individual', 1),
('Tech', 'Lda.', '501234567', 'N', NULL, 'Industrial Park 12, Braga', 'geral@tech.pt', 'company', 1),
('Green Energy', 'S.A.', '509876543', 'N', NULL, 'Av. da Liberdade 100, Lisboa', 'info@greenenergy.pt', 'company', 1);
GO

INSERT INTO [station] ([id_municipality], [code], [standard_power], [fast_power], [active]) VALUES 
(1, 'S001', 20.00, 100.00, 1),
(1, 'S002', 20.00, 100.00, 1),
(1, 'S003', 20.00, 100.00, 1),
(2, 'S004', 20.00, 100.00, 1),
(2, 'S005', 20.00, 100.00, 1),
(3, 'S006', 20.00, 100.00, 1),
(3, 'S007', 20.00, 100.00, 1),
(4, 'S008', 20.00, 60.00, 1),
(4, 'S009', 20.00, 60.00, 1),
(5, 'S010', 20.00, 90.00, 1);
GO

INSERT INTO [station_connector] ([id_station], [id_connector]) VALUES 
(1, 1), (1, 2), (2, 1), (2, 2), (3, 1), (3, 2), (4, 1), (4, 2), (5, 1), (5, 2);
GO

INSERT INTO [client_role] ([id_client], [id_role]) VALUES 
(1, 3), (2, 3), (3, 3), (4, 2), (5, 1);
GO

INSERT INTO [vehicle] ([id_client], [licence_plate], [country], [year], [brand]) VALUES 
(1, '11-AA-22', 'Portugal', 2018, 'Tesla'),
(2, '33-BB-44', 'Portugal', 2020, 'Nissan'),
(3, '55-CC-66', 'Portugal', 2021, 'Renault'),
(4, '77-DD-88', 'Portugal', 2019, 'Volkswagen'),
(4, '99-EE-00', 'Portugal', 2022, 'BMW'),
(5, 'AB-40-10', 'Portugal', 2022, 'Tesla');
GO

INSERT INTO [maintenance] ([id_station], [type], [description], [status], [start_date], [end_date], [cost]) VALUES 
(1, 'Repair', 'Replaced damaged cable on standard port', 'resolved', '2026-01-10 10:00:00', '2026-01-10 12:30:00', 150.00),
(2, 'Inspection', 'Routine power check', 'resolved', '2026-02-15 09:00:00', '2026-02-15 10:30:00', 80.00),
(3, 'Upgrade', 'Firmware update and display screen replacement', 'open', '2026-03-01 14:00:00', NULL, NULL);
GO

INSERT INTO [reservation] ([id_client], [id_station], [id_connector], [registration_date], [start_date_hour], [end_date_hour], [status]) VALUES 
(1, 1, 1, '2026-03-10 08:00:00', '2026-03-10 09:00:00', '2026-03-10 11:00:00', 'completed'),
(2, 2, 2, '2026-03-12 10:00:00', '2026-03-12 11:00:00', '2026-03-12 13:00:00', 'completed'),
(3, 3, 1, '2026-03-15 14:00:00', '2026-03-15 15:00:00', '2026-03-15 17:00:00', 'active');
GO

INSERT INTO [charge_session] ([id_station], [id_connector], [id_client], [id_driver], [id_vehicle], [id_tariff], [id_reservation], [start_date_hour], [end_date_hour], [energy], [status]) VALUES 
(1, 1, 1, 4, 1, 1, NULL, '2026-03-20 10:00:00', NULL, NULL, 'in progress'),
(2, 2, 2, 5, 2, 2, NULL, '2026-03-21 14:00:00', '2026-03-21 15:30:00', 35.50, 'terminated'),
(3, 1, 3, 2, 3, 1, NULL, '2026-03-22 09:00:00', '2026-03-22 10:15:00', 20.00, 'invoiced');
GO

INSERT INTO [payment] ([id_charge], [invoiced_amount], [paid_amount], [method], [frequency], [status], [invoice_date], [payment_deadline]) VALUES 
(2, 25.50, 25.50, 'credit card', 'immediate', 'paid', '2026-03-21', '2026-04-20'),
(3, 15.00, 0.00, NULL, 'monthly', 'pending', '2026-03-22', '2026-04-21');
GO






-- TRIGGERS

-- trigger para station records
CREATE TRIGGER TRG_station_update
ON [station]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    --  para atualização de municipality
    IF UPDATE([id_municipality])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'id_municipality', CONVERT(VARCHAR(250), d.[id_municipality]), CONVERT(VARCHAR(250), i.[id_municipality]), 'Update of municipality.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[id_municipality], 0) <> ISNULL(i.[id_municipality], 0);
    END

    -- para atualização de code
    IF UPDATE([code])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'code', d.[code], i.[code], 'Update of station code.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[code], '') <> ISNULL(i.[code], '');
    END

    -- para atualização de stan_power
    IF UPDATE([standard_power])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'standard_power', CONVERT(VARCHAR(250), d.[standard_power]), CONVERT(VARCHAR(250), i.[standard_power]), 'Update of standard power.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[standard_power], 0) <> ISNULL(i.[standard_power], 0);
    END

    -- para atualização de fast_power
    IF UPDATE([fast_power])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'fast_power', CONVERT(VARCHAR(250), d.[fast_power]), CONVERT(VARCHAR(250), i.[fast_power]), 'Update of fast power.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[fast_power], 0) <> ISNULL(i.[fast_power], 0);
    END

    IF UPDATE([active])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'active', CONVERT(VARCHAR(250), d.[active]), CONVERT(VARCHAR(250), i.[active]), 'Update of status.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[active], 0) <> ISNULL(i.[active], 0);
    END

    IF UPDATE([registration_date])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'registration_date', CONVERT(VARCHAR(250), d.[registration_date], 120), CONVERT(VARCHAR(250), i.[registration_date], 120), 'Update od registration date.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[registration_date], '') <> ISNULL(i.[registration_date], '');
    END

    IF UPDATE([cessation_date])
    BEGIN
        INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_station], 'cessation_date', ISNULL(CONVERT(VARCHAR(250), d.[cessation_date], 120), 'NULL'), ISNULL(CONVERT(VARCHAR(250), i.[cessation_date], 120), 'NULL'), 'Update of cessation date.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_station] = i.[id_station]
        WHERE ISNULL(d.[cessation_date], '1900-01-01') <> ISNULL(i.[cessation_date], '1900-01-01');
    END
END;
GO

-- teste do trigger de station_records
UPDATE [station] 
SET [active] = 0, [cessation_date] = GETDATE()
WHERE [id_station] = 1;
GO

UPDATE [station] 
SET [code] = 'S011'
WHERE [id_station] = 2;
GO



-- trigger para client_records
CREATE TRIGGER TRG_client_update
ON [client]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE([first_name])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'first_name', d.[first_name], i.[first_name], 'Update of client first name.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[first_name], '') <> ISNULL(i.[first_name], '');
    END

    IF UPDATE([last_name])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'last_name', d.[last_name], i.[last_name], 'Update of client last name.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[last_name], '') <> ISNULL(i.[last_name], '');
    END

    IF UPDATE([tif])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'tif', d.[tif], i.[tif], 'Update of client TIF.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[tif], '') <> ISNULL(i.[tif], '');
    END

    IF UPDATE([sex])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'sex', CONVERT(VARCHAR(250), d.[sex]), CONVERT(VARCHAR(250), i.[sex]), 'Update of client sex.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[sex], '') <> ISNULL(i.[sex], '');
    END

    IF UPDATE([dob])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'dob', ISNULL(CONVERT(VARCHAR(250), d.[dob], 120), 'NULL'), ISNULL(CONVERT(VARCHAR(250), i.[dob], 120), 'NULL'), 'Update of client date of birth.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[dob], '1900-01-01') <> ISNULL(i.[dob], '1900-01-01');
    END

    IF UPDATE([address])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'address', d.[address], i.[address], 'Update of client address.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[address], '') <> ISNULL(i.[address], '');
    END

    IF UPDATE([email])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'email', d.[email], i.[email], 'Update of client email.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[email], '') <> ISNULL(i.[email], '');
    END

    IF UPDATE([type])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'type', d.[type], i.[type], 'Update of client type.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[type], '') <> ISNULL(i.[type], '');
    END

    IF UPDATE([active])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'active', CONVERT(VARCHAR(250), d.[active]), CONVERT(VARCHAR(250), i.[active]), 'Update of status.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[active], 0) <> ISNULL(i.[active], 0);
    END

    IF UPDATE([registration_date])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'registration_date', CONVERT(VARCHAR(250), d.[registration_date], 120), CONVERT(VARCHAR(250), i.[registration_date], 120), 'Update of registration date.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[registration_date], '') <> ISNULL(i.[registration_date], '');
    END

    IF UPDATE([cessation_date])
    BEGIN
        INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_client], 'cessation_date', ISNULL(CONVERT(VARCHAR(250), d.[cessation_date], 120), 'NULL'), ISNULL(CONVERT(VARCHAR(250), i.[cessation_date], 120), 'NULL'), 'Update of cessation date.'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_client] = i.[id_client]
        WHERE ISNULL(d.[cessation_date], '1900-01-01') <> ISNULL(i.[cessation_date], '1900-01-01');
    END
END;
GO

-- testar trigger de client_records
UPDATE [client] 
SET [first_name] = 'Maria' 
WHERE [id_client] = 1;
GO

UPDATE [client] 
SET [tif] = '987654321' 
WHERE [id_client] = 1;
GO

UPDATE [client] 
SET [address] = 'Avenida Central, 123' 
WHERE [id_client] = 1;
GO

UPDATE [client] 
SET [active] = 0, [cessation_date] = GETDATE() 
WHERE [id_client] = 1;
GO

-- trigger para tariff_records (ainda por confirmar)
CREATE TRIGGER TRG_tariff_versioning
ON [tariff]
INSTEAD OF UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Preparar os dados e decidir se criar nova linha ou mantém
    SELECT 
        i.[id_tariff] AS [old_id_tariff],
        i.[name],
        CASE 
            WHEN (UPDATE([price]) OR UPDATE([charge_type]) OR UPDATE([activation_fee])) 
                 AND NOT UPDATE([version]) AND i.[version] = d.[version] 
            THEN d.[version] + 1 
            ELSE i.[version] 
        END AS [version],
        i.[charge_type],
        i.[price],
        i.[activation_fee],
        i.[active],
        ISNULL(i.[registration_date], GETDATE()) AS [registration_date],
        i.[cessation_date],

        -- Identifica se houve mudança de price, charge_type ou act_fee que obriga a criar nova linha
        CASE 
            WHEN ISNULL(i.[price], 0) <> ISNULL(d.[price], 0) 
                 OR ISNULL(i.[charge_type], '') <> ISNULL(d.[charge_type], '') 
                 OR ISNULL(i.[activation_fee], -1) <> ISNULL(d.[activation_fee], -1)
            THEN 1 
            ELSE 0 
        END AS [is_new_version]
    INTO #tariff_changes
    FROM [inserted] AS i
    JOIN [deleted] AS d ON i.[id_tariff] = d.[id_tariff];

    -- 2. Se houver essas mudanças, desativa a linha antiga na tabela real
    UPDATE t
    SET t.[active] = 0, t.[cessation_date] = GETDATE()
    FROM [tariff] AS t
    JOIN #tariff_changes AS tc ON t.[id_tariff] = tc.[old_id_tariff]
    WHERE tc.[is_new_version] = 1;

    -- 3. Inserir a nova linha (quando houve alteração crítica)
    INSERT INTO [tariff] ([name], [version], [charge_type], [price], [activation_fee], [active], [registration_date], [cessation_date])
    SELECT [name], [version], [charge_type], [price], [activation_fee], [active], [registration_date], [cessation_date]
    FROM #tariff_changes
    WHERE [is_new_version] = 1;

    -- 4. Atualizar diretamente a linha existente (quando foi apenas um update normal, ex: mudar o nome)
    UPDATE t
    SET 
        t.[name] = tc.[name],
        t.[version] = tc.[version],
        t.[charge_type] = tc.[charge_type],
        t.[price] = tc.[price],
        t.[activation_fee] = tc.[activation_fee],
        t.[active] = tc.[active],
        t.[registration_date] = tc.[registration_date],
        t.[cessation_date] = tc.[cessation_date]
    FROM [tariff] AS t
    JOIN #tariff_changes AS tc ON t.[id_tariff] = tc.[old_id_tariff]
    WHERE tc.[is_new_version] = 0;

    -- 5. Registar na auditoria (tariff_records)
    IF UPDATE([name])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'name', d.[name], i.[name], 'Update to tariff name'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[name], '') <> ISNULL(i.[name], '');
    END

    IF UPDATE([price])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'price', CONVERT(VARCHAR(250), d.[price]), CONVERT(VARCHAR(250), i.[price]), 'Tariff price update / new version'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[price], 0) <> ISNULL(i.[price], 0);
    END

    IF UPDATE([charge_type])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'charge_type', d.[charge_type], i.[charge_type], 'Tariff charge type update / new version'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[charge_type], '') <> ISNULL(i.[charge_type], '');
    END

    IF UPDATE([activation_fee])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'activation_fee', ISNULL(CONVERT(VARCHAR(250), d.[activation_fee]), 'NULL'), ISNULL(CONVERT(VARCHAR(250), i.[activation_fee]), 'NULL'), 'Tariff activation fee update / new version'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[activation_fee], -1) <> ISNULL(i.[activation_fee], -1);
    END

    IF UPDATE([active])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'active', CONVERT(VARCHAR(250), d.[active]), CONVERT(VARCHAR(250), i.[active]), 'Update to tariff active status'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[active], 0) <> ISNULL(i.[active], 0);
    END

    IF UPDATE([registration_date])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'registration_date', CONVERT(VARCHAR(250), d.[registration_date], 120), CONVERT(VARCHAR(250), i.[registration_date], 120), 'Update to tariff registration date'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[registration_date], '') <> ISNULL(i.[registration_date], '');
    END

    IF UPDATE([cessation_date])
    BEGIN
        INSERT INTO [tariff_records] ([id_tariff], [field_changed], [previous_value], [new_value], [observations])
        SELECT d.[id_tariff], 'cessation_date', ISNULL(CONVERT(VARCHAR(250), d.[cessation_date], 120), 'NULL'), ISNULL(CONVERT(VARCHAR(250), i.[cessation_date], 120), 'NULL'), 'Update to tariff cessation date'
        FROM [deleted] AS d
        JOIN [inserted] AS i ON d.[id_tariff] = i.[id_tariff]
        WHERE ISNULL(d.[cessation_date], '1900-01-01') <> ISNULL(i.[cessation_date], '1900-01-01');
    END

    DROP TABLE #tariff_changes;
END;
GO


-- testar o trigger
UPDATE [tariff] 
SET [name] = 'Basic' 
WHERE [id_tariff] = 1;
GO

UPDATE [tariff] 
SET [price] = 0.25 
WHERE [id_tariff] = 1;
GO
