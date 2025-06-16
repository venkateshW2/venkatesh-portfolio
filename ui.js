// ui.js - UI Interactions and DOM Management (Clean Version)

class UIManager {
    constructor() {
        this.currentFilter = 'all';
        this.filteredProjects = [];
        this.elements = {};
        this.mobileMenuOpen = false;
        this.initialized = false;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    // Cache DOM elements
    initializeElements() {
        this.elements = {
            projectsContainer: document.getElementById('projects-container'),
            dataStream: document.getElementById('data-stream'),
            loading: document.getElementById('loading'),
            mainContainer: document.getElementById('main-container')
        };

        console.log('UI elements cached');
    }

    // Set up all event listeners using proper event delegation
    setupEventListeners() {
        // Use event delegation on document body for all clicks
        document.body.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target);

            // Category button clicks
            if (e.target.classList.contains('category-btn')) {
                e.preventDefault();
                this.handleCategoryClick(e);
                return;
            }

            // Mobile menu toggle
            if (e.target.closest('#mobile-menu-toggle')) {
                e.preventDefault();
                this.toggleMobileMenu();
                return;
            }

            // Mobile overlay clicks
            if (e.target.id === 'mobile-overlay') {
                this.closeMobileMenu();
                return;
            }

            // Credentials link
            if (e.target.id === 'credentials-link') {
                e.preventDefault();
                this.openCredentialsModal(e);
                return;
            }

            // Modal close button
            if (e.target.id === 'modal-close') {
                this.closeCredentialsModal();
                return;
            }

            // Modal background click
            if (e.target.id === 'credentials-modal') {
                this.closeCredentialsModal();
                return;
            }

            // Sidebar section headers
            if (e.target.closest('.sidebar-section-header')) {
                const section = e.target.closest('.sidebar-section');
                if (section && section.classList.contains('collapsed')) {
                    section.classList.remove('collapsed');
                } else if (section) {
                    section.classList.add('collapsed');
                }
                console.log('Sidebar section toggled');
                return;
            }

            // Project card clicks (but not on links)
            if (e.target.closest('.project-card') && !e.target.closest('a')) {
                this.handleProjectCardClick(e);
                return;
            }
        });

        this.setupSmoothScrolling();
        console.log('Event listeners set up with delegation');
    }

    // Handle category button clicks
    handleCategoryClick(e) {
        e.preventDefault();
        console.log('=== CATEGORY CLICK HANDLER ===');
        console.log('Button clicked:', e.target.textContent);
        console.log('Data filter:', e.target.getAttribute('data-filter'));

        // Update active state for all category buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        console.log('Found category buttons:', categoryButtons.length);
        
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Get filter type and update projects
        const filterType = e.target.getAttribute('data-filter');
        this.currentFilter = filterType;
        console.log('Filtering by:', filterType);
        
        this.filterProjects(filterType);
        this.closeMobileMenu();
    }

    // Filter and display projects
    filterProjects(filterType) {
        console.log('Filtering projects by:', filterType);

        let projects;
        if (filterType === 'all') {
            projects = window.dataManager.getAllProjects();
        } else {
            projects = window.dataManager.filterByCategory(filterType);
        }

        console.log('Filtered projects:', projects.length);
        this.filteredProjects = projects;
        this.renderProjects(projects);

        // Update canvas with filtered projects if canvas is available
        if (window.app && window.app.canvas && window.app.canvas.updateWithFilteredProjects) {
            window.app.canvas.updateWithFilteredProjects(projects);
        }
    }

    // Render projects to the DOM
    renderProjects(projects) {
        if (!this.elements.projectsContainer) {
            console.error('Projects container not found');
            return;
        }

        // Clear container
        this.elements.projectsContainer.innerHTML = '';

        if (projects.length === 0) {
            this.elements.projectsContainer.innerHTML = `
                <div class="no-projects">
                    <p>No projects found in this category.</p>
                </div>
            `;
            return;
        }

        // Create project cards and filter out broken ones
        let cardIndex = 0;
        projects.forEach((project) => {
            const card = this.createProjectCard(project, cardIndex);
            if (card) {
                this.elements.projectsContainer.appendChild(card);
                cardIndex++;
            }
        });

        console.log(`Rendered ${cardIndex} valid project cards out of ${projects.length} total projects`);
    }

    // Create individual project card
    // Updated createProjectCard function - Multiple Style Options

