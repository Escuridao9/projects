//

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

//

const inactiveCharges = [];

//

const chargeStatuses = [
    "in process",
    "terminated",
    "invoiced",
    "cancelled"
];