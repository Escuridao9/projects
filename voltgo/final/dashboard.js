const {
    charges,
    stations,
    tariffs
} = require("./data");

const { isMaintenanceDue } = require("./helpers");

function countChargesByStatus(status) {

    return charges.filter(
        charge => charge.status === status
    ).length;

}

function showMaintenanceStatus() {

    const stationsDueForMaintenance =
        stations.filter(
            station =>
                isMaintenanceDue(station)
        );

    console.log(
        "\nStation maintenance"
    );

    console.log(
        "--------------------------------------"
    );

    if (
        stationsDueForMaintenance.length === 0
    ) {

        console.log(
            "All stations are up to date."
        );

        return;
    }

    console.log(
        `Stations requiring maintenance: ${stationsDueForMaintenance.length}`
    );

    for (
        const station of stationsDueForMaintenance
    ) {

        console.log(
            `${station.code} | Last maintenance: ${station.lastMaintenance}`
        );

    }
}

function showChargesByStation() {

    const terminatedCharges =
        charges.filter(
            charge =>
                charge.status === "terminated"
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
                charge =>
                    charge.stationCode ===
                    station.code
            );

        if (stationCharges.length === 0) {
            continue;
        }

        const totalEnergy =
            stationCharges.reduce(
                (total, charge) =>
                    total + charge.energy,
                0
            );

        const averageEnergy =
            totalEnergy /
            stationCharges.length;

        console.log(
            `${station.code} | ${stationCharges.length} | ${averageEnergy.toFixed(2)} kWh`
        );
    }
}

function showRevenueByTariff() {

    const invoicedCharges =
        charges.filter(
            charge =>
                charge.status === "invoiced"
        );

    console.log(
        "\nInvoiced charges by tariff"
    );

    console.log(
        "--------------------------------------"
    );

    console.log(
        "Plan | Charges | Average Revenue"
    );

    for (const tariff of tariffs) {

        const planCharges =
            invoicedCharges.filter(
                charge =>
                    charge.tariffId ===
                    tariff.id
            );

        if (planCharges.length === 0) {
            continue;
        }

        const totalRevenue =
            planCharges.reduce(
                (total, charge) =>
                    total + charge.cost,
                0
            );

        const averageRevenue =
            totalRevenue /
            planCharges.length;

        console.log(
            `${tariff.name} | ${planCharges.length} | ${averageRevenue.toFixed(2)} €`
        );
    }
}

function showDashboard() {

    const inProcess =
        countChargesByStatus(
            "in process"
        );

    const terminated =
        countChargesByStatus(
            "terminated"
        );

    console.log(
        "\n========== VOLTGO DASHBOARD =========="
    );

    console.log(
        `\nCharges in process: ${inProcess}`
    );

    console.log(
        `Charges terminated: ${terminated}`
    );

    showMaintenanceStatus();

    showChargesByStation();

    showRevenueByTariff();

    console.log(
        "\n======================================="
    );
}

module.exports = {
    countChargesByStatus,
    showMaintenanceStatus,
    showChargesByStation,
    showRevenueByTariff,
    showDashboard
};