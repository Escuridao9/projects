const input = require("readline-sync").question;

// Data about stations, clients, tariffs and charging info

// ==================== MUNICIPALITIES ====================

const municipalitiesByDistrict = {

    "Aveiro": [
        "Águeda",
        "Albergaria-a-Velha",
        "Anadia",
        "Arouca",
        "Aveiro",
        "Castelo de Paiva",
        "Espinho",
        "Estarreja",
        "Ílhavo",
        "Mealhada",
        "Murtosa",
        "Oliveira de Azeméis",
        "Oliveira do Bairro",
        "Ovar",
        "Santa Maria da Feira",
        "São João da Madeira",
        "Sever do Vouga",
        "Vagos",
        "Vale de Cambra"
    ],

    "Beja": [
        "Aljustrel",
        "Almodôvar",
        "Alvito",
        "Barrancos",
        "Beja",
        "Castro Verde",
        "Cuba",
        "Ferreira do Alentejo",
        "Mértola",
        "Moura",
        "Odemira",
        "Ourique",
        "Serpa",
        "Vidigueira"
    ],

    "Braga": [
        "Amares",
        "Barcelos",
        "Braga",
        "Cabeceiras de Basto",
        "Celorico de Basto",
        "Esposende",
        "Fafe",
        "Guimarães",
        "Póvoa de Lanhoso",
        "Terras de Bouro",
        "Vieira do Minho",
        "Vila Nova de Famalicão",
        "Vila Verde",
        "Vizela"
    ],

    "Bragança": [
        "Alfândega da Fé",
        "Bragança",
        "Carrazeda de Ansiães",
        "Freixo de Espada à Cinta",
        "Macedo de Cavaleiros",
        "Miranda do Douro",
        "Mirandela",
        "Mogadouro",
        "Torre de Moncorvo",
        "Vila Flor",
        "Vimioso",
        "Vinhais"
    ],

    "Castelo Branco": [
        "Belmonte",
        "Castelo Branco",
        "Covilhã",
        "Fundão",
        "Idanha-a-Nova",
        "Oleiros",
        "Penamacor",
        "Proença-a-Nova",
        "Sertã",
        "Vila de Rei",
        "Vila Velha de Ródão"
    ],

    "Coimbra": [
        "Arganil",
        "Cantanhede",
        "Coimbra",
        "Condeixa-a-Nova",
        "Figueira da Foz",
        "Góis",
        "Lousã",
        "Mira",
        "Miranda do Corvo",
        "Montemor-o-Velho",
        "Oliveira do Hospital",
        "Pampilhosa da Serra",
        "Penacova",
        "Penela",
        "Soure",
        "Tábua",
        "Vila Nova de Poiares"
    ],

    "Évora": [
        "Alandroal",
        "Arraiolos",
        "Borba",
        "Estremoz",
        "Évora",
        "Montemor-o-Novo",
        "Mora",
        "Mourão",
        "Portel",
        "Redondo",
        "Reguengos de Monsaraz",
        "Vendas Novas",
        "Viana do Alentejo",
        "Vila Viçosa"
    ],

    "Faro": [
        "Albufeira",
        "Alcoutim",
        "Aljezur",
        "Castro Marim",
        "Faro",
        "Lagoa",
        "Lagos",
        "Loulé",
        "Monchique",
        "Olhão",
        "Portimão",
        "São Brás de Alportel",
        "Silves",
        "Tavira",
        "Vila do Bispo",
        "Vila Real de Santo António"
    ],

    "Guarda": [
        "Aguiar da Beira",
        "Almeida",
        "Celorico da Beira",
        "Figueira de Castelo Rodrigo",
        "Fornos de Algodres",
        "Gouveia",
        "Guarda",
        "Manteigas",
        "Mêda",
        "Pinhel",
        "Sabugal",
        "Seia",
        "Trancoso",
        "Vila Nova de Foz Côa"
    ],

    "Leiria": [
        "Alcobaça",
        "Alvaiázere",
        "Ansião",
        "Batalha",
        "Bombarral",
        "Caldas da Rainha",
        "Castanheira de Pêra",
        "Figueiró dos Vinhos",
        "Leiria",
        "Marinha Grande",
        "Nazaré",
        "Óbidos",
        "Pedrógão Grande",
        "Peniche",
        "Pombal",
        "Porto de Mós"
    ],

    "Lisboa": [
        "Alenquer",
        "Amadora",
        "Arruda dos Vinhos",
        "Azambuja",
        "Cadaval",
        "Cascais",
        "Lisboa",
        "Loures",
        "Lourinhã",
        "Mafra",
        "Odivelas",
        "Oeiras",
        "Sintra",
        "Sobral de Monte Agraço",
        "Torres Vedras",
        "Vila Franca de Xira"
    ],

    "Portalegre": [
        "Alter do Chão",
        "Arronches",
        "Avis",
        "Campo Maior",
        "Castelo de Vide",
        "Crato",
        "Elvas",
        "Fronteira",
        "Gavião",
        "Marvão",
        "Monforte",
        "Nisa",
        "Ponte de Sor",
        "Portalegre",
        "Sousel"
    ],

    "Porto": [
        "Amarante",
        "Baião",
        "Felgueiras",
        "Gondomar",
        "Lousada",
        "Maia",
        "Marco de Canaveses",
        "Matosinhos",
        "Paços de Ferreira",
        "Paredes",
        "Penafiel",
        "Porto",
        "Póvoa de Varzim",
        "Santo Tirso",
        "Trofa",
        "Valongo",
        "Vila do Conde",
        "Vila Nova de Gaia"
    ],

    "Santarém": [
        "Abrantes",
        "Alcanena",
        "Almeirim",
        "Alpiarça",
        "Benavente",
        "Cartaxo",
        "Chamusca",
        "Constância",
        "Coruche",
        "Entroncamento",
        "Ferreira do Zêzere",
        "Golegã",
        "Mação",
        "Ourém",
        "Rio Maior",
        "Salvaterra de Magos",
        "Santarém",
        "Sardoal",
        "Tomar",
        "Torres Novas",
        "Vila Nova da Barquinha"
    ],

    "Setúbal": [
        "Alcácer do Sal",
        "Alcochete",
        "Almada",
        "Barreiro",
        "Grândola",
        "Moita",
        "Montijo",
        "Palmela",
        "Santiago do Cacém",
        "Seixal",
        "Sesimbra",
        "Setúbal",
        "Sines"
    ],

    "Viana do Castelo": [
        "Arcos de Valdevez",
        "Caminha",
        "Melgaço",
        "Monção",
        "Paredes de Coura",
        "Ponte da Barca",
        "Ponte de Lima",
        "Valença",
        "Viana do Castelo",
        "Vila Nova de Cerveira"
    ],

    "Vila Real": [
        "Alijó",
        "Boticas",
        "Chaves",
        "Mesão Frio",
        "Mondim de Basto",
        "Montalegre",
        "Murça",
        "Peso da Régua",
        "Ribeira de Pena",
        "Sabrosa",
        "Santa Marta de Penaguião",
        "Valpaços",
        "Vila Pouca de Aguiar",
        "Vila Real"
    ],

    "Viseu": [
        "Armamar",
        "Carregal do Sal",
        "Castro Daire",
        "Cinfães",
        "Lamego",
        "Mangualde",
        "Moimenta da Beira",
        "Mortágua",
        "Nelas",
        "Oliveira de Frades",
        "Penalva do Castelo",
        "Penedono",
        "Resende",
        "Santa Comba Dão",
        "São João da Pesqueira",
        "São Pedro do Sul",
        "Sátão",
        "Sernancelhe",
        "Tabuaço",
        "Tarouca",
        "Tondela",
        "Vila Nova de Paiva",
        "Viseu",
        "Vouzela"
    ],

    "Açores": [
        "Angra do Heroísmo",
        "Calheta",
        "Corvo",
        "Horta",
        "Lagoa",
        "Lajes das Flores",
        "Lajes do Pico",
        "Madalena",
        "Nordeste",
        "Ponta Delgada",
        "Povoação",
        "Praia da Vitória",
        "Ribeira Grande",
        "Santa Cruz da Graciosa",
        "Santa Cruz das Flores",
        "São Roque do Pico",
        "Velas",
        "Vila do Porto",
        "Vila Franca do Campo"
    ],

    "Madeira": [
        "Calheta",
        "Câmara de Lobos",
        "Funchal",
        "Machico",
        "Ponta do Sol",
        "Porto Moniz",
        "Porto Santo",
        "Ribeira Brava",
        "Santa Cruz",
        "Santana",
        "São Vicente"
    ]
};

const stationStatuses = [
    "active",
    "under maintenance"
];

const chargeStatuses = [
    "in process",
    "terminated",
    "invoiced",
    "cancelled"
];

const chargeTypes = [
    "standard",
    "fast"
];

