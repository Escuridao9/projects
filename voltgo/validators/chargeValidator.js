// function that verifies that an operation involving a charge is valid

function validateCharge(
    operation,
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    dataPlanId,
    status
) {

    switch (operation) {

        case "create":

            if (!stations.some(
                station => station.code === stationCode
            )) {
                console.log("Station not found.");
                return false;
            }

            if (!clients.some(
                client => client.id === clientId
            )) {
                console.log("Client not found.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startDate)) {
                console.log(
                    "Invalid start date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(startDate).getTime()) ||
                new Date(startDate).getFullYear() !== Number(startDate.substring(0, 4)) ||
                new Date(startDate).getMonth() + 1 !== Number(startDate.substring(5, 7)) ||
                new Date(startDate).getDate() !== Number(startDate.substring(8, 10))
            ) {
                console.log("Invalid start date.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(endDate)) {
                console.log(
                    "Invalid end date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(endDate).getTime()) ||
                new Date(endDate).getFullYear() !== Number(endDate.substring(0, 4)) ||
                new Date(endDate).getMonth() + 1 !== Number(endDate.substring(5, 7)) ||
                new Date(endDate).getDate() !== Number(endDate.substring(8, 10))
            ) {
                console.log("Invalid end date.");
                return false;
            }

            if (new Date(endDate) <= new Date(startDate)) {
                console.log(
                    "End date must be after start date."
                );
                return false;
            }

            if (!dataPlans.some(
                dataPlan => dataPlan.id === dataPlanId
            )) {
                console.log("Data plan not found.");
                return false;
            }

            if (!chargeStatuses.includes(status)) {
                console.log("Invalid charge status.");
                return false;
            }

            break;


        case "update":

            if (!charges.some(
                charge => charge.id === id
            )) {
                console.log("Charge not found.");
                return false;
            }

            if (!stations.some(
                station => station.code === stationCode
            )) {
                console.log("Station not found.");
                return false;
            }

            if (!clients.some(
                client => client.id === clientId
            )) {
                console.log("Client not found.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startDate)) {
                console.log(
                    "Invalid start date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(startDate).getTime()) ||
                new Date(startDate).getFullYear() !== Number(startDate.substring(0, 4)) ||
                new Date(startDate).getMonth() + 1 !== Number(startDate.substring(5, 7)) ||
                new Date(startDate).getDate() !== Number(startDate.substring(8, 10))
            ) {
                console.log("Invalid start date.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(endDate)) {
                console.log(
                    "Invalid end date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(endDate).getTime()) ||
                new Date(endDate).getFullYear() !== Number(endDate.substring(0, 4)) ||
                new Date(endDate).getMonth() + 1 !== Number(endDate.substring(5, 7)) ||
                new Date(endDate).getDate() !== Number(endDate.substring(8, 10))
            ) {
                console.log("Invalid end date.");
                return false;
            }

            if (new Date(endDate) <= new Date(startDate)) {
                console.log(
                    "End date must be after start date."
                );
                return false;
            }

            if (!dataPlans.some(
                dataPlan => dataPlan.id === dataPlanId
            )) {
                console.log("Data plan not found.");
                return false;
            }

            if (!chargeStatuses.includes(status)) {
                console.log("Invalid charge status.");
                return false;
            }

            break;


        case "remove":

            if (!charges.some(
                charge => charge.id === id
            )) {
                console.log("Charge not found.");
                return false;
            }

            break;


        default:

            console.log("Invalid option.");
            return false;
    }

    return true;
}