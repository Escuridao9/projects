-- usar base dados do sistema
USE master;
GO

-- criar a nossa base dados (se ainda nao existir)
IF NOT EXISTS(SELECT * FROM sys.databases WHERE NAME = 'bd_test')
BEGIN
    CREATE DATABASE [bd_test];
END
GO

-- usar a nossa base de dados
USE bd_test
GO

-- limpeza preventiva
DROP TABLE IF EXISTS [maintenance_records];
DROP TABLE IF EXISTS [charge_session_records];
DROP TABLE IF EXISTS [tariff_records];
DROP TABLE IF EXISTS [client_records];
DROP TABLE IF EXISTS [station_records];
DROP TABLE IF EXISTS [invoice_item];
DROP TABLE IF EXISTS [invoice];
DROP TABLE IF EXISTS [charge_session];
DROP TABLE IF EXISTS [reservation];
DROP TABLE IF EXISTS [maintenance];
DROP TABLE IF EXISTS [vehicle];
DROP TABLE IF EXISTS [client_role];
DROP TABLE IF EXISTS [station_connector];
DROP TABLE IF EXISTS [client];        
DROP TABLE IF EXISTS [station];       
DROP TABLE IF EXISTS [tariff];        
DROP TABLE IF EXISTS [role];
DROP TABLE IF EXISTS [connector];
DROP TABLE IF EXISTS [municipality];  
GO

-- criação de tabelas
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
    [activation_fee] DECIMAL (4,2) NOT NULL,
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
    CONSTRAINT CHK_tariff_activation_fee CHECK ([activation_fee] >= 0),
    CONSTRAINT CHK_tariff_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_tariff_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL)));
GO

-- para garantir que apenas 1 versão ativa por nome de tarifa)
CREATE UNIQUE INDEX UQ_active_tariff_name 
ON [tariff]([name]) 
WHERE [active] = 1;
GO

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
    CONSTRAINT CHK_station_standard_power CHECK ([standard_power] = 0.2*[fast_power]),
    CONSTRAINT CHK_station_fast_power CHECK ([fast_power] > 0),
    CONSTRAINT CHK_station_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_station_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL) 
        ));
GO

CREATE TABLE [client] (
    [id_client] INT IDENTITY(1,1),
    [id_company] INT NULL,
    [id_tariff] INT NULL,
    [first_name] VARCHAR(50) NOT NULL,
    [last_name] VARCHAR(50) NOT NULL,
    [tif] CHAR(9) NOT NULL,
    [sex] CHAR(1) NOT NULL,
    [dob] DATE NULL,
    [address] VARCHAR(100) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [type] VARCHAR(20) NOT NULL,
    [total_points] INT NOT NULL,
    [active] BIT NOT NULL DEFAULT 1,
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [cessation_date] DATETIME NULL,

    CONSTRAINT PK_client PRIMARY KEY ([id_client]),
    CONSTRAINT FK_client_company FOREIGN KEY ([id_company]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_client_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT UQ_client_tif UNIQUE ([tif]),
    CONSTRAINT CHK_client_company CHECK ([id_company] IS NULL OR [id_company] <> [id_client]),
    CONSTRAINT CHK_client_first_name_upper CHECK (LEFT([first_name], 1) COLLATE Latin1_General_CS_AS LIKE '[A-ZÀ-Ü]'),
    CONSTRAINT CHK_client_first_name_chars CHECK ([first_name] COLLATE Latin1_General_CS_AS NOT LIKE '%[^a-zA-Zà-üÀ-ÜçÇ -]%'),
    CONSTRAINT CHK_client_last_name_upper CHECK (LEFT([last_name], 1) COLLATE Latin1_General_CS_AS LIKE '[A-ZÀ-Ü]'),
    CONSTRAINT CHK_client_last_name_chars CHECK ([last_name] COLLATE Latin1_General_CS_AS NOT LIKE '%[^a-zA-Zà-üÀ-ÜçÇ .-]%'),
    CONSTRAINT CHK_client_tif CHECK ([tif] LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
    CONSTRAINT CHK_client_sex CHECK ([sex] COLLATE Latin1_General_CS_AS IN ('M', 'F', 'O', 'N')),
    CONSTRAINT CHK_client_dob CHECK ([dob] >= '1900-01-01'),
    CONSTRAINT CHK_client_address CHECK (TRIM([address]) <> ''),
    CONSTRAINT CHK_client_email CHECK ([email] LIKE '%_@_%._%'),
    CONSTRAINT CHK_client_type CHECK ([type] IN ('individual', 'company')),
    CONSTRAINT CHK_client_type_coherence CHECK (
        ([type] = 'company' AND [sex] = 'N' AND [dob] IS NULL AND [id_company] IS NULL) OR
        ([type] = 'individual' AND [sex] IN ('M', 'F', 'O') AND [dob] IS NOT NULL)),
    CONSTRAINT CHK_client_points CHECK ([total_points] >= 0),
    CONSTRAINT CHK_client_cessation_after_registration CHECK ([cessation_date] IS NULL OR [cessation_date] >= [registration_date]),
    CONSTRAINT CHK_client_status_cessation CHECK (
        ([active] = 1 AND [cessation_date] IS NULL) OR
        ([active] = 0 AND [cessation_date] IS NOT NULL)));
GO

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

    CONSTRAINT PK_vehicle PRIMARY KEY ([id_vehicle]),
    CONSTRAINT FK_vehicle_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT UQ_vehicle_licence_plate UNIQUE ([licence_plate]),
    CONSTRAINT CHK_vehicle_licence_plate CHECK (TRIM([licence_plate]) <> ''),        
    CONSTRAINT CHK_vehicle_country CHECK (TRIM([country]) <> ''));
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
    [registration_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [start_date_hour] DATETIME NOT NULL,
    [end_date_hour] DATETIME NOT NULL,
    [status] VARCHAR(20) NOT NULL,

    CONSTRAINT PK_reservation PRIMARY KEY ([id_reservation]),
    CONSTRAINT FK_reservation_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_reservation_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]),
    CONSTRAINT CHK_reservation_end_date_after_start_date CHECK ([end_date_hour] > [start_date_hour]),
    CONSTRAINT CHK_reservation_status CHECK ([status] IN ('active', 'completed', 'cancelled', 'expired')));
