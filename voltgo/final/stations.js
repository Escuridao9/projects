const input = require("readline-sync").question;

const {
    stations,
    inactiveStations,
    stationStatuses,
    charges
} = require("./data");

const {
    normalizeCode,
    getValidDistrict,
    getValidMunicipality,
    getValidValue,
    getNextId,
    getLocalDateTime
} = require("./helpers");

// ==================== LOOKUP ====================

function findStationByCode(code) {
    return stations.find(
        station => normalizeCode(station.code) === normalizeCode(code)
    );
}

// ==================== CREATE ====================

function createStation(
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    code = normalizeCode(code);
    connectorType = normalizeCode(connectorType);

    if (!validateStation(
        "create",
        code,
        district,
        municipality,
        power,
        connectorType,
        status
    )) {
        return;
    }

    const validDistrict =
        getValidDistrict(district);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

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

    console.log(
        `Station created successfully with ID ${newStation.id}.`
    );
}

// ==================== SHOW ====================

function showStations() {

    if (stations.length === 0) {
        console.log("There are no stations.");
        return;
    }

    console.log(
        "\nID | Code | District | Municipality | Standard Power | Fast Power | Connector | Status | Last Maintenance"
    );

    console.log(
        "----------------------------------------------------------------------------------------------------------"
    );

    for (const station of stations) {

        console.log(
            `${station.id} | ${station.code} | ${station.district} | ${station.municipality} | ${station.standardPower} kW | ${station.fastPower} kW | ${station.connectorType} | ${station.status} | ${station.lastMaintenance}`
        );

    }
}

// ==================== UPDATE ====================

function updateStation(
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    code = normalizeCode(code);
    connectorType = normalizeCode(connectorType);

    if (!validateStation(
        "update",
        code,
        district,
        municipality,
        power,
        connectorType,
        status
    )) {
        return;
    }

    const station =
        findStationByCode(code);

    const validDistrict =
        getValidDistrict(district);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    station.district = validDistrict;
    station.municipality = validMunicipality;
    station.standardPower = Number(power * 0.20);
    station.fastPower = power;
    station.connectorType = connectorType;
    station.status = validStatus;

    console.log("Station updated successfully.");
}

// ==================== REMOVE ====================

function removeStation(code) {

    code = normalizeCode(code);

    if (!validateStation(
        "remove",
        code
    )) {
        return;
    }

    const index =
        stations.findIndex(
            station => station.code === code
        );

    const removedStation =
        stations.splice(index, 1)[0];

    inactiveStations.push(removedStation);

    console.log(
        `Station ID ${removedStation.id} moved to inactive stations.`
    );
}

// ==================== VALIDATE ====================

function validateStation(
    operation,
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    const station =
        findStationByCode(code);

    if (operation === "create") {

        if (!/^S\d{3}$/.test(code)) {
            console.log(
                "Code must have the letter S, followed by three digits: e.g. S234"
            );
            return false;
        }

        if (station) {
            console.log(
                "There's already a station with that code."
            );
            return false;
        }

    } else if (operation === "update") {

        if (!station) {
            console.log("Station not found.");
            return false;
        }

    } else if (operation === "remove") {

        if (!station) {
            console.log("Station not found.");
            return false;
        }

        if (charges.some(
            charge => charge.stationCode === code
        )) {
            console.log(
                "It's not possible to remove that station because there are charges associated with it."
            );
            return false;
        }

        return true;

    } else {

        console.log("Invalid operation.");
        return false;
    }

    // Shared create/update validation

    if (!getValidDistrict(district)) {
        console.log("Invalid district.");
        return false;
    }

    if (!getValidMunicipality(
        district,
        municipality
    )) {
        console.log(
            "Invalid municipality for the selected district."
        );
        return false;
    }

    if (isNaN(power) || power <= 0) {
        console.log(
            "Power must be greater than zero."
        );
        return false;
    }

    if (!/^[A-Z]{3}$/.test(connectorType)) {
        console.log(
            "Connector type must be three uppercase letters: e.g. RTG"
        );
        return false;
    }

    if (!getValidValue(status, stationStatuses)) {
        console.log("Invalid status.");
        return false;
    }

    return true;
}

// ==================== MAINTENANCE ====================

function performMaintenance(code) {

    code = normalizeCode(code);

    const station =
        findStationByCode(code);

    if (!station) {
        console.log("Station not found.");
        return;
    }

    station.lastMaintenance = getLocalDateTime();

    station.status = "active";

    console.log(
        `Maintenance performed successfully on station ${station.code}.`
    );

    console.log(
        `Last maintenance: ${station.lastMaintenance}`
    );
}

// ==================== MENU ====================

function showStationsMenu() {

    let option;

    do {

        console.log("\n=============== STATIONS ==============");
        console.log("1. Show stations");
        console.log("2. Create station");
        console.log("3. Update station");
        console.log("4. Remove station");
        console.log("5. Perform maintenance");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showStations();
                break;


            case "2":

                const code =
                    input("Code: ");

                const district =
                    input("District: ");

                const municipality =
                    input("Municipality: ");

                const power =
                    Number(input("Power: "));

                const connectorType =
                    input("Connector type: ");

                const status =
                    input("Status: ");

                createStation(
                    code,
                    district,
                    municipality,
                    power,
                    connectorType,
                    status
                );

                break;


            case "3":

                const updateCode =
                    input("Code: ");

                const updateDistrict =
                    input("New district: ");

                const updateMunicipality =
                    input("New municipality: ");

                const updatePower =
                    Number(input("New power: "));

                const updateConnectorType =
                    input("New connector type: ");

                const updateStatus =
                    input("New status: ");

                updateStation(
                    updateCode,
                    updateDistrict,
                    updateMunicipality,
                    updatePower,
                    updateConnectorType,
                    updateStatus
                );

                break;


            case "4":

                const removeCode =
                    input("Code: ");

                removeStation(removeCode);

                break;


            case "5":

                const maintenanceCode =
                    input("Station code: ");

                performMaintenance(maintenanceCode);

                break;


            case "0":

                break;


            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
}

module.exports = {
    findStationByCode,
    createStation,
    showStations,
    updateStation,
    removeStation,
    validateStation,
    performMaintenance,
    showStationsMenu
};