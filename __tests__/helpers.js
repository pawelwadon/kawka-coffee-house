// Testy jednostkowe

// Filtrowanie i sumowanie pieczątek
describe('Filtrowanie i sumowanie pieczątek', () => {

    const sampleLogs = [
        { log: { type: 'stamp', count: 1, client: 'Maciek Kawka', activity: 'Dodano 1 pieczątek' } },
        { log: { type: 'stamp', count: 3, client: 'Paweł Wadoń', activity: 'Dodano 3 pieczątek' } },
        { log: { type: 'coupon', count: 1, client: 'Maciek Kawka', activity: 'Zrealizowano kupon' } },
        { log: { type: 'stamp', count: 2, client: 'Michał Kawka', activity: 'Dodano 2 pieczątek' } },
        { log: { type: 'registration', count: 1, client: 'Nowy User', activity: 'Nowy uzytkownik' } },
    ];

    test('poprawnie sumuje pieczątki ze wszystkich wpisów typu stamp', () => {
        const stampsCount = sampleLogs
            .filter((logs) => logs.log.type === 'stamp')
            .reduce((sum, logs) => sum + logs.log.count, 0);
        expect(stampsCount).toBe(6);
    });

    test('poprawnie zlicza kupony', () => {
        const couponsCount = sampleLogs
            .filter((logs) => logs.log.type === 'coupon')
            .length;
        expect(couponsCount).toBe(1);
    });

    test('poprawnie zlicza rejestracje', () => {
        const usersCount = sampleLogs
            .filter((logs) => logs.log.type === 'registration')
            .length;
        expect(usersCount).toBe(1);
    });

    test('zwraca 0 gdy brak wpisów typu stamp', () => {
        const emptyLogs = [
            { log: { type: 'coupon', count: 1 } },
            { log: { type: 'registration', count: 1 } },
        ];
        const stampsCount = emptyLogs
            .filter((logs) => logs.log.type === 'stamp')
            .reduce((sum, logs) => sum + logs.log.count, 0);
        expect(stampsCount).toBe(0);
    });

    test('zwraca 0 dla pustej tablicy', () => {
        const stampsCount = []
            .filter((logs) => logs.log.type === 'stamp')
            .reduce((sum, logs) => sum + logs.log.count, 0);
        expect(stampsCount).toBe(0);
    });
});

// Logika odbioru kuponu
describe('Logika odbioru kuponu', () => {

    const canCollectCoupon = (currentStamps) => currentStamps >= 7;

    test('pozwala odebrać kupon przy 7 pieczątkach', () => {
        expect(canCollectCoupon(7)).toBe(true);
    });

    test('pozwala odebrać kupon przy 8 pieczątkach', () => {
        expect(canCollectCoupon(8)).toBe(true);
    });

    test('pozwala odebrać kupon przy 14 pieczątkach (dwa kupony)', () => {
        expect(canCollectCoupon(14)).toBe(true);
    });

    test('nie pozwala odebrać kuponu przy 6 pieczątkach', () => {
        expect(canCollectCoupon(6)).toBe(false);
    });

    test('nie pozwala odebrać kuponu przy 0 pieczątkach', () => {
        expect(canCollectCoupon(0)).toBe(false);
    });

    test('poprawnie oblicza pieczątki po odebraniu kuponu', () => {
        const currentStamps = 10;
        const afterCoupon = currentStamps - 7;
        expect(afterCoupon).toBe(3);
    });
});

// Data ważności kuponu (+3 miesiące)
describe('Data ważności kuponu', () => {

    test('data ważności jest 3 miesiące od teraz', () => {
        const now = new Date(2026, 3, 17); 
        const expiry = new Date(now);
        expiry.setMonth(expiry.getMonth() + 3);
        expect(expiry.getMonth()).toBe(6); 
        expect(expiry.getDate()).toBe(17);
        expect(expiry.getFullYear()).toBe(2026);
    });

    test('data ważności przechodzi na następny rok (listopad + 3 = luty)', () => {
        const now = new Date(2026, 10, 15); 
        const expiry = new Date(now);
        expiry.setMonth(expiry.getMonth() + 3);
        expect(expiry.getMonth()).toBe(1); 
        expect(expiry.getFullYear()).toBe(2027);
    });

    test('formatowanie daty z zerami wiodącymi', () => {
        const date = new Date(2026, 3, 8); 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formatted = `${day}.${month}.${year}r.`;
        expect(formatted).toBe('08.04.2026r.');
    });

    test('formatowanie daty bez zer wiodących dla dwucyfrowych wartości', () => {
        const date = new Date(2026, 11, 25); 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formatted = `${day}.${month}.${year}r.`;
        expect(formatted).toBe('25.12.2026r.');
    });
});

