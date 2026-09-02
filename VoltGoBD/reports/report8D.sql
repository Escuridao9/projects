-- ============================================================================
-- RELATÓRIO ESTRATÉGICO: Taxa de Ineficiência e Expiração de Reservas por PostO
-- ============================================================================

SELECT 
    s.[id_station],
    s.[code] AS station_code,
    COUNT(r.[id_reservation]) AS total_reservations,
    SUM(CASE WHEN r.[status] = 'expired' THEN 1 ELSE 0 END) AS expired_reservations,
    CAST(
        (SUM(CASE WHEN r.[status] = 'expired' THEN 1.0 ELSE 0 END) / COUNT(r.[id_reservation])) * 100 
        AS DECIMAL(5,2)
    ) AS no_show_rate_percentage
FROM [station] s
INNER JOIN [reservation] r 
    ON s.[id_station] = r.[id_station]
GROUP BY 
    s.[id_station], 
    s.[code]
ORDER BY 
    no_show_rate_percentage DESC;