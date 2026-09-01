const input = require("readline-sync").question;
const { getStations, findStationByCode } = require('./stations');
const { findClientByTIF } = require('./clients');
const { getCharges } = require('./charges');
const { normalizeValue, normalizeCode, calculateAge } = require('./helpers');

function getChargesByStatus(status) {
    const charges = getCharges();
    return charges.filter(charge => normalizeValue(charge.status) === normalizeValue(status));
}

function reportChargesByStation(stationCode, status) {
    stationCode = normalizeCode(stationCode);
    const reportCharges = getChargesByStatus(status).filter(charge => charge.stationCode === stationCode);

    if (reportCharges.length === 0) return null;

    let totalEnergy = 0;
    let totalCost = 0;
    for (const charge of reportCharges) {
        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    return { stationCode, charges: reportCharges, totalEnergy, totalCost };
}

function reportChargesByClient(tif, status) {
    const client = findClientByTIF(tif);
    if (!client) return null;

    const reportCharges = getChargesByStatus(status).filter(charge => charge.clientId === client.id);
    if (reportCharges.length === 0) return null;

    let totalEnergy = 0;
    let totalCost = 0;
    for (const charge of reportCharges) {
        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    return { client, charges: reportCharges, totalEnergy, totalCost };
}

function reportClientCharges(tif) {
    const client = findClientByTIF(tif);
    if (!client) return null;

    const charges = getCharges();
    const clientCharges = charges.filter(charge => charge.clientId === client.id);
    if (clientCharges.length === 0) return null;

    let totalEnergy = 0;
    for (const charge of clientCharges) {
        totalEnergy += charge.energy;
    }

    return {
        client,
        age: calculateAge(client.dob),
        numberOfCharges: clientCharges.length,
        totalEnergy: Number(totalEnergy.toFixed(2))
    };
}

function showStatusReportMenu() {
    let option;
    do {
        console.log("\n===== CHARGE STATUS =====");
        console.log("1. Terminated\n2. Invoiced\n0. Back");
        option = input("Choose an option: ");

        switch (option) {
            case "1": return "terminated";
            case "2": return "invoiced";
            case "0": return null;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}

function showChargesByStationMenu() {
    const stationCode = input("Station code: ");
    const station = findStationByCode(stationCode);

    if (!station) {
        console.log("Station not found.");
        return;
    }

    const status = showStatusReportMenu();
    if (!status) return;

    const report = reportChargesByStation(stationCode, status);
    if (!report) {
        console.log(`No ${status} charges found for this station.`);
        return;
    }

    console.log("\n===== CHARGES REPORT BY STATION =====");
    console.log(`Station: ${report.stationCode}`);
    console.log("\nID | Client ID | Start | End | Energy | Cost");
    console.log("---------------------------------------------------------------------");

    for (const charge of report.charges) {
        console.log(`${charge.id} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`);
    }

    console.log("---------------------------------------------------------------------");
    console.log(`Total energy: ${report.totalEnergy.toFixed(2)} kWh`);
    console.log(`Total cost: ${report.totalCost.toFixed(2)} €`);
}

function showChargesByClientMenu() {
    const clientTif = input("Client TIF: ");
    const client = findClientByTIF(clientTif);

    if (!client) {
        console.log("Client not found.");
        return;
    }

    const status = showStatusReportMenu();
    if (!status) return;

    const report = reportChargesByClient(clientTif, status);
    if (!report) {
        console.log(`No ${status} charges found for this client.`);
        return;
    }

    console.log("\n===== CHARGES REPORT BY CLIENT =====");
    console.log(`Client: ${report.client.firstName} ${report.client.lastName}`);
    console.log(`TIF: ${report.client.tif}`);
    console.log("\nID | Station | Start | End | Energy | Cost");
    console.log("---------------------------------------------------------------------");

    for (const charge of report.charges) {
        console.log(`${charge.id} | ${charge.stationCode} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`);
    }

    console.log("---------------------------------------------------------------------");
    console.log(`Total energy: ${report.totalEnergy.toFixed(2)} kWh`);
    console.log(`Total cost: ${report.totalCost.toFixed(2)} €`);
}

function showReportsMenu() {
    let option;
    do {
        console.log("\n=========== REPORTS ==========");
        console.log("1. Charges report by station");
        console.log("2. Charges report by client");
        console.log("3. Client report");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {
            case "1": showChargesByStationMenu(); break;
            case "2": showChargesByClientMenu(); break;
            case "3": {
                const reportTif = input("Client TIF: ");
                const report = reportClientCharges(reportTif);

                if (!report) {
                    console.log("Client not found or has no charges.");
                    break;
                }

                console.log("\n===== CLIENT REPORT =====");
                console.log(`Name: ${report.client.firstName} ${report.client.lastName}`);
                console.log(`TIF: ${report.client.tif}`);
                console.log(`Age: ${report.age}`);
                console.log(`Contact: ${report.client.phoneNumber}`);
                console.log(`Licence plate: ${report.client.licencePlate} | ${report.client.licenceCountry}`);
                console.log(`Number of charges: ${report.numberOfCharges}`);
                console.log(`Total energy consumed: ${report.totalEnergy} kWh`);
                break;
            }
            case "0": break;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}

module.exports = { showReportsMenu };