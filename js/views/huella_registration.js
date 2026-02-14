import { state, save } from '../state.js';
import { processHuella } from '../logic.js';
import { SITUATIONS } from '../data.js';

let registrationStep = 1;
let selectedSituationId = null;
let registrationData = {
    child: { intensity: 3, cooperation: 3 },
    parent: { calma: 3, firmeza: 3, conexion: 3 }
};

export function renderHuellaRegistration(container) {
    const child = state.children.find(c => c.id === state.selectedChildId) || state.children[0];

    if (registrationStep === 1) {
        renderStep1(container, child);
    } else if (registrationStep === 2) {
        renderStep2(container, child);
    } else if (registrationStep === 3) {
        renderStep3(container, child);
    }
}

// STEP 1: Selección de Casuística Precisa
function renderStep1(container, child) {
    const ageAppropriate = SITUATIONS.filter(s => child.age >= s.min_age && child.age <= s.max_age);

    container.innerHTML = `
        <style>
            .situation-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 12px;
                margin-top: 20px;
            }
            .sit-card {
                background: rgba(30, 41, 59, 0.6);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 15px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s;
            }
            .sit-card:active { transform: scale(0.95); background: rgba(245, 158, 11, 0.2); border-color: #F59E0B; }
            .sit-icon { font-size: 30px; margin-bottom: 8px; display: block; }
            .sit-name { color: white; font-size: 13px; font-weight: 700; line-height: 1.2; }
        </style>

        <div class="view scroll-y" style="padding: 25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="resetRegistration()" style="background: rgba(255,255,255,0.1); border: none; border-radius: 15px; padding: 8px 15px; color: white; font-weight:700;">Cancelar</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900; text-transform:uppercase;">PASO 1 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">¿Qué ha pasado hoy?</h2>
                <p style="color:rgba(255,255,255,0.5); font-size:14px;">Situaciones detectadas para la etapa de ${child.name}</p>
            </div>

            <div class="situation-grid">
                ${ageAppropriate.map(s => `
                    <div class="sit-card" onclick="selectHuellaSituation('${s.id}')">
                        <span class="sit-icon">${s.icon}</span>
                        <span class="sit-name">${s.name}</span>
                    </div>
                `).join('')}
                <div class="sit-card" onclick="selectHuellaSituation('otro')" style="border-style: dashed; opacity: 0.7;">
                    <span class="sit-icon">✨</span>
                    <span class="sit-name">Otro momento</span>
                </div>
            </div>
        </div>
    `;
}

// STEP 2: Valorar Reacción del Niño
function renderStep2(container, child) {
    container.innerHTML = `
        <div class="view scroll-y" style="padding: 25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="prevStep()" style="background: rgba(255,255,255,0.1); border: none; border-radius: 15px; padding: 8px 15px; color: white; font-weight:700;">Atrás</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900; text-transform:uppercase;">PASO 2 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Reacción de ${child.name}</h2>
                <p style="color:rgba(255,255,255,0.5); font-size:14px;">¿Cómo se comportó durante el suceso?</p>
            </div>

            <div class="huella-card" style="background: rgba(30, 41, 59, 0.7); border-radius: 24px; padding:25px; border:1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom:30px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:800; font-size:14px;">INTENSIDAD EMOCIONAL</span>
                        <span id="child-int-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="${registrationData.child.intensity}" class="eval-slider" oninput="document.getElementById('child-int-val').innerText = this.value; registrationData.child.intensity = parseInt(this.value);" style="width:100%; margin:15px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.4);"><span>Desbordado/Lloro</span><span>Calma/Madurez</span></div>
                </div>

                <div style="margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:800; font-size:14px;">COOPERACIÓN / LÍMITE</span>
                        <span id="child-coop-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="${registrationData.child.cooperation}" class="eval-slider" oninput="document.getElementById('child-coop-val').innerText = this.value; registrationData.child.cooperation = parseInt(this.value);" style="width:100%; margin:15px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.4);"><span>Resistencia/No</span><span>Colaboración</span></div>
                </div>
            </div>

            <button onclick="nextStep()" class="btn-primary" style="margin-top:30px; background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%);">
                Siguiente: Valorar mi respuesta
            </button>
        </div>
    `;
}

