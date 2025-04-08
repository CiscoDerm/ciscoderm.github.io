document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalCloses = document.querySelectorAll('.close-modal');
    const header = document.querySelector('header');
    const scrollAnimElements = document.querySelectorAll('.skill-category, .timeline-item, .experience-item, .cert-item, .project-card, .other-project-card, .tool-card, .script-item, .resource-card');
    const contactForm = document.querySelector('.contact-form');
    
    // Navigation mobile
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !visibility);
            navToggle.setAttribute('aria-expanded', !visibility);
            
            // Change l'icône du bouton
            const icon = navToggle.querySelector('i');
            if (visibility) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
    
    // Animation du header au scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ajoute une classe au header quand on descend
        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Animation d'apparition au scroll pour les éléments
        scrollAnimElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Si l'élément est visible à l'écran
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('animate-in');
            }
        });
        
        lastScrollTop = scrollTop;
    });
    
    // Animation du texte dans le terminal
    const animateTerminal = () => {
        const commands = [
            "whoami",
            "cat skills.txt",
            "./status.sh"
        ];
        const responses = [
            "Maxim Dufosse",
            "Cybersécurité, Réseau, Développement, Linux, Docker",
            "En recherche d'alternance pour Septembre 2025"
        ];
        
        const terminalLines = document.querySelectorAll('.terminal-body .line');
        const terminalResponses = document.querySelectorAll('.terminal-body .response');
        
        let currentCommand = 0;
        let currentChar = 0;
        let currentResponse = 0;
        
        const typeWriter = () => {
            if (currentCommand < commands.length) {
                const commandSpan = terminalLines[currentCommand].querySelector('.command');
                
                if (currentChar < commands[currentCommand].length) {
                    commandSpan.textContent += commands[currentCommand].charAt(currentChar);
                    currentChar++;
                    setTimeout(typeWriter, 50 + Math.random() * 50);
                } else {
                    currentChar = 0;
                    
                    // Affiche la réponse après un court délai
                    setTimeout(() => {
                        terminalResponses[currentResponse].style.visibility = 'visible';
                        currentResponse++;
                        currentCommand++;
                        
                        // Passe à la commande suivante après un délai
                        if (currentCommand < commands.length) {
                            setTimeout(typeWriter, 500);
                        } else {
                            // Animation du curseur
                            const cursor = document.querySelector('.terminal-body .cursor');
                            if (cursor) {
                                cursor.style.visibility = 'visible';
                            }
                        }
                    }, 300);
                }
            }
        };
        
        // Cache les réponses au début
        terminalResponses.forEach(response => {
            response.style.visibility = 'hidden';
        });
        
        // Cache le curseur
        const cursor = document.querySelector('.terminal-body .cursor');
        if (cursor) {
            cursor.style.visibility = 'hidden';
        }
        
        // Efface les textes prédéfinis des commandes
        terminalLines.forEach(line => {
            const commandSpan = line.querySelector('.command');
            if (commandSpan) {
                commandSpan.textContent = '';
            }
        });
        
        // Démarre l'animation après un délai
        setTimeout(typeWriter, 1000);
    };
    
    // Modales pour les projets
    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('href').substring(1);
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Ferme la modale en cliquant en dehors
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Animation des compétences
    const animateSkills = () => {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                category.style.transition = 'all 0.5s ease';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    };
    
    // Gestion du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Ajout d'une animation de chargement
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (pour la démo)
            setTimeout(() => {
                // Réinitialisation du formulaire
                contactForm.reset();
                
                // Affichage d'un message de succès
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé avec succès!';
                contactForm.appendChild(successMsg);
                
                // Restauration du bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Suppression du message après un délai
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 500);
                }, 3000);
            }, 2000);
        });
    }
    
    // Effet de parallaxe pour le fond
    const parallaxElements = document.querySelectorAll('.hero, .projects-hero, .tools-hero');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(el => {
            el.style.backgroundPositionX = x * 10 + 'px';
            el.style.backgroundPositionY = y * 10 + 'px';
        });
    });
    
    // Animation de comptage pour les chiffres
    const countUp = (el, target) => {
        let count = 0;
        const duration = 2000; // ms
        const step = target / (duration / 30); // 30 est le nombre approximatif de frames en 30ms
        
        const updateCount = () => {
            count += step;
            if (count < target) {
                el.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target;
            }
        };
        
        updateCount();
    };
    
    // Animation du texte "Top 2%"
    const percentageEl = document.querySelector('.project-details:nth-of-type(1)');
    if (percentageEl) {
        const percentageText = percentageEl.querySelector('li:first-child');
        if (percentageText && percentageText.textContent.includes('2%')) {
            const originalText = percentageText.textContent;
            const number = 2;
            percentageText.innerHTML = originalText.replace('2%', '<span id="percentage-count">0</span>%');
            
            // Observe si l'élément est visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const countEl = document.getElementById('percentage-count');
                        if (countEl) {
                            countUp(countEl, number);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(percentageEl);
        }
    }
    
    // Initialisation des animations
    animateTerminal();
    animateSkills();
    
    // Ajout d'animations CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header-scrolled {
            padding: 0.5rem 2rem;
            background-color: rgba(12, 16, 22, 0.98);
        }
        
        .success-message {
            background-color: rgba(39, 201, 63, 0.1);
            color: #27c93f;
            padding: 1rem;
            border-radius: var(--border-radius-sm);
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Initialiser les éléments comme invisibles pour l'animation
    scrollAnimElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Déclencher l'animation pour les éléments visibles au chargement
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
});
