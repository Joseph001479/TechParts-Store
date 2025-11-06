// 💰 CONFIGURAÇÃO DE PAGAMENTO - VERSÃO CORRIGIDA
class PaymentConfig {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        console.log('💰 Iniciando sistema de pagamento...');
        await this.loadConfig();
        
        if (this.validateConfig()) {
            console.log('✅ Sistema de pagamento configurado com SUCESSO');
        } else {
            console.error('❌ FALHA: Sistema de pagamento não configurado');
        }
    }

    async loadConfig() {
        try {
            // ✅ PRIMEIRO: Verifica se já existe config global (script carregou)
            if (typeof PAYMENT_CONFIG !== 'undefined') {
                this.config = PAYMENT_CONFIG;
                console.log('✅ Configuração carregada das variáveis globais');
                return;
            }

            // ✅ SEGUNDO: Não tenta carregar via fetch no GitHub Pages
            // (porque payment-config.js não existe no GitHub)
            console.log('📁 Configuração não encontrada nos scripts carregados');
            throw new Error('Configuração não carregada automaticamente');
            
        } catch (error) {
            console.warn('⚠️ ' + error.message + ', usando fallback');
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

    getConfig() {
        return this.config;
    }

    validateConfig() {
        if (!this.config) {
            console.error('❌ Configuração não carregada');
            return false;
        }
        
        // ✅ Verifica se as chaves estão preenchidas
        const hasValidSecret = this.config.ghostspay.secretKey && 
                              this.config.ghostspay.secretKey !== '' &&
                              this.config.ghostspay.secretKey.length > 10;
        
        const hasValidCompany = this.config.ghostspay.companyId && 
                               this.config.ghostspay.companyId !== '' &&
                               this.config.ghostspay.companyId.length > 5;
        
        if (!hasValidSecret) {
            console.error('❌ ERRO: Secret Key inválida ou vazia');
            return false;
        }
        
        if (!hasValidCompany) {
            console.error('❌ ERRO: Company ID inválido ou vazio');
            return false;
        }

        console.log('✅ Configuração validada com SUCESSO');
        return true;
    }

    // Nova função para verificar status
    getStatus() {
        return {
            configured: this.validateConfig(),
            hasConfig: !!this.config,
            hasSecret: !!(this.config && this.config.ghostspay.secretKey),
            hasCompany: !!(this.config && this.config.ghostspay.companyId)
        };
    }
}

// Instância global
window.paymentConfig = new PaymentConfig();
console.log('💰 Sistema de pagamento inicializado');