-- ============================================================================
-- RELATÓRIO 7: Postos e existência de manutenções
-- ============================================================================

-- Justificação do LEFT JOIN: Permite incluir todos os postos da rede na listagem,
-- garantindo que postos sem histórico de manutenção não fiquem de fora do relatório.

SELECT TOP 10
    s.[id_station],
    s.[code] AS station_code,
    COUNT(m.[id_maintenance]) AS total_maintenances
FROM [station] s
LEFT JOIN [maintenance] m 
    ON s.[id_station] = m.[id_station]
GROUP BY 
    s.[id_station], 
    s.[code]
ORDER BY 
    total_maintenances DESC;
GO