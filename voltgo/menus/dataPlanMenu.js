//

function showDataPlansMenu() {

    let option;

    do {

        console.log("\n===== DATA PLANS =====");
        console.log("1. Show data plans");
        console.log("2. Create data plan");
        console.log("3. Update data plan");
        console.log("4. Remove data plan");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showDataPlans();
                break;


            case "2":

                const name =
                    input("Data plan name: ");

                const pricePerKwh = Number(
                    input("Price per kWh: ")
                        .replace(",", ".")
                );

                const activationFee = Number(
                    input("Activation fee: ")
                        .replace(",", ".")
                );

                createDataPlan(
                    name,
                    pricePerKwh,
                    activationFee
                );

                break;


            case "3":

                const updateDataPlanId =
                    Number(input("ID: "));

                const updateName =
                    input("Data plan name: ");

                const updatePricePerKwh = Number(
                    input("Price per kWh: ")
                        .replace(",", ".")
                );

                const updateActivationFee = Number(
                    input("Activation fee: ")
                        .replace(",", ".")
                );

                updateDataPlan(
                    updateDataPlanId,
                    updateName,
                    updatePricePerKwh,
                    updateActivationFee
                );

                break;


            case "4":

                const removeDataPlanId =
                    Number(input("ID: "));

                removeDataPlan(removeDataPlanId);

                break;


            case "0":
                break;


            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
};