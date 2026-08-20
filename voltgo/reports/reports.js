
//

function reportChargesByStation(stationCode) {

    stationCode = stationCode.toUpperCase();

    const reportCharges = getCompletedCharges().filter(
        charge => charge.stationCode === stationCode
    );

    if (reportCharges.length === 0) {
        console.log("No completed charges found for this station.");
        return;
    }

    let totalEnergy = 0;
    let totalCost = 0;

    console.log("\n===== CHARGES REPORT BY STATION =====");
    console.log(`Station: ${stationCode}`);
    console.log(
        "\nID | Client ID | Start | End | Energy | Cost"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of reportCharges) {

        console.log(`${charge.id} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`);

        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    console.log(
        "---------------------------------------------------------------------"
    );

    console.log(`Total energy: ${totalEnergy.toFixed(2)} kWh`);
    console.log(`Total cost: ${totalCost.toFixed(2)} €`);
}

//

function reportChargesByClient(tif) {

    tif = normalizeTIF(tif);

    const client = clients.find(
        client => client.tif === tif
    );

    if (!client) {
        console.log("Client not found.");
        return;
    }

    const reportCharges = getCompletedCharges().filter(
        charge => charge.clientId === client.id
    );

    if (reportCharges.length === 0) {
        console.log("No completed charges found for this client.");
        return;
    }

    let totalEnergy = 0;
    let totalCost = 0;

    console.log("\n===== CHARGES REPORT BY CLIENT =====");
    console.log(`Client: ${client.firstName} ${client.lastName}`);
    console.log(`TIF: ${client.tif}`);

    console.log(
        "\nID | Station | Start | End | Energy | Cost"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of reportCharges) {

        console.log(`${charge.id} | ${charge.stationCode} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`
        );

        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    console.log(
        "---------------------------------------------------------------------"
    );

    console.log(
        `Total energy: ${totalEnergy.toFixed(2)} kWh`
    );

    console.log(
        `Total cost: ${totalCost.toFixed(2)} €`
    );
}

// 

function reportClientCharges(tif) {

    tif = normalizeTIF(tif);

    const client = clients.find(
        client => client.tif === tif
    );

    if (!client) {
        console.log("Client not found.");
        return;
    }

    const clientCharges = charges.filter(
        charge => charge.clientId === client.id
    );

    if (clientCharges.length === 0) {
        console.log("This client has no charges.");
        return;
    }

    let totalEnergy = 0;

    for (const charge of clientCharges) {

        totalEnergy += charge.energy;
    }

    totalEnergy = Number(totalEnergy.toFixed(2));

    const age = calculateAge(client.DOB);

    console.log("\n===== CLIENT REPORT =====");
    console.log(`Name: ${client.firstName} ${client.lastName}`);
    console.log(`TIF: ${client.tif}`);
    console.log(`Age: ${age}`);
    console.log(`Contact: ${client.phoneNumber}`);
    console.log(`Licence plate: ${client.licencePlate} | ${client.licenceCountry}`);
    console.log(`Number of charges: ${clientCharges.length}`);
    console.log(`Total energy consumed: ${totalEnergy} kWh`);
};