import { state, save } from '../state.js';
import { RADAR_AREAS, RADAR_INDICATORS, TEMPERAMENTS, DIAGNOSIS_MATRIX } from '../data.js';
import { calculateAge, calculateInitialRadar, getAgeBracket } from '../logic.js';

/**
 * PIVOT PROFILE WIZARD - ROBUSTNESS LEVEL: GOD MODE
 * Fixed ReferenceErrors by ensuring all handlers are explicitly global via window.
 */

// Global Handlers Definition
window.setEditGender = function (g) {
  try {
    const nameEl = document.getElementById('edit-name');
    const dateEl = document.getElementById('edit-date');
    if (nameEl) state.editData.name = nameEl.value;
    if (dateEl) state.editData.birthDate = dateEl.value;

    state.editData.gender = g;
    console.log("PIVOT: Gender set to", g);

    // Save scroll before render
    const scrollEl = document.querySelector('.view.scroll-y');
    const st = scrollEl ? scrollEl.scrollTop : 0;

    if (window.render) window.render();

    // Restore scroll after render
    const newScrollEl = document.querySelector('.view.scroll-y');
    if (newScrollEl && st) newScrollEl.scrollTop = st;
  } catch (e) {
    console.error("PIVOT Error in setEditGender:", e);
  }
};

window.setEditTemperament = function (t) {
  try {
    state.editData.temperament = t.toLowerCase();
    console.log("PIVOT: Temperament set to", t);

    // Save scroll before render
    const scrollEl = document.querySelector('.view.scroll-y');
    const st = scrollEl ? scrollEl.scrollTop : 0;

    if (window.render) window.render();

    // Restore scroll after render
    const newScrollEl = document.querySelector('.view.scroll-y');
    if (newScrollEl && st) newScrollEl.scrollTop = st;
  } catch (e) {
    console.error("PIVOT Error in setEditTemperament:", e);
  }
};

window.setEditResponse = function (key, idx) {
  // Save scroll before render
  const scrollEl = document.querySelector('.view.scroll-y');
  const st = scrollEl ? scrollEl.scrollTop : 0;

  state.editData.responses[key] = idx;

  if (window.render) window.render();

  // Restore scroll after render
  const newScrollEl = document.querySelector('.view.scroll-y');
  if (newScrollEl && st) newScrollEl.scrollTop = st;
};

window.goToEditStep = function (step) {
  state.editStep = step;
  if (window.render) window.render();
};

window.startEditChild = function (id) {
  state.editStep = 1;
  if (id) {
    const c = state.children.find(ch => ch.id === id);
    if (c) {
      state.editData = {
        name: c.name,
        birthDate: c.birthDate || '',
        gender: c.gender || 'chico',
        temperament: (c.temperament || 'tranquilo').toLowerCase(),
        responses: {}
      };
    }
  } else {
    state.editData = { name: '', birthDate: '', gender: 'chico', temperament: 'tranquilo', responses: {} };
  }
  state.editingChildId = id;
  state.view = 'edit_child';
  if (window.render) window.render();
};

window.cancelEdit = function () {
  state.view = 'profiles';
  if (window.render) window.render();
};

window.goToStep2 = function (id) {
  const nameEl = document.getElementById('edit-name');
  const dateEl = document.getElementById('edit-date');
  if (!nameEl || !nameEl.value || !dateEl || !dateEl.value) {
    alert("Por favor completa el nombre y la fecha.");
    return;
  }
  state.editData.name = nameEl.value;
  state.editData.birthDate = dateEl.value;
  state.editStep = 2;
  if (window.render) window.render();
};

window.goToStep3 = function (id) {
  state.editStep = 3;
  if (window.render) window.render();
};

window.finalizeEdit = function (id) {
  const age = state.editData.birthDate ? calculateAge(state.editData.birthDate) : 5;
  const radar = calculateInitialRadar(state.editData.responses, age);

  if (id) {
    const c = state.children.find(ch => ch.id === id);
    if (c) {
      c.name = state.editData.name;
      c.birthDate = state.editData.birthDate;
      c.gender = state.editData.gender;
      c.temperament = state.editData.temperament;
      c.radar = radar;
    }
  } else {
    state.children.push({
      id: Date.now().toString(),
      name: state.editData.name,
      birthDate: state.editData.birthDate,
      gender: state.editData.gender,
      temperament: state.editData.temperament,
      radar: radar,
      currentChallenge: null,
      weeklyFocus: ['autocontrol']
    });
  }

  save();
  state.view = 'profiles';
  if (window.render) window.render();
};

