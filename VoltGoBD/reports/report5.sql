-- ============================================================================
-- RELATÓRIO 5: Carregamentos e respetivos pagamentos
-- ============================================================================

-- Justificação do LEFT JOIN: Utilizam-se múltiplos LEFT JOINs encadeados para garantir 
-- que carregamentos em curso, cancelados ou pendentes de faturação apareçam na 
-- listagem com contagem de pagamento igual a 0.

SELECT 
    cs.[id_charge],
    cs.[start_date_hour],
    cs.[status] AS charge_status,
    COUNT(i.[id_invoice]) AS total_payments_registered
FROM [charge_session] AS cs
LEFT JOIN [invoice_item] AS ii 
    ON cs.[id_charge] = ii.[id_charge_session]
LEFT JOIN [invoice] AS i 
    ON ii.[id_invoice] = i.[id_invoice] 
   AND i.[status] = 'paid'
GROUP BY 
    cs.[id_charge], 
    cs.[start_date_hour], 
    cs.[status];
GO