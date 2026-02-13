import { state } from '../state.js';


export function renderFaroSelector(container) {
    container.innerHTML = `
    <style>
        .selector-view {
            background: #0F172A;
            height: 100vh;
            padding: 40px 25px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
        .selector-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .selector-title {
            color: white;
            font-size: 32px;
            font-weight: 900;
            margin-bottom: 10px;
            font-family: 'Outfit', sans-serif;
        }
        .selector-subtitle {
            color: rgba(255,255,255,0.5);
            font-size: 16px;
        }
        .child-selection-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }
        .child-selection-card {
            background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
            border-radius: 30px;
            padding: 25px;
            display: flex;
            align-items: center;
            gap: 20px;
            border: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .child-selection-card:active {
            transform: scale(0.95);
        }
        .child-selection-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(245, 158, 11, 0.05), transparent);
            transform: translateX(-100%);
            transition: 0.5s;
        }
        .child-selection-card:hover::before {
            transform: translateX(100%);
        }
        .child-avatar {
            width: 70px;
            height: 70px;
            background: #3B82F6;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            font-weight: 900;
            color: white;
            box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }
        .child-info h3 {
            color: white;
            margin: 0;
            font-size: 20px;
            font-weight: 800;
        }
        .child-info p {
            color: rgba(255,255,255,0.5);
            margin: 4px 0 0;
            font-size: 14px;
        }
        .faro-entry-icon {
            margin-left: auto;
            color: #F59E0B;
            opacity: 0.5;
        }
    </style>

    <div class="selector-view">
        <div class="selector-header">
            <div style="margin-bottom: 20px;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2">
                    <path d="M12 2v20"/><path d="m8 6 4-4 4 4"/><path d="M9 22h6"/><path d="M10 18h4"/><path d="M11 14h2"/>
                </svg>
            </div>
            <h1 class="selector-title">Encender el Faro</h1>
            <p class="selector-subtitle">¿A quién quieres guiar hoy?</p>
        </div>

        <div class="child-selection-grid">
            ${state.children.map(c => `
                <div class="child-selection-card" onclick="selectFaroChild('${c.id}')">
                    <div class="child-avatar" style="background: ${c.age > 10 ? '#8B5CF6' : '#3B82F6'}">
                        ${c.name[0]}
                    </div>
                    <div class="child-info">
                        <h3>${c.name}</h3>
                        <p>${c.age} años • Etapa ${getAgeBracketLabel(c.age)}</p>
                    </div>
                    <div class="faro-entry-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </div>
                </div>
            `).join('')}
        </div>

        <div style="margin-top: auto; padding-top: 40px; text-align: center;">
             <button onclick="setView('home')" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 12px 25px; border-radius: 15px; font-weight: 700; font-size: 14px;">
                VOLVER AL INICIO
             </button>
        </div>
    </div>
    `;
}

export function selectFaroChild(id) {
    state.currentChildId = id;
    state.view = 'faro';
    render();
}

export function getAgeBracketLabel(age) {
    if (age <= 3) return 'Primeros Pasos';
    if (age <= 6) return 'Exploración Infantil';
    if (age <= 10) return 'Gran Aprendizaje';
    if (age <= 13) return 'Pre-Adolescencia';
    return 'Hacia la Madurez';
}

window.renderFaroSelector = renderFaroSelector;
window.selectFaroChild = selectFaroChild;
window.getAgeBracketLabel = getAgeBracketLabel;


