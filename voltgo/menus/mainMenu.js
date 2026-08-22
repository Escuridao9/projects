// function that displays the main management menu

function showMainMenu() {

    showDashboard();

    let option;

    do {

        console.log("\n==============================");
        console.log("       VOLTGO MANAGEMENT");
        console.log("==============================");

        console.log("1. Stations");
        console.log("2. Clients");
        console.log("3. Data Plans");
        console.log("4. Charges");
        console.log("5. Reports");
        console.log("0. Exit");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showStationsMenu();
                break;


            case "2":

                showClientsMenu();
                break;


            case "3":

                showDataPlansMenu();
                break;


            case "4":

                showChargeMenu();
                break;

            case "5":

                showReportsMenu();
                break;


            case "0":

                console.log("Exiting VoltGo...");
                break;


            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
}