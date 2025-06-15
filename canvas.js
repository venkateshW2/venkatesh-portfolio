// canvas.js - Enhanced Background Canvas Effects

class DataCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn('Canvas element not found:', canvasId);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.particles = [];
        this.dataStreams = [];
        this.glitchTitles = [];
        this.bioData = [];
        this.time = 0;
        this.animationId = null;
        
        this.init();
        this.animate();
        console.log('Enhanced DataCanvas initialized');
    }

    init() {
        this.resize();
        this.createParticles();
        this.createDataStreams();
        this.createGlitchTitles();
        this.createBioData();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        // Set canvas size accounting for device pixel ratio
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        // Recreate elements if canvas was resized significantly
        if (this.particles.length > 0) {
            this.createParticles();
            this.createDataStreams();
            this.createGlitchTitles();
            this.createBioData();
        }
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.min(40, Math.floor(this.width * this.height / 12000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.2 + 0.05,
                life: Math.random() * 1000
            });
        }
    }

    createDataStreams() {
        this.dataStreams = [];
        const streamCount = Math.min(6, Math.floor(this.width / 250));
        
        for (let i = 0; i < streamCount; i++) {
            this.dataStreams.push({
                x: Math.random() * this.width,
                y: -50,
                speed: Math.random() * 1 + 0.3,
                data: this.generateTechnicalData(),
                opacity: Math.random() * 0.2 + 0.05,
                resetTime: Math.random() * 8000
            });
        }
    }

    createGlitchTitles() {
        this.glitchTitles = [];
        
        // Get project titles from data manager if available
        const projects = window.dataManager?.getAllProjects() || [];
        const featuredProjects = projects.filter(p => p.featured).slice(0, 6);
        
        if (featuredProjects.length === 0) {
            // Fallback titles if no data loaded yet
            const fallbackTitles = [
                'SOUND_ARTIST',
                'INTERACTIVE_DESIGN', 
                'SPATIAL_AUDIO',
                'DATA_SONIFICATION',
                'MUMBAI_INDIA'
            ];
            
            fallbackTitles.forEach((title, index) => {
                this.glitchTitles.push({
                    text: title,
                    x: Math.random() * (this.width - 300),
                    y: 150 + (index * 60),
                    opacity: 0,
                    glitchIntensity: 0,
                    life: Math.random() * 2000,
                    fadeDirection: 1,
                    size: 11 + Math.random() * 3
                });
            });
        } else {
            featuredProjects.forEach((project, index) => {
                this.glitchTitles.push({
                    text: project.title.toUpperCase().replace(/\s+/g, '_'),
                    x: Math.random() * (this.width - 300),
                    y: 150 + (index * 70),
                    opacity: 0,
                    glitchIntensity: 0,
                    life: Math.random() * 2000,
                    fadeDirection: 1,
                    size: 11 + Math.random() * 3
                });
            });
        }
    }

    createBioData() {
        this.bioData = [
            { text: 'VENKATESH_IYER', type: 'name', x: 50, y: 50 },
            { text: 'SOUND_ARTIST', type: 'role', x: 50, y: 70 },
            { text: 'MA_AUDIO_TECH_LONDON_2008', type: 'edu', x: 50, y: 90 },
            { text: 'BSC_PHYSICS_MUMBAI_2004', type: 'edu', x: 50, y: 110 },
            { text: 'MUMBAI_INDIA', type: 'location', x: 50, y: 130 },
            { text: '20+_YEARS_EXPERIENCE', type: 'exp', x: 50, y: 150 },
            { text: 'INTERACTIVE_AUDIO_SYSTEMS', type: 'tech', x: 50, y: 180 },
            { text: 'SPATIAL_AUDIO_DESIGN', type: 'tech', x: 50, y: 200 },
            { text: 'BRAINWAVE_SONIFICATION', type: 'tech', x: 50, y: 220 }
        ];

        this.bioData.forEach(item => {
            item.opacity = Math.random() * 0.3 + 0.1;
            item.life = Math.random() * 1000;
            item.originalX = item.x;
        });
    }

    generateTechnicalData() {
        const techData = [
            'MAX/MSP_PROCESSING',
            'EEG_INTERFACE_ACTIVE', 
            'SPATIAL_AUDIO_7.1',
            'SAMPLE_RATE_48000',
            'BUFFER_SIZE_512',
            'LATENCY_10.7MS',
            'CHANNELS_8_ACTIVE',
            'FREQ_440HZ_REF',
            'AMPLITUDE_0.75',
            'PHASE_COHERENT'
        ];
        
        return techData[Math.floor(Math.random() * techData.length)];
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life += 1;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.width) {
                particle.vx *= -0.7;
                particle.x = Math.max(0, Math.min(this.width, particle.x));
            }
            if (particle.y <= 0 || particle.y >= this.height) {
                particle.vy *= -0.7;
                particle.y = Math.max(0, Math.min(this.height, particle.y));
            }

            // Add some randomness
            particle.vx += (Math.random() - 0.5) * 0.005;
            particle.vy += (Math.random() - 0.5) * 0.005;

            // Limit velocity
            const maxVel = 0.5;
            particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
            particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));

            // Calculate opacity
            const lifeOpacity = Math.sin(particle.life * 0.01) * 0.5 + 0.5;
            const finalOpacity = particle.opacity * lifeOpacity * 0.3;

            // Draw particle
            this.ctx.fillStyle = `rgba(102, 102, 102, ${finalOpacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawDataStreams() {
        this.ctx.font = '9px JetBrains Mono, monospace';
        
        this.dataStreams.forEach(stream => {
            stream.y += stream.speed;
            stream.resetTime -= 16;

            if (stream.y > this.height + 100 || stream.resetTime <= 0) {
                stream.y = -50;
                stream.x = Math.random() * this.width;
                stream.data = this.generateTechnicalData();
                stream.resetTime = Math.random() * 8000 + 4000;
                stream.opacity = Math.random() * 0.2 + 0.05;
            }

            this.ctx.fillStyle = `rgba(102, 102, 102, ${stream.opacity})`;
            this.ctx.fillText(stream.data, stream.x, stream.y);
        });
    }

    drawGlitchTitles() {
        this.ctx.font = 'bold 11px JetBrains Mono, monospace';
        
        this.glitchTitles.forEach(title => {
            title.life += 16;
            
            // Fade in/out cycle
            if (title.life > 4000) {
                title.fadeDirection = -1;
            } else if (title.life > 8000) {
                title.life = 0;
                title.fadeDirection = 1;
                title.x = Math.random() * (this.width - 200);
            }

            title.opacity += title.fadeDirection * 0.002;
            title.opacity = Math.max(0, Math.min(0.4, title.opacity));

            // Glitch effect intensity
            title.glitchIntensity = Math.random() > 0.95 ? Math.random() * 3 : 0;

            if (title.opacity > 0) {
                // Main text
                this.ctx.fillStyle = `rgba(102, 102, 102, ${title.opacity})`;
                this.ctx.fillText(title.text, title.x, title.y);

                // Glitch layers
                if (title.glitchIntensity > 0) {
                    // Red glitch
                    this.ctx.fillStyle = `rgba(255, 0, 0, ${title.opacity * 0.6})`;
                    this.ctx.fillText(
                        title.text, 
                        title.x + title.glitchIntensity, 
                        title.y + title.glitchIntensity * 0.5
                    );

                    // Blue glitch
                    this.ctx.fillStyle = `rgba(0, 100, 255, ${title.opacity * 0.4})`;
                    this.ctx.fillText(
                        title.text, 
                        title.x - title.glitchIntensity, 
                        title.y - title.glitchIntensity * 0.3
                    );
                }
            }
        });
    }

    drawBioData() {
        this.ctx.font = '8px JetBrains Mono, monospace';
        
        this.bioData.forEach(item => {
            item.life += 1;
            
            // Subtle animation
            item.x = item.originalX + Math.sin(item.life * 0.02) * 2;
            
            // Opacity cycling
            const cycleOpacity = Math.sin(item.life * 0.01) * 0.1 + 0.15;
            
            this.ctx.fillStyle = `rgba(102, 102, 102, ${cycleOpacity})`;
            this.ctx.fillText(item.text, item.x, item.y);
        });
    }

    drawGrid() {
        const gridSize = 80;
        const opacity = 0.015;
        
        this.ctx.strokeStyle = `rgba(102, 102, 102, ${opacity})`;
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x < this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

        // Horizontal lines  
        for (let y = 0; y < this.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }

    drawDataPoints() {
        // Occasional data visualization points
        if (Math.random() < 0.015) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const size = Math.random() * 2 + 0.5;
            
            this.ctx.fillStyle = 'rgba(0, 102, 255, 0.08)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update time
        this.time += 0.01;

        // Draw all elements
        this.drawGrid();
        this.drawParticles();
        this.drawDataStreams();
        this.drawGlitchTitles();
        this.drawBioData();
        this.drawDataPoints();

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // Public methods
    start() {
        if (!this.animationId) {
            this.animate();
        }
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Refresh glitch titles with new project data
    refreshTitles() {
        this.createGlitchTitles();
    }

    // Update canvas when projects are filtered
    updateWithFilteredProjects(projects) {
        // Update glitch titles with filtered projects
        this.glitchTitles = [];
        const displayProjects = projects.slice(0, 6);
        
        displayProjects.forEach((project, index) => {
            this.glitchTitles.push({
                text: project.title.toUpperCase().replace(/\s+/g, '_'),
                x: Math.random() * (this.width - 300),
                y: 150 + (index * 70),
                opacity: 0,
                glitchIntensity: Math.random() * 2, // Start with some glitch
                life: Math.random() * 1000,
                fadeDirection: 1,
                size: 11 + Math.random() * 3
            });
        });
    }

    destroy() {
        this.stop();
        window.removeEventListener('resize', this.resize);
        console.log('Enhanced DataCanvas destroyed');
    }
}

window.DataCanvas = DataCanvas;