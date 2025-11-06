// js/config/payment.js - SISTEMA REAL DE PAGAMENTO
class PaymentConfig {
    constructor() {
        this.config = null;
        this.init();
    }

    init() {
        console.log('💰 INICIANDO SISTEMA DE PAGAMENTO REAL');
        this.loadConfig();
        
        // Verificação rigorosa
        setTimeout(() => {
            if (this.isConfigured()) {
                console.log('🚀 SISTEMA DE PAGAMENTO PRONTO PARA PRODUÇÃO');
            } else {
                console.error('❌ CONFIGURAÇÃO INCOMPLETA - Verifique suas chaves');
            }
        }, 100);
    }

    loadConfig() {
        // ✅ CARREGA CONFIGURAÇÃO GLOBAL
        if (typeof PAYMENT_CONFIG !== 'undefined') {
            this.config = PAYMENT_CONFIG;
            
            // ✅ VERIFICA SE AS CHAVES ESTÃO PREENCHIDAS
            if (this.config.ghostspay.secretKey && this.config.ghostspay.companyId) {
                console.log('✅ CHAVES DE PRODUÇÃO CARREGADAS');
            } else {
                console.error('❌ CHAVES NÃO CONFIGURADAS - Preencha config/config.js');
            }
            return;
        }

        // ❌ CONFIGURAÇÃO NÃO ENCONTRADA
        console.error('❌ ERRO: Configuração de pagamento não carregada');
        this.config = this.getEmptyConfig();
    }

    getEmptyConfig() {
        return {
            ghostspay: {
                secretKey: '',
                companyId: '',
                baseURL: 'https://api.ghostspaysv2.com/functions/v1'
            },
            store: {
                name: 'TechParts',
                successURL: window.location.origin + window.location.pathname + '?payment=success&gateway=ghostspay',
                failureURL: window.location.origin + window.location.pathname + '?payment=failed&gateway=ghostspay'
            },
            payment: {
                currency: 'BRL',
                methods: ['credit_card', 'pix', 'boleto'],
                installments: 12,
                capture: true
            }
        };
    }

    isConfigured() {
        if (!this.config) return false;
        
        const hasSecret = this.config.ghostspay.secretKey && 
                         this.config.ghostspay.secretKey.length > 20 &&
                         this.config.ghostspay.secretKey.startsWith('sk_live');
        
        const hasCompany = this.config.ghostspay.companyId && 
                          this.config.ghostspay.companyId.length > 10;

        return hasSecret && hasCompany;
    }

    validateConfig() {
        return this.isConfigured();
    }

    getConfig() {
        return this.config;
    }

    // ✅ STATUS DO SISTEMA
    getSystemStatus() {
        const configured = this.isConfigured();
        return {
            operational: configured,
            message: configured ? 
                '✅ SISTEMA OPERACIONAL - PRONTO PARA PAGAMENTOS REAIS' :
                '❌ SISTEMA INOPERANTE - Configure as chaves em config/config.js'
        };
    }
}

window.paymentConfig = new PaymentConfig();