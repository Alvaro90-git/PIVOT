import { state, save } from '../state.js';
import { processHuella } from '../logic.js';

export function renderHuellaRegistration(container) {
    const child = state.children.find(c => c.id === state.selectedChildId) || state.children[0];

    container.innerHTML = `
        <style>
            .huella-card {
                background: rgba(30, 41, 59, 0.7);
                backdrop-filter: blur(10px);
                border-radius: 24px;
                border: 1px solid rgba(255,255,255,0.1);
                padding: 25px;
                margin-bottom: 20px;
            }
            .type-pill {
                padding: 10px 15px;
                border-radius: 12px;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                color: white;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
            }
            .type-pill.active {
                background: #F59E0B;
                border-color: #F59E0B;
                font-weight: 800;
            }
            .eval-slider {
                -webkit-appearance: none;
                width: 100%;
                height: 6px;
                background: rgba(255,255,255,0.1);
                border-radius: 3px;
                outline: none;
                margin: 15px 0;
            }
            .eval-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                background: #F59E0B;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
            }
            .slider-label {
                display: flex;
                justify-content: space-between;
                font-size: 11px;
                color: rgba(255,255,255,0.5);
                font-weight: 700;
            }
        </style>

        <div class="view" style="padding: 25px; display:flex; flex-direction:column; height:100vh; overflow-y:auto; overflow-x:hidden; background:#0F172A;">
            <header class="header-compact" style="flex-shrink:0; margin-bottom:20px;">
                <button onclick="setView('home')" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 16px; color: white; font-family: 'Outfit', sans-serif; font-weight: 600; cursor: pointer;">
                    Cancelar
                </button>
            </header>

            <div style="text-align:center; margin-bottom:30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900; text-transform:uppercase;">CICLO DE APRENDIZAJE</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Huella con ${child.name}</h2>
                <p style="color:rgba(255,255,255,0.5); font-size:14px;">¿Qué acaba de ocurrir?</p>
            </div>

            <div class="huella-card">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px;" id="huella-types">
                    <div class="type-pill" onclick="selectHuellaType('conflicto', this)">Conflictos / Rabieta</div>
                    <div class="type-pill" onclick="selectHuellaType('desobediencia', this)">Desobediencia</div>
                    <div class="type-pill" onclick="selectHuellaType('acierto', this)">Gran Acierto</div>
                    <div class="type-pill" onclick="selectHuellaType('otro', this)">Otro momento</div>
                </div>

                <div style="margin-bottom:25px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:700; font-size:14px;">MI CALMA (Serenidad)</span>
                        <span id="calma-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="3" class="eval-slider" oninput="document.getElementById('calma-val').innerText = this.value" id="slider-calma">
                    <div class="slider-label"><span>Reactividad</span><span>Calma Total</span></div>
                </div>

                <div style="margin-bottom:25px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:700; font-size:14px;">MI FIRMEZA (Límites)</span>
                        <span id="firmeza-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="3" class="eval-slider" oninput="document.getElementById('firmeza-val').innerText = this.value" id="slider-firmeza">
                    <div class="slider-label"><span>Cedí / Grité</span><span>Firmeza Serena</span></div>
                </div>

                <div style="margin-bottom:25px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:white; font-weight:700; font-size:14px;">CONEXIÓN (Afecto)</span>
                        <span id="conexion-val" style="color:#F59E0B; font-weight:900;">3</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value="3" class="eval-slider" oninput="document.getElementById('conexion-val').innerText = this.value" id="slider-conexion">
                    <div class="slider-label"><span>Distancia</span><span>Validación / Abrazo</span></div>
                </div>
            </div>

            <button onclick="saveHuella()" class="btn-primary" style="margin-top:auto; background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%);">
                GUARDAR HUELLA Y CRECER
            </button>
            <div style="height:40px;"></div>
        </div>
    `;
}

let selectedHuellaType = null;
window.selectHuellaType = function (type, el) {
    selectedHuellaType = type;
    document.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
};

window.saveHuella = function () {
    if (!selectedHuellaType) {
        alert('Por favor, selecciona qué tipo de suceso ha ocurrido.');
        return;
    }

    const data = {
        type: selectedHuellaType,
        calma: parseInt(document.getElementById('slider-calma').value),
        firmeza: parseInt(document.getElementById('slider-firmeza').value),
        conexion: parseInt(document.getElementById('slider-conexion').value)
    };

    processHuella(state.selectedChildId, data);

    // Success View
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="view" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; text-align:center; background:#0F172A; height:100vh;">
            <div style="font-size:80px; margin-bottom:20px; animation: bounce 1s infinite alternate;">✨</div>
            <h2 style="color:white; font-family:'Outfit'; font-size:28px;">¡Huella Guardada!</h2>
            <p style="color:rgba(255,255,255,0.7); font-size:18px; margin-bottom:30px; line-height:1.4;">
                Cada registro es un paso hacia tu maestría. <br>Vuestro radar familiar ha sido actualizado.
            </p>
            <button onclick="setView('home')" class="btn-primary" style="width:auto; padding:15px 40px;">VOLVER AL INICIO</button>
        </div>
    `;
    save();
};
