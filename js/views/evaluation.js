function toggleFocusArea(area) {
  const child = getChild();
  const idx = child.weeklyFocus.indexOf(area);
  if (idx > -1) {
    child.weeklyFocus.splice(idx, 1);
  } else {
    if (child.weeklyFocus.length < 2) child.weeklyFocus.push(area);
    else alert("Máximo 2 áreas de enfoque por semana.");
  }
  render();
}

function updateEvalScore(area, val) {
  const child = getChild();
  child.radar[area] = val;
  render();
}

function saveEvaluation() {
  setView('home');
}

function renderEvaluation(container) {
  const child = getChild();
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><button class="btn-back" onclick="setView('faro')">✕</button><h2 style="font-size:20px; font-weight:900;">Evaluación Semanal</h2></header>
      
      <div class="os-card" style="margin-top:20px;">
         <p class="label">HIJO: ${child.name}</p>
         <p style="font-size:13px; color:var(--text-muted);">Elige 1 o 2 áreas para trabajar esta semana y pon su nota actual.</p>
      </div>

      <div style="margin-top:20px;">
        ${Object.keys(RADAR_AREAS).map(key => {
    const area = RADAR_AREAS[key];
    const isSelected = child.weeklyFocus.includes(key);
    const score = child.radar[key] || 1;
    return `
            <div class="os-card" style="border-color:${isSelected ? 'var(--primary)' : 'var(--border)'}; opacity:${isSelected ? 1 : 0.7}; transition:0.3s; padding:15px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="toggleFocusArea('${key}')">
                  <div style="width:20px; height:20px; border:2px solid var(--primary); border-radius:4px; display:flex; align-items:center; justify-content:center;">
                    ${isSelected ? '<div style="width:12px; height:12px; background:var(--primary); border-radius:2px;"></div>' : ''}
                  </div>
                  <span style="font-weight:800; font-size:14px;">${area.icon} ${area.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                  ${[1, 2, 3, 4, 5].map(v => `
                    <div onclick="updateEvalScore('${key}', ${v})" style="width:28px; height:28px; border-radius:50%; background:${score === v ? 'var(--primary)' : '#F1F5F9'}; color:${score === v ? 'white' : 'var(--text)'}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; cursor:pointer;">${v}</div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
  }).join('')}
      </div>

      <button class="btn-primary" onclick="saveEvaluation()" style="margin-top:20px;">Finalizar Evaluación</button>
    </div>
  `;
}
