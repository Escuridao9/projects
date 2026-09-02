-- ============================================================================
-- RELATÓRIO 2: Postos e número de carregamentos
-- ============================================================================

-- Justificação do LEFT JOIN: O LEFT JOIN garante que postos recentemente instalados 
-- ou sem registo de carregamentos 'terminated' fiquem visíveis com contagem igual a 0.
USE bd_test
GO

SELECT 
    s.[id_station],
    s.[code] AS station_code,
    COUNT(cs.[id_charge]) AS terminated_charge_sessions
FROM [station] AS s
LEFT JOIN [charge_session] AS cs 
    ON s.[id_station] = cs.[id_station] 
   AND cs.[status] = 'terminated'
GROUP BY 
    s.[id_station], 
    s.[code]
ORDER BY 
    terminated_charge_sessions DESC;
GO