GO

CREATE TABLE [charge_session] (
    [id_charge] INT IDENTITY(1,1),
    [id_station] INT NOT NULL,
    [id_connector] INT NOT NULL,
    [id_client] INT NOT NULL,
    [id_driver] INT NOT NULL,
    [id_vehicle] INT NOT NULL,
    [id_tariff] INT NOT NULL,
    [id_reservation] INT NULL,
    [version_tariff] INT NOT NULL,
    [price_tariff] DECIMAL(4,2) NOT NULL,
    [start_date_hour] DATETIME NOT NULL DEFAULT GETDATE(),
    [end_date_hour] DATETIME NULL,
    [energy] DECIMAL(6,2) NULL,
    [status] VARCHAR(20) NOT NULL,
    [points] INT NOT NULL,

    CONSTRAINT PK_charge_session PRIMARY KEY ([id_charge]),
    CONSTRAINT FK_charge_session_station_connector FOREIGN KEY ([id_station], [id_connector]) REFERENCES [station_connector]([id_station], [id_connector]),
    CONSTRAINT FK_charge_session_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_charge_session_driver FOREIGN KEY ([id_driver]) REFERENCES [client]([id_client]),
    CONSTRAINT FK_charge_session_vehicle FOREIGN KEY ([id_vehicle]) REFERENCES [vehicle]([id_vehicle]),
    CONSTRAINT FK_charge_session_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT FK_charge_session_reservation FOREIGN KEY ([id_reservation]) REFERENCES [reservation]([id_reservation]),
    CONSTRAINT CHK_charge_session_version CHECK ([version_tariff] > 0),
    CONSTRAINT CHK_charge_session_price CHECK ([price_tariff] > 0),
    CONSTRAINT CHK_charge_session_end_date CHECK ([end_date_hour] IS NULL OR [end_date_hour] >= [start_date_hour]),
    CONSTRAINT CHK_charge_session_energy CHECK ([energy] IS NULL OR [energy] >= 0),
    CONSTRAINT CHK_charge_session_status CHECK ([status] IN ('in progress', 'terminated', 'invoiced', 'cancelled')),
    CONSTRAINT CHK_charge_session_status_coherence CHECK (
    -- "in process" - obrigatoriamente nao tem end_date nem energy
    ([status] = 'in progress' AND [end_date_hour] IS NULL AND [energy] IS NULL) OR 
    -- "terminated" ou "invoiced" - obrigatoriamente tem end_data e energy
    ([status] IN ('terminated', 'invoiced') AND [end_date_hour] IS NOT NULL AND [energy] IS NOT NULL) OR
    -- "cancelled"
    ([status] = 'cancelled' AND [end_date_hour] = [start_date_hour] AND [energy] = 0.00)),
    CONSTRAINT CHK_charge_points CHECK ([points] >= 0));
