const input = require("readline-sync").question;
const { loadData, saveData } = require('./storage');
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
} = require('./helpers');

const initialClients = [
    { id: 1, tif: "271747390", firstName: "Pedro", lastName: "Gomes", dob: "1995-07-13", phoneNumber: "+351916291322", licenceCountry: "Portugal", licencePlate: "AA-21-BB", points: 7 },
    { id: 2, tif: "278934321", firstName: "Maria", lastName: "Silva", dob: "1998-01-15", phoneNumber: "+351915439865", licenceCountry: "Portugal", licencePlate: "GH-45-AC", points: 0 }
];

let clients = loadData('clients.json', initialClients);
let inactiveClients = loadData('inactiveClients.json', []);

function getClients() { return clients; }

function saveClientsState() {
    saveData('clients.json', clients);
    saveData('inactiveClients.json', inactiveClients);
}

function findClientByTIF(tif) {
    return clients.find(client => normalizeValue(client.tif) === normalizeValue(tif));
}

function showClients() {
    if (clients.length === 0) {
        console.log("There are no clients.");
        return;
    }
    console.log("\nID | TIF | Name | Date of Birth | Phone | Licence Plate | Points");
    console.log("---------------------------------------------------------------------");
    for (const client of clients) {
        console.log(`${client.id} | ${client.tif} | ${client.firstName} ${client.lastName} | ${client.dob} | ${client.phoneNumber} | ${client.licenceCountry}: ${client.licencePlate} | ${client.points}`);
    }
}

function createClient(tif, firstName, lastName, dob, phonePrefix, phoneNumber, licenceCountry, licencePlate) {
    tif = normalizeValue(tif);
    firstName = normalizeWord(firstName);
    lastName = normalizeWord(lastName);
    dob = dob.replace(/[\/\s]+/g, "-");
    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizeValue(phoneNumber);
    licenceCountry = licenceCountry.trim();
    licencePlate = normalizeCode(licencePlate);

    if (!validateClient("create", null, tif, firstName, lastName, dob, phonePrefix, phoneNumber, licenceCountry, licencePlate)) return;

    const validLicenceCountry = getValidLicenceCountry(licenceCountry);
    const newClient = {
        id: getNextId(clients, inactiveClients),
        tif, firstName, lastName, dob,
        phoneNumber: phonePrefix + phoneNumber,
        licenceCountry: validLicenceCountry.country,
        licencePlate,
        points: 0
    };

    clients.push(newClient);
    saveClientsState();
    console.log(`Client created successfully with ID ${newClient.id}.`);
}

function updateClient(id, tif, firstName, lastName, dob, phonePrefix, phoneNumber, licenceCountry, licencePlate) {
    tif = normalizeValue(tif);
    firstName = normalizeWord(firstName);
    lastName = normalizeWord(lastName);
    dob = dob.replace(/[\/\s]+/g, "-");
    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizeValue(phoneNumber);
    licenceCountry = licenceCountry.trim();
    licencePlate = normalizeCode(licencePlate);

    if (!validateClient("update", id, tif, firstName, lastName, dob, phonePrefix, phoneNumber, licenceCountry, licencePlate)) return;

    const client = clients.find(c => c.id === id);
    const validLicenceCountry = getValidLicenceCountry(licenceCountry);

    client.tif = tif;
    client.firstName = firstName;
    client.lastName = lastName;
    client.dob = dob;
    client.phoneNumber = phonePrefix + phoneNumber;
    client.licenceCountry = validLicenceCountry.country;
    client.licencePlate = licencePlate;

    saveClientsState();
    console.log("Client updated successfully.");
}

function removeClient(id) {
    if (!validateClient("remove", id)) return;

    const index = clients.findIndex(client => client.id === id);
    const removedClient = clients.splice(index, 1)[0];
    inactiveClients.push(removedClient);

    saveClientsState();
    console.log(`Client ID ${removedClient.id} moved to inactive clients.`);
}

function validateClient(operation, id, tif, firstName, lastName, dob, phonePrefix, phoneNumber, licenceCountry, licencePlate) {
    const { getCharges } = require('./charges');
    const client = clients.find(c => c.id === id);

    if (operation === "create") {
        if (!/^\d{9}$/.test(tif)) {
            console.log("TIF must contain exactly 9 digits.");
            return false;
        }
        if (clients.some(c => c.tif === tif)) {
            console.log("There's already a client with that TIF.");
            return false;
        }
    } else if (operation === "update") {
        if (!client) {
            console.log("Client not found.");
            return false;
        }
        if (!/^\d{9}$/.test(tif)) {
            console.log("TIF must contain exactly 9 digits.");
            return false;
        }
        if (clients.some(c => c.id !== id && c.tif === tif)) {
            console.log("There's already a client with that TIF.");
            return false;
        }
    } else if (operation === "remove") {
        if (!client) {
            console.log("Client not found.");
            return false;
        }
        const charges = getCharges();
        if (charges.some(charge => charge.clientId === client.id)) {
            console.log("It's not possible to remove that client because there are charges associated with it.");
            return false;
        }
        return true;
    }

    if (!/^[A-Za-zÀ-ÿ]+$/.test(firstName) || !/^[A-Za-zÀ-ÿ]+$/.test(lastName)) {
        console.log("Names can only contain letters.");
        return false;
    }
    if (!validateDob(dob)) return false;
    if (!validatePhone(phonePrefix, phoneNumber)) return false;
    if (!validateLicencePlate(licenceCountry, licencePlate)) return false;

    return true;
}

function showClientsMenu() {
    let option;
    do {
        console.log("\n=============== CLIENTS ==============");
        console.log("1. Show clients\n2. Create client\n3. Update client\n4. Remove client\n0. Back");
        option = input("Choose an option: ");

        switch (option) {
            case "1": showClients(); break;
            case "2": createClient(input("TIF: "), input("First name: "), input("Last name: "), input("Date of birth (YYYY-MM-DD): "), input("Country prefix: "), input("Phone number: "), input("Licence plate country: "), input("Licence plate: ")); break;
            case "3": updateClient(Number(input("Client ID: ")), input("TIF: "), input("First name: "), input("Last name: "), input("Date of birth (YYYY-MM-DD): "), input("Country prefix: "), input("Phone number: "), input("Licence plate country: "), input("Licence plate: ")); break;
            case "4": removeClient(Number(input("Client ID: "))); break;
            case "0": break;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}

module.exports = {
    getClients,
    findClientByTIF,
    saveClientsState,
    showClientsMenu
};