function renderProfiles(container) {
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">Gestión Familiar</h2></header>
      
      <span class="label" style="margin:20px 0 15px; display:block;">Crecimiento de Hijos</span>
      <div style="display:flex; flex-direction:column; gap:12px;">
      ${state.children.map(c => `
        <div class="os-card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0;" onclick="editChild('${c.id}')">
          <div style="display:flex; align-items:center; gap:15px;">
            <div style="width:45px; height:45px; background:#F1F5F9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--primary); font-weight:900; font-size:18px;">${c.name[0]}</div>
            <div>
               <h4 style="margin:0;">${c.name}</h4>
               <p style="font-size:12px; color:var(--text-muted);">${c.age} años • ${c.age >= 11 ? 'Adolescente' : (c.age >= 3 ? 'Infantil' : 'Bebé')}</p>
            </div>
          </div>
          <span style="color:var(--primary); font-weight:800; font-size:12px;">CONFIGURAR ⚙️</span>
        </div>
      `).join('')}
      </div>

      <button class="btn-primary" style="margin-top:25px; background:#F8FAFC; color:var(--primary); border:2px dashed var(--primary);" onclick="editChild()">+ Añadir nuevo perfil</button>
    </div>
  `;
}


function editChild(id) { state.editingChildId = id; state.view = 'edit_child'; render(); }
function saveChild(id) {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const temp = document.getElementById('temp').value;
  const gender = document.getElementById('gender').value;

  if (!id) {
    const radar = {};
    Object.keys(RADAR_AREAS).forEach(k => {
      radar[k] = parseInt(state.tempRadarValues && state.tempRadarValues[k] ? state.tempRadarValues[k] : 1);
    });
    state.children.push({
      id: Date.now().toString(), name, age: parseInt(age), temperament: temp, gender,
      radar: radar,
      weeklyFocus: [Object.keys(RADAR_AREAS)[0]],
      currentChallenge: null
    });
  } else {
    const c = state.children.find(ch => ch.id === id);
    c.name = name; c.age = parseInt(age); c.temperament = temp; c.gender = gender;
    Object.keys(RADAR_AREAS).forEach(k => {
      c.radar[k] = parseInt(state.tempRadarValues && state.tempRadarValues[k] ? state.tempRadarValues[k] : (c.radar[k] || 1));
    });
  }
  state.tempRadarValues = null;
  state.view = 'profiles'; render();
}

function deleteChild(id) {
  if (state.children.length <= 1) { alert("Debes tener al menos un perfil de hijo."); return; }
  state.children = state.children.filter(c => c.id !== id);
  if (state.currentChildId === id) state.currentChildId = state.children[0].id;
  state.view = 'profiles'; render();
}

function setTempRadar(key, val) {
  if (!state.tempRadarValues) state.tempRadarValues = {};
  state.tempRadarValues[key] = val;
  // Update UI manually for speed
  document.querySelectorAll(`.radar-btn-${key}`).forEach(btn => {
    btn.style.background = 'rgba(255,255,255,0.05)';
    btn.style.color = 'white';
  });
  const activeBtn = document.getElementById(`radar-btn-${key}-${val}`);
  if (activeBtn) {
    activeBtn.style.background = 'var(--primary)';
    activeBtn.style.color = 'white';
  }
}

function renderEditChild(container, id) {
  const child = state.children.find(c => c.id === id) || { name: '', age: 3, temperament: 'Tranquilo', radar: {} };
  if (!state.tempRadarValues) {
    state.tempRadarValues = {};
    Object.keys(RADAR_AREAS).forEach(k => state.tempRadarValues[k] = child.radar[k] || 1);
  }

  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><button class="btn-back" onclick="setView('profiles')">✕</button><h2 style="color:white; font-family:'Outfit', sans-serif;">${id ? 'Editar Perfil' : 'Nuevo Hijo'}</h2></header>
      
      <div style="margin-top:20px;">
        <label class="label">Nombre</label><input type="text" id="name" class="input-premium" value="${child.name}" style="margin-bottom:20px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1);">
        
        <label class="label">Edad (años)</label>
        <input type="number" id="age" class="input-premium" value="${child.age}" min="0" max="18" style="margin-bottom:20px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1);">

        <label class="label">Temperamento</label>
        <select id="temp" class="input-premium" style="margin-bottom:20px; background:rgba(25, 30, 45, 0.9); color:white; border:1px solid rgba(255,255,255,0.1);">
          <option value="Tranquilo" ${child.temperament === 'Tranquilo' ? 'selected' : ''}>Tranquilo</option>
          <option value="Intenso" ${child.temperament === 'Intenso' ? 'selected' : ''}>Intenso / Activo</option>
          <option value="Sensible" ${child.temperament === 'Sensible' ? 'selected' : ''}>Sensible</option>
        </select>

        <label class="label">Sexo</label>
        <select id="gender" class="input-premium" style="margin-bottom:20px; background:rgba(25, 30, 45, 0.9); color:white; border:1px solid rgba(255,255,255,0.1);">
          <option value="chico" ${child.gender === 'chico' ? 'selected' : ''}>Chico</option>
          <option value="chica" ${child.gender === 'chica' ? 'selected' : ''}>Chica</option>
        </select>

        <div class="os-card" style="margin-top:20px; background:rgba(15, 23, 42, 0.6); border:1px solid var(--primary);">
          <p class="label" style="color:var(--primary); margin-bottom:15px; font-weight:800; letter-spacing:1px;">EVALUACIÓN INICIAL RADAR</p>
          <p style="font-size:11px; color:rgba(255,255,255,0.5); margin-bottom:20px;">Selecciona el nivel de madurez actual de 1 a 5.</p>
          ${Object.keys(RADAR_AREAS).map(k => {
    const val = state.tempRadarValues[k];
    return `
              <div style="margin-bottom:25px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                  <span style="font-size:13px; font-weight:700; color:white;">${RADAR_AREAS[k].icon} ${RADAR_AREAS[k].name}</span>
                </div>
                <div style="display:flex; gap:10px;">
                   ${[1, 2, 3, 4, 5].map(v => `
                      <div id="radar-btn-${k}-${v}" class="radar-btn-${k}" onclick="setTempRadar('${k}', ${v})" style="flex:1; height:45px; border-radius:12px; background:${val == v ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; color:white; display:flex; align-items:center; justify-content:center; font-weight:900; border:1px solid ${val == v ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; cursor:pointer; transition:all 0.2s;">${v}</div>
                   `).join('')}
                </div>
              </div>
            `;
  }).join('')}
        </div>

        <button class="btn-primary" onclick="saveChild('${id || ''}')" style="margin-top:30px; width:100%; padding:20px; font-weight:900;">GUARDAR CAMBIOS</button>
        ${id ? `<button class="btn-delete" onclick="deleteChild('${id}')" style="margin-top:15px; width:100%; border:none; background:none; color:rgba(255,255,255,0.4); font-size:12px;">Eliminar Perfil</button>` : ''}
      </div>
    </div>
  `;
}