GO

-- Garante que uma reservation pode estar associada a no máximo uma charge_session.
-- Charge_sessions sem reservation (id_reservation = NULL) continuam a ser permitidas.
CREATE UNIQUE NONCLUSTERED INDEX UQ_charge_session_reservation 
ON [charge_session]([id_reservation]) 
WHERE [id_reservation] IS NOT NULL;
GO

CREATE TABLE [invoice] (
    [id_invoice] INT IDENTITY(1,1),
    [id_client] INT NOT NULL,
    [total_amount] DECIMAL(10,2) NOT NULL,
    [invoice_date] DATE NOT NULL DEFAULT CONVERT(DATE, GETDATE()),
    [payment_deadline] DATE NOT NULL DEFAULT CONVERT(DATE, GETDATE()),
    [payment_date] DATE NULL,
    [status] VARCHAR(20) NOT NULL,

    CONSTRAINT PK_invoice PRIMARY KEY ([id_invoice]),
    CONSTRAINT FK_invoice_client FOREIGN KEY ([id_client]) REFERENCES [client]([id_client]),
    CONSTRAINT CHK_invoice_total_amount CHECK ([total_amount] >= 0),
    CONSTRAINT CHK_invoice_payment_deadline CHECK ([payment_deadline] >= [invoice_date]),
        CONSTRAINT CHK_invoice_payment_date CHECK (
        ([status] = 'paid' AND [payment_date] IS NOT NULL AND [payment_date] >= [invoice_date]) OR
        ([status] <> 'paid' AND [payment_date] IS NULL)),
    CONSTRAINT CHK_invoice_status CHECK ([status] COLLATE Latin1_General_CS_AS IN ('pending', 'paid', 'cancelled', 'expired')));
GO

CREATE TABLE [invoice_item] (
    [id_invoice_item] INT IDENTITY(1,1),
    [id_invoice] INT NOT NULL,
    [id_charge_session] INT NOT NULL,
    [charge_amount] DECIMAL(10,2) NOT NULL,

    CONSTRAINT PK_invoice_item PRIMARY KEY ([id_invoice_item]),
    CONSTRAINT FK_invoice_item_invoice FOREIGN KEY ([id_invoice]) REFERENCES [invoice]([id_invoice]) ON DELETE CASCADE,
    CONSTRAINT FK_invoice_item_charge_session FOREIGN KEY ([id_charge_session]) REFERENCES [charge_session]([id_charge]),
    CONSTRAINT UQ_invoice_item_charge_session UNIQUE ([id_charge_session]),
    CONSTRAINT CHK_invoice_item_charge_amount CHECK ([charge_amount] >= 0));
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
    CONSTRAINT FK_stationrecords_station FOREIGN KEY ([id_station]) REFERENCES [station]([id_station]));
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
    [version] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_tariff_records PRIMARY KEY ([id_tariff_record]),
    CONSTRAINT FK_tariff_records_tariff FOREIGN KEY ([id_tariff]) REFERENCES [tariff]([id_tariff]),
    CONSTRAINT CHK_tariff_records_version CHECK ([version] > 0));
GO

CREATE TABLE [charge_session_records] (
    [id_charge_record] INT IDENTITY(1,1),
    [id_charge] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] VARCHAR(250) NULL,

    CONSTRAINT PK_charge_session_records PRIMARY KEY ([id_charge_record]),
    CONSTRAINT FK_charge_session_records_charge_session FOREIGN KEY ([id_charge]) REFERENCES [charge_session]([id_charge]));
GO

