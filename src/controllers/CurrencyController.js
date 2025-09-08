// src/controllers/CurrencyController.js
import CurrencyModel from '../models/CurrencyModel.js';
import CurrencyView from '../views/CurrencyView.js';
import SettingsView from '../views/SettingsView.js';

export default class CurrencyController {
    constructor() {
        this.model = new CurrencyModel();
        this.currencyView = new CurrencyView();
        this.settingsView = new SettingsView();
        this.currentView = 'main'; // 'main' | 'settings'
    }

    // Inicializar la aplicación
    init() {
        this.showMainView();
    }

    // Mostrar vista principal
    showMainView() {
        this.currentView = 'main';
        this.currencyView.renderMainScreen(this.model.getCurrencies());
        this.attachMainEventListeners();
    }

    // Mostrar vista de configuración
    showSettingsView() {
        this.currentView = 'settings';
        this.settingsView.renderSettingsScreen(this.model.getRates());
        this.attachSettingsEventListeners();
    }

    // Event listeners para la vista principal
    attachMainEventListeners() {
        // Botón de configuración
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettingsView();
            });
        }

        // Formulario de conversión
        const form = document.getElementById('converterForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleConversion();
            });
        }

        // Limpiar mensajes cuando se cambian los valores
        const inputs = document.querySelectorAll('#amount, #fromCurrency, #toCurrency');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.currencyView.clearMessages();
            });
        });
    }

    // Event listeners para la vista de configuración
    attachSettingsEventListeners() {
        // Botón de volver
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.showMainView();
            });
        }

        // Botón de guardar
        const saveBtn = document.getElementById('saveRatesBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.handleSaveRates();
            });
        }

        // Botones de eliminar tasa
        this.attachDeleteRateListeners();
    }

    // Agregar event listeners para botones de eliminar
    attachDeleteRateListeners() {
        const deleteButtons = document.querySelectorAll('.delete-rate-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const from = e.target.dataset.from;
                const to = e.target.dataset.to;
                this.handleDeleteRate(from, to);
            });
        });
    }

    // Manejar conversión de divisas
    handleConversion() {
        try {
            const { amount, from, to } = this.currencyView.getFormValues();
            
            // Validar monto
            const validAmount = this.model.validateAmount(amount);
            
            // Realizar conversión
            const convertedAmount = this.model.convert(validAmount, from, to);
            
            // Mostrar resultado
            this.currencyView.showResult(validAmount, from, to, convertedAmount);
            
        } catch (error) {
            this.currencyView.showError(error.message);
        }
    }

    // Manejar guardado de tasas
    handleSaveRates() {
        try {
            const updatedRates = this.settingsView.getUpdatedRates();
            
            // Actualizar modelo con las nuevas tasas
            this.model.rates = updatedRates;
            this.model.currencies = Object.keys(updatedRates);
            this.model.saveRates();
            
            // Mostrar mensaje de éxito
            this.settingsView.showSuccessMessage();
            
        } catch (error) {
            console.error('Error al guardar tasas:', error);
        }
    }

    // Manejar eliminación de tasa
    handleDeleteRate(from, to) {
        if (confirm(`¿Estás seguro de que quieres eliminar la tasa ${from} → ${to}?`)) {
            this.model.deleteRate(from, to);
            
            // Actualizar la vista
            this.settingsView.updateRatesDisplay(this.model.getRates());
            
            // Re-agregar event listeners para los nuevos botones
            this.attachDeleteRateListeners();
        }
    }
}