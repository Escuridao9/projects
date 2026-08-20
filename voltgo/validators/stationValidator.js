// function that verifies that an operation involving a station is valid

function validateStation(
    operation,
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    switch (operation) {

        case "create":

            if (!/^S\d{3}$/.test(code)) {
                console.log(
                    "Code must have the letter S, followed by three digits: e.g. S234"
                );
                return false;
            }

            if (stations.some(
                station => station.code === code
            )) {
                console.log(
                    "There's already a station with that code."
                );
                return false;
            }

            if (!getValidValue(district, districts)) {
                console.log("Invalid district.");
                return false;
            }

            if (!getValidMunicipality(
                district,
                municipality
            )) {
                console.log(
                    "Invalid municipality for the selected district."
                );
                return false;
            }

            if (isNaN(power) || power <= 0) {
                console.log(
                    "Power must be greater than zero."
                );
                return false;
            }

            if (!/^[A-Z]{3}$/.test(connectorType)) {
                console.log(
                    "Connector type must be three uppercase letters: e.g. RTG"
                );
                return false;
            }

            if (!getValidValue(status, stationStatuses)) {
                console.log("Invalid status.");
                return false;
            }

            break;


        case "update":

            if (!stations.some(
                station => station.code === code
            )) {
                console.log("Station not found.");
                return false;
            }

            if (!getValidValue(district, districts)) {
                console.log("Invalid district.");
                return false;
            }

            if (!getValidMunicipality(
                district,
                municipality
            )) {
                console.log(
                    "Invalid municipality for the selected district."
                );
                return false;
            }

            if (isNaN(power) || power <= 0) {
                console.log(
                    "Power must be greater than zero."
                );
                return false;
            }

            if (!/^[A-Z]{3}$/.test(connectorType)) {
                console.log(
                    "Connector type must be three uppercase letters: e.g. RTG"
                );
                return false;
            }

            if (!getValidValue(status, stationStatuses)) {
                console.log("Invalid status.");
                return false;
            }

            break;


        case "remove":

            const station = stations.find(
                station => station.code === code
            );

            if (!station) {
                console.log("Station not found.");
                return false;
            }

            if (charges.some(
                charge => charge.stationCode === code
            )) {
                console.log(
                    "It's not possible to remove that station because there are charges associated with it."
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