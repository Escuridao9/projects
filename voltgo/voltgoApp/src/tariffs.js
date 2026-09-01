const input = require("readline-sync").question;
const { loadData, saveData } = require('./storage');
const { chargeTypes } = require('./constants');
const { normalizeWord, getValidValue, getNextId } = require('./helpers');

const initialTariffs = [
    { id: 1, name: "Normal", chargeType: "standard", pricePerKwh: 0.35, activationFee: 0.50 },
    { id: 2, name: "Premium", chargeType: "fast", pricePerKwh: 0.65, activationFee: 1.00 }
];

let tariffs = loadData('tariffs.json', initialTariffs);
let inactiveTariffs = loadData('inactiveTariffs.json', []);

function getTariffs() { return tariffs; }

function saveTariffsState() {
    saveData('tariffs.json', tariffs);
    saveData('inactiveTariffs.json', inactiveTariffs);
}

function showTariffs() {
    if (tariffs.length === 0) {
        console.log("There are no tariffs.");
        return;
    }
    console.log("\nID | Name | Charge Type | Price/kWh | Activation fee");
    console.log("---------------------------------------------------------------------");
    for (const tariff of tariffs) {
        console.log(`${tariff.id} | ${tariff.name} | ${tariff.chargeType} | ${tariff.pricePerKwh} € | ${tariff.activationFee} €`);
    }
}

function createTariff(name, chargeType, pricePerKwh, activationFee) {
    name = normalizeWord(name);
    if (!validateTariff("create", null, name, chargeType, pricePerKwh, activationFee)) return;

    const validChargeType = getValidValue(chargeType, chargeTypes);
    const newTariff = {
        id: getNextId(tariffs, inactiveTariffs),
        name,
        chargeType: validChargeType,
        pricePerKwh,
        activationFee
    };

    tariffs.push(newTariff);
    saveTariffsState();
    console.log(`Tariff created successfully with ID ${newTariff.id}.`);
}

function updateTariff(id, name, chargeType, pricePerKwh, activationFee) {
    name = normalizeWord(name);
    if (!validateTariff("update", id, name, chargeType, pricePerKwh, activationFee)) return;

    const tariff = tariffs.find(t => t.id === id);
    tariff.name = name;
    tariff.chargeType = getValidValue(chargeType, chargeTypes);
    tariff.pricePerKwh = pricePerKwh;
    tariff.activationFee = activationFee;

    saveTariffsState();
    console.log("Tariff updated successfully.");
}

function removeTariff(id) {
    if (!validateTariff("remove", id)) return;

    const index = tariffs.findIndex(tariff => tariff.id === id);
    const removedTariff = tariffs.splice(index, 1)[0];
    inactiveTariffs.push(removedTariff);

    saveTariffsState();
    console.log(`Tariff ID ${removedTariff.id} moved to inactive tariffs.`);
}

function validateTariff(operation, id, name, chargeType, pricePerKwh, activationFee) {
    const { getCharges } = require('./charges');

    if (operation === "create") {
        if (tariffs.some(t => t.name === name)) {
            console.log("There's already a tariff with that name.");
            return false;
        }
    } else if (operation === "update" || operation === "remove") {
        if (!Number.isInteger(id) || id <= 0 || !tariffs.some(t => t.id === id)) {
            console.log("Tariff not found or invalid ID.");
            return false;
        }
        if (operation === "remove") {
            const charges = getCharges();
            if (charges.some(charge => charge.tariffId === id)) {
                console.log("It's not possible to remove that tariff because there are charges associated with it.");
                return false;
            }
            return true;
        }
        if (tariffs.some(t => t.id !== id && t.name === name)) {
            console.log("There's already a tariff with that name.");
            return false;
        }
    }

    if (!/^[A-Za-zÀ-ÿ]+$/.test(name)) {
        console.log("Tariff name must contain only letters.");
        return false;
    }
    if (!getValidValue(chargeType, chargeTypes)) {
        console.log("Charge type must be 'standard' or 'fast'.");
        return false;
    }
    if (isNaN(pricePerKwh) || pricePerKwh <= 0) {
        console.log("Price must be greater than zero.");
        return false;
    }
    if (isNaN(activationFee) || activationFee < 0) {
        console.log("Activation fee can't be negative.");
        return false;
    }

    return true;
}

function showTariffsMenu() {
    let option;
    do {
        console.log("\n============== TARIFFS =============");
        console.log("1. Show tariffs\n2. Create tariff\n3. Update tariff\n4. Remove tariff\n0. Back");
        option = input("Choose an option: ");

        switch (option) {
            case "1": showTariffs(); break;
            case "2": createTariff(input("Tariff name: "), input("Charge type (standard/fast): "), Number(input("Price per kWh: ").replace(",", ".")), Number(input("Activation fee: ").replace(",", "."))); break;
            case "3": updateTariff(Number(input("ID: ")), input("Tariff name: "), input("Charge type (standard/fast): "), Number(input("Price per kWh: ").replace(",", ".")), Number(input("Activation fee: ").replace(",", "."))); break;
            case "4": removeTariff(Number(input("ID: "))); break;
            case "0": break;
            default: console.log("Invalid option.");
        }
    } while (option !== "0");
}

module.exports = {
    getTariffs,
    showTariffsMenu
};