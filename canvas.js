// Dramatic High-Impact Canvas - Replace your canvas.js

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
        this.time = 0;
        this.animationId = null;
        
        // Mouse tracking for magnetic effects
        this.mouse = { x: 0, y: 0, active: false, trail: [] };
        
        // Card tracking system
        this.cards = [];
        this.cardConnections = [];
        this.hoveredCard = null;
        this.clickedCard = null;
        
        // Dramatic effect systems
        this.electricArcs = [];
        this.magneticFields = [];
        this.explosionRings = [];
        this.dataVortex = [];
        this.lightningBolts = [];
        this.mouseTrail = [];
        this.pulseWaves = [];
        this.geometricBursts = [];
        
        // Visual intensity settings
        this.intensity = 0;
        this.targetIntensity = 0;
        
        this.init();
        this.animate();
        
        console.log('🔥 DRAMATIC CANVAS INITIALIZED - HIGH IMPACT MODE');
    }

    init() {
        this.resize();
        this.setupEventListeners();
        this.trackCards();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        // INTENSE MOUSE TRACKING
        document.addEventListener('mousemove', (e) => {
            const canvasRect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - canvasRect.left;
            this.mouse.y = e.clientY - canvasRect.top;
            this.mouse.active = true;
            
            // Add to mouse trail
            this.mouseTrail.push({
                x: this.mouse.x,
                y: this.mouse.y,
                life: 0,
                maxLife: 20,
                size: 8
            });
            
            // Limit trail length
            if (this.mouseTrail.length > 15) {
                this.mouseTrail.shift();
            }
            
            this.checkCardHovers(e);
            this.createMouseEffects();
        });
        
        // DRAMATIC CLICK EFFECTS
        document.addEventListener('click', (e) => {
            this.handleCardClick(e);
            this.createClickExplosion(this.mouse.x, this.mouse.y);
        });
        
        // Filter change effects
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                setTimeout(() => this.trackCards(), 100);
                this.createFilterChaos();
            }
        });
        
        // Mouse leave - reduce intensity
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.active = false;
            this.targetIntensity = 0.2;
        });
        
        this.canvas.addEventListener('mouseenter', () => {
            this.mouse.active = true;
            this.targetIntensity = 1.0;
        });
    }

    // CARD TRACKING WITH MAGNETIC FIELDS
    trackCards() {
        this.cards = [];
        const cardElements = document.querySelectorAll('.project-card');
        
        cardElements.forEach((cardEl, index) => {
            const rect = cardEl.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();
            
            const x = rect.left + rect.width / 2 - canvasRect.left;
            const y = rect.top + rect.height / 2 - canvasRect.top;
            
            if (x > -200 && x < this.width + 200 && y > -200 && y < this.height + 200) {
                this.cards.push({
                    id: index,
                    x: x,
                    y: y,
                    width: rect.width,
                    height: rect.height,
                    element: cardEl,
                    category: cardEl.getAttribute('data-category'),
                    hovered: false,
                    energy: 0,
                    pulsePhase: Math.random() * Math.PI * 2,
                    magneticField: 0,
                    vortexAngle: 0
                });
            }
        });
        
        this.createBoldConnections();
        console.log(`🎯 Tracking ${this.cards.length} cards with DRAMATIC EFFECTS`);
    }

    // BOLD HIGH-CONTRAST CONNECTIONS
    createBoldConnections() {
        this.cardConnections = [];
        
        for (let i = 0; i < this.cards.length; i++) {
            for (let j = i + 1; j < this.cards.length; j++) {
                const cardA = this.cards[i];
                const cardB = this.cards[j];
                
                const distance = Math.sqrt((cardA.x - cardB.x) ** 2 + (cardA.y - cardB.y) ** 2);
                const sameCategory = cardA.category === cardB.category;
                
                if (sameCategory || distance < 400) {
                    this.cardConnections.push({
                        cardA: cardA,
                        cardB: cardB,
                        distance: distance,
                        strength: sameCategory ? 1.0 : Math.max(0, 1 - distance / 400),
                        thickness: sameCategory ? 6 : 3,
                        pulsePhase: Math.random() * Math.PI * 2,
                        active: false,
                        electricIntensity: 0
                    });
                }
            }
        }
    }

    checkCardHovers(e) {
        const canvasRect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;
        
        this.hoveredCard = null;
        
        this.cards.forEach(card => {
            const distance = Math.sqrt((mouseX - card.x) ** 2 + (mouseY - card.y) ** 2);
            const wasHovered = card.hovered;
            card.hovered = distance < Math.max(card.width, card.height) / 2 + 50; // Larger hover zone
            
            if (card.hovered) {
                this.hoveredCard = card;
                card.energy = Math.min(100, card.energy + 8);
                card.magneticField = Math.min(80, card.magneticField + 6);
                
                if (!wasHovered) {
                    this.createDramaticHoverEffect(card);
                }
            } else {
                card.energy = Math.max(0, card.energy - 3);
                card.magneticField = Math.max(0, card.magneticField - 2);
            }
        });
        
        // Update target intensity based on hover state
        this.targetIntensity = this.hoveredCard ? 1.5 : (this.mouse.active ? 1.0 : 0.3);
    }

    handleCardClick(e) {
        if (this.hoveredCard) {
            this.clickedCard = this.hoveredCard;
            this.createMassiveClickEffect(this.hoveredCard);
        }
    }

    // DRAMATIC EFFECT CREATORS
    createMouseEffects() {
        if (!this.mouse.active) return;
        
        // Create lightning to nearby cards
        this.cards.forEach(card => {
            const distance = Math.sqrt((this.mouse.x - card.x) ** 2 + (this.mouse.y - card.y) ** 2);
            if (distance < 200 && Math.random() < 0.03) {
                this.createLightningBolt(this.mouse.x, this.mouse.y, card.x, card.y);
            }
        });
    }

    createDramaticHoverEffect(card) {
        // Massive explosion rings
        for (let i = 0; i < 5; i++) {
            this.explosionRings.push({
                x: card.x,
                y: card.y,
                radius: 0,
                maxRadius: 80 + i * 30,
                thickness: 8 - i,
                opacity: 0.8,
                life: 0,
                maxLife: 40 + i * 10,
                speed: 3 + i * 0.5
            });
        }
        
        // Data vortex around card
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            this.dataVortex.push({
                centerX: card.x,
                centerY: card.y,
                angle: angle,
                radius: 60,
                speed: 0.1,
                life: 0,
                maxLife: 80,
                size: 4,
                data: Math.random() > 0.5 ? '1' : '0'
            });
        }
        
        // Pulse waves
        this.pulseWaves.push({
            x: card.x,
            y: card.y,
            radius: 0,
            maxRadius: 150,
            thickness: 12,
            opacity: 0.6,
            life: 0,
            maxLife: 30
        });
    }

    createMassiveClickEffect(card) {
        // HUGE geometric burst
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            this.geometricBursts.push({
                x: card.x,
                y: card.y,
                angle: angle,
                length: 0,
                maxLength: 120,
                thickness: 8,
                opacity: 0.9,
                life: 0,
                maxLife: 25,
                speed: 6
            });
        }
        
        // Electric arcs to all connected cards
        this.cardConnections.forEach(connection => {
            if (connection.cardA === card || connection.cardB === card) {
                const targetCard = connection.cardA === card ? connection.cardB : connection.cardA;
                this.createElectricArc(card.x, card.y, targetCard.x, targetCard.y);
            }
        });
        
        // Screen shake effect (metaphorically)
        this.intensity = 2.0;
    }

    createClickExplosion(x, y) {
        // Massive click explosion at mouse position
        for (let i = 0; i < 6; i++) {
            this.explosionRings.push({
                x: x,
                y: y,
                radius: 0,
                maxRadius: 100 + i * 40,
                thickness: 10 - i,
                opacity: 0.7,
                life: 0,
                maxLife: 35 + i * 8,
                speed: 4 + i * 0.8
            });
        }
    }

    createLightningBolt(x1, y1, x2, y2) {
        this.lightningBolts.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            segments: this.generateLightningPath(x1, y1, x2, y2),
            opacity: 0.8,
            life: 0,
            maxLife: 8,
            thickness: 3
        });
    }

    generateLightningPath(x1, y1, x2, y2) {
        const segments = [];
        const numSegments = 8;
        
        for (let i = 0; i <= numSegments; i++) {
            const t = i / numSegments;
            const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 40 * (1 - Math.abs(t - 0.5) * 2);
            const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 40 * (1 - Math.abs(t - 0.5) * 2);
            segments.push({ x, y });
        }
        
        return segments;
    }

    createElectricArc(x1, y1, x2, y2) {
        this.electricArcs.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            controlPoints: this.generateArcPath(x1, y1, x2, y2),
            opacity: 0.9,
            life: 0,
            maxLife: 15,
            thickness: 5,
            energy: 1.0
        });
    }

    generateArcPath(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 100;
        const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 100;
        return [{ x: x1, y: y1 }, { x: midX, y: midY }, { x: x2, y: y2 }];
    }

    createFilterChaos() {
        // Total visual chaos when filtering
        for (let i = 0; i < 15; i++) {
            this.explosionRings.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 0,
                maxRadius: 60 + Math.random() * 80,
                thickness: 6,
                opacity: 0.6,
                life: 0,
                maxLife: 30,
                speed: 4
            });
        }
        
        this.intensity = 2.5;
    }

    // DRAMATIC RENDERERS
    renderBoldConnections() {
        this.cardConnections.forEach(connection => {
            connection.pulsePhase += 0.15;
            
            const cardAActive = connection.cardA.hovered || connection.cardA.energy > 30;
            const cardBActive = connection.cardB.hovered || connection.cardB.energy > 30;
            connection.active = cardAActive || cardBActive;
            
            if (connection.active || connection.strength > 0.4) {
                // BOLD PULSING LINE
                const pulseIntensity = Math.sin(connection.pulsePhase) * 0.5 + 0.5;
                const lineThickness = connection.thickness + (connection.active ? pulseIntensity * 4 : 0);
                const opacity = connection.strength * 0.6 + (connection.active ? 0.4 : 0);
                
                this.ctx.globalAlpha = opacity * this.intensity;
                this.ctx.strokeStyle = '#000000'; // PURE BLACK
                this.ctx.lineWidth = lineThickness;
                this.ctx.lineCap = 'round';
                
                // Add glow effect for active connections
                if (connection.active) {
                    this.ctx.shadowColor = '#333333';
                    this.ctx.shadowBlur = 8;
                }
                
                this.ctx.beginPath();
                this.ctx.moveTo(connection.cardA.x, connection.cardA.y);
                this.ctx.lineTo(connection.cardB.x, connection.cardB.y);
                this.ctx.stroke();
                
                this.ctx.shadowBlur = 0;
                
                // BOLD DATA FLOW INDICATORS
                if (connection.active) {
                    const flowPos = (Math.sin(connection.pulsePhase * 0.8) + 1) / 2;
                    const flowX = connection.cardA.x + (connection.cardB.x - connection.cardA.x) * flowPos;
                    const flowY = connection.cardA.y + (connection.cardB.y - connection.cardA.y) * flowPos;
                    
                    this.ctx.globalAlpha = 0.8 * this.intensity;
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fillRect(flowX - 4, flowY - 4, 8, 8);
                }
            }
        });
    }

    renderMouseTrail() {
        this.mouseTrail = this.mouseTrail.filter(trail => {
            trail.life++;
            const progress = trail.life / trail.maxLife;
            const opacity = (1 - progress) * 0.8;
            const size = trail.size * (1 - progress * 0.5);
            
            if (trail.life < trail.maxLife) {
                this.ctx.globalAlpha = opacity * this.intensity;
                this.ctx.fillStyle = '#000000';
                this.ctx.beginPath();
                this.ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                return true;
            }
            return false;
        });
    }

    renderExplosionRings() {
        this.explosionRings = this.explosionRings.filter(ring => {
            ring.life++;
            ring.radius += ring.speed;
            
            const progress = ring.life / ring.maxLife;
            ring.opacity = 0.9 * (1 - progress);
            
            if (ring.life < ring.maxLife) {
                this.ctx.globalAlpha = ring.opacity * this.intensity;
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = ring.thickness;
                this.ctx.beginPath();
                this.ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                
                return true;
            }
            return false;
        });
    }

    renderLightningBolts() {
        this.lightningBolts = this.lightningBolts.filter(bolt => {
            bolt.life++;
            const progress = bolt.life / bolt.maxLife;
            bolt.opacity = 0.9 * (1 - progress);
            
            if (bolt.life < bolt.maxLife) {
                this.ctx.globalAlpha = bolt.opacity * this.intensity;
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = bolt.thickness;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                
                this.ctx.beginPath();
                bolt.segments.forEach((segment, i) => {
                    if (i === 0) {
                        this.ctx.moveTo(segment.x, segment.y);
                    } else {
                        this.ctx.lineTo(segment.x, segment.y);
                    }
                });
                this.ctx.stroke();
                
                return true;
            }
            return false;
        });
    }

    renderGeometricBursts() {
        this.geometricBursts = this.geometricBursts.filter(burst => {
            burst.life++;
            burst.length += burst.speed;
            
            const progress = burst.life / burst.maxLife;
            burst.opacity = 0.9 * (1 - progress);
            
            if (burst.life < burst.maxLife) {
                const endX = burst.x + Math.cos(burst.angle) * burst.length;
                const endY = burst.y + Math.sin(burst.angle) * burst.length;
                
                this.ctx.globalAlpha = burst.opacity * this.intensity;
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = burst.thickness;
                this.ctx.lineCap = 'round';
                
                this.ctx.beginPath();
                this.ctx.moveTo(burst.x, burst.y);
                this.ctx.lineTo(endX, endY);
                this.ctx.stroke();
                
                return true;
            }
            return false;
        });
    }

    renderCards() {
        this.cards.forEach(card => {
            card.pulsePhase += 0.1;
            card.vortexAngle += 0.05;
            
            // BOLD ENERGY HALOS
            if (card.energy > 20) {
                const pulseSize = Math.sin(card.pulsePhase) * 10 + 30;
                const radius = (card.energy / 100) * 60 + pulseSize;
                
                this.ctx.globalAlpha = (card.energy / 100) * 0.6 * this.intensity;
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 6;
                this.ctx.beginPath();
                this.ctx.arc(card.x, card.y, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                
                // Inner pulse
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(card.x, card.y, radius * 0.6, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            // MAGNETIC FIELD VISUALIZATION
            if (card.magneticField > 10) {
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2 + card.vortexAngle;
                    const distance = 40 + (card.magneticField / 80) * 30;
                    const x = card.x + Math.cos(angle) * distance;
                    const y = card.y + Math.sin(angle) * distance;
                    
                    this.ctx.globalAlpha = (card.magneticField / 80) * 0.7 * this.intensity;
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fillRect(x - 3, y - 3, 6, 6);
                }
            }
        });
    }

    // MAIN ANIMATION LOOP
    animate() {
        this.time++;
        
        // Smooth intensity transitions
        this.intensity += (this.targetIntensity - this.intensity) * 0.1;
        
        // Re-track cards every 20 frames for performance
        if (this.time % 20 === 0) {
            this.trackCards();
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = 1;
        
        // Render all dramatic systems
        this.renderBoldConnections();
        this.renderCards();
        this.renderMouseTrail();
        this.renderExplosionRings();
        this.renderLightningBolts();
        this.renderGeometricBursts();
        
        // STATUS DISPLAY
        this.ctx.globalAlpha = 0.4;
        this.ctx.font = '10px "JetBrains Mono", monospace';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(`[DRAMATIC_MODE] INTENSITY: ${(this.intensity * 100).toFixed(0)}%`, 20, this.height - 15);
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateWithFilteredProjects(projects) {
        setTimeout(() => {
            this.trackCards();
            this.createFilterChaos();
        }, 100);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resize);
        console.log('🔥 DRAMATIC CANVAS DESTROYED');
    }
}

window.DataCanvas = DataCanvas;