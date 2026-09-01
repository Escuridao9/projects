const municipalitiesByDistrict = {
    "Aveiro": ["Águeda", "Albergaria-a-Velha", "Anadia", "Arouca", "Aveiro", "Castelo de Paiva", "Espinho", "Estarreja", "Ílhavo", "Mealhada", "Murtosa", "Oliveira de Azeméis", "Oliveira do Bairro", "Ovar", "Santa Maria da Feira", "São João da Madeira", "Sever do Vouga", "Vagos", "Vale de Cambra"],
    "Beja": ["Aljustrel", "Almodôvar", "Alvito", "Barrancos", "Beja", "Castro Verde", "Cuba", "Ferreira do Alentejo", "Mértola", "Moura", "Odemira", "Ourique", "Serpa", "Vidigueira"],
    "Braga": ["Amares", "Barcelos", "Braga", "Cabeceiras de Basto", "Celorico de Basto", "Esposende", "Fafe", "Guimarães", "Póvoa de Lanhoso", "Terras de Bouro", "Vieira do Minho", "Vila Nova de Famalicão", "Vila Verde", "Vizela"],
    "Bragança": ["Alfândega da Fé", "Bragança", "Carrazeda de Ansiães", "Freixo de Espada à Cinta", "Macedo de Cavaleiros", "Miranda do Douro", "Mirandela", "Mogadouro", "Torre de Moncorvo", "Vila Flor", "Vimioso", "Vinhais"],
    "Castelo Branco": ["Belmonte", "Castelo Branco", "Covilhã", "Fundão", "Idanha-a-Nova", "Oleiros", "Penamacor", "Proença-a-Nova", "Sertã", "Vila de Rei", "Vila Velha de Ródão"],
    "Coimbra": ["Arganil", "Cantanhede", "Coimbra", "Condeixa-a-Nova", "Figueira da Foz", "Góis", "Lousã", "Mira", "Miranda do Corvo", "Montemor-o-Velho", "Oliveira do Hospital", "Pampilhosa da Serra", "Penacova", "Penela", "Soure", "Tábua", "Vila Nova de Poiares"],
    "Évora": ["Alandroal", "Arraiolos", "Borba", "Estremoz", "Évora", "Montemor-o-Novo", "Mora", "Mourão", "Portel", "Redondo", "Reguengos de Monsaraz", "Vendas Novas", "Viana do Alentejo", "Vila Viçosa"],
    "Faro": ["Albufeira", "Alcoutim", "Aljezur", "Castro Marim", "Faro", "Lagoa", "Lagos", "Loulé", "Monchique", "Olhão", "Portimão", "São Brás de Alportel", "Silves", "Tavira", "Vila do Bispo", "Vila Real de Santo António"],
    "Guarda": ["Aguiar da Beira", "Almeida", "Celorico da Beira", "Figueira de Castelo Rodrigo", "Fornos de Algodres", "Gouveia", "Guarda", "Manteigas", "Mêda", "Pinhel", "Sabugal", "Seia", "Trancoso", "Vila Nova de Foz Côa"],
    "Leiria": ["Alcobaça", "Alvaiázere", "Ansião", "Batalha", "Bombarral", "Caldas da Rainha", "Castanheira de Pêra", "Figueiró dos Vinhos", "Leiria", "Marinha Grande", "Nazaré", "Óbidos", "Pedrógão Grande", "Peniche", "Pombal", "Porto de Mós"],
    "Lisboa": ["Alenquer", "Amadora", "Arruda dos Vinhos", "Azambuja", "Cadaval", "Cascais", "Lisboa", "Loures", "Lourinhã", "Mafra", "Odivelas", "Oeiras", "Sintra", "Sobral de Monte Agraço", "Torres Vedras", "Vila Franca de Xira"],
    "Portalegre": ["Alter do Chão", "Arronches", "Avis", "Campo Maior", "Castelo de Vide", "Crato", "Elvas", "Fronteira", "Gavião", "Marvão", "Monforte", "Nisa", "Ponte de Sor", "Portalegre", "Sousel"],
    "Porto": ["Amarante", "Baião", "Felgueiras", "Gondomar", "Lousada", "Maia", "Marco de Canaveses", "Matosinhos", "Paços de Ferreira", "Paredes", "Penafiel", "Porto", "Póvoa de Varzim", "Santo Tirso", "Trofa", "Valongo", "Vila do Conde", "Vila Nova de Gaia"],
    "Santarém": ["Abrantes", "Alcanena", "Almeirim", "Alpiarça", "Benavente", "Cartaxo", "Chamusca", "Constância", "Coruche", "Entroncamento", "Ferreira do Zêzere", "Golegã", "Mação", "Ourém", "Rio Maior", "Salvaterra de Magos", "Santarém", "Sardoal", "Tomar", "Torres Novas", "Vila Nova da Barquinha"],
    "Setúbal": ["Alcácer do Sal", "Alcochete", "Almada", "Barreiro", "Grândola", "Moita", "Montijo", "Palmela", "Santiago do Cacém", "Seixal", "Sesimbra", "Setúbal", "Sines"],
    "Viana do Castelo": ["Arcos de Valdevez", "Caminha", "Melgaço", "Monção", "Paredes de Coura", "Ponte da Barca", "Ponte de Lima", "Valença", "Viana do Castelo", "Vila Nova de Cerveira"],
    "Vila Real": ["Alijó", "Boticas", "Chaves", "Mesão Frio", "Mondim de Basto", "Montalegre", "Murça", "Peso da Régua", "Ribeira de Pena", "Sabrosa", "Santa Marta de Penaguião", "Valpaços", "Vila Pouca de Aguiar", "Vila Real"],
    "Viseu": ["Armamar", "Carregal do Sal", "Castro Daire", "Cinfães", "Lamego", "Mangualde", "Moimenta da Beira", "Mortágua", "Nelas", "Oliveira de Frades", "Penalva do Castelo", "Penedono", "Resende", "Santa Comba Dão", "São João da Pesqueira", "São Pedro do Sul", "Sátão", "Sernancelhe", "Tabuaço", "Tarouca", "Tondela", "Vila Nova de Paiva", "Viseu", "Vouzela"],
    "Açores": ["Angra do Heroísmo", "Calheta", "Corvo", "Horta", "Lagoa", "Lajes das Flores", "Lajes do Pico", "Madalena", "Nordeste", "Ponta Delgada", "Povoação", "Praia da Vitória", "Ribeira Grande", "Santa Cruz da Graciosa", "Santa Cruz das Flores", "São Roque do Pico", "Velas", "Vila do Porto", "Vila Franca do Campo"],
    "Madeira": ["Calheta", "Câmara de Lobos", "Funchal", "Machico", "Ponta do Sol", "Porto Moniz", "Porto Santo", "Ribeira Brava", "Santa Cruz", "Santana", "São Vicente"]
};

