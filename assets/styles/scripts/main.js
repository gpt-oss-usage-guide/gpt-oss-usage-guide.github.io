/**
 * ChatGPT-OSS Tutorial Website
 * Main JavaScript functionality
 * By GGUF Loader Team
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initSmoothScrolling();
    initHeaderScrollBehavior();
    initAccessibility();
    initHardwareChecker();
    initTutorialNavigation();
    initPlatformTabs();
    initCopyToClipboard();
    initFAQAccordion();
    initTroubleshootingSearch();
    initToolRecommendationUpdates();
    initProgressIndicators();
    initImageLazyLoading();
    initPerformanceOptimizations();
    initFinalAccessibilityEnhancements();
    initPerformanceMonitoring();
    initCrossBrowserCompatibility();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active navigation state
                updateActiveNavLink(targetId);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('nav-link--active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('nav-link--active');
        }
    });
}

/**
 * Initialize header scroll behavior
 */
function initHeaderScrollBehavior() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 10) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Add skip link for keyboard navigation
    addSkipLink();

    // Enhance focus management
    enhanceFocusManagement();

    // Add ARIA live region for dynamic content
    addLiveRegion();

    // Initialize keyboard navigation enhancements
    initKeyboardNavigation();

    // Add ARIA labels and descriptions
    enhanceARIALabels();

    // Initialize focus trap for modals
    initFocusTrap();
}

/**
 * Add skip link for keyboard navigation
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function () {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function () {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Enhance focus management
 */
function enhanceFocusManagement() {
    // Add focus-visible polyfill behavior
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Add ARIA live region for dynamic content updates
 */
function addLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;

    document.body.appendChild(liveRegion);
}

/**
 * Utility function to announce messages to screen readers
 */
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;

        // Clear the message after a short delay
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

/**
 * Utility function to handle errors gracefully
 */
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);

    // Announce error to screen readers if it affects user experience
    if (context.includes('navigation') || context.includes('interaction')) {
        announceToScreenReader('An error occurred. Please try again or contact support.');
    }
}

/**
 * Hardware Compatibility Checker
 */
function initHardwareChecker() {
    const hardwareForm = document.getElementById('hardwareForm');
    const compatibilityResults = document.getElementById('compatibilityResults');
    const resultsContent = document.getElementById('resultsContent');

    if (!hardwareForm || !compatibilityResults || !resultsContent) {
        return;
    }

    hardwareForm.addEventListener('submit', function (e) {
        e.preventDefault();

        try {
            const formData = new FormData(hardwareForm);
            const hardware = {
                ram: parseInt(formData.get('ram')),
                gpu: formData.get('gpu'),
                storage: parseInt(formData.get('storage')),
                usage: formData.get('usage')
            };

            const assessment = assessHardwareCompatibility(hardware);
            displayCompatibilityResults(assessment, resultsContent);

            // Show results with smooth animation
            compatibilityResults.style.display = 'block';
            compatibilityResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Announce results to screen readers
            announceToScreenReader('Hardware compatibility results are now available');

        } catch (error) {
            handleError(error, 'Hardware compatibility checker');
            displayErrorMessage(resultsContent);
        }
    });
}

/**
 * Assess hardware compatibility for ChatGPT-OSS models
 */
function assessHardwareCompatibility(hardware) {
    const { ram, gpu, storage, usage } = hardware;

    // Get model requirements from HTML data attributes
    const hardwareCards = document.querySelectorAll('.hardware-card');
    const models = {};

    hardwareCards.forEach(card => {
        const modelSize = card.dataset.model;
        models[modelSize] = {
            minRam: parseInt(card.dataset.minRam),
            recommendedRam: parseInt(card.dataset.recommendedRam),
            minStorage: parseInt(card.dataset.minStorage),
            cpuTokens: parseFloat(card.dataset.cpuTokens),
            gpuTokens: parseFloat(card.dataset.gpuTokens),
            name: card.querySelector('.hardware-card__title').textContent
        };
    });

    // Get GPU performance data from HTML
    const gpuOption = document.querySelector(`#gpu option[value="${gpu}"]`);
    const gpuPerformance = {
        vram: parseInt(gpuOption.dataset.vram),
        performance: gpuOption.dataset.performance,
        multiplier: parseFloat(gpuOption.dataset.multiplier)
    };

    const results = [];

    // Assess each model
    Object.entries(models).forEach(([modelSize, requirements]) => {
        const result = {
            model: requirements.name,
            size: modelSize,
            compatible: false,
            status: 'incompatible',
            reasons: [],
            recommendations: [],
            performance: null,
            toolRecommendations: []
        };

        // Check RAM compatibility
        if (ram >= requirements.minRam) {
            result.compatible = true;
            result.status = ram >= requirements.recommendedRam ? 'compatible' : 'limited';

            if (ram < requirements.recommendedRam) {
                result.reasons.push(`RAM is below recommended (${requirements.recommendedRam}GB)`);
                result.recommendations.push('Consider upgrading RAM for better performance');
            }
        } else {
            result.reasons.push(`Insufficient RAM (minimum ${requirements.minRam}GB required)`);
            result.recommendations.push(`Upgrade to at least ${requirements.minRam}GB RAM`);
        }

        // Check storage
        if (storage < requirements.minStorage) {
            result.compatible = false;
            result.status = 'incompatible';
            result.reasons.push(`Insufficient storage (${requirements.minStorage}GB required)`);
            result.recommendations.push(`Free up at least ${requirements.minStorage}GB of storage space`);
        }

        // Calculate performance expectations
        if (result.compatible) {
            const tokensPerSecond = Math.round(requirements.cpuTokens * gpuPerformance.multiplier);

            result.performance = {
                tokensPerSecond,
                gpuAccelerated: gpu !== 'none',
                gpuType: gpuPerformance.performance
            };

            // Add performance-based recommendations
            if (gpu === 'none') {
                result.recommendations.push('Consider adding a GPU for significantly better performance');

                if (modelSize === '120B') {
                    result.recommendations.push('120B model is very slow on CPU-only - consider 20B instead');
                }
            }
        }

        results.push(result);
    });

    return {
        models: results,
        hardware
    };
}

