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

    loadCart() {
        try {
            const saved = localStorage.getItem('techparts_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('❌ Erro ao carregar carrinho:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('techparts_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('❌ Erro ao salvar carrinho:', error);
        }
    }

    cleanupCorruptedCart() {
        try {
            const saved = localStorage.getItem('techparts_cart');
            if (saved) JSON.parse(saved);
        } catch (error) {
            localStorage.removeItem('techparts_cart');
            this.cart = [];
        }
    }

    setupEventListeners() {
        const cartIcon = document.getElementById('cart-icon');
        const cartClose = document.getElementById('cart-close');
        const cartOverlay = document.getElementById('cart-overlay');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (cartIcon) cartIcon.addEventListener('click', () => this.openCart());
        if (cartClose) cartClose.addEventListener('click', () => this.closeCart());
        if (cartOverlay) cartOverlay.addEventListener('click', () => this.closeCart());
        if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.handleRealCheckout());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeCart();
        });
    }

    addToCart(product) {
        console.log('🛒 Adicionando produto REAL:', product.name);
        
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                cartId: Date.now() + Math.random()
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showMessage(`✅ ${product.name} adicionado ao carrinho!`, 'success');
        
        setTimeout(() => this.openCart(), 800);
    }

    removeFromCart(cartId) {
        this.cart = this.cart.filter(item => item.cartId !== cartId);
        this.saveCart();
        this.updateCartUI();
        this.showMessage('🗑️ Produto removido do carrinho', 'info');
    }

    updateQuantity(cartId, change) {
        const item = this.cart.find(item => item.cartId === cartId);
        
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(cartId);
            } else {
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
        this.updateCheckoutButton();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart__count');
        if (!cartCount) return;
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    updateCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        cartItems.innerHTML = '';

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">🎁 Seu carrinho está vazio</div>';
            return;
        }

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item__image">
                <div class="cart-item__details">
                    <div class="cart-item__name">${item.name}</div>
                    <div class="cart-item__price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item__quantity">
                        <button class="quantity-btn" onclick="cartSystem.updateQuantity(${item.cartId}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartSystem.updateQuantity(${item.cartId}, 1)">+</button>
                    </div>
                    <button class="cart-item__remove" onclick="cartSystem.removeFromCart(${item.cartId})">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cart-total');
        if (!cartTotal) return;
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (!checkoutBtn) return;
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (this.cart.length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.6';
            checkoutBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Carrinho Vazio';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
            checkoutBtn.innerHTML = `💳 Finalizar Compra - R$ ${total.toFixed(2)}`;
        }
    }

    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 💰 CHECKOUT REAL - APENAS PAGAMENTOS REAIS
    async handleRealCheckout() {
        console.log('💰 INICIANDO PROCESSO DE PAGAMENTO REAL...');
        
        // 1. VERIFICAÇÃO DE USUÁRIO
        const currentUser = localStorage.getItem('techparts_current_user');
        if (!currentUser) {
            this.showMessage('🔐 Faça login para finalizar a compra', 'error');
            this.closeCart();
            
            // ✅ ABRIR LOGIN AUTOMATICAMENTE
            setTimeout(() => {
                if (window.authSystem) {
                    authSystem.showAuthScreen('login');
                } else if (window.showLoginModal) {
                    showLoginModal();
                } else {
                    // Fallback
                    const loginBtn = document.querySelector('[data-option="login"]');
                    if (loginBtn) loginBtn.click();
                }
            }, 1000);
            return;
        }

        // 2. VERIFICAÇÃO DE CARRINHO
        if (this.cart.length === 0) {
            this.showMessage('🛒 Adicione produtos ao carrinho antes de finalizar', 'error');
            return;
        }

        // 3. 🚀 PROCESSAR PAGAMENTO REAL
        await this.processRealPayment();
    }

    // 🚀 PROCESSAMENTO REAL DE PAGAMENTO
    async processRealPayment() {
        try {
            this.showMessage('🔄 Iniciando transação com Ghosts Pay...', 'info');
            
            const orderData = this.prepareRealOrderData();
            console.log('📦 Dados da transação:', orderData);
            
            const paymentResult = await this.createRealGhostsPayTransaction(orderData);
            
            if (paymentResult.success && paymentResult.payment_url) {
                this.showMessage('✅ Redirecionando para ambiente seguro de pagamento...', 'success');
                
                localStorage.setItem('last_order_total', (orderData.amount / 100).toString());
                localStorage.setItem('last_order_id', orderData.order_id);
                
                setTimeout(() => {
                    window.location.href = paymentResult.payment_url;
                }, 1500);
                
            } else {
                this.showMessage(`❌ Falha na transação: ${paymentResult.message}`, 'error');
            }
            
        } catch (error) {
            console.error('❌ Erro crítico no processamento:', error);
            this.showMessage('❌ Erro no processamento do pagamento', 'error');
        }
    }

    // 🎯 PREPARAR DADOS REAIS DO PEDIDO - SOLUÇÃO ALTERNATIVA
    prepareRealOrderData() {
        const currentUser = JSON.parse(localStorage.getItem('techparts_current_user'));
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // ✅ SOLUÇÃO ALTERNATIVA: BUSCAR DADOS COMPLETOS DO USUÁRIO
        const users = JSON.parse(localStorage.getItem('techparts_users') || '[]');
        const fullUser = users.find(u => u.id === currentUser?.id) || currentUser || {};
        
        console.log('👤 Dados do usuário completo:', fullUser);

        // Obter método de pagamento selecionado
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        const paymentMethod = selectedPayment ? selectedPayment.value : 'PIX';

        return {
            order_id: `TP${Date.now()}`,
            amount: Math.round(total * 100), // Em centavos
            currency: 'BRL',
            paymentMethod: paymentMethod,
            items: this.cart.map(item => ({
                id: item.id.toString(),
                name: item.name,
                price: Math.round(item.price * 100), // Em centavos
                quantity: item.quantity,
                description: `Componente ${item.name} - ${item.category}`
            })),
            customer: {
                name: fullUser.name || "Cliente TechParts",
                email: fullUser.email || "cliente@techparts.com",
                document: fullUser.cpf || "00000000000",
                phone: fullUser.phone || "11999999999",
                address: {
                    street: fullUser.address?.street || "Rua Exemplo",
                    number: fullUser.address?.number || "123",
                    neighborhood: fullUser.address?.neighborhood || "Centro",
                    city: fullUser.address?.city || "São Paulo",
                    state: fullUser.address?.state || "SP",
                    zip_code: fullUser.address?.zip_code || "01001000",
                    country: "BR"
                }
            },
            metadata: {
                store: "TechParts",
                source: "web_store",
                user_id: currentUser?.id || "guest"
            }
        };
    }

    // 🔥 CRIAR TRANSAÇÃO REAL NO GHOSTS PAY V2 - ESTRUTURA CORRIGIDA
    async createRealGhostsPayTransaction(orderData) {
        try {
            const config = window.paymentConfig.getConfig();
            const credentials = btoa(`${config.ghostspay.secretKey}:${config.ghostspay.companyId}`);
            
            // ✅ ESTRUTURA CORRETA CONFORME DOCUMENTAÇÃO GHOSTS PAY
            const transactionData = {
                amount: orderData.amount,
                description: `Pedido ${orderData.order_id} - ${config.store.name}`,
                customer: {
                    name: orderData.customer.name,
                    email: orderData.customer.email,
                    document: orderData.customer.document.replace(/\D/g, ''), // Apenas números
                    phone: orderData.customer.phone.replace(/\D/g, ''), // Apenas números
                    address: orderData.customer.address
                },
                items: orderData.items.map(item => ({
                    title: item.name,
                    unitPrice: item.price,
                    quantity: item.quantity,
                    externalRef: item.id.toString()
                })),
                paymentMethod: orderData.paymentMethod,
                postbackUrl: config.store.successURL,
                metadata: orderData.metadata,
                installments: orderData.paymentMethod === 'CARD' ? 1 : undefined // Apenas para cartão
            };

            // Remover campos undefined
            Object.keys(transactionData).forEach(key => {
                if (transactionData[key] === undefined) {
                    delete transactionData[key];
                }
            });

            console.log('📤 Enviando transação Ghosts Pay V2:', transactionData);

            // ✅ USAR PROXY EXTERNO PARA EVITAR CORS
            const proxyURL = 'https://corsproxy.io/?';
            const apiURL = encodeURIComponent(`${config.ghostspay.baseURL}/transactions`);
            
            const response = await fetch(proxyURL + apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
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
                throw new Error('URL de pagamento não retornada pela API');
            }

        } catch (error) {
            console.error('❌ Erro na transação:', error);
            
            // ✅ TENTATIVA COM OUTRO PROXY
            try {
                const config = window.paymentConfig.getConfig();
                const credentials = btoa(`${config.ghostspay.secretKey}:${config.ghostspay.companyId}`);
                
                const proxyURL2 = 'https://api.allorigins.win/raw?url=';
                const apiURL2 = encodeURIComponent(`${config.ghostspay.baseURL}/transactions`);
                
                const response = await fetch(proxyURL2 + apiURL2, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${credentials}`,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(transactionData)
                });

                const result = await response.json();
                
                if (result.payment_url || result.id) {
                    return {
                        success: true,
                        payment_url: result.payment_url || `https://ghostspay.com/pay/${result.id}`,
                        transaction_id: result.id
                    };
                }
            } catch (secondError) {
                console.error('❌ Erro também no segundo proxy:', secondError);
            }
            
            return {
                success: false,
                message: 'Erro de conexão com o gateway de pagamento. Tente novamente em alguns instantes.'
            };
        }
    }

    // 💬 SISTEMA DE MENSAGENS
    showMessage(message, type = 'info') {
        document.querySelectorAll('.cart-message').forEach(msg => msg.remove());

        const messageEl = document.createElement('div');
        messageEl.className = `cart-message cart-message--${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${this.getMessageIcon(type)}"></i>
            <span>${message}</span>
        `;

        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getMessageColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        `;

        document.body.appendChild(messageEl);

        setTimeout(() => {
            if (messageEl.parentElement) messageEl.remove();
        }, 5000);
    }

    getMessageIcon(type) {
        const icons = { 
            success: 'check-circle', 
            error: 'exclamation-circle', 
            info: 'info-circle' 
        };
        return icons[type] || 'info-circle';
    }

    getMessageColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444', 
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }

    checkPaymentReturn() {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');
        const gateway = urlParams.get('gateway');
        
        if (gateway === 'ghostspay' && paymentStatus === 'success') {
            this.showRealSuccessScreen();
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (gateway === 'ghostspay' && paymentStatus === 'failed') {
            this.showMessage('❌ Pagamento recusado. Tente novamente.', 'error');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // 🎉 TELA DE SUCESSO REAL
    showRealSuccessScreen() {
        const orderId = localStorage.getItem('last_order_id') || `TP${Date.now()}`;
        const total = localStorage.getItem('last_order_total') || '0';
        
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        
        const successHTML = `
            <div class="payment-success-overlay">
                <div class="payment-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Pagamento Aprovado! 🎉</h2>
                    <div class="order-details">
                        <div class="detail-item">
                            <span class="label">Número do Pedido:</span>
                            <span class="value">${orderId}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Total Pago:</span>
                            <span class="value">R$ ${parseFloat(total).toFixed(2)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Status:</span>
                            <span class="status approved">Confirmado</span>
                        </div>
                    </div>
                    <div class="success-message">
                        <i class="fas fa-shield-alt"></i>
                        <p>Seu pagamento foi processado com segurança pelo <strong>Ghosts Pay V2</strong></p>
                    </div>
                    <button class="btn btn--primary" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-shopping-bag"></i>
                        Continuar Comprando
                    </button>
                </div>
            </div>
            <style>
                .payment-success-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 99999;
                    font-family: 'Inter', sans-serif;
                }
                .payment-success {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                    animation: slideInUp 0.5s ease;
                }
                .success-icon {
                    font-size: 4rem;
                    color: #22c55e;
                    margin-bottom: 1rem;
                }
                .payment-success h2 {
                    color: #22c55e;
                    margin-bottom: 2rem;
                    font-size: 2rem;
                }
                .order-details {
                    background: #f8fafc;
                    padding: 2rem;
                    border-radius: 15px;
                    margin-bottom: 2rem;
                    text-align: left;
                }
                .detail-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                .detail-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .label { color: #64748b; font-weight: 500; }
                .value { color: #1e293b; font-weight: 600; }
                .status.approved {
                    background: #d1fae5;
                    color: #065f46;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                .success-message {
                    background: #dbeafe;
                    color: #1e40af;
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 2rem;
                    border-left: 4px solid #3b82f6;
                }
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHTML);
    }
}

// ✅ INICIALIZAÇÃO SEGURA
function initializeCartSystem() {
    try {
        window.cartSystem = new CartSystem();
        console.log('🛒 Sistema de carrinho REAL inicializado!');
        
        // 🔥 DEFINIR FUNÇÕES GLOBAIS IMEDIATAMENTE
        window.addToCart = function(productId, productName, productPrice, productImage, productCategory) {
            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                category: productCategory
            };
            window.cartSystem.addToCart(product);
        };

        window.removeFromCart = function(cartId) { 
            window.cartSystem.removeFromCart(cartId); 
        };
        window.updateQuantity = function(cartId, change) { 
            window.cartSystem.updateQuantity(cartId, change); 
        };
        window.openCart = function() { 
            window.cartSystem.openCart(); 
        };
        window.closeCart = function() { 
            window.cartSystem.closeCart(); 
        };
        window.handleCheckout = function() { 
            window.cartSystem.handleRealCheckout(); 
        };

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
