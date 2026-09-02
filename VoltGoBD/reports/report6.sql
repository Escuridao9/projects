-- ============================================================================
-- RELATÓRIO 6: Concelhos e valor total faturado
-- ============================================================================

-- Justificação do LEFT JOIN: Utiliza-se LEFT JOIN a partir de concelho para permitir 
-- a agregação financeira completa e prevenir perda de dados de postos sem faturas.

SELECT 
    m.[id_municipality],
    m.[name] AS municipality_name,
    ISNULL(SUM(ii.[charge_amount]), 0.00) AS total_invoiced_amount
FROM [municipality] AS m
LEFT JOIN [station] AS s 
    ON m.[id_municipality] = s.[id_municipality]
LEFT JOIN [charge_session] AS cs 
    ON s.[id_station] = cs.[id_station]
LEFT JOIN [invoice_item] AS ii 
    ON cs.[id_charge] = ii.[id_charge_session]
GROUP BY 
    m.[id_municipality], 
    m.[name]
HAVING 
    ISNULL(SUM(ii.[charge_amount]), 0.00) > 10.00;
GO