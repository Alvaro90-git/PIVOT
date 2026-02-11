function setReportVal(val, element) {
   state.currentReportVal = val;
   document.querySelectorAll('.report-opt-btn').forEach(el => {
      el.style.background = 'rgba(255,255,255,0.05)';
      el.style.border = '1px solid rgba(255,255,255,0.1)';
      el.style.fontWeight = '800';
   });
   element.style.background = '#F59E0B';
   element.style.border = '1px solid #F59E0B';
   element.style.fontWeight = '900';
}

function renderChallengeReport(container) {
   const child = getChild();
   state.currentReportVal = 66; // Default to 'Bien'
   container.innerHTML = `
    <div class="view scroll-y p-20">
      <header class="header-compact"><button class="btn-back" onclick="setView('home')">✕</button><h2 style="font-size:20px; font-weight:900;">Reporte Diario</h2></header>
      <div class="os-card" style="margin-top:40px;">
         <p class="label">RETO EN CURSO</p>
         <h3>${child.currentChallenge.title}</h3>
         <div class="focus-why">${GROWTH_CONCEPTS[child.currentChallenge.concept].why}</div>
         
         <div style="margin-top:40px;">
            <p style="font-size:14px; font-weight:800; text-align:center; color:var(--text-muted); margin-bottom:10px;">¿Cómo ha ido hoy?</p>
            <div class="report-options" style="display:flex; gap:10px; justify-content:center;">
               <div class="report-opt-btn" id="opt-0" onclick="setReportVal(0, this)" style="flex:1; padding:15px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">No cumple</div>
               <div class="report-opt-btn" id="opt-33" onclick="setReportVal(33, this)" style="flex:1; padding:15px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">A veces</div>
               <div class="report-opt-btn active" id="opt-66" onclick="setReportVal(66, this)" style="flex:1; padding:15px; border-radius:12px; background:var(--primary); color:white; font-size:11px; font-weight:900; border:1px solid var(--primary); cursor:pointer;">Bien</div>
               <div class="report-opt-btn" id="opt-100" onclick="setReportVal(100, this)" style="flex:1; padding:15px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Muy bien</div>
            </div>
         </div>
      </div>
      <button class="btn-primary" onclick="submitReport()" style="margin-top:20px;">Guardar Reporte</button>
    </div>
  `;
}

function submitReport() {
   const val = state.currentReportVal !== undefined ? state.currentReportVal : 66;
   const child = getChild();
   const situation = state.selectedSituation ? SITUATIONS.find(s => s.id === state.selectedSituation) : null;

   let growthMessage = "Manteniendo el rumbo...";
   let improvedAreas = [];
   let isPositive = val >= 66;

   if (situation && situation.radarAreas) {
      situation.radarAreas.forEach(area => {
         const oldVal = child.radar[area] || 1;
         if (isPositive) {
            // Positive: "Bien" (0.1) or "Muy bien" (0.2)
            const increment = val === 100 ? 0.2 : 0.1;
            child.radar[area] = Math.min(5, oldVal + increment);
            improvedAreas.push({ name: RADAR_AREAS[area].name, icon: RADAR_AREAS[area].icon });
         } else {
            // Negative: "Regular" (-0.1) or "Mal" (-0.2)
            const decrement = val === 0 ? 0.2 : 0.1;
            child.radar[area] = Math.max(1, oldVal - decrement);
            improvedAreas.push({ name: RADAR_AREAS[area].name, icon: RADAR_AREAS[area].icon });
         }
      });
   }

   if (improvedAreas.length > 0) {
      if (isPositive) {
         growthMessage = `¡ÉXITO! +${val === 100 ? '0.2' : '0.1'} en ${improvedAreas.map(a => a.name).join(', ')}`;
      } else {
         growthMessage = `REAJUSTE: -${val === 0 ? '0.2' : '0.1'} en ${improvedAreas.map(a => a.name).join(', ')}`;
      }
   }

   child.lastReport = {
      val: val,
      date: new Date().toISOString(),
      situation: situation ? situation.name : 'Varios',
      message: growthMessage,
      isPositive: isPositive,
      personalizedPhrase: getPersonalizedFeedbackPhrase(child.name, state.selectedSituation, val)
   };

   state.streak = isPositive ? state.streak + 1 : 0;
   state.view = 'feedback';
   render();
}

