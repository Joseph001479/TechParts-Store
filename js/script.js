// ===== DADOS DOS PRODUTOS =====
const productsData = [
    // PROCESSADORES
    {
        id: 1,
        name: "Intel Core i9-14900K",
        price: 3299.99,
        category: "processadores",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
        description: "24 núcleos, 32 threads, até 6.0GHz"
    },
    {
        id: 2,
        name: "AMD Ryzen 9 7950X",
        price: 2899.99,
        category: "processadores",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
        description: "16 núcleos, 32 threads, 5.7GHz"
    },
    {
        id: 3,
        name: "Intel Core i7-14700K",
        price: 2199.99,
        category: "processadores",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
        description: "20 núcleos, 28 threads, 5.6GHz"
    },
    {
        id: 4,
        name: "AMD Ryzen 7 7800X3D",
        price: 2499.99,
        category: "processadores",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
        description: "8 núcleos, 16 threads, tecnologia 3D-V-Cache"
    },

    // PLACAS DE VÍDEO
    {
        id: 5,
        name: "NVIDIA RTX 4090",
        price: 8999.99,
        category: "placas-video",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
        description: "24GB GDDR6X, DLSS 3, Ray Tracing"
    },
    {
        id: 6,
        name: "AMD RX 7900 XTX",
        price: 5499.99,
        category: "placas-video",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
        description: "24GB GDDR6, FSR 3, Ray Accelerators"
    },
    {
        id: 7,
        name: "NVIDIA RTX 4070 Ti",
        price: 4299.99,
        category: "placas-video",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
        description: "12GB GDDR6X, DLSS 3, 4K Gaming"
    },
    {
        id: 8,
        name: "AMD RX 7800 XT",
        price: 3499.99,
        category: "placas-video",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
        description: "16GB GDDR6, FSR 3, 1440p Ultra"
    },

    // MEMÓRIAS
    {
        id: 9,
        name: "Corsair Vengeance RGB 32GB",
        price: 699.99,
        category: "memorias",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
        description: "DDR5 6000MHz, CL36, RGB Sync"
    },
    {
        id: 10,
        name: "G.Skill Trident Z5 64GB",
        price: 1299.99,
        category: "memorias",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
        description: "DDR5 6400MHz, CL32, 2x32GB"
    },
    {
        id: 11,
        name: "Kingston Fury Beast 16GB",
        price: 399.99,
        category: "memorias",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
        description: "DDR5 5600MHz, CL40, Plug & Play"
    },
    {
        id: 12,
        name: "Team Group Delta RGB 32GB",
        price: 599.99,
        category: "memorias",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
        description: "DDR5 6000MHz, CL38, ARGB Lighting"
    },

    // ARMAZENAMENTO
    {
        id: 13,
        name: "Samsung 990 Pro 2TB",
        price: 899.99,
        category: "armazenamento",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
        description: "NVMe PCIe 4.0, 7450MB/s leitura"
    },
    {
        id: 14,
        name: "WD Black SN850X 4TB",
        price: 1499.99,
        category: "armazenamento",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
        description: "NVMe PCIe 4.0, 7300MB/s, heatsink"
    },
    {
        id: 15,
        name: "Crucial P5 Plus 1TB",
        price: 499.99,
        category: "armazenamento",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
        description: "NVMe PCIe 4.0, 6600MB/s leitura"
    },
    {
        id: 16,
        name: "Seagate FireCuda 530 2TB",
        price: 999.99,
        category: "armazenamento",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
        description: "NVMe PCIe 4.0, 7300MB/s, 5-year warranty"
    }
];

// ===== SISTEMA DE PRODUTOS =====
function displayProducts(products = productsData) {
    const grid = document.getElementById('products-grid');
    
    if (!grid) {
        console.error('❌ Elemento products-grid não encontrado!');
        return;
    }

    grid.innerHTML = '';

    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products">🔍 Nenhum produto encontrado</div>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-card__category">${product.category}</div>
            <img src="${product.image}" alt="${product.name}" class="product-card__image" loading="lazy">
            <h3 class="product-card__title">${product.name}</h3>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__price">R$ ${product.price.toFixed(2)}</div>
            <div class="product-card__actions">
                <button class="btn btn--primary add-to-cart" 
                        onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}', '${product.category}')">
                    <i class="fas fa-shopping-cart"></i>
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        grid.appendChild(productCard);
    });
    
    console.log('📦 Produtos exibidos:', products.length);
}

