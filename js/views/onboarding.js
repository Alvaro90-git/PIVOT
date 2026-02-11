
const ONBOARDING_SLIDES = [
    {
        title: "¿Qué es PIVOT?",
        text: "Pulsa PIVOT AHORA y te dice <b>exactamente</b> qué decir y qué hacer.",
        icon: "✨",
        color: "#F59E0B", // Amber
        bg: "linear-gradient(135deg, #0F292E 0%, #134E4A 100%)", // Teal
        float: "transform: translateY(-10px);"
    },
    {
        title: "Retos semanales con IA",
        text: "Retos distintos por edad (3-18 años) y nivel para avanzar cada semana.",
        icon: "🚀",
        color: "#FCD34D", // Light Amber
        bg: "linear-gradient(135deg, #064E3B 0%, #047857 100%)", // Emerald
        float: "transform: rotate(5deg) translateY(-5px);"
    },
    {
        title: "Modo pareja + progreso",
        text: "Coherencia en casa, métricas y objetivos por cada hijo/a.",
        icon: "👨‍👩‍👧‍👦",
        color: "#34D399", // Soft Green
        bg: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
        float: "transform: scale(1.1);"
    }
];

function renderOnboarding(container) {
    container.innerHTML = `
    <style>
        .onboarding-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: #0B1E22; /* Base Teal Dark */
            overflow: hidden;
            position: relative;
        }

        /* Ambient Background (Teal/Emerald Nebula) */
        .onboarding-bg {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(180deg, #0F292E 0%, #115E59 60%, #134E4A 100%);
            z-index: 1;
        }
        .star {
            position: absolute;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            opacity: 0.5;
            animation: twinkle 4s infinite ease-in-out;
        }
        @keyframes twinkle { 0%, 100% { opacity:0.1; transform:scale(0.8); } 50% { opacity:0.6; transform:scale(1.2); } }

        /* Carousel */
        .carousel-snap {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            flex: 1;
            z-index: 10;
            scrollbar-width: none; 
            padding-top: 100px;
        }
        .carousel-snap::-webkit-scrollbar { display: none; }

        .slide {
            min-width: 100vw;
            scroll-snap-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 20px 40px;
            box-sizing: border-box;
            text-align: center;
        }

        /* Card Style - Clean Glass on Teal */
        .glass-card {
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 30px;
            width: 100%;
            max-width: 320px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            margin-bottom: 20px;
            animation: floatCard 6s ease-in-out infinite;
        }
        @keyframes floatCard { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .illustration-placeholder {
            font-size: 80px;
            margin-bottom: 20px;
            filter: drop-shadow(0 10px 10px rgba(0,0,0,0.15));
            animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn { from { transform: scale(0); opacity:0; } to { transform: scale(1); opacity:1; } }

        .slide-title {
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 24px;
            color: #F1F5F9; /* Off-white */
            margin-bottom: 15px;
            line-height: 1.2;
        }

        .slide-text {
            font-size: 16px; 
            color: rgba(255,255,255,0.85); 
            line-height: 1.6;
        }

        /* Dots */
        .dots-container {
            display: flex;
            gap: 8px;
            margin-bottom: 30px;
            z-index: 10;
            justify-content: center;
            width: 100%;
        }
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            transition: all 0.3s;
        }
        .dot.active {
            background: #F59E0B; /* Amber Active Dot */
            width: 24px;
            border-radius: 10px;
        }

        /* Sticky Button Area */
        .bottom-actions {
            z-index: 20;
            padding: 0 30px 40px;
            width: 100%;
            box-sizing: border-box;
            background: linear-gradient(to top, #0B1E22 20%, transparent); /* Match bg */
        }

        .btn-access {
            /* Warm Amber Gradient */
            background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%);
            color: white;
            border: none;
            width: 100%;
            padding: 16px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            letter-spacing: 1px;
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3); /* Amber Shadow */
            cursor: pointer;
            transition: transform 0.1s, box-shadow 0.2s;
        }
        .btn-access:active { transform: scale(0.98); box-shadow: 0 2px 10px rgba(245, 158, 11, 0.2); }

    </style>

    <div class="onboarding-container">
        
        <!-- Background Stars (simple generation) - Subtle -->
        <div class="onboarding-bg">
            ${Array.from({ length: 15 }).map(() =>
        `<div class="star" style="top:${Math.random() * 100}%; left:${Math.random() * 100}%; width:${Math.random() * 2 + 1}px; height:${Math.random() * 2 + 1}px; animation-delay:${Math.random() * 3}s"></div>`
    ).join('')}
        </div>

        <!-- Header -->
        <div style="position:absolute; top:20px; left:0; width:100%; text-align:center; z-index:20;">
            <div style="display:inline-flex; align-items:center; gap:8px; margin-bottom:5px;">
                <span style="font-family:'Outfit', sans-serif; font-weight:900; font-size:20px; color:white; letter-spacing:1px;">PIVOT</span>
            </div>
            <div style="font-size:12px; color:rgba(255,255,255,0.7);">Educación con AMOR en 10 segundos.</div>
            
            <button onclick="finishOnboarding()" style="position:absolute; top:5px; right:20px; background:none; border:none; color:rgba(255,255,255,0.5); font-size:12px; cursor:pointer;">Saltar</button>
        </div>

        <!-- Carousel -->
        <div class="carousel-snap" id="onboardingCarousel" onscroll="updateDots()">
            ${ONBOARDING_SLIDES.map((slide, index) => `
                <div class="slide">
                    <div class="glass-card">
                        <div class="illustration-placeholder" style="${slide.float}">
                            ${slide.icon}
                        </div>
                        <!-- Titles colored with warm amber/teal accents -->
                        <h2 class="slide-title" style="color:${index === 1 ? '#FCD34D' : (index === 2 ? '#6EE7B7' : '#F1F5F9')}">${slide.title}</h2>
                        <p class="slide-text">${slide.text}</p>
                        
                        <!-- Bullets -->
                        <div style="margin-top:20px; display:flex; flex-direction:column; gap:8px; width:100%;">
                           <div style="background:rgba(255,255,255,0.05); padding:8px; border-radius:8px; font-size:12px; color:rgba(255,255,255,0.8); border:1px solid rgba(255,255,255,0.1);">
                              ✨ ${index === 0 ? 'Sin sermones, directo al grano' : (index === 1 ? 'Personalizado para tu hijo' : 'Tu pareja en el mismo equipo')}
                           </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Pagination Dots -->
        <div class="dots-container" id="dotsContainer">
            <div class="dot active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>

        <!-- Bottom Actions -->
        <div class="bottom-actions">
            <button class="btn-access" onclick="finishOnboarding()">ACCEDER</button>
        </div>

    </div>
    
    `;
}

function updateDots() {
    const carousel = document.getElementById('onboardingCarousel');
    if (!carousel) return;
    const dots = document.querySelectorAll('.dot');
    const scrollLeft = carousel.scrollLeft;
    const width = carousel.offsetWidth;
    const index = Math.round(scrollLeft / width);

    dots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}
window.updateDots = updateDots;

// Global function to finish
window.finishOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding_v1', 'true');
    setView('login');
};
