// main.js - Main Application Controller

class App {
    constructor() {
        this.canvas = null;
        this.initialized = false;
    }

    // Initialize the entire application
    async init() {
        console.log('Starting application initialization...');

        try {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize data manager
            console.log('Loading project data...');
            window.dataManager.loadData();

            // Initialize UI manager
            console.log('Setting up UI...');
            window.uiManager.initialize();

            // Hide loading screen immediately after UI init
            console.log('Hiding loading screen immediately...');
            this.hideLoadingScreen();
            
            // Initialize canvas after a brief moment for DOM to settle
            setTimeout(() => {
                this.initCanvas();
            }, 50);

            this.initialized = true;
            console.log('Application initialized successfully');

        } catch (error) {
            console.error('Error initializing application:', error);
            this.handleInitError(error);
        }
    }

    // Initialize the background canvas
    initCanvas() {
        try {
            this.canvas = new DataCanvas('data-canvas');
            console.log('Canvas initialized');
        } catch (error) {
            console.warn('Canvas initialization failed:', error);
            // Continue without canvas - not critical for functionality
        }
    }

    // Hide the loading screen
    hideLoadingScreen() {
        console.log('Attempting to hide loading screen...');
        
        // Immediately hide loading screen without delay
        this.forceHideLoading();
        
        // Also try UI manager method if available
        if (window.uiManager) {
            window.uiManager.hideLoading();
        }
    }

    // Force hide loading screen (more aggressive)
    forceHideLoading() {
        console.log('Force hiding loading screen...');
        
        const loading = document.getElementById('loading');
        const mainContainer = document.getElementById('main-container');
        
        if (loading) {
            // Completely remove from DOM instead of just hiding
            loading.remove();
            console.log('Loading screen completely removed from DOM');
        }
        
        if (mainContainer) {
            mainContainer.classList.remove('hidden');
            mainContainer.style.display = 'block';
            mainContainer.style.visibility = 'visible';
            mainContainer.style.pointerEvents = 'auto';
            console.log('Main container force shown');
        }
        
        // Remove any other loading elements that might exist
        const allLoadingElements = document.querySelectorAll('.loading, [id*="loading"], [class*="loading"]');
        allLoadingElements.forEach(el => {
            if (el.id !== 'main-container') {
                el.remove();
            }
        });
        
        console.log('All loading interference completely eliminated');
    }

    // Handle initialization errors
    handleInitError(error) {
        console.error('Application failed to initialize:', error);
        
        // Show error message to user
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="text-align: center; color: #999;">
                    <p>Error loading portfolio</p>
                    <p style="font-size: 10px; margin-top: 10px;">Please refresh the page</p>
                </div>
            `;
            // Make sure loading screen is visible for error display
            loading.style.display = 'flex';
            loading.style.opacity = '1';
            loading.style.pointerEvents = 'auto';
            loading.classList.remove('hidden');
        }
    }

    // Cleanup when page is unloaded
    destroy() {
        if (this.canvas) {
            this.canvas.destroy();
        }
        console.log('Application cleaned up');
    }
}

// Global application instance
window.app = new App();

// Start the application when the script loads
window.app.init();

// Backup initialization on window load
window.addEventListener('load', () => {
    console.log('Window fully loaded - running backup initialization');
    
    // Force hide any remaining loading screens
    window.app.forceHideLoading();
    
    // Ensure UI is initialized
    if (window.uiManager && !window.uiManager.initialized) {
        console.log('Running backup UI initialization');
        window.uiManager.initialize();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    window.app.destroy();
});

// Handle any uncaught errors
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
});

// Debug helpers and click testing
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || true) {
    // Add global click listener for debugging
    document.addEventListener('click', (e) => {
        console.log('Global click detected on:', e.target.tagName, e.target.className, e.target.id);
    });

    window.debug = {
        dataManager: () => window.dataManager,
        uiManager: () => window.uiManager,
        app: () => window.app,
        projects: () => window.dataManager?.getAllProjects(),
        filterProjects: (category) => window.uiManager?.filterProjects(category),
        stats: () => window.dataManager?.getStats(),
        testClick: (selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.click();
                console.log('Clicked element:', element);
            } else {
                console.log('Element not found:', selector);
            }
        },
        forceHideLoading: () => {
            window.app.forceHideLoading();
        },
        checkLoading: () => {
            const allLoadingElements = document.querySelectorAll('#loading, .loading, [class*="loading"], [id*="loading"]');
            console.log('Found loading elements:', allLoadingElements.length);
            allLoadingElements.forEach((el, index) => {
                console.log(`Loading element ${index}:`, {
                    id: el.id,
                    className: el.className,
                    display: window.getComputedStyle(el).display,
                    visibility: window.getComputedStyle(el).visibility,
                    pointerEvents: window.getComputedStyle(el).pointerEvents,
                    zIndex: window.getComputedStyle(el).zIndex,
                    position: window.getComputedStyle(el).position
                });
            });
            return allLoadingElements;
        }
    };
    
    console.log('Debug helpers available: window.debug');
    console.log('Test clicks with: debug.testClick(".category-btn")');
}