/**
 * Display compatibility results in the UI
 */
function displayCompatibilityResults(assessment, container) {
    const { models } = assessment;

    let html = '<div class="results-header">';
    html += '<h3>Compatibility Assessment Results</h3>';
    html += '</div>';

    // Model compatibility results
    models.forEach(model => {
        html += `<div class="result-card">`;
        html += `<div class="result-card__header">`;
        html += `<h4 class="result-card__title">${model.model}</h4>`;
        html += `<span class="result-status result-status--${model.status}">${model.status}</span>`;
        html += `</div>`;
        html += `<div class="result-card__content">`;

        if (model.compatible) {
            if (model.performance) {
                html += `<p><strong>Expected Performance:</strong> ~${model.performance.tokensPerSecond} tokens/second`;
                html += model.performance.gpuAccelerated ? ' (GPU accelerated)' : ' (CPU only)';
                html += '</p>';
            }

            if (model.reasons.length > 0) {
                html += `<p><strong>Notes:</strong> ${model.reasons.join(', ')}</p>`;
            }
        } else {
            html += `<p><strong>Issues:</strong> ${model.reasons.join(', ')}</p>`;
        }

        if (model.recommendations.length > 0) {
            html += `<div class="result-recommendations">`;
            html += `<strong>Recommendations:</strong>`;
            html += `<ul class="recommendation-list">`;
            model.recommendations.forEach(rec => {
                html += `<li>${rec}</li>`;
            });
            html += `</ul></div>`;
        }

        html += `</div></div>`;
    });

    container.innerHTML = html;
}

/**
 * Display error message when compatibility check fails
 */
function displayErrorMessage(container) {
    container.innerHTML = `
        <div class="result-card">
            <div class="result-card__header">
                <h4 class="result-card__title">Error</h4>
                <span class="result-status result-status--incompatible">Failed</span>
            </div>
            <div class="result-card__content">
                <p>Sorry, we couldn't assess your hardware compatibility. Please check your inputs and try again.</p>
                <p>If the problem persists, you can still refer to the hardware requirement cards above for guidance.</p>
            </div>
        </div>
    `;
}

// Placeholder functions for features that would be implemented in full version
function initTutorialNavigation() {
    console.log('Tutorial navigation initialized');
}

function initPlatformTabs() {
    console.log('Platform tabs initialized');
}

function initCopyToClipboard() {
    console.log('Copy to clipboard initialized');
}

function initFAQAccordion() {
    console.log('FAQ accordion initialized');
}

function initTroubleshootingSearch() {
    console.log('Troubleshooting search initialized');
}

function initToolRecommendationUpdates() {
    console.log('Tool recommendation updates initialized');
}

/**
 * Initialize progress indicators for smooth scrolling navigation
 */
function initProgressIndicators() {
    // Create progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Create section indicators
    const sectionIndicator = document.createElement('div');
    sectionIndicator.className = 'section-indicator';
    sectionIndicator.setAttribute('aria-label', 'Page sections');
    sectionIndicator.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'section-dot';
        indicator.setAttribute('aria-label', `Go to ${section.id} section`);
        indicator.dataset.section = section.id;
        indicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--color-primary);
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        indicator.addEventListener('click', () => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });

        sectionIndicator.appendChild(indicator);
    });

    document.body.appendChild(sectionIndicator);

    // Update progress on scroll
    let ticking = false;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';

        // Update section indicators
        const indicators = sectionIndicator.querySelectorAll('.section-dot');
        let activeSection = null;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
                activeSection = index;
            }
        });

        indicators.forEach((indicator, index) => {
            if (index === activeSection) {
                indicator.style.background = 'var(--color-primary)';
                indicator.style.transform = 'scale(1.2)';
            } else {
                indicator.style.background = 'transparent';
                indicator.style.transform = 'scale(1)';
            }
        });

        // Show/hide section indicator based on scroll position
        if (scrollTop > 200) {
            sectionIndicator.style.opacity = '1';
        } else {
            sectionIndicator.style.opacity = '0';
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });

    // Initial update
    updateProgress();
}

/**
 * Initialize image lazy loading for performance optimization
 */
