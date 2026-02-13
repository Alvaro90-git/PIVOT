import { getChild } from '../state.js';


export function renderBitacora(container) {
    const child = getChild();
    const narrative = generateAINarrative(child);

    container.innerHTML = `
    <style>
        .bitacora-view {
            background: #020617;
            background-image: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 70%);
            color: white;
            font-family: 'Plus Jakarta Sans', sans-serif;
            position: relative;
        }
        .divine-light {
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%);
            filter: blur(40px);
            z-index: 0;
            pointer-events: none;
        }
        .faro-beam {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 200px;
            background: linear-gradient(to bottom, #F59E0B, transparent);
            box-shadow: 0 0 20px #F59E0B;
            opacity: 0.4;
            z-index: 1;
        }
        .bitacora-header {
            padding: 80px 25px 30px;
            text-align: center;
            position: relative;
            z-index: 2;
        }
        .bitacora-card {
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 32px;
            padding: 30px;
            margin: 0 25px 25px;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            position: relative;
            z-index: 2;
        }
        .section-tag {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #F59E0B;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .section-tag::after {
            content: '';
            flex: 1;
            height: 1px;
            background: rgba(245, 158, 11, 0.2);
        }
        .narrative-title {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 900;
            margin-bottom: 20px;
            line-height: 1.2;
            background: linear-gradient(90deg, #FFF, #94A3B8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .narrative-p {
            font-size: 16px;
            line-height: 1.8;
            color: rgba(255,255,255,0.8);
            margin-bottom: 25px;
        }
        .insight-box {
            background: rgba(59, 130, 246, 0.1);
            border-radius: 20px;
            padding: 20px;
            margin-top: 20px;
            border-left: 4px solid #3B82F6;
        }
        .virtue-highlight {
            display: inline-block;
            background: linear-gradient(90deg, #F59E0B, #D97706);
            padding: 4px 12px;
            border-radius: 99px;
            font-size: 12px;
            font-weight: 800;
            color: white;
            margin-top: 10px;
        }
        .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0.3;
            animation: twinkle 3s infinite;
        }
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    </style>

    <div class="view scroll-y bitacora-view" style="padding-bottom:120px;">
        <div class="divine-light"></div>
        <div class="faro-beam"></div>
        
        <header class="header-compact" style="background:transparent; border:none; z-index:100; padding: 20px 25px; display:flex; align-items:center;">
            <button onclick="setView('faro')" style="background:transparent; color:white; border:none; display:flex; align-items:center; gap:8px; cursor:pointer; padding:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
                <span style="font-weight:800; font-size:12px; letter-spacing:1px; text-transform:uppercase;">ATRÁS</span>
            </button>
        </header>

        <div class="bitacora-header">
            <div style="margin-bottom: 10px; position:relative;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="1.5" style="filter: drop-shadow(0 0 10px rgba(245,158,11,0.8));">
                    <path d="M12 3v18M12 3l7 7m-7-7-7 7M3 12h18"/>
                </svg>
            </div>
            <h1 style="font-size:32px; font-weight:900; font-family:'Outfit', sans-serif; margin-top:10px; text-shadow: 0 0 20px rgba(255,255,255,0.2);">Bitácora de Luz</h1>
            <p style="color:rgba(255,255,255,0.6); font-size:16px; font-weight:500;">El relato sagrado de ${child.name}</p>
        </div>

        <!-- CAPÍTULO 1: CRÓNICA DE CRECIMIENTO -->
        <div class="bitacora-card">
            <div class="section-tag">Crónica de Crecimiento</div>
            <h2 class="narrative-title">${narrative.chapter1.title}</h2>
            <p class="narrative-p">${narrative.chapter1.text}</p>
        </div>

        <!-- CAPÍTULO 2: HITOS DE ORO -->
        <div class="bitacora-card">
            <div class="section-tag">Hitos de Oro</div>
            ${narrative.chapter2.hitos.map(h => `
                <div style="display:flex; gap:20px; margin-bottom:25px;">
                    <div style="font-size:24px;">${h.icon}</div>
                    <div>
                        <h4 style="margin:0; font-size:16px; font-weight:800;">${h.title}</h4>
                        <p style="margin:5px 0 0; color:rgba(255,255,255,0.6); font-size:14px; line-height:1.5;">${h.text}</p>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- CAPÍTULO 3: MIRADA EXPERTA -->
        <div class="bitacora-card" style="border: 1px solid rgba(59, 130, 246, 0.3);">
            <div class="section-tag" style="color:#3B82F6;">Análisis Pedagógico Profesional</div>
            <p class="narrative-p" style="font-style:italic;">"${narrative.chapter3.conclusion}"</p>
            <div class="insight-box">
                <h4 style="margin:0; font-size:14px; color:#60A5FA; text-transform:uppercase; letter-spacing:1px;">Próximo Paso Estratégico</h4>
                <p style="margin:10px 0 0; color:white; font-size:15px; font-weight:600;">${narrative.chapter3.nextStep}</p>
            </div>
        </div>

        <!-- CAPÍTULO 4: SEMILLAS DE VALOR -->
        <div class="bitacora-card" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%);">
            <div class="section-tag" style="color:#F59E0B;">La Huella de Eternidad</div>
            <p class="narrative-p">${narrative.chapter4.text}</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                ${narrative.chapter4.virtues.map(v => `<span class="virtue-highlight">${v}</span>`).join('')}
            </div>
        </div>

        <div style="text-align:center; padding:20px;">
            <p style="color:rgba(255,255,255,0.3); font-size:12px; font-style:italic;">"Educar es un acto de amor, una apuesta por la esperanza."</p>
        </div>
    </div>
    `;
}

export function generateAINarrative(child) {
    const name = child.name;
    const age = child.age;
    const isMale = child.gender === 'chico';
    const art = isMale ? 'el' : 'la';
    const pron = isMale ? 'él' : 'ella';
    const end = isMale ? 'o' : 'a';

    const avgScore = Object.values(child.radar).reduce((a, b) => a + b, 0) / 8;
    const isDoingGreat = avgScore > 3.5;

    // Narrative logic based on age and scores
    let ch1Title, ch1Text, ch4Text, ch4Virtues;

    if (age <= 3) {
        ch1Title = isDoingGreat ? `Pequeñ${end}s pasos, grandes victorias` : `El despertar de un alma pur${end}`;
        ch1Text = `En esta etapa de 'Primeros Pasos', hemos visto cómo ${name} empieza a confiar plenamente en vuestra guía. Su capacidad de entrega y su alegría son el motor de vuestra casa. ${pron.charAt(0).toUpperCase() + pron.slice(1)} está en un momento de pura absorción del amor que le dais.`;
        ch4Text = `Educar a un${end} niñ${end} tan pequeñ${end} es como cuidar un jardín al amanecer. Cada gesto de ternura que le dais hoy es una semilla de seguridad para toda su vida. Estamos sembrando los cimientos de su confianza en Dios y en los demás.`;
        ch4Virtues = ['Confianza', 'Alegría', 'Obediencia'];
    } else if (age <= 6) {
        ch1Title = isDoingGreat ? `La explosión de su curiosidad noble` : `El reto de guiar su propia voluntad`;
        ch1Text = `A los ${age} años, ${name} es un torbellino de iniciativa. Hemos detectado que ${pron} está empezando a entender que sus actos tienen consecuencias, y eso es una victoria madurativa crucial. Su corazón es una esponja de valores concretos como el orden y la sinceridad.`;
        ch4Text = `${name} está descubriendo que el mundo es un regalo para ${pron}. Vuestro papel de guías es vital para que aprenda a amar lo bueno y lo bello. La huella que estáis dejando es la de un niño que se siente amado por lo que es, no por lo que hace.`;
        ch4Virtues = ['Orden', 'Sinceridad', 'Generosidad'];
    } else if (age <= 12) {
        ch1Title = isDoingGreat ? `Forjando un carácter sólido` : `La maduración de su mundo interior`;
        ch1Text = `En esta 'Edad de la Razón', ${name} está demostrando una lógica y una justicia admirables. Su evolución en el radar indica que está pasando de obedecer por hábito a decidir por convicción moral. Es un paso gigante hacia la madurez de su carácter.`;
        ch4Text = `Estáis acompañando a ${name} en la construcción de su propia identidad frente al mundo. La fe y los valores que compartís con ${pron} son el faro que le permitirá navegar con seguridad en los años que vienen. La fortaleza que adquiere hoy será su escudo mañana.`;
        ch4Virtues = ['Fortaleza', 'Piedad', 'Respeto'];
    } else {
        ch1Title = isDoingGreat ? `Hacia la cima de su propósito` : `El desafío de encontrar su rastro`;
        ch1Text = `En la adolescencia, el crecimiento de ${name} es una búsqueda de sentido. Aunque el radar muestre picos de intensidad emocional, vemos una voluntad que busca la verdad por encima de todo. ${pron.charAt(0).toUpperCase() + pron.slice(1)} necesita vuestro respeto tanto como vuestro límite.`;
        ch4Text = `Acompañar a un${end} joven como ${name} es un acto de valentía. Estáis enseñando a ${pron} que su vida tiene un propósito trascendente. La caridad y el sentido de servicio que ve en vosotros son la huella más profunda que quedará en su alma adulta.`;
        ch4Virtues = ['Templanza', 'Caridad', 'Fidelidad'];
    }

    // Gender specific overrides for text nuances
    if (!isMale) {
        ch1Text = ch1Text.replace(/niño/g, 'niña').replace(/pequeño/g, 'pequeña');
        ch4Text = ch4Text.replace(/niño/g, 'niña').replace(/pequeño/g, 'pequeña');
    }

    return {
        chapter1: { title: ch1Title, text: ch1Text },
        chapter2: {
            hitos: [
                { icon: '🛡️', title: 'Firmeza Amable', text: `A pesar de su temperamento ${child.temperament.toLowerCase()}, ${name} ha logrado hitos de autocontrol notables.` },
                { icon: '🕊️', title: 'Paz Interior', text: `La conexión emocional con ${pron} ha mejorado un ${(avgScore * 10).toFixed(0)}% respecto al trimestre anterior.` }
            ]
        },
        chapter3: {
            conclusion: `Neurológicamente, la corteza prefrontal de ${name} está integrando mejor los impulsos límbicos. Es un momento óptimo para trabajar la pausa entre el estímulo y la respuesta.`,
            nextStep: age < 7 ? `Incrementar el juego simbólico para canalizar su voluntad.` : `Fomentar conversaciones reflexivas sobre el impacto de sus actos en los otros.`
        },
        chapter4: { text: ch4Text, virtues: ch4Virtues }
    };
}

window.renderBitacora = renderBitacora;
window.generateAINarrative = generateAINarrative;