CREATE TABLE [maintenance_records] (
    [id_maintenance_record] INT IDENTITY(1,1),
    [id_maintenance] INT NOT NULL,
    [field_changed] VARCHAR(50) NOT NULL,
    [previous_value] VARCHAR(250) NOT NULL,
    [new_value] VARCHAR(250) NOT NULL,
    [modification_date] DATETIME NOT NULL DEFAULT GETDATE(),
    [observations] NVARCHAR(250) NULL,

    CONSTRAINT PK_maintenance_records PRIMARY KEY ([id_maintenance_record]),
    CONSTRAINT FK_maintenancerecords_maintenance FOREIGN KEY ([id_maintenance]) REFERENCES [maintenance]([id_maintenance]),);
GO

-- INSERÇÃO DE DADOS

-- 1. Municipality
INSERT INTO [municipality] ([name]) VALUES 
('Braga'), ('Porto'), ('Lisboa'), ('Évora'), ('Viana do Castelo'), ('Bragança');
GO

-- 2. Connector
INSERT INTO [connector] ([name], [description]) VALUES 
('CCS', 'Combined Charging System - Fast DC standard in Europe'),
('CHA', 'CHAdeMO - Japanese fast DC standard'),
('TSP', 'Tesla Supercharger Protocol'),
('TYP', 'Type 2 Mennekes - European AC three-phase standard');
GO

-- 3. Role
INSERT INTO [role] ([name], [observations]) VALUES 
('account holder', 'Account owner responsible for the subscription'),
('driver', 'Vehicle driver conducting charge sessions'),
('paying entity', 'Entity responsible for invoice payments');
GO

-- 4. Tariff
INSERT INTO [tariff] ([name], [version], [charge_type], [price], [activation_fee], [active], [registration_date], [cessation_date]) VALUES 
('Normal', 1, 'standard', 0.35, 0.50, 1, '2025-01-01 00:00:00', NULL),
('Premium', 1, 'fast', 0.55, 1.00, 0, '2024-01-01 00:00:00', '2024-12-31 23:59:59'),
('Premium', 2, 'fast', 0.65, 1.00, 1, '2025-01-01 00:00:00', NULL);
GO

-- 5. Client
INSERT INTO [client] ([id_company], [id_tariff], [first_name], [last_name], [tif], [sex], [dob], [address], [email], [type], [total_points], [active], [registration_date], [cessation_date]) VALUES 
(NULL, 1, 'EcoDrive', 'Lda.', '501234567', 'N', NULL, 'Avenida Central 100, Porto', 'geral@ecodrive.pt', 'company', 250, 1, '2025-01-01 00:00:00', NULL),
(NULL, 2, 'VoltPower', 'S.A.', '509876543', 'N', NULL, 'Praça do Comércio 50, Lisboa', 'contacto@voltpower.pt', 'company', 100, 1, '2025-01-01 00:00:00', NULL),
(1, 1, 'João', 'Silva', '123456789', 'M', '1985-06-15', 'Rua das Flores 12, Porto', 'joao.silva@email.com', 'individual', 0, 1, '2025-01-02 00:00:00', NULL),
(1, 1, 'Ana', 'Santos', '234567890', 'F', '1990-03-22', 'Rua de Cima 45, Matosinhos', 'ana.santos@email.com', 'individual', 0, 1, '2025-01-03 00:00:00', NULL),
(2, 2, 'Carlos', 'Ferreira', '345678901', 'M', '1978-11-05', 'Avenida da Liberdade 200, Lisboa', 'carlos.ferreira@email.com', 'individual', 0, 1, '2025-01-04 00:00:00', NULL),
(NULL, 1, 'Maria', 'Oliveira', '456789012', 'F', '1995-12-30', 'Rua da Republica 80, Coimbra', 'maria.oliveira@email.com', 'individual', 50, 1, '2025-01-05 00:00:00', NULL);
GO

-- 6. Station
INSERT INTO [station] ([id_municipality], [code], [standard_power], [fast_power], [active], [registration_date], [cessation_date]) VALUES 
(1, 'S001', 20.00, 100.00, 1, '2025-01-01 00:00:00', NULL), 
(2, 'S002', 20.00, 100.00, 1, '2025-01-01 00:00:00', NULL), 
(3, 'S003', 10.00, 50.00, 1, '2025-01-02 00:00:00', NULL), 
(5, 'S004', 20.00, 100.00, 0, '2024-01-10 00:00:00', '2024-12-31 23:59:59'), 
(4, 'S005', 30.00, 150.00, 1, '2025-01-05 00:00:00', NULL); 
GO

