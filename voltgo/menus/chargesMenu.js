// function that displays the charge management menu

function showChargeMenu() {

    let option;

    do {

        console.log("\n===== CHARGES =====");
        console.log("1. Show charges");
        console.log("2. Create charge");
        console.log("3. Update charge");
        console.log("4. Remove charge");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showCharges();
                break;


            case "2":

                const stationCode =
                    input("Station code: ");

                const clientId =
                    Number(input("Client ID: "));

                const startDate =
                    input("Start date: ");

                const endDate =
                    input("End date: ");

                const dataPlanId =
                    Number(input("Data plan ID: "));

                const status =
                    input("Status: ");

                createCharge(
                    stationCode,
                    clientId,
                    startDate,
                    endDate,
                    dataPlanId,
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

                const updateStartDate =
                    input("Start date: ");

                const updateEndDate =
                    input("End date: ");

                const updateDataPlanId =
                    Number(input("Data plan ID: "));

                const updateStatus =
                    input("Status: ");

                updateCharge(
                    updateId,
                    updateStationCode,
                    updateClientId,
                    updateStartDate,
                    updateEndDate,
                    updateDataPlanId,
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
};