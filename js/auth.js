// Sistema de Autenticação - TechParts
class AuthSystem {
    constructor() {
        this.currentScreen = 'main';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupInputMasks();
        this.checkExistingAuth();
    }

    setupEventListeners() {
        // Botões do menu principal de auth
        document.querySelectorAll('.auth-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.option;
                this.showAuthScreen(option);
            });
        });

        // Botões de voltar
        document.querySelectorAll('.auth-back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const backTo = e.currentTarget.dataset.back;
                this.showAuthScreen(backTo);
            });
        });

        // Link "Esqueci minha senha"
        const forgotPasswordLink = document.getElementById('forgot-password');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAuthScreen('forgot-password');
            });
        }

        // Formulários
        this.setupFormHandlers();
    }

    setupFormHandlers() {
        // Login
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Cadastro
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Recuperação de senha
        const forgotForm = document.getElementById('forgot-password-form');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePasswordRecovery();
            });
        }
    }

    setupInputMasks() {
        // Máscara para CPF
        const cpfInput = document.getElementById('register-cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length <= 11) {
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                }
                
                e.target.value = value;
            });
        }

        // Máscara para telefone
        const phoneInput = document.getElementById('register-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length <= 11) {
                    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
                
                e.target.value = value;
            });
        }
    }

    showAuthScreen(screen) {
        // Esconder todas as telas
        document.querySelectorAll('.auth-screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Esconder menu principal
        const authMainMenu = document.querySelector('.auth-main-menu');
        if (authMainMenu) {
            authMainMenu.style.display = 'none';
        }

        // Mostrar tela específica
        switch(screen) {
            case 'login':
                document.getElementById('login-screen').classList.add('active');
                this.currentScreen = 'login';
                break;
            case 'register':
                document.getElementById('register-screen').classList.add('active');
                this.currentScreen = 'register';
                break;
            case 'forgot-password':
                document.getElementById('forgot-password-screen').classList.add('active');
                this.currentScreen = 'forgot-password';
                break;
            case 'main':
            default:
                if (authMainMenu) {
                    authMainMenu.style.display = 'flex';
                }
                this.currentScreen = 'main';
                break;
        }
    }

    async handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Validação básica
        if (!this.validateEmail(email)) {
            this.showMessage('Por favor, insira um e-mail válido', 'error');
            return;
        }

        if (!password) {
            this.showMessage('Por favor, insira sua senha', 'error');
            return;
        }

        try {
            // Simular requisição de login
            this.showLoading(true);
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Verificar se o usuário existe no localStorage
            const users = JSON.parse(localStorage.getItem('techparts_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Login bem-sucedido
                localStorage.setItem('techparts_current_user', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
                
                this.showMessage('Login realizado com sucesso!', 'success');
                this.updateAuthUI();
                this.closeAuthMenu();
                
                // Redirecionar ou atualizar interface
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                this.showMessage('E-mail ou senha incorretos', 'error');
            }
        } catch (error) {
            this.showMessage('Erro ao fazer login. Tente novamente.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleRegister() {
        const formData = {
            name: document.getElementById('register-name').value,
            cpf: document.getElementById('register-cpf').value,
            phone: document.getElementById('register-phone').value,
            birthdate: document.getElementById('register-birthdate').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value,
            confirmPassword: document.getElementById('register-confirm').value
        };

        // Validações
        if (!this.validateFormData(formData)) {
            return;
        }

        try {
            this.showLoading(true);
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Verificar se o e-mail já existe
            const users = JSON.parse(localStorage.getItem('techparts_users') || '[]');
            const existingUser = users.find(u => u.email === formData.email);
            
            if (existingUser) {
                this.showMessage('Este e-mail já está cadastrado', 'error');
                return;
            }

            // Criar novo usuário
            const newUser = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('techparts_users', JSON.stringify(users));

            // Logar automaticamente
            localStorage.setItem('techparts_current_user', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }));

            this.showMessage('Cadastro realizado com sucesso!', 'success');
            this.updateAuthUI();
            this.closeAuthMenu();
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            this.showMessage('Erro ao realizar cadastro. Tente novamente.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handlePasswordRecovery() {
        const email = document.getElementById('recovery-email').value;

        if (!this.validateEmail(email)) {
            this.showMessage('Por favor, insira um e-mail válido', 'error');
            return;
        }

        try {
            this.showLoading(true);
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simular envio de e-mail
            this.showMessage('Link de recuperação enviado para seu e-mail!', 'success');
            
            // Voltar para o login após 2 segundos
            setTimeout(() => {
                this.showAuthScreen('login');
            }, 2000);

        } catch (error) {
            this.showMessage('Erro ao enviar e-mail de recuperação', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    validateFormData(formData) {
        // Validar nome
        if (!formData.name || formData.name.trim().length < 2) {
            this.showMessage('Por favor, insira seu nome completo', 'error');
            return false;
        }

        // Validar CPF
        if (!this.validateCPF(formData.cpf)) {
            this.showMessage('Por favor, insira um CPF válido', 'error');
            return false;
        }

        // Validar telefone
        if (!this.validatePhone(formData.phone)) {
            this.showMessage('Por favor, insira um telefone válido', 'error');
            return false;
        }

        // Validar data de nascimento
        if (!this.validateBirthdate(formData.birthdate)) {
            this.showMessage('Você deve ter pelo menos 18 anos', 'error');
            return false;
        }

        // Validar e-mail
        if (!this.validateEmail(formData.email)) {
            this.showMessage('Por favor, insira um e-mail válido', 'error');
            return false;
        }

        // Validar senha
        if (formData.password.length < 6) {
            this.showMessage('A senha deve ter pelo menos 6 caracteres', 'error');
            return false;
        }

        // Validar confirmação de senha
        if (formData.password !== formData.confirmPassword) {
            this.showMessage('As senhas não coincidem', 'error');
            return false;
        }

        return true;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateCPF(cpf) {
        const cleanCPF = cpf.replace(/\D/g, '');
        return cleanCPF.length === 11;
    }

    validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 11;
    }

    validateBirthdate(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        // Verificar se já fez aniversário este ano
        const hasHadBirthday = today.getMonth() > birthDate.getMonth() || 
                              (today.getMonth() === birthDate.getMonth() && 
                               today.getDate() >= birthDate.getDate());
        
        return age > 18 || (age === 18 && hasHadBirthday);
    }

    showMessage(message, type = 'info') {
        // Remover mensagens existentes
        this.removeExistingMessages();

        // Criar nova mensagem
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message auth-message--${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${this.getMessageIcon(type)}"></i>
            <span>${message}</span>
            <button class="auth-message-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Adicionar ao formulário atual
        const currentForm = document.querySelector('.auth-screen.active .auth-form');
        if (currentForm) {
            currentForm.prepend(messageEl);
        }

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.remove();
            }
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

    removeExistingMessages() {
        document.querySelectorAll('.auth-message').forEach(msg => msg.remove());
    }

    showLoading(show) {
        const buttons = document.querySelectorAll('.auth-submit');
        buttons.forEach(btn => {
            if (show) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            } else {
                // Restaurar texto original baseado no formulário
                const form = btn.closest('.auth-form');
                if (form.id === 'login-form') {
                    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar na Minha Conta';
                } else if (form.id === 'register-form') {
                    btn.innerHTML = '<i class="fas fa-user-plus"></i> Concluir Cadastro';
                } else if (form.id === 'forgot-password-form') {
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Link de Recuperação';
                }
                btn.disabled = false;
            }
        });
    }

    checkExistingAuth() {
        const currentUser = localStorage.getItem('techparts_current_user');
        if (currentUser) {
            this.updateAuthUI();
        }
    }

    updateAuthUI() {
        const currentUser = localStorage.getItem('techparts_current_user');
        const authSection = document.querySelector('.nav__auth-section');
        const navActions = document.querySelector('.nav__actions');
        
        if (currentUser) {
            const user = JSON.parse(currentUser);
            
            // Remover auth section do menu
            if (authSection) {
                authSection.style.display = 'none';
            }
            
            // Criar ou atualizar usuário logado no header
            let userLogged = document.querySelector('.user-logged');
            
            if (!userLogged) {
                userLogged = document.createElement('div');
                userLogged.className = 'user-logged';
                userLogged.innerHTML = `
                    <div class="user-logged__info">
                        <div class="user-logged__avatar">${this.getUserInitials(user.name)}</div>
                        <div class="user-logged__details">
                            <div class="user-logged__name">${this.truncateName(user.name)}</div>
                            <div class="user-logged__email">${this.truncateEmail(user.email)}</div>
                        </div>
                    </div>
                    <div class="user-logged__menu">
                        <button class="user-logged__toggle">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="user-logged__dropdown">
                            <button class="user-logged__dropdown-item user-logged__dropdown-item--profile" onclick="authSystem.showUserProfile()">
                                <i class="fas fa-user"></i>
                                Meu Perfil
                            </button>
                            <button class="user-logged__dropdown-item user-logged__dropdown-item--logout" onclick="authSystem.handleLogout()">
                                <i class="fas fa-sign-out-alt"></i>
                                Sair
                            </button>
                        </div>
                    </div>
                `;
                
                // Inserir antes dos botões de ação
                if (navActions) {
                    navActions.insertBefore(userLogged, navActions.firstChild);
                }
                
                // Adicionar evento para toggle do dropdown
                const toggleBtn = userLogged.querySelector('.user-logged__toggle');
                const dropdown = userLogged.querySelector('.user-logged__dropdown');
                
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
                
                // Fechar dropdown ao clicar fora
                document.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                });
                
                // Prevenir fechamento ao clicar no dropdown
                dropdown.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            } else {
                // Atualizar informações existentes
                const avatar = userLogged.querySelector('.user-logged__avatar');
                const name = userLogged.querySelector('.user-logged__name');
                const email = userLogged.querySelector('.user-logged__email');
                
                if (avatar) avatar.textContent = this.getUserInitials(user.name);
                if (name) name.textContent = this.truncateName(user.name);
                if (email) email.textContent = this.truncateEmail(user.email);
            }
            
            // Adicionar versão mobile no menu
            this.addMobileUserMenu(user);
            
        } else {
            // Usuário não logado - mostrar auth section
            if (authSection) {
                authSection.style.display = 'flex';
            }
            
            // Remover usuário logado do header
            const userLogged = document.querySelector('.user-logged');
            if (userLogged) {
                userLogged.remove();
            }
            
            // Remover menu mobile
            this.removeMobileUserMenu();
        }
    }

    // Funções auxiliares
    getUserInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }

    truncateName(name) {
        return name.length > 15 ? name.substring(0, 15) + '...' : name;
    }

    truncateEmail(email) {
        return email.length > 20 ? email.substring(0, 20) + '...' : email;
    }

    addMobileUserMenu(user) {
        this.removeMobileUserMenu();
        
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;
        
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'user-logged-mobile';
        mobileMenu.innerHTML = `
            <div class="user-info">
                <div class="user-logged__avatar">${this.getUserInitials(user.name)}</div>
                <div class="user-details">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
            </div>
            <div class="user-actions">
                <button class="btn btn--secondary user-menu-btn" onclick="authSystem.showUserProfile()">
                    <i class="fas fa-user"></i>
                    Meu Perfil
                </button>
                <button class="btn btn--primary user-menu-btn" onclick="authSystem.handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Sair
                </button>
            </div>
        `;
        
        navMenu.appendChild(mobileMenu);
    }

    removeMobileUserMenu() {
        const existingMenu = document.querySelector('.user-logged-mobile');
        if (existingMenu) {
            existingMenu.remove();
        }
    }

    showUserProfile() {
        const currentUser = localStorage.getItem('techparts_current_user');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            alert(`Perfil do Usuário:\n\nNome: ${user.name}\nE-mail: ${user.email}`);
        }
    }

    handleLogout() {
        localStorage.removeItem('techparts_current_user');
        this.showMessage('Logout realizado com sucesso!', 'success');
        this.updateAuthUI();
        this.closeAuthMenu();
        
        // Fechar dropdown se estiver aberto
        const dropdown = document.querySelector('.user-logged__dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    closeAuthMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
}

// Inicializar sistema de autenticação quando a página carregar
let authSystem;

document.addEventListener('DOMContentLoaded', function() {
    authSystem = new AuthSystem();
    
    // Adicionar estilos para as mensagens e usuário logado
    const style = document.createElement('style');
    style.textContent = `
        .auth-message {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            border-radius: var(--radius-md);
            margin-bottom: 1rem;
            position: relative;
            animation: slideIn 0.3s ease-out;
        }
        
        .auth-message--success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        
        .auth-message--error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
        .auth-message--info {
            background: #dbeafe;
            color: #1e40af;
            border: 1px solid #bfdbfe;
        }
        
        .auth-message-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: auto;
            padding: 0.25rem;
            border-radius: var(--radius-sm);
        }
        
        .auth-message-close:hover {
            background: rgba(0,0,0,0.1);
        }
        
        /* Usuário Logado no Header */
        .user-logged {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem 1rem;
            background: var(--bg-gray);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
            transition: var(--transition);
            margin-right: 1rem;
        }

        .user-logged:hover {
            background: var(--bg-white);
            box-shadow: var(--shadow-sm);
        }

        .user-logged__info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .user-logged__avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background: var(--gradient-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            flex-shrink: 0;
        }

        .user-logged__details {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
        }

        .user-logged__name {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-dark);
            white-space: nowrap;
        }

        .user-logged__email {
            font-size: 0.75rem;
            color: var(--text-light);
            white-space: nowrap;
        }

        .user-logged__menu {
            position: relative;
        }

        .user-logged__toggle {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: var(--radius-md);
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .user-logged__toggle:hover {
            background: var(--bg-gray);
            color: var(--text-dark);
        }

        .user-logged__dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--bg-white);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            min-width: 200px;
            z-index: 1001;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: var(--transition);
        }

        .user-logged__dropdown.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .user-logged__dropdown-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.875rem 1rem;
            text-decoration: none;
            color: var(--text-dark);
            transition: var(--transition);
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
            font-size: 0.875rem;
        }

        .user-logged__dropdown-item:first-child {
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }

        .user-logged__dropdown-item:last-child {
            border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        .user-logged__dropdown-item:hover {
            background: var(--bg-gray);
        }

        .user-logged__dropdown-item--profile {
            border-bottom: 1px solid var(--border-color);
        }

        .user-logged__dropdown-item--logout {
            color: var(--error-color);
        }

        .user-logged__dropdown-item--logout:hover {
            background: var(--error-color);
            color: white;
        }

        /* Menu do usuário no mobile */
        .user-logged-mobile {
            display: none;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
            background: var(--bg-gray);
            border-radius: var(--radius-lg);
            margin-top: 1rem;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-white);
            border-radius: var(--radius-md);
        }

        .user-info .user-logged__avatar {
            width: 3rem;
            height: 3rem;
            font-size: 1rem;
        }

        .user-details {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-weight: 600;
            color: var(--text-dark);
            font-size: 1rem;
        }

        .user-email {
            font-size: 0.875rem;
            color: var(--text-light);
        }

        .user-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .user-menu-btn {
            width: 100%;
            justify-content: flex-start;
        }

        /* Esconder user-logged no mobile */
        @media (max-width: 1024px) {
            .user-logged {
                display: none;
            }
            
            .nav__menu.active .user-logged-mobile {
                display: flex;
            }
        }

        /* Ajustes para telas menores */
        @media (max-width: 768px) {
            .user-logged__name {
                font-size: 0.8rem;
            }
            
            .user-logged__email {
                font-size: 0.7rem;
            }
            
            .user-logged__avatar {
                width: 2rem;
                height: 2rem;
                font-size: 0.8rem;
            }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});