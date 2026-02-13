import { state, save } from '../state.js';

export function renderLogin(container) {
    const stars = Array.from({ length: 15 }).map(() => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 3;
        return `<div class="star" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-delay:${delay}s"></div>`;
    }).join('');

    container.innerHTML = `
    <style>
        .login-view {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0F292E 0%, #134E4A 100%);
          color: white;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient Stars (Shared with Onboarding for continuity) */
        .login-bg .star {
            position: absolute;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            opacity: 0.5;
            animation: twinkle 5s infinite ease-in-out;
        }

        .login-card {
           background: rgba(255, 255, 255, 0.05); /* Very subtle glass */
           backdrop-filter: blur(20px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 24px;
           padding: 40px 30px;
           width: 100%;
           max-width: 320px;
           box-shadow: 0 10px 40px rgba(0,0,0,0.3);
           display: flex;
           flex-direction: column;
           gap: 20px;
           z-index: 10;
        }

        .pivot-logo-text {
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
            font-size: 32px;
            letter-spacing: 2px;
            color: white;
            text-align: center;
            margin-bottom: 5px;
        }

        .input-group {
            position: relative;
        }
        .input-field {
            width: 100%;
            padding: 16px;
            background: rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            color: white;
            font-size: 16px;
            box-sizing: border-box;
            transition: all 0.2s;
        }
        .input-field:focus {
            outline: none;
            border-color: #F59E0B; /* Amber Focus */
            background: rgba(0,0,0,0.4);
        }
        .input-icon {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255,255,255,0.5);
        }

        .btn-login {
            background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); /* Amber Gradient */
            color: white;
            border: none;
            padding: 16px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            letter-spacing: 1px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
            transition: transform 0.1s;
        }
        .btn-login:active { transform: scale(0.98); }

        .link-text {
            text-align: center;
            font-size: 14px;
            color: rgba(255,255,255,0.6);
            margin-top: 10px;
            cursor: pointer;
        }
        .link-text:hover { color: #F59E0B; }
    </style>

    <div class="login-view">
        
        <!-- Stars Background -->
        <div class="login-bg" style="position:absolute; top:0; left:0; width:100%; height:100%;">
             ${stars}
        </div>

        <div class="login-card">
            
            <div style="text-align:center;">
                <div class="pivot-logo-text">PIVOT</div>
                <p style="color:#F59E0B; font-size:11px; margin-top:-5px; font-weight:800; letter-spacing:2px; text-transform:uppercase;">Acceso Tester</p>
            </div>

            <div class="input-group">
                <input type="text" id="testerName" class="input-field" placeholder="Tu Nombre" onkeypress="if(event.key === 'Enter') authenticate()">
                <span class="input-icon">👤</span>
            </div>

            <div style="text-align:center; padding:10px 0;">
                <p style="color:rgba(255,255,255,0.7); font-size:14px; line-height:1.6; font-style:italic; font-family:'Outfit', sans-serif;">
                    "Has sido seleccionado para testear este proyecto, creado para ayudarte en lo más difícil... <span style="color:#F59E0B; font-weight:900;">educar con AMOR</span>."
                </p>
                <p style="color:rgba(255,255,255,0.4); font-size:12px; margin-top:15px;">Solo necesitamos tu nombre para empezar.</p>
            </div>

            <button class="btn-login" onclick="authenticate()">ACCEDER A LA EXPERIENCIA</button>
            
            <!-- Link to replay Onboarding -->
            <div class="link-text" style="font-size:12px; margin-top:10px; opacity:0.5;" onclick="window.state.view='onboarding'; window.render();">
                ¿Qué es PIVOT?
            </div>

        </div>
        
        <div style="position:absolute; bottom:20px; font-size:10px; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px;">
            Beta v1.5 • 2026 DeepMind Collaboration
        </div>

    </div>
  `;
}


export async function authenticate() {
    const nameInput = document.getElementById('testerName');
    const btn = document.querySelector('.btn-login');
    const name = nameInput ? nameInput.value.trim() : '';

    if (!name) {
        alert("Por favor, introduce tu nombre para personalizar la experiencia.");
        return;
    }

    // Bloquear botón para evitar doble click y mostrar feedback
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'CONECTANDO...';
    }

    // ¿Es un usuario recurrente?
    const isSameUser = state.parentProfile && state.parentProfile.name === name;

    if (!isSameUser) {
        console.log("PIVOT: Nuevo Tester detectado. Reiniciando...");

        // REINICIO TOTAL DEL ESTADO (Sin notificaciones externas)
        state.parentProfile = {
            name: name,
            temperament: 'Calmado',
            parentTestResult: null
        };
        state.children = [];
        state.currentChildId = null;
        state.selectedChildId = null;
        state.mentorMessages = null;
        state.mentorPreferences = null;
        state.streak = 0;

        // Saltamos al perfil para que añada a su primer hijo
        state.view = 'profiles';
    } else {
        console.log("PIVOT: Bienvenido de nuevo, " + name);
        state.view = 'home';
    }

    state.isAuthenticated = true;
    save();
    if (window.render) window.render();
}

export function logout() {
    state.isAuthenticated = false;
    state.view = 'login';
    state.mentorMessages = null; // Reiniciar historial del Mentor al salir
    save();
    if (window.render) window.render();
}

window.renderLogin = renderLogin;
window.authenticate = authenticate;
window.logout = logout;
