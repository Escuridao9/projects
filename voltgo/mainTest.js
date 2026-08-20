const input = require("readline-sync").question;

// Data about stations, clients, data plans and charging info

const districts = [
    "Aveiro",
    "Beja",
    "Braga",
    "Bragança",
    "Castelo Branco",
    "Coimbra",
    "Évora",
    "Faro",
    "Guarda",
    "Leiria",
    "Lisboa",
    "Portalegre",
    "Porto",
    "Santarém",
    "Setúbal",
    "Viana do Castelo",
    "Vila Real",
    "Viseu"
];

const statuses = [
    "active",
    "under maintenance"
];

const countryPrefixes = [
    { prefix: "+1", regex: /^\d{10}$/ },      // United States / Canada
    { prefix: "+7", regex: /^\d{10}$/ },      // Russia / Kazakhstan
    { prefix: "+20", regex: /^\d{10}$/ },     // Egypt
    { prefix: "+27", regex: /^\d{9}$/ },      // South Africa
    { prefix: "+30", regex: /^\d{10}$/ },     // Greece
    { prefix: "+31", regex: /^\d{9}$/ },      // Netherlands
    { prefix: "+32", regex: /^\d{8,9}$/ },    // Belgium
    { prefix: "+33", regex: /^\d{9}$/ },      // France
    { prefix: "+34", regex: /^\d{9}$/ },      // Spain
    { prefix: "+36", regex: /^\d{9}$/ },      // Hungary
    { prefix: "+39", regex: /^\d{9,10}$/ },   // Italy
    { prefix: "+40", regex: /^\d{9}$/ },      // Romania
    { prefix: "+41", regex: /^\d{9}$/ },      // Switzerland
    { prefix: "+43", regex: /^\d{4,13}$/ },   // Austria
    { prefix: "+44", regex: /^\d{10}$/ },     // United Kingdom
    { prefix: "+45", regex: /^\d{8}$/ },      // Denmark
    { prefix: "+46", regex: /^\d{9}$/ },      // Sweden
    { prefix: "+47", regex: /^\d{8}$/ },      // Norway
    { prefix: "+48", regex: /^\d{9}$/ },      // Poland
    { prefix: "+49", regex: /^\d{5,11}$/ },   // Germany
    { prefix: "+51", regex: /^\d{9}$/ },      // Peru
    { prefix: "+52", regex: /^\d{10}$/ },     // Mexico
    { prefix: "+53", regex: /^\d{8}$/ },      // Cuba
    { prefix: "+54", regex: /^\d{10}$/ },     // Argentina
    { prefix: "+55", regex: /^\d{10,11}$/ },  // Brazil
    { prefix: "+56", regex: /^\d{9}$/ },      // Chile
    { prefix: "+57", regex: /^\d{10}$/ },     // Colombia
    { prefix: "+58", regex: /^\d{10}$/ },     // Venezuela
    { prefix: "+60", regex: /^\d{9,10}$/ },   // Malaysia
    { prefix: "+61", regex: /^\d{9}$/ },      // Australia
    { prefix: "+62", regex: /^\d{9,12}$/ },   // Indonesia
    { prefix: "+63", regex: /^\d{10}$/ },     // Philippines
    { prefix: "+64", regex: /^\d{8,10}$/ },   // New Zealand
    { prefix: "+65", regex: /^\d{8}$/ },      // Singapore
    { prefix: "+66", regex: /^\d{9}$/ },      // Thailand
    { prefix: "+81", regex: /^\d{9,10}$/ },   // Japan
    { prefix: "+82", regex: /^\d{9,10}$/ },   // South Korea
    { prefix: "+84", regex: /^\d{9,10}$/ },   // Vietnam
    { prefix: "+86", regex: /^\d{11}$/ },     // China
    { prefix: "+90", regex: /^\d{10}$/ },     // Turkey
    { prefix: "+91", regex: /^\d{10}$/ },     // India
    { prefix: "+92", regex: /^\d{10}$/ },     // Pakistan
    { prefix: "+93", regex: /^\d{9}$/ },      // Afghanistan
    { prefix: "+94", regex: /^\d{9}$/ },      // Sri Lanka
    { prefix: "+95", regex: /^\d{8,10}$/ },   // Myanmar
    { prefix: "+98", regex: /^\d{10}$/ },     // Iran

    { prefix: "+211", regex: /^\d{9}$/ },     // South Sudan
    { prefix: "+212", regex: /^\d{9}$/ },     // Morocco
    { prefix: "+213", regex: /^\d{9}$/ },     // Algeria
    { prefix: "+216", regex: /^\d{8}$/ },     // Tunisia
    { prefix: "+218", regex: /^\d{9}$/ },     // Libya
    { prefix: "+220", regex: /^\d{7}$/ },     // Gambia
    { prefix: "+221", regex: /^\d{9}$/ },     // Senegal
    { prefix: "+222", regex: /^\d{8}$/ },     // Mauritania
    { prefix: "+223", regex: /^\d{8}$/ },     // Mali
    { prefix: "+224", regex: /^\d{9}$/ },     // Guinea
    { prefix: "+225", regex: /^\d{10}$/ },    // Ivory Coast
    { prefix: "+226", regex: /^\d{8}$/ },     // Burkina Faso
    { prefix: "+227", regex: /^\d{8}$/ },     // Niger
    { prefix: "+228", regex: /^\d{8}$/ },     // Togo
    { prefix: "+229", regex: /^\d{8}$/ },     // Benin
    { prefix: "+230", regex: /^\d{8}$/ },     // Mauritius
    { prefix: "+231", regex: /^\d{7,8}$/ },   // Liberia
    { prefix: "+232", regex: /^\d{8}$/ },     // Sierra Leone
    { prefix: "+233", regex: /^\d{9}$/ },     // Ghana
    { prefix: "+234", regex: /^\d{10}$/ },    // Nigeria
    { prefix: "+235", regex: /^\d{8}$/ },     // Chad
    { prefix: "+236", regex: /^\d{8}$/ },     // Central African Republic
    { prefix: "+237", regex: /^\d{9}$/ },     // Cameroon
    { prefix: "+238", regex: /^\d{7}$/ },     // Cape Verde
    { prefix: "+239", regex: /^\d{7}$/ },     // São Tomé and Príncipe
    { prefix: "+240", regex: /^\d{9}$/ },     // Equatorial Guinea
    { prefix: "+241", regex: /^\d{8}$/ },     // Gabon
    { prefix: "+242", regex: /^\d{9}$/ },     // Republic of the Congo
    { prefix: "+243", regex: /^\d{9}$/ },     // Democratic Republic of the Congo
    { prefix: "+244", regex: /^\d{9}$/ },     // Angola
    { prefix: "+245", regex: /^\d{7}$/ },     // Guinea-Bissau
    { prefix: "+248", regex: /^\d{7}$/ },     // Seychelles
    { prefix: "+249", regex: /^\d{9}$/ },     // Sudan
    { prefix: "+250", regex: /^\d{9}$/ },     // Rwanda
    { prefix: "+251", regex: /^\d{9}$/ },     // Ethiopia
    { prefix: "+252", regex: /^\d{8,9}$/ },   // Somalia
    { prefix: "+253", regex: /^\d{8}$/ },     // Djibouti
    { prefix: "+254", regex: /^\d{9}$/ },     // Kenya
    { prefix: "+255", regex: /^\d{9}$/ },     // Tanzania
    { prefix: "+256", regex: /^\d{9}$/ },     // Uganda
    { prefix: "+257", regex: /^\d{8}$/ },     // Burundi
    { prefix: "+258", regex: /^\d{9}$/ },     // Mozambique
    { prefix: "+260", regex: /^\d{9}$/ },     // Zambia
    { prefix: "+261", regex: /^\d{9}$/ },     // Madagascar
    { prefix: "+263", regex: /^\d{9}$/ },     // Zimbabwe
    { prefix: "+264", regex: /^\d{9}$/ },     // Namibia
    { prefix: "+265", regex: /^\d{9}$/ },     // Malawi
    { prefix: "+266", regex: /^\d{8}$/ },     // Lesotho
    { prefix: "+267", regex: /^\d{8}$/ },     // Botswana
    { prefix: "+268", regex: /^\d{8}$/ },     // Eswatini
    { prefix: "+269", regex: /^\d{7}$/ },     // Comoros

    { prefix: "+290", regex: /^\d{4}$/ },     // Saint Helena
    { prefix: "+291", regex: /^\d{7}$/ },     // Eritrea
    { prefix: "+297", regex: /^\d{7}$/ },     // Aruba
    { prefix: "+298", regex: /^\d{6}$/ },     // Faroe Islands
    { prefix: "+299", regex: /^\d{6}$/ },     // Greenland

    { prefix: "+350", regex: /^\d{8}$/ },     // Gibraltar
    { prefix: "+351", regex: /^9\d{8}$/ },    // Portugal
    { prefix: "+352", regex: /^\d{9}$/ },     // Luxembourg
    { prefix: "+353", regex: /^\d{9}$/ },     // Ireland
    { prefix: "+354", regex: /^\d{7}$/ },     // Iceland
    { prefix: "+355", regex: /^\d{9}$/ },     // Albania
    { prefix: "+356", regex: /^\d{8}$/ },     // Malta
    { prefix: "+357", regex: /^\d{8}$/ },     // Cyprus
    { prefix: "+358", regex: /^\d{9,10}$/ },  // Finland
    { prefix: "+359", regex: /^\d{9}$/ },     // Bulgaria
    { prefix: "+370", regex: /^\d{8}$/ },     // Lithuania
    { prefix: "+371", regex: /^\d{8}$/ },     // Latvia
    { prefix: "+372", regex: /^\d{7,8}$/ },   // Estonia
    { prefix: "+373", regex: /^\d{8}$/ },     // Moldova
    { prefix: "+374", regex: /^\d{8}$/ },     // Armenia
    { prefix: "+375", regex: /^\d{9}$/ },     // Belarus
    { prefix: "+376", regex: /^\d{6}$/ },     // Andorra
    { prefix: "+377", regex: /^\d{8,9}$/ },   // Monaco
    { prefix: "+378", regex: /^\d{10}$/ },    // San Marino
    { prefix: "+380", regex: /^\d{9}$/ },     // Ukraine
    { prefix: "+381", regex: /^\d{8,9}$/ },   // Serbia
    { prefix: "+382", regex: /^\d{8}$/ },     // Montenegro
    { prefix: "+383", regex: /^\d{8}$/ },     // Kosovo
    { prefix: "+385", regex: /^\d{8,9}$/ },   // Croatia
    { prefix: "+386", regex: /^\d{8}$/ },     // Slovenia
    { prefix: "+387", regex: /^\d{8}$/ },     // Bosnia and Herzegovina
    { prefix: "+389", regex: /^\d{8}$/ },     // North Macedonia

    { prefix: "+501", regex: /^\d{7}$/ },     // Belize
    { prefix: "+502", regex: /^\d{8}$/ },     // Guatemala
    { prefix: "+503", regex: /^\d{8}$/ },     // El Salvador
    { prefix: "+504", regex: /^\d{8}$/ },     // Honduras
    { prefix: "+505", regex: /^\d{8}$/ },     // Nicaragua
    { prefix: "+506", regex: /^\d{8}$/ },     // Costa Rica
    { prefix: "+507", regex: /^\d{7,8}$/ },   // Panama
    { prefix: "+509", regex: /^\d{8}$/ },     // Haiti

    { prefix: "+591", regex: /^\d{8}$/ },     // Bolivia
    { prefix: "+592", regex: /^\d{7}$/ },     // Guyana
    { prefix: "+593", regex: /^\d{9}$/ },     // Ecuador
    { prefix: "+594", regex: /^\d{9}$/ },     // French Guiana
    { prefix: "+595", regex: /^\d{9}$/ },     // Paraguay
    { prefix: "+597", regex: /^\d{7}$/ },     // Suriname
    { prefix: "+598", regex: /^\d{8}$/ },     // Uruguay
    { prefix: "+599", regex: /^\d{7,8}$/ },   // Caribbean Netherlands / Curaçao

    { prefix: "+670", regex: /^\d{8}$/ },     // Timor-Leste
    { prefix: "+672", regex: /^\d{6,8}$/ },   // Australian External Territories
    { prefix: "+673", regex: /^\d{7}$/ },     // Brunei
    { prefix: "+674", regex: /^\d{7}$/ },     // Nauru
    { prefix: "+675", regex: /^\d{7}$/ },     // Papua New Guinea
    { prefix: "+676", regex: /^\d{7}$/ },     // Tonga
    { prefix: "+677", regex: /^\d{7}$/ },     // Solomon Islands
    { prefix: "+678", regex: /^\d{7}$/ },     // Vanuatu
    { prefix: "+679", regex: /^\d{7}$/ },     // Fiji
    { prefix: "+680", regex: /^\d{7}$/ },     // Palau
    { prefix: "+681", regex: /^\d{6}$/ },     // Wallis and Futuna
    { prefix: "+682", regex: /^\d{5}$/ },     // Cook Islands
    { prefix: "+683", regex: /^\d{4}$/ },     // Niue
    { prefix: "+685", regex: /^\d{7}$/ },     // Samoa
    { prefix: "+686", regex: /^\d{8}$/ },     // Kiribati
    { prefix: "+687", regex: /^\d{6}$/ },     // New Caledonia
    { prefix: "+688", regex: /^\d{5,7}$/ },   // Tuvalu
    { prefix: "+689", regex: /^\d{8}$/ },     // French Polynesia
    { prefix: "+690", regex: /^\d{4}$/ },     // Tokelau
    { prefix: "+691", regex: /^\d{7}$/ },     // Micronesia
    { prefix: "+692", regex: /^\d{7}$/ },     // Marshall Islands

    { prefix: "+850", regex: /^\d{8,10}$/ },  // North Korea
    { prefix: "+852", regex: /^\d{8}$/ },     // Hong Kong
    { prefix: "+853", regex: /^\d{8}$/ },     // Macau
    { prefix: "+855", regex: /^\d{8,9}$/ },   // Cambodia
    { prefix: "+856", regex: /^\d{8,10}$/ },  // Laos
    { prefix: "+880", regex: /^\d{10}$/ },    // Bangladesh
    { prefix: "+886", regex: /^\d{9,10}$/ },  // Taiwan

    { prefix: "+960", regex: /^\d{7}$/ },     // Maldives
    { prefix: "+961", regex: /^\d{7,8}$/ },   // Lebanon
    { prefix: "+962", regex: /^\d{8,9}$/ },   // Jordan
    { prefix: "+963", regex: /^\d{9}$/ },     // Syria
    { prefix: "+964", regex: /^\d{10}$/ },    // Iraq
    { prefix: "+965", regex: /^\d{8}$/ },     // Kuwait
    { prefix: "+966", regex: /^\d{9}$/ },     // Saudi Arabia
    { prefix: "+967", regex: /^\d{9}$/ },     // Yemen
    { prefix: "+968", regex: /^\d{8}$/ },     // Oman
    { prefix: "+970", regex: /^\d{9}$/ },     // Palestine
    { prefix: "+971", regex: /^\d{9}$/ },     // United Arab Emirates
    { prefix: "+972", regex: /^\d{9}$/ },     // Israel
    { prefix: "+973", regex: /^\d{8}$/ },     // Bahrain
    { prefix: "+974", regex: /^\d{8}$/ },     // Qatar
    { prefix: "+975", regex: /^\d{8}$/ },     // Bhutan
    { prefix: "+976", regex: /^\d{8}$/ },     // Mongolia
    { prefix: "+977", regex: /^\d{10}$/ },    // Nepal

    { prefix: "+992", regex: /^\d{9}$/ },     // Tajikistan
    { prefix: "+993", regex: /^\d{8}$/ },     // Turkmenistan
    { prefix: "+994", regex: /^\d{9}$/ },     // Azerbaijan
    { prefix: "+995", regex: /^\d{9}$/ },     // Georgia
    { prefix: "+996", regex: /^\d{9}$/ },     // Kyrgyzstan
    { prefix: "+998", regex: /^\d{9}$/ },     // Uzbekistan
];