function renderFeedback(container) {
   const child = getChild();
   const report = child.lastReport;
   const icons = {
      success: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
      calm: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
   };

   container.innerHTML = `
    <div class="view login-screen" style="z-index:99999;">
      <div class="login-card" style="text-align:center; animation: cardFadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); width: 90%; max-width: 400px; padding: 40px 30px;">
        
        ${report.isPositive
         ? `<div style="margin-bottom:20px;">${icons.success}</div>`
         : `<div class="breathing-circle">${icons.calm}</div>`
      }

        <h2 style="font-family:'Outfit', sans-serif; font-weight:900; font-size:28px; margin-bottom:12px; color: white;">
          ${report.isPositive ? '¡Excelente Conexión!' : 'Coge aire y sigue'}
        </h2>
        
        <p style="color:rgba(255,255,255,0.7); font-size:15px; line-height:1.6; margin-bottom:30px;">
          ${report.personalizedPhrase}
        </p>
        
        <div class="os-card" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); padding:20px; border-radius:20px;">
           <div style="font-weight:800; font-size:16px; color:var(--primary); letter-spacing:1px; text-transform:uppercase;">
              ${report.message}
           </div>
        </div>

        <div style="display:flex; justify-content:center; width:100%;">
          <button class="btn-primary" style="margin-top:40px; width:100%; border-radius:30px; font-weight:800; background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); color: white; border: none; padding: 18px; cursor: pointer; font-family: 'Outfit', sans-serif; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);" onclick="setView('home')">CONTINUAR AVENTURA</button>
        </div>
      </div>
    </div>
  `;
}

function toggleChallengeProgress(challengeId) {
   if (!state.challengeProgress) state.challengeProgress = {};
   if (!state.challengeLastUpdate) state.challengeLastUpdate = {};

   const current = state.challengeProgress[challengeId] || 0;
   const lastUpdate = state.challengeLastUpdate[challengeId];
   const today = new Date().toDateString();

   if (lastUpdate === today) {
      alert('¡Ya has registrado tu avance de hoy! Vuelve mañana para seguir sumando.');
      return;
   }

   const areaKey = challengeId.split('_')[2];
   const child = getChild();

   if (current < 7) {
      state.challengeProgress[challengeId] = current + 1;
      state.challengeLastUpdate[challengeId] = today;

      // RECOMPENSA: +0.1 en el área correspondiente
      const oldVal = child.radar[areaKey] || 1;
      child.radar[areaKey] = Math.min(5, oldVal + 0.1);

      // Registrar reporte para el feedback
      child.lastReport = {
         val: 100,
         date: new Date().toISOString(),
         situation: `Reto: ${RADAR_AREAS[areaKey].name}`,
         message: `¡AVANCE LOGRADO! +0.1 en ${RADAR_AREAS[areaKey].name}`,
         isPositive: true
      };

      state.streak++;
      state.view = 'feedback';
   }

   save();
   render();
}