const stationStatuses = ["active", "under maintenance"];
const chargeStatuses = ["in process", "terminated", "invoiced", "cancelled"];
const chargeTypes = ["standard", "fast"];

const countryPrefixes = [
    { prefix: "+1", regex: /^\d{10}$/ }, { prefix: "+7", regex: /^\d{10}$/ }, { prefix: "+20", regex: /^\d{10}$/ },
    { prefix: "+27", regex: /^\d{9}$/ }, { prefix: "+30", regex: /^\d{10}$/ }, { prefix: "+31", regex: /^\d{9}$/ },
    { prefix: "+32", regex: /^\d{8,9}$/ }, { prefix: "+33", regex: /^\d{9}$/ }, { prefix: "+34", regex: /^\d{9}$/ },
    { prefix: "+36", regex: /^\d{9}$/ }, { prefix: "+39", regex: /^\d{9,10}$/ }, { prefix: "+40", regex: /^\d{9}$/ },
    { prefix: "+41", regex: /^\d{9}$/ }, { prefix: "+43", regex: /^\d{4,13}$/ }, { prefix: "+44", regex: /^\d{10}$/ },
    { prefix: "+45", regex: /^\d{8}$/ }, { prefix: "+46", regex: /^\d{9}$/ }, { prefix: "+47", regex: /^\d{8}$/ },
    { prefix: "+48", regex: /^\d{9}$/ }, { prefix: "+49", regex: /^\d{5,11}$/ }, { prefix: "+51", regex: /^\d{9}$/ },
    { prefix: "+52", regex: /^\d{10}$/ }, { prefix: "+53", regex: /^\d{8}$/ }, { prefix: "+54", regex: /^\d{10}$/ },
    { prefix: "+55", regex: /^\d{10,11}$/ }, { prefix: "+56", regex: /^\d{9}$/ }, { prefix: "+57", regex: /^\d{10}$/ },
    { prefix: "+58", regex: /^\d{10}$/ }, { prefix: "+60", regex: /^\d{9,10}$/ }, { prefix: "+61", regex: /^\d{9}$/ },
    { prefix: "+62", regex: /^\d{9,12}$/ }, { prefix: "+63", regex: /^\d{10}$/ }, { prefix: "+64", regex: /^\d{8,10}$/ },
    { prefix: "+65", regex: /^\d{8}$/ }, { prefix: "+66", regex: /^\d{9}$/ }, { prefix: "+81", regex: /^\d{9,10}$/ },
    { prefix: "+82", regex: /^\d{9,10}$/ }, { prefix: "+84", regex: /^\d{9,10}$/ }, { prefix: "+86", regex: /^\d{11}$/ },
    { prefix: "+90", regex: /^\d{10}$/ }, { prefix: "+91", regex: /^\d{10}$/ }, { prefix: "+92", regex: /^\d{10}$/ },
    { prefix: "+93", regex: /^\d{9}$/ }, { prefix: "+94", regex: /^\d{9}$/ }, { prefix: "+95", regex: /^\d{8,10}$/ },
    { prefix: "+98", regex: /^\d{10}$/ }, { prefix: "+351", regex: /^9\d{8}$/ }
];

const licencePlateFormats = [
    { country: "Algeria", regex: /^\d{5}-\d{3}-\d{2}$/ },
    { country: "Angola", regex: /^(?:LD|LA|AO)-\d{2}-\d{2}-[A-Z]{2}$/ },
    { country: "France", regex: /^[A-Z]{2}-\d{3}-[A-Z]{2}$/ },
    { country: "Germany", regex: /^[A-Z]{1,3}(?:-[A-Z]{1,2})?\s?\d{1,4}$/ },
    { country: "Spain", regex: /^\d{4}\s?[A-Z]{3}$/ },
    { country: "Portugal", regex: /^(?:[A-Z]{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-\d{2})$/ },
    { country: "United Kingdom", regex: /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/ },
    { country: "United States", regex: /^[A-Z0-9]{1,8}$/ }
];

module.exports = {
    municipalitiesByDistrict,
    stationStatuses,
    chargeStatuses,
    chargeTypes,
    countryPrefixes,
    licencePlateFormats
};