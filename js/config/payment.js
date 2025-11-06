// 💰 CONFIGURAÇÃO DE PAGAMENTO - CARREGA CONFIG SEGURA
class PaymentConfig {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            // Tentar carregar configuração externa
            if (typeof PAYMENT_CONFIG !== 'undefined') {
                this.config = PAYMENT_CONFIG;
                console.log('✅ Configuração de pagamento carregada');
                return;
            }

            // Tentar carregar via fetch
            const response = await fetch('../config/payment-config.js');
            if (response.ok) {
                // O script será executado e definirá PAYMENT_CONFIG globalmente
                console.log('✅ Configuração carregada do arquivo externo');
            } else {
                throw new Error('Arquivo de configuração não encontrado');
            }
        } catch (error) {
            console.warn('⚠️ Configuração não encontrada, usando fallback');
            this.config = this.getFallbackConfig();
        }
    }

    getFallbackConfig() {
        return {
            ghostspay: {
                secretKey: '',
                companyId: '',
                baseURL: 'https://api.ghostspaysv2.com/functions/v1'
            },
            store: {
                name: 'TechParts',
                successURL: window.location.href + '?payment=success',
                failureURL: window.location.href + '?payment=failed'
            }
        };
    }

    getConfig() {
        return this.config;
    }

    validateConfig() {
        if (!this.config) return false;
        if (!this.config.ghostspay.secretKey) return false;
        if (!this.config.ghostspay.companyId) return false;
        return true;
    }
}

// Instância global
window.paymentConfig = new PaymentConfig();