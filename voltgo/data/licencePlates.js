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