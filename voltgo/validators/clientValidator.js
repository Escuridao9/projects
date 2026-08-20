// function that verifies that an operation involving a client is valid

function validateClient(
    operation,
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

    switch (operation) {

        case "create":

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

            if (!validateDOB(DOB)) {
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

            break;


        case "update":

            if (!clients.some(
                client => client.id === id
            )) {
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

            if (!validateDOB(DOB)) {
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

            break;


        case "remove":

            const client = clients.find(
                client => client.id === id
            );

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

            break;


        default:

            console.log("Invalid operation.");
            return false;
    }

    return true;
}