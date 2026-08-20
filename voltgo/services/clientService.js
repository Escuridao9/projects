// functions that show, create, update or remove a client

// function that shows all clients

function showClients() {

    if (clients.length === 0) {
        console.log("There are no clients.");
        return;
    }

    console.log(
        "\nID | TIF | Name | Date of Birth | Phone | Licence Plate"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const client of clients) {

        console.log(
            `${client.id} | ${client.tif} | ${client.firstName} ${client.lastName} | ${client.DOB} | ${client.phoneNumber} | ${client.licenceCountry}: ${client.licencePlate}`
        );

    }
}

// function that creates a client

function createClient(
    tif,
    firstName,
    lastName,
    DOB,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeTIF(tif);

    firstName = normalizeName(firstName);
    lastName = normalizeName(lastName);

    DOB = DOB.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizePhoneNumber(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeLicencePlate(licencePlate);

    if (!validateClient(
        "create",
        null,
        tif,
        firstName,
        lastName,
        DOB,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const validLicenceCountry =
        getValidLicenceCountry(licenceCountry);

    const newClient = {
        id: getNextId(
            clients,
            inactiveClients
        ),
        tif: tif,
        firstName: firstName,
        lastName: lastName,
        DOB: DOB,
        phoneNumber: phonePrefix + phoneNumber,
        licenceCountry: validLicenceCountry.country,
        licencePlate: licencePlate,
    };

    clients.push(newClient);

    console.log(
        `Client created successfully with ID ${newClient.id}.`
    );
}

// function that updates a client's info

function updateClient(
    id,
    tif,
    firstName,
    lastName,
    DOB,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeTIF(tif);

    firstName = normalizeName(firstName);
    lastName = normalizeName(lastName);

    DOB = DOB.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizePhoneNumber(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeLicencePlate(licencePlate);

    const client = clients.find(
        client => client.id === id
    );

    if (!client) {
        console.log("Client not found.");
        return;
    }

    if (!validateClient(
        "update",
        id,
        tif,
        firstName,
        lastName,
        DOB,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const validLicenceCountry =
        getValidLicenceCountry(licenceCountry);

    client.tif = tif;
    client.firstName = firstName;
    client.lastName = lastName;
    client.DOB = DOB;
    client.phoneNumber = phonePrefix + phoneNumber;
    client.licenceCountry = validLicenceCountry.country;
    client.licencePlate = licencePlate;

    console.log("Client updated successfully.");
}

// function that removes a client

function removeClient(id) {

    if (!validateClient(
        "remove",
        id
    )) {
        return;
    }

    const index = clients.findIndex(
        client => client.id === id
    );

    const removedClient = clients.splice(index, 1)[0];

    inactiveClients.push(removedClient);

    console.log(
        `Client ID ${removedClient.id} moved to inactive clients.`
    );
}