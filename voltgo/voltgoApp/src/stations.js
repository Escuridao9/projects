const input = require("readline-sync").question;
const { loadData, saveData } = require('./storage');
const { stationStatuses } = require('./constants');
const {
    normalizeCode,
    getValidValue,
    getValidDistrict,
    getValidMunicipality,
    getNextId,
    getLocalDateTime
} = require('./helpers');

const initialStations = [
    { id: 1, code: "S001", district: "Braga", municipality: "Braga", standardPower: 20, fastPower: 100, connectorType: "MJG", status: "active", lastMaintenance: "2026-08-26T16:00" },
    { id: 2, code: "S002", district: "Porto", municipality: "Porto", standardPower: 20, fastPower: 100, connectorType: "DSG", status: "under maintenance", lastMaintenance: "2026-08-10T09:00" },
    { id: 3, code: "S003", district: "Coimbra", municipality: "Coimbra", standardPower: 20, fastPower: 100, connectorType: "MJG", status: "active", lastMaintenance: "2026-08-02T11:00" },
    { id: 4, code: "S004", district: "Lisboa", municipality: "Lisboa", standardPower: 20, fastPower: 100, connectorType: "MGS", status: "active", lastMaintenance: "2026-08-20T14:00" }
];

let stations = loadData('stations.json', initialStations);
let inactiveStations = loadData('inactiveStations.json', []);

const maintenanceInterval = 15 * 24 * 60 * 60 * 1000;

function getStations() { return stations; }

function saveStationsState() {
    saveData('stations.json', stations);
    saveData('inactiveStations.json', inactiveStations);
}

function findStationByCode(code) {
    return stations.find(station => normalizeCode(station.code) === normalizeCode(code));
}

function isMaintenanceDue(station) {
    const lastMaintenance = new Date(station.lastMaintenance);
    const now = new Date();
    return now - lastMaintenance >= maintenanceInterval;
}

function performMaintenance(code) {
    code = normalizeCode(code);
    const station = findStationByCode(code);

    if (!station) {
        console.log("Station not found.");
        return;
    }

    station.lastMaintenance = getLocalDateTime();
    station.status = "active";
    saveStationsState();

    console.log(`Maintenance performed successfully on station ${station.code}.`);
    console.log(`Last maintenance: ${station.lastMaintenance}`);
}

function createStation(code, district, municipality, power, connectorType, status) {
    code = normalizeCode(code);
    connectorType = normalizeCode(connectorType);

    if (!validateStation("create", code, district, municipality, power, connectorType, status)) return;

    const validDistrict = getValidDistrict(district);
    const validMunicipality = getValidMunicipality(validDistrict, municipality);
    const validStatus = getValidValue(status, stationStatuses);

    const newStation = {
        id: getNextId(stations, inactiveStations),
        code: code,
        district: validDistrict,
        municipality: validMunicipality,
        standardPower: Number(power * 0.20),
        fastPower: power,
        connectorType: connectorType,
        status: validStatus,
        lastMaintenance: getLocalDateTime()
    };

    stations.push(newStation);
    saveStationsState();
    console.log(`Station created successfully with ID ${newStation.id}.`);
}

function showStations() {
    if (stations.length === 0) {
        console.log("There are no stations.");
        return;
    }
    console.log("\nID | Code | District | Municipality | Standard Power | Fast Power | Connector | Status | Last Maintenance");
    console.log("----------------------------------------------------------------------------------------------------------");
    for (const station of stations) {
        console.log(`${station.id} | ${station.code} | ${station.district} | ${station.municipality} | ${station.standardPower} kW | ${station.fastPower} kW | ${station.connectorType} | ${station.status} | ${station.lastMaintenance}`);
    }
}

function updateStation(code, district, municipality, power, connectorType, status) {
    code = normalizeCode(code);
    connectorType = normalizeCode(connectorType);

    if (!validateStation("update", code, district, municipality, power, connectorType, status)) return;

    const station = findStationByCode(code);
    station.district = getValidDistrict(district);
    station.municipality = getValidMunicipality(station.district, municipality);
    station.standardPower = Number(power * 0.20);
    station.fastPower = power;
    station.connectorType = connectorType;
    station.status = getValidValue(status, stationStatuses);

    saveStationsState();
    console.log("Station updated successfully.");
}

function removeStation(code) {
    code = normalizeCode(code);
    if (!validateStation("remove", code)) return;

    const index = stations.findIndex(station => station.code === code);
    const removedStation = stations.splice(index, 1)[0];
    inactiveStations.push(removedStation);

    saveStationsState();
    console.log(`Station ID ${removedStation.id} moved to inactive stations.`);
}

function validateStation(operation, code, district, municipality, power, connectorType, status) {
    const { getCharges } = require('./charges');
    const station = findStationByCode(code);

    if (operation === "create") {
        if (!/^S\d{3}$/.test(code)) {
            console.log("Code must have the letter S, followed by three digits: e.g. S234");
            return false;
        }
        if (station) {
            console.log("There's already a station with that code.");
            return false;
        }
    } else if (operation === "update" || operation === "remove") {
        if (!station) {
            console.log("Station not found.");
            return false;
        }
        if (operation === "remove") {
            const charges = getCharges();
            if (charges.some(charge => charge.stationCode === code)) {
                console.log("It's not possible to remove that station because there are charges associated with it.");
                return false;
            }
            return true;
        }
    }

    if (!getValidDistrict(district)) {
        console.log("Invalid district.");
        return false;
    }
    if (!getValidMunicipality(district, municipality)) {
        console.log("Invalid municipality for the selected district.");
        return false;
    }
    if (isNaN(power) || power <= 0) {
        console.log("Power must be greater than zero.");
        return false;
    }
    if (!/^[A-Z]{3}$/.test(connectorType)) {
        console.log("Connector type must be three uppercase letters: e.g. RTG");
        return false;
    }
    if (!getValidValue(status, stationStatuses)) {
        console.log("Invalid status.");
        return false;
    }

    return true;
}

function showStationsMenu() {
    let option;
    do {
        console.log("\n=============== STATIONS ==============");
        console.log("1. Show stations\n2. Create station\n3. Update station\n4. Remove station\n5. Perform maintenance\n0. Back");
        option = input("Choose an option: ");

        switch (option) {
            case "1": showStations(); break;
            case "2": createStation(input("Code: "), input("District: "), input("Municipality: "), Number(input("Power: ")), input("Connector type: "), input("Status: ")); break;
            case "3": updateStation(input("Code: "), input("New district: "), input("New municipality: "), Number(input("New power: ")), input("New connector type: "), input("New status: ")); break;
            case "4": removeStation(input("Code: ")); break;
            case "5": performMaintenance(input("Station code: ")); break;
            case "0": break;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}

module.exports = {
    getStations,
    findStationByCode,
    isMaintenanceDue,
    showStationsMenu
};