// function that displays the client management menu

function showClientsMenu() {

    let option;

    do {

        console.log("\n===== CLIENTS =====");
        console.log("1. Show clients");
        console.log("2. Create client");
        console.log("3. Update client");
        console.log("4. Remove client");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showClients();
                break;


            case "2":

                const tif = input("TIF: ");
                const firstName = input("First name: ");
                const lastName = input("Last name: ");
                const DOB = input("Date of birth (YYYY-MM-DD): ");

                const phonePrefix =
                    input("Country prefix: ");

                const phoneNumber =
                    input("Phone number: ");

                const licenceCountry =
                    input("Licence plate country: ");

                const licencePlate =
                    input("Licence plate: ");

                createClient(
                    tif,
                    firstName,
                    lastName,
                    DOB,
                    phonePrefix,
                    phoneNumber,
                    licenceCountry,
                    licencePlate
                );

                break;


            case "3":

                const updateId =
                    Number(input("Client ID: "));

                const updateTif =
                    input("TIF: ");

                const updateFirstName =
                    input("First name: ");

                const updateLastName =
                    input("Last name: ");

                const updateDOB =
                    input("Date of birth (YYYY-MM-DD): ");

                const updatePhonePrefix =
                    input("Country prefix: ");

                const updatePhoneNumber =
                    input("Phone number: ");

                const updateLicenceCountry =
                    input("Licence plate country: ");

                const updateLicencePlate =
                    input("Licence plate: ");

                updateClient(
                    updateId,
                    updateTif,
                    updateFirstName,
                    updateLastName,
                    updateDOB,
                    updatePhonePrefix,
                    updatePhoneNumber,
                    updateLicenceCountry,
                    updateLicencePlate
                );

                break;


            case "4":

                const removeId =
                    Number(input("Client ID: "));

                removeClient(removeId);

                break;


            case "0":
                break;


            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
};