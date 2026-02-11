function renderTips(container) {
    const child = getChild();
    const tips = getDailyTipsForChild(child);

    container.innerHTML = `
    <style>
        .tip-card {
            background: #1E293B; 
            border-radius: 20px; 
            overflow: hidden; 
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5); 
            border: 1px solid rgba(255,255,255,0.05);
            display: flex; 
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        .tip-card:active {
            transform: scale(0.98);
        }
    </style>

    <div class="view scroll-y" style="padding: 20px; height:calc(100vh - 70px); background:#0F172A; display:flex; flex-direction:column;">
      
      <!-- Header -->
      <header class="header-compact" style="margin-bottom:25px; display:flex; align-items:center; justify-content:space-between;">
         <button onclick="setView('home')" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:50%; width:44px; height:44px; color:white; display:flex; align-items:center; justify-content:center; cursor:pointer;">✕</button>
         <div style="text-align:right;">
            <h2 style="font-size:22px; margin:0; color:white; font-family:'Outfit', sans-serif; font-weight:900;">TIPS DIARIOS</h2>
            <p style="font-size:13px; color:rgba(255,255,255,0.5); margin:0;">Consejos expertos para ${child.name}</p>
         </div>
      </header>

      <!-- Tips List -->
      <div style="display:flex; flex-direction:column; gap:25px; padding-bottom:50px;">
         ${tips.length === 0 ? '<div style="color:white; text-align:center; padding:40px;">No hay tips disponibles hoy.</div>' : tips.map(tip => {
        const areaColor = tip.color || '#F59E0B';
        return `
             <div class="tip-card" onclick="viewTipDetail('${tip.id}')">
                 <div style="height: 140px; background: radial-gradient(circle at 30% 30%, ${areaColor}33 0%, ${areaColor}11 100%), linear-gradient(135deg, #1E293B 0%, #0F172A 100%); display:flex; align-items:center; justify-content:center; position:relative;">
                    <div style="font-size:60px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">${tip.icon}</div>
                    <div style="position:absolute; bottom:15px; right:15px; background:rgba(0,0,0,0.3); padding:4px 10px; border-radius:10px; color:white; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:1px; backdrop-filter:blur(5px);">Profundizar +</div>
                 </div>
                 <div style="padding: 20px;">
                     <div style="color:${areaColor}; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:5px;">${RADAR_AREAS[tip.area].name}</div>
                     <h3 style="margin:0 0 8px 0; color:white; font-size:18px; font-weight:800; line-height:1.2; font-family:'Outfit', sans-serif;">${tip.title}</h3>
                     <p style="margin:0; color:rgba(255,255,255,0.6); font-size:14px; line-height:1.5;">${tip.text}</p>
                 </div>
             </div>
             `;
    }).join('')}
         
         <div style="text-align:center; padding:20px; color:rgba(255,255,255,0.4); font-size:13px; font-style:italic;">
            "Pequeños pasos, grandes cambios."
         </div>
      </div>
    </div>
    `;
}

function renderTipDetail(container, tipId) {
    const tip = TIPS_DB.find(t => t.id === tipId);
    if (!tip) {
        setView('tips');
        return;
    }

    const areaColor = tip.color || '#F59E0B';

    container.innerHTML = `
    <div class="view scroll-y" style="background:#0F172A; min-height:100vh; padding-bottom:120px;">
        <div style="background: linear-gradient(180deg, ${areaColor}22 0%, #0F172A 100%); padding: 30px 25px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); position:relative;">
            <button onclick="closeTipDetail()" style="background:rgba(255,255,255,0.1); border:none; width:40px; height:40px; border-radius:50%; color:white; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; margin-bottom:20px;">✕</button>
            <div style="text-align:center; margin-top:10px;">
                <div style="font-size:80px; margin-bottom:20px; display:inline-block; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.3));">${tip.icon}</div>
                <div style="color:${areaColor}; font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:2px; margin-bottom:10px;">${RADAR_AREAS[tip.area].name}</div>
                <h1 style="color:white; font-size:32px; font-family:'Outfit', sans-serif; margin:0; font-weight:900; line-height:1.1;">${tip.title}</h1>
            </div>
        </div>

        <div style="padding: 0 25px; margin-top: -20px;">
            <div style="background:rgba(30, 41, 59, 0.8); backdrop-filter:blur(10px); border-radius:24px; padding:25px; border:1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 40px rgba(0,0,0,0.4);">
                <p style="color:white; font-size:18px; line-height:1.6; font-style:italic; margin:0; font-weight:500;">"${tip.text}"</p>
            </div>

            <div style="margin-top:35px;">
                <h3 style="color:${areaColor}; font-size:18px; font-weight:900; margin-bottom:15px; font-family:'Outfit', sans-serif; text-transform:uppercase; letter-spacing:1px;">El trasfondo</h3>
                <div style="color:rgba(255,255,255,0.8); font-size:16px; line-height:1.7;">
                    ${tip.explanation}
                </div>
            </div>

            <div style="margin-top:50px; display:flex; justify-content:center;">
                <button onclick="closeTipDetail()" style="width:80%; height:60px; background:linear-gradient(90deg, #D97706 0%, #F59E0B 100%); color:white; border:none; border-radius:30px; font-weight:900; font-size:16px; cursor:pointer; box-shadow:0 10px 30px rgba(245, 158, 11, 0.3); font-family:'Outfit', sans-serif; letter-spacing:1px;">ENTENDIDO</button>
            </div>
        </div>
    </div>
    `;
}
