function renderLogin(container) {
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
                <!-- Version removed -->
            </div>

            <div class="input-group">
                <input type="email" id="email" class="input-field" placeholder="Email" onkeypress="if(event.key === 'Enter') authenticate()">
                <span class="input-icon">✉️</span>
            </div>

            <div class="input-group">
                <input type="password" id="password" class="input-field" placeholder="Contraseña" onkeypress="if(event.key === 'Enter') authenticate()">
                <span class="input-icon">🔒</span>
            </div>

            <button class="btn-login" onclick="authenticate()">ENTRAR</button>
            
            <div class="link-text" onclick="alert('Funcionalidad próximamente')">¿Olvidaste tu contraseña?</div>
            
            <!-- Link to replay Onboarding -->
            <div class="link-text" style="font-size:12px; margin-top:20px; opacity:0.5;" onclick="window.state.view='onboarding'; window.render();">
                ¿Qué es PIVOT?
            </div>

        </div>
        
        <div style="position:absolute; bottom:20px; font-size:10px; color:rgba(255,255,255,0.3);">
            Protected by reCAPTCHA
        </div>

    </div>
  `;
}

// Restore missing authenticate function!
function authenticate() {
    // Saltamos la validación de credenciales por petición del usuario
    state.isAuthenticated = true;
    state.view = 'home';
    save();
    render();
}

function logout() {
    state.isAuthenticated = false;
    state.view = 'login';
    save();
    render();
}

window.authenticate = authenticate;
window.logout = logout;
