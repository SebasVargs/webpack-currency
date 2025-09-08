// src/views/SettingsView.js
export default class SettingsView {
    constructor() {
        this.app = document.getElementById('app');
    }

    // Renderizar pantalla de configuración
    renderSettingsScreen(rates) {
        this.app.innerHTML = `
            <div class="container">
                <header class="header">
                    <button class="header__back-btn" id="backBtn">
                        <span class="back-icon">←</span>
                    </button>
                    <h1 class="header__title">Configuración de Tasas</h1>
                </header>
                
                <main class="main">
                    <div class="settings">
                        <div class="rates-list" id="ratesList">
                            ${this.renderRatesList(rates)}
                        </div>
                        
                        <div class="settings__actions">
                            <button class="btn btn--primary" id="saveRatesBtn">
                                Guardar Cambios
                            </button>
                        </div>
                        
                        <div class="success-message" id="successMessage">
                            ✅ Tasas guardadas exitosamente
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    // Renderizar lista de tasas
    renderRatesList(rates) {
        let html = '';
        
        for (const fromCurrency in rates) {
            for (const toCurrency in rates[fromCurrency]) {
                const rate = rates[fromCurrency][toCurrency];
                html += `
                    <div class="rate-item">
                        <div class="rate-item__currencies">
                            ${fromCurrency} → ${toCurrency}
                        </div>
                        <div class="rate-item__controls">
                            <input 
                                type="number" 
                                class="rate-input" 
                                value="${rate}" 
                                step="any"
                                min="0"
                                data-from="${fromCurrency}"
                                data-to="${toCurrency}"
                            >
                            <button 
                                class="btn btn--danger btn--small delete-rate-btn" 
                                data-from="${fromCurrency}"
                                data-to="${toCurrency}">
                                🗑️
                            </button>
                        </div>
                    </div>
                `;
            }
        }
        
        return html || '<div class="no-rates">No hay tasas configuradas</div>';
    }

    // Mostrar mensaje de éxito
    showSuccessMessage() {
        const successElement = document.getElementById('successMessage');
        successElement.style.display = 'block';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }

    // Obtener todas las tasas modificadas del formulario
    getUpdatedRates() {
        const rateInputs = document.querySelectorAll('.rate-input');
        const updatedRates = {};
        
        rateInputs.forEach(input => {
            const from = input.dataset.from;
            const to = input.dataset.to;
            const rate = parseFloat(input.value);
            
            if (!isNaN(rate) && rate > 0) {
                if (!updatedRates[from]) {
                    updatedRates[from] = {};
                }
                updatedRates[from][to] = rate;
            }
        });
        
        return updatedRates;
    }

    // Actualizar la vista de tasas después de eliminar
    updateRatesDisplay(rates) {
        const ratesListElement = document.getElementById('ratesList');
        ratesListElement.innerHTML = this.renderRatesList(rates);
    }
}