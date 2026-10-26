document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const hero = document.querySelector('#hero');
    
    // Function to update navbar appearance on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(36, 36, 52, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(36, 36, 52, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Call on load
    updateNavbar();
    
    // Listen for scroll
    window.addEventListener('scroll', updateNavbar);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Spy feature
    const sections = document.querySelectorAll('section'); // Assuming sections are wrapped in <section> tags with IDs
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function activateNavLink() {
        let current = '';
        const scrollPos = window.scrollY + navbar.offsetHeight + 1; // Add navbar height to account for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const triggerPoint = sectionTop - window.innerHeight / 3;

            if (scrollPos >= triggerPoint && scrollPos < sectionTop + sectionHeight) {
                // If this section belongs to a group (e.g., "benefits"), assign that ID
                if (section.classList.contains('benefit-section')) {
                    current = 'benefits';
                } 
                else if (section.classList.contains('for-clients-section')) {
                    current = 'who-for';
                }
                else {
                    current = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Call on load
    activateNavLink();

    // Listen for scroll events
    window.addEventListener('scroll', activateNavLink);

    // Also update on resize to account for height changes
    window.addEventListener('resize', activateNavLink);


    // Portfolio website preview hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const preview = item.querySelector('.website-preview');
        
        item.addEventListener('mouseenter', () => {
            preview.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            preview.style.transform = 'scale(1)';
        });
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.service-card, .audience-card, .portfolio-item, .accordion-item, .portfolio-card, .testimonial-container, .about-image-container, .video-container');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements for reveal
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = `
                    <div class="video-embed">
                        <iframe 
                            src="https://www.youtube.com/embed/uxbs4SPJGTI?autoplay=1"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
            }
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // EmailJS initialization
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init({
                publicKey: "jkLAd8X0aWHM4emed"
            });
        } catch (e) {
            emailjs.init("jkLAd8X0aWHM4emed");
        }
    }

    
    // Contact form submission with EmailJS
    const contactForm = document.querySelector('.contact-form');
    const countryCodeInput = contactForm ? contactForm.querySelector('#countryCode') : null;
    const phoneInput = contactForm ? contactForm.querySelector('#phone') : null;
    
    // Add input restriction and auto '+' to country code field
    if (countryCodeInput) {
        countryCodeInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, ''); // Remove non-digits
            if (value) {
                this.value = '+' + value;
            } else {
                this.value = ''; // Keep empty if no digits
            }
        });

        // Prevent non-numeric and non-plus keys
        countryCodeInput.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number or the plus key (for the first character)
            // Plus key is keycode 187 shifted or keycode 107 on numpad
            if ((e.shiftKey && e.keyCode === 187) || e.keyCode === 107) {
                 // Allow '+' only if the field is empty
                 if (this.value.length === 0) {
                    return;
                 }
            }
            // Ensure it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }

    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting to server
            
            // Update UI to show loading state
            const submitButton = this.querySelector('button[type="submit"]');

            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            let countryCode = countryCodeInput ? countryCodeInput.value.trim() : '';
            // Make sure country code starts with +
            if (countryCode && !countryCode.startsWith('+')) {
                countryCode = '+' + countryCode;
            };
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const prefix = countryCode
            const message = this.querySelector('#message').value
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                prefix: prefix,
                phone: phone,
                message: message,
            };

            // Validation: Country code mandatory if phone is filled
            if (phone && !countryCode) {
                showEmailStatus('error', 'Please enter the country code if you provide a phone number.');
                return; // Prevent form submission
            }

            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_8etewic', 'template_4aychwg', templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully:', response);
                        
                        // Show success message
                        showEmailStatus('success', 'Thank you for your message! We will get back to you soon.');
                        
                        // Reset form
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Email failed to send:', error);
                        
                        // Show error message
                        showEmailStatus('error', 'There was a problem sending your message. Please try again later.');
                    })
                    .finally(function() {
                        // Reset button state
                        submitButton.innerHTML = 'Send Message';
                        submitButton.disabled = false;
                    });
            } else {
                // Fallback to server-side POST
                contactForm.submit();
            }
        });
    }
    
    // Function to show email status message
    function showEmailStatus(type, message) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mt-3`;
        alertDiv.role = 'alert';
        
        // Add message content
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Find the contact form container and insert message after the form
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.appendChild(alertDiv);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                alertDiv.remove();
            }, 300);
        }, 5000);
    }
    
    // Flash message auto-dismiss
    const flashMessages = document.querySelectorAll('.alert');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    });

    // ==========================================================================
    // Multi-Step QA Assessment Wizard Controller
    // ==========================================================================
    const wizardCard = document.getElementById('qaWizardCard');
    const wizardBackBtn = document.getElementById('wizardBackBtn');
    const wizardStepText = document.getElementById('wizardStepText');
    const wizardProgressFill = document.getElementById('wizardProgressFill');
    const wizardPanes = document.querySelectorAll('.wizard-step-pane');
    const wizardFocusOptions = document.getElementById('wizardFocusOptions');
    const wizardSummaryPills = document.getElementById('wizardSummaryPills');
    const wizardRecPackage = document.getElementById('wizardRecPackage');
    const wizardContactForm = document.getElementById('wizardContactForm');
    const wizardSuccessState = document.getElementById('wizardSuccessState');
    const wizardRestartBtn = document.getElementById('wizardRestartBtn');

    if (wizardCard) {
        const wizardState = {
            step: 1,
            product: null,
            productLabel: '',
            focus: null,
            focusLabel: '',
            timeline: null,
            timelineLabel: ''
        };

        const focusCatalog = {
            ai: [
                { id: 'hallucination', icon: 'fa-shield-alt', title: 'LLM Hallucinations & Guardrails', desc: 'RAG factuality, prompt injections, safety bounds' },
                { id: 'wcag', icon: 'fa-universal-access', title: 'WCAG 2.2 Accessibility Compliance', desc: 'Accessible chat UI, screen-reader tree, EAA ready' },
                { id: 'regression', icon: 'fa-network-wired', title: 'API Latency & Regression QA', desc: 'Streaming tokens, response p99 latency, endpoints' },
                { id: 'full', icon: 'fa-rocket', title: 'Full QA Audit', desc: 'End-to-end model, security & compliance certification' }
            ],
            web: [
                { id: 'wcag', icon: 'fa-universal-access', title: 'WCAG 2.2 AA Compliance (EAA)', desc: 'Official accessibility audit & legal risk removal' },
                { id: 'regression', icon: 'fa-check-double', title: 'End-to-End Automated QA', desc: 'Critical user workflows, Cypress/Playwright suites' },
                { id: 'ai', icon: 'fa-brain', title: 'Embedded AI Feature Testing', desc: 'Copilots, smart search, and predictive features' },
                { id: 'full', icon: 'fa-rocket', title: 'Full QA Audit', desc: 'Complete functional, UI, accessibility & security pass' }
            ],
            api: [
                { id: 'regression', icon: 'fa-check-double', title: 'Automated Regression Suite', desc: '100% endpoint coverage, schema contracts' },
                { id: 'load', icon: 'fa-bolt', title: 'Performance & Stress Load', desc: 'Concurrency, rate-limits, p99 latency bench' },
                { id: 'security', icon: 'fa-shield-alt', title: 'Security & Payload Validation', desc: 'Injection filtering, edge-case data sanitization' },
                { id: 'full', icon: 'fa-rocket', title: 'Full QA Audit', desc: 'Complete integration, stability & failover tests' }
            ],
            mobile: [
                { id: 'device', icon: 'fa-mobile-alt', title: 'Multi-Device Functional QA', desc: 'Cross-device OS matrix, gestures, network flows' },
                { id: 'wcag', icon: 'fa-universal-access', title: 'Mobile Accessibility (WCAG 2.2)', desc: 'VoiceOver, TalkBack, touch targets, contrast' },
                { id: 'api', icon: 'fa-network-wired', title: 'API & Offline Sync Reliability', desc: 'Offline mode, background sync, latency checks' },
                { id: 'full', icon: 'fa-rocket', title: 'Full QA Audit', desc: 'Submission readiness, crash prevention & quality pass' }
            ]
        };

        const packageNames = {
            'ai-hallucination': 'AI Hallucination & Prompt Guardrail Package',
            'ai-wcag': 'Accessible AI & Chat UX Compliance Package',
            'ai-regression': 'AI Engine Integration & Latency QA Package',
            'ai-full': 'Full QA Audit & AI Certification',
            'web-wcag': 'European Accessibility Act (EAA) Full Audit',
            'web-regression': 'End-to-End Automated Regression & API Suite',
            'web-ai': 'Embedded AI Feature & Data Integrity Audit',
            'web-full': 'Full QA Audit & Web Platform Certification',
            'api-regression': 'High-Throughput API Regression & Stability Suite',
            'api-load': 'High-Concurrency Stress & API Benchmarking Suite',
            'api-security': 'Model API Grounding & Token Reliability Audit',
            'api-full': 'Full QA Audit & Backend Reliability Certification',
            'mobile-device': 'Multi-Device Cross-Platform Functional Suite',
            'mobile-wcag': 'Mobile Accessibility & Assistive Tech Audit',
            'mobile-api': 'Mobile Network & Offline Workflows Suite',
            'mobile-full': 'Full QA Audit & App Store Certification'
        };

        function getPackageName() {
            const key = `${wizardState.product}-${wizardState.focus}`;
            return packageNames[key] || 'Comprehensive Quality Engineering Audit';
        }

        function setStep(stepNumber) {
            wizardState.step = stepNumber;

            // Update panes
            wizardPanes.forEach(pane => {
                pane.classList.toggle('active', parseInt(pane.getAttribute('data-step')) === stepNumber);
            });

            // Update header controls
            const wizardHeaderTag = document.getElementById('wizardHeaderTag');
            const stepTags = {
                1: '<i class="fas fa-cube me-1 text-primary"></i> Step 1',
                2: '<i class="fas fa-bullseye me-1 text-primary"></i> Step 2',
                3: '<i class="fas fa-clock me-1 text-primary"></i> Step 3',
                4: '<i class="fas fa-check-circle me-1 text-success"></i> Final Step'
            };
            if (wizardHeaderTag && stepTags[stepNumber]) {
                wizardHeaderTag.innerHTML = stepTags[stepNumber];
            }

            if (stepNumber === 1) {
                wizardBackBtn.classList.add('d-none');
                wizardStepText.textContent = 'Step 1 of 4';
                wizardProgressFill.style.width = '25%';
            } else if (stepNumber === 2) {
                wizardBackBtn.classList.remove('d-none');
                wizardStepText.textContent = 'Step 2 of 4';
                wizardProgressFill.style.width = '50%';
                renderStep2Choices();
            } else if (stepNumber === 3) {
                wizardBackBtn.classList.remove('d-none');
                wizardStepText.textContent = 'Step 3 of 4';
                wizardProgressFill.style.width = '75%';
            } else if (stepNumber === 4) {
                wizardBackBtn.classList.remove('d-none');
                wizardStepText.textContent = 'Final Step';
                wizardProgressFill.style.width = '100%';
                renderStep4Summary();
            }
        }

        function renderStep2Choices() {
            if (!wizardFocusOptions) return;
            const items = focusCatalog[wizardState.product] || focusCatalog.ai;
            wizardFocusOptions.innerHTML = '';

            items.forEach(item => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'wizard-choice-btn';
                btn.setAttribute('data-focus', item.id);
                btn.innerHTML = `
                    <div class="choice-icon"><i class="fas ${item.icon}"></i></div>
                    <div class="choice-content">
                        <div class="choice-title">${item.title}</div>
                        <div class="choice-desc">${item.desc}</div>
                    </div>
                    <i class="fas fa-chevron-right choice-arrow"></i>
                `;

                btn.addEventListener('click', function() {
                    wizardState.focus = item.id;
                    wizardState.focusLabel = item.title;
                    setStep(3);
                });

                wizardFocusOptions.appendChild(btn);
            });
        }

        function renderStep4Summary() {
            if (wizardSummaryPills) {
                wizardSummaryPills.innerHTML = `
                    <span class="wizard-pill"><i class="fas fa-check text-success me-1"></i> ${wizardState.productLabel}</span>
                    <span class="wizard-pill"><i class="fas fa-check text-success me-1"></i> ${wizardState.focusLabel}</span>
                    <span class="wizard-pill"><i class="fas fa-check text-success me-1"></i> ${wizardState.timelineLabel}</span>
                `;
            }

            if (wizardRecPackage) {
                wizardRecPackage.textContent = getPackageName();
            }
        }

        // Attach Step 1 Clicks
        const step1Buttons = document.querySelectorAll('#wizardStep1 .wizard-choice-btn');
        step1Buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                wizardState.product = this.getAttribute('data-product');
                wizardState.productLabel = this.querySelector('.choice-title').textContent.trim();
                setStep(2);
            });
        });

        // Attach Step 3 Clicks
        const step3Buttons = document.querySelectorAll('#wizardStep3 .wizard-choice-btn');
        step3Buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                wizardState.timeline = this.getAttribute('data-timeline');
                wizardState.timelineLabel = this.querySelector('.choice-title').textContent.trim();
                setStep(4);
            });
        });

        // Back button navigation
        wizardBackBtn.addEventListener('click', function() {
            if (wizardState.step > 1) {
                setStep(wizardState.step - 1);
            }
        });

        // Restart button
        if (wizardRestartBtn) {
            wizardRestartBtn.addEventListener('click', function() {
                if (wizardContactForm) wizardContactForm.reset();
                wizardSuccessState.classList.add('d-none');
                if (wizardContactForm) wizardContactForm.classList.remove('d-none');
                setStep(1);
            });
        }

        // Final Form Submission
        if (wizardContactForm) {
            wizardContactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = document.getElementById('wizardSubmitBtn');
                const name = document.getElementById('wizardName').value.trim();
                const email = document.getElementById('wizardEmail').value.trim();
                const note = document.getElementById('wizardNote') ? document.getElementById('wizardNote').value.trim() : '';

                if (!name || !email) return;

                const packageName = getPackageName();
                const fullMessage = `Audit Inquiry from Hero Wizard:\n` +
                    `• Product: ${wizardState.productLabel}\n` +
                    `• Quality Focus: ${wizardState.focusLabel}\n` +
                    `• Timeline: ${wizardState.timelineLabel}\n` +
                    `• Recommended Package: ${packageName}\n` +
                    (note ? `• Client Notes: ${note}` : `• Client Notes: None provided`);

                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

                // Prepare template parameters for EmailJS
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    prefix: '',
                    phone: '',
                    message: fullMessage,
                    subject: `Audit Request: ${packageName}`
                };

                // Submit via EmailJS if available
                const sendEmailPromise = (typeof emailjs !== 'undefined')
                    ? emailjs.send('service_8etewic', 'template_4aychwg', templateParams)
                    : Promise.resolve();

                // Also record via fetch to /contact as backup logging
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('subject', `Audit Request: ${packageName}`);
                formData.append('message', fullMessage);

                const backendPromise = fetch('/contact', {
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    body: formData
                }).catch(err => console.warn('Backend log notice:', err));

                Promise.allSettled([sendEmailPromise, backendPromise])
                    .then(results => {
                        const emailResult = results[0];
                        if (emailResult.status === 'rejected') {
                            console.error('EmailJS error:', emailResult.reason);
                        } else {
                            console.log('EmailJS sent successfully for audit request');
                        }
                        wizardContactForm.classList.add('d-none');
                        wizardSuccessState.classList.remove('d-none');
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<span>Send Audit Request</span> <i class="fas fa-paper-plane ms-2"></i>';
                    });
            });
        }
    }
});