const countryPrefixes = [
    { prefix: "+1", regex: /^\d{10}$/ }, // United States, Canada
    { prefix: "+7", regex: /^\d{10}$/ }, // Russia, Kazakhstan
    { prefix: "+20", regex: /^\d{10}$/ }, // Egypt
    { prefix: "+27", regex: /^\d{9}$/ }, // South Africa
    { prefix: "+30", regex: /^\d{10}$/ }, // Greece
    { prefix: "+31", regex: /^\d{9}$/ }, // Netherlands
    { prefix: "+32", regex: /^\d{8,9}$/ }, // Belgium
    { prefix: "+33", regex: /^\d{9}$/ }, // France
    { prefix: "+34", regex: /^\d{9}$/ }, // Spain
    { prefix: "+36", regex: /^\d{9}$/ }, // Hungary
    { prefix: "+39", regex: /^\d{9,10}$/ }, // Italy
    { prefix: "+40", regex: /^\d{9}$/ }, // Romania
    { prefix: "+41", regex: /^\d{9}$/ }, // Switzerland
    { prefix: "+43", regex: /^\d{4,13}$/ }, // Austria
    { prefix: "+44", regex: /^\d{10}$/ }, // United Kingdom
    { prefix: "+45", regex: /^\d{8}$/ }, // Denmark
    { prefix: "+46", regex: /^\d{9}$/ }, // Sweden
    { prefix: "+47", regex: /^\d{8}$/ }, // Norway
    { prefix: "+48", regex: /^\d{9}$/ }, // Poland
    { prefix: "+49", regex: /^\d{5,11}$/ }, // Germany
    { prefix: "+51", regex: /^\d{9}$/ }, // Peru
    { prefix: "+52", regex: /^\d{10}$/ }, // Mexico
    { prefix: "+53", regex: /^\d{8}$/ }, // Cuba
    { prefix: "+54", regex: /^\d{10}$/ }, // Argentina
    { prefix: "+55", regex: /^\d{10,11}$/ }, // Brazil
    { prefix: "+56", regex: /^\d{9}$/ }, // Chile
    { prefix: "+57", regex: /^\d{10}$/ }, // Colombia
    { prefix: "+58", regex: /^\d{10}$/ }, // Venezuela
    { prefix: "+60", regex: /^\d{9,10}$/ }, // Malaysia
    { prefix: "+61", regex: /^\d{9}$/ }, // Australia
    { prefix: "+62", regex: /^\d{9,12}$/ }, // Indonesia
    { prefix: "+63", regex: /^\d{10}$/ }, // Philippines
    { prefix: "+64", regex: /^\d{8,10}$/ }, // New Zealand
    { prefix: "+65", regex: /^\d{8}$/ }, // Singapore
    { prefix: "+66", regex: /^\d{9}$/ }, // Thailand
    { prefix: "+81", regex: /^\d{9,10}$/ }, // Japan
    { prefix: "+82", regex: /^\d{9,10}$/ }, // South Korea
    { prefix: "+84", regex: /^\d{9,10}$/ }, // Vietnam
    { prefix: "+86", regex: /^\d{11}$/ }, // China
    { prefix: "+90", regex: /^\d{10}$/ }, // Turkey
    { prefix: "+91", regex: /^\d{10}$/ }, // India
    { prefix: "+92", regex: /^\d{10}$/ }, // Pakistan
    { prefix: "+93", regex: /^\d{9}$/ }, // Afghanistan
    { prefix: "+94", regex: /^\d{9}$/ }, // Sri Lanka
    { prefix: "+95", regex: /^\d{8,10}$/ }, // Myanmar
    { prefix: "+98", regex: /^\d{10}$/ }, // Iran

    { prefix: "+211", regex: /^\d{9}$/ }, // South Sudan
    { prefix: "+212", regex: /^\d{9}$/ }, // Morocco
    { prefix: "+213", regex: /^\d{9}$/ }, // Algeria
    { prefix: "+216", regex: /^\d{8}$/ }, // Tunisia
    { prefix: "+218", regex: /^\d{9}$/ }, // Libya
    { prefix: "+220", regex: /^\d{7}$/ }, // Gambia
    { prefix: "+221", regex: /^\d{9}$/ }, // Senegal
    { prefix: "+222", regex: /^\d{8}$/ }, // Mauritania
    { prefix: "+223", regex: /^\d{8}$/ }, // Mali
    { prefix: "+224", regex: /^\d{9}$/ }, // Guinea
    { prefix: "+225", regex: /^\d{10}$/ }, // Côte d'Ivoire
    { prefix: "+226", regex: /^\d{8}$/ }, // Burkina Faso
    { prefix: "+227", regex: /^\d{8}$/ }, // Niger
    { prefix: "+228", regex: /^\d{8}$/ }, // Togo
    { prefix: "+229", regex: /^\d{8}$/ }, // Benin
    { prefix: "+230", regex: /^\d{8}$/ }, // Mauritius
    { prefix: "+231", regex: /^\d{7,8}$/ }, // Liberia
    { prefix: "+232", regex: /^\d{8}$/ }, // Sierra Leone
    { prefix: "+233", regex: /^\d{9}$/ }, // Ghana
    { prefix: "+234", regex: /^\d{10}$/ }, // Nigeria
    { prefix: "+235", regex: /^\d{8}$/ }, // Chad
    { prefix: "+236", regex: /^\d{8}$/ }, // Central African Republic
    { prefix: "+237", regex: /^\d{9}$/ }, // Cameroon
    { prefix: "+238", regex: /^\d{7}$/ }, // Cape Verde
    { prefix: "+239", regex: /^\d{7}$/ }, // São Tomé and Príncipe
    { prefix: "+240", regex: /^\d{9}$/ }, // Equatorial Guinea
    { prefix: "+241", regex: /^\d{8}$/ }, // Gabon
    { prefix: "+242", regex: /^\d{9}$/ }, // Republic of the Congo
    { prefix: "+243", regex: /^\d{9}$/ }, // Democratic Republic of the Congo
    { prefix: "+244", regex: /^\d{9}$/ }, // Angola
    { prefix: "+245", regex: /^\d{7}$/ }, // Guinea-Bissau
    { prefix: "+248", regex: /^\d{7}$/ }, // Seychelles
    { prefix: "+249", regex: /^\d{9}$/ }, // Sudan
    { prefix: "+250", regex: /^\d{9}$/ }, // Rwanda
    { prefix: "+251", regex: /^\d{9}$/ }, // Ethiopia
    { prefix: "+252", regex: /^\d{8,9}$/ }, // Somalia
    { prefix: "+253", regex: /^\d{8}$/ }, // Djibouti
    { prefix: "+254", regex: /^\d{9}$/ }, // Kenya
    { prefix: "+255", regex: /^\d{9}$/ }, // Tanzania
    { prefix: "+256", regex: /^\d{9}$/ }, // Uganda
    { prefix: "+257", regex: /^\d{8}$/ }, // Burundi
    { prefix: "+258", regex: /^\d{9}$/ }, // Mozambique
    { prefix: "+260", regex: /^\d{9}$/ }, // Zambia
    { prefix: "+261", regex: /^\d{9}$/ }, // Madagascar
    { prefix: "+263", regex: /^\d{9}$/ }, // Zimbabwe
    { prefix: "+264", regex: /^\d{9}$/ }, // Namibia
    { prefix: "+265", regex: /^\d{9}$/ }, // Malawi
    { prefix: "+266", regex: /^\d{8}$/ }, // Lesotho
    { prefix: "+267", regex: /^\d{8}$/ }, // Botswana
    { prefix: "+268", regex: /^\d{8}$/ }, // Eswatini
    { prefix: "+269", regex: /^\d{7}$/ }, // Comoros

    { prefix: "+290", regex: /^\d{4}$/ }, // Saint Helena
    { prefix: "+291", regex: /^\d{7}$/ }, // Eritrea
    { prefix: "+297", regex: /^\d{7}$/ }, // Aruba
    { prefix: "+298", regex: /^\d{6}$/ }, // Faroe Islands
    { prefix: "+299", regex: /^\d{6}$/ }, // Greenland

    { prefix: "+350", regex: /^\d{8}$/ }, // Gibraltar
    { prefix: "+351", regex: /^9\d{8}$/ }, // Portugal
    { prefix: "+352", regex: /^\d{9}$/ }, // Luxembourg
    { prefix: "+353", regex: /^\d{9}$/ }, // Ireland
    { prefix: "+354", regex: /^\d{7}$/ }, // Iceland
    { prefix: "+355", regex: /^\d{9}$/ }, // Albania
    { prefix: "+356", regex: /^\d{8}$/ }, // Malta
    { prefix: "+357", regex: /^\d{8}$/ }, // Cyprus
    { prefix: "+358", regex: /^\d{9,10}$/ }, // Finland
    { prefix: "+359", regex: /^\d{9}$/ }, // Bulgaria
    { prefix: "+370", regex: /^\d{8}$/ }, // Lithuania
    { prefix: "+371", regex: /^\d{8}$/ }, // Latvia
    { prefix: "+372", regex: /^\d{7,8}$/ }, // Estonia
    { prefix: "+373", regex: /^\d{8}$/ }, // Moldova
    { prefix: "+374", regex: /^\d{8}$/ }, // Armenia
    { prefix: "+375", regex: /^\d{9}$/ }, // Belarus
    { prefix: "+376", regex: /^\d{6}$/ }, // Andorra
    { prefix: "+377", regex: /^\d{8,9}$/ }, // Monaco
    { prefix: "+378", regex: /^\d{10}$/ }, // San Marino
    { prefix: "+380", regex: /^\d{9}$/ }, // Ukraine
    { prefix: "+381", regex: /^\d{8,9}$/ }, // Serbia
    { prefix: "+382", regex: /^\d{8}$/ }, // Montenegro
    { prefix: "+383", regex: /^\d{8}$/ }, // Kosovo
    { prefix: "+385", regex: /^\d{8,9}$/ }, // Croatia
    { prefix: "+386", regex: /^\d{8}$/ }, // Slovenia
    { prefix: "+387", regex: /^\d{8}$/ }, // Bosnia and Herzegovina
    { prefix: "+389", regex: /^\d{8}$/ }, // North Macedonia

    { prefix: "+501", regex: /^\d{7}$/ }, // Belize
    { prefix: "+502", regex: /^\d{8}$/ }, // Guatemala
    { prefix: "+503", regex: /^\d{8}$/ }, // El Salvador
    { prefix: "+504", regex: /^\d{8}$/ }, // Honduras
    { prefix: "+505", regex: /^\d{8}$/ }, // Nicaragua
    { prefix: "+506", regex: /^\d{8}$/ }, // Costa Rica
    { prefix: "+507", regex: /^\d{7,8}$/ }, // Panama
    { prefix: "+509", regex: /^\d{8}$/ }, // Haiti

    { prefix: "+591", regex: /^\d{8}$/ }, // Bolivia
    { prefix: "+592", regex: /^\d{7}$/ }, // Guyana
    { prefix: "+593", regex: /^\d{9}$/ }, // Ecuador
    { prefix: "+594", regex: /^\d{9}$/ }, // French Guiana
    { prefix: "+595", regex: /^\d{9}$/ }, // Paraguay
    { prefix: "+597", regex: /^\d{7}$/ }, // Suriname
    { prefix: "+598", regex: /^\d{8}$/ }, // Uruguay
    { prefix: "+599", regex: /^\d{7,8}$/ }, // Curaçao, Caribbean Netherlands

    { prefix: "+670", regex: /^\d{8}$/ }, // Timor-Leste
    { prefix: "+672", regex: /^\d{6,8}$/ }, // Australian External Territories
    { prefix: "+673", regex: /^\d{7}$/ }, // Brunei
    { prefix: "+674", regex: /^\d{7}$/ }, // Nauru
    { prefix: "+675", regex: /^\d{7}$/ }, // Papua New Guinea
    { prefix: "+676", regex: /^\d{7}$/ }, // Tonga
    { prefix: "+677", regex: /^\d{7}$/ }, // Solomon Islands
    { prefix: "+678", regex: /^\d{7}$/ }, // Vanuatu
    { prefix: "+679", regex: /^\d{7}$/ }, // Fiji
    { prefix: "+680", regex: /^\d{7}$/ }, // Palau
    { prefix: "+681", regex: /^\d{6}$/ }, // Wallis and Futuna
    { prefix: "+682", regex: /^\d{5}$/ }, // Cook Islands
    { prefix: "+683", regex: /^\d{4}$/ }, // Niue
    { prefix: "+685", regex: /^\d{7}$/ }, // Samoa
    { prefix: "+686", regex: /^\d{8}$/ }, // Kiribati
    { prefix: "+687", regex: /^\d{6}$/ }, // New Caledonia
    { prefix: "+688", regex: /^\d{5,7}$/ }, // Tuvalu
    { prefix: "+689", regex: /^\d{8}$/ }, // French Polynesia
    { prefix: "+690", regex: /^\d{4}$/ }, // Tokelau
    { prefix: "+691", regex: /^\d{7}$/ }, // Micronesia
    { prefix: "+692", regex: /^\d{7}$/ }, // Marshall Islands

    { prefix: "+850", regex: /^\d{8,10}$/ }, // North Korea
    { prefix: "+852", regex: /^\d{8}$/ }, // Hong Kong
    { prefix: "+853", regex: /^\d{8}$/ }, // Macau
    { prefix: "+855", regex: /^\d{8,9}$/ }, // Cambodia
    { prefix: "+856", regex: /^\d{8,10}$/ }, // Laos
    { prefix: "+880", regex: /^\d{10}$/ }, // Bangladesh
    { prefix: "+886", regex: /^\d{9,10}$/ }, // Taiwan

    { prefix: "+960", regex: /^\d{7}$/ }, // Maldives
    { prefix: "+961", regex: /^\d{7,8}$/ }, // Lebanon
    { prefix: "+962", regex: /^\d{8,9}$/ }, // Jordan
    { prefix: "+963", regex: /^\d{9}$/ }, // Syria
    { prefix: "+964", regex: /^\d{10}$/ }, // Iraq
    { prefix: "+965", regex: /^\d{8}$/ }, // Kuwait
    { prefix: "+966", regex: /^\d{9}$/ }, // Saudi Arabia
    { prefix: "+967", regex: /^\d{9}$/ }, // Yemen
    { prefix: "+968", regex: /^\d{8}$/ }, // Oman
    { prefix: "+970", regex: /^\d{9}$/ }, // Palestine
    { prefix: "+971", regex: /^\d{9}$/ }, // United Arab Emirates
    { prefix: "+972", regex: /^\d{9}$/ }, // Israel
    { prefix: "+973", regex: /^\d{8}$/ }, // Bahrain
    { prefix: "+974", regex: /^\d{8}$/ }, // Qatar
    { prefix: "+975", regex: /^\d{8}$/ }, // Bhutan
    { prefix: "+976", regex: /^\d{8}$/ }, // Mongolia
    { prefix: "+977", regex: /^\d{10}$/ }, // Nepal

    { prefix: "+992", regex: /^\d{9}$/ }, // Tajikistan
    { prefix: "+993", regex: /^\d{8}$/ }, // Turkmenistan
    { prefix: "+994", regex: /^\d{9}$/ }, // Azerbaijan
    { prefix: "+995", regex: /^\d{9}$/ }, // Georgia
    { prefix: "+996", regex: /^\d{9}$/ }, // Kyrgyzstan
    { prefix: "+998", regex: /^\d{9}$/ } // Uzbekistan
];

