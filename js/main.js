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

// ===== GESTION DE LA LIGHTBOX =====
class LightboxManager {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.lightboxPrev = document.getElementById('lightbox-prev');
        this.lightboxNext = document.getElementById('lightbox-next');
        
        this.images = [];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Collecter toutes les images cliquables
        this.images = Array.from(document.querySelectorAll('.clickable-image')).map((img, index) => {
            return {
                src: img.src,
                caption: img.getAttribute('data-caption') || img.alt,
                element: img
            };
        });
        
        // Ajouter les événements aux images
        this.images.forEach((img, index) => {
            img.element.setAttribute('data-index', index);
            img.element.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Événements pour la lightbox
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPrevImage());
        this.lightboxNext.addEventListener('click', () => this.showNextImage());
        
        // Fermer en cliquant à l'extérieur de l'image
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    this.showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    this.showNextImage();
                }
            }
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.lightboxImg.src = this.images[index].src;
        this.lightboxCaption.textContent = this.images[index].caption;
        this.lightbox.classList.add('active');
        
        // Masquer la navigation s'il n'y a qu'une seule image
        if (this.images.length <= 1) {
            this.lightboxPrev.style.display = 'none';
            this.lightboxNext.style.display = 'none';
        } else {
            this.lightboxPrev.style.display = 'block';
            this.lightboxNext.style.display = 'block';
        }
        
        // Empêcher le défilement du corps
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.lightboxImg.src = this.images[this.currentIndex].src;
        this.lightboxCaption.textContent = this.images[this.currentIndex].caption;
    }
    
    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.lightboxImg.src = this.images[this.currentIndex].src;
        this.lightboxCaption.textContent = this.images[this.currentIndex].caption;
    }
}

// Initialiser la lightbox une fois le DOM chargé
document.addEventListener('DOMContentLoaded', () => {
    new LightboxManager();
});  

//======= Contact Me =======
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwQwbZ6Cs_3nfR8Ptb-N3Fpvo6FoOSz-8hxTDy9YsSFiNjLKrGZcmWHKAS1ew18ccUO/exec'
  const form = document.forms['Contact-Me']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
  
        //========= Gmail compose functionality =========
        document.addEventListener('DOMContentLoaded', function() {
            const gmailLink = document.getElementById('gmail-link');
            
            gmailLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the email address from the href attribute
                const email = this.href.replace('mailto:', '');
                
                // Create Gmail compose URL
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
                
                // Open Gmail in a new tab
                window.open(gmailUrl, '_blank');
            });
        });
