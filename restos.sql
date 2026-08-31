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
