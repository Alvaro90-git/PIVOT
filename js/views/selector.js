import { getChild, state } from '../state.js';
import { SITUATIONS } from '../data.js';


export function renderSelector(container) {
  const child = getChild();

  // 1. Filter by Age (existing logic)
  let filtered = SITUATIONS.filter(s => child.age >= s.min_age && child.age <= s.max_age);

  // 2. Intelligent Sorting (Time & Context)
  const hour = new Date().getHours();

  // Heuristic function to score relevance (0-100)
  const getRelevance = (s) => {
    let score = 50; // Base score

    // Time-based boosts
    if (hour >= 6 && hour < 9) { // Morning
      if (s.id.includes('vestirse') || s.id.includes('rutina_manana') || s.id.includes('desayuno')) score += 40;
    }
    else if (hour >= 13 && hour < 15) { // Lunch
      if (s.id.includes('comida') || s.id.includes('alimentacion')) score += 40;
    }
    else if (hour >= 16 && hour < 20) { // Afternoon/Evening
      if (s.id.includes('deberes') || s.id.includes('juego') || s.id.includes('baño') || s.id.includes('ducha')) score += 40;
    }
    else if (hour >= 20 || hour < 6) { // Night
      if (s.id.includes('sueno') || s.id.includes('dormir') || s.id.includes('miedo') || s.id.includes('pesadilla')) score += 50;
    }

    // Keyword matching for specific urgencies (always high)
    if (s.id.includes('rabietas') || s.id.includes('agresion')) score += 30; // Always relevant

    return score;
  };

  // Sort: Higher score first
  filtered.sort((a, b) => getRelevance(b) - getRelevance(a));


  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px; display:flex; flex-direction:column; height:100vh;">
      
      <header class="header-compact" style="flex-shrink:0;">
        <button class="btn-back" onclick="setView('sos_child_select')">←</button>
        <div style="display:flex; flex-direction:column;">
           <span style="font-weight:900; font-size:16px; color:white;">¿Qué sucede con ${child.name}?</span>
           <span style="font-size:12px; color:rgba(255,255,255,0.6);">Sugerencias inteligentes para las ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      <div class="grid-situations" style="display:flex; flex-direction:column; gap: 12px; margin-top:20px; flex-grow:1; overflow-y:auto; padding-bottom:80px;">
        ${filtered.length === 0 ? '<p style="text-align:center; color:rgba(255,255,255,0.5); padding:40px;">No hay situaciones críticas detectadas para esta edad precisa. IA en modo escucha.</p>' : filtered.map((s, index) => {
    // Highlight the top suggestion
    const isTop = index === 0;
    return `
          <div class="os-card" style="display:flex; align-items:center; gap:15px; padding:20px; margin-bottom:0; background:${isTop ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255,255,255,0.05)'}; border:${isTop ? '1px solid #4F46E5' : '1px solid rgba(255,255,255,0.1)'};" onclick="selectSituation('${s.id}')">
            <span style="font-size:28px;">${s.icon}</span>
            <div style="flex:1;">
               <h4 style="margin:0; font-size:16px; color:white; font-weight:700;">${s.name}</h4>
               ${isTop ? '<div style="font-size:10px; color:#818CF8; font-weight:600; margin-top:4px;">✨ Sugerencia actual</div>' : ''}
            </div>
            <span style="color:white; font-size:18px; opacity:0.5;">➔</span>
          </div>
        `}).join('')}
      </div>
    </div>
  `;
}

window.renderSelector = renderSelector;
