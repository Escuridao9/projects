-- ============================================================================
-- RELATÓRIO 1: Carregamentos por tipo de conector
-- ============================================================================

-- Justificação do LEFT JOIN: Utiliza-se LEFT JOIN para garantir que tipos de conector 
-- que ainda não foram utilizados em nenhuma sessão de carregamento continuem a ser 
-- listados no relatório com contagem igual a 0.

SELECT 
    c.[id_connector],
    c.[name] AS connector_type,
    c.[description],
    COUNT(cs.[id_charge]) AS total_charge_sessions
FROM [connector] AS c
LEFT JOIN [charge_session] AS cs 
    ON c.[id_connector] = cs.[id_connector]
GROUP BY 
    c.[id_connector], 
    c.[name], 
    c.[description]
ORDER BY 
    total_charge_sessions DESC;
GO