-- 7. Station Connector
INSERT INTO [station_connector] ([id_station], [id_connector]) VALUES 
(1, 1), (1, 2), (2, 1), (2, 2), (3, 1), (3, 2), (4, 1), (4, 2), (5, 1), (5, 2);
GO

-- 8. Client Role
INSERT INTO [client_role] ([id_client], [id_role]) VALUES 
(1, 3), (2, 3), (3, 3), (4, 2), (5, 1);
GO

-- 9. Vehicle
INSERT INTO [vehicle] ([id_client], [licence_plate], [country]) VALUES 
(3, '12-AB-34', 'Portugal'), -- Veículo do João Silva (associado à EcoDrive - ID 3)
(4, '56-CD-78', 'Portugal'), -- Veículo da Ana Santos (associada à EcoDrive - ID 4)
(5, '90-EF-12', 'Portugal'), -- Veículo do Carlos Ferreira (associado à VoltPower - ID 5)
(6, '34-GH-56', 'Portugal'), -- Veículo da Maria Oliveira (particular independente - ID 6)
(6, '78-IJ-90', 'Portugal');  -- Segundo veículo da Maria Oliveira (ID 6)
GO

-- 10. Maintenance
INSERT INTO [maintenance] ([id_station], [type], [description], [status], [start_date], [end_date], [cost]) VALUES 
(1, 'repair', 'Replacement of damaged CCS connector at station S001', 'resolved', '2025-01-10 08:30:00', '2025-01-10 12:00:00', 150.00),
(2, 'inspection', 'Routine periodic inspection at station S002', 'in process', '2026-03-01 09:00:00', NULL, NULL),
(3, 'upgrade', 'Firmware update for the payment system at station S003', 'open', '2026-03-02 14:00:00', NULL, NULL),
(5, 'repair', 'Repair of the display panel at station S005', 'resolved', '2025-02-01 10:00:00', '2025-02-02 16:30:00', 320.50);
GO

-- 11. Reservation
INSERT INTO [reservation] ([id_client], [id_station], [registration_date], [start_date_hour], [end_date_hour], [status]) VALUES 
(3, 1, '2026-06-01 10:00:00', '2026-06-01 10:30:00', '2026-06-01 11:30:00', 'active'),
(4, 2, '2026-06-02 14:00:00', '2026-06-02 15:00:00', '2026-06-02 16:00:00', 'completed'),
(5, 3, '2026-06-03 09:00:00', '2026-06-03 11:00:00', '2026-06-03 12:00:00', 'cancelled'),
(6, 5, '2026-06-04 08:00:00', '2026-06-04 09:00:00', '2026-06-04 10:00:00', 'expired');
GO

-- 12. Charge Session
INSERT INTO [charge_session] ([id_station], [id_connector], [id_client], [id_driver], [id_vehicle], [id_tariff], [id_reservation], [version_tariff], [price_tariff], [start_date_hour], [end_date_hour], [energy], [status], [points]) VALUES 
(2, 1, 1, 4, 2, 1, 2, 1, 0.35, '2026-06-02 15:00:00', '2026-06-02 16:00:00', 25.50, 'terminated', 9),
(5, 2, 6, 6, 4, 1, NULL, 1, 0.35, '2026-06-04 09:00:00', '2026-06-04 10:00:00', 40.00, 'invoiced', 14),
(1, 1, 1, 3, 1, 1, NULL, 1, 0.35, '2026-08-31 22:00:00', NULL, NULL, 'in progress', 0),
(3, 1, 2, 5, 3, 2, 3, 2, 0.65, '2026-06-03 11:00:00', '2026-06-03 11:00:00', 0.00, 'cancelled', 0),
(3, 1, 2, 5, 3, 2, NULL, 2, 0.65, '2026-06-03 14:00:00', '2026-06-03 15:15:00', 55.20, 'terminated', 36),
(1, 2, 1, 4, 2, 1, NULL, 1, 0.35, '2026-06-05 10:00:00', '2026-06-05 10:45:00', 18.30, 'invoiced', 6),
(4, 1, 6, 6, 5, 1, NULL, 1, 0.35, '2026-08-31 22:15:00', NULL, NULL, 'in progress', 0),
(5, 2, 6, 6, 4, 1, 4, 1, 0.35, '2026-06-04 09:00:00', '2026-06-04 10:00:00', 30.00, 'terminated', 11),
(1, 1, 6, 6, 4, 1, NULL, 1, 0.35, '2026-06-10 11:00:00', '2026-06-10 12:00:00', 35.00, 'terminated', 12),
(2, 2, 2, 5, 3, 2, NULL, 2, 0.65, '2026-06-11 14:30:00', '2026-06-11 16:00:00', 70.50, 'invoiced', 46),
(3, 1, 1, 3, 1, 1, NULL, 1, 0.35, '2026-06-12 08:15:00', '2026-06-12 09:00:00', 22.10, 'terminated', 8),
(4, 2, 6, 6, 5, 1, NULL, 1, 0.35, '2026-06-13 18:00:00', '2026-06-13 18:00:00', 0.00, 'cancelled', 0),
(5, 1, 1, 4, 2, 1, NULL, 1, 0.35, '2026-06-14 16:00:00', '2026-06-14 17:10:00', 45.80, 'invoiced', 16);
GO

