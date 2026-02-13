import { getChild } from '../state.js';
import { getAgeBracket } from '../logic.js';
import { RADAR_AREAS, RADAR_INDICATORS } from '../data.js';
import { getRadarSVG } from '../components/radar.js';


export function renderRadar(container) {
  const child = getChild();
  const ageBracket = getAgeBracket(child.age);
  const indicators = RADAR_INDICATORS[ageBracket] || {};

  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">Radar PIVOT</h2></header>
      
      <div class="life-stage-banner" style="background:var(--primary-light); border-color:var(--primary);">
         <div class="banner-title" style="color:var(--primary);">Estado de ${child.name} (${child.age} años)</div>
         <div class="banner-text">Puntuación de 1 a 5 basada en comportamientos observables.</div>
      </div>

      <div style="margin-top:20px;">
        ${Object.keys(RADAR_AREAS).map(key => {
    const area = RADAR_AREAS[key];
    const val = child.radar[key] || 1;
    const indicator = indicators[key] || 'Hito en desarrollo...';
    return `
            <div class="os-card" style="margin-bottom:12px; padding:12px; display:flex; align-items:center; gap:15px;">
               <div style="font-size:24px;">${area.icon}</div>
               <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <h4 style="margin:0; font-size:13px;">${area.name}</h4>
                    <span style="font-weight:900; color:var(--primary); font-size:14px;">${val.toFixed(1)}/5</span>
                  </div>
                  <div class="stat-bar-bg" style="height:6px; border-radius:3px; background:#F1F5F9;">
                    <div class="stat-bar-fill" style="width:${(val / 5) * 100}%; background:var(--primary); border-radius:3px;"></div>
                  </div>
                  <p style="font-size:10px; color:var(--text-muted); margin-top:5px; font-style:italic; line-height:1.2;">"${indicator}"</p>
               </div>
            </div>
          `;
  }).join('')}
      </div>

      <button class="btn-primary" onclick="setView('evaluation')" style="margin-top:20px;">✓ Evaluación 1 minuto</button>
    </div>
  `;
}

export function renderRadarView(container) {
  const child = getChild();
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2>Radar Detallado</h2></header>
      <div style="display:flex; justify-content:center; margin:20px 0;">
         ${getRadarSVG(child)}
      </div>
      <div class="os-card">
         <p style="text-align:center; color:rgba(255,255,255,0.7); font-size:13px;">Vista ampliada de las 6 áreas fundamentales.</p>
      </div>
    </div>
  `;
}

window.renderRadar = renderRadar;
window.renderRadarView = renderRadarView;

