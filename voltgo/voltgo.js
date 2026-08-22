const input = require("readline-sync").question;

// Data about stations, clients, data plans and charging info

// ==================== DISTRICTS ====================

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
    "Viseu",
    "Açores",
    "Madeira"
];


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


const countryPrefixes = [
    { prefix: "+1", regex: /^\d{10}$/ },
    { prefix: "+7", regex: /^\d{10}$/ },
    { prefix: "+20", regex: /^\d{10}$/ },
    { prefix: "+27", regex: /^\d{9}$/ },
    { prefix: "+30", regex: /^\d{10}$/ },
    { prefix: "+31", regex: /^\d{9}$/ },
    { prefix: "+32", regex: /^\d{8,9}$/ },
    { prefix: "+33", regex: /^\d{9}$/ },
    { prefix: "+34", regex: /^\d{9}$/ },
    { prefix: "+36", regex: /^\d{9}$/ },
    { prefix: "+39", regex: /^\d{9,10}$/ },
    { prefix: "+40", regex: /^\d{9}$/ },
    { prefix: "+41", regex: /^\d{9}$/ },
    { prefix: "+43", regex: /^\d{4,13}$/ },
    { prefix: "+44", regex: /^\d{10}$/ },
    { prefix: "+45", regex: /^\d{8}$/ },
    { prefix: "+46", regex: /^\d{9}$/ },
    { prefix: "+47", regex: /^\d{8}$/ },
    { prefix: "+48", regex: /^\d{9}$/ },
    { prefix: "+49", regex: /^\d{5,11}$/ },
    { prefix: "+51", regex: /^\d{9}$/ },
    { prefix: "+52", regex: /^\d{10}$/ },
    { prefix: "+53", regex: /^\d{8}$/ },
    { prefix: "+54", regex: /^\d{10}$/ },
    { prefix: "+55", regex: /^\d{10,11}$/ },
    { prefix: "+56", regex: /^\d{9}$/ },
    { prefix: "+57", regex: /^\d{10}$/ },
    { prefix: "+58", regex: /^\d{10}$/ },
    { prefix: "+60", regex: /^\d{9,10}$/ },
    { prefix: "+61", regex: /^\d{9}$/ },
    { prefix: "+62", regex: /^\d{9,12}$/ },
    { prefix: "+63", regex: /^\d{10}$/ },
    { prefix: "+64", regex: /^\d{8,10}$/ },
    { prefix: "+65", regex: /^\d{8}$/ },
    { prefix: "+66", regex: /^\d{9}$/ },
    { prefix: "+81", regex: /^\d{9,10}$/ },
    { prefix: "+82", regex: /^\d{9,10}$/ },
    { prefix: "+84", regex: /^\d{9,10}$/ },
    { prefix: "+86", regex: /^\d{11}$/ },
    { prefix: "+90", regex: /^\d{10}$/ },
    { prefix: "+91", regex: /^\d{10}$/ },
    { prefix: "+92", regex: /^\d{10}$/ },
    { prefix: "+93", regex: /^\d{9}$/ },
    { prefix: "+94", regex: /^\d{9}$/ },
    { prefix: "+95", regex: /^\d{8,10}$/ },
    { prefix: "+98", regex: /^\d{10}$/ },

    { prefix: "+211", regex: /^\d{9}$/ },
    { prefix: "+212", regex: /^\d{9}$/ },
    { prefix: "+213", regex: /^\d{9}$/ },
    { prefix: "+216", regex: /^\d{8}$/ },
    { prefix: "+218", regex: /^\d{9}$/ },
    { prefix: "+220", regex: /^\d{7}$/ },
    { prefix: "+221", regex: /^\d{9}$/ },
    { prefix: "+222", regex: /^\d{8}$/ },
    { prefix: "+223", regex: /^\d{8}$/ },
    { prefix: "+224", regex: /^\d{9}$/ },
    { prefix: "+225", regex: /^\d{10}$/ },
    { prefix: "+226", regex: /^\d{8}$/ },
    { prefix: "+227", regex: /^\d{8}$/ },
    { prefix: "+228", regex: /^\d{8}$/ },
    { prefix: "+229", regex: /^\d{8}$/ },
    { prefix: "+230", regex: /^\d{8}$/ },
    { prefix: "+231", regex: /^\d{7,8}$/ },
    { prefix: "+232", regex: /^\d{8}$/ },
    { prefix: "+233", regex: /^\d{9}$/ },
    { prefix: "+234", regex: /^\d{10}$/ },
    { prefix: "+235", regex: /^\d{8}$/ },
    { prefix: "+236", regex: /^\d{8}$/ },
    { prefix: "+237", regex: /^\d{9}$/ },
    { prefix: "+238", regex: /^\d{7}$/ },
    { prefix: "+239", regex: /^\d{7}$/ },
    { prefix: "+240", regex: /^\d{9}$/ },
    { prefix: "+241", regex: /^\d{8}$/ },
    { prefix: "+242", regex: /^\d{9}$/ },
    { prefix: "+243", regex: /^\d{9}$/ },
    { prefix: "+244", regex: /^\d{9}$/ },
    { prefix: "+245", regex: /^\d{7}$/ },
    { prefix: "+248", regex: /^\d{7}$/ },
    { prefix: "+249", regex: /^\d{9}$/ },
    { prefix: "+250", regex: /^\d{9}$/ },
    { prefix: "+251", regex: /^\d{9}$/ },
    { prefix: "+252", regex: /^\d{8,9}$/ },
    { prefix: "+253", regex: /^\d{8}$/ },
    { prefix: "+254", regex: /^\d{9}$/ },
    { prefix: "+255", regex: /^\d{9}$/ },
    { prefix: "+256", regex: /^\d{9}$/ },
    { prefix: "+257", regex: /^\d{8}$/ },
    { prefix: "+258", regex: /^\d{9}$/ },
    { prefix: "+260", regex: /^\d{9}$/ },
    { prefix: "+261", regex: /^\d{9}$/ },
    { prefix: "+263", regex: /^\d{9}$/ },
    { prefix: "+264", regex: /^\d{9}$/ },
    { prefix: "+265", regex: /^\d{9}$/ },
    { prefix: "+266", regex: /^\d{8}$/ },
    { prefix: "+267", regex: /^\d{8}$/ },
    { prefix: "+268", regex: /^\d{8}$/ },
    { prefix: "+269", regex: /^\d{7}$/ },

    { prefix: "+290", regex: /^\d{4}$/ },
    { prefix: "+291", regex: /^\d{7}$/ },
    { prefix: "+297", regex: /^\d{7}$/ },
    { prefix: "+298", regex: /^\d{6}$/ },
    { prefix: "+299", regex: /^\d{6}$/ },

    { prefix: "+350", regex: /^\d{8}$/ },
    { prefix: "+351", regex: /^9\d{8}$/ },
    { prefix: "+352", regex: /^\d{9}$/ },
    { prefix: "+353", regex: /^\d{9}$/ },
    { prefix: "+354", regex: /^\d{7}$/ },
    { prefix: "+355", regex: /^\d{9}$/ },
    { prefix: "+356", regex: /^\d{8}$/ },
    { prefix: "+357", regex: /^\d{8}$/ },
    { prefix: "+358", regex: /^\d{9,10}$/ },
    { prefix: "+359", regex: /^\d{9}$/ },
    { prefix: "+370", regex: /^\d{8}$/ },
    { prefix: "+371", regex: /^\d{8}$/ },
    { prefix: "+372", regex: /^\d{7,8}$/ },
    { prefix: "+373", regex: /^\d{8}$/ },
    { prefix: "+374", regex: /^\d{8}$/ },
    { prefix: "+375", regex: /^\d{9}$/ },
    { prefix: "+376", regex: /^\d{6}$/ },
    { prefix: "+377", regex: /^\d{8,9}$/ },
    { prefix: "+378", regex: /^\d{10}$/ },
    { prefix: "+380", regex: /^\d{9}$/ },
    { prefix: "+381", regex: /^\d{8,9}$/ },
    { prefix: "+382", regex: /^\d{8}$/ },
    { prefix: "+383", regex: /^\d{8}$/ },
    { prefix: "+385", regex: /^\d{8,9}$/ },
    { prefix: "+386", regex: /^\d{8}$/ },
    { prefix: "+387", regex: /^\d{8}$/ },
    { prefix: "+389", regex: /^\d{8}$/ },

    { prefix: "+501", regex: /^\d{7}$/ },
    { prefix: "+502", regex: /^\d{8}$/ },
    { prefix: "+503", regex: /^\d{8}$/ },
    { prefix: "+504", regex: /^\d{8}$/ },
    { prefix: "+505", regex: /^\d{8}$/ },
    { prefix: "+506", regex: /^\d{8}$/ },
    { prefix: "+507", regex: /^\d{7,8}$/ },
    { prefix: "+509", regex: /^\d{8}$/ },

    { prefix: "+591", regex: /^\d{8}$/ },
    { prefix: "+592", regex: /^\d{7}$/ },
    { prefix: "+593", regex: /^\d{9}$/ },
    { prefix: "+594", regex: /^\d{9}$/ },
    { prefix: "+595", regex: /^\d{9}$/ },
    { prefix: "+597", regex: /^\d{7}$/ },
    { prefix: "+598", regex: /^\d{8}$/ },
    { prefix: "+599", regex: /^\d{7,8}$/ },

    { prefix: "+670", regex: /^\d{8}$/ },
    { prefix: "+672", regex: /^\d{6,8}$/ },
    { prefix: "+673", regex: /^\d{7}$/ },
    { prefix: "+674", regex: /^\d{7}$/ },
    { prefix: "+675", regex: /^\d{7}$/ },
    { prefix: "+676", regex: /^\d{7}$/ },
    { prefix: "+677", regex: /^\d{7}$/ },
    { prefix: "+678", regex: /^\d{7}$/ },
    { prefix: "+679", regex: /^\d{7}$/ },
    { prefix: "+680", regex: /^\d{7}$/ },
    { prefix: "+681", regex: /^\d{6}$/ },
    { prefix: "+682", regex: /^\d{5}$/ },
    { prefix: "+683", regex: /^\d{4}$/ },
    { prefix: "+685", regex: /^\d{7}$/ },
    { prefix: "+686", regex: /^\d{8}$/ },
    { prefix: "+687", regex: /^\d{6}$/ },
    { prefix: "+688", regex: /^\d{5,7}$/ },
    { prefix: "+689", regex: /^\d{8}$/ },
    { prefix: "+690", regex: /^\d{4}$/ },
    { prefix: "+691", regex: /^\d{7}$/ },
    { prefix: "+692", regex: /^\d{7}$/ },

    { prefix: "+850", regex: /^\d{8,10}$/ },
    { prefix: "+852", regex: /^\d{8}$/ },
    { prefix: "+853", regex: /^\d{8}$/ },
    { prefix: "+855", regex: /^\d{8,9}$/ },
    { prefix: "+856", regex: /^\d{8,10}$/ },
    { prefix: "+880", regex: /^\d{10}$/ },
    { prefix: "+886", regex: /^\d{9,10}$/ },

    { prefix: "+960", regex: /^\d{7}$/ },
    { prefix: "+961", regex: /^\d{7,8}$/ },
    { prefix: "+962", regex: /^\d{8,9}$/ },
    { prefix: "+963", regex: /^\d{9}$/ },
    { prefix: "+964", regex: /^\d{10}$/ },
    { prefix: "+965", regex: /^\d{8}$/ },
    { prefix: "+966", regex: /^\d{9}$/ },
    { prefix: "+967", regex: /^\d{9}$/ },
    { prefix: "+968", regex: /^\d{8}$/ },
    { prefix: "+970", regex: /^\d{9}$/ },
    { prefix: "+971", regex: /^\d{9}$/ },
    { prefix: "+972", regex: /^\d{9}$/ },
    { prefix: "+973", regex: /^\d{8}$/ },
    { prefix: "+974", regex: /^\d{8}$/ },
    { prefix: "+975", regex: /^\d{8}$/ },
    { prefix: "+976", regex: /^\d{8}$/ },
    { prefix: "+977", regex: /^\d{10}$/ },

    { prefix: "+992", regex: /^\d{9}$/ },
    { prefix: "+993", regex: /^\d{8}$/ },
    { prefix: "+994", regex: /^\d{9}$/ },
    { prefix: "+995", regex: /^\d{9}$/ },
    { prefix: "+996", regex: /^\d{9}$/ },
    { prefix: "+998", regex: /^\d{9}$/ }
];


