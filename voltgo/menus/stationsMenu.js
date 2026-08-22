// function that displays the station management menu

function showStationsMenu() {

    let option;

    do {

        console.log("\n===== STATIONS =====");
        console.log("1. Show stations");
        console.log("2. Create station");
        console.log("3. Update station");
        console.log("4. Remove station");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showStations();
                break;


            case "2":

                const code = input("Code: ");
                const district = input("District: ");
                const municipality = input("Municipality: ");
                const power = Number(input("Power: "));
                const connectorType = input("Connector type: ");
                const status = input("Status: ");

                createStation(
                    code,
                    district,
                    municipality,
                    power,
                    connectorType,
                    status
                );

                break;


            case "3":

                const updateCode = input("Code: ");

                const updateDistrict =
                    input("New district: ");

                const updateMunicipality =
                    input("New municipality: ");

                const updatePower =
                    Number(input("New power: "));

                const updateConnectorType =
                    input("New connector type: ");

                const updateStatus =
                    input("New status: ");

                updateStation(
                    updateCode,
                    updateDistrict,
                    updateMunicipality,
                    updatePower,
                    updateConnectorType,
                    updateStatus
                );

                break;


            case "4":

                const removeCode = input("Code: ");

                removeStation(removeCode);

                break;


            case "0":
                break;


            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
};