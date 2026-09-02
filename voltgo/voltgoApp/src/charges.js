const input = require("readline-sync").question;
const { loadData, saveData } = require('./storage');
const { chargeStatuses } = require('./constants');
const { getStations, findStationByCode } = require('./stations');
const { getClients, saveClientsState } = require('./clients');
const { getTariffs } = require('./tariffs');
const {
    normalizeCode,
    normalizeValue,
    getValidValue,
    getNextId,
    validateDate
} = require('./helpers');

const initialCharges = [
    { id: 1, stationCode: "S001", clientId: 1, startDate: "2026-07-15T16:00", endDate: "2026-07-15T17:00", duration: 1, energy: 20, tariffId: 1, cost: 7.50, status: "invoiced" },
    { id: 2, stationCode: "S003", clientId: 1, startDate: "2026-03-26T12:00", endDate: "2026-03-26T12:00", duration: 0, energy: 0, tariffId: 1, cost: 0, status: "cancelled" },
    { id: 3, stationCode: "S002", clientId: 2, startDate: "2026-01-12T10:00", endDate: "2026-01-12T11:00", duration: 1, energy: 100, tariffId: 2, cost: 66.00, status: "terminated" },
    { id: 4, stationCode: "S003", clientId: 2, startDate: "2026-08-12T14:00", endDate: null, duration: null, energy: null, tariffId: 2, cost: null, status: "in process" }
];

let charges = loadData('charges.json', initialCharges);
let inactiveCharges = loadData('inactiveCharges.json', []);

function getCharges() { return charges; }

function saveChargesState() {
    saveData('charges.json', charges);
    saveData('inactiveCharges.json', inactiveCharges);
}

function calculateDuration(startDate, endDate) {
    if (!endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInHours = (end - start) / (1000 * 60 * 60);
    return Number(durationInHours.toFixed(2));
}

function calculateEnergy(stationCode, tariffId, startDate, endDate) {
    const station = findStationByCode(stationCode);
    const tariffs = getTariffs();
    const tariff = tariffs.find(t => t.id === tariffId);

    if (!station || !tariff || !endDate) return null;

    const durationInHours = calculateDuration(startDate, endDate);
    const power = tariff.chargeType === "fast" ? station.fastPower : station.standardPower;
    return Number((power * durationInHours).toFixed(2));
}

function calculateCost(energy, tariffId, power) {
    if (energy === null) return null;
    const tariffs = getTariffs();
    const tariff = tariffs.find(t => t.id === tariffId);

    if (!tariff) return null;

    const cost = (energy * tariff.pricePerKwh * (power / 100)) + tariff.activationFee;
    return Number(cost.toFixed(2));
}

function hasStationTimeConflict(stationCode, startDate, endDate, excludeChargeId) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    return charges.some(charge => {
        if (charge.id === excludeChargeId || charge.stationCode !== stationCode || charge.status === "cancelled") {
            return false;
        }

        const chargeStart = new Date(charge.startDate);
        const chargeEnd = charge.endDate ? new Date(charge.endDate) : null;

        const thisEnd = end || new Date(8640000000000000);
        const otherEnd = chargeEnd || new Date(8640000000000000);

        return start < otherEnd && chargeStart < thisEnd;
    });
}

function showCharges() {
    if (charges.length === 0) {
        console.log("There are no charges.");
        return;
    }
    console.log("\nID | Station | Client | Start | End | Duration | Energy | Tariff | Cost | Status");
    console.log("---------------------------------------------------------------------");
    for (const charge of charges) {
        console.log(`${charge.id} | ${charge.stationCode} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.duration} h | ${charge.energy} kWh | ${charge.tariffId} | ${charge.cost} € | ${charge.status}`);
    }
}

function createCharge(stationCode, clientId, startDate, endDate, tariffId, status) {
    stationCode = normalizeCode(stationCode);
    clientId = Number(clientId);
    tariffId = Number(tariffId);
    const validStatus = getValidValue(status, chargeStatuses);
    const id = getNextId(charges, inactiveCharges);

    if (!validateCharge("create", id, stationCode, clientId, startDate, endDate, tariffId, validStatus)) return;

    const duration = calculateDuration(startDate, endDate);
    const energy = calculateEnergy(stationCode, tariffId, startDate, endDate);
    const station = findStationByCode(stationCode);
    const tariffs = getTariffs();
    const tariff = tariffs.find(t => t.id === tariffId);

    const power = tariff.chargeType === "fast" ? station.fastPower : station.standardPower;
    const cost = validStatus === "cancelled" ? 0 : calculateCost(energy, tariffId, power);

    if (validStatus === "invoiced") {
        const clients = getClients();
        const client = clients.find(c => c.id === clientId);
        const pointsMultiplier = tariff.chargeType === "fast" ? 2 : 1;
        client.points += Math.floor(cost * pointsMultiplier);
        saveClientsState();
    }

    const newCharge = {
        id, stationCode, clientId, startDate, endDate, duration, energy, tariffId, cost, status: validStatus
    };

    charges.push(newCharge);
    saveChargesState();
    console.log(`Charge created successfully with ID ${newCharge.id}.`);
}

