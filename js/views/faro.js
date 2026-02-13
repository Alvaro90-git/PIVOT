import { getChild } from '../state.js';
import { getAgeBracket } from '../logic.js';
import { FARO_DB } from '../data.js';


export function renderFaro(container) {
    const child = getChild();
    const ageBracket = getAgeBracket(child.age);
    let data = { ...(FARO_DB[ageBracket] || FARO_DB['1-3']) }; // Clone to avoid mutation

    const isMale = child.gender === 'chico';
    const pron = isMale ? 'él' : 'ella';
    const art = isMale ? 'el' : 'la';
    const end = isMale ? 'o' : 'a';

    // Dynamic name and gender replacement
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
            data[key] = data[key]
                .replace(/{name}/g, child.name)
                .replace(/{pron}/g, pron)
                .replace(/{pron.cap}/g, pron.charAt(0).toUpperCase() + pron.slice(1))
                .replace(/{art}/g, art)
                .replace(/{end}/g, end);
        }
    });

    container.innerHTML = `
    <style>
        .faro-hero {
            background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
            padding: 30px 25px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            text-align: center;
        }
        .faro-card {
            background: #1E293B;
            border-radius: 24px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,0.05);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .faro-label {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #F59E0B;
            margin-bottom: 8px;
            display: block;
        }
        .faro-title {
            color: white;
            font-size: 18px;
            font-weight: 800;
            margin-bottom: 12px;
            line-height: 1.3;
        }
        .faro-text {
            color: rgba(255,255,255,0.7);
            font-size: 14px;
            line-height: 1.6;
        }
        .lighthouse-glow {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            border-radius: 50%;
        }
        .timeline-dot {
            width: 12px;
            height: 12px;
            background: #F59E0B;
            border-radius: 50%;
            position: relative;
            z-index: 2;
            box-shadow: 0 0 10px #F59E0B;
        }
        .timeline-line {
            position: absolute;
            left: 5px;
            top: 20px;
            bottom: -40px;
            width: 2px;
            background: rgba(255,255,255,0.1);
        }
    </style>

    <div class="view scroll-y" style="padding-bottom:120px; background:#0F172A;">
        
        <div class="faro-hero">
            <div class="lighthouse-glow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2">
                    <path d="M12 2v20"/><path d="m8 6 4-4 4 4"/><path d="M9 22h6"/><path d="M10 18h4"/><path d="M11 14h2"/>
                </svg>
            </div>
            <h1 style="color:white; font-size:28px; font-weight:900; margin:0;">Faro de ${child.name}</h1>
            <p style="color:rgba(255,255,255,0.5); font-size:14px; margin-top:5px;">Guía experta en su etapa de ${child.age} años</p>
        </div>

        <div style="padding: 25px;">
            
            <!-- 1. COMPRENSIÓN CEREBRAL (CIENCIA) -->
            <div class="faro-card" style="border-left: 4px solid #3B82F6;">
                <span class="faro-label">Ciencia del Desarrollo</span>
                <h2 class="faro-title">Su Cerebro Hoy</h2>
                <p class="faro-text">${data.neuro}</p>
                <div style="margin-top:15px; background:rgba(59, 130, 246, 0.1); padding:12px; border-radius:12px; display:flex; gap:10px; align-items:start;">
                    <span style="font-size:18px;">🧠</span>
                    <span style="color:#60A5FA; font-size:12px; font-weight:600; font-style:italic;">"Entender su biología es el primer paso para no perder la calma."</span>
                </div>
            </div>

            <!-- 2. RUMBO DEL VÍNCULO (PSICOLOGÍA/EVOLUCIÓN) -->
            <div class="faro-card" style="border-left: 4px solid #10B981;">
                <span class="faro-label">Psicología del Vínculo</span>
                <h2 class="faro-title">El Rumbo de ${child.name}</h2>
                <p class="faro-text">${data.psychology}</p>
                
                <div style="margin-top:20px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px;">
                    <span class="faro-label" style="color:#10B981;">Próximo Hito de Seguridad</span>
                    <div style="display:flex; align-items:center; gap:15px; margin-top:10px;">
                        <div style="width:40px; height:40px; background:rgba(16, 185, 129, 0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px;">🎯</div>
                        <div style="flex:1;">
                            <p style="color:white; font-size:14px; font-weight:700; margin:0;">${data.upcoming}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. SEMILLAS DE VALOR (ESENCIA/CRISTIANISMO) -->
            <div class="faro-card" style="background: linear-gradient(135deg, #1E293B 0%, #2D3748 100%); border-left: 4px solid #F59E0B;">
                <span class="faro-label">Semillas de Valor</span>
                <h2 class="faro-title">Lo que estamos sembrando</h2>
                <div style="display:flex; gap:15px; align-items:start;">
                    <div style="font-size:32px; filter: drop-shadow(0 0 8px rgba(245,158,11,0.4));">✨</div>
                    <p class="faro-text" style="color:white; font-style:italic;">
                        ${data.virtue}
                    </p>
                </div>
                <p class="faro-text" style="margin-top:15px; font-size:13px;">
                    Educar con amor es ver el don que hay en su interior antes de que él mismo pueda verlo.
                </p>
            </div>

            <!-- CTA: HISTÓRICO DE LUZ -->
            <div style="text-align:center; margin-top:10px;">
                <button onclick="setView('bitacora')" class="btn-primary" style="background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); border:none; width:auto; padding: 14px 35px; font-size:12px; font-weight:900; letter-spacing:1px; border-radius:16px; box-shadow: 0 10px 20px rgba(217, 119, 6, 0.3);">
                    BITÁCORA DE LUZ
                </button>
            </div>

        </div>
        <div class="faro-card" style="border: 1px dashed rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.05); text-align: center;" onclick="setView('mentor')">
            <span class="faro-label">CONSULTA PERSONALIZADA</span>
            <div class="faro-title">¿Tienes dudas sobre ${child.name}?</div>
            <p class="faro-text">Pregúntale a tu Mentor PIVOT. Sabe todo sobre su desarrollo y vuestro vínculo.</p>
            <button class="btn-primary" style="margin-top:10px; background:#F59E0B; width:auto; padding:10px 25px;">Hablar con el Mentor</button>
        </div>

    </div>
    `;
}

window.renderFaro = renderFaro;

