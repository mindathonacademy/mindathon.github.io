/* ============================================
   MINDATHON ACADEMY - INTERACTIVE SCRIPTS
   Version: 1.0
   ============================================ */

// ==================== PARTICLE SYSTEM ====================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();
        this.setupEvents();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 100);
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(0, 212, 255, 0.8)',
            'rgba(0, 245, 212, 0.8)',
            'rgba(123, 104, 238, 0.8)',
            'rgba(255, 255, 255, 0.5)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    setupEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    particle.vx -= (dx / distance) * force * 0.02;
                    particle.vy -= (dy / distance) * force * 0.02;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== SMOOTH SCROLL ====================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==================== NAVBAR CONTROLLER ====================
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.navToggle = document.getElementById('nav-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.onScroll());
        this.navToggle?.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });
    }
    
    onScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        this.updateActiveLink();
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(l => l.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    }
}

// ==================== COUNTDOWN TIMER ====================
class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        this.start();
    }
    
    start() {
        this.update();
        setInterval(() => this.update(), 1000);
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.elements.days.textContent = '00';
            this.elements.hours.textContent = '00';
            this.elements.minutes.textContent = '00';
            this.elements.seconds.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.elements.days.textContent = this.pad(days);
        this.elements.hours.textContent = this.pad(hours);
        this.elements.minutes.textContent = this.pad(minutes);
        this.elements.seconds.textContent = this.pad(seconds);
    }
    
    pad(num) {
        return num.toString().padStart(2, '0');
    }
}

// ==================== NUMBER COUNTER ANIMATION ====================
class NumberCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        this.observed = false;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observed) {
                    this.observed = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
}

// ==================== SCROLL REVEAL ANIMATION ====================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll(
            '.problem-card, .benefit-card, .founder-card, .event-detail-card, .about-visual, .about-content'
        );
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => el.classList.add('reveal'));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ==================== 3D TILT EFFECT ====================
class TiltEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.onMouseMove(e, element));
            element.addEventListener('mouseleave', (e) => this.onMouseLeave(e, element));
        });
    }
    
    onMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    onMouseLeave(e, element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// ==================== FORM HANDLER ====================
class FormHandler {
    constructor() {
        this.form = document.getElementById('registration-form');
        this.init();
    }
    
    init() {
        this.form?.addEventListener('submit', (e) => this.onSubmit(e));
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message
        this.showSuccess();
        
        // Reset form
        this.form.reset();
    }
    
    showSuccess() {
        const btn = this.form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Registered Successfully!</span>';
        btn.style.background = 'linear-gradient(135deg, #00f5d4, #00d4ff)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    }
}

// ==================== MAGNETIC BUTTON EFFECT ====================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-primary');
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.onMouseMove(e, btn));
            btn.addEventListener('mouseleave', (e) => this.onMouseLeave(e, btn));
        });
    }
    
    onMouseMove(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    }
    
    onMouseLeave(e, btn) {
        btn.style.transform = 'translate(0, 0)';
    }
}

// ==================== TYPING EFFECT ====================
class TypingEffect {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = wait;
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="typing">${this.txt}</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==================== CURSOR GLOW EFFECT ====================
class CursorGlow {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-glow';
        this.cursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(this.cursor);
        
        this.addStyles();
        this.init();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cursor-glow {
                position: fixed;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
            }
            
            .cursor-dot {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 8px;
                height: 8px;
                background: var(--accent-cyan);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
            }
            
            @media (max-width: 768px) {
                .cursor-glow { display: none; }
            }
        `;
        document.head.appendChild(style);
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
    }
}

// ==================== PARALLAX FLOATING SHAPES ====================
class ParallaxShapes {
    constructor() {
        this.shapes = document.querySelectorAll('.shape');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }
    
    onScroll() {
        const scrollY = window.pageYOffset;
        
        this.shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    onMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        this.shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

// ==================== PRELOADER ====================
class Preloader {
    constructor() {
        this.createPreloader();
    }
    
    createPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="preloader-text">MINDATHON</div>
                <div class="preloader-bar">
                    <div class="preloader-progress"></div>
                </div>
            </div>
        `;
        document.body.prepend(preloader);
        
        this.addStyles();
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => preloader.remove(), 500);
            }, 1000);
        });
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0e27;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            #preloader.loaded {
                opacity: 0;
                visibility: hidden;
            }
            
            .preloader-content {
                text-align: center;
            }
            
            .preloader-logo {
                width: 100px;
                height: 100px;
                background: linear-gradient(135deg, #00d4ff 0%, #00f5d4 50%, #7b68ee 100%);
                border-radius: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: #0a0e27;
                margin: 0 auto 1.5rem;
                animation: pulse-preloader 1.5s infinite ease-in-out;
            }
            
            @keyframes pulse-preloader {
                0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(0, 212, 255, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(0, 212, 255, 0.8); }
            }
            
            .preloader-text {
                font-family: 'Orbitron', sans-serif;
                font-size: 2rem;
                font-weight: 700;
                letter-spacing: 4px;
                color: #ffffff;
                margin-bottom: 2rem;
            }
            
            .preloader-bar {
                width: 200px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto;
            }
            
            .preloader-progress {
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #00d4ff, #00f5d4, #7b68ee);
                animation: progress 1s ease-in-out infinite;
                transform-origin: left;
            }
            
            @keyframes progress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize preloader
    new Preloader();
    
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
    
    // Initialize all modules
    new SmoothScroll();
    new NavbarController();
    new NumberCounter();
    new ScrollReveal();
    new TiltEffect();
    new FormHandler();
    new MagneticButtons();
    new CursorGlow();
    new ParallaxShapes();
    
    // Initialize countdown timer (Event date: March 15, 2026, 4:00 PM)
    new CountdownTimer('March 15, 2026 16:00:00');
    
    console.log('🧠 Mindathon Academy - All systems initialized!');
});

// ==================== BONUS: EASTER EGG ====================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});
