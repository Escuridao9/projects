// function that verifies that an operation involving a data plan is valid

function validateDataPlan(
    operation,
    id,
    name,
    pricePerKwh,
    activationFee,
) {

    switch (operation) {

        case "create":

            if (!/^[A-Za-zÀ-ÿ]+$/.test(name)) {
                console.log(
                    "Data plan name must contain only letters and be one word."
                );
                return false;
            }

            if (dataPlans.some(
                dataPlan => dataPlan.name === name
            )) {
                console.log(
                    "There's already a data plan with that name."
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

            break;


        case "update":

            if (!Number.isInteger(id) || id <= 0) {
                console.log(
                    "ID must be a positive integer."
                );
                return false;
            }

            if (!dataPlans.some(
                dataPlan => dataPlan.id === id
            )) {
                console.log("Data plan not found.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(name)) {
                console.log(
                    "Data plan name must contain only letters and be one word."
                );
                return false;
            }

            if (dataPlans.some(
                dataPlan =>
                    dataPlan.id !== id &&
                    dataPlan.name === name
            )) {
                console.log(
                    "There's already a data plan with that name."
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

            break;


        case "remove":

            if (!Number.isInteger(id) || id <= 0) {
                console.log(
                    "ID must be a positive integer."
                );
                return false;
            }

            if (!dataPlans.some(
                dataPlan => dataPlan.id === id
            )) {
                console.log("Data plan not found.");
                return false;
            }

            if (charges.some(
                charge => charge.dataPlanId === id
            )) {
                console.log(
                    "It's not possible to remove that data plan because there are charges associated with it."
                );
                return false;
            }

            break;


        default:

            console.log("Invalid operation.");
            return false;
    }

    return true;
}