function getStationsByStatus(status) {
    const stations = getStations();
    return stations.filter(station => normalizeValue(station.status) === normalizeValue(status));
}

function countMaintenanceStations (status) {
    const reportStations = getStationsByStatus(status).filter(station => stations.status === status);

    if (reportStations.length === 0) return null;

    let totalMaintenace = 0;

    for (const station of reportStations) {
        totalMaintenace += 1
    }
    return totalMaintenace
};

const a = countMaintenanceStations("under maintenace");
console.log(a)