// ==================== LICENCE PLATES ====================

const licencePlateFormats = [
    { country: "Albania", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Andorra", regex: /^[A-Z]{1,2}\d{4}$/ },
    { country: "Austria", regex: /^[A-Z]{1,2}-[A-Z]{1,2}\s?\d{1,5}$/ },
    { country: "Belgium", regex: /^[A-Z]-?\d{3}-?\d{3}$/ },
    { country: "France", regex: /^[A-Z]{2}-\d{3}-[A-Z]{2}$/ },
    { country: "Germany", regex: /^[A-Z]{1,3}(?:-[A-Z]{1,2})?\s?\d{1,4}$/ },
    { country: "Italy", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Netherlands", regex: /^[A-Z0-9]{2,3}-[A-Z0-9]{2,3}-[A-Z0-9]{2,3}$/ },
    {
        country: "Portugal",
        regex: /^(?:[A-Z]{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-\d{2})$/
    },
    { country: "Spain", regex: /^\d{4}\s?[A-Z]{3}$/ },
    { country: "Switzerland", regex: /^[A-Z]{1,2}\s?\d{1,6}$/ },
    { country: "United Kingdom", regex: /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/ },

    { country: "Canada", regex: /^[A-Z0-9]{2,8}$/ },
    { country: "United States", regex: /^[A-Z0-9]{1,8}$/ },
    { country: "Mexico", regex: /^[A-Z0-9]{2,8}$/ },

    { country: "Argentina", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },
    { country: "Brazil", regex: /^[A-Z]{3}-\d[A-Z0-9]\d{2}$/ },
    { country: "Chile", regex: /^[A-Z]{2}\s?\d{2}\s?\d{2}$/ },
    { country: "Colombia", regex: /^[A-Z]{3}\s?\d{3}$/ },
    { country: "Peru", regex: /^[A-Z]{3}-\d{3}$/ },

    { country: "Algeria", regex: /^\d{5}-\d{3}-\d{2}$/ },
    { country: "Angola", regex: /^(?:LD|LA|AO)-\d{2}-\d{2}-[A-Z]{2}$/ },
    { country: "Egypt", regex: /^[A-Z0-9]{1,8}$/ },
    { country: "Morocco", regex: /^\d{1,5}\s?[A-Z]{1,2}\s?\d{1,2}$/ },
    { country: "Mozambique", regex: /^[A-Z]{2,3}-\d{2}-\d{2}$/ },
    { country: "South Africa", regex: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/ },

    { country: "China", regex: /^[A-Z]\s?[A-Z0-9]{5}$/ },
    { country: "India", regex: /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,3}\s?\d{1,4}$/ },
    { country: "Japan", regex: /^\d{2,3}-\d{2}\s?[A-Z0-9]{1,2}\s?\d{2}$/ },
    { country: "South Korea", regex: /^\d{2,3}[A-Z]\s?\d{4}$/ },

    { country: "Australia", regex: /^[A-Z0-9]{2,7}$/ },
    { country: "New Zealand", regex: /^[A-Z]{1,3}\s?\d{1,4}$/ }
];


// ==================== STATIONS ====================

const stations = [
    {
        id: 1,
        code: "S001",
        district: "Braga",
        municipality: "Braga",
        power: 100,
        connectorType: "MJG",
        status: "active",
    },
    {
        id: 2,
        code: "S002",
        district: "Porto",
        municipality: "Porto",
        power: 150,
        connectorType: "DSG",
        status: "under maintenance",
    },
    {
        id: 3,
        code: "S003",
        district: "Coimbra",
        municipality: "Coimbra",
        power: 75,
        connectorType: "MJG",
        status: "active",
    }
];

const inactiveStations = [];


// ==================== CLIENTS ====================

const clients = [
    {
        id: 1,
        tif: "271747390",
        firstName: "Roberto",
        lastName: "Gomes",
        DOB: "1995-07-13",
        phoneNumber: "+351915439865",
        licenceCountry: "Portugal",
        licencePlate: "AA-21-BB",
    },
    {
        id: 2,
        tif: "278934321",
        firstName: "Caetana",
        lastName: "Silva",
        DOB: "1998-01-15",
        phoneNumber: "+351915439865",
        licenceCountry: "Portugal",
        licencePlate: "AA-21-BB",
    },
];

const inactiveClients = [];


// ==================== DATA PLANS ====================

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

const inactiveDataPlans = [];


// ==================== CHARGES ====================

const charges = [
    {
        id: 1,
        stationCode: "S001",
        clientId: 1,
        startDate: "2026-07-15T16:00",
        endDate: "2026-07-15T17:00",
        duration: 1,
        energy: 100,
        dataPlanId: 1,
        cost: 18.00,
        status: "invoiced",
    },
    {
        id: 2,
        stationCode: "S003",
        clientId: 1,
        startDate: "2026-03-26T12:00",
        endDate: "2026-03-26T14:00",
        duration: 2,
        energy: 150,
        dataPlanId: 1,
        cost: 26.50,
        status: "cancelled",
    },
    {
        id: 3,
        stationCode: "S002",
        clientId: 2,
        startDate: "2026-01-12T10:00",
        endDate: "2026-01-12T11:00",
        duration: 1,
        energy: 150,
        dataPlanId: 2,
        cost: 47.50,
        status: "terminated",
    },
    {
        id: 4,
        stationCode: "S003",
        clientId: 2,
        startDate: "2026-08-12T14:00",
        endDate: "2026-08-12T14:30",
        duration: 0.5,
        energy: 37.5,
        dataPlanId: 2,
        cost: 13.75,
        status: "in process",
    },
];

const inactiveCharges = [];


// ==================== GENERAL HELPERS ====================

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
            normalize(licenceCountry.country) === normalize(country)
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

    code = code.toUpperCase();
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
        getValidValue(district, districts);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    const newStation = {
        id: getNextId(
            stations,
            inactiveStations
        ),
        code: code,
        district: validDistrict,
        municipality: validMunicipality,
        power: power,
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
        "\nID | Code | District | Municipality | Power | Connector | Status"
    );

    console.log(
        "--------------------------------------------------------------------------------"
    );

    for (const station of stations) {

        console.log(
            `${station.id} | ${station.code} | ${station.district} | ${station.municipality} | ${station.power} kW | ${station.connectorType} | ${station.status}`
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

    const station = stations.find(
        station => station.code === code
    );

    const validDistrict =
        getValidValue(district, districts);

    const validMunicipality =
        getValidMunicipality(
            validDistrict,
            municipality
        );

    const validStatus =
        getValidValue(status, stationStatuses);

    station.district = validDistrict;
    station.municipality = validMunicipality;
    station.power = power;
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


// ==================== CLIENTS ====================

function normalizeName(name) {

    return name.charAt(0).toUpperCase() +
        name.slice(1).toLowerCase();

}

function normalizeTIF(tif) {

    return tif
        .trim()
        .replace(/\s+/g, "");

}


// ==================== PHONE HELPERS ====================

function normalizePhonePrefix(phonePrefix) {

    phonePrefix = phonePrefix
        .trim()
        .replace(/\s+/g, "");

    if (!phonePrefix.startsWith("+")) {
        phonePrefix = "+" + phonePrefix;
    }

    return phonePrefix;
}

function normalizePhoneNumber(phoneNumber) {

    return phoneNumber
        .replace(/[\s-]+/g, "");

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


// ==================== SHOW CLIENTS ====================

function showClients() {

    if (clients.length === 0) {
        console.log("There are no clients.");
        return;
    }

    console.log(
        "\nID | TIF | Name | Date of Birth | Phone | Licence Plate"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const client of clients) {

        console.log(
            `${client.id} | ${client.tif} | ${client.firstName} ${client.lastName} | ${client.DOB} | ${client.phoneNumber} | ${client.licenceCountry}: ${client.licencePlate}`
        );

    }
}


// ==================== CREATE CLIENT ====================

function createClient(
    tif,
    firstName,
    lastName,
    DOB,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeTIF(tif);

    firstName = normalizeName(firstName);
    lastName = normalizeName(lastName);

    DOB = DOB.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizePhoneNumber(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeLicencePlate(licencePlate);

    if (!validateClient(
        "create",
        null,
        tif,
        firstName,
        lastName,
        DOB,
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
        DOB: DOB,
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
    DOB,
    phonePrefix,
    phoneNumber,
    licenceCountry,
    licencePlate
) {

    tif = normalizeTIF(tif);

    firstName = normalizeName(firstName);
    lastName = normalizeName(lastName);

    DOB = DOB.replace(/[\/\s]+/g, "-");

    phonePrefix = normalizePhonePrefix(phonePrefix);
    phoneNumber = normalizePhoneNumber(phoneNumber);

    licenceCountry = licenceCountry.trim();

    licencePlate = normalizeLicencePlate(licencePlate);

    const client = clients.find(
        client => client.id === id
    );

    if (!client) {
        console.log("Client not found.");
        return;
    }

    if (!validateClient(
        "update",
        id,
        tif,
        firstName,
        lastName,
        DOB,
        phonePrefix,
        phoneNumber,
        licenceCountry,
        licencePlate
    )) {
        return;
    }

    const validLicenceCountry =
        getValidLicenceCountry(licenceCountry);

    client.tif = tif;
    client.firstName = firstName;
    client.lastName = lastName;
    client.DOB = DOB;
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
                const DOB = input("Date of birth (YYYY-MM-DD): ");

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
                    DOB,
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

                const updateDOB =
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
                    updateDOB,
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


// ==================== DATA PLANS ====================

function showDataPlans() {

    if (dataPlans.length === 0) {
        console.log("There are no data plans.");
        return;
    }

    console.log("\nID | Name | Price/kWh | Activation fee");

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const dataPlan of dataPlans) {

        console.log(
            `${dataPlan.id} | ${dataPlan.name} | ${dataPlan.pricePerKwh} € | ${dataPlan.activationFee} €`
        );

    }
}

function createDataPlan(
    name,
    pricePerKwh,
    activationFee
) {

    name = normalizeName(name);

    if (!validateDataPlan(
        "create",
        null,
        name,
        pricePerKwh,
        activationFee
    )) {
        return;
    }

    const newDataPlan = {
        id: getNextId(
            dataPlans,
            inactiveDataPlans
        ),
        name: name,
        pricePerKwh: pricePerKwh,
        activationFee: activationFee,
    };

    dataPlans.push(newDataPlan);

    console.log(
        `Data plan created successfully with ID ${newDataPlan.id}.`
    );
}

function updateDataPlan(
    id,
    name,
    pricePerKwh,
    activationFee
) {

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

    const dataPlan = dataPlans.find(
        dataPlan => dataPlan.id === id
    );

    dataPlan.name = name;
    dataPlan.pricePerKwh = pricePerKwh;
    dataPlan.activationFee = activationFee;

    console.log("Data plan updated successfully.");
}

function removeDataPlan(id) {

    if (!validateDataPlan(
        "remove",
        id
    )) {
        return;
    }

    const index = dataPlans.findIndex(
        dataPlan => dataPlan.id === id
    );

    const removedDataPlan = dataPlans.splice(index, 1)[0];

    inactiveDataPlans.push(removedDataPlan);

    console.log(
        `Data plan ID ${removedDataPlan.id} moved to inactive data plans.`
    );
}

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

function showDataPlansMenu() {

    let option;

    do {

        console.log("\n============== DATA PLANS =============");
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


// Function to calculate cost
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


// ==================== SHOW CHARGES ====================

function showCharges() {

    if (charges.length === 0) {
        console.log("There are no charges.");
        return;
    }

    console.log(
        "\nID | Station | Client | Start | End | Duration | Energy | Data Plan | Cost | Status"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of charges) {

        console.log(
            `${charge.id} | ${charge.stationCode} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.duration} h | ${charge.energy} kWh | ${charge.dataPlanId} | ${charge.cost} € | ${charge.status}`
        );

    }
}


// ==================== CREATE CHARGE ====================

function createCharge(
    stationCode,
    clientId,
    startDate,
    endDate,
    dataPlanId,
    status
) {

    stationCode = stationCode.toUpperCase();

    clientId = Number(clientId);
    dataPlanId = Number(dataPlanId);

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
        dataPlanId,
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
            startDate,
            endDate
        );

    // Calculate cost
    const cost =
        calculateCost(
            energy,
            dataPlanId
        );

    const newCharge = {
        id: id,
        stationCode: stationCode,
        clientId: clientId,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        energy: energy,
        dataPlanId: dataPlanId,
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
    dataPlanId,
    status
) {

    stationCode = stationCode.toUpperCase();

    clientId = Number(clientId);
    dataPlanId = Number(dataPlanId);

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
        dataPlanId,
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
            startDate,
            endDate
        );

    // Recalculate cost
    const cost =
        calculateCost(
            energy,
            dataPlanId
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
    charge.dataPlanId = dataPlanId;
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

function validateCharge(
    operation,
    id,
    stationCode,
    clientId,
    startDate,
    endDate,
    dataPlanId,
    status
) {

    switch (operation) {

        case "create":

            if (!stations.some(
                station => station.code === stationCode
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

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startDate)) {
                console.log(
                    "Invalid start date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(startDate).getTime()) ||
                new Date(startDate).getFullYear() !== Number(startDate.substring(0, 4)) ||
                new Date(startDate).getMonth() + 1 !== Number(startDate.substring(5, 7)) ||
                new Date(startDate).getDate() !== Number(startDate.substring(8, 10))
            ) {
                console.log("Invalid start date.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(endDate)) {
                console.log(
                    "Invalid end date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(endDate).getTime()) ||
                new Date(endDate).getFullYear() !== Number(endDate.substring(0, 4)) ||
                new Date(endDate).getMonth() + 1 !== Number(endDate.substring(5, 7)) ||
                new Date(endDate).getDate() !== Number(endDate.substring(8, 10))
            ) {
                console.log("Invalid end date.");
                return false;
            }

            if (new Date(endDate) <= new Date(startDate)) {
                console.log(
                    "End date must be after start date."
                );
                return false;
            }

            if (!dataPlans.some(
                dataPlan => dataPlan.id === dataPlanId
            )) {
                console.log("Data plan not found.");
                return false;
            }

            if (!chargeStatuses.includes(status)) {
                console.log("Invalid charge status.");
                return false;
            }

            break;


        case "update":

            if (!charges.some(
                charge => charge.id === id
            )) {
                console.log("Charge not found.");
                return false;
            }

            if (!stations.some(
                station => station.code === stationCode
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

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startDate)) {
                console.log(
                    "Invalid start date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(startDate).getTime()) ||
                new Date(startDate).getFullYear() !== Number(startDate.substring(0, 4)) ||
                new Date(startDate).getMonth() + 1 !== Number(startDate.substring(5, 7)) ||
                new Date(startDate).getDate() !== Number(startDate.substring(8, 10))
            ) {
                console.log("Invalid start date.");
                return false;
            }

            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(endDate)) {
                console.log(
                    "Invalid end date. Use the format YYYY-MM-DDTHH:MM."
                );
                return false;
            }

            if (
                isNaN(new Date(endDate).getTime()) ||
                new Date(endDate).getFullYear() !== Number(endDate.substring(0, 4)) ||
                new Date(endDate).getMonth() + 1 !== Number(endDate.substring(5, 7)) ||
                new Date(endDate).getDate() !== Number(endDate.substring(8, 10))
            ) {
                console.log("Invalid end date.");
                return false;
            }

            if (new Date(endDate) <= new Date(startDate)) {
                console.log(
                    "End date must be after start date."
                );
                return false;
            }

            if (!dataPlans.some(
                dataPlan => dataPlan.id === dataPlanId
            )) {
                console.log("Data plan not found.");
                return false;
            }

            if (!chargeStatuses.includes(status)) {
                console.log("Invalid charge status.");
                return false;
            }

            break;


        case "remove":

            if (!charges.some(
                charge => charge.id === id
            )) {
                console.log("Charge not found.");
                return false;
            }

            break;


        default:

            console.log("Invalid option.");
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

                const startDate =
                    input("Start date (YYYY-MM-DDTHH:MM): ");

                const endDate =
                    input("End date (YYYY-MM-DDTHH:MM): ");

                const dataPlanId =
                    Number(input("Data plan ID: "));

                const status =
                    input("Status: ");

                createCharge(
                    stationCode,
                    clientId,
                    startDate,
                    endDate,
                    dataPlanId,
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

                const updateStartDate =
                    input("Start date (YYYY-MM-DDTHH:MM): ");

                const updateEndDate =
                    input("End date (YYYY-MM-DDTHH:MM): ");

                const updateDataPlanId =
                    Number(input("Data plan ID: "));

                const updateStatus =
                    input("Status: ");

                updateCharge(
                    updateId,
                    updateStationCode,
                    updateClientId,
                    updateStartDate,
                    updateEndDate,
                    updateDataPlanId,
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


function showRevenueByDataPlan() {

    const invoicedCharges =
        charges.filter(
            charge => charge.status === "invoiced"
        );

    console.log(
        "\nInvoiced charges by data plan"
    );

    console.log(
        "--------------------------------------"
    );

    console.log(
        "Plan | Charges | Average Revenue"
    );

    for (const dataPlan of dataPlans) {

        const planCharges =
            invoicedCharges.filter(
                charge => charge.dataPlanId === dataPlan.id
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
            `${dataPlan.name} | ${planCharges.length} | ${averageRevenue.toFixed(2)} €`
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

    showRevenueByDataPlan();

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
        console.log("3. Data Plans");
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

                showDataPlansMenu();
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

// ==================== REPORTS FUNCTIONS ====================

function getChargesByStatus(status) {
    return charges.filter(charge => normalize(charge.status) === normalize(status));
}

function reportChargesByStation(stationCode, status) {
    stationCode = stationCode.toUpperCase();

    const reportCharges = getChargesByStatus(status).filter(
        charge => charge.stationCode === stationCode
    );

    if (reportCharges.length === 0) {
        console.log("No completed charges found for this station.");
        return;
    }

    let totalEnergy = 0;
    let totalCost = 0;

    console.log("\n===== CHARGES REPORT BY STATION =====");
    console.log(`Station: ${stationCode}`);
    console.log(
        "\nID | Client ID | Start | End | Energy | Cost"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of reportCharges) {
        console.log(`${charge.id} | ${charge.clientId} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`);

        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    console.log(
        "---------------------------------------------------------------------"
    );

    console.log(`Total energy: ${totalEnergy.toFixed(2)} kWh`);
    console.log(`Total cost: ${totalCost.toFixed(2)} €`);
}

function reportChargesByClient(tif, status) {
    tif = normalizeTIF(tif);

    const client = clients.find(
        client => client.tif === tif
    );

    if (!client) {
        console.log("Client not found.");
        return;
    }

    const reportCharges = getChargesByStatus(status).filter(
        charge => charge.clientId === client.id
    );

    if (reportCharges.length === 0) {
        console.log("No completed charges found for this client.");
        return;
    }

    let totalEnergy = 0;
    let totalCost = 0;

    console.log("\n===== CHARGES REPORT BY CLIENT =====");
    console.log(`Client: ${client.firstName} ${client.lastName}`);
    console.log(`TIF: ${client.tif}`);

    console.log(
        "\nID | Station | Start | End | Energy | Cost"
    );

    console.log(
        "---------------------------------------------------------------------"
    );

    for (const charge of reportCharges) {
        console.log(`${charge.id} | ${charge.stationCode} | ${charge.startDate} | ${charge.endDate} | ${charge.energy} kWh | ${charge.cost} €`);

        totalEnergy += charge.energy;
        totalCost += charge.cost;
    }

    console.log(
        "---------------------------------------------------------------------"
    );

    console.log(
        `Total energy: ${totalEnergy.toFixed(2)} kWh`
    );

    console.log(
        `Total cost: ${totalCost.toFixed(2)} €`
    );
}

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

function reportClientCharges(tif) {
    tif = normalizeTIF(tif);

    const client = clients.find(
        client => client.tif === tif
    );

    if (!client) {
        console.log("Client not found.");
        return;
    }

    const clientCharges = charges.filter(
        charge => charge.clientId === client.id
    );

    if (clientCharges.length === 0) {
        console.log("This client has no charges.");
        return;
    }

    let totalEnergy = 0;

    for (const charge of clientCharges) {
        totalEnergy += charge.energy;
    }

    totalEnergy = Number(totalEnergy.toFixed(2));

    const age = calculateAge(client.DOB);

    console.log("\n===== CLIENT REPORT =====");
    console.log(`Name: ${client.firstName} ${client.lastName}`);
    console.log(`TIF: ${client.tif}`);
    console.log(`Age: ${age}`);
    console.log(`Contact: ${client.phoneNumber}`);
    console.log(`Licence plate: ${client.licencePlate} | ${client.licenceCountry}`);
    console.log(`Number of charges: ${clientCharges.length}`);
    console.log(`Total energy consumed: ${totalEnergy} kWh`);
}

// ==================== REPORTS MENU ====================

function showReportsMenu() {
    let option;

    do {
        console.log("\n===== REPORTS =====");
        console.log("1. Charges report by station");
        console.log("2. Charges report by client");
        console.log("3. Client report");
        console.log("0. Back");

        option = input("Choose an option: ");

        switch (option) {

            case "1": {
                const stationCode = input("Station code: ");
                const status = input("Status (terminated/invoiced): ");
                reportChargesByStation(stationCode, status);
                break;
            }

            case "2": {
                const clientTif = input("Client TIF: ");
                const status = input("Status (terminated/invoiced): ");
                reportChargesByClient(clientTif, status);
                break;
            }

            case "3": {
                const reportTif = input("Client TIF: ");
                reportClientCharges(reportTif);
                break;
            }

            case "0":
                break;

            default:
                console.log("Invalid option.");
        }
    } while (option !== "0");
}

showMainMenu();