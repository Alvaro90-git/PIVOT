function renderHome(container) {
  const child = getChild();
  if (!child.radar) child.radar = { autocontrol: 1, responsabilidad: 1, respeto: 1, autonomia: 1, emocional: 1, social: 1, esfuerzo: 1, reparacion: 1 };
  if (!child.weeklyFocus) child.weeklyFocus = ['autocontrol'];
  const advice = getContextAdvice(child);
  const challenges = getWeeklyChallenges(child);

  container.innerHTML = `
    <style>
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-3px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes shimmer {
            0% { transform: translateX(-150%); }
            50% { transform: translateX(150%); }
            100% { transform: translateX(150%); }
        }
        .premium-tip {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%) !important;
            border: 1px solid rgba(255,255,255,0.2) !important;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        }
        .premium-tip .floating-icon {
            animation: float 3s ease-in-out infinite;
            filter: drop-shadow(0 0 8px rgba(255, 255, 0, 0.6));
        }
        .shimmer-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: translateX(-150%);
            animation: shimmer 4s infinite;
            pointer-events: none;
        }
    </style>

    <div style="height:100vh; display:flex; flex-direction:column; overflow-y:auto; overflow-x:hidden;">
      
      <div style="flex-shrink:0; background:#0F172A; z-index:10; border-bottom:1px solid rgba(255,255,255,0.05); box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
        <header class="header" style="border:none; background:transparent; padding: 15px 25px 5px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="logo">
           <span style="font-weight:900; letter-spacing:1px; color:white; font-size:24px; font-family:'Outfit', sans-serif;">PIVOT</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
           <div onclick="setView('expert')" style="width:32px; height:32px; border-radius:10px; background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; cursor:pointer;">🔐</div>
        </div>
      </div>
      <div class="child-switcher" style="padding: 15px 0 0;">
        ${state.children.map(c => `
          <div class="child-chip ${state.currentChildId === c.id ? 'active' : ''}" onclick="switchChild('${c.id}')" style="background:${state.currentChildId === c.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; color:white; border:1px solid ${state.currentChildId === c.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; padding: 6px 16px; font-size:13px;">
            ${c.name}
          </div>
        `).join('')}
        <div class="child-chip" onclick="setView('profiles')" style="background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); padding: 6px 12px;">⚙️</div>
      </div>
    </header>

    <div style="padding-top:0px; padding-bottom:0px;">
      
      <!-- METRICS SECTION -->
      <div style="padding: 0 25px; margin-bottom:15px; margin-top:10px;">
         <div class="os-card" style="background:rgba(15, 23, 42, 0.95); border-radius:14px; border:1px solid rgba(255,255,255,0.1); padding:10px; position:relative; overflow:hidden;">
            
            <div style="text-align:center; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:10px;">
                <span style="color:rgba(255,255,255,0.5); font-size:9px; letter-spacing:1.5px; font-weight:800; text-transform:uppercase;">GUÍA DE CRECIMIENTO</span>
                <h3 style="margin:2px 0 0; color:white; font-size:16px; font-family:'Outfit', sans-serif;">${child.name} (${child.age} años)</h3>
            </div>

            <!-- DASHBOARD HERO CONTENT -->
            <div class="dashboard-hero-content">
                
                <!-- 1. TIPS WIDGET (PREMIUM) -->
                <div class="tips-widget premium-tip" onclick="setView('tips')" style="background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%) !important; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;">
                    <div class="tips-icon floating-icon">💡</div>
                    <div class="tips-text" style="font-size: 16px; font-weight: 800; letter-spacing: 0.5px;">TIPS <br>DIARIOS</div>
                    <div class="shimmer-effect"></div>
                </div>

                <!-- 2. SPIRALS (Middle) -->
                <div class="spirals-wrapper" onclick="setView('faro')" style="cursor:pointer;">
                   ${Object.keys(RADAR_AREAS).map(key => {
    const val = child.radar[key] || 1;
    const numVal = typeof val === 'string' ? parseFloat(val) : val;
    const target = getSmartTarget(child.age, key);
    const color = (target - numVal) <= 0 ? '#10B981' : ((target - numVal) <= 1.0 ? '#F59E0B' : '#EF4444');
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(100, (numVal / 5) * 100);
    const dashoffset = circumference - (progress / 100) * circumference;
    const targetAngle = (target / 5) * 360;

    return `
            <div style="display:flex; flex-direction:column; align-items:center;">
                <div style="position:relative; width:70px; height:70px; display:flex; align-items:center; justify-content:center;">
                    <svg width="70" height="70" viewBox="0 0 70 70" style="transform: rotate(-90deg);">
                        <circle cx="35" cy="35" r="${radius}" stroke="rgba(255,255,255,0.1)" stroke-width="5" fill="none" />
                        <circle cx="35" cy="35" r="${radius}" stroke="${color}" stroke-width="5" fill="none" stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" />
                    </svg>
                    <div style="position:absolute; width:100%; height:100%; top:0; left:0; pointer-events:none; transform: rotate(${targetAngle}deg);">
                        <div style="position:absolute; top:2px; left:50%; transform:translateX(-50%); width:3px; height:8px; background:#10B981; border-radius:1px; box-shadow:0 0 6px #10B981;"></div>
                    </div>
                    <div style="position:absolute; text-align:center;">
                        <div style="font-size:16px; font-weight:900; color:white; line-height:1;">${numVal.toFixed(1)}</div>
                        <div style="font-size:10px; color:rgba(255,255,255,0.5); font-weight:600; margin-top:-2px;">/${target.toFixed(1)}</div>
                    </div>
                </div>
                <!-- Area Name -->
                <div style="margin-top:4px; font-size:9px; color:rgba(255,255,255,0.9); font-weight:800; max-width:70px; text-align:center; line-height:1.1;">${RADAR_AREAS[key]?.name.split(' ')[0]}</div>
            </div>
        `;
  }).join('')}
                </div>

                <!-- 3. RADAR (Right) -->
                <div class="radar-wrapper" onclick="setView('faro')" style="cursor:pointer;">
                    ${getRadarSVG(child)}
                </div>

            </div>
         </div>
       </div>

      </div>
    
      <!-- AHORA EN FAMILIA / IDEAS BLOCK -->
      <div style="padding: 0 25px; margin-bottom:25px;">
         <div class="os-card" style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 1px solid rgba(245, 158, 11, 0.3); padding: 20px; position:relative; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <span style="color:#F59E0B; font-size:10px; letter-spacing:1.5px; font-weight:800; text-transform:uppercase;">AHORA EN FAMILIA</span>
                    <h3 style="margin:5px 0 0; color:white; font-size:18px; font-family:'Outfit', sans-serif;">¿Qué hacemos ahora?</h3>
                </div>
                <button onclick="setView('ideas')" style="background:#F59E0B; color:white; border:none; padding:10px 18px; border-radius:12px; font-weight:800; font-size:13px; box-shadow:0 4px 12px rgba(245, 158, 11, 0.3);">Ver ideas</button>
            </div>
            <div style="position:absolute; right:-20px; top:-20px; opacity:0.1; transform:rotate(15deg);">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
         </div>
      </div>

      <!-- BOTTOM SCROLL AREA -->
      <div style="padding-bottom:120px;">
      
      <!-- WEEKLY CHALLENGES -->
      ${(() => {
      return `
        <div style="padding: 0 25px;">
           <div style="margin-bottom:10px;">
              <h3 style="color:white; font-size:16px; font-weight:900; margin:0; font-family:'Outfit', sans-serif;">Retos Semanales</h3>
           </div>

           <div class="challenges-grid">
              ${challenges.map(c => `
                  <div onclick="viewChallenge('${c.areaKey}')" style="background:${c.bgGradient}; border-radius:16px; padding:15px; position:relative; overflow:hidden; cursor:pointer; height:90px; display:flex; align-items:center; gap:15px; box-shadow:0 3px 10px rgba(0,0,0,0.2);">
                     <div style="font-size:30px; filter:drop-shadow(0 2px 2px rgba(0,0,0,0.2)); width:40px; text-align:center;">${c.icon}</div>
                     <div style="flex:1; min-width:0;">
                         <div style="font-size:9px; color:rgba(255,255,255,0.9); font-weight:800; text-transform:uppercase; margin-bottom:2px;">${c.area}</div>
                         <h4 style="color:white; font-size:15px; margin:0; line-height:1.2; font-weight:800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.task}</h4>
                         <p style="font-size:11px; color:rgba(255,255,255,0.8); margin-top:2px;">${c.description}</p>
                     </div>
                  </div>
              `).join('')}
              ${challenges.length < 2 ? `
              <div style="height:90px; border:2px dashed rgba(255,255,255,0.1); border-radius:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;" onclick="alert('Próximamente')">
                 <div style="font-size:24px; color:white;">+</div>
              </div>` : ''}
           </div>
        </div>
        `;
    })()}

      </div>
    </div>

  <div class="pivot-anchor-container">
    <div class="pivot-anchor-btn" onclick="setView('sos_child_select')">
      <!-- PIVOT SOS Button -->
      <h2 style="font-size:12px;">PIVOT<br>SOS</h2>
    </div>
  </div>
`;
}
