import { state } from '../state.js';


export function renderHuellaChildSelect(container) {
  container.innerHTML = `
    <style>
      @keyframes huella-pulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
        70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
      }
      .huella-pulse-btn {
        width: 80px; 
        height: 80px; 
        background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid rgba(255,255,255,0.2);
        margin-bottom: 20px;
        animation: huella-pulse 2s infinite;
        cursor: pointer;
      }
    </style>

    <div class="view" style="padding: 25px; display:flex; flex-direction:column; height:100vh; overflow-y:auto; overflow-x:hidden;">
      
      <header class="header-compact" style="flex-shrink:0;">
        <button onclick="setView('home')" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 16px; color: white; font-family: 'Outfit', sans-serif; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px;">
            <span>←</span> Atrás
        </button>
      </header>
      
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; padding-top:40px; padding-bottom:120px;">
        
        <div class="huella-pulse-btn">
            <h2 style="font-size:16px; color:white; margin:0; font-family:'Outfit', sans-serif; font-weight:900; line-height:1;">HUELLA</h2>
        </div>

        <h2 style="font-size:24px; color:white; margin-bottom:10px; font-family:'Outfit', sans-serif;">Registrar Experiencia</h2>
        <p style="color:rgba(255,255,255,0.5); font-size:15px; margin-bottom:30px;">¿Sobre qué hijo/a quieres reflexionar?</p>
        
        <div style="display:flex; flex-direction:column; gap:15px; width:100%; max-width:320px;">
           ${state.children.map(c => `
              <button onclick="selectHuellaChild('${c.id}')" style="background:rgba(15, 23, 42, 0.6); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; text-align:left; display:flex; align-items:center; gap:15px; width:100%; cursor:pointer;">
                  <div style="flex-shrink:0; width:50px; height:50px; background:linear-gradient(135deg, #D97706 0%, #F59E0B 100%); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px; color:white;">
                      ${c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div style="flex:1; min-width:0;">
                      <div style="font-size:18px; color:white; font-weight:700;">${c.name}</div>
                      <div style="font-size:12px; color:rgba(255,255,255,0.6);">${c.age} años</div>
                  </div>
                  <div style="margin-left:auto; color:white; font-size:20px;">→</div>
              </button>
           `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function selectHuellaChild(id) {
  state.selectedChildId = id;
  state.view = 'huella_registration';
  if (window.render) window.render();
}

window.renderHuellaChildSelect = renderHuellaChildSelect;
window.selectHuellaChild = selectHuellaChild;

