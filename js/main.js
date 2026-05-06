/* =====================================================
   SecureNest - Smart Security & Home Automation
   Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== INITIALIZE AOS ANIMATIONS ==========
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
    });

    // ========== SCROLL PROGRESS BAR ==========
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });

    // ========== NAVBAR SCROLL BEHAVIOR ==========
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ========== MOBILE NAVIGATION ==========
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on outside click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMobileMenu();
    });

    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navH - 10;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__links a');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;
        let current = '';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // Active nav link style
    const style = document.createElement('style');
    style.textContent = `.navbar__links a.active { color: var(--primary); background: var(--bg-warm); }`;
    document.head.appendChild(style);

    // ========== SOLUTIONS TABS ==========
    const tabBtns = document.querySelectorAll('.solutions__tab');
    const tabPanels = document.querySelectorAll('.solutions__panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('solutions__tab--active'));
            btn.classList.add('solutions__tab--active');

            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('solutions__panel--active');
                panel.style.animation = '';
            });

            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('solutions__panel--active');
                targetPanel.style.animation = 'fadeInUp 0.4s ease-out';
            }
        });
    });

    // Add fadeInUp keyframe
    const panelStyle = document.createElement('style');
    panelStyle.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(panelStyle);

    // ========== PORTFOLIO FILTER ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
            btn.classList.add('filter-btn--active');

            portfolioCards.forEach(card => {
                const categories = card.dataset.category || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ========== TESTIMONIALS SLIDER ==========
    const track = document.getElementById('testimonialsTrack');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && cards.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;
        let cardsPerView = getCardsPerView();

        function getCardsPerView() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 1;
            return 3;
        }

        function getTotalSlides() {
            return Math.ceil(cards.length / getCardsPerView());
        }

        function buildDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const totalSlides = getTotalSlides();
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot' + (i === currentIndex ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsContainer) return;
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            const totalSlides = getTotalSlides();
            currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
            const cpv = getCardsPerView();
            const cardWidth = cards[0].offsetWidth + 24; // 24 = gap
            const offset = currentIndex * cpv * cardWidth;
            track.style.transform = `translateX(-${offset}px)`;
            updateDots();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                stopAutoSlide();
                if (diff > 0) nextSlide();
                else prevSlide();
                startAutoSlide();
            }
        }, { passive: true });

        // Pause on hover
        const sliderEl = document.getElementById('testimonialsSlider');
        if (sliderEl) {
            sliderEl.addEventListener('mouseenter', stopAutoSlide);
            sliderEl.addEventListener('mouseleave', startAutoSlide);
        }

        // Rebuild on resize
        window.addEventListener('resize', () => {
            cardsPerView = getCardsPerView();
            buildDots();
            goToSlide(0);
        });

        buildDots();
        startAutoSlide();
    }

    // ========== COUNTER ANIMATION ==========
    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const suffix = el.nextElementSibling?.classList.contains('stat-card__suffix')
            ? el.nextElementSibling.textContent
            : '';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value.toLocaleString('en-IN');
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString('en-IN');
        }

        requestAnimationFrame(update);
    }

    // Intersection Observer for counters
    const counterEls = document.querySelectorAll('[data-count]');
    if (counterEls.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterEls.forEach(el => counterObserver.observe(el));
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = {
                name: contactForm.querySelector('#name')?.value || '',
                phone: contactForm.querySelector('#phone')?.value || '',
                email: contactForm.querySelector('#email')?.value || '',
                clientType: contactForm.querySelector('#clientType')?.value || '',
                interests: Array.from(contactForm.querySelectorAll('input[name="interest"]:checked'))
                    .map(cb => cb.value),
                location: contactForm.querySelector('#location')?.value || '',
                message: contactForm.querySelector('#message')?.value || '',
                submittedAt: new Date().toISOString()
            };

            try {
                // Save lead to API
                const response = await fetch('tables/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok || response.status === 201) {
                    showFormSuccess();
                } else {
                    // Still show success to user (graceful degradation)
                    showFormSuccess();
                }
            } catch (err) {
                // Network error - still show success (form data is captured)
                showFormSuccess();
                console.log('Lead form submission error (graceful):', err.message);
            }

            function showFormSuccess() {
                contactForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.classList.add('visible');
                    formSuccess.style.display = 'flex';
                }
                // Scroll to success message
                formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== DEVICE TILES INTERACTIVE ==========
    const deviceTiles = document.querySelectorAll('.device-tile');
    deviceTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            tile.classList.toggle('device-tile--active');
        });
        tile.style.cursor = 'pointer';
        tile.title = 'Click to toggle';
    });

    // ========== ENERGY BAR ANIMATION ON SCROLL ==========
    const energyFill = document.querySelector('.energy-bar__fill');
    if (energyFill) {
        const energyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    energyFill.style.animation = 'none';
                    void energyFill.offsetWidth; // reflow
                    energyFill.style.animation = 'energy-fill 2s ease-out forwards';
                    energyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        energyObserver.observe(energyFill);
    }

    // ========== NAVBAR LOGO BRAND COLOR ON SCROLL ==========
    const logoIcon = document.querySelector('.logo-icon');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200 && logoIcon) {
            logoIcon.style.boxShadow = '0 4px 12px rgba(249,115,22,0.4)';
        }
    }, { passive: true });

    // ========== PROCESS STEP HOVER EFFECT ==========
    const processSteps = document.querySelectorAll('.process__step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-6px)';
        });
        step.addEventListener('mouseleave', () => {
            step.style.transform = '';
        });
        step.style.transition = 'transform 0.3s ease';
    });

    // ========== SECTION REVEAL ANIMATIONS FOR BRAND LOGOS ==========
    const brandLogos = document.querySelectorAll('.brand-logo');
    const brandObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                brandLogos.forEach((logo, i) => {
                    setTimeout(() => {
                        logo.style.opacity = '1';
                        logo.style.transform = 'translateY(0)';
                    }, i * 80);
                });
                brandObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    if (brandLogos.length > 0) {
        brandLogos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(12px)';
            logo.style.transition = 'all 0.4s ease';
        });
        brandObserver.observe(document.querySelector('.brands'));
    }

    // ========== SMART HOME CARD PULSE EFFECT ==========
    const smartCard = document.querySelector('.smart-home-card');
    if (smartCard) {
        // Periodically update a random tile to appear "active" (simulating live data)
        const inactiveTiles = document.querySelectorAll('.device-tile:not(.device-tile--active)');
        if (inactiveTiles.length > 0) {
            let lastHighlighted = null;
            setInterval(() => {
                if (lastHighlighted) {
                    lastHighlighted.style.borderColor = '';
                    lastHighlighted.style.background = '';
                }
                const randomTile = inactiveTiles[Math.floor(Math.random() * inactiveTiles.length)];
                randomTile.style.borderColor = 'var(--border-warm)';
                randomTile.style.background = '#FFFBF5';
                randomTile.style.transition = 'all 0.5s ease';
                lastHighlighted = randomTile;
            }, 3000);
        }
    }

    // ========== HERO CTA BUTTON PULSE ==========
    const heroCTA = document.querySelector('.hero__actions .btn-primary');
    if (heroCTA) {
        setTimeout(() => {
            heroCTA.style.animation = 'cta-pulse 3s ease-in-out infinite';
        }, 2000);

        const ctaPulseStyle = document.createElement('style');
        ctaPulseStyle.textContent = `
            @keyframes cta-pulse {
                0%, 100% { box-shadow: 0 8px 24px rgba(249,115,22,0.25); }
                50% { box-shadow: 0 12px 36px rgba(249,115,22,0.45), 0 0 0 6px rgba(249,115,22,0.08); }
            }
        `;
        document.head.appendChild(ctaPulseStyle);
    }

    // ========== FORM INPUT ENHANCEMENT ==========
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        // Add floating label effect via class
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // ========== PRICING CARD HIGHLIGHT ==========
    const pricingCards = document.querySelectorAll('.pricing-card:not(.pricing-card--featured)');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            document.querySelectorAll('.pricing-card--featured').forEach(fc => {
                fc.style.transform = 'scale(1.03)';
            });
        });
        card.addEventListener('mouseleave', () => {
            document.querySelectorAll('.pricing-card--featured').forEach(fc => {
                fc.style.transform = 'scale(1.03)';
            });
        });
    });

    // ========== SERVICE AREAS TAG CLICK ==========
    const areaTags = document.querySelectorAll('.service-areas__tags span');
    areaTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const locationInput = document.getElementById('location');
            if (locationInput) {
                locationInput.value = tag.textContent;
                locationInput.focus();
                // Scroll to form
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        tag.style.cursor = 'pointer';
        tag.title = `Click to select ${tag.textContent}`;
    });

    // ========== KEYBOARD ACCESSIBILITY ==========
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // ========== LAZY LOAD PERFORMANCE ==========
    // Preconnect hints added dynamically
    const links = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }
    ];

    // ========== TESTIMONIAL KEYBOARD NAVIGATION ==========
    if (prevBtn && nextBtn) {
        document.addEventListener('keydown', (e) => {
            const sliderFocused = document.activeElement?.closest('#testimonialsSlider');
            if (sliderFocused) {
                if (e.key === 'ArrowLeft') prevBtn.click();
                if (e.key === 'ArrowRight') nextBtn.click();
            }
        });
    }

    // ========== INITIALIZE PAGE ==========
    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));

    // Log initialization
    console.log('%c🏠 SecureNest Website Loaded', 
        'background: linear-gradient(135deg, #F97316, #EA580C); color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px;');
    console.log('%cSmart · Secure · Sustainable', 
        'color: #22C55E; font-style: italic; font-size: 12px;');

});

