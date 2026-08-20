// functions that show information related to the dashboard

// function that shows terminated charges by station

function showChargesByStation() {

    const terminatedCharges =
        charges.filter(
            charge => charge.status === "terminated"
        );

    console.log(
        "\nTerminated charges by station"
    );

    console.log(
        "--------------------------------------"
    );

    console.log(
        "Station | Charges | Average Energy"
    );

    for (const station of stations) {

        const stationCharges =
            terminatedCharges.filter(
                charge => charge.stationCode === station.code
            );

        if (stationCharges.length === 0) {
            continue;
        }

        const totalEnergy =
            stationCharges.reduce(
                (total, charge) => total + charge.energy,
                0
            );

        const averageEnergy =
            totalEnergy / stationCharges.length;

        console.log(
            `${station.code} | ${stationCharges.length} | ${averageEnergy.toFixed(2)} kWh`
        );
    }
}

// functions that show the revenue of invoiced charges by data plans

function showRevenueByDataPlan() {

    const invoicedCharges =
        charges.filter(
            charge => charge.status === "invoiced"
        );

    console.log(
        "\nInvoiced charges by data plan"
    );

    console.log(
        "--------------------------------------"
    );

    console.log(
        "Plan | Charges | Average Revenue"
    );

    for (const dataPlan of dataPlans) {

        const planCharges =
            invoicedCharges.filter(
                charge => charge.dataPlanId === dataPlan.id
            );

        if (planCharges.length === 0) {
            continue;
        }

        const totalRevenue =
            planCharges.reduce(
                (total, charge) => total + charge.cost,
                0
            );

        const averageRevenue =
            totalRevenue / planCharges.length;

        console.log(
            `${dataPlan.name} | ${planCharges.length} | ${averageRevenue.toFixed(2)} €`
        );
    }
}

function showDashboard() {

    const inProcess =
        countChargesByStatus("in process");

    const terminated =
        countChargesByStatus("terminated");

    console.log(
        "\n========== VOLTGO DASHBOARD =========="
    );

    console.log(
        `\nCharges in process: ${inProcess}`
    );

    console.log(
        `Charges terminated: ${terminated}`
    );

    showChargesByStation();

    showRevenueByDataPlan();

    console.log(
        "\n======================================="
    );
}