// ===== FILTROS POR CATEGORIA =====
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category__btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active no clicado
            this.classList.add('active');
            
            const category = this.dataset.category;
            console.log('🎯 Filtrando por categoria:', category);
            
            if (category === 'all') {
                displayProducts();
            } else {
                const filteredProducts = productsData.filter(
                    product => product.category === category
                );
                displayProducts(filteredProducts);
            }
        });
    });
}

// ===== SISTEMA DE PESQUISA =====
function setupSearch() {
    const searchIcon = document.querySelector('.nav__search');
    const searchContainer = document.getElementById('search-container');
    
    if (!searchIcon || !searchContainer) {
        console.error('❌ Elementos de pesquisa não encontrados');
        return;
    }

    let isSearchOpen = false;

    // Abrir/fechar pesquisa
    searchIcon.addEventListener('click', function() {
        if (!isSearchOpen) {
            searchContainer.classList.add('active');
            document.getElementById('search-input').focus();
            isSearchOpen = true;
            console.log('🔍 Pesquisa aberta');
        } else {
            closeSearch();
        }
    });

    // Fechar pesquisa
    function closeSearch() {
        searchContainer.classList.remove('active');
        document.getElementById('search-input').value = '';
        displayProducts(); // Mostra todos os produtos novamente
        isSearchOpen = false;
        console.log('🔍 Pesquisa fechada');
    }

    // Fechar com botão X
    const searchClose = document.getElementById('search-close');
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    // Pesquisar em tempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm.length === 0) {
                displayProducts();
                return;
            }

            const filteredProducts = productsData.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );

            console.log('🔍 Resultados da pesquisa:', filteredProducts.length, 'produtos');
            displayProducts(filteredProducts);
        });
    }

    // Fechar pesquisa ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSearchOpen) {
            closeSearch();
        }
    });
}

// ===== MENU MOBILE =====
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            console.log('📱 Menu mobile:', navMenu.classList.contains('active') ? 'aberto' : 'fechado');
        });
    }
}

// ===== SCROLL SUAVE =====
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para o header fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== ANIMAÇÃO DE REVEAL =====
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.product-card, .feature, .stat, .about__content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error-color)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
            }
        });
    });
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Remove notificações existentes
    document.querySelectorAll('.notification').forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Estilos para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    return colors[type] || '#3b82f6';
}

// ===== LOADING E ESTADOS =====
function showLoading(show, element = null) {
    if (show) {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando...</p>
            </div>
        `;
        
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-family: 'Inter', sans-serif;
        `;
        
        document.body.appendChild(loading);
    } else {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.remove();
        }
    }
}

// ===== INICIALIZAÇÃO COMPLETA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando TechParts Store...');
    
    // Inicializar todos os sistemas
    displayProducts();
    setupCategoryFilters();
    setupSearch();
    setupMobileMenu();
    setupSmoothScroll();
    setupHeaderScroll();
    setupScrollReveal();
    setupFormValidation();
    
    // Verificar se o sistema de carrinho está carregado
    if (typeof cartSystem !== 'undefined') {
        console.log('✅ Sistema de carrinho carregado');
    } else {
        console.error('❌ Sistema de carrinho não encontrado');
    }
    
    // Verificar se o sistema de autenticação está carregado
    if (typeof authSystem !== 'undefined') {
        console.log('✅ Sistema de autenticação carregado');
    } else {
        console.error('❌ Sistema de autenticação não encontrado');
    }
    
    console.log('✅ Loja inicializada com sucesso!');
    console.log('📊 Estatísticas:');
    console.log('   - Produtos:', productsData.length);
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showNotification('🛍️ Bem-vindo à TechParts!', 'info');
    }, 1000);
});

// ===== FUNÇÕES GLOBAIS =====
window.displayProducts = displayProducts;
window.showNotification = showNotification;
window.showLoading = showLoading;

// ===== TRATAMENTO DE ERROS GLOBAL =====
window.addEventListener('error', function(e) {
    console.error('❌ Erro global:', e.error);
    showNotification('Ocorreu um erro inesperado. Recarregue a página.', 'error');
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', function() {
    showNotification('✅ Conexão restaurada', 'success');
});

window.addEventListener('offline', function() {
    showNotification('⚠️ Você está offline', 'warning');
});

console.log('📦 Sistema principal carregado e pronto!');