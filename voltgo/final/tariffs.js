const input = require("readline-sync").question;

const {
    tariffs,
    inactiveTariffs,
    chargeTypes,
    charges
} = require("./data");

const {
    normalizeWord,
    getValidValue,
    getNextId
} = require("./helpers");

// ==================== SHOW ====================

function showTariffs() {

    if (tariffs.length === 0) {
        console.log("There are no tariffs.");
        return;
    }

    console.log(
        "\nID | Name | Charge Type | Price/kWh | Activation fee"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const tariff of tariffs) {

        console.log(
            `${tariff.id} | ${tariff.name} | ${tariff.chargeType} | ${tariff.pricePerKwh} € | ${tariff.activationFee} €`
        );

    }
}

// ==================== CREATE ====================

function createTariff(
    name,
    chargeType,
    pricePerKwh,
    activationFee
) {

    name =
        normalizeWord(name);

    if (!validateTariff(
        "create",
        null,
        name,
        chargeType,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const validChargeType = getValidValue(chargeType, chargeTypes);

    const newTariff = {
        id: getNextId(
            tariffs,
            inactiveTariffs
        ),
        name: name,
        chargeType: validChargeType,
        pricePerKwh: pricePerKwh,
        activationFee: activationFee,
    };

    tariffs.push(newTariff);

    console.log(`Tariff created successfully with ID ${newTariff.id}.`);
}

// ==================== UPDATE ====================

function updateTariff(
    id,
    name,
    chargeType,
    pricePerKwh,
    activationFee
) {

    name = normalizeWord(name);

    if (!validateTariff(
        "update",
        id,
        name,
        chargeType,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const tariff =
        tariffs.find(
            tariff => tariff.id === id
        );

    const validChargeType =
        getValidValue(
            chargeType,
            chargeTypes
        );

    tariff.name = name;
    tariff.chargeType = validChargeType;
    tariff.pricePerKwh = pricePerKwh;
    tariff.activationFee = activationFee;

    console.log("Tariff updated successfully.");
}

// ==================== REMOVE ====================

function removeTariff(id) {

    if (!validateTariff(
        "remove",
        id
    )) {
        return;
    }

    const index =
        tariffs.findIndex(
            tariff => tariff.id === id
        );

    const removedTariff =
        tariffs.splice(index, 1)[0];

    inactiveTariffs.push(removedTariff);

    console.log(
        `Tariff ID ${removedTariff.id} moved to inactive tariffs.`
    );
}

// ==================== VALIDATE ====================

function validateTariff(
    operation,
    id,
    name,
    chargeType,
    pricePerKwh,
    activationFee,
) {

    if (operation === "create") {

        if (tariffs.some(
            tariff => tariff.name === name
        )) {
            console.log(
                "There's already a tariff with that name."
            );
            return false;
        }

    } else if (operation === "update") {

        if (!Number.isInteger(id) || id <= 0) {
            console.log(
                "ID must be a positive integer."
            );
            return false;
        }

        if (!tariffs.some(
            tariff => tariff.id === id
        )) {
            console.log("Tariff not found.");
            return false;
        }

        if (tariffs.some(
            tariff =>
                tariff.id !== id &&
                tariff.name === name
        )) {
            console.log(
                "There's already a tariff with that name."
            );
            return false;
        }

    } else if (operation === "remove") {

        if (!Number.isInteger(id) || id <= 0) {
            console.log(
                "ID must be a positive integer."
            );
            return false;
        }

        if (!tariffs.some(
            tariff => tariff.id === id
        )) {
            console.log("Tariff not found.");
            return false;
        }

        if (charges.some(
            charge => charge.tariffId === id
        )) {
            console.log(
                "It's not possible to remove that tariff because there are charges associated with it."
            );
            return false;
        }

    } else {

        console.log("Invalid operation.");
        return false;
    }

    if (!/^[A-Za-zÀ-ÿ]+$/.test(name)) {
        console.log(
            "Tariff name must contain only letters and be one word."
        );
        return false;
    }

    if (!getValidValue(
        chargeType,
        chargeTypes
    )) {
        console.log(
            "Charge type must be 'standard' or 'fast'."
        );
        return false;
    }

    if (isNaN(pricePerKwh) || pricePerKwh <= 0) {
        console.log(
            "Price must be greater than zero."
        );
        return false;
    }

    if (isNaN(activationFee) || activationFee < 0) {
        console.log(
            "Activation fee can't be negative."
        );
        return false;
    }

    return true;
}

// ==================== MENU ====================

function showTariffsMenu() {

    let option;

    do {

        console.log("\n============== TARIFFS =============");
        console.log("1. Show tariffs");
        console.log("2. Create tariff");
        console.log("3. Update tariff");
        console.log("4. Remove tariff");
        console.log("0. Back");

        option =
            input("Choose an option: ");

        switch (option) {

            case "1":

                showTariffs();
                break;


            case "2":

                const name =
                    input("Tariff name: ");

                const chargeType =
                    input("Charge type (standard/fast): ");

                const pricePerKwh =
                    Number(
                        input("Price per kWh: ")
                            .replace(",", ".")
                    );

                const activationFee =
                    Number(
                        input("Activation fee: ")
                            .replace(",", ".")
                    );

                createTariff(
                    name,
                    chargeType,
                    pricePerKwh,
                    activationFee
                );

                break;


            case "3":

                const updateTariffId =
                    Number(input("ID: "));

                const updateName =
                    input("Tariff name: ");

                const updateChargeType =
                    input(
                        "Charge type (standard/fast): "
                    );

                const updatePricePerKwh =
                    Number(
                        input("Price per kWh: ")
                            .replace(",", ".")
                    );

                const updateActivationFee =
                    Number(
                        input("Activation fee: ")
                            .replace(",", ".")
                    );

                updateTariff(
                    updateTariffId,
                    updateName,
                    updateChargeType,
                    updatePricePerKwh,
                    updateActivationFee
                );

                break;


            case "4":

                const removeTariffId =
                    Number(input("ID: "));

                removeTariff(removeTariffId);

                break;


            case "0":

                break;


            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
}

module.exports = {
    showTariffs,
    createTariff,
    updateTariff,
    removeTariff,
    validateTariff,
    showTariffsMenu
};