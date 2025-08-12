// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 120,
        delay: 100
    });

    // Loading Screen
    const loaderWrapper = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        if (loaderWrapper) {
            loaderWrapper.style.opacity = '0';
            setTimeout(() => {
                loaderWrapper.style.display = 'none';
            }, 800);
        }
    }, 2000);

    // Header scroll effect
    const header = document.querySelector('.header-luxury');
    const hero = document.querySelector('.hero');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link-luxury, .mobile-nav-link, .btn-primary, .btn-secondary, .cta-luxury, .mobile-cta');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                    if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
                        closeMobileMenu();
                    }
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showNotification('ميزة البحث ستتوفر قريباً!', 'info');
        });
    }
    
    // Active navigation link highlighting
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksLuxury = document.querySelectorAll('.nav-link-luxury');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - header.offsetHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksLuxury.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);

    // Hero particles animation enhancement
    const particles = document.querySelectorAll('.particle');
    
    function animateParticles() {
        particles.forEach((particle, index) => {
            const randomDelay = Math.random() * 2000;
            const randomDuration = 4000 + Math.random() * 4000;
            
            setTimeout(() => {
                particle.style.animation = `float ${randomDuration}ms ease-in-out infinite`;
            }, randomDelay);
        });
    }

    animateParticles();

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const overlay = card.querySelector('.product-overlay');
        const image = card.querySelector('.product-image');
        
        card.addEventListener('mouseenter', function() {
            if (overlay) overlay.style.opacity = '1';
            if (image) image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (overlay) overlay.style.opacity = '0';
            if (image) image.style.transform = 'scale(1)';
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.luxury-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'جاري الإرسال...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معكِ قريباً', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#da005e'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            direction: rtl;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    stat.textContent = stat.textContent.replace(/[0-9]+/, target);
                    clearInterval(timer);
                } else {
                    stat.textContent = stat.textContent.replace(/[0-9]+/, Math.floor(current));
                }
            }, 20);
        });
    }

    // Trigger counter animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('about-stats')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Testimonial slider (simple version)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? '1' : '0.7';
            card.style.transform = index === currentTestimonial ? 'scale(1.02)' : 'scale(1)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    if (testimonialCards.length > 1) {
        setInterval(rotateTestimonials, 4000);
    }

    // Product button interactions (both old and new styles)
    const productButtons = document.querySelectorAll('.btn-product, .product-cta-modern');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${e.offsetX - 10}px;
                top: ${e.offsetY - 10}px;
                width: 20px;
                height: 20px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Scroll to contact section instead
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                showNotification('تم التوجه لقسم التواصل. يسعدنا خدمتكِ!', 'success');
            } else {
                showNotification('تواصلي معنا لطلب هذا المنتج!', 'info');
            }
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-right: 0.5rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroParticles = document.querySelector('.hero-particles');
        
        if (heroContent && scrollTop < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
        
        if (heroParticles && scrollTop < window.innerHeight) {
            heroParticles.style.transform = `translateY(${scrollTop * 0.3}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);

    // Add glow effect to CTA buttons on scroll
    const ctaButtons = document.querySelectorAll('.btn-glow');
    
    function handleCTAGlow() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        
        ctaButtons.forEach(button => {
            const intensity = Math.sin(scrollPercent * Math.PI * 4) * 0.5 + 0.5;
            button.style.boxShadow = `0 0 ${20 + intensity * 20}px rgba(218, 0, 94, ${0.3 + intensity * 0.3})`;
        });
    }
    
    window.addEventListener('scroll', handleCTAGlow);

    console.log('🌟 MenaStar website loaded successfully!');
});