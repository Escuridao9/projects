-- ============================================================================
-- RELATÓRIO 3: Custo médio por tarifário
-- ============================================================================

-- Justificação do INNER JOIN: Usa-se INNER JOIN porque o cálculo do custo médio exige 
-- estritamente que existam sessões de carregamento faturadas associadas aos tarifários.

SELECT 
    t.[id_tariff],
    t.[name] AS tariff_name,
    t.[version] AS tariff_version,
    AVG(ii.[charge_amount]) AS average_invoice_cost
FROM [tariff] AS t
INNER JOIN [charge_session] AS cs 
    ON t.[id_tariff] = cs.[id_tariff] 
   AND t.[version] = cs.[version_tariff]
INNER JOIN [invoice_item] AS ii 
    ON cs.[id_charge] = ii.[id_charge_session]
WHERE 
    cs.[status] = 'invoiced'
GROUP BY 
    t.[id_tariff], 
    t.[name], 
    t.[version];
GO