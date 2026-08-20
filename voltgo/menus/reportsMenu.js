//

function showReportsMenu() {

    let option;

    do {
        console.log("\n===== REPORTS =====");
        console.log("1. Charges report by station");
        console.log("2. Charges report by client");
        console.log("3. Client report");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                const stationCode = input("Station code: ");
                reportChargesByStation(stationCode);

                break;

            case "2":

                const clientTif = input("Client TIF: ");
                reportChargesByClient(clientTif);

                break;

            case "3":
                const reportTif = input("Client TIF: ");
                reportClientCharges(reportTif);

                break;

            case "0":
                break;

            default:
                console.log("Invalid option.");


        }
    } while (option !== "0");
};