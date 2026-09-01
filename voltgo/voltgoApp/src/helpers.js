const {
    municipalitiesByDistrict,
    countryPrefixes,
    licencePlateFormats
} = require('./constants');

function normalizeValue(value) {
    if (!value) return "";
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}

function normalizeCode(value) {
    if (!value) return "";
    return value.replace(/\s+/g, "").toUpperCase();
}

function normalizeWord(value) {
    if (!value) return "";
    value = value.replace(/\s+/g, "");
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function getValidValue(value, list) {
    return list.find(
        validValue => normalizeValue(validValue) === normalizeValue(value)
    );
}

function getValidDistrict(district) {
    return Object.keys(municipalitiesByDistrict).find(
        validDistrict =>
            normalizeValue(validDistrict) === normalizeValue(district)
    );
}

function getValidMunicipality(district, municipality) {
    const validDistrict = getValidDistrict(district);
    if (!validDistrict) return undefined;

    const municipalities = municipalitiesByDistrict[validDistrict];
    return municipalities.find(
        validMunicipality =>
            normalizeValue(validMunicipality) === normalizeValue(municipality)
    );
}

function getNextId(activeList, inactiveList) {
    const allItems = [...activeList, ...inactiveList];
    if (allItems.length === 0) return 1;
    return Math.max(...allItems.map(item => item.id)) + 1;
}

function getLocalDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function normalizePhonePrefix(phonePrefix) {
    phonePrefix = normalizeValue(phonePrefix);
    if (!phonePrefix.startsWith("+")) {
        phonePrefix = "+" + phonePrefix;
    }
    return phonePrefix;
}

function validatePhone(phonePrefix, phoneNumber) {
    const phoneCountry = countryPrefixes.find(
        country => country.prefix === phonePrefix
    );

    if (!phoneCountry) {
        console.log("Invalid country prefix.");
        return false;
    }

    if (!phoneCountry.regex.test(phoneNumber)) {
        console.log("Invalid phone number for the selected country.");
        return false;
    }

    return true;
}

function getValidLicenceCountry(country) {
    return licencePlateFormats.find(
        licenceCountry =>
            normalizeValue(licenceCountry.country) === normalizeValue(country)
    );
}

function validateLicencePlate(licenceCountry, licencePlate) {
    const plateCountry = getValidLicenceCountry(licenceCountry);
    if (!plateCountry) {
        console.log("Invalid licence plate country.");
        return false;
    }

    if (!plateCountry.regex.test(licencePlate)) {
        console.log(`Invalid licence plate for ${plateCountry.country}.`);
        return false;
    }

    return true;
}

function validateDob(dob) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        console.log("Date of birth must have the format YYYY-MM-DD.");
        return false;
    }

    const date = new Date(dob);
    if (
        isNaN(date.getTime()) ||
        date.getFullYear() !== Number(dob.substring(0, 4)) ||
        date.getMonth() + 1 !== Number(dob.substring(5, 7)) ||
        date.getDate() !== Number(dob.substring(8, 10))
    ) {
        console.log("Invalid date of birth.");
        return false;
    }

    const today = new Date();
    const eighteenthBirthday = new Date(date);
    eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);

    if (eighteenthBirthday > today) {
        console.log("Client must be 18 years old or older.");
        return false;
    }

    return true;
}

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

function validateDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/.test(date)) {
        return false;
    }

    const validDate = new Date(date);
    if (
        isNaN(validDate.getTime()) ||
        validDate.getFullYear() !== Number(date.substring(0, 4)) ||
        validDate.getMonth() + 1 !== Number(date.substring(5, 7)) ||
        validDate.getDate() !== Number(date.substring(8, 10))
    ) {
        return false;
    }

    return true;
}

module.exports = {
    normalizeValue,
    normalizeCode,
    normalizeWord,
    getValidValue,
    getValidDistrict,
    getValidMunicipality,
    getNextId,
    getLocalDateTime,
    normalizePhonePrefix,
    validatePhone,
    getValidLicenceCountry,
    validateLicencePlate,
    validateDob,
    calculateAge,
    validateDate
};