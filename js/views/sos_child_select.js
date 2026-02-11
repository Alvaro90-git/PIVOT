// NEW FILE: View for Selecting Child in SOS Mode
function renderSosChildSelect(container) {
  // Use scroll-y class and full height flex column
  container.innerHTML = `
    <style>
      @keyframes sos-pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
        }
        70% {
          transform: scale(1.05);
          box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
        }
      }
      .sos-pulse-btn {
        width: 80px; 
        height: 80px; 
        background: linear-gradient(135deg, #EF4444 0%, #F43F5E 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid rgba(255,255,255,0.2);
        margin-bottom: 20px;
        animation: sos-pulse 2s infinite;
        cursor: pointer;
      }
    </style>

    <div class="view" style="padding: 25px; display:flex; flex-direction:column; height:100vh; overflow-y:auto; overflow-x:hidden;">
      
      <!-- Header with Back Button -->
      <header class="header-compact" style="flex-shrink:0;">
        <button onclick="setView('home')" style="
            background: rgba(255,255,255,0.1); 
            border: 1px solid rgba(255,255,255,0.1); 
            border-radius: 20px; 
            padding: 8px 16px; 
            color: white; 
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            transition: background 0.2s;
        " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
            <span>←</span> Atrás
        </button>
      </header>
      
      <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding-bottom:100px;">
        
        <!-- SOS BUTTON (Animated) -->
        <div class="sos-pulse-btn">
            <h2 style="font-size:20px; color:white; margin:0; font-family:'Outfit', sans-serif; font-weight:900;">SOS</h2>
        </div>

        <h2 style="font-size:24px; color:white; margin-bottom:30px; font-family:'Outfit', sans-serif;">¿Quién necesita ayuda?</h2>
        
        <!-- Dynamic Child Buttons -->
        <div style="display:flex; flex-direction:column; gap:15px; width:100%; max-width:320px;">
           ${state.children.map(c => `
              <button onclick="selectSosChild('${c.id}')" style="
                  background:rgba(15, 23, 42, 0.6); 
                  border:1px solid rgba(255,255,255,0.1); 
                  border-radius:16px; 
                  padding:20px; 
                  text-align:left; 
                  display:flex; 
                  align-items:center; 
                  gap:15px; 
                  width:100%;
                  cursor:pointer;
                  transition: all 0.2s;
              " onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='rgba(15, 23, 42, 0.6)'">
                  
                  <!-- Avatar Placeholder (Initials) -->
                  <div style="flex-shrink:0; width:50px; height:50px; background:linear-gradient(135deg, var(--primary) 0%, #3B82F6 100%); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px; color:white;">
                      ${c.name.substring(0, 2).toUpperCase()}
                  </div>

                  <div style="flex:1; min-width:0;">
                      <div style="font-size:18px; color:white; font-weight:700;">${c.name}</div>
                      <div style="font-size:12px; color:rgba(255,255,255,0.6); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.age} años • ${c.temperament}</div>
                  </div>

                  <div style="margin-left:auto; color:white; font-size:20px;">→</div>
              </button>
           `).join('')}
        </div>

      </div>
    </div>
  `;
}

// Logic to handle selection
window.selectSosChild = (id) => {
  state.currentChildId = id; // Switch active child
  state.view = 'selector';   // Go to Problems list
  render();                  // Refresh app
};
