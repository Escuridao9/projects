// functions that show, create, update or remove a charge

// function that shows charges

function showCharges() {

    if (charges.length === 0) {
        console.log("There are no charges.");
        return;
    }

    console.log(
        "\nID | Station | Client | Start | End | Duration | Energy | Data Plan | Cost | Status"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of charges) {

        console.log(
            `${charge.id} | ${charge.stationCode} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.duration} h | ${charge.energy} kWh | ${charge.dataPlanId} | ${charge.cost} € | ${charge.status}`
        );

    }
}


// function that creates charges

function createCharge(
    stationCode,
    clientId,
    startDate,
    endDate,
    dataPlanId,
    status
) {

    stationCode = stationCode.toUpperCase();

    clientId = Number(clientId);
    dataPlanId = Number(dataPlanId);

    const validStatus =
        getValidValue(status, chargeStatuses);

    const id =
        getNextId(
            charges,
            inactiveCharges
        );

    if (!validateCharge(
        "create",
        id,
        stationCode,
        clientId,
        startDate,
        endDate,
        dataPlanId,
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
            startDate,
            endDate
        );

    const cost =
        calculateCost(
            energy,
            dataPlanId
        );

    const newCharge = {
        id: id,
        stationCode: stationCode,
        clientId: clientId,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        energy: energy,
        dataPlanId: dataPlanId,
        cost: cost,
        status: validStatus
    };

    charges.push(newCharge);

    console.log(
        `Charge created successfully with ID ${newCharge.id}.`
    );
}

// function that updates a charge's info

function updateCharge(
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    dataPlanId,
    status
) {

    stationCode = stationCode.toUpperCase();

    clientId = Number(clientId);
    dataPlanId = Number(dataPlanId);

    const validStatus =
        getValidValue(status, chargeStatuses);

    if (!validateCharge(
        "update",
        id,
        stationCode,
        clientId,
        startDate,
        endDate,
        dataPlanId,
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
            startDate,
            endDate
        );

    const cost =
        calculateCost(
            energy,
            dataPlanId
        );

    const charge = charges.find(
        charge => charge.id === id
    );

    charge.stationCode = stationCode;
    charge.clientId = clientId;
    charge.startDate = startDate;
    charge.endDate = endDate;
    charge.duration = duration;
    charge.energy = energy;
    charge.dataPlanId = dataPlanId;
    charge.cost = cost;
    charge.status = validStatus;

    console.log("Charge updated successfully.");
}


// function that removes charges

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

    inactiveCharges.push(removedCharge);

    console.log(
        `Charge ID ${removedCharge.id} moved to inactive charges.`
    );
}