// ==================== LICENCE PLATES ====================

const licencePlateFormats = [
    // ==================== AFRICA ====================

    { country: "Algeria", regex: /^\d{5}-\d{3}-\d{2}$/ },
    { country: "Angola", regex: /^(?:LD|LA|AO)-\d{2}-\d{2}-[A-Z]{2}$/ },
    { country: "Botswana", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]$/ },
    { country: "Cameroon", regex: /^[A-Z]{2}\s?\d{4}\s?[A-Z]{2}$/ },
    { country: "Egypt", regex: /^[A-Z0-9]{1,8}$/ },
    { country: "Ghana", regex: /^[A-Z]{2}\s?\d{4}-\d{2}$/ },
    { country: "Kenya", regex: /^[A-Z]{3}\s?\d{3}[A-Z]$/ },
    { country: "Morocco", regex: /^\d{1,5}\s?[A-Z]{1,2}\s?\d{1,2}$/ },
    { country: "Mozambique", regex: /^[A-Z]{2,3}-\d{2}-\d{2}$/ },
    { country: "Namibia", regex: /^[A-Z]{2}\s?\d{4}$/ },
    { country: "Nigeria", regex: /^[A-Z]{3}\s?\d{3}[A-Z]{2}$/ },
    { country: "Rwanda", regex: /^(?:R[A-Z]{2}\s?\d{3}[A-Z])$/ },
    { country: "Senegal", regex: /^[A-Z]{2}\s?\d{4}\s?[A-Z]{2}$/ },
    { country: "South Africa", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Tanzania", regex: /^[A-Z]{2,3}\s?\d{3}[A-Z]{1,2}$/ },
    { country: "Tunisia", regex: /^\d{3}\s?\d{4}$/ },
    { country: "Uganda", regex: /^[U][A-Z]{2}\s?\d{3}[A-Z]$/ },
    { country: "Zambia", regex: /^[A-Z]{3}\s?\d{4}$/ },
    { country: "Zimbabwe", regex: /^[A-Z]{2,3}\s?\d{4}$/ },

    // ==================== ASIA ====================

    { country: "Afghanistan", regex: /^[A-Z]{1,3}\s?\d{1,5}$/ },
    { country: "Bangladesh", regex: /^[A-Z]{2}\s?\d{2}-\d{4}$/ },
    { country: "Bhutan", regex: /^[A-Z]{2}-\d{4}$/ },
    { country: "Brunei", regex: /^[A-Z]{1,2}\s?\d{4}$/ },
    { country: "Cambodia", regex: /^[A-Z]{1,2}\s?\d{4}$/ },
    { country: "China", regex: /^[A-Z]\s?[A-Z0-9]{5}$/ },
    { country: "India", regex: /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,3}\s?\d{1,4}$/ },
    { country: "Indonesia", regex: /^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{1,3}$/ },
    { country: "Iran", regex: /^\d{2}\s?[A-Z]\s?\d{3}\s?\d{2}$/ },
    { country: "Iraq", regex: /^[A-Z]{1,3}\s?\d{1,6}$/ },
    { country: "Israel", regex: /^\d{2,3}-\d{2,3}-\d{2,3}$/ },
    { country: "Japan", regex: /^\d{2,3}-\d{2}\s?[A-Z0-9]{1,2}\s?\d{2}$/ },
    { country: "Jordan", regex: /^[A-Z]{1,3}\s?\d{1,5}$/ },
    { country: "Kazakhstan", regex: /^\d{3}[A-Z]{3}\s?\d{2}$/ },
    { country: "Kuwait", regex: /^\d{1,5}$/ },
    { country: "Laos", regex: /^[A-Z]{2}\s?\d{4}$/ },
    { country: "Lebanon", regex: /^\d{6}$/ },
    { country: "Malaysia", regex: /^[A-Z]{1,3}\s?\d{1,4}$/ },
    { country: "Mongolia", regex: /^[A-Z]{1,3}\s?\d{4}$/ },
    { country: "Myanmar", regex: /^[A-Z]{2,3}\s?\d{4}$/ },
    { country: "Nepal", regex: /^[A-Z]{2}\s?\d{1,4}$/ },
    { country: "Oman", regex: /^[A-Z]{1,2}\s?\d{1,5}$/ },
    { country: "Pakistan", regex: /^[A-Z]{2,3}\s?\d{1,4}$/ },
    { country: "Philippines", regex: /^[A-Z]{3}\s?\d{4}$/ },
    { country: "Qatar", regex: /^[A-Z]{1,2}\s?\d{4,5}$/ },
    { country: "Saudi Arabia", regex: /^\d{4}\s?[A-Z]{3}$/ },
    { country: "Singapore", regex: /^[A-Z]{1,3}\s?\d{1,4}[A-Z]$/ },
    { country: "South Korea", regex: /^\d{2,3}[A-Z]\s?\d{4}$/ },
    { country: "Sri Lanka", regex: /^[A-Z]{2}\s?\d{4}$/ },
    { country: "Taiwan", regex: /^[A-Z]{2,3}-\d{4,5}$/ },
    { country: "Thailand", regex: /^[A-Z]{2}\s?\d{1,4}$/ },
    { country: "United Arab Emirates", regex: /^[A-Z0-9]{1,6}$/ },
    { country: "Uzbekistan", regex: /^\d{1,2}\s?[A-Z]\s?\d{3}[A-Z]{2}$/ },
    { country: "Vietnam", regex: /^\d{2}[A-Z]-\d{3}\.\d{2}$/ },

    // ==================== EUROPE ====================

    { country: "Albania", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Andorra", regex: /^[A-Z]{1,2}\d{4}$/ },
    { country: "Austria", regex: /^[A-Z]{1,2}-[A-Z]{1,2}\s?\d{1,5}$/ },
    { country: "Belgium", regex: /^[A-Z]-?\d{3}-?\d{3}$/ },
    { country: "Bosnia and Herzegovina", regex: /^[A-Z]{1,2}\s?\d{3,4}-[A-Z]{1,2}$/ },
    { country: "Bulgaria", regex: /^[A-Z]{1,2}\s?\d{4}\s?[A-Z]{1,2}$/ },
    { country: "Croatia", regex: /^[A-Z]{2}\s?\d{3,4}-[A-Z]{1,2}$/ },
    { country: "Cyprus", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Czech Republic", regex: /^[A-Z]\d{1,2}\s?\d{4,5}$/ },
    { country: "Denmark", regex: /^[A-Z]{2}\s?\d{1,5}$/ },
    { country: "Estonia", regex: /^\d{3}[A-Z]{3}$/ },
    { country: "Finland", regex: /^[A-Z]{3}-\d{3}$/ },
    { country: "France", regex: /^[A-Z]{2}-\d{3}-[A-Z]{2}$/ },
    { country: "Germany", regex: /^[A-Z]{1,3}(?:-[A-Z]{1,2})?\s?\d{1,4}$/ },
    { country: "Greece", regex: /^[A-Z]{3}-\d{4}$/ },
    { country: "Hungary", regex: /^[A-Z]{3}-[A-Z]{3}\s?\d{3}$/ },
    { country: "Iceland", regex: /^[A-Z]{2}\s?\d{3,4}$/ },
    { country: "Ireland", regex: /^\d{2,3}-[A-Z]{1,2}-\d{1,6}$/ },
    { country: "Italy", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Latvia", regex: /^[A-Z]{2}-\d{1,4}$/ },
    { country: "Liechtenstein", regex: /^[FL]\s?\d{1,5}$/ },
    { country: "Lithuania", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Luxembourg", regex: /^[A-Z]{2}\s?\d{4}$/ },
    { country: "Malta", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Moldova", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Monaco", regex: /^\d{4}\s?[A-Z]$/ },
    { country: "Montenegro", regex: /^[A-Z]{2}\s?\d{3,4}-[A-Z]{1,2}$/ },
    { country: "Netherlands", regex: /^[A-Z0-9]{2,3}-[A-Z0-9]{2,3}-[A-Z0-9]{2,3}$/ },
    { country: "North Macedonia", regex: /^[A-Z]{2}\s?\d{4}-[A-Z]{2}$/ },
    { country: "Norway", regex: /^[A-Z]{2}\s?\d{5}$/ },
    { country: "Poland", regex: /^[A-Z]{1,3}\s?[A-Z0-9]{4,5}$/ },
    {
        country: "Portugal",
        regex: /^(?:[A-Z]{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-\d{2})$/
    },
    { country: "Romania", regex: /^[A-Z]{1,2}\s?\d{2,3}\s?[A-Z]{3}$/ },
    { country: "San Marino", regex: /^[A-Z]{1,2}\s?\d{4}$/ },
    { country: "Serbia", regex: /^[A-Z]{2}\s?\d{3,4}-[A-Z]{2}$/ },
    { country: "Slovakia", regex: /^[A-Z]{2}\s?\d{3}[A-Z]{2}$/ },
    { country: "Slovenia", regex: /^[A-Z]{2}\s?\d{3,4}$/ },
    { country: "Spain", regex: /^\d{4}\s?[A-Z]{3}$/ },
    { country: "Sweden", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Switzerland", regex: /^[A-Z]{1,2}\s?\d{1,6}$/ },
    { country: "Turkey", regex: /^\d{2}\s?[A-Z]{1,3}\s?\d{2,5}$/ },
    { country: "Ukraine", regex: /^[A-Z]{2}\s?\d{4}\s?[A-Z]{2}$/ },
    { country: "United Kingdom", regex: /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/ },

    // ==================== NORTH AMERICA ====================

    { country: "Canada", regex: /^[A-Z0-9]{2,8}$/ },
    { country: "Costa Rica", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Cuba", regex: /^[A-Z]\s?\d{5}$/ },
    { country: "Dominican Republic", regex: /^[A-Z0-9]{2,7}$/ },
    { country: "El Salvador", regex: /^[A-Z]{1,3}-\d{4}$/ },
    { country: "Guatemala", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Honduras", regex: /^[A-Z]{3}\s?\d{3,4}$/ },
    { country: "Jamaica", regex: /^[A-Z]{2,3}\s?\d{4}$/ },
    { country: "Mexico", regex: /^[A-Z0-9]{2,8}$/ },
    { country: "Nicaragua", regex: /^[A-Z]{1,3}\s?\d{4}$/ },
    { country: "Panama", regex: /^[A-Z]{2,3}\s?\d{4}$/ },
    { country: "United States", regex: /^[A-Z0-9]{1,8}$/ },

    // ==================== OCEANIA ====================

    { country: "Australia", regex: /^[A-Z0-9]{2,7}$/ },
    { country: "Fiji", regex: /^[A-Z]{2}\s?\d{3}$/ },
    { country: "New Zealand", regex: /^[A-Z]{1,3}\s?\d{1,4}$/ },
    { country: "Papua New Guinea", regex: /^[A-Z]{2}\s?\d{4}$/ },
    { country: "Samoa", regex: /^[A-Z]{2}\s?\d{3}$/ },
    { country: "Tonga", regex: /^[A-Z]{1,2}\s?\d{3,4}$/ },

    // ==================== SOUTH AMERICA ====================

    { country: "Argentina", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Bolivia", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Brazil", regex: /^[A-Z]{3}-\d[A-Z0-9]\d{2}$/ },
    { country: "Chile", regex: /^[A-Z]{2}\s?\d{2}\s?\d{2}$/ },
    { country: "Colombia", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Ecuador", regex: /^[A-Z]{3}-\d{3,4}$/ },
    { country: "Paraguay", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Peru", regex: /^[A-Z]{3}-\d{3}$/ },
    { country: "Uruguay", regex: /^[A-Z]{3}\s?\d{3,4}$/ },
    { country: "Venezuela", regex: /^[A-Z]{3}\s?\d{3}$/ }
];

// ==================== STATIONS ====================

const stations = [
    {
        id: 1,
        code: "S001",
        district: "Braga",
        municipality: "Braga",
        standardPower: 20,
        fastPower: 100,
        connectorType: "MJG",
        status: "active",
    },
    {
        id: 2,
        code: "S002",
        district: "Porto",
        municipality: "Porto",
        standardPower: 20,
        fastPower: 100,
        connectorType: "DSG",
        status: "under maintenance",
    },
    {
        id: 3,
        code: "S003",
        district: "Coimbra",
        municipality: "Coimbra",
        standardPower: 20,
        fastPower: 100,
        connectorType: "MJG",
        status: "active",
    },
    {
        id: 4,
        code: "S004",
        district: "Lisboa",
        municipality: "Lisboa",
        standardPower: 20,
        fastPower: 100,
        connectorType: "MGS",
        status: "active",
    }
];

const inactiveStations = [];


// ==================== CLIENTS ====================

const clients = [
    {
        id: 1,
        tif: "271747390",
        firstName: "Pedro",
        lastName: "Gomes",
        dob: "1995-07-13",
        phoneNumber: "+351916291322",
        licenceCountry: "Portugal",
        licencePlate: "AA-21-BB",
        points: 7
    },
    {
        id: 2,
        tif: "278934321",
        firstName: "Maria",
        lastName: "Silva",
        dob: "1998-01-15",
        phoneNumber: "+351915439865",
        licenceCountry: "Portugal",
        licencePlate: "GH-45-AC",
        points: 0
    },
];

const inactiveClients = [];


// ==================== TARIFFS ====================

const tariffs = [
    {
        id: 1,
        name: "Normal",
        chargeType: "standard",
        pricePerKwh: 0.35,
        activationFee: 0.50,
    },
    {
        id: 2,
        name: "Premium",
        chargeType: "fast",
        pricePerKwh: 0.65,
        activationFee: 1.00,
    },
];

const inactiveTariffs = [];


// ==================== CHARGES ====================

const charges = [
    {
        id: 1,
        stationCode: "S001",
        clientId: 1,
        startDate: "2026-07-15T16:00",
        endDate: "2026-07-15T17:00",
        duration: 1,
        energy: 20,
        tariffId: 1,
        cost: 7.50,
        status: "invoiced",
    },
    {
        id: 2,
        stationCode: "S003",
        clientId: 1,
        startDate: "2026-03-26T12:00",
        endDate: "2026-03-26T12:00",
        duration: 0,
        energy: 0,
        tariffId: 1,
        cost: 0,
        status: "cancelled",
    },
    {
        id: 3,
        stationCode: "S002",
        clientId: 2,
        startDate: "2026-01-12T10:00",
        endDate: "2026-01-12T11:00",
        duration: 1,
        energy: 100,
        tariffId: 2,
        cost: 66.00,
        status: "terminated",
    },
    {
        id: 4,
        stationCode: "S003",
        clientId: 2,
        startDate: "2026-08-12T14:00",
        endDate: null,
        duration: null,
        energy: null,
        tariffId: 2,
        cost: null,
        status: "in process",
    },
];

const inactiveCharges = [];


// ==================== GENERAL HELPERS ====================

function normalizeValue(value) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}

function normalizeWord(value) {
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
            normalizeValue(validDistrict) ===
            normalizeValue(district)
    );
}

function getValidMunicipality(district, municipality) {
    const validDistrict =
        getValidDistrict(district);

    if (!validDistrict) {
        return undefined;
    }

    const municipalities =
        municipalitiesByDistrict[validDistrict];

    return municipalities.find(
        validMunicipality =>
            normalizeValue(validMunicipality) ===
            normalizeValue(municipality)
    );
}

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


// ==================== LICENCE PLATE HELPERS ====================

function getValidLicenceCountry(country) {

    return licencePlateFormats.find(
        licenceCountry =>
            normalizeValue(licenceCountry.country) === normalizeValue(country)
    );

}

function normalizeLicencePlate(licencePlate) {

    return licencePlate
        .toUpperCase()
        .replace(/\s+/g, "");

}


// ==================== STATIONS ====================

function createStation(
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    code = normalizeWord(code);
    connectorType = connectorType.toUpperCase();

    if (!validateStation(
        "create",
        code,
        district,
        municipality,
        power,
        connectorType,
        status
    )) {
        return;
    }

    const validDistrict =
        getValidDistrict(district);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    const newStation = {
        id: getNextId(stations, inactiveStations),
        code: code,
        district: validDistrict,
        municipality: validMunicipality,
        standardPower: power * 0.20,
        fastPower: power,
        connectorType: connectorType,
        status: validStatus,
    };

    stations.push(newStation);

    console.log(
        `Station created successfully with ID ${newStation.id}.`
    );
}

function showStations() {

    if (stations.length === 0) {
        console.log("There are no stations.");
        return;
    }

    console.log(
        "\nID | Code | District | Municipality | Standard Power | Fast Power | Connector | Status"
    );

    console.log(
        "--------------------------------------------------------------------------------"
    );

    for (const station of stations) {

        console.log(
            `${station.id} | ${station.code} | ${station.district} | ${station.municipality} | ${station.standardPower} kW | ${station.fastPower} kW | ${station.connectorType} | ${station.status}`
        );

    }
}

function updateStation(
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {

    code = code.toUpperCase();
    connectorType = connectorType.toUpperCase();

    if (!validateStation(
        "update",
        code,
        district,
        municipality,
        power,
        connectorType,
        status
    )) {
        return;
    }

    const station = findStationByCode(code);

    const validDistrict =
        getValidDistrict(district);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    station.district = validDistrict;
    station.municipality = validMunicipality;
    station.standardPower = power * 0.20;
    station.fastPower = power;
    station.connectorType = connectorType;
    station.status = validStatus;

    console.log("Station updated successfully.");
}

function removeStation(code) {

    code = code.toUpperCase();

    if (!validateStation(
        "remove",
        code
    )) {
        return;
    }

    const index = stations.findIndex(
        station => station.code === code
    );

    const removedStation = stations.splice(index, 1)[0];

    inactiveStations.push(removedStation);

    console.log(
        `Station ID ${removedStation.id} moved to inactive stations.`
    );
}

function validateStation(
    operation,
    code,
    district,
    municipality,
    power,
    connectorType,
    status
) {
    const station = findStationByCode(code);

    if (operation === "create") {

        if (!/^S\d{3}$/.test(code)) {
            console.log(
                "Code must have the letter S, followed by three digits: e.g. S234"
            );
            return false;
        }

        if (station) {
            console.log(
                "There's already a station with that code."
            );
            return false;
        }

    } else if (operation === "update") {

        if (!station) {
            console.log("Station not found.");
            return false;
        }

    } else if (operation === "remove") {

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

        return true;

    } else {

        console.log("Invalid operation.");
        return false;
    }

    // Shared create/update validation

    if (!getValidDistrict(district)) {
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

    return true;
}

function showStationsMenu() {

    let option;

    do {

        console.log("\n=============== STATIONS ==============");
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
                const municipality = input("Municipality: ");
                const power = Number(input("Power: "));
                const connectorType = input("Connector type: ");
                const status = input("Status: ");

                createStation(
                    code,
                    district,
                    municipality,
                    power,
                    connectorType,
                    status
                );

                break;


            case "3":

                const updateCode = input("Code: ");

                const updateDistrict =
                    input("New district: ");

                const updateMunicipality =
                    input("New municipality: ");

                const updatePower =
                    Number(input("New power: "));

                const updateConnectorType =
                    input("New connector type: ");

                const updateStatus =
                    input("New status: ");

                updateStation(
                    updateCode,
                    updateDistrict,
                    updateMunicipality,
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

// ==================== PHONE HELPERS ====================

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
        console.log(
            "Invalid phone number for the selected country."
        );
        return false;
    }

    return true;
}


// ==================== LICENCE PLATE VALIDATION ====================

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


// ==================== DOB VALIDATION ====================

function validateDob(dob) {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        console.log(
            "Date of birth must have the format YYYY-MM-DD."
        );
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


// ==================== SHOW CLIENTS ====================

function showClients() {

    if (clients.length === 0) {
        console.log("There are no clients.");
        return;
    }

    console.log(
        "\nID | TIF | Name | Date of Birth | Phone | Licence Plate | Points"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const client of clients) {

        console.log(
            `${client.id} | ${client.tif} | ${client.firstName} ${client.lastName} | ${client.dob} | ${client.phoneNumber} | ${client.licenceCountry}: ${client.licencePlate} | ${client.points}`
        );

    }
}


// ==================== CREATE CLIENT ====================

function createClient(
    tif,
    firstName,
    lastName,
    dob,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeValue(tif);

    firstName = normalizeWord(firstName);
    lastName = normalizeWord(lastName);

    dob = dob.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizeValue(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeLicencePlate(licencePlate);

    if (!validateClient(
        "create",
        null,
        tif,
        firstName,
        lastName,
        dob,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const validLicenceCountry =
        getValidLicenceCountry(licenceCountry);

    const newClient = {
        id: getNextId(
            clients,
            inactiveClients
        ),
        tif: tif,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        phoneNumber: phonePrefix + phoneNumber,
        licenceCountry: validLicenceCountry.country,
        licencePlate: licencePlate,
    };

    clients.push(newClient);

    console.log(
        `Client created successfully with ID ${newClient.id}.`
    );
}


// ==================== UPDATE CLIENT ====================

function updateClient(
    id,
    tif,
    firstName,
    lastName,
    dob,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeValue(tif);

    firstName = normalizeWord(firstName);
    lastName = normalizeWord(lastName);

    dob = dob.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizeValue(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeLicencePlate(licencePlate);

    if (!validateClient(
        "update",
        id,
        tif,
        firstName,
        lastName,
        dob,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const client = clients.find(
        client => client.id === id
    );

    const validLicenceCountry =
        getValidLicenceCountry(licenceCountry);

    client.tif = tif;
    client.firstName = firstName;
    client.lastName = lastName;
    client.dob = dob;
    client.phoneNumber = phonePrefix + phoneNumber;
    client.licenceCountry = validLicenceCountry.country;
    client.licencePlate = licencePlate;

    console.log("Client updated successfully.");
}


// ==================== REMOVE CLIENT ====================

function removeClient(id) {

    if (!validateClient(
        "remove",
        id
    )) {
        return;
    }

    const index = clients.findIndex(
        client => client.id === id
    );

    const removedClient = clients.splice(index, 1)[0];

    inactiveClients.push(removedClient);

    console.log(
        `Client ID ${removedClient.id} moved to inactive clients.`
    );
}


// ==================== VALIDATE CLIENT ====================

function validateClient(
    operation,
    id,
    tif,
    firstName,
    lastName,
    dob,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {
    const client = clients.find(
        client => client.id === id
    );

    if (operation === "create") {

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

    } else if (operation === "update") {

        if (!client) {
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

    } else if (operation === "remove") {

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

        return true;

    } else {

        console.log("Invalid operation.");
        return false;
    }

    // Shared create/update validation

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

    if (!validateDob(dob)) {
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

    return true;
}


// ==================== CLIENTS MENU ====================

function showClientsMenu() {

    let option;

    do {

        console.log("\n=============== CLIENTS ==============");
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

                const tif = input("TIF: ");
                const firstName = input("First name: ");
                const lastName = input("Last name: ");
                const dob = input("Date of birth (YYYY-MM-DD): ");

                const phonePrefix =
                    input("Country prefix: ");

                const phoneNumber =
                    input("Phone number: ");

                const licenceCountry =
                    input("Licence plate country: ");

                const licencePlate =
                    input("Licence plate: ");

                createClient(
                    tif,
                    firstName,
                    lastName,
                    dob,
                    phonePrefix,
                    phoneNumber,
                    licenceCountry,
                    licencePlate
                );

                break;


            case "3":

                const updateId =
                    Number(input("Client ID: "));

                const updateTif =
                    input("TIF: ");

                const updateFirstName =
                    input("First name: ");

                const updateLastName =
                    input("Last name: ");

                const updateDob =
                    input("Date of birth (YYYY-MM-DD): ");

                const updatePhonePrefix =
                    input("Country prefix: ");

                const updatePhoneNumber =
                    input("Phone number: ");

                const updateLicenceCountry =
                    input("Licence plate country: ");

                const updateLicencePlate =
                    input("Licence plate: ");

                updateClient(
                    updateId,
                    updateTif,
                    updateFirstName,
                    updateLastName,
                    updateDob,
                    updatePhonePrefix,
                    updatePhoneNumber,
                    updateLicenceCountry,
                    updateLicencePlate
                );

                break;


            case "4":

                const removeId =
                    Number(input("Client ID: "));

                removeClient(removeId);

                break;


            case "0":
                break;


            default:
                console.log("Invalid option.");
        }

    } while (option !== "0");
}


// ==================== TARIFFS ====================

function showTariffs() {

    if (tariffs.length === 0) {
        console.log("There are no tariffs.");
        return;
    }

    console.log("\nID | Name | Charge Type | Price/kWh | Activation fee");

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const tariff of tariffs) {

        console.log(
            `${tariff.id} | ${tariff.name} | ${tariff.chargeType} | ${tariff.pricePerKwh} € | ${tariff.activationFee} €`
        );

    }
}

function createTariff(
    name,
    chargeType,
    pricePerKwh,
    activationFee
) {

    name = normalizeWord(name);

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
        id: getNextId(tariffs, inactiveTariffs),
        name: name,
        chargeType: validChargeType,
        pricePerKwh: pricePerKwh,
        activationFee: activationFee,
    };

    tariffs.push(newTariff);

    console.log(
        `Tariff created successfully with ID ${newTariff.id}.`
    );
}

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

    const tariff = tariffs.find(tariff => tariff.id === id);

    const validChargeType = getValidValue(chargeType, chargeTypes);

    tariff.name = name;
    tariff.chargeType = validChargeType;
    tariff.pricePerKwh = pricePerKwh;
    tariff.activationFee = activationFee;

    console.log("Tariff updated successfully.");
}

function removeTariff(id) {

    if (!validateTariff(
        "remove",
        id
    )) {
        return;
    }

    const index = tariffs.findIndex(
        tariff => tariff.id === id
    );

    const removedTariff = tariffs.splice(index, 1)[0];

    inactiveTariffs.push(removedTariff);

    console.log(
        `Tariff ID ${removedTariff.id} moved to inactive tariffs.`
    );
}

function validateTariff(
    operation,
    id,
    name,
    chargeType,
    pricePerKwh,
    activationFee,
) {

    if (operation === "create") {
        if (tariffs.some(tariff => tariff.name === name)) {
            console.log("There's already a tariff with that name.");
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
            tariff => tariff.id !== id && tariff.name === name)) {
            console.log("There's already a tariff with that name.");
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

    if (!getValidValue(chargeType, chargeTypes)) {
        console.log("Charge type must be 'standard' or 'fast'.");
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

function showTariffsMenu() {

    let option;

    do {

        console.log("\n============== TARIFFS =============");
        console.log("1. Show tariffs");
        console.log("2. Create tariff");
        console.log("3. Update tariff");
        console.log("4. Remove tariff");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showTariffs();
                break;


            case "2":

                const name =
                    input("Tariff name: ");

                const chargeType = input("Charge type (standard/fast): ");

                const pricePerKwh = Number(
                    input("Price per kWh: ")
                        .replace(",", ".")
                );

                const activationFee = Number(
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

                const updateChargeType = input("Charge type (standard/fast): ")

                const updatePricePerKwh = Number(
                    input("Price per kWh: ")
                        .replace(",", ".")
                );

                const updateActivationFee = Number(
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


// ==================== CHARGES ====================

// Function to calculate duration
function calculateDuration(startDate, endDate) {

    if (!endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const durationInHours =
        (end - start) / (1000 * 60 * 60);

    return Number(durationInHours.toFixed(2));
}


// Function to calculate energy
function calculateEnergy(
    stationCode,
    tariffId,
    startDate,
    endDate
) {
    const station = findStationByCode(stationCode);

    if (!station) {
        return null;
    }

    if (!endDate) {
        return null;
    }

    const tariff = tariffs.find(tariff => tariff.id === tariffId);

    if (!tariff) {
        return null;
    }

    const durationInHours = calculateDuration(startDate, endDate);

    const power = tariff.chargeType === "fast" ? station.fastPower : station.standardPower;

    const energy = power * durationInHours;

    return Number(energy.toFixed(2));
}


// Function to calculate cost
function calculateCost(
    energy,
    tariffId,
    power
) {
    if (energy === null) {
        return null;
    }

    const tariff = tariffs.find(
        tariff => tariff.id === tariffId
    );

    if (!tariff) {
        return null;
    }

    const cost =
        (energy * tariff.pricePerKwh * (power / 100)) +
        tariff.activationFee;

    return Number(cost.toFixed(2));
}


// ==================== SHOW CHARGES ====================

function showCharges() {

    if (charges.length === 0) {
        console.log("There are no charges.");
        return;
    }

    console.log(
        "\nID | Station | Client | Start | End | Duration | Energy | Tariff | Cost | Status"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of charges) {

        console.log(
            `${charge.id} | ${charge.stationCode} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.duration} h | ${charge.energy} kWh | ${charge.tariffId} | ${charge.cost} € | ${charge.status}`
        );

    }
}


// ==================== CREATE CHARGE ====================

function createCharge(
    stationCode,
    clientId,
    startDate,
    endDate,
    tariffId,
    status
) {

    stationCode = normalizeWord(stationCode);
    clientId = Number(clientId);
    tariffId = Number(tariffId);

    const validStatus =
        getValidValue(status, chargeStatuses);

    const id =
        getNextId(
            charges,
            inactiveCharges
        );

    // Validate first
    if (!validateCharge(
        "create",
        id,
        stationCode,
        clientId,
        startDate,
        endDate,
        tariffId,
        validStatus
    )) {
        return;
    }

    // Calculate duration
    const duration =
        calculateDuration(
            startDate,
            endDate
        );

    // Calculate energy
    const energy =
        calculateEnergy(
            stationCode,
            tariffId,
            startDate,
            endDate
        );

    const station = findStationByCode(stationCode);
    const tariff = tariffs.find(tariff => tariff.id === tariffId);
    const power = tariff.chargeType === "fast" ? station.fastPower : station.standardPower;

    // Calculate cost
    const cost = validStatus === "cancelled"
        ? 0
        : calculateCost(
            energy,
            tariffId,
            power
        );

    if (validStatus === "invoiced") {
        const client = clients.find(client => client.id === clientId);
        const pointsMultiplier = tariff.chargeType === "fast" ? 2 : 1;
        client.points += Math.floor(cost * pointsMultiplier);
    }

    const newCharge = {
        id: id,
        stationCode: stationCode,
        clientId: clientId,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        energy: energy,
        tariffId: tariffId,
        cost: cost,
        status: validStatus
    };

    charges.push(newCharge);

    console.log(
        `Charge created successfully with ID ${newCharge.id}.`
    );
}


// ==================== UPDATE CHARGE ====================

function updateCharge(
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    tariffId,
    status
) {

    stationCode = normalizeWord(stationCode);

    clientId = Number(clientId);
    tariffId = Number(tariffId);

    const validStatus =
        getValidValue(status, chargeStatuses);

    // Validate first
    if (!validateCharge(
        "update",
        id,
        stationCode,
        clientId,
        startDate,
        endDate,
        tariffId,
        validStatus
    )) {
        return;
    }

    // Recalculate duration
    const duration =
        calculateDuration(
            startDate,
            endDate
        );

    // Recalculate energy
    const energy =
        calculateEnergy(
            stationCode,
            tariffId,
            startDate,
            endDate
        );

    const station = findStationByCode(stationCode);
    const tariff = tariffs.find(tariff => tariff.id === tariffId);
    const power = tariff.chargeType === "fast" ? station.fastPower : station.standardPower;

    // Recalculate cost
    const cost = validStatus === "cancelled"
        ? 0
        : calculateCost(
            energy,
            tariffId,
            power
        );

    const charge = charges.find(
        charge => charge.id === id
    );

    charge.stationCode = stationCode;
    charge.clientId = clientId;
    charge.startDate = startDate;
    charge.endDate = endDate;
    charge.duration = duration;
    charge.energy = energy;
    charge.tariffId = tariffId;
    charge.cost = cost;
    charge.status = validStatus;

    console.log("Charge updated successfully.");
}


// ==================== REMOVE CHARGE ====================

function removeCharge(id) {

    if (!validateCharge(
        "remove",
        id
    )) {
        return;
    }

    const index =
        charges.findIndex(
            charge => charge.id === id
        );

    const removedCharge =
        charges.splice(index, 1)[0];

    inactiveCharges.push(removedCharge);

    console.log(
        `Charge ID ${removedCharge.id} moved to inactive charges.`
    );
}

// ==================== VALIDATE CHARGE ====================

// function to validate date

function validateDate(date) {

    // validates the format

    if (!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/.test(date)) {
        return false;
    }

    // validates if the date exists

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
};

function validateCharge(
    operation,
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    tariffId,
    status
) {
    if (operation === "update") {

        if (!charges.some(
            charge => charge.id === id
        )) {
            console.log("Charge not found.");
            return false;
        }

    } else if (operation === "remove") {

        if (!charges.some(
            charge => charge.id === id
        )) {
            console.log("Charge not found.");
            return false;
        }

        return true;

    } else if (operation !== "create") {

        console.log("Invalid operation.");
        return false;
    }

    // Shared create/update validation

    if (!stations.some(
        station => normalizeWord(station.code) === normalizeWord(stationCode)
    )) {
        console.log("Station not found.");
        return false;
    }

    if (!clients.some(
        client => client.id === clientId
    )) {
        console.log("Client not found.");
        return false;
    }

    if (!validateDate(startDate)) {
        console.log(
            "Invalid start date. Use the format YYYY-MM-DDTHH:MM."
        );
        return false;
    }

    if (!chargeStatuses.includes(status)) {
        console.log("Invalid charge status.");
        return false;
    }

    if (status === "in process") {

        if (endDate !== null) {
            console.log(
                "A charge in process cannot have an end date."
            );
            return false;
        }

    } else {

        if (!validateDate(endDate)) {
            console.log(
                "Invalid end date. Use the format YYYY-MM-DDTHH:MM."
            );
            return false;
        }

        if (new Date(endDate) <= new Date(startDate) && status !== "cancelled") {
            console.log("End date must be after start date.");
            return false;
        }

        if (new Date(endDate).getTime() !== new Date(startDate).getTime() && status === "cancelled") {
            console.log("End date must be the same as start date.");
            return false;
        }
    }

    if (!tariffs.some(
        tariff => tariff.id === tariffId
    )) {
        console.log("Tariff not found.");
        return false;
    }

    if (new Date(startDate) > new Date()) {
        console.log("Start date cannot be in the future.");
        return false;
    }

    return true;
}


// ==================== CHARGES MENU ====================

function showChargeMenu() {

    let option;

    do {

        console.log("\n=============== CHARGES ==============");
        console.log("1. Show charges");
        console.log("2. Create charge");
        console.log("3. Update charge");
        console.log("4. Remove charge");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showCharges();
                break;


            case "2":

                const stationCode =
                    input("Station code: ");

                const clientId =
                    Number(input("Client ID: "));

                const tariffId =
                    Number(input("Tariff ID: "));

                const status =
                    input("Status: ");

                const validStatus =
                    getValidValue(status, chargeStatuses);

                const startDate =
                    input("Start date: ");

                let endDate = null;

                if (validStatus !== "in process") {
                    endDate = input("End date: ");
                };

                createCharge(
                    stationCode,
                    clientId,
                    startDate,
                    endDate,
                    tariffId,
                    status
                );

                break;


            case "3":

                const updateId =
                    Number(input("Charge ID: "));

                const updateStationCode =
                    input("Station code: ");

                const updateClientId =
                    Number(input("Client ID: "));

                const updateTariffId =
                    Number(input("Tariff ID: "));

                const updateStatus =
                    input("Status: ");

                const validUpdateStatus =
                    getValidValue(updateStatus, chargeStatuses);

                const updateStartDate =
                    input("Start date: ");

                let updateEndDate = null;

                if (validUpdateStatus !== "in process") {
                    updateEndDate = input("End date: ");
                };

                updateCharge(
                    updateId,
                    updateStationCode,
                    updateClientId,
                    updateStartDate,
                    updateEndDate,
                    updateTariffId,
                    updateStatus
                );

                break;


            case "4":

                const removeId =
                    Number(input("Charge ID: "));

                removeCharge(removeId);

                break;


            case "0":

                break;


            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
}


// ==================== DASHBOARD ====================

function countChargesByStatus(status) {

    return charges.filter(
        charge => charge.status === status
    ).length;

}


function showChargesByStation() {

    const terminatedCharges =
        charges.filter(
            charge => charge.status === "terminated"
        );

    console.log(
        "\nTerminated charges by station"
    );

    console.log(
        "--------------------------------------"
    );

    console.log(
        "Station | Charges | Average Energy"
    );

    for (const station of stations) {

        const stationCharges =
            terminatedCharges.filter(
                charge => charge.stationCode === station.code
            );

        if (stationCharges.length === 0) {
            continue;
        }

        const totalEnergy =
            stationCharges.reduce(
                (total, charge) => total + charge.energy,
                0
            );

        const averageEnergy =
            totalEnergy / stationCharges.length;

        console.log(
            `${station.code} | ${stationCharges.length} | ${averageEnergy.toFixed(2)} kWh`
        );
    }
}


function showRevenueByTariff() {

    const invoicedCharges =
        charges.filter(
            charge => charge.status === "invoiced"
        );

    console.log(
        "\nInvoiced charges by tariff"
    );

    console.log(
        "--------------------------------------"
    );

    console.log(
        "Plan | Charges | Average Revenue"
    );

    for (const tariff of tariffs) {

        const planCharges =
            invoicedCharges.filter(
                charge => charge.tariffId === tariff.id
            );

        if (planCharges.length === 0) {
            continue;
        }

        const totalRevenue =
            planCharges.reduce(
                (total, charge) => total + charge.cost,
                0
            );

        const averageRevenue =
            totalRevenue / planCharges.length;

        console.log(
            `${tariff.name} | ${planCharges.length} | ${averageRevenue.toFixed(2)} €`
        );
    }
}


function showDashboard() {

    const inProcess =
        countChargesByStatus("in process");

    const terminated =
        countChargesByStatus("terminated");

    console.log(
        "\n========== VOLTGO DASHBOARD =========="
    );

    console.log(
        `\nCharges in process: ${inProcess}`
    );

    console.log(
        `Charges terminated: ${terminated}`
    );

    showChargesByStation();

    showRevenueByTariff();

    console.log(
        "\n======================================="
    );
}

// ==================== MAIN ====================

function showMainMenu() {

    showDashboard();

    let option;

    do {

        console.log("\n=======================================");
        console.log("          VOLTGO MANAGEMENT");
        console.log("=======================================");

        console.log("1. Stations");
        console.log("2. Clients");
        console.log("3. Tariffs");
        console.log("4. Charges");
        console.log("5. Reports");
        console.log("0. Exit");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showStationsMenu();
                break;


            case "2":

                showClientsMenu();
                break;


            case "3":

                showTariffsMenu();
                break;


            case "4":

                showChargeMenu();
                break;

            case "5":

                showReportsMenu();
                break;


            case "0":

                console.log("Exiting VoltGo...");
                break;


            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
}

// ==================== REPORTS ====================

// HELPERS

// function that returns all charges for the selected status

function getChargesByStatus(status) {

    return charges.filter(
        charge => normalizeValue(charge.status) === normalizeValue(status)
    );
}

// function that finds stations by stationCode

function findStationByCode(code) {

    return stations.find(
        station =>
            normalizeWord(station.code) === normalizeWord(code)
    );
};

// function that finds clients by TIF

function findClientByTIF(tif) {
    return clients.find(client => normalizeValue(client.tif) === normalizeValue(tif));
};

//function that calculates age

function calculateAge(dob) {

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


// REPORT FUNCTIONS

// function that finds the charges of a station according to the 
// selected status and generates a report with the charges, total 
// energy consumed and total cost

function reportChargesByStation(stationCode, status) {

    stationCode = stationCode.toUpperCase();

    const reportCharges = getChargesByStatus(status).filter(
        charge => charge.stationCode === stationCode
    );

    if (reportCharges.length === 0) {
        return null;
    }

    let totalEnergy = 0;
    let totalCost = 0;

    for (const charge of reportCharges) {
        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    return {
        stationCode,
        charges: reportCharges,
        totalEnergy,
        totalCost
    };
};

// function that finds the charges of a client according to the 
// selected status and generates a report with the charges, total 
// energy consumed and total cost

function reportChargesByClient(tif, status) {

    const client = findClientByTIF(tif);

    if (!client) {
        return null;
    }

    const reportCharges = getChargesByStatus(status).filter(
        charge => charge.clientId === client.id
    );

    if (reportCharges.length === 0) {
        return null;
    }

    let totalEnergy = 0;
    let totalCost = 0;

    for (const charge of reportCharges) {

        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    return {
        client,
        charges: reportCharges,
        totalEnergy,
        totalCost
    };
};

// function that finds a client by their TIF and generates a report
// with their personal information, number of charges and total energy consumed

function reportClientCharges(tif) {

    const client = findClientByTIF(tif);

    if (!client) {
        return null;
    }

    const clientCharges = charges.filter(
        charge => charge.clientId === client.id
    );

    if (clientCharges.length === 0) {
        return null;
    }

    let totalEnergy = 0;

    for (const charge of clientCharges) {

        totalEnergy += charge.energy;
    }

    totalEnergy = Number(totalEnergy.toFixed(2));

    const age = calculateAge(client.dob);

    return {
        client,
        age,
        numberOfCharges: clientCharges.length,
        totalEnergy
    };
};

// MENU FUNCTIONS

// function that displays the menu for selecting the charge status 
// (terminated or invoiced) to be used in the charges and cost reports

function showStatusReportMenu() {

    let option;

    do {
        console.log("\n===== CHARGE STATUS =====");
        console.log("1. Terminated");
        console.log("2. Invoiced");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":
                return "terminated";

            case "2":
                return "invoiced";

            case "0":
                return null; // porque queremos sair da função toda

            default:
                console.log("Invalid option.");
        }
    } while (option !== "0")
}


// function that displays the charges and cost report by station

function showChargesByStationMenu() {

    const stationCode = input("Station code: ");

    // check if the station exists

    const station = findStationByCode(stationCode);

    if (!station) {
        console.log("Station not found.");
        return;
    }

    // check the status

    const status = showStatusReportMenu();

    if (!status) {
        return;
    }

    const report =
        reportChargesByStation(
            stationCode,
            status
        );

    if (!report) {
        console.log(`No ${status} charges found for this station.`);
        return;
    }

    // display the data 

    console.log("\n===== CHARGES REPORT BY STATION =====");
    console.log(`Station: ${report.stationCode}`);
    console.log("\nID | Client ID | Start | End | Energy | Cost");
    console.log("---------------------------------------------------------------------");

    for (const charge of report.charges) {

        console.log(
            `${charge.id} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`
        );
    }

    console.log("---------------------------------------------------------------------");
    console.log(`Total energy: ${report.totalEnergy.toFixed(2)} kWh`);
    console.log(`Total cost: ${report.totalCost.toFixed(2)} €`);

};

// function that displays the charges and cost report by client

function showChargesByClientMenu() {

    const clientTif = input("Client TIF: ");

    // check if the client exists

    const client = findClientByTIF(clientTif);

    if (!client) {
        console.log("Client not found.");
        return;
    }

    // check the status 

    const status = showStatusReportMenu();

    if (!status) {
        return;
    }

    const report =
        reportChargesByClient(
            clientTif,
            status
        );

    if (!report) {
        console.log(`No ${status} charges found for this client.`);
        return;
    }

    // display the data 

    console.log("\n===== CHARGES REPORT BY CLIENT =====");
    console.log(`Client: ${report.client.firstName} ${report.client.lastName}`);
    console.log(`TIF: ${report.client.tif}`);
    console.log("\nID | Station | Start | End | Energy | Cost");
    console.log("---------------------------------------------------------------------");

    for (const charge of report.charges) {

        console.log(
            `${charge.id} | ${charge.stationCode} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`
        );
    }

    console.log("---------------------------------------------------------------------");
    console.log(`Total energy: ${report.totalEnergy.toFixed(2)} kWh`);
    console.log(`Total cost: ${report.totalCost.toFixed(2)} €`);
};

// function that displays the reports menu and allows the user to choose
// between the charges and cost report and the client report

function showReportsMenu() {

    let option;

    do {

        console.log("\n=========== REPORTS ==========");
        console.log("1. Charges report by station");
        console.log("2. Charges report by client");
        console.log("3. Client report");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1":

                showChargesByStationMenu();

                break;

            case "2":

                showChargesByClientMenu();

                break;

            case "3": {

                const reportTif = input("Client TIF: ");

                // check if the client exists

                const client = findClientByTIF(reportTif);

                if (!client) {
                    console.log("Client not found.");
                    break;
                }

                // check if the client has associated charges

                const report = reportClientCharges(reportTif);

                if (!report) {
                    console.log("This client has no charges.");
                    break;
                }

                console.log("\n===== CLIENT REPORT =====");
                console.log(`Name: ${report.client.firstName} ${report.client.lastName}`);
                console.log(`TIF: ${report.client.tif}`);
                console.log(`Age: ${report.age}`);
                console.log(`Contact: ${report.client.phoneNumber}`);
                console.log(`Licence plate: ${report.client.licencePlate} | ${report.client.licenceCountry}`);
                console.log(`Number of charges: ${report.numberOfCharges}`);
                console.log(`Total energy consumed: ${report.totalEnergy} kWh`);

                break;
            }

            case "0":

                break;

            default:

                console.log("Invalid option.");
        }

    } while (option !== "0");
};

showMainMenu()