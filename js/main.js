// ===== GESTION DU THÈME =====
class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggleBtn.querySelector('i');
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }
    
    init() {
        // Vérifier le thème système ou le localStorage
        const currentTheme = localStorage.getItem('theme') || 
                            (this.prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Appliquer le thème au chargement
        if (currentTheme === 'dark') {
            this.enableDarkMode();
        }
        
        // Écouter le clic sur le bouton de bascule
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }
    
    toggleTheme() {
        const theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }
    
    enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.themeIcon.classList.remove('fa-moon');
        this.themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
    
    disableDarkMode() {
        document.documentElement.removeAttribute('data-theme');
        this.themeIcon.classList.remove('fa-sun');
        this.themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// ===== GESTION DE LA NAVIGATION MOBILE =====
class NavigationManager {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
    }
}

// ===== GESTION DU FORMULAIRE DE CONTACT =====
class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Ici, vous pourriez envoyer les données à un serveur
        console.log('Données du formulaire:', formData);
        
        // Afficher un message de confirmation
        alert('Merci pour votre message! Je vous répondrai dès que possible.');
        
        // Réinitialiser le formulaire
        this.contactForm.reset();
    }
}

// ===== INITIALISATION DES CLASSES =====
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new FormManager();
});