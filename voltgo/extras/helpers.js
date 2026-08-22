// functions that perform tasks that help the app run better

// function that removes everything from a word (even accents),
// and returns the word with nothing but letters

function normalize(value) {

    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");

}

// function that normalizes a value and compares it 
// with the normalized values of a list, 
// returning true if it finds the same

function getValidValue(value, list) {

    return list.find(
        validValue => normalize(validValue) === normalize(value)
    );

}

// function that returns true if it finds 
// the normalized municipality in the list
// of municipalities

function getValidMunicipality(
    district,
    municipality
) {

    const validDistrict =
        getValidValue(district, districts);

    if (!validDistrict) {
        return undefined;
    }

    const municipalities =
        municipalitiesByDistrict[validDistrict];

    return municipalities.find(
        validMunicipality =>
            normalize(validMunicipality) ===
            normalize(municipality)
    );

}

// function that checks the IDs in the active and 
// inactive lists and returns the number that comes next 
// after the biggest one it finds 
// (e.g: finds that 7 is the maximum and returns 8)

function getNextId(activeList, inactiveList) {

    const allItems = [
        ...activeList,
        ...inactiveList
    ];

    if (allItems.length === 0) {
        return 1;
    }

    return Math.max(
        ...allItems.map(item => item.id)
    ) + 1;
}

// function that returns true if it finds the country
// in the list of licence plates, after comparing the 
// normalized versions

function getValidLicenceCountry(country) {

    return licencePlateFormats.find(
        licenceCountry =>
            normalize(licenceCountry.country) === normalize(country)
    );

}

// function that returns the licence plates in uppercase
// and without blank spaces

function normalizeLicencePlate(licencePlate) {

    return licencePlate
        .toUpperCase()
        .replace(/\s+/g, "");

}

// function that returns the name with 
// the first letter in uppercase and 
// the remaining letters in lowercase

function normalizeName(name) {

    return name.charAt(0).toUpperCase() +
        name.slice(1).toLowerCase();

}

// function that returns tif without spaces

function normalizeTIF(tif) {

    return tif
        .trim()
        .replace(/\s+/g, "");

}

// function that returns the prefix without spaces 
// and adds a "+" at the start if it didn't have one

function normalizePhonePrefix(phonePrefix) {

    phonePrefix = phonePrefix
        .trim()
        .replace(/\s+/g, "");

    if (!phonePrefix.startsWith("+")) {
        phonePrefix = "+" + phonePrefix;
    }

    return phonePrefix;
}

// function that returns the number without hyphens
// and without spaces

function normalizePhoneNumber(phoneNumber) {

    return phoneNumber
        .replace(/[\s-]+/g, "");

}

// function that returns true if the licence plate
// fits the rules of that country

function validateLicencePlate(
    licenceCountry,
    licencePlate
) {

    const plateCountry =
        getValidLicenceCountry(licenceCountry);

    if (!plateCountry) {
        console.log(
            "Invalid licence plate country."
        );
        return false;
    }

    if (!plateCountry.regex.test(licencePlate)) {
        console.log(
            `Invalid licence plate for ${plateCountry.country}.`
        );
        return false;
    }

    return true;
}

// function that checks if the date is in a valid format
// and if the client is 18 or older

function validateDOB(DOB) {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(DOB)) {
        console.log(
            "Date of birth must have the format YYYY-MM-DD."
        );
        return false;
    }

    const date = new Date(DOB);

    if (
        isNaN(date.getTime()) ||
        date.getFullYear() !== Number(DOB.substring(0, 4)) ||
        date.getMonth() + 1 !== Number(DOB.substring(5, 7)) ||
        date.getDate() !== Number(DOB.substring(8, 10))
    ) {
        console.log("Invalid date of birth.");
        return false;
    }

    const today = new Date();
    const eighteenthBirthday = new Date(date);

    eighteenthBirthday.setFullYear(
        eighteenthBirthday.getFullYear() + 18
    );

    if (eighteenthBirthday > today) {
        console.log(
            "Client must be 18 years old or older."
        );
        return false;
    }

    return true;
}

// function that gives the duration of a charge in hours

function calculateDuration(startDate, endDate) {

    if (!endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const durationInHours =
        (end - start) / (1000 * 60 * 60);

    return Number(durationInHours.toFixed(2));
}

// function that calculates the total energy in a charge

function calculateEnergy(
    stationCode,
    startDate,
    endDate
) {
    const station = stations.find(
        station => station.code === stationCode
    );

    if (!station) {
        return null;
    }

    if (!endDate) {
        return null;
    }

    const durationInHours = calculateDuration(startDate, endDate)

    const energy =
        station.power * durationInHours;

    return Number(energy.toFixed(2));
}

// function that calculates cost of a charge

function calculateCost(
    energy,
    dataPlanId
) {
    if (energy === null) {
        return null;
    }

    const dataPlan = dataPlans.find(
        dataPlan => dataPlan.id === dataPlanId
    );

    if (!dataPlan) {
        return null;
    }

    const cost =
        energy * dataPlan.pricePerKwh +
        dataPlan.activationFee;

    return Number(cost.toFixed(2));
}

// function that returns how many charges have "x" status

function countChargesByStatus(status) {

    return charges.filter(
        charge => charge.status === status
    ).length;

}

// function that returns all charges for the selected status

function getChargesByStatus(status) {

    return charges.filter(
        charge =>
            normalize(charge.status) === normalize(status)
    );
}

// function that returns the age

function calculateAge(DOB) {

    const birthDate = new Date(DOB);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}