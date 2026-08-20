// functions that show, create, update or remove a data plan

// function that shows all data plans

function showDataPlans() {

    if (dataPlans.length === 0) {
        console.log("There are no data plans.");
        return;
    }

    console.log("\nID | Name | Price/kWh | Activation fee");

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const dataPlan of dataPlans) {

        console.log(
            `${dataPlan.id} | ${dataPlan.name} | ${dataPlan.pricePerKwh} € | ${dataPlan.activationFee} €`
        );

    }
}

// function that creates a data plan

function createDataPlan(
    name,
    pricePerKwh,
    activationFee
) {

    name = normalizeName(name);

    if (!validateDataPlan(
        "create",
        null,
        name,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const newDataPlan = {
        id: getNextId(
            dataPlans,
            inactiveDataPlans
        ),
        name: name,
        pricePerKwh: pricePerKwh,
        activationFee: activationFee,
    };

    dataPlans.push(newDataPlan);

    console.log(
        `Data plan created successfully with ID ${newDataPlan.id}.`
    );
}

// function that updates a data plan's info

function updateDataPlan(
    id,
    name,
    pricePerKwh,
    activationFee
) {

    name = normalizeName(name);

    if (!validateDataPlan(
        "update",
        id,
        name,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const dataPlan = dataPlans.find(
        dataPlan => dataPlan.id === id
    );

    dataPlan.name = name;
    dataPlan.pricePerKwh = pricePerKwh;
    dataPlan.activationFee = activationFee;

    console.log("Data plan updated successfully.");
}

// function that removes a data plan

function removeDataPlan(id) {

    if (!validateDataPlan(
        "remove",
        id
    )) {
        return;
    }

    const index = dataPlans.findIndex(
        dataPlan => dataPlan.id === id
    );

    const removedDataPlan = dataPlans.splice(index, 1)[0];

    inactiveDataPlans.push(removedDataPlan);

    console.log(
        `Data plan ID ${removedDataPlan.id} moved to inactive data plans.`
    );
}