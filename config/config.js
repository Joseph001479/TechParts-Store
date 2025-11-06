// config/config.js - CONFIGURAÇÃO REAL DE PRODUÇÃO
console.log('🔐 CARREGANDO CONFIGURAÇÃO DE PRODUÇÃO...');

const PAYMENT_CONFIG = {
    ghostspay: {
        secretKey: 'sk_live_4rcXnqQ6KL4dJ2lW0gZxh9lCj5tm99kYMCk0i57KocSKGGD4',
        companyId: '43fc8053-d32c-4d37-bf93-33046dd7215b',
        baseURL: 'https://api.ghostspaysv2.com/functions/v1'
    },
    store: {
        name: 'TechParts',
        successURL: 'https://joseph001479.github.io/TechParts-Store/?payment=success&gateway=ghostspay',
        failureURL: 'https://joseph001479.github.io/TechParts-Store/?payment=failed&gateway=ghostspay'
    },
    payment: {
        currency: 'BRL',
        methods: ['credit_card', 'pix', 'boleto'],
        installments: 12,
        capture: true
    }
};

console.log('✅ CONFIGURAÇÃO DE PRODUÇÃO CARREGADA');