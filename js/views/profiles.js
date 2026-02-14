import { state, save } from '../state.js';
import { RADAR_AREAS, RADAR_INDICATORS, TEMPERAMENTS } from '../data.js';
import { calculateAge, calculateInitialRadar } from '../logic.js';

let editStep = 1;
let editData = {
  name: '',
  birthDate: '',
  gender: 'chico',
  temperament: 'tranquilo',
  responses: {} // areaKey: 0|1|2
};

export function renderProfiles(container) {
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">Gestión Familiar</h2></header>
      
      <span class="label" style="margin:20px 0 15px; display:block;">Crecimiento de Hijos</span>
      <div style="display:flex; flex-direction:column; gap:12px;">
      ${state.children.map(c => `
        <div class="os-card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0;" onclick="startEditChild('${c.id}')">
          <div style="display:flex; align-items:center; gap:15px;">
            <div style="width:45px; height:45px; background:linear-gradient(135deg, #1E293B, #0F172A); border: 1px solid rgba(255,255,255,0.1); border-radius:12px; display:flex; align-items:center; justify-content:center; color:#F59E0B; font-weight:900; font-size:18px;">${c.name[0]}</div>
            <div>
               <h4 style="margin:0;">${c.name}</h4>
               <p style="font-size:12px; color:var(--text-muted);">${c.birthDate ? calculateAge(c.birthDate) + ' años' : 'Edad pendiente'}</p>
            </div>
          </div>
          <span style="color:#F59E0B; font-weight:800; font-size:11px; letter-spacing:1px;">GESTIONAR</span>
        </div>
      `).join('')}
      </div>

      <button class="btn-primary" style="margin-top:25px; background:rgba(245, 158, 11, 0.05); color:#F59E0B; border:2px dashed rgba(245, 158, 11, 0.3);" onclick="startEditChild()">+ Añadir nuevo perfil</button>
    </div>
  `;
}

export function renderEditChild(container, id) {
  if (editStep === 1) renderStep1(container, id);
  else if (editStep === 2) renderStep2(container, id);
  else if (editStep === 3) renderStep3(container, id);
}

// STEP 1: FICHA BÁSICA
function renderStep1(container, id) {
  container.innerHTML = `
        <div class="view scroll-y" style="padding:25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="cancelEdit()" style="background:rgba(255,255,255,0.1); border:none; border-radius:15px; padding:8px 15px; color:white;">Cancelar</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900;">PASO 1 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Ficha de Identidad</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:14px;">Empecemos por lo básico</p>
            </div>

            <div class="os-card" style="background:rgba(30, 41, 59, 0.5); padding:25px; border-radius:24px;">
                <label class="label" style="display:block; margin-bottom:8px;">Nombre</label>
                <input type="text" id="edit-name" class="input-premium" value="${editData.name}" placeholder="Ej: Alvaro" style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:white; margin-bottom:20px;">

                <label class="label" style="display:block; margin-bottom:8px;">Fecha de Nacimiento</label>
                <input type="date" id="edit-date" class="input-premium" value="${editData.birthDate}" style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:white; margin-bottom:20px;">

                <label class="label" style="display:block; margin-bottom:8px;">Sexo</label>
                <div style="display:flex; gap:10px;">
                    <button onclick="editData.gender='chico'; renderStep1(document.getElementById('app'), '${id || ''}')" style="flex:1; padding:15px; border-radius:15px; border:2px solid ${editData.gender === 'chico' ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background:${editData.gender === 'chico' ? 'rgba(245, 158, 11, 0.1)' : 'transparent'}; color:white; font-weight:700;">Chico</button>
                    <button onclick="editData.gender='chica'; renderStep1(document.getElementById('app'), '${id || ''}')" style="flex:1; padding:15px; border-radius:15px; border:2px solid ${editData.gender === 'chica' ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background:${editData.gender === 'chica' ? 'rgba(245, 158, 11, 0.1)' : 'transparent'}; color:white; font-weight:700;">Chica</button>
                </div>
            </div>

            <button onclick="goToStep2('${id || ''}')" class="btn-primary" style="margin-top:30px; background:linear-gradient(90deg, #D97706, #F59E0B);">CONTINUAR AL TEMPERAMENTO</button>
        </div>
    `;
}

// STEP 2: TEMPERAMENTO
function renderStep2(container, id) {
  container.innerHTML = `
        <div class="view scroll-y" style="padding:25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="editStep=1; renderEditChild(document.getElementById('app'), '${id || ''}')" style="background:rgba(255,255,255,0.1); border:none; border-radius:15px; padding:8px 15px; color:white;">Atrás</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900;">PASO 2 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Su Temperamento</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:14px;">Selecciona el perfil que más encaja</p>
            </div>

            <div style="display:grid; grid-template-columns:1fr; gap:12px;">
                ${Object.keys(TEMPERAMENTS).map(key => {
    const t = TEMPERAMENTS[key];
    const isActive = editData.temperament === key;
    return `
                        <div onclick="editData.temperament='${key}'; renderStep2(document.getElementById('app'), '${id || ''}')" 
                             style="background:rgba(30, 41, 59, 0.5); border:2px solid ${isActive ? '#F59E0B' : 'rgba(255,255,255,0.05)'}; border-radius:24px; padding:20px; display:flex; align-items:center; gap:15px; transition:0.3s; cursor:pointer;">
                            <div style="width:50px; height:50px; background:${isActive ? '#F59E0B' : 'rgba(255,255,255,0.05)'}; border-radius:15px; display:flex; align-items:center; justify-content:center; font-size:24px;">${t.icon}</div>
                            <div style="flex:1;">
                                <div style="color:white; font-weight:800; font-size:14px;">${t.name}</div>
                                <div style="color:rgba(255,255,255,0.5); font-size:12px; line-height:1.3;">${t.desc}</div>
                            </div>
                        </div>
                    `;
  }).join('')}
            </div>

            <button onclick="goToStep3('${id || ''}')" class="btn-primary" style="margin-top:30px; background:linear-gradient(90deg, #D97706, #F59E0B);">EVALUAR HITOS DE MADUREZ</button>
        </div>
    `;
}

// STEP 3: HITOS DE MADUREZ
function renderStep3(container, id) {
  const age = calculateAge(editData.birthDate);
  const bracket = getBracketForAge(age);
  const indicators = RADAR_INDICATORS[bracket];

  container.innerHTML = `
        <div class="view scroll-y" style="padding:25px 25px 120px; background:#0F172A;">
            <header class="header-compact">
                <button onclick="editStep=2; renderEditChild(document.getElementById('app'), '${id || ''}')" style="background:rgba(255,255,255,0.1); border:none; border-radius:15px; padding:8px 15px; color:white;">Atrás</button>
            </header>

            <div style="text-align:center; margin: 20px 0 30px;">
                <span style="color:#F59E0B; font-size:10px; letter-spacing:2px; font-weight:900;">PASO 3 DE 3</span>
                <h2 style="color:white; font-family:'Outfit'; margin:5px 0;">Hitos de Crecimiento</h2>
                <p style="color:rgba(255,255,255,0.4); font-size:14px;">¿Cómo ves a ${editData.name || 'tu hijo'} en estas áreas?</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:20px;">
                ${Object.keys(RADAR_AREAS).map(key => {
    const area = RADAR_AREAS[key];
    const question = indicators[key];
    const val = editData.responses[key] || 0;
    return `
                        <div class="os-card" style="background:rgba(30, 41, 59, 0.5); padding:20px; border-radius:24px;">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                                <span style="font-size:18px;">${area.icon}</span>
                                <span style="color:white; font-weight:800; font-size:13px; text-transform:uppercase;">${area.name}</span>
                            </div>
                            <p style="color:rgba(255,255,255,0.8); font-size:14px; margin-bottom:15px; font-style:italic;">"${question}"</p>
                            
                            <div style="display:flex; gap:8px;">
                                ${['No', 'A veces', 'Sí'].map((label, idx) => `
                                    <button onclick="editData.responses['${key}']=${idx}; renderStep3(document.getElementById('app'), '${id || ''}')" 
                                            style="flex:1; padding:10px; border-radius:12px; border:1px solid ${val === idx ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background:${val === idx ? 'rgba(245, 158, 11, 0.2)' : 'transparent'}; color:white; font-size:12px; font-weight:700;">
                                        ${label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
  }).join('')}
            </div>

            <button onclick="finalizeEdit('${id || ''}')" class="btn-primary" style="margin-top:30px; background:linear-gradient(90deg, #D97706, #F59E0B); padding:20px; font-weight:900;">
                FINALIZAR Y CREAR PERFIL
            </button>
            
            ${id ? `<button onclick="deleteChild('${id}')" style="margin-top:20px; width:100%; border:none; background:none; color:rgba(255,255,255,0.3); font-size:11px;">Eliminar Perfil Definitivamente</button>` : ''}
        </div>
    `;
}

// LOGIC HELPERS
window.startEditChild = function (id) {
  editStep = 1;
  if (id) {
    const c = state.children.find(ch => ch.id === id);
    editData = {
      name: c.name,
      birthDate: c.birthDate || '',
      gender: c.gender || 'chico',
      temperament: c.temperament || 'tranquilo',
      responses: {} // Not restored from radar as it's a new assessment
    };
  } else {
    editData = { name: '', birthDate: '', gender: 'chico', temperament: 'tranquilo', responses: {} };
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
  const name = document.getElementById('edit-name').value;
  const date = document.getElementById('edit-date').value;
  if (!name || !date) { alert("Por favor completa el nombre y la fecha."); return; }
  editData.name = name;
  editData.birthDate = date;
  editStep = 2;
  if (window.render) window.render();
};

window.goToStep3 = function (id) {
  editStep = 3;
  if (window.render) window.render();
};

window.finalizeEdit = function (id) {
  const radar = calculateInitialRadar(editData.responses);

  if (id) {
    const c = state.children.find(ch => ch.id === id);
    c.name = editData.name;
    c.birthDate = editData.birthDate;
    c.gender = editData.gender;
    c.temperament = editData.temperament;
    c.radar = radar;
  } else {
    state.children.push({
      id: Date.now().toString(),
      name: editData.name,
      birthDate: editData.birthDate,
      gender: editData.gender,
      temperament: editData.temperament,
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

function getBracketForAge(age) {
  if (age <= 3) return '1-3';
  if (age <= 6) return '4-6';
  if (age <= 10) return '7-10';
  if (age <= 13) return '11-13';
  return '14-18';
}
