// Днепропетровское Рок Кафе 2001-2021 - JavaScript Functions

// Language switching functionality
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'ru';
    
    // Set initial language
    document.body.classList.add(`lang-${currentLang}`);
    
    // Update button states
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
            btn.disabled = true;
        } else {
            btn.classList.remove('active');
            btn.disabled = false;
        }
    });
    
    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            
            // Update body class
            document.body.classList.remove('lang-ru', 'lang-en');
            document.body.classList.add(`lang-${newLang}`);
            
            // Save to localStorage
            localStorage.setItem('language', newLang);
            
            // Update button states
            langButtons.forEach(b => {
                b.classList.remove('active');
                b.disabled = false;
            });
            btn.classList.add('active');
            btn.disabled = true;
        });
    });
}

// Tab functionality for location pages
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
    if (tabContents.length > 0) {
        tabContents[0].classList.add('active');
    }
    
    // Add click handlers
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            if (tabContents[index]) {
                tabContents[index].classList.add('active');
            }
        });
    });
}

// Chat functionality
function initChat() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    
    if (!chatToggle || !chatWindow) return;
    
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        
        if (chatWindow.classList.contains('active')) {
            chatToggle.textContent = 'Закрыть чат / Close Chat';
            // Add some placeholder messages
            if (chatWindow.children.length === 0) {
                const messages = [
                    'Добро пожаловать в чат Рок Кафе!',
                    'Welcome to Rock Cafe chat!',
                    'Здесь можно обсудить воспоминания о кафе',
                    'Share your memories about the cafe here'
                ];
                
                messages.forEach(msg => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'chat-message';
                    messageDiv.textContent = msg;
                    chatWindow.appendChild(messageDiv);
                });
            }
        } else {
            chatToggle.textContent = 'Чат для публики / Public Chat';
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add fade-in animation to elements
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    const animatedElements = document.querySelectorAll('.section, .location-card, .tab-content');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize location card interactions
function initLocationCards() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initTabs();
    initChat();
    initSmoothScrolling();
    initAnimations();
    initLocationCards();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Utility function to format dates
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        locale: document.body.classList.contains('lang-en') ? 'en-US' : 'ru-RU'
    };
    return new Date(dateString).toLocaleDateString(options);
}

// Utility function to toggle mobile menu (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.classList.remove('mobile-active');
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes chat
    if (e.key === 'Escape') {
        const chatWindow = document.querySelector('.chat-window');
        if (chatWindow && chatWindow.classList.contains('active')) {
            document.querySelector('.chat-toggle').click();
        }
    }
    
    // Tab navigation for tab buttons
    if (e.key === 'Tab' && e.target.classList.contains('tab-btn')) {
        e.preventDefault();
        const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
        const currentIndex = tabButtons.indexOf(e.target);
        const nextIndex = e.shiftKey ? 
            (currentIndex - 1 + tabButtons.length) % tabButtons.length :
            (currentIndex + 1) % tabButtons.length;
        
        tabButtons[nextIndex].focus();
        tabButtons[nextIndex].click();
    }
});

// Export functions for potential external use
window.RockCafe = {
    switchLanguage: (lang) => {
        document.body.classList.remove('lang-ru', 'lang-en');
        document.body.classList.add(`lang-${lang}`);
        localStorage.setItem('language', lang);
    },
    openTab: (tabIndex) => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        if (tabButtons[tabIndex] && tabContents[tabIndex]) {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tabButtons[tabIndex].classList.add('active');
            tabContents[tabIndex].classList.add('active');
        }
    }
};