// STEP 3: Valorar Reacción del Padre
function renderStep3(container, child) {
    container.innerHTML = `
        <div class="view scroll-y" style="padding: 25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="prevStep()" style="background: rgba(255,255,255,0.1); border: none; border-radius: 15px; padding: 8px 15px; color: white; font-weight:700;">Atrás</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900; text-transform:uppercase;">PASO 3 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Tu Huella, ${state.parentProfile.name}</h2>
                <p style="color:rgba(255,255,255,0.5); font-size:14px;">¿Cómo acompañaste a ${child.name}?</p>
            </div>

            <div class="huella-card" style="background: rgba(30, 41, 59, 0.7); border-radius: 24px; padding:25px; border:1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom:25px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:800; font-size:14px;">MI CALMA (Serenidad)</span>
                        <span id="calma-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="${registrationData.parent.calma}" class="eval-slider" oninput="document.getElementById('calma-val').innerText = this.value; registrationData.parent.calma = parseInt(this.value);" style="width:100%; margin:15px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.4);"><span>Reactivo / Gritos</span><span>Paz / Comprensión</span></div>
                </div>

                <div style="margin-bottom:25px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:800; font-size:14px;">MI FIRMEZA (Límites)</span>
                        <span id="firmeza-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="${registrationData.parent.firmeza}" class="eval-slider" oninput="document.getElementById('firmeza-val').innerText = this.value; registrationData.parent.firmeza = parseInt(this.value);" style="width:100%; margin:15px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.4);"><span>Cedí / Inseguridad</span><span>Límite Claro</span></div>
                </div>

                <div style="margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:800; font-size:14px;">CONEXIÓN (Afecto)</span>
                        <span id="conexion-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="${registrationData.parent.conexion}" class="eval-slider" oninput="document.getElementById('conexion-val').innerText = this.value; registrationData.parent.conexion = parseInt(this.value);" style="width:100%; margin:15px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.4);"><span>Incomprensión</span><span>Empatía / Abrazo</span></div>
                </div>
            </div>

            <button onclick="commitHuella()" class="btn-primary" style="margin-top:30px; background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%);">
                GUARDAR HUELLA FAMILIAR
            </button>
        </div>
    `;
}

// LOGIC
window.selectHuellaSituation = function (id) {
    selectedSituationId = id;

    // Fake IA Processing for premium feel
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="view" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; text-align:center; background:#0F172A; height:100vh;">
            <div style="width:80px; height:80px; background:radial-gradient(circle, #F59E0B 0%, transparent 70%); border-radius:50%; animation: pulseS 1.5s infinite; filter: blur(5px);"></div>
            <h2 style="color:white; font-family:'Outfit'; margin-top:30px; font-size:18px; letter-spacing:1px; font-weight:900;">ANALIZANDO CONTEXTO...</h2>
            <p style="color:rgba(255,255,255,0.4); font-size:12px; margin-top:10px;">IA PIVOT vinculando hitos de desarrollo precisos</p>
        </div>
    `;

    setTimeout(() => {
        registrationStep = 2;
        if (window.render) window.render();
    }, 1500);
};

window.nextStep = function () {
    registrationStep++;
    if (window.render) window.render();
};

window.prevStep = function () {
    registrationStep--;
    if (window.render) window.render();
};

window.resetRegistration = function () {
    registrationStep = 1;
    selectedSituationId = null;
    registrationData = {
        child: { intensity: 3, cooperation: 3 },
        parent: { calma: 3, firmeza: 3, conexion: 3 }
    };
    setView('home');
};

window.commitHuella = function () {
    processHuella(state.selectedChildId, {
        situationId: selectedSituationId,
        ...registrationData
    });

    // Success View
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="view" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; text-align:center; background:#0F172A; height:100vh;">
            <div style="font-size:80px; margin-bottom:20px; animation: bounce 1s infinite alternate;">🛡️</div>
            <h2 style="color:white; font-family:'Outfit'; font-size:28px;">¡Crecimiento Guardado!</h2>
            <p style="color:rgba(255,255,255,0.7); font-size:18px; margin-bottom:30px; line-height:1.4;">
                Habéis crecido juntos. <br>Tanto tu radar como el de tu hijo/a reflejan este aprendizaje.
            </p>
            <button onclick="resetRegistration()" class="btn-primary" style="width:auto; padding:15px 40px;">VOLVER AL INICIO</button>
        </div>
    `;
    save();
};
