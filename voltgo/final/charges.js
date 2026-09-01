const input = require("readline-sync").question;

const {
    stations,
    clients,
    tariffs,
    charges,
    inactiveCharges,
    chargeStatuses
} = require("./data");

const {
    normalizeCode,
    getValidValue,
    getNextId,
    validateDate
} = require("./helpers");

const { findStationByCode } = require("./stations");

// ==================== CALCULATIONS ====================

function calculateDuration(
    startDate,
    endDate
) {

    if (!endDate) return null;

    const start =
        new Date(startDate);

    const end =
        new Date(endDate);

    const durationInHours =
        (end - start) /
        (1000 * 60 * 60);

    return Number(
        durationInHours.toFixed(2)
    );
}

function calculateEnergy(
    stationCode,
    tariffId,
    startDate,
    endDate
) {

    const station =
        findStationByCode(stationCode);

    if (!station) {
        return null;
    }

    if (!endDate) {
        return null;
    }

    const tariff =
        tariffs.find(
            tariff => tariff.id === tariffId
        );

    if (!tariff) {
        return null;
    }

    const durationInHours =
        calculateDuration(
            startDate,
            endDate
        );

    const power =
        tariff.chargeType === "fast"
            ? station.fastPower
            : station.standardPower;

    const energy =
        power * durationInHours;

    return Number(
        energy.toFixed(2)
    );
}

function calculateCost(
    energy,
    tariffId,
    power
) {

    if (energy === null) {
        return null;
    }

    const tariff =
        tariffs.find(
            tariff => tariff.id === tariffId
        );

    if (!tariff) {
        return null;
    }

    const cost =
        (energy *
            tariff.pricePerKwh *
            (power / 100)) +
        tariff.activationFee;

    return Number(
        cost.toFixed(2)
    );
}

// ==================== CONFLICT CHECK ====================

function hasStationTimeConflict(
    stationCode,
    startDate,
    endDate,
    excludeChargeId
) {

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    return charges.some(charge => {

        if (charge.id === excludeChargeId) {
            return false;
        }

        if (charge.stationCode !== stationCode) {
            return false;
        }

        if (charge.status === "cancelled") {
            return false;
        }

        const chargeStart = new Date(charge.startDate);
        const chargeEnd = charge.endDate ? new Date(charge.endDate) : null;

        const thisEnd = end || new Date(8640000000000000);
        const otherEnd = chargeEnd || new Date(8640000000000000);

        return start < otherEnd && chargeStart < thisEnd;
    });
}

// ==================== SHOW ====================

function showCharges() {

    if (charges.length === 0) {
        console.log("There are no charges.");
        return;
    }

    console.log(
        "\nID | Station | Client | Start | End | Duration | Energy | Tariff | Cost | Status"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of charges) {

        console.log(
            `${charge.id} | ${charge.stationCode} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.duration} h | ${charge.energy} kWh | ${charge.tariffId} | ${charge.cost} € | ${charge.status}`
        );

    }
}

// ==================== CREATE ====================

function createCharge(
    stationCode,
    clientId,
    startDate,
    endDate,
    tariffId,
    status
) {

    stationCode = normalizeCode(stationCode);

    clientId = Number(clientId);

    tariffId = Number(tariffId);

    const validStatus = getValidValue(status, chargeStatuses);

    const id = getNextId(charges, inactiveCharges);

    if (!validateCharge(
        "create",
        id,
        stationCode,
        clientId,
        startDate,
        endDate,
        tariffId,
        validStatus
    )) {
        return;
    }

    const duration = calculateDuration(startDate, endDate);

    const energy =
        calculateEnergy(
            stationCode,
            tariffId,
            startDate,
            endDate
        );

    const station =
        findStationByCode(stationCode);

    const tariff =
        tariffs.find(
            tariff => tariff.id === tariffId
        );

    const power =
        tariff.chargeType === "fast"
            ? station.fastPower
            : station.standardPower;

    const cost =
        validStatus === "cancelled"
            ? 0
            : calculateCost(
                energy,
                tariffId,
                power
            );

    if (validStatus === "invoiced") {

        const client =
            clients.find(
                client => client.id === clientId
            );

        const pointsMultiplier =
            tariff.chargeType === "fast"
                ? 2
                : 1;

        client.points +=
            Math.floor(
                cost * pointsMultiplier
            );
    }

    const newCharge = {
        id: id,
        stationCode: stationCode,
        clientId: clientId,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        energy: energy,
        tariffId: tariffId,
        cost: cost,
        status: validStatus
    };

    charges.push(newCharge);

    console.log(
        `Charge created successfully with ID ${newCharge.id}.`
    );
}

// ==================== UPDATE ====================

function updateCharge(
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    tariffId,
    status
) {

    stationCode = normalizeCode(stationCode);

    clientId =
        Number(clientId);

    tariffId =
        Number(tariffId);

    const validStatus =
        getValidValue(
            status,
            chargeStatuses
        );

    if (!validateCharge(
        "update",
        id,
        stationCode,
        clientId,
        startDate,
        endDate,
        tariffId,
        validStatus
    )) {
        return;
    }

    const duration =
        calculateDuration(
            startDate,
            endDate
        );

    const energy =
        calculateEnergy(
            stationCode,
            tariffId,
            startDate,
            endDate
        );

    const station =
        findStationByCode(stationCode);

    const tariff =
        tariffs.find(
            tariff => tariff.id === tariffId
        );

    const power =
        tariff.chargeType === "fast"
            ? station.fastPower
            : station.standardPower;

    const cost =
        validStatus === "cancelled"
            ? 0
            : calculateCost(
                energy,
                tariffId,
                power
            );

    const charge =
        charges.find(
            charge => charge.id === id
        );

    charge.stationCode = stationCode;
    charge.clientId = clientId;
    charge.startDate = startDate;
    charge.endDate = endDate;
    charge.duration = duration;
    charge.energy = energy;
    charge.tariffId = tariffId;
    charge.cost = cost;
    charge.status = validStatus;

    console.log("Charge updated successfully.");
}