function updateCharge(id, stationCode, clientId, startDate, endDate, tariffId, status) {
    stationCode = normalizeCode(stationCode);
    clientId = Number(clientId);
    tariffId = Number(tariffId);
    const validStatus = getValidValue(status, chargeStatuses);

    if (!validateCharge("update", id, stationCode, clientId, startDate, endDate, tariffId, validStatus)) return;

    const duration = calculateDuration(startDate, endDate);
    const energy = calculateEnergy(stationCode, tariffId, startDate, endDate);
    const station = findStationByCode(stationCode);
    const tariffs = getTariffs();
    const tariff = tariffs.find(t => t.id === tariffId);

    const power = tariff.chargeType === "fast" ? station.fastPower : station.standardPower;
    const cost = validStatus === "cancelled" ? 0 : calculateCost(energy, tariffId, power);

    const charge = charges.find(c => c.id === id);
    charge.stationCode = stationCode;
    charge.clientId = clientId;
    charge.startDate = startDate;
    charge.endDate = endDate;
    charge.duration = duration;
    charge.energy = energy;
    charge.tariffId = tariffId;
    charge.cost = cost;
    charge.status = validStatus;

    saveChargesState();
    console.log("Charge updated successfully.");
}

function removeCharge(id) {
    if (!validateCharge("remove", id)) return;

    const index = charges.findIndex(charge => charge.id === id);
    const removedCharge = charges.splice(index, 1)[0];
    inactiveCharges.push(removedCharge);

    saveChargesState();
    console.log(`Charge ID ${removedCharge.id} moved to inactive charges.`);
}

function validateCharge(operation, id, stationCode, clientId, startDate, endDate, tariffId, status) {
    const stations = getStations();
    const clients = getClients();
    const tariffs = getTariffs();

    if (operation === "update" || operation === "remove") {
        if (!charges.some(c => c.id === id)) {
            console.log("Charge not found.");
            return false;
        }
        if (operation === "remove") return true;
    }

    if (!stations.some(s => normalizeCode(s.code) === normalizeCode(stationCode))) {
        console.log("Station not found.");
        return false;
    }
    if (!clients.some(c => c.id === clientId)) {
        console.log("Client not found.");
        return false;
    }
    if (!validateDate(startDate)) {
        console.log("Invalid start date. Use the format YYYY-MM-DDTHH:MM.");
        return false;
    }
    if (!chargeStatuses.includes(status)) {
        console.log("Invalid charge status.");
        return false;
    }

    if (status === "in process") {
        if (endDate !== null) {
            console.log("A charge in process cannot have an end date.");
            return false;
        }
    } else {
        if (!validateDate(endDate)) {
            console.log("Invalid end date. Use the format YYYY-MM-DDTHH:MM.");
            return false;
        }
        if (new Date(endDate) <= new Date(startDate) && status !== "cancelled") {
            console.log("End date must be after start date.");
            return false;
        }
        if (new Date(endDate).getTime() !== new Date(startDate).getTime() && status === "cancelled") {
            console.log("End date must be the same as start date.");
            return false;
        }
    }

    if (!tariffs.some(t => t.id === tariffId)) {
        console.log("Tariff not found.");
        return false;
    }
    if (hasStationTimeConflict(stationCode, startDate, endDate, id)) {
        console.log("This station already has a charge scheduled during that time.");
        return false;
    }
    if (new Date(startDate) > new Date()) {
        console.log("Start date cannot be in the future.");
        return false;
    }

    return true;
}

function showChargeMenu() {
    let option;
    do {
        console.log("\n=============== CHARGES ==============");
        console.log("1. Show charges\n2. Create charge\n3. Update charge\n4. Remove charge\n0. Back");
        option = input("Choose an option: ");

        switch (option) {
            case "1": showCharges(); break;
            case "2": {
                const stationCode = input("Station code: ");
                const clientId = Number(input("Client ID: "));
                const tariffId = Number(input("Tariff ID: "));
                const status = input("Status: ");
                const validStatus = getValidValue(status, chargeStatuses);
                const startDate = input("Start date: ");
                let endDate = validStatus !== "in process" ? input("End date: ") : null;
                createCharge(stationCode, clientId, startDate, endDate, tariffId, status);
                break;
            }
            case "3": {
                const updateId = Number(input("Charge ID: "));
                const updateStationCode = input("Station code: ");
                const updateClientId = Number(input("Client ID: "));
                const updateTariffId = Number(input("Tariff ID: "));
                const updateStatus = input("Status: ");
                const validUpdateStatus = getValidValue(updateStatus, chargeStatuses);
                const updateStartDate = input("Start date: ");
                let updateEndDate = validUpdateStatus !== "in process" ? input("End date: ") : null;
                updateCharge(updateId, updateStationCode, updateClientId, updateStartDate, updateEndDate, updateTariffId, updateStatus);
                break;
            }
            case "4": removeCharge(Number(input("Charge ID: "))); break;
            case "0": break;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}




module.exports = {
    getCharges,
    showChargeMenu
};

