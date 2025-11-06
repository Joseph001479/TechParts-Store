const PAYMENT_CONFIG = {
    ghostspay: {
        secretKey: 'sk_live_4rcXnqQ6KL4dJ2lW0gZxh9lCj5tm99kYMCk0i57KocSKGGD4',
        companyId: '43fc8053-d32c-4d37-bf93-33046dd7215b',
        baseURL: 'https://api.ghostspaysv2.com/functions/v1'
    },
    store: {
        name: 'Modalux',
        successURL: 'https://modalux.com.br/?payment=success&gateway=ghostspay',
        failureURL: 'https://modalux.com.br/?payment=failed&gateway=ghostspay',
        postbackURL: 'https://modalux.com.br/webhook/ghostspay'
    },
    payment: {
        currency: 'BRL',
        methods: ['PIX', 'CARD', 'BOLETO'],
        installments: 12,
        capture: true
    }
};