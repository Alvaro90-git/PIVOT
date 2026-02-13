import { state } from '../state.js';

const ONBOARDING_SLIDES = [
    {
        title: "Sabrás qué decir en segundos",
        subtitle: "ORIENTACIÓN INSTANTÁNEA",
        text: "Olvida los sermones. Pulsa el botón PIVOT y obtén la frase exacta para conectar con tu hijo al instante.",
        icon: "✨",
        color: "#F59E0B",
        visual: 'pivot'
    },
    {
        title: "Crea aventuras inolvidables",
        subtitle: "CUENTOS MÁGICOS",
        text: "Diseñad juntos historias donde tus hijos son los héroes. Una forma única de transmitir valores y amor.",
        icon: "📖",
        color: "#10B981",
        visual: 'stories'
    },
    {
        title: "Métricas del corazón",
        subtitle: "PROGRESO REAL",
        text: "Observa cómo crece el carácter de tu hijo con diagramas inteligentes de autonomía, esfuerzo y respeto.",
        icon: "📊",
        color: "#3B82F6",
        visual: 'radar'
    },
    {
        title: "Sabiduría experta a tu alcance",
        subtitle: "BIBLIOTECA PIVOT",
        text: "Libros, vídeos y recursos de neurociencia seleccionados específicamente para vuestro momento actual.",
        icon: "📚",
        color: "#8B5CF6",
        visual: 'library'
    },
    {
        title: "Tu guía personal 24/7",
        subtitle: "SIEMPRE A TU LADO",
        text: "Un experto disponible en cada momento para resolver dudas, gestionar crisis y acompañarte siempre.",
        icon: "👨‍🏫",
        color: "#EC4899",
        visual: 'mentor'
    }
];

let autoPlayInterval = null;

