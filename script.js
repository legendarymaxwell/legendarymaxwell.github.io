// --- Mobile Menu ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// --- Typing Effect for Hero ---
const typedTextElement = document.getElementById('typed-text');
const textArray = ["PPSSPP emulation", "PS2 classics", "PS3 masterpieces", "PS4 epics", "PS5 next-gen"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = 100;
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// --- Modal Logic (Login & Signup) ---
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const authBtn = document.getElementById('auth-btn');

authBtn.addEventListener('click', (e) => { e.preventDefault(); loginModal.style.display = 'flex'; });
document.getElementById('close-login').onclick = () => loginModal.style.display = 'none';
document.getElementById('close-signup').onclick = () => signupModal.style.display = 'none';
document.getElementById('show-signup').onclick = (e) => { e.preventDefault(); loginModal.style.display = 'none'; signupModal.style.display = 'flex'; };
document.getElementById('show-login').onclick = (e) => { e.preventDefault(); signupModal.style.display = 'none'; loginModal.style.display = 'flex'; };
window.onclick = function(event) {
    if (event.target == loginModal) loginModal.style.display = 'none';
    if (event.target == signupModal) signupModal.style.display = 'none';
}

// --- Fake Auth System ---
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    localStorage.setItem('maxwell_gamer_user', username);
    localStorage.setItem('maxwell_gamer_pass', password);
    alert('Account created! Welcome, ' + username + '!');
    signupModal.style.display = 'none';
    updateNavForLoggedInUser(username);
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (username === localStorage.getItem('maxwell_gamer_user') && password === localStorage.getItem('maxwell_gamer_pass')) {
        alert('Login successful!');
        loginModal.style.display = 'none';
        updateNavForLoggedInUser(username);
    } else { alert('Invalid credentials.'); }
});

function updateNavForLoggedInUser(name) {
    authBtn.textContent = 'Welcome, ' + name;
    authBtn.style.background = 'transparent';
    authBtn.style.border = '1px solid var(--neon-green)';
    authBtn.style.color = 'var(--neon-green)';
    authBtn.onclick = function(e) {
        e.preventDefault();
        localStorage.removeItem('maxwell_gamer_user');
        localStorage.removeItem('maxwell_gamer_pass');
        location.reload();
    };
}
window.onload = function() {
    const savedUser = localStorage.getItem('maxwell_gamer_user');
    if (savedUser) updateNavForLoggedInUser(savedUser);
};

// --- NEW: AI CHATBOT LOGIC ---
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Open/Close Chat
chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

// AI Brain
function getAIResponse(userText) {
    const text = userText.toLowerCase();
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) return "Hey there, gamer! Ready to talk about some epic games?";
    if (text.includes('ps2') || text.includes('playstation 2')) return "The PS2 is the GOAT! Best sellers: GTA San Andreas, God of War, Shadow of the Colossus.";
    if (text.includes('ps3') || text.includes('playstation 3')) return "The PS3 brought us HD gaming! Must plays: The Last of Us, Uncharted 2, Metal Gear Solid 4.";
    if (text.includes('ps4') || text.includes('playstation 4')) return "PS4 is a powerhouse! Check out Bloodborne, God of War (2018), and Horizon Zero Dawn.";
    if (text.includes('ps5') || text.includes('playstation 5')) return "Next-gen is here! PS5 features lightning-fast SSD and games like Demon's Souls and Ratchet & Clank.";
    if (text.includes('maxwell') || text.includes('who are you') || text.includes('owner')) return "I'm the AI assistant for Legendary Maxwell! Maxwell is the mastermind behind this epic gaming hub.";
    if (text.includes('help') || text.includes('what can you do')) return "I can tell you about PS2, PS3, PS4, PS5, and the legendary Maxwell! Just ask away.";
        if (text.includes('mod') || text.includes('apk')) return "Modding is huge! I cover Free Fire, PUBG, Blood Strike, and Mobile Legends in the APK Modding Zone. Always stay safe!";
    if (text.includes('free fire') || text.includes('ff')) return "Free Fire is a mobile BR legend! Popular mods include aim configs and custom skins. But beware — modding can get you banned!";
    if (text.includes('pubg')) return "PUBG Mobile is the OG mobile shooter. Watch out for fake UC generators — they're always scams!";
    if (text.includes('blood strike')) return "Blood Strike is NetEase's new fast-paced FPS. The modding scene is growing with aim trainers and custom HUDs.";
    if (text.includes('mobile legends') || text.includes('mlbb')) return "Mobile Legends is the top mobile MOBA. Modders love drone view and custom skins, but map hacks will ban you fast!";
    if (text.includes('safe') || text.includes('virus') || text.includes('scam')) return "Safety first! Always scan APKs with antivirus, never share your login, and use a secondary account when testing mods.";
    return "Hmm, my gaming circuits are still processing that. Try asking about PS2, PS3, PS4, PS5, or Maxwell!";
}

// Send Message
function handleUserInput() {
    const userText = chatInput.value.trim();
    if (userText === '') return;

    // Add user message to screen
    const userMsgDiv = document.createElement('div');
    userMsgDiv.classList.add('message', 'user-msg');
    userMsgDiv.textContent = userText;
    chatMessages.appendChild(userMsgDiv);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // AI "thinking" delay and response
    setTimeout(() => {
        const botResponse = getAIResponse(userText);
        const botMsgDiv = document.createElement('div');
        botMsgDiv.classList.add('message', 'bot-msg');
        botMsgDiv.textContent = botResponse;
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800); 
}

sendBtn.addEventListener('click', handleUserInput);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserInput(); });


// --- LIVE SERVER STATUS SIMULATION ---
function updatePing() {
    const onlineCards = document.querySelectorAll('.status-card.online small');
    
    onlineCards.forEach(card => {
        // Generate a random ping between 20ms and 90ms
        const randomPing = Math.floor(Math.random() * (90 - 20 + 1) + 20);
        card.textContent = `Ping: ${randomPing}ms`;
    });
}

// Update the ping every 3 seconds
setInterval(updatePing, 3000);

// --- CONTACT FORM LOGIC ---
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // Simulate sending (in a real site, this would send to a server)
    console.log('Message sent:', { name, email, message });
    
    // Hide the form and show success message
    contactForm.style.display = 'none';
    successMessage.classList.add('show');
    
    // Reset the form after 5 seconds (optional)
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.classList.remove('show');
    }, 5000);
});

// --- ANIMATED PARTICLE BACKGROUND ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(102, 252, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections between close particles
    particles.forEach((a, index) => {
        particles.slice(index + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(102, 252, 241, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// --- DARK/LIGHT MODE TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = isDarkMode ? '🌙' : '☀️';
});

// --- GAMING SKILLS ANIMATION ---
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// --- STATS COUNTER ANIMATION ---
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target;
            const target = parseInt(statElement.getAttribute('data-target'));
            animateCounter(statElement, target);
            statsObserver.unobserve(statElement);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// --- SMOOTH SCROLL ANIMATIONS ---
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));