// Filtrowanie po dacie
describe('Filtrowanie po dacie', () => {

    const today = new Date(2026, 3, 17, 14, 30);
    const yesterday = new Date(2026, 3, 16, 10, 0);
    const lastWeek = new Date(2026, 3, 10, 9, 0);
    const lastMonth = new Date(2026, 2, 5, 12, 0);

    const logs = [
        { log: { type: 'stamp', count: 1, dateOfVisit: { toDate: () => today } } },
        { log: { type: 'stamp', count: 2, dateOfVisit: { toDate: () => yesterday } } },
        { log: { type: 'coupon', count: 1, dateOfVisit: { toDate: () => lastWeek } } },
        { log: { type: 'stamp', count: 1, dateOfVisit: { toDate: () => lastMonth } } },
    ];

    test('filtr "Dzień" — tylko wpisy z dzisiaj', () => {
        const startDate = new Date(2026, 3, 17);
        const filtered = logs.filter((log) => {
            const visitDate = log.log.dateOfVisit.toDate();
            return visitDate >= startDate;
        });
        expect(filtered.length).toBe(1);
        expect(filtered[0].log.count).toBe(1);
    });

    test('filtr "Tydzień" — wpisy z ostatnich 7 dni', () => {
        const startDate = new Date(2026, 3, 17 - 6); 
        const filtered = logs.filter((log) => {
            const visitDate = log.log.dateOfVisit.toDate();
            return visitDate >= startDate;
        });
        expect(filtered.length).toBe(2); 
    });

    test('filtr "Miesiąc" — wpisy z bieżącego miesiąca', () => {
        const startDate = new Date(2026, 3, 1); 
        const filtered = logs.filter((log) => {
            const visitDate = log.log.dateOfVisit.toDate();
            return visitDate >= startDate;
        });
        expect(filtered.length).toBe(3); 
    });

    test('brak filtra — wszystkie wpisy', () => {
        const selected = '';
        const filtered = logs.filter((log) => {
            if (selected === '') return true;
            return false;
        });
        expect(filtered.length).toBe(4);
    });
});

// Filtrowanie użytkowników (wyszukiwarka)
describe('Filtrowanie użytkowników po imieniu/nazwisku', () => {

    const users = [
        { userUID: 'uid1', clientData: { name: 'Maciek', surname: 'Kawka' } },
        { userUID: 'uid2', clientData: { name: 'Paweł', surname: 'Kawka' } },
        { userUID: 'uid3', clientData: { name: 'Michał', surname: 'Kawka' } },
        { userUID: 'uid4', clientData: { name: 'Anna', surname: 'Kowalska' } },
    ];

    const filterUsers = (users, query) => {
        return users.filter((u) =>
            `${u.clientData.name} ${u.clientData.surname}`
                .toLowerCase()
                .includes(query.toLowerCase())
        );
    };

    test('znajduje usera po fragmencie imienia', () => {
        const result = filterUsers(users, 'mac');
        expect(result.length).toBe(1);
        expect(result[0].clientData.name).toBe('Maciek');
    });

    test('znajduje wielu userów po nazwisku', () => {
        const result = filterUsers(users, 'kawka');
        expect(result.length).toBe(3);
    });

    test('wyszukiwanie jest case-insensitive', () => {
        const result = filterUsers(users, 'PAWEŁ');
        expect(result.length).toBe(1);
        expect(result[0].clientData.name).toBe('Paweł');
    });

    test('pusty query zwraca wszystkich', () => {
        const result = filterUsers(users, '');
        expect(result.length).toBe(4);
    });

    test('brak wyników dla nieistniejącego usera', () => {
        const result = filterUsers(users, 'Zbigniew');
        expect(result.length).toBe(0);
    });
});


// Skracanie imienia i nazwiska
describe('Formatowanie imienia klienta', () => {

    const formatClientName = (fullName) => {
        const [name, surname] = fullName.split(' ');
        return `${name} ${surname[0]}.`;
    };

    test('poprawnie skraca imię i nazwisko', () => {
        expect(formatClientName('Maciek Kawka')).toBe('Maciek K.');
    });

    test('działa z długim nazwiskiem', () => {
        expect(formatClientName('Anna Kowalska')).toBe('Anna K.');
    });

    test('działa z krótkim imieniem', () => {
        expect(formatClientName('Jan Nowak')).toBe('Jan N.');
    });
});

// Generowanie tablicy pieczątek
describe('Generowanie tablicy pieczątek', () => {

    const generateStamps = (userStamps, total = 7) => {
        return Array(total).fill(null).map((_, index) => ({
            filled: index < userStamps
        }));
    };

    test('3 pieczątki — 3 wypełnione, 4 puste', () => {
        const stamps = generateStamps(3);
        const filled = stamps.filter(s => s.filled).length;
        const empty = stamps.filter(s => !s.filled).length;
        expect(filled).toBe(3);
        expect(empty).toBe(4);
    });

    test('0 pieczątek — wszystkie puste', () => {
        const stamps = generateStamps(0);
        const filled = stamps.filter(s => s.filled).length;
        expect(filled).toBe(0);
    });

    test('7 pieczątek — wszystkie wypełnione', () => {
        const stamps = generateStamps(7);
        const filled = stamps.filter(s => s.filled).length;
        expect(filled).toBe(7);
    });

    test('tablica ma zawsze 7 elementów', () => {
        expect(generateStamps(0).length).toBe(7);
        expect(generateStamps(3).length).toBe(7);
        expect(generateStamps(7).length).toBe(7);
    });
});