-- 13. Invoice
INSERT INTO [invoice] ([id_client], [total_amount], [invoice_date], [payment_deadline], [payment_date], [status]) VALUES 
-- Invoice 1: Client 1 (EcoDrive) covering charge sessions with status 'invoiced' (IDs 6 and 13)
-- Charge 6: energy 18.30 * 0.35 tariff = 6.415 -> Let's totalize accurately based on the sessions
(1, 22.45, '2026-06-16', '2026-06-30', '2026-06-25', 'paid'),

-- Invoice 2: Client 6 (Maria Oliveira) covering her 'invoiced' session (ID 2)
-- Charge 2: energy 40.00 * 0.35 tariff = 14.00
(6, 14.00, '2026-06-05', '2026-06-20', NULL, 'pending'),

-- Invoice 3: Client 2 (VoltPower) covering her 'invoiced' session (ID 10)
-- Charge 10: energy 70.50 * 0.65 tariff = 45.825 -> rounded to 45.83
(2, 45.83, '2026-06-12', '2026-06-26', '2026-06-20', 'paid');
GO

-- 14. Invoice Item
INSERT INTO [invoice_item] ([id_invoice], [id_charge_session], [charge_amount]) VALUES 
(1, 6, 6.41),
(2, 2, 14.00),
(3, 10, 45.83)
GO

-- 15. Station Records
INSERT INTO [station_records] ([id_station], [field_changed], [previous_value], [new_value], [modification_date], [observations]) VALUES 
(1, 'standard_power', '15.00', '20.00', '2025-06-01 10:00:00', 'Upgrade of station standard power capacity'),
(4, 'active', '1', '0', '2024-01-10 10:00:00', 'Station deactivated due to scheduled relocation');
GO

-- 16. Client Records
INSERT INTO [client_records] ([id_client], [field_changed], [previous_value], [new_value], [modification_date], [observations]) VALUES 
(1, 'address', 'Avenida Central 50, Porto', 'Avenida Central 100, Porto', '2025-02-01 09:30:00', 'Company headquarters address update'),
(6, 'email', 'maria.old@email.com', 'maria.oliveira@email.com', '2025-03-15 14:20:00', 'Client requested email update');
GO

-- 17. Tariff Records
INSERT INTO [tariff_records] ([id_tariff], [version], [field_changed], [previous_value], [new_value], [modification_date], [observations]) VALUES 
(2, 1, 'price', '0.50', '0.55', '2024-06-01 00:00:00', 'Mid-year price adjustment for Premium v1'),
(3, 2, 'price', '0.60', '0.65', '2025-06-01 00:00:00', 'Inflation adjustment for Premium v2');
GO

-- 18. Charge Session Records
INSERT INTO [charge_session_records] ([id_charge], [field_changed], [previous_value], [new_value], [modification_date], [observations]) VALUES 
(3, 'status', 'in progress', 'terminated', '2026-09-01 01:00:00', 'Session finished manually by system override'),
(7, 'status', 'in progress', 'terminated', '2026-09-01 01:15:00', 'Session ended normally upon full vehicle charge');
GO

-- 19. Maintenance Records
INSERT INTO [maintenance_records] ([id_maintenance], [field_changed], [previous_value], [new_value], [modification_date], [observations]) VALUES 
(2, 'status', 'open', 'in process', '2026-03-01 09:00:00', 'Technician assigned and dispatched to station S002'),
(3, 'status', 'open', 'in process', '2026-03-02 15:00:00', 'Firmware download started remotely');
GO