// Information related to stations

const stations = [
    {
        code: "S001",
        district: "Braga",
        power: 100,
        connectorType: "MJG",
        status: "active",
    },
    {
        code: "S002",
        district: "Porto",
        power: 150,
        connectorType: "DSG",
        status: "under maintenance",
    },
    {
        code: "S003",
        district: "Coimbra",
        power: 75,
        connectorType: "MJG",
        status: "active",
    }
];

// Information related to clients

const clients = [
    {
        id: "271747390",
        firstName: "Roberto",
        lastName: "Gomes",
        DOB: "1995-07-13",
        phoneNumber: "+351915439865",
        licencePlate: "AA-21-BB",
    },
    {
        id: "278934321",
        firstName: "Caetana",
        lastName: "Silva",
        DOB: "1998-01-15",
        phoneNumber: "+351915439865",
        licencePlate: "AA-21-BB",
    },
];

// Information related to each data plan

const dataPlans = [
    {
        id: 1,
        name: "Simple",
        pricePerKwh: 0.17,
        activationFee: 1.00,
    },
    {
        id: 2,
        name: "Deluxe",
        pricePerKwh: 0.30,
        activationFee: 2.50,
    },
];

// Information related to each charge of each client

const charges = [
    {
        id: 1,
        stationCode: "S001",
        clientId: "271747390",
        startDate: "2026-07-15T16:00",
        endDate: "2026-07-15T17:00",
        energy: 40,
        dataPlanId: 1,
        cost: 7.80,
        status: "invoiced",
    },
    {
        id: 2,
        stationCode: "S003",
        clientId: "271747390",
        startDate: "2026-03-26T12:00",
        endDate: "2026-03-26T14:00",
        energy: 80,
        dataPlanId: 1,
        cost: 14.60,
        status: "cancelled",
    },
    {
        id: 3,
        stationCode: "S002",
        clientId: "278934321",
        startDate: "2026-01-12T10:00",
        endDate: "2026-01-12T11:00",
        energy: 50,
        dataPlanId: 2,
        cost: 17.50,
        status: "terminated",
    },
    {
        id: 4,
        stationCode: "S003",
        clientId: "278934321",
        startDate: "2026-08-12T14:00",
        endDate: "2026-08-12T14:30",
        energy: 50,
        dataPlanId: 2,
        cost: 17.50,
        status: "in process",
    },
];

