// 🔧 CONFIG.EXAMPLE.JS - MODELO PARA CONFIGURAÇÃO
// COPIE ESTE ARQUIVO PARA config/payment-config.js E PREENCHA SUAS CHAVES

const PAYMENT_CONFIG_EXAMPLE = {
    // 🔐 GHOSTS PAY V2 - ADICIONE SUAS CHAVES AQUI
    ghostspay: {
        secretKey: 'SUA_SECRET_KEY_AQUI',
        companyId: 'SEU_COMPANY_ID_AQUI',
        baseURL: 'https://api.ghostspaysv2.com/functions/v1'
    },
    
    // 🌐 URLS DA SUA LOJA
    store: {
        name: 'TechParts',
        successURL: window.location.href + '?payment=success&gateway=ghostspay',
        failureURL: window.location.href + '?payment=failed&gateway=ghostspay'
    },
    
    // 💰 CONFIGURAÇÕES DE PAGAMENTO
    payment: {
        currency: 'BRL',
        methods: ['credit_card', 'pix', 'boleto'],
        installments: 12
    }
};

// INSTRUÇÕES:
// 1. Copie este arquivo para config/payment-config.js
// 2. Preencha com suas chaves reais
// 3. NUNCA comite payment-config.js no Git