function renderCard(container, sitId) {
   const child = getChild();
   const sit = SITUATIONS.find(s => s.id === sitId);
   if (!sit || !sit.cards) return;
   const card = sit.cards[0];
   const resKey = child.age <= 2 ? 'bebe' : (child.age >= 11 ? 'adolescente' : 'infantil');

   // Filter from RESOURCES_DB based on child's age group
   let relevantRes = RESOURCES_DB.filter(r =>
      r.ageGroups && r.ageGroups.includes(resKey)
   ).slice(0, 3); // Just show top 3 for the SOS card

   if (relevantRes.length === 0) relevantRes = RESOURCES_DB.slice(0, 3);

   container.innerHTML = `
    <div class="view scroll-y" style="padding-bottom:150px;">
      <header class="header-compact" style="background:transparent; border:none; padding: 30px 25px 10px;">
         <button class="btn-back" onclick="setView('selector')" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer;">←</button>
         <div style="margin-left:15px;">
            <span style="font-weight:900; font-size:20px; color:white; font-family:'Outfit', sans-serif;">Guía: ${sit.name}</span>
         </div>
      </header>

      <div class="p-20" style="padding-top:10px;">
        ${(() => { state.currentReportVal = 66; return ''; })()}
        <div class="os-card" style="background:rgba(15, 23, 42, 0.6); border:1px solid rgba(255,255,255,0.1); padding:30px;">
          <div class="label" style="color:#F59E0B; font-size:11px; letter-spacing:1px; font-weight:800; margin-bottom:15px;">DICE ESTO:</div>
          <div class="phrase-large" style="color:white; font-size:24px; font-weight:900; font-family:'Outfit', sans-serif; line-height:1.3;">"${card.phrase}"</div>
          
          <div class="label" style="color:#F59E0B; font-size:11px; letter-spacing:1px; font-weight:800; margin:35px 0 15px;">PASOS DE ACCIÓN:</div>
          <div style="display:flex; flex-direction:column; gap:15px;">
             ${card.steps.map((s, i) => `
                <div class="step-row" style="display:flex; gap:15px; align-items:flex-start;">
                   <div class="step-idx" style="background:#F59E0B; color:white; min-width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px;">${i + 1}</div>
                   <p style="margin:0; color:rgba(255,255,255,0.85); font-size:15px; line-height:1.5;">${s}</p>
                </div>
             `).join('')}
          </div>
        </div>
        
        <div class="os-card" style="margin-top:20px; background:linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)); border:1px solid rgba(255,255,255,0.1); padding:25px;">
           <p class="label" style="color:rgba(255,255,255,0.5); font-size:10px; letter-spacing:1px; font-weight:800;">EL LÍMITE Y LA CONSECUENCIA</p>
           <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px;">
              <p style="font-size:14px; color:white; margin:0;"><b>Límite:</b> ${card.limit}</p>
              <p style="font-size:14px; color:white; margin:0;"><b>Consecuencia:</b> ${card.consequence}</p>
           </div>
        </div>

        <div class="resource-hub" style="margin-top:30px;">
           <p class="label" style="color:rgba(255,255,255,0.5); font-size:10px; letter-spacing:1px; font-weight:800; margin-bottom:15px;">¿QUIERES PROFUNDIZAR?</p>
           ${relevantRes.filter(r => r.type === 'Libro').slice(0, 1).map(r => `
                <div class="os-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); border-radius: 20px;">
                    <div style="display:flex; gap:15px; padding:20px 20px 10px; align-items:center;">
                        <div style="width:50px; height:65px; background:rgba(255,255,255,0.05); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:28px; border:1px solid rgba(255,255,255,0.1);">📚</div>
                        <div style="flex:1;">
                            <div style="color:rgba(255,255,255,0.4); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:1px;">Libro Recomendado</div>
                            <div style="color:white; font-size:15px; font-weight:800; line-height:1.2; margin-top:4px;">${r.title}</div>
                            <div style="color:rgba(255,255,255,0.5); font-size:12px; margin-top:2px;">${r.author}</div>
                        </div>
                    </div>
                    <div style="padding:0 20px 20px; text-align:center;">
                        <button onclick="showResourceDetail('${r.id}', '${child.name}', '${child.temperament}')" class="btn-primary" style="width:auto; min-width:120px; background:linear-gradient(90deg, #D97706 0%, #F59E0B 100%); border:none; padding:8px 20px; font-size:11px; border-radius:35px; margin:0 auto; font-weight:900; height: auto;">VER LIBRO</button>
                    </div>
                </div>
           `).join('')}
        </div>
        
        <div class="os-card" style="margin-top:30px; background:rgba(255,255,255,0.05); border:1px dotted rgba(255,255,255,0.2); padding:25px; text-align:center;">
           <p class="label" style="color:#F59E0B; font-weight:800;">TU MISIÓN FINALIZADA</p>
           <p style="font-size:13px; margin-top:10px; color:rgba(255,255,255,0.6);">¿Cómo ha resultado la aplicación de esta guía? Evalúa para ver el impacto en su Radar.</p>
           <div class="report-options" style="margin-top:25px; display:flex; gap:10px; justify-content:center;">
              <div class="report-opt-btn" id="opt-0" onclick="setReportVal(0, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Mal</div>
              <div class="report-opt-btn" id="opt-33" onclick="setReportVal(33, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Regular</div>
              <div class="report-opt-btn active" id="opt-66" onclick="setReportVal(66, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:#F59E0B; color:white; font-size:11px; font-weight:900; border:1px solid #F59E0B; cursor:pointer;">Bien</div>
              <div class="report-opt-btn" id="opt-100" onclick="setReportVal(100, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Muy bien</div>
           </div>
        </div>
        
        <div style="display: flex; justify-content: center;">
            <button class="btn-primary" onclick="submitReport()" style="margin-top:40px; width:100%; max-width: 320px; background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); border:none; border-radius:30px; padding:20px; font-weight:900; font-size:16px; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);">EVALUAR Y CERRAR</button>
        </div>
      </div>
    </div>
  `;
}