-- TRIGGER that gives points to client once invoiced gets paid

IF OBJECT_ID('trg_AwardPointsOnInvoicePaid', 'TR') IS NOT NULL
    DROP TRIGGER trg_AwardPointsOnInvoicePaid;
GO

CREATE TRIGGER trg_AwardPointsOnInvoicePaid
ON [invoice]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT UPDATE([status])
        RETURN;

    WITH PaidPointsSummary AS (
        SELECT 
            i.[id_client],
            SUM(cs.[points]) AS [points_to_add]
        FROM inserted i
        INNER JOIN deleted d 
            ON i.[id_invoice] = d.[id_invoice]
        INNER JOIN [invoice_item] ii 
            ON i.[id_invoice] = ii.[id_invoice]
        INNER JOIN [charge_session] cs 
            ON ii.[id_charge_session] = cs.[id_charge]
        WHERE i.[status] = 'paid' 
          AND (d.[status] <> 'paid' OR d.[status] IS NULL)
        GROUP BY i.[id_client]
    )
    UPDATE c
    SET c.[total_points] = c.[total_points] + pps.[points_to_add]
    FROM [client] c
    INNER JOIN PaidPointsSummary pps 
        ON c.[id_client] = pps.[id_client];
END;
GO





-- STORAGE PROCEDURE 

-- 1. CREATE Station
DROP PROCEDURE IF EXISTS sp_insert_station;
GO

CREATE PROCEDURE sp_insert_station
    @id_municipality INT,
    @code VARCHAR(50),
    @standard_power DECIMAL(10,2),
    @fast_power DECIMAL(10,2),
    @active BIT,
    @registration_date DATETIME,
    @cessation_date DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;
    
    BEGIN TRY
        IF EXISTS (SELECT [code] FROM [station] WHERE [code] = @code)
        BEGIN;
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message INT;
            SELECT @message = 'There''s already a station with that code.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END

        INSERT INTO [station] ([id_municipality], [code], [standard_power], [fast_power], [active], [registration_date], [cessation_date])
        VALUES (@id_municipality, @code, @standard_power, @fast_power, @active, @registration_date, @cessation_date);

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        THROW;
    END CATCH
END;
GO

-- 2. READ (get all Stations)
DROP PROCEDURE IF EXISTS sp_get_all_stations
GO

CREATE PROCEDURE sp_get_all_stations
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM [station];
END;
GO

-- 3. READ (get station by ID)
DROP PROCEDURE IF EXISTS sp_get_stations_by_id
GO

CREATE PROCEDURE sp_get_stations_by_id
    @id_station INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT * FROM [station] 
    WHERE [id_station] = @id_station;
END;
GO

-- 4. UPDATE Station
DROP PROCEDURE IF EXISTS sp_update_station
GO

CREATE PROCEDURE sp_update_station
    @id_station INT,
    @id_municipality INT = NULL,
    @code VARCHAR(50) = NULL,
    @standard_power DECIMAL(10,2) = NULL,
    @fast_power DECIMAL(10,2) = NULL,
    @active BIT = NULL,
    @cessation_date DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;

    BEGIN TRY
        IF NOT EXISTS (SELECT [id_station] FROM [station] WHERE [id_station] = @id_station)
        BEGIN
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message INT;
            SELECT @message = 'Station not found.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END

        UPDATE [station]
        SET 
            [id_municipality] = ISNULL(@id_municipality, [id_municipality]),
            [code] = ISNULL(@code, [code]),
            [standard_power] = ISNULL(@standard_power, [standard_power]),
            [fast_power] = ISNULL(@fast_power, [fast_power]),
            [active] = ISNULL(@active, [active]),
            [cessation_date] = ISNULL(@cessation_date, [cessation_date])
        WHERE [id_station] = @id_station;

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        THROW;
    END CATCH
END;
GO

-- 5. DELETE Station
DROP PROCEDURE IF EXISTS sp_delete_station;
GO

