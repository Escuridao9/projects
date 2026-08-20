// functions that show, create, update or remove a station

// function that shows all stations

function showStations() {

    if (stations.length === 0) {
        console.log("There are no stations.");
        return;
    }

    console.log(
        "\nID | Code | District | Municipality | Power | Connector | Status"
    );

    console.log(
        "--------------------------------------------------------------------------------"
    );

    for (const station of stations) {

        console.log(
            `${station.id} | ${station.code} | ${station.district} | ${station.municipality} | ${station.power} kW | ${station.connectorType} | ${station.status}`
        );

    }
}

// function that creates a station

function createStation(
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    code = code.toUpperCase();
    connectorType = connectorType.toUpperCase();

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
        getValidValue(district, districts);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    const newStation = {
        id: getNextId(
            stations,
            inactiveStations
        ),
        code: code,
        district: validDistrict,
        municipality: validMunicipality,
        power: power,
        connectorType: connectorType,
        status: validStatus,
    };

    stations.push(newStation);

    console.log(
        `Station created successfully with ID ${newStation.id}.`
    );
}

// function that updates a station's info

function updateStation(
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    code = code.toUpperCase();
    connectorType = connectorType.toUpperCase();

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

    const station = stations.find(
        station => station.code === code
    );

    const validDistrict =
        getValidValue(district, districts);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    station.district = validDistrict;
    station.municipality = validMunicipality;
    station.power = power;
    station.connectorType = connectorType;
    station.status = validStatus;

    console.log("Station updated successfully.");
}

// function that removes a station

function removeStation(code) {

    code = code.toUpperCase();

    if (!validateStation(
        "remove",
        code
    )) {
        return;
    }

    const index = stations.findIndex(
        station => station.code === code
    );

    const removedStation = stations.splice(index, 1)[0];

    inactiveStations.push(removedStation);

    console.log(
        `Station ID ${removedStation.id} moved to inactive stations.`
    );
}