export function renderOnboarding(container) {
    container.innerHTML = `
    <style>
        .ob-full {
            min-height: 100dvh; /* Use dynamic viewport height for mobile bars */
            width: 100vw;
            background: #020617;
            position: relative;
            overflow-y: auto; /* Safety net: scroll if screen is tiny */
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: white;
            z-index: 100000;
            padding: env(safe-area-inset-top) 20px env(safe-area-inset-bottom); /* iOS notch safety */
            box-sizing: border-box;
        }

        .ob-gradient-bg {
            position: fixed; /* Keep it fixed behind everything */
            inset: 0;
            background: radial-gradient(circle at 50% -20%, #1e1b4b 0%, #020617 80%);
            z-index: 1;
        }

        /* Fixed Brand Logo */
        .ob-brand-logo {
            position: relative;
            padding-top: 20px;
            margin-bottom: 20px;
            z-index: 100;
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
            font-size: 20px;
            letter-spacing: 2px;
            color: white;
            pointer-events: none;
            text-align: left;
        }

        /* Centered Content Container */
        .ob-main-wrapper {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center; /* Center content vertically if space permits */
            padding-bottom: 30px;
        }

        /* Visual Area - FLEXIBLE */
        .ob-visual-area {
            flex: 0 1 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 30px;
            min-height: 200px;
        }

        .ob-mockup {
            width: 100px;
            height: 200px;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 20px;
            border: 4px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            backdrop-filter: blur(12px);
        }

        .ob-float-icon {
            position: absolute;
            top: 0;
            right: 15%;
            width: 50px;
            height: 50px;
            background: #ffffff;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            z-index: 20;
        }

        /* Text Area - FLEXIBLE */
        .ob-txt-area {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 40px;
        }

        .ob-subtitle {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 2px;
            color: var(--slide-color);
            margin-bottom: 12px;
            text-transform: uppercase;
        }

        .ob-title {
            font-family: 'Outfit', sans-serif;
            font-size: 22px;
            font-weight: 900;
            line-height: 1.2;
            margin: 0 0 15px;
            letter-spacing: -0.5px;
        }

        .ob-desc {
            font-size: 14px;
            line-height: 1.6;
            color: #94A3B8;
            font-weight: 500;
            max-width: 280px;
            margin: 0;
        }

        /* Bottom Area */
        .ob-bottom-area {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .ob-dots {
            display: flex;
            gap: 10px;
            margin-bottom: 25px;
        }
        .ob-dot {
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background: rgba(255,255,255,0.1);
            transition: all 0.4s ease;
        }
        .ob-dot.active {
            width: 20px;
            background: #F59E0B;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }

        .ob-btn {
            width: 100%;
            height: 54px;
            background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%);
            color: white;
            border: none;
            border-radius: 16px;
            font-size: 15px;
            font-weight: 900;
            font-family: 'Outfit', sans-serif;
            letter-spacing: 0.5px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(217, 119, 6, 0.3);
            text-transform: uppercase;
        }

        /* Animations */
        .pulse-core { width: 50px; height: 50px; background: #F59E0B; border-radius: 50%; animation: pulseS 2s infinite; }
        @keyframes pulseS { 0%, 100% { scale: 1; opacity: 1; } 50% { scale: 1.25; opacity: 0.7; } }
        
        .bar-wrap { display: flex; align-items: flex-end; gap: 8px; height: 100px; }
        .bar-ob { width: 12px; background: #3B82F6; border-radius: 4px; animation: barUp 2.5s infinite; }
        @keyframes barUp { 0% { height: 0; } 50% { height: var(--h); } 100% { height: var(--h); } }

        .line-wrap { width: 100%; padding: 0 20px; }
        .line-ob { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin: 10px 0; overflow: hidden; position: relative; }
        .line-fill-ob { position: absolute; left: 0; top: 0; height: 100%; background: #10B981; animation: fillW 2.5s infinite; }
        @keyframes fillW { 0% { width: 0; } 70% { width: 100%; } 100% { width: 100%; } }
    </style>

    <div class="ob-full" id="obContainer">
        <div class="ob-gradient-bg"></div>
        <div class="ob-brand-logo">PIVOT</div>
        
        <div class="ob-main-wrapper">
            <div class="ob-visual-area" id="obVisual">
                <!-- Injected -->
            </div>

            <div class="ob-txt-area" id="obTextBox">
                <!-- Injected -->
            </div>

            <div class="ob-bottom-fixed">
                <div class="ob-dots" id="obDots">
                    ${ONBOARDING_SLIDES.map((_, i) => `<div class="ob-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
                </div>
                <button class="ob-btn" onclick="finishOnboarding()">EMPEZAR AHORA</button>
            </div>
        </div>
    </div>
    `;

    initCycle();
}

function initCycle() {
    let index = 0;
    const visual = document.getElementById('obVisual');
    const textBox = document.getElementById('obTextBox');
    const dots = document.querySelectorAll('.ob-dot');

    const renderStep = () => {
        const slide = ONBOARDING_SLIDES[index];

        // VISUAL PULSE
        visual.style.transition = 'none';
        visual.style.opacity = 0;
        visual.style.transform = 'scale(0.95)';

        setTimeout(() => {
            visual.innerHTML = `
                <div class="ob-mockup">
                    ${index === 0 ? '<div class="pulse-core"></div>' : ''}
                    ${index === 1 ? '<div class="line-wrap"><div class="line-ob"><div class="line-fill-ob"></div></div><div class="line-ob"><div class="line-fill-ob" style="animation-delay:0.5s"></div></div><div class="line-ob" style="width:70%"><div class="line-fill-ob" style="animation-delay:1s"></div></div></div>' : ''}
                    ${index === 2 ? '<div class="bar-wrap"><div class="bar-ob" style="--h:40px"></div><div class="bar-ob" style="--h:80px; animation-delay:0.2s"></div><div class="bar-ob" style="--h:60px; animation-delay:0.4s"></div><div class="bar-ob" style="--h:90px; animation-delay:0.6s"></div></div>' : ''}
                    ${index === 3 ? '<div style="font-size:60px">📚</div>' : ''}
                    ${index === 4 ? '<div style="width:50px; height:50px; background:#EC4899; border-radius:14px; box-shadow:0 0 30px #EC4899; animation: pulseS 2s infinite;"></div>' : ''}
                </div>
                <div class="ob-float-icon" style="animation: bounceIcon 1s forwards;">${slide.icon}</div>
            `;
            visual.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
            visual.style.opacity = 1;
            visual.style.transform = 'scale(1)';
        }, 50);

        // TEXT UPDATE
        textBox.innerHTML = `
            <div class="ob-subtitle" style="--slide-color:${slide.color}">${slide.subtitle}</div>
            <h2 class="ob-title">${slide.title}</h2>
            <p class="ob-desc">${slide.text}</p>
        `;

        // DOTS
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    renderStep();

    autoPlayInterval = setInterval(() => {
        index = (index + 1) % ONBOARDING_SLIDES.length;
        renderStep();
    }, 4500);
}

export function finishOnboarding() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    localStorage.setItem('hasSeenOnboarding_v13', 'true');
    if (window.setView) window.setView('login');
}

window.finishOnboarding = finishOnboarding;
window.renderOnboarding = renderOnboarding;
