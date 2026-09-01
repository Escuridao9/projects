const input = require("readline-sync").question;

const {
    clients,
    inactiveClients,
    charges
} = require("./data");

const {
    normalizeValue,
    normalizeWord,
    normalizeCode,
    normalizePhonePrefix,
    validatePhone,
    getValidLicenceCountry,
    validateLicencePlate,
    validateDob,
    getNextId
} = require("./helpers");

// ==================== LOOKUP ====================

function findClientByTIF(tif) {
    return clients.find(
        client => normalizeValue(client.tif) === normalizeValue(tif)
    );
}

// ==================== SHOW ====================

function showClients() {

    if (clients.length === 0) {
        console.log("There are no clients.");
        return;
    }

    console.log(
        "\nID | TIF | Name | Date of Birth | Phone | Licence Plate | Points"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const client of clients) {

        console.log(
            `${client.id} | ${client.tif} | ${client.firstName} ${client.lastName} | ${client.dob} | ${client.phoneNumber} | ${client.licenceCountry}: ${client.licencePlate} | ${client.points}`
        );

    }
}

// ==================== CREATE ====================

function createClient(
    tif,
    firstName,
    lastName,
    dob,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeValue(tif);

    firstName = normalizeWord(firstName);

    lastName = normalizeWord(lastName);

    dob = dob.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);

    phoneNumber = normalizeValue(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeCode(licencePlate);

    if (!validateClient(
        "create",
        null,
        tif,
        firstName,
        lastName,
        dob,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const validLicenceCountry =
        getValidLicenceCountry(
            licenceCountry
        );

    const newClient = {
        id: getNextId(
            clients,
            inactiveClients
        ),
        tif: tif,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        phoneNumber:
            phonePrefix + phoneNumber,
        licenceCountry:
            validLicenceCountry.country,
        licencePlate: licencePlate,
        points: 0
    };

    clients.push(newClient);

    console.log(
        `Client created successfully with ID ${newClient.id}.`
    );
}

// ==================== UPDATE ====================

function updateClient(
    id,
    tif,
    firstName,
    lastName,
    dob,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {
    tif = normalizeValue(tif);

    firstName = normalizeWord(firstName);

    lastName = normalizeWord(lastName);

    dob = dob.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);

    phoneNumber = normalizeValue(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeCode(licencePlate);

    if (!validateClient(
        "update",
        id,
        tif,
        firstName,
        lastName,
        dob,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const client = clients.find(client => client.id === id);

    const validLicenceCountry = getValidLicenceCountry(licenceCountry);

    client.tif = tif;
    client.firstName = firstName;
    client.lastName = lastName;
    client.dob = dob;
    client.phoneNumber = phonePrefix + phoneNumber;
    client.licenceCountry = validLicenceCountry.country;
    client.licencePlate = licencePlate;

    console.log("Client updated successfully.");
}

// ==================== REMOVE ====================

function removeClient(id) {

    if (!validateClient(
        "remove",
        id
    )) {
        return;
    }

    const index =
        clients.findIndex(
            client => client.id === id
        );

    const removedClient =
        clients.splice(index, 1)[0];

    inactiveClients.push(removedClient);

    console.log(
        `Client ID ${removedClient.id} moved to inactive clients.`
    );
}

// ==================== VALIDATE ====================

function validateClient(
    operation,
    id,
    tif,
    firstName,
    lastName,
    dob,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    const client =
        clients.find(
            client => client.id === id
        );

    if (operation === "create") {

        if (!/^\d{9}$/.test(tif)) {
            console.log(
                "TIF must contain exactly 9 digits."
            );
            return false;
        }

        if (clients.some(
            client => client.tif === tif
        )) {
            console.log(
                "There's already a client with that TIF."
            );
            return false;
        }

    } else if (operation === "update") {

        if (!client) {
            console.log("Client not found.");
            return false;
        }

        if (!/^\d{9}$/.test(tif)) {
            console.log(
                "TIF must contain exactly 9 digits."
            );
            return false;
        }

        if (clients.some(
            client =>
                client.id !== id &&
                client.tif === tif
        )) {
            console.log(
                "There's already a client with that TIF."
            );
            return false;
        }

    } else if (operation === "remove") {

        if (!client) {
            console.log("Client not found.");
            return false;
        }

        if (charges.some(
            charge => charge.clientId === client.id
        )) {
            console.log(
                "It's not possible to remove that client because there are charges associated with it."
            );
            return false;
        }

        return true;

    } else {

        console.log("Invalid operation.");
        return false;
    }

    // Shared create/update validation

    if (!/^[A-Za-zÀ-ÿ]+$/.test(firstName)) {
        console.log(
            "First name can only contain letters."
        );
        return false;
    }

    if (!/^[A-Za-zÀ-ÿ]+$/.test(lastName)) {
        console.log(
            "Last name can only contain letters."
        );
        return false;
    }

    if (!validateDob(dob)) {
        return false;
    }

    if (!validatePhone(
        phonePrefix,
        phoneNumber
    )) {
        return false;
    }

    if (!validateLicencePlate(
        licenceCountry,
        licencePlate
    )) {
        return false;
    }

    return true;
}

// ==================== MENU ====================

function showClientsMenu() {

    let option;

    do {

        console.log("\n=============== CLIENTS ==============");
        console.log("1. Show clients");
        console.log("2. Create client");
        console.log("3. Update client");
        console.log("4. Remove client");
        console.log("0. Back");

        option =
            input("Choose an option: ");

        switch (option) {

            case "1":

                showClients();
                break;


            case "2":

                const tif =
                    input("TIF: ");

                const firstName =
                    input("First name: ");

                const lastName =
                    input("Last name: ");

                const dob =
                    input("Date of birth (YYYY-MM-DD): ");

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
                    dob,
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

                const updateDob =
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
                    updateDob,
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
}

module.exports = {
    findClientByTIF,
    showClients,
    createClient,
    updateClient,
    removeClient,
    validateClient,
    showClientsMenu
};