CREATE PROCEDURE sp_delete_station
    @id_station INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;

    BEGIN TRY
        IF NOT EXISTS (SELECT [id_station] FROM [station] WHERE [id_station] = @id_station)
        BEGIN
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message INT;
            SELECT @message = 'Station not found.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END;

        -- ver se existem charge_session associada aos conectores desta estação
        IF EXISTS (
            SELECT cs.[id_station], cs.[id_connector] 
            FROM [charge_session]  AS cs
            JOIN [station_connector] AS sc ON cs.[id_station] = sc.[id_station] AND cs.[id_connector] = sc.[id_connector]
            WHERE sc.[id_station] = @id_station
        )
        BEGIN
            DECLARE @severity1 INT;
            SELECT @severity1 = ERROR_SEVERITY();
            DECLARE @message1 VARCHAR(100);
            SELECT @message1 = 'Cannot delete a station that has associated charge sessions.';
            DECLARE @state1 INT;
            SET @state1 = ERROR_STATE();
        THROW @severity1, @message1, @state1
        END;

        -- remover primeiro as associações na tabela intermédia
        DELETE FROM [station_connector] 
        WHERE [id_station] = @id_station;

        -- apagar a estação
        DELETE FROM [station] 
        WHERE [id_station] = @id_station;

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        THROW;
    END CATCH
END;
GO


-- STORAGE PROCEDURE CONNECTOR
-- 1. CREATE Connector
DROP PROCEDURE IF EXISTS sp_insert_connector;
GO

CREATE PROCEDURE sp_insert_connector
    @name CHAR(3),
    @description VARCHAR(250) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;
    
    BEGIN TRY
        IF EXISTS (SELECT [name] FROM [connector] WHERE [name] = @name)
        BEGIN;
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message VARCHAR(100);
            SELECT @message = 'There''s already a connector with that name.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END;

        INSERT INTO [connector] ([name], [description])
        VALUES (@name, @description);

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        THROW;
    END CATCH
END;
GO

-- 2. READ (get all Connectors)
DROP PROCEDURE IF EXISTS sp_get_all_connectors
GO

CREATE PROCEDURE sp_get_all_connectors
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM [connector];
END;
GO

-- 3. READ (get connector by ID)
DROP PROCEDURE IF EXISTS sp_get_connector_by_id
GO

CREATE PROCEDURE sp_get_connector_by_id
    @id_connector INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT * FROM [connector] 
    WHERE [id_connector] = @id_connector;
END;
GO

-- 4. UPDATE Connector
DROP PROCEDURE IF EXISTS sp_update_connector
GO

CREATE PROCEDURE sp_update_connector
    @id_connector INT,
    @name CHAR(3) = NULL,
    @description VARCHAR(250) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;

    BEGIN TRY
        IF NOT EXISTS (SELECT [id_connector] FROM [connector] WHERE [id_connector] = @id_connector)
        BEGIN
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message VARCHAR(100);
            SELECT @message = 'Connector not found.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END;

        UPDATE [connector]
        SET 
            [name] = ISNULL(@name, [name]),
            [description] = ISNULL(@description, [description])
        WHERE [id_connector] = @id_connector;

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        THROW;
    END CATCH
END;
GO

-- 5. DELETE Connector
DROP PROCEDURE IF EXISTS sp_delete_connector
GO

CREATE PROCEDURE sp_delete_connector
    @id_connector INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRAN;

    BEGIN TRY
        IF NOT EXISTS (SELECT [id_connector] FROM [connector] WHERE [id_connector] = @id_connector)
        BEGIN
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message VARCHAR(100);
            SELECT @message = 'Connector not found.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END;

        -- verificar se existem charge_session associadas a este conector
        IF EXISTS (
            SELECT [id_conector] 
            FROM [charge_session] 
            WHERE [id_connector] = @id_connector
        )
        BEGIN
            DECLARE @severity INT;
            SELECT @severity = ERROR_SEVERITY();
            DECLARE @message VARCHAR(100);
            SELECT @message = 'Cannot delete a connector that has associated charge sessions.';
            DECLARE @state INT;
            SET @state = ERROR_STATE();
        THROW @severity, @message, @state
        END;

        -- apagar primeiro as ligações na tabela intermédia (station_connector)
        DELETE FROM [station_connector] 
        WHERE [id_connector] = @id_connector;

        -- apagar o conector 
        DELETE FROM [connector] 
        WHERE [id_connector] = @id_connector;

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        THROW;
    END CATCH
END;
GO