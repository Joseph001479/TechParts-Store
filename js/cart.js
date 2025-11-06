// 🛒 SISTEMA DE CARRINHO REAL - TECHPARTS
class CartSystem {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        this.cleanupCorruptedCart();
        this.setupEventListeners();
        this.updateCartUI();
        this.checkPaymentReturn();
        console.log('🛒 Carrinho REAL inicializado:', this.cart.length, 'itens');
    }

    // ... (todo o resto do código do carrinho que você já tem) ...

    // 🔥 FUNÇÃO DE PAGAMENTO GHOSTS PAY V2 CORRIGIDA
    async createRealGhostsPayTransaction(orderData) {
        try {
            const config = window.paymentConfig.getConfig();
            const credentials = btoa(`${config.ghostspay.secretKey}:${config.ghostspay.companyId}`);
            
            // ✅ ESTRUTURA CORRETA GHOSTS PAY V2
            const transactionData = {
                amount: orderData.amount,
                description: `Pedido ${orderData.order_id} - ${config.store.name}`,
                customer: {
                    name: orderData.customer.name,
                    email: orderData.customer.email,
                    document: orderData.customer.document,
                    phone: orderData.customer.phone,
                    address: orderData.customer.address
                },
                items: orderData.items.map(item => ({
                    title: item.name,
                    unitPrice: item.price,
                    quantity: item.quantity,
                    externalRef: item.id.toString()
                })),
                paymentMethod: this.getSelectedPaymentMethod(), // 👈 MÉTODO SELECIONADO
                postbackUrl: config.store.postbackURL,
                metadata: {
                    order_id: orderData.order_id,
                    store: config.store.name,
                    user_id: orderData.customer.user_id
                },
                installments: 1
            };

            console.log('📤 Enviando transação Ghosts Pay V2:', transactionData);

            const response = await fetch(`${config.ghostspay.baseURL}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(transactionData)
            });

            const result = await response.json();
            console.log('📥 Resposta Ghosts Pay:', result);

            if (!response.ok) {
                throw new Error(result.message || `Erro ${response.status}`);
            }

            if (result.payment_url || result.id) {
                return {
                    success: true,
                    payment_url: result.payment_url || `https://ghostspay.com/pay/${result.id}`,
                    transaction_id: result.id
                };
            } else {
                throw new Error('Resposta inválida da API');
            }

        } catch (error) {
            console.error('❌ Erro na transação:', error);
            return {
                success: false,
                message: error.message || 'Erro ao processar pagamento'
            };
        }
    }

    // 🎯 OBTER MÉTODO DE PAGAMENTO SELECIONADO
    getSelectedPaymentMethod() {
        const selected = document.querySelector('input[name="paymentMethod"]:checked');
        return selected ? selected.value : 'PIX';
    }
}

// ✅ INICIALIZAÇÃO GLOBAL CORRIGIDA
function initializeCartSystem() {
    try {
        window.cartSystem = new CartSystem();
        console.log('🛒 Sistema de carrinho REAL inicializado!');
        
        // 🔥 DEFINIR FUNÇÕES GLOBAIS IMEDIATAMENTE
        window.addToCart = (productId, productName, productPrice, productImage, productCategory) => {
            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                category: productCategory
            };
            window.cartSystem.addToCart(product);
        };

        window.removeFromCart = (cartId) => window.cartSystem.removeFromCart(cartId);
        window.updateQuantity = (cartId, change) => window.cartSystem.updateQuantity(cartId, change);
        window.openCart = () => window.cartSystem.openCart();
        window.closeCart = () => window.cartSystem.closeCart();
        window.handleCheckout = () => window.cartSystem.handleRealCheckout();

    } catch (error) {
        console.error('❌ Erro ao inicializar carrinho:', error);
    }
}

// 🚀 INICIALIZAR IMEDIATAMENTE
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCartSystem);
} else {
    initializeCartSystem();
}

console.log('🛒 Sistema de vendas REAL carregado!');