// ==================== REMOVE ====================

function removeCharge(id) {

    if (!validateCharge(
        "remove",
        id
    )) {
        return;
    }

    const index =
        charges.findIndex(
            charge => charge.id === id
        );

    const removedCharge =
        charges.splice(index, 1)[0];

    inactiveCharges.push(
        removedCharge
    );

    console.log(
        `Charge ID ${removedCharge.id} moved to inactive charges.`
    );
}

// ==================== VALIDATE ====================

function validateCharge(
    operation,
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    tariffId,
    status
) {

    if (operation === "update") {

        if (!charges.some(
            charge => charge.id === id
        )) {
            console.log("Charge not found.");
            return false;
        }

    } else if (operation === "remove") {

        if (!charges.some(
            charge => charge.id === id
        )) {
            console.log("Charge not found.");
            return false;
        }

        return true;

    } else if (operation !== "create") {

        console.log("Invalid operation.");
        return false;
    }

    if (!stations.some(station => normalizeCode(station.code) === normalizeCode(stationCode))) {
        console.log("Station not found.");
        return false;
    }

    if (!clients.some(
        client => client.id === clientId
    )) {
        console.log("Client not found.");
        return false;
    }

    if (!validateDate(startDate)) {
        console.log(
            "Invalid start date. Use the format YYYY-MM-DDTHH:MM."
        );
        return false;
    }

    if (!chargeStatuses.includes(status)) {
        console.log("Invalid charge status.");
        return false;
    }

    if (status === "in process") {

        if (endDate !== null) {
            console.log(
                "A charge in process cannot have an end date."
            );
            return false;
        }

    } else {

        if (!validateDate(endDate)) {
            console.log(
                "Invalid end date. Use the format YYYY-MM-DDTHH:MM."
            );
            return false;
        }

        if (
            new Date(endDate) <=
            new Date(startDate) &&
            status !== "cancelled"
        ) {
            console.log(
                "End date must be after start date."
            );
            return false;
        }

        if (
            new Date(endDate).getTime() !==
            new Date(startDate).getTime() &&
            status === "cancelled"
        ) {
            console.log(
                "End date must be the same as start date."
            );
            return false;
        }
    }

    if (!tariffs.some(
        tariff => tariff.id === tariffId
    )) {
        console.log("Tariff not found.");
        return false;
    }

    if (hasStationTimeConflict(stationCode, startDate, endDate, id)) {
        console.log(
            "This station already has a charge scheduled during that time."
        );
        return false;
    }

    if (new Date(startDate) > new Date()) {
        console.log(
            "Start date cannot be in the future."
        );
        return false;
    }

    return true;
}

// ==================== MENU ====================

function showChargeMenu() {

    let option;

    do {

        console.log("\n=============== CHARGES ==============");
        console.log("1. Show charges");
        console.log("2. Create charge");
        console.log("3. Update charge");
        console.log("4. Remove charge");
        console.log("0. Back");

        option =
            input("Choose an option: ");

        switch (option) {

            case "1":

                showCharges();
                break;


            case "2":

                const stationCode =
                    input("Station code: ");

                const clientId =
                    Number(input("Client ID: "));

                const tariffId =
                    Number(input("Tariff ID: "));

                const status =
                    input("Status: ");

                const validStatus =
                    getValidValue(
                        status,
                        chargeStatuses
                    );

                const startDate =
                    input("Start date: ");

                let endDate = null;

                if (validStatus !== "in process") {
                    endDate =
                        input("End date: ");
                }

                createCharge(
                    stationCode,
                    clientId,
                    startDate,
                    endDate,
                    tariffId,
                    status
                );

                break;


            case "3":

                const updateId =
                    Number(input("Charge ID: "));

                const updateStationCode =
                    input("Station code: ");

                const updateClientId =
                    Number(input("Client ID: "));

                const updateTariffId =
                    Number(input("Tariff ID: "));

                const updateStatus =
                    input("Status: ");

                const validUpdateStatus =
                    getValidValue(
                        updateStatus,
                        chargeStatuses
                    );

                const updateStartDate =
                    input("Start date: ");

                let updateEndDate = null;

                if (
                    validUpdateStatus !==
                    "in process"
                ) {
                    updateEndDate =
                        input("End date: ");
                }

                updateCharge(
                    updateId,
                    updateStationCode,
                    updateClientId,
                    updateStartDate,
                    updateEndDate,
                    updateTariffId,
                    updateStatus
                );

                break;


            case "4":

                const removeId =
                    Number(input("Charge ID: "));

                removeCharge(removeId);

                break;


            case "0":

                break;


            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
}

module.exports = {
    calculateDuration,
    calculateEnergy,
    calculateCost,
    hasStationTimeConflict,
    showCharges,
    createCharge,
    updateCharge,
    removeCharge,
    validateCharge,
    showChargeMenu
};