-- ============================================================================
-- RELATÓRIO 4: Clientes e número de carregamentos
-- ============================================================================

-- Justificação do LEFT JOIN: Permite listar a totalidade da base de clientes, mesmo 
-- aqueles que ainda não realizaram qualquer carregamento.

SELECT 
    c.[id_client],
    CONCAT(c.[first_name], ' ', c.[last_name]) AS client_name,
    c.[type] AS client_type,
    COUNT(cs.[id_charge]) AS total_charge_sessions
FROM [client] AS c
LEFT JOIN [charge_session] AS cs 
    ON c.[id_client] = cs.[id_client]
GROUP BY 
    c.[id_client], 
    c.[first_name], 
    c.[last_name], 
    c.[type]
HAVING 
    COUNT(cs.[id_charge]) > 1;
GO