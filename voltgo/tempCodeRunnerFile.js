function countMaintenanceStations (stations, status) {

    if (!station) return 0;

    const reportStations = stations.filter(s => normalizeValue(s.status) === normalizeValue(status));

    return reportStations.length
};

const a = countMaintenanceStations(stations, "under maintenace");
console.log(a)