createProjectCard(project, index) {
    const card = document.createElement('div');
    
    // Choose your card style here:
    const CARD_STYLE = 'default'; // Options: 'default', 'text-only', 'minimal-icon', 'typography-focus'
    
    card.className = `project-card ${project.featured ? 'featured' : ''} ${CARD_STYLE}`;
    card.setAttribute('data-category', project.mappedCategory);
    card.style.animationDelay = `${index * 0.05}s`;

    // Generate category icon
    const categoryIcon = this.getCategoryIcon(project.mappedCategory);
    
    // Clean up data
    const cleanTitle = project.title || 'Untitled Project';
    const cleanRole = project.role || 'Sound Artist';
    const cleanDetails = project.details || 'Project details coming soon...';
    const cleanYear = project.year || new Date().getFullYear();

    // Skip broken cards
    if (cleanTitle.length > 100 || cleanTitle.includes('onload=') || cleanTitle.includes('http://')) {
        return null;
    }

    // Handle multiple categories
    const categories = Array.isArray(project.categories) ? project.categories : [project.category];
    const categoryDisplay = categories.join(' • ');

    // Different layouts based on style
    let cardHTML = '';

    switch(CARD_STYLE) {
        case 'text-only':
            cardHTML = `
                <div class="project-content">
                    <div class="project-year">${cleanYear}</div>
                    <h3 class="project-title">${cleanTitle}</h3>
                    <div class="project-role">${cleanRole}</div>
                    <div class="project-description">${cleanDetails}</div>
                    <div class="project-details">
                        ${project.collaboration ? `<div class="project-collaboration"><strong>Collaboration:</strong> ${project.collaboration}</div>` : ''}
                        ${project.technical ? `<div class="project-collaboration"><strong>Technical:</strong> ${project.technical}</div>` : ''}
                        <div class="project-links">
                            ${project.link && project.link !== '' ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                            ${project.video && project.video !== '' ? `<a href="${project.video}" target="_blank" class="project-link">Watch Video</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="expand-indicator">+</div>
            `;
            break;

        case 'minimal-icon':
            cardHTML = `
                <div class="project-image">
                    <div class="project-image-placeholder">${categoryIcon}</div>
                    <div class="project-category-badge">${project.mappedCategory.replace('-', ' ')}</div>
                </div>
                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-category">${categoryDisplay}</span>
                        <span class="project-year">${cleanYear}</span>
                    </div>
                    <h3 class="project-title">${cleanTitle}</h3>
                    <div class="project-role">${cleanRole}</div>
                    <div class="project-description">${cleanDetails}</div>
                    <div class="project-details">
                        ${project.collaboration ? `<div class="project-collaboration"><strong>Collaboration:</strong> ${project.collaboration}</div>` : ''}
                        ${project.technical ? `<div class="project-collaboration"><strong>Technical:</strong> ${project.technical}</div>` : ''}
                        <div class="project-links">
                            ${project.link && project.link !== '' ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                            ${project.video && project.video !== '' ? `<a href="${project.video}" target="_blank" class="project-link">Watch Video</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="expand-indicator">+</div>
            `;
            break;

        case 'typography-focus':
            cardHTML = `
                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-category">${categoryDisplay}</span>
                        <span class="project-year">${cleanYear}</span>
                    </div>
                    <h3 class="project-title">${cleanTitle}</h3>
                    <div class="project-role">${cleanRole}</div>
                    <div class="project-description">${cleanDetails}</div>
                    <div class="project-details">
                        ${project.collaboration ? `<div class="project-collaboration"><strong>Collaboration:</strong> ${project.collaboration}</div>` : ''}
                        ${project.technical ? `<div class="project-collaboration"><strong>Technical:</strong> ${project.technical}</div>` : ''}
                        <div class="project-links">
                            ${project.link && project.link !== '' ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                            ${project.video && project.video !== '' ? `<a href="${project.video}" target="_blank" class="project-link">Watch Video</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="expand-indicator">+</div>
            `;
            break;

        default: // 'default' with improved image handling
            const hasValidImage = project.image_url && 
                                 project.image_url !== '' && 
                                 project.image_url !== 'undefined' &&
                                 !project.image_url.includes('placeholder') &&
                                 project.image_url.startsWith('http');

            cardHTML = `
                <div class="project-image">
                    ${hasValidImage ? 
                        `<img src="${project.image_url}" alt="${cleanTitle}" loading="lazy">` :
                        `<div class="project-image-placeholder">${categoryIcon}</div>`
                    }
                    <div class="project-category-badge">${project.mappedCategory.replace('-', ' ')}</div>
                </div>
                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-category">${categoryDisplay}</span>
                        <span class="project-year">${cleanYear}</span>
                    </div>
                    <h3 class="project-title">${cleanTitle}</h3>
                    <div class="project-role">${cleanRole}</div>
                    <div class="project-description">${cleanDetails}</div>
                    <div class="project-details">
                        ${project.collaboration ? `<div class="project-collaboration"><strong>Collaboration:</strong> ${project.collaboration}</div>` : ''}
                        ${project.technical ? `<div class="project-collaboration"><strong>Technical:</strong> ${project.technical}</div>` : ''}
                        <div class="project-links">
                            ${project.link && project.link !== '' ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                            ${project.video && project.video !== '' ? `<a href="${project.video}" target="_blank" class="project-link">Watch Video</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="expand-indicator">+</div>
            `;
    }

    card.innerHTML = cardHTML;

    // Add image loading logic for default style
    if (CARD_STYLE === 'default') {
        const img = card.querySelector('img');
        if (img) {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.parentElement.innerHTML = `
                    <div class="project-image-placeholder">${categoryIcon}</div>
                    <div class="project-category-badge">${project.mappedCategory.replace('-', ' ')}</div>
                `;
            });
        }
    }

    return card;
}

    // Handle project card clicks
    handleProjectCardClick(e) {
        if (e.target.tagName === 'A') {
            console.log('Link clicked, not expanding card');
            return;
        }

        const card = e.target.closest('.project-card');
        if (card) {
            console.log('=== PROJECT CARD CLICK ===');
            console.log('Card found, toggling expanded state');
            card.classList.toggle('expanded');
            console.log('Card is now expanded:', card.classList.contains('expanded'));
        } else {
            console.log('No project card found in click target');
        }
    }

    // Get category icon
    getCategoryIcon(category) {
        const icons = {
            'sound-designer': '🎵',
            'music-producer': '🎹', 
            'film-mix': '🎬',
            'interactive-design': '🎮',
            'labs': '🧪'
        };
        return icons[category] || '🎵';
    }

    // Mobile menu functions
    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar && overlay) {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            sidebar.classList.toggle('show-mobile');
            overlay.classList.toggle('show');
            console.log('Mobile menu toggled:', this.mobileMenuOpen);
        }
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar && overlay) {
            this.mobileMenuOpen = false;
            sidebar.classList.remove('show-mobile');
            overlay.classList.remove('show');
            console.log('Mobile menu closed');
        }
    }

    // Credentials modal functions
    openCredentialsModal(e) {
        e.preventDefault();
        const modal = document.getElementById('credentials-modal');
        if (modal) {
            modal.classList.add('show');
            console.log('Credentials modal opened');
        }
    }

    closeCredentialsModal() {
        const modal = document.getElementById('credentials-modal');
        if (modal) {
            modal.classList.remove('show');
            console.log('Credentials modal closed');
        }
    }

    // Setup smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    // Data stream animation for hero section
    startDataStream() {
        const streams = [
            '01001000 01100101 01101100 01101100 01101111',
            '53 4f 55 4e 44 20 44 41 54 41',
            'freq: 440Hz | amp: 0.75 | phase: 0.33',
            'channels: 8 | sample_rate: 48000',
            'buffer_size: 512 | latency: 10.7ms'
        ];
        
        let currentIndex = 0;
        
        const updateStream = () => {
            if (this.elements.dataStream) {
                this.elements.dataStream.textContent = streams[currentIndex];
                currentIndex = (currentIndex + 1) % streams.length;
            }
        };

        updateStream();
        setInterval(updateStream, 3000);
    }

    // Show/hide loading screen
    showLoading() {
        if (this.elements.loading) {
            this.elements.loading.classList.remove('hidden');
        }
        if (this.elements.mainContainer) {
            this.elements.mainContainer.classList.add('hidden');
        }
    }

    hideLoading() {
        console.log('hideLoading called');
        const loading = document.getElementById('loading');
        const mainContainer = document.getElementById('main-container');
        
        if (loading) {
            loading.remove();
            console.log('Loading element completely removed from DOM');
        }
        
        if (mainContainer) {
            mainContainer.classList.remove('hidden');
            mainContainer.style.display = 'block';
            console.log('Main container shown');
        }
        
        const allLoadingElements = document.querySelectorAll('#loading, .loading');
        allLoadingElements.forEach(el => el.remove());
        
        console.log('All loading interference removed');
    }

    // Initialize UI with data
    initialize() {
        console.log('Initializing UI...');
        
        // Load and display all projects initially
        const allProjects = window.dataManager.getAllProjects();
        this.filteredProjects = allProjects;
        this.renderProjects(allProjects);

        // Start data stream animation
        this.startDataStream();

        // Mark as initialized
        this.initialized = true;
        console.log('UI initialized successfully');
    }
}

// Global UI manager instance
window.uiManager = new UIManager();
console.log('UIManager created and attached to window');