function viewChallenge(areaKey) {
   const child = getChild();

   // Resolve library for age
   let bracket = '0-2';
   if (child.age >= 3 && child.age <= 5) bracket = '3-5';
   else if (child.age >= 6 && child.age <= 9) bracket = '6-9';
   else if (child.age >= 10 && child.age <= 13) bracket = '10-13';
   else if (child.age >= 14) bracket = '14-18';

   const lib = CHALLENGE_DB[bracket][areaKey];
   const conceptWhy = GROWTH_CONCEPTS[areaKey].why;

   // Find the challenge object to get current progress
   const challenges = getWeeklyChallenges(child);
   const challenge = challenges.find(c => c.areaKey === areaKey);

   const progress = challenge ? challenge.completedDays : 0;
   const total = 7;
   const chId = challenge ? challenge.id : `ch_${child.id}_${areaKey}_w1`;

   const app = document.getElementById('app');
   const savedLastUpdate = state.challengeLastUpdate?.[chId];
   const today = new Date().toDateString();
   const isDoneToday = savedLastUpdate === today;

   app.innerHTML = `
    <style>
        .challenge-header {
            background: linear-gradient(180deg, #0D3B40 0%, #0F172A 100%);
            padding: 30px 25px 40px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .concept-badge {
            background: rgba(245, 158, 11, 0.1);
            color: #F59E0B;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 1px solid rgba(245, 158, 11, 0.2);
            display: inline-block;
            margin-bottom: 15px;
        }
        .mission-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 25px;
            margin-top: -30px;
            margin-left: 20px;
            margin-right: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .educational-card {
            background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
            border: 1px solid rgba(79, 70, 229, 0.2);
            border-radius: 20px;
            padding: 20px;
            margin: 25px 0;
            display: flex;
            gap: 15px;
            align-items: flex-start;
        }
        .day-tracker {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding: 0 10px;
        }
        .day-circle {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 800;
            color: rgba(255,255,255,0.3);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .day-circle.completed {
            background: #10B981;
            border-color: #10B981;
            color: white;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
            transform: scale(1.1);
        }
        .day-circle.active {
            border-color: #F59E0B;
            color: #F59E0B;
            animation: pulse-day 2s infinite;
        }
        @keyframes pulse-day {
            0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
            100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        .step-item {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255,255,255,0.03);
            border-radius: 16px;
            border-left: 4px solid #F59E0B;
        }
    </style>

    <div class="view scroll-y" style="background:#0F172A; padding-bottom:120px;">
      
      <div class="challenge-header">
         <button onclick="setView('home')" style="background:none; border:none; color:white; font-size:24px; cursor:pointer; margin-bottom: 20px;">✕</button>
         <div>
            <div class="concept-badge">${RADAR_AREAS[areaKey].name}</div>
            <h1 style="color:white; font-size:32px; font-family:'Outfit', sans-serif; margin:0; line-height:1.1; font-weight:900;">${lib.title}</h1>
         </div>
      </div>

      <div class="mission-card">
         <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px;">
            <div style="font-size:50px; background:${lib.gradient}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));">
               ${lib.icon}
            </div>
            <div style="flex:1;">
               <div style="font-size:11px; color:rgba(255,255,255,0.5); font-weight:800; text-transform:uppercase; letter-spacing:1.5px;">MISIÓN ACTUAL</div>
               <div style="color:white; font-size:18px; font-weight:700; line-height:1.3;">${lib.description}</div>
            </div>
         </div>

         <div class="day-tracker">
            ${Array.from({ length: 7 }).map((_, i) => {
      const isCompleted = i < progress;
      const isActive = i === progress && !isDoneToday && progress < total;
      return `<div class="day-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">${isCompleted ? '✓' : (i + 1)}</div>`;
   }).join('')}
         </div>

         <div style="text-align:center;">
             <div style="font-size:13px; color:rgba(255,255,255,0.6); margin-bottom:5px;">Progreso Semanal</div>
             <div style="font-size:20px; color:white; font-weight:900;">${progress} de 7 días</div>
         </div>
      </div>

      <div style="padding: 0 25px;">
         
         <div class="educational-card">
            <div style="font-size:24px;">🎓</div>
            <div>
               <h4 style="color:white; margin:0 0 5px; font-size:15px; font-weight:800;">¿Por qué este reto?</h4>
               <p style="color:rgba(255,255,255,0.7); font-size:13px; line-height:1.5; margin:0;">${conceptWhy}</p>
            </div>
         </div>

         <style>
            .timeline-container {
                position: relative;
                margin: 20px 0;
                padding-left: 20px;
            }
            .timeline-container::before {
                content: '';
                position: absolute;
                left: 8px;
                top: 10px;
                bottom: 10px;
                width: 2px;
                background: rgba(255,255,255,0.05);
            }
            .timeline-item {
                position: relative;
                padding-bottom: 25px;
                padding-left: 30px;
            }
            .timeline-dot {
                position: absolute;
                left: -17px;
                top: 2px;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                border: 3px solid #0F172A;
                z-index: 2;
            }
            .phase-label {
                font-size: 10px;
                font-weight: 800;
                color: rgba(255,255,255,0.4);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 4px;
            }
            .step-desc {
                color: white;
                font-size: 15px;
                line-height: 1.5;
                font-weight: 500;
            }
            .magic-words {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 12px 15px;
                margin-top: 10px;
                border-left: 3px solid #34D399;
                font-size: 13px;
                color: #A7F3D0;
                font-style: italic;
            }
         </style>

         <h3 style="color:white; font-size:20px; font-weight:800; margin:30px 0 20px; font-family:'Outfit', sans-serif; display:flex; align-items:center; gap:10px;">
            <span style="color:#F59E0B;">▶</span> Paso a Paso
         </h3>

         <div class="timeline-container">
            ${lib.steps.map((step, i) => {
      const colors = ['#F59E0B', '#FCD34D', '#10B981'];
      const phases = ['Preparación', 'Momento clave', 'Cierre y Refuerzo'];
      return `
                <div class="timeline-item">
                   <div class="timeline-dot" style="background: ${colors[i]}"></div>
                   <div class="phase-label" style="color: ${colors[i]}">${phases[i]}</div>
                   <div class="step-desc">${step}</div>
                </div>
                `;
   }).join('')}
         </div>

         <!-- Palabras Mágicas (Scripting para padres) -->
         <div style="margin-top:10px; margin-bottom:30px;">
            <div style="font-size:12px; color:rgba(255,255,255,0.5); font-weight:700; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
               <span>💬</span> Frase recomendada
            </div>
            <div class="magic-words">
               "Entiendo que esto te cuesta, pero confío en que puedes lograrlo. Yo estoy aquí para apoyarte."
            </div>
         </div>

         <div style="background:rgba(245, 158, 11, 0.05); border: 1px dashed rgba(245, 158, 11, 0.3); border-radius:16px; padding:15px; margin-top:20px;">
            <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
               <span style="font-size:18px;">💡</span>
               <span style="color:#F59E0B; font-weight:900; font-size:12px; text-transform:uppercase;">Tip experto</span>
            </div>
            <p style="color:rgba(255,255,255,0.8); font-size:13px; font-style:italic; margin:0;">"${lib.tips}"</p>
         </div>

         <button onclick="toggleChallengeProgress('${chId}')" ${isDoneToday || progress >= total ? 'disabled' : ''} style="margin-top:40px; width:100%; height:70px; background:${isDoneToday || progress >= total ? 'rgba(255,255,255,0.05)' : 'linear-gradient(90deg, #D97706 0%, #F59E0B 100%)'}; color:${isDoneToday || progress >= total ? 'rgba(255,255,255,0.3)' : 'white'}; font-weight:900; border-radius:35px; border:none; font-size:18px; box-shadow: ${isDoneToday ? 'none' : '0 15px 35px rgba(245, 158, 11, 0.3)'}; cursor:${isDoneToday ? 'default' : 'pointer'};">
            ${progress >= total ? '🎯 ¡RETO SUPERADO!' : (isDoneToday ? '✓ REGISTRADO POR HOY' : 'LOGRADO HOY')}
         </button>

      </div>
    </div>
    `;
}
