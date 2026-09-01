const input = require("readline-sync").question;
const { showStationsMenu } = require('./src/stations');
const { showClientsMenu } = require('./src/clients');
const { showTariffsMenu } = require('./src/tariffs');
const { showChargeMenu } = require('./src/charges');
const { showDashboard } = require('./src/dashboard');
const { showReportsMenu } = require('./src/reports');

function showMainMenu() {
    showDashboard();
    let option;

    do {
        console.log("\n=======================================");
        console.log("          VOLTGO MANAGEMENT");
        console.log("=======================================");
        console.log("1. Stations");
        console.log("2. Clients");
        console.log("3. Tariffs");
        console.log("4. Charges");
        console.log("5. Reports");
        console.log("0. Exit");

        option = input("Choose an option: ");

        switch (option) {
            case "1": showStationsMenu(); break;
            case "2": showClientsMenu(); break;
            case "3": showTariffsMenu(); break;
            case "4": showChargeMenu(); break;
            case "5": showReportsMenu(); break;
            case "0": console.log("Exiting VoltGo..."); break;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}

showMainMenu();