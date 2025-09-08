import './styles/main.scss';
import CurrencyController from './controllers/CurrencyController.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (!app) {
        console.error('Elemento #app no encontrado');
        return;
    }
    
    const currencyController = new CurrencyController();
    currencyController.init();
});