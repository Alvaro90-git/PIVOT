import { state } from '../state.js';

import { getDynamicMatch } from '../logic.js';

export function renderYo(container) {
    const parent = state.parentProfile;
    const testDone = !!parent.parentTestResult;

    container.innerHTML = `
    <style>
        .yo-header {
            padding: 40px 25px 30px;
            background: #0F172A;
        }
        .yo-title {
            color: white;
            font-size: 26px;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            margin: 0;
        }
        .yo-subtitle {
            font-size: 15px;
            margin-top: 8px;
            font-weight: 500;
        }
        
        .main-card {
            margin: 0 20px 30px;
            padding: 25px;
            border-radius: 28px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .section-title {
            color: white;
            font-size: 19px;
            font-weight: 800;
            margin: 0 0 15px;
            font-family: 'Outfit', sans-serif;
        }
        
        .child-encaje-card {
            background: #1E293B;
            border-radius: 20px;
            padding: 15px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
            border: 1px solid rgba(255,255,255,0.05);
            transition: transform 0.2s;
        }
        
        .encaje-badge {
            font-size: 8.5px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 6px;
            letter-spacing: 0.8px;
        }
        
        .rec-card {
            background: #1E293B;
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 5px solid #3B82F6;
        }
        
        .settings-simple-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            color: rgba(255,255,255,0.7);
            font-size: 14px;
        }
    </style>

    <div class="view scroll-y" style="background:#0F172A; padding-bottom:120px;">
        
        <!-- 1) Header -->
        <div class="yo-header">
            <h1 class="yo-title">YO</h1>
            <div class="yo-subtitle" style="color: ${testDone ? '#F59E0B' : 'rgba(255,255,255,0.5)'}">
                ${testDone
            ? `Tu estilo: <span style="font-weight:900;">${parent.parentTestResult.style}</span>`
            : 'Haz el test (2 min) para personalizar PIVOT'}
            </div>
        </div>

        <!-- 2) Card Principal -->
        ${!testDone ? `
            <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); margin: 0 35px 35px; padding: 35px 25px; border-radius: 32px; border: 1px solid rgba(245, 158, 11, 0.08); text-align: center; display: flex; flex-direction: column; align-items: center; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
                <div style="font-size: 44px; margin-bottom: 18px;">🧠</div>
                <h2 style="color: white; font-size: 20px; font-weight: 900; margin: 0 0 10px; font-family: 'Outfit', sans-serif;">Test de carácter (2 min)</h2>
                <p style="color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.5; margin: 0 0 25px; max-width: 220px;">
                    Para recomendarte cómo conectar de forma efectiva con tus hijos.
                </p>
                <button onclick="setView('parent_test')" style="width: 100%; max-width: 200px; height: 54px; background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); color: white; border: none; border-radius: 27px; font-weight: 900; font-size: 15px; cursor: pointer; box-shadow: 0 8px 15px rgba(245, 158, 11, 0.2); font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">HACER TEST</button>
            </div>
        ` : `
            <div style="background: #1E293B; margin: 0 20px 35px; padding: 25px 15px; border-radius: 32px; border: 1px solid rgba(245, 158, 11, 0.15); text-align: center; position:relative;">
                <span style="position:absolute; top:20px; right:25px; color:#F59E0B; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:1px;">PERFIL DE CRECIMIENTO</span>
                
                <h2 style="color: white; font-size: 19px; font-weight: 900; margin: 0 0 5px; font-family: 'Outfit', sans-serif; text-align:left; padding-left:10px;">${parent.parentTestResult.title}</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:12px; text-align:left; padding-left:10px; margin-bottom:20px;">Pulsa en 'Huella' para evolucionar estas áreas.</p>

                <!-- SPIDER RADAR CHART -->
                <div style="margin: 0 auto; width: 100%; max-width: 300px;">
                    ${window.getParentRadarSVG ? window.getParentRadarSVG(parent) : ''}
                </div>

                <div style="margin-top:20px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
                    <button onclick="setView('parent_test')" style="background: none; border: none; color: #F59E0B; font-weight: 800; font-size: 12px; cursor: pointer; text-decoration: underline;">Recalibrar perfil (Test)</button>
                </div>
            </div>
        `}

        <div style="padding: 0 20px;">
            
            <!-- 3) Bloque Diferencial -->
            <h3 class="section-title">Cómo conectar mejor con...</h3>
            <div style="margin-bottom:40px;">
                ${state.children.map(child => {
                const dynamicMatch = getDynamicMatch(child.id);
                const encaje = dynamicMatch.level;
                const encajeColor = dynamicMatch.color;

                return `
                             <div class="child-encaje-card" style="flex-direction: column; align-items: stretch; gap: 10px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width:50px; height:50px; background:rgba(255,255,255,0.05); border-radius:15px; display:flex; align-items:center; justify-content:center; font-size:24px;">👦</div>
                                <div style="flex:1;">
                                    <div style="color:white; font-weight:800; font-size:15px;">${child.name}</div>
                                    <div style="color:rgba(255,255,255,0.4); font-size:12px;">${child.age} años • ${child.temperament}</div>
                                </div>
                                <div style="text-align:right;">
                                    <div class="encaje-badge" style="background:${encajeColor}22; color:${encajeColor};">ACOMPAÑAMIENTO ${encaje}</div>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: center; padding-top: 5px;">
                                <button onclick="showConnectionKeys('${child.id}')" style="background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); color: white; border: none; padding: 10px 25px; border-radius: 20px; font-size: 12px; font-weight: 900; cursor: pointer; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; min-width: 140px;">VER CLAVES</button>
                            </div>
                        </div>
                        `;
            }).join('')}
            </div>


            <!-- 5) Ajustes -->
            <div style="margin-top:20px; padding-bottom:40px;">
                <h3 style="color:rgba(255,255,255,0.3); font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:10px;">Cuenta y Sistema</h3>
                <div class="settings-simple-item"><div style="flex:1;">Privacidad</div><span>❯</span></div>
                <div class="settings-simple-item" style="color:#EF4444; border:none;" onclick="logout()"><div style="flex:1;">Cerrar Sesión</div><span>🚪</span></div>
            </div>

        </div>
    </div>
    `;
}

export function showConnectionKeys(childId) {
    state.selectedChildId = childId;
    state.view = 'connection_keys';
    render();
}

window.renderYo = renderYo;
window.showConnectionKeys = showConnectionKeys;