// General normalization

function normalize(value) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}

function getValidValue(value, list) {
    return list.find(
        validValue => normalize(validValue) === normalize(value)
    );
}

// ==================== STATIONS ====================

function createStation(code, district, power, connectorType, status) {

    code = code.toUpperCase();

    if (!validateStation(
        "create",
        code,
        district,
        power,
        connectorType,
        status
    )) {
        return;
    }

    const validDistrict = getValidValue(district, districts);
    const validStatus = getValidValue(status, statuses);

    const newStation = {
        code: code,
        district: validDistrict,
        power: power,
        connectorType: connectorType,
        status: validStatus,
    };

    stations.push(newStation);
}

function showStations() {
    for (const station of stations) {
        console.log(
            `${station.code} | ${station.district} | ${station.power} kW | ${station.connectorType} | ${station.status}`
        );
    }
}

function updateStation(code, district, power, connectorType, status) {

    code = code.toUpperCase();

    if (!validateStation(
        "update",
        code,
        district,
        power,
        connectorType,
        status
    )) {
        return;
    }

    const station = stations.find(station => station.code === code);

    const validDistrict = getValidValue(district, districts);
    const validStatus = getValidValue(status, statuses);

    station.district = validDistrict;
    station.power = power;
    station.connectorType = connectorType;
    station.status = validStatus;
}