window.deleteChild = function (id) {
  if (state.children.length <= 1) { alert("Debes tener al menos un perfil de hijo."); return; }
  if (confirm("¿Estás seguro de eliminar este perfil? Esto borrará todo su historial.")) {
    state.children = state.children.filter(c => c.id !== id);
    if (state.currentChildId === id) state.currentChildId = state.children[0].id;
    save();
    state.view = 'profiles';
    if (window.render) window.render();
  }
};

// Render Functions
export function renderProfiles(container) {
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">Gestión Familiar</h2></header>
      
      <span class="label" style="margin:20px 0 15px; display:block;">Crecimiento de Hijos</span>
      <div style="display:flex; flex-direction:column; gap:12px;">
      ${state.children.map(c => `
        <div class="os-card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0; padding:15px;">
          <div style="display:flex; align-items:center; gap:15px; flex:1; cursor:pointer;" onclick="window.startEditChild('${c.id}')">
            <div style="width:45px; height:45px; background:linear-gradient(135deg, #1E293B, #0F172A); border: 1px solid rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:#F59E0B; font-weight:900; font-size:18px;">${c.name[0]}</div>
            <div>
               <h4 style="margin:0; color:white;">${c.name}</h4>
               <p style="font-size:12px; color:rgba(255,255,255,0.4); margin:2px 0 0;">${c.birthDate ? calculateAge(c.birthDate) + ' años' : 'Edad pendiente'}</p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:15px;">
            <button onclick="window.startEditChild('${c.id}')" style="background:none; border:none; color:#F59E0B; font-weight:800; font-size:10px; letter-spacing:1px; cursor:pointer; padding:10px;">EDITAR</button>
            ${state.children.length > 1 ? `
              <button onclick="window.deleteChild('${c.id}')" style="background:rgba(244, 63, 94, 0.1); border:none; border-radius:10px; padding:10px; color:#F43F5E; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            ` : ''}
          </div>
        </div>
      `).join('')}
      </div>

      <button class="btn-primary" style="margin-top:25px; background:rgba(245, 158, 11, 0.05); color:#F59E0B; border:2px dashed rgba(245, 158, 11, 0.3);" onclick="window.startEditChild()">+ Añadir nuevo perfil</button>
    </div>
  `;
}

export function renderEditChild(container, id) {
  if (state.editStep === 1) renderStep1(container, id);
  else if (state.editStep === 2) renderStep2(container, id);
  else if (state.editStep === 3) renderStep3(container, id);
}

function renderStep1(container, id) {
  container.innerHTML = `
        <div class="view scroll-y" style="padding:25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="window.cancelEdit()" style="background:rgba(255,255,255,0.1); border:none; border-radius:15px; padding:8px 15px; color:white; cursor:pointer;">Cancelar</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900;">PASO 1 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Ficha de Identidad</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:14px;">Empecemos por lo básico</p>
            </div>

            <div class="os-card" style="background:rgba(30, 41, 59, 0.5); padding:25px; border-radius:24px;">
                <label class="label" style="display:block; margin-bottom:8px;">Nombre</label>
                <input type="text" id="edit-name" class="input-premium" value="${state.editData.name}" placeholder="Ej: Alvaro" style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:white; margin-bottom:20px;">

                <label class="label" style="display:block; margin-bottom:8px;">Fecha de Nacimiento</label>
                <input type="date" id="edit-date" class="input-premium" value="${state.editData.birthDate}" style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:white; margin-bottom:20px;">

                <label class="label" style="display:block; margin-bottom:8px;">Sexo</label>
                <div style="display:flex; gap:10px;">
                    <button type="button" onclick="window.setEditGender('chico')" style="flex:1; padding:15px; border-radius:15px; border:2px solid ${state.editData.gender === 'chico' ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background:${state.editData.gender === 'chico' ? 'rgba(245, 158, 11, 0.1)' : 'transparent'}; color:white; font-weight:700; cursor:pointer;">Chico</button>
                    <button type="button" onclick="window.setEditGender('chica')" style="flex:1; padding:15px; border-radius:15px; border:2px solid ${state.editData.gender === 'chica' ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background:${state.editData.gender === 'chica' ? 'rgba(245, 158, 11, 0.1)' : 'transparent'}; color:white; font-weight:700; cursor:pointer;">Chica</button>
                </div>
            </div>

            <button onclick="window.goToStep2('${id || ''}')" class="btn-primary" style="margin-top:30px; background:linear-gradient(90deg, #D97706, #F59E0B); cursor:pointer;">CONTINUAR AL TEMPERAMENTO</button>
        </div>
    `;
}

function renderStep2(container, id) {
  container.innerHTML = `
        <div class="view scroll-y" style="padding:25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="window.goToEditStep(1)" style="background:rgba(255,255,255,0.1); border:none; border-radius:15px; padding:8px 15px; color:white; cursor:pointer;">Atrás</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900;">PASO 2 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Su Temperamento</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:14px;">Selecciona el perfil que más encaja</p>
            </div>

            <div style="display:grid; grid-template-columns:1fr; gap:12px;">
                ${Object.keys(TEMPERAMENTS).map(key => {
    const t = TEMPERAMENTS[key];
    const isActive = state.editData.temperament === key;
    return `
                        <div onclick="window.setEditTemperament('${key}')" 
                             style="background:rgba(30, 41, 59, 0.5); border:2px solid ${isActive ? '#F59E0B' : 'rgba(255,255,255,0.05)'}; border-radius:24px; padding:20px; display:flex; align-items:center; gap:15px; transition:0.3s; cursor:pointer;">
                            <div style="width:50px; height:50px; background:${isActive ? '#F59E0B' : 'rgba(255,255,255,0.05)'}; border-radius:15px; display:flex; align-items:center; justify-content:center; font-size:24px; pointer-events:none;">${t.icon}</div>
                            <div style="flex:1; pointer-events:none;">
                                <div style="color:white; font-weight:800; font-size:14px; pointer-events:none;">${t.name}</div>
                                <div style="color:rgba(255,255,255,0.5); font-size:12px; line-height:1.3; pointer-events:none;">${t.desc}</div>
                            </div>
                        </div>
                    `;
  }).join('')}
            </div>

            <button onclick="window.goToStep3('${id || ''}')" class="btn-primary" style="margin-top:30px; background:linear-gradient(90deg, #D97706, #F59E0B); cursor:pointer;">EVALUAR HITOS DE MADUREZ</button>
        </div>
    `;
}

function renderStep3(container, id) {
  try {
    const age = state.editData.birthDate ? calculateAge(state.editData.birthDate) : 5;
    const bracket = getAgeBracket(age) || '4-6';
    const indicators = RADAR_INDICATORS[bracket];

    container.innerHTML = `
        <div class="view scroll-y" style="padding:25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="window.goToEditStep(2)" style="background:rgba(255,255,255,0.1); border:none; border-radius:15px; padding:8px 15px; color:white; cursor:pointer;">Atrás</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900;">PASO 3 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Hitos de Crecimiento</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:14px;">¿Cómo ves a ${state.editData.name || 'tu hijo'} en estas áreas?</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:20px;">
                ${Object.keys(RADAR_AREAS).map(key => {
      const area = RADAR_AREAS[key];
      const ageMatrix = DIAGNOSIS_MATRIX[age] || DIAGNOSIS_MATRIX[1];
      const question = ageMatrix[key]?.q || 'Indicador pendiente.';
      const val = state.editData.responses[key] || 0;
      return `
                        <div class="os-card" style="background:rgba(30, 41, 59, 0.5); padding:20px; border-radius:24px;">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                                <div style="width:32px; height:32px; background:rgba(255,255,255,0.05); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px;">${area.icon}</div>
                                <span style="color:white; font-weight:800; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">${area.name}</span>
                            </div>
                            <p style="color:rgba(255,255,255,0.8); font-size:15px; margin-bottom:18px; line-height:1.5; font-style:italic;">"${question}"</p>
                            
                            <div style="display:flex; gap:8px;">
                                ${['No', 'A veces', 'Sí'].map((label, idx) => `
                                    <button type="button" onclick="window.setEditResponse('${key}', ${idx})" 
                                            style="flex:1; padding:12px; border-radius:14px; border:1px solid ${val === idx ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background:${val === idx ? 'rgba(245, 158, 11, 0.2)' : 'transparent'}; color:white; font-size:12px; font-weight:800; cursor:pointer; transition:0.2s;">
                                        ${label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>

            <button onclick="window.finalizeEdit('${id || ''}')" class="btn-primary" style="margin-top:30px; background:linear-gradient(90deg, #D97706, #F59E0B); padding:20px; font-weight:900; cursor:pointer;">
                FINALIZAR Y CREAR PERFIL
            </button>
        </div>
    `;
  } catch (e) {
    console.error("PIVOT: Error rendering step 3", e);
    container.innerHTML = `<div class="view p-20">Error cargando hitos. Por favor vuelve atrás. <button onclick="window.goToEditStep(2)">Atrás</button></div>`;
  }
}
