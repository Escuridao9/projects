// function that displays the reports management menu

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

            case "1": {
                const stationCode = input("Station code: ");
                const status = input("Status (terminated/invoiced): ");
                reportChargesByStation(stationCode, status);
                break;
            };

            case "2": {
                const clientTif = input("Client TIF: ");
                const status = input("Status (terminated/invoiced): ");
                reportChargesByClient(clientTif, status);
                break;
            };

            case "3": {
                const reportTif = input("Client TIF: ");
                reportClientCharges(reportTif);
                break;
            };

            case "0":
                break;

            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
};