function removeStation(code) {

    code = code.toUpperCase();

    if (!validateStation(
        "remove",
        code
    )) {
        return;
    }

    const index = stations.findIndex(station => station.code === code);

    stations.splice(index, 1);
}

function validateStation(
    operation,
    code,
    district,
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

            if (stations.some(station => station.code === code)) {
                console.log("There's already a station with that code.");
                return false;
            }

            if (!getValidValue(district, districts)) {
                console.log("Invalid district.");
                return false;
            }

            if (power <= 0 || isNaN(power)) {
                console.log("Power can't be inferior to zero.");
                return false;
            }

            if (!/^[A-Z]{3}$/.test(connectorType)) {
                console.log(
                    "Connector type must be three uppercase letters: e.g. RTG"
                );
                return false;
            }

            if (!getValidValue(status, statuses)) {
                console.log("Invalid status.");
                return false;
            }

            break;

        case "update":

            if (!stations.some(station => station.code === code)) {
                console.log("Station not found.");
                return false;
            }

            if (!getValidValue(district, districts)) {
                console.log("Invalid district.");
                return false;
            }

            if (power <= 0 || isNaN(power)) {
                console.log("Power can't be inferior to zero.");
                return false;
            }

            if (!/^[A-Z]{3}$/.test(connectorType)) {
                console.log(
                    "Connector type must be three uppercase letters: e.g. RTG"
                );
                return false;
            }

            if (!getValidValue(status, statuses)) {
                console.log("Invalid status.");
                return false;
            }

            break;

        case "remove":

            if (!stations.some(station => station.code === code)) {
                console.log("Station not found.");
                return false;
            }

            if (charges.some(charge => charge.stationCode === code)) {
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

function showStationsMenu() {

    let option;

    do {
        console.log("\n===== STATIONS =====");
        console.log("1. Show stations");
        console.log("2. Create station");
        console.log("3. Update station");
        console.log("4. Remove station");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showStations();
                break;

            case "2":

                const code = input("Code: ");
                const district = input("District: ");
                const power = Number(input("Power: "));
                const connectorType = input("Connector type: ");
                const status = input("Status: ");

                createStation(
                    code,
                    district,
                    power,
                    connectorType,
                    status
                );

                break;

            case "3":

                const updateCode = input("Code: ");
                const updateDistrict = input("New district: ");
                const updatePower = Number(input("New power: "));
                const updateConnectorType = input("New connector type: ");
                const updateStatus = input("New status: ");

                updateStation(
                    updateCode,
                    updateDistrict,
                    updatePower,
                    updateConnectorType,
                    updateStatus
                );

                break;

            case "4":

                const removeCode = input("Code: ");

                removeStation(removeCode);

                break;

            case "0":
                break;

            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
}

// ==================== CLIENTS ====================

function normalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function showClients() {
    for (const client of clients) {
        console.log(
            `${client.id} | ${client.firstName} | ${client.lastName} | ${client.DOB} | ${client.phoneNumber} | ${client.licencePlate}`
        );
    }
}

function createClient(
    id,
    firstName,
    lastName,
    DOB,
    phonePrefix,
    phoneNumber,
    licencePlate
) {

    firstName = normalizeName(firstName);
    lastName = normalizeName(lastName);

    DOB = DOB.replace(/[\/\s]+/g, "-");

    phonePrefix = phonePrefix.replace(/\s+/g, "");
    phoneNumber = phoneNumber.replace(/\s+/g, "");

    licencePlate = licencePlate
        .toUpperCase()
        .replace(/\s+/g, "-");

    if (!validateClient(
        "create",
        id,
        firstName,
        lastName,
        DOB,
        phonePrefix,
        phoneNumber,
        licencePlate
    )) {
        return;
    }

    const newClient = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        DOB: DOB,
        phoneNumber: phonePrefix + phoneNumber,
        licencePlate: licencePlate,
    };

    clients.push(newClient);
}

function updateClient(
    id,
    firstName,
    lastName,
    DOB,
    phonePrefix,
    phoneNumber,
    licencePlate
) {

    firstName = normalizeName(firstName);
    lastName = normalizeName(lastName);

    DOB = DOB.replace(/[\/\s]+/g, "-");

    phonePrefix = phonePrefix.replace(/\s+/g, "");
    phoneNumber = phoneNumber.replace(/\s+/g, "");

    licencePlate = licencePlate
        .toUpperCase()
        .replace(/\s+/g, "-");

    const client = clients.find(client => client.id === id);

    if (!client) {
        console.log("Client not found.");
        return;
    }

    if (!validateClient(
        "update",
        id,
        firstName,
        lastName,
        DOB,
        phonePrefix,
        phoneNumber,
        licencePlate
    )) {
        return;
    }

    client.firstName = firstName;
    client.lastName = lastName;
    client.DOB = DOB;
    client.phoneNumber = phonePrefix + phoneNumber;
    client.licencePlate = licencePlate;
}

function removeClient(id) {

    if (!validateClient(
        "remove",
        id
    )) {
        return;
    }

    const index = clients.findIndex(client => client.id === id);

    clients.splice(index, 1);
}

function validateClient(
    operation,
    id,
    firstName,
    lastName,
    DOB,
    phonePrefix,
    phoneNumber,
    licencePlate
) {
    switch (operation) {

        case "create":

            if (!/^\d{9}$/.test(id)) {
                console.log("ID must contain exactly 9 digits.");
                return false;
            }

            if (clients.some(client => client.id === id)) {
                console.log("There's already a client with that ID.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(firstName)) {
                console.log("First name can only contain letters.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(lastName)) {
                console.log("Last name can only contain letters.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}$/.test(DOB)) {
                console.log(
                    "Date of birth must have the format YYYY-MM-DD."
                );
                return false;
            }

            if (
                isNaN(new Date(DOB).getTime()) ||
                new Date(DOB).getFullYear() !== Number(DOB.substring(0, 4)) ||
                new Date(DOB).getMonth() + 1 !== Number(DOB.substring(5, 7)) ||
                new Date(DOB).getDate() !== Number(DOB.substring(8, 10))
            ) {
                console.log("Invalid date of birth.");
                return false;
            }

            if (
                new Date(DOB).setFullYear(
                    new Date(DOB).getFullYear() + 18
                ) >= new Date()
            ) {
                console.log("Client must be 18 years old or older.");
                return false;
            }

            const phoneCountry = countryPrefixes.find(
                country => country.prefix === phonePrefix
            );

            if (!phoneCountry) {
                console.log("Invalid country prefix.");
                return false;
            }

            if (!phoneCountry.regex.test(phoneNumber)) {
                console.log(
                    "Invalid phone number for the selected country."
                );
                return false;
            }

            if (!/^\d{2}-[A-Z]{2}-\d{2}$/.test(licencePlate)) {
                console.log("Invalid licence plate.");
                return false;
            }

            break;

        case "update":

            if (!clients.some(client => client.id === id)) {
                console.log("Client not found.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(firstName)) {
                console.log("First name can only contain letters.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(lastName)) {
                console.log("Last name can only contain letters.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}$/.test(DOB)) {
                console.log(
                    "Date of birth must have the format YYYY-MM-DD."
                );
                return false;
            }

            if (
                isNaN(new Date(DOB).getTime()) ||
                new Date(DOB).getFullYear() !== Number(DOB.substring(0, 4)) ||
                new Date(DOB).getMonth() + 1 !== Number(DOB.substring(5, 7)) ||
                new Date(DOB).getDate() !== Number(DOB.substring(8, 10))
            ) {
                console.log("Invalid date of birth.");
                return false;
            }

            if (
                new Date(DOB).setFullYear(
                    new Date(DOB).getFullYear() + 18
                ) >= new Date()
            ) {
                console.log("Client must be 18 years old or older.");
                return false;
            }

            const updatePhoneCountry = countryPrefixes.find(
                country => country.prefix === phonePrefix
            );

            if (!updatePhoneCountry) {
                console.log("Invalid country prefix.");
                return false;
            }

            if (!updatePhoneCountry.regex.test(phoneNumber)) {
                console.log(
                    "Invalid phone number for the selected country."
                );
                return false;
            }

            if (!/^\d{2}-[A-Z]{2}-\d{2}$/.test(licencePlate)) {
                console.log("Invalid licence plate.");
                return false;
            }

            break;

        case "remove":

            if (!clients.some(client => client.id === id)) {
                console.log("Client not found.");
                return false;
            }

            if (charges.some(charge => charge.clientId === id)) {
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

function showClientsMenu() {

    let option;

    do {
        console.log("\n===== CLIENTS =====");
        console.log("1. Show clients");
        console.log("2. Create client");
        console.log("3. Update client");
        console.log("4. Remove client");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showClients();
                break;

            case "2":

                const id = input("ID: ");
                const firstName = input("First name: ");
                const lastName = input("Last name: ");
                const DOB = input("Date of birth: ");
                const phonePrefix = input("Country prefix: ");
                const phoneNumber = input("Phone number: ");
                const licencePlate = input("Licence plate: ");

                createClient(
                    id,
                    firstName,
                    lastName,
                    DOB,
                    phonePrefix,
                    phoneNumber,
                    licencePlate
                );

                break;

            case "3":

                const updateId = input("ID: ");
                const updateFirstName = input("First name: ");
                const updateLastName = input("Last name: ");
                const updateDOB = input("Date of birth: ");
                const updatePhonePrefix = input("Country prefix: ");
                const updatePhoneNumber = input("Phone number: ");
                const updateLicencePlate = input("Licence plate: ");

                updateClient(
                    updateId,
                    updateFirstName,
                    updateLastName,
                    updateDOB,
                    updatePhonePrefix,
                    updatePhoneNumber,
                    updateLicencePlate
                );

                break;

            case "4":

                const removeId = input("ID: ");

                removeClient(removeId);

                break;

            case "0":
                break;

            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
}

// ==================== DATA PLANS ====================

function showDataPlans() {
    for (const dataPlan of dataPlans) {
        console.log(
            `${dataPlan.id} | ${dataPlan.name} | ${dataPlan.pricePerKwh} €/kWh | ${dataPlan.activationFee} €`
        );
    }
}

function createDataPlan(id, name, pricePerKwh, activationFee) {

    name = normalizeName(name);

    if (!validateDataPlan(
        "create",
        id,
        name,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const newDataPlan = {
        id: id,
        name: name,
        pricePerKwh: pricePerKwh,
        activationFee: activationFee,
    };

    dataPlans.push(newDataPlan);
}

function updateDataPlan(id, name, pricePerKwh, activationFee) {

    name = normalizeName(name);

    if (!validateDataPlan(
        "update",
        id,
        name,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const dataPlan = dataPlans.find(dataPlan => dataPlan.id === id);

    dataPlan.name = name;
    dataPlan.pricePerKwh = pricePerKwh;
    dataPlan.activationFee = activationFee;
}

function removeDataPlan(id) {

    if (!validateDataPlan(
        "remove",
        id
    )) {
        return;
    }

    const index = dataPlans.findIndex(dataPlan => dataPlan.id === id);

    dataPlans.splice(index, 1);
}

function validateDataPlan(
    operation,
    id,
    name,
    pricePerKwh,
    activationFee
) {
    switch (operation) {

        case "create":

            if (id <= 0 || isNaN(id)) {
                console.log("ID must be a number greater than 0.");
                return false;
            }

            if (dataPlans.some(dataPlan => dataPlan.id === id)) {
                console.log("There's already a data plan with that ID.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(name)) {
                console.log(
                    "Data plan name must contain only letters and be one word."
                );
                return false;
            }

            if (dataPlans.some(dataPlan => dataPlan.name === name)) {
                console.log("There's already a data plan with that name.");
                return false;
            }

            if (pricePerKwh <= 0 || isNaN(pricePerKwh)) {
                console.log("Price must be greater than zero.");
                return false;
            }

            if (activationFee < 0 || isNaN(activationFee)) {
                console.log("Activation fee can't be negative.");
                return false;
            }

            break;

        case "update":

            if (!dataPlans.some(dataPlan => dataPlan.id === id)) {
                console.log("Data plan not found.");
                return false;
            }

            if (!/^[A-Za-zÀ-ÿ]+$/.test(name)) {
                console.log(
                    "Data plan name must contain only letters and be one word."
                );
                return false;
            }

            if (
                dataPlans.some(
                    dataPlan =>
                        dataPlan.id !== id &&
                        dataPlan.name === name
                )
            ) {
                console.log("There's already a data plan with that name.");
                return false;
            }

            if (pricePerKwh <= 0 || isNaN(pricePerKwh)) {
                console.log("Price must be greater than zero.");
                return false;
            }

            if (activationFee < 0 || isNaN(activationFee)) {
                console.log("Activation fee can't be negative.");
                return false;
            }

            break;

        case "remove":

            if (!dataPlans.some(dataPlan => dataPlan.id === id)) {
                console.log("Data plan not found.");
                return false;
            }

            if (charges.some(charge => charge.dataPlanId === id)) {
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

                const dataPlanId = Number(input("ID: "));
                const name = input("Data plan name: ");

                const pricePerKwh = Number(
                    input("Price per kWh: ").replace(",", ".")
                );

                const activationFee = Number(
                    input("Activation fee: ").replace(",", ".")
                );

                createDataPlan(
                    dataPlanId,
                    name,
                    pricePerKwh,
                    activationFee
                );

                break;

            case "3":

                const updateDataPlanId = Number(input("ID: "));
                const updateName = input("Data plan name: ");

                const updatePricePerKwh = Number(
                    input("Price per kWh: ").replace(",", ".")
                );

                const updateActivationFee = Number(
                    input("Activation fee: ").replace(",", ".")
                );

                updateDataPlan(
                    updateDataPlanId,
                    updateName,
                    updatePricePerKwh,
                    updateActivationFee
                );

                break;

            case "4":

                const removeDataPlanId = Number(input("ID: "));

                removeDataPlan(removeDataPlanId);

                break;

            case "0":
                break;

            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
}

showStationsMenu();