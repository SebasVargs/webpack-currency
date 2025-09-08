// src/models/CurrencyModel.js
export default class CurrencyModel {
    constructor() {
        this.rates = this.loadRates();
        this.currencies = Object.keys(this.rates);
    }

    // Cargar tasas iniciales o desde localStorage
    loadRates() {
        const savedRates = localStorage.getItem('currencyRates');
        if (savedRates) {
            return JSON.parse(savedRates);
        }
        
        // Tasas predeterminadas
        return {
            "USD": { "EUR": 0.9, "COP": 4000 },
            "EUR": { "USD": 1.1, "COP": 4500 },
            "COP": { "USD": 0.00025, "EUR": 0.00022 }
        };
    }

    // Guardar tasas en localStorage
    saveRates() {
        localStorage.setItem('currencyRates', JSON.stringify(this.rates));
    }

    // Obtener todas las monedas disponibles
    getCurrencies() {
        return this.currencies;
    }

    // Obtener todas las tasas
    getRates() {
        return this.rates;
    }

    // Obtener tasa específica entre dos monedas
    getRate(from, to) {
        if (from === to) return 1;
        if (this.rates[from] && this.rates[from][to]) {
            return this.rates[from][to];
        }
        return null;
    }

    // Actualizar una tasa específica
    updateRate(from, to, rate) {
        if (!this.rates[from]) {
            this.rates[from] = {};
        }
        this.rates[from][to] = parseFloat(rate);
        this.saveRates();
    }

    // Eliminar una tasa específica
    deleteRate(from, to) {
        if (this.rates[from] && this.rates[from][to]) {
            delete this.rates[from][to];
            // Si no quedan tasas para esta moneda, eliminar la moneda
            if (Object.keys(this.rates[from]).length === 0) {
                delete this.rates[from];
                this.currencies = Object.keys(this.rates);
            }
            this.saveRates();
        }
    }

    // Convertir monto entre dos monedas
    convert(amount, from, to) {
        if (from === to) {
            throw new Error('La moneda de origen y destino no pueden ser iguales');
        }

        const rate = this.getRate(from, to);
        if (rate === null) {
            throw new Error(`No se encontró tasa de cambio de ${from} a ${to}`);
        }

        return amount * rate;
    }

    // Validar monto
    validateAmount(amount) {
        const num = parseFloat(amount);
        if (isNaN(num) || num < 0) {
            throw new Error('El monto debe ser un número positivo');
        }
        if (amount === '' || amount === null || amount === undefined) {
            throw new Error('El monto no puede estar vacío');
        }
        return num;
    }
}