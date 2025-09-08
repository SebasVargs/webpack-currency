// src/views/CurrencyView.js
export default class CurrencyView {
    constructor() {
        this.app = document.getElementById('app');
    }

    // Renderizar la pantalla principal
    renderMainScreen(currencies) {
        this.app.innerHTML = `
            <div class="container">
                <header class="header">
                    <h1 class="header__title">Currency Converter</h1>
                    <button class="header__settings-btn" id="settingsBtn">
                        <span class="settings-icon">⚙️</span>
                    </button>
                </header>
                
                <main class="main">
                    <form class="converter-form" id="converterForm">
                        <div class="form-group">
                            <label for="amount" class="form-label">Monto</label>
                            <input 
                                type="number" 
                                id="amount" 
                                class="form-input" 
                                placeholder="Ingresa el monto"
                                min="0"
                                step="any"
                            >
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="fromCurrency" class="form-label">Desde</label>
                                <select id="fromCurrency" class="form-select">
                                    ${this.renderCurrencyOptions(currencies)}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="toCurrency" class="form-label">Hasta</label>
                                <select id="toCurrency" class="form-select">
                                    ${this.renderCurrencyOptions(currencies)}
                                </select>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn--primary">
                            Convertir
                        </button>
                    </form>
                    
                    <div class="result" id="result"></div>
                    <div class="error" id="error"></div>
                </main>
            </div>
        `;
    }

    // Renderizar opciones de monedas para los select
    renderCurrencyOptions(currencies) {
        return currencies.map(currency => 
            `<option value="${currency}">${currency}</option>`
        ).join('');
    }

    // Mostrar resultado de conversión
    showResult(amount, from, to, convertedAmount) {
        const resultElement = document.getElementById('result');
        const errorElement = document.getElementById('error');
        
        errorElement.style.display = 'none';
        resultElement.innerHTML = `
            <div class="result__content">
                <div class="result__amount">${this.formatNumber(amount)} ${from}</div>
                <div class="result__equals">=</div>
                <div class="result__converted">${this.formatNumber(convertedAmount)} ${to}</div>
            </div>
        `;
        resultElement.style.display = 'block';
    }

    // Mostrar error
    showError(message) {
        const errorElement = document.getElementById('error');
        const resultElement = document.getElementById('result');
        
        resultElement.style.display = 'none';
        errorElement.textContent = `⚠️ ${message}`;
        errorElement.style.display = 'block';
    }

    // Limpiar mensajes
    clearMessages() {
        document.getElementById('result').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    }

    // Formatear números con comas
    formatNumber(number) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6
        }).format(number);
    }

    // Obtener valores del formulario
    getFormValues() {
        return {
            amount: document.getElementById('amount').value,
            from: document.getElementById('fromCurrency').value,
            to: document.getElementById('toCurrency').value
        };
    }

    // Limpiar formulario
    clearForm() {
        document.getElementById('amount').value = '';
        this.clearMessages();
    }
}