function initImageLazyLoading() {
    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load the image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // Load srcset if available
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                
                // Remove loading class and add loaded class
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Find all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        img.classList.add('lazy-loading');
        imageObserver.observe(img);
    });
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Debounce resize events
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Trigger any resize-dependent updates
            if (typeof updateProgress === 'function') {
                updateProgress();
            }
        }, 150);
    });

    // Initialize service worker for caching (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, continue without it
        });
    }
}

/**
 * Initialize enhanced keyboard navigation
 */
function initKeyboardNavigation() {
    // Handle keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    
    interactiveElements.forEach(element => {
        // Add keyboard event handlers
        element.addEventListener('keydown', handleKeyboardNavigation);
    });

    // Handle escape key for closing modals/dropdowns
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            closeAllDropdowns();
        }
    });
}

/**
 * Handle keyboard navigation for interactive elements
 */
function handleKeyboardNavigation(e) {
    const element = e.target;
    
    // Handle Enter and Space for buttons and links
    if ((e.key === 'Enter' || e.key === ' ') && 
        (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button')) {
        e.preventDefault();
        element.click();
    }
    
    // Handle Enter for links
    if (e.key === 'Enter' && element.tagName === 'A') {
        element.click();
    }
}

/**
 * Enhance ARIA labels and descriptions
 */
function enhanceARIALabels() {
    // Add ARIA labels to form controls without labels
    const formControls = document.querySelectorAll('input, select, textarea');
    formControls.forEach(control => {
        if (!control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby')) {
            const label = control.closest('.form-group')?.querySelector('label');
            if (label) {
                control.setAttribute('aria-labelledby', label.id || generateId('label'));
                if (!label.id) label.id = control.getAttribute('aria-labelledby');
            }
        }
    });

    // Add ARIA labels to navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            const text = link.textContent.trim();
            link.setAttribute('aria-label', `Navigate to ${text} section`);
        }
    });
}

/**
 * Initialize focus trap for modals and overlays
 */
function initFocusTrap() {
    const modals = document.querySelectorAll('[role="dialog"], .modal');
    
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                trapFocus(e, modal);
            }
        });
    });
}

/**
 * Trap focus within a container
 */
function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
}

/**
 * Close all open modals
 */
function closeAllModals() {
    const openModals = document.querySelectorAll('.modal.show, [role="dialog"][aria-hidden="false"]');
    openModals.forEach(modal => {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    });
}

/**
 * Close all open dropdowns
 */
function closeAllDropdowns() {
    const openDropdowns = document.querySelectorAll('.dropdown.show, [aria-expanded="true"]');
    openDropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
        dropdown.setAttribute('aria-expanded', 'false');
    });
}

/**
 * Generate unique ID for elements
 */
function generateId(prefix = 'element') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Initialize final accessibility enhancements
 */
function initFinalAccessibilityEnhancements() {
    // Add role and ARIA attributes to dynamically created elements
    enhanceDynamicContent();
    
    // Initialize text scaling support
    initTextScalingSupport();
}

/**
 * Enhance dynamically created content with proper ARIA attributes
 */
function enhanceDynamicContent() {
    // Observer for dynamically added content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    enhanceElementAccessibility(node);
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

/**
 * Enhance element accessibility
 */
function enhanceElementAccessibility(element) {
    // Add ARIA labels to buttons without text
    const buttons = element.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            const context = button.closest('[data-context]')?.dataset.context || 'action';
            button.setAttribute('aria-label', `${context} button`);
        }
    });
    
    // Add role to custom interactive elements
    const interactiveElements = element.querySelectorAll('[data-interactive]:not([role])');
    interactiveElements.forEach(el => {
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
    });
}

/**
 * Initialize text scaling support
 */
function initTextScalingSupport() {
    // Detect if user has increased text size
    const testElement = document.createElement('div');
    testElement.style.cssText = 'font-size: 1rem; position: absolute; visibility: hidden;';
    document.body.appendChild(testElement);
    
    const baseFontSize = parseFloat(window.getComputedStyle(testElement).fontSize);
    document.body.removeChild(testElement);
    
    if (baseFontSize > 16) {
        document.body.classList.add('large-text');
        // Adjust layout for larger text
        adjustLayoutForLargeText();
    }
}

/**
 * Adjust layout for large text
 */
function adjustLayoutForLargeText() {
    // Add CSS class to adjust spacing and layout
    const style = document.createElement('style');
    style.textContent = `
        .large-text .container { padding: 0 var(--space-4); }
        .large-text .btn { padding: var(--space-3) var(--space-6); }
        .large-text .form-select { min-height: 52px; }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        try {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Performance observer not supported
        }
    }
}

/**
 * Initialize cross-browser compatibility fixes
 */
function initCrossBrowserCompatibility() {
    // Fix for iOS Safari viewport height
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        window.addEventListener('resize', () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
}

// Export functions for potential use by other scripts
window.ChatGPTTutorial = {
    announceToScreenReader,
    handleError,
    updateActiveNavLink,
    assessHardwareCompatibility,
    initHardwareChecker,
    enhanceElementAccessibility
};
