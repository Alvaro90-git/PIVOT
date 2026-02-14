import { state, save, getChild } from './state.js';
import { renderStoryReader } from './views/story_reader.js';
import { renderMentor } from './views/mentor.js';
import { getWeeklyChallenges } from './logic.js';

console.log("PIVOT: app.js loaded");
document.documentElement.setAttribute('data-pivot-loaded', 'true');

window.getWeeklyChallenges = getWeeklyChallenges;

// --- STEP 1: Global Bridge (Fisura Cero) ---
// Define core functions before any other imports so they are available globally
export function setView(v) {
  state.view = v;
  if (window.render) window.render();
}

export function navToFaro() {
  if (state.children.length > 1) {
    setView('faro_selector');
  } else {
    state.currentChildId = state.children[0].id;
    setView('faro');
  }
}

export function switchChild(id) {
  state.currentChildId = id;
  if (window.render) window.render();
}

export function selectSituation(id) {
  state.selectedSituation = id;
  setView('card');
}

// Attach to window immediately
window.setView = setView;
window.navToFaro = navToFaro;
window.switchChild = switchChild;
window.selectSituation = selectSituation;
window.state = state;
window.save = save;
window.getChild = getChild;

// --- STEP 2: View Imports ---
import { renderOnboarding } from './views/onboarding.js';
import { renderLogin, authenticate } from './views/login.js';
import { renderHome } from './views/home.js';
import { renderSelector } from './views/selector.js';
import { renderHuellaChildSelect } from './views/sos_child_select.js';
import { renderHuellaRegistration } from './views/huella_registration.js';
import { renderCard } from './views/card.js';
import { renderFeedback, viewChallenge } from './views/challenges.js';
import { renderFaro } from './views/faro.js';
import { renderFaroSelector } from './views/faro_selector.js';
import { renderProfiles, renderEditChild } from './views/profiles.js';
import { renderYo } from './views/yo.js';
import { renderParentTest, renderParentTestResult } from './views/parent_test.js';
import { renderConnectionKeys } from './views/connection_keys.js';
import { renderEvaluation } from './views/evaluation.js';
import { renderTips, renderTipDetail } from './views/tips.js';
import { renderBitacora } from './views/bitacora.js';
import { renderNowInFamily } from './views/now_in_family.js';
import { renderStoryCreator } from './views/story_creator.js';

// Mentor state is managed in the view

export function renderNav(container) {
  const icons = {
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    faro: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m8 6 4-4 4 4"/><path d="M9 22h6"/><path d="M10 18h4"/><path d="M11 14h2"/></svg>`,
    mentor: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><path d="M7 18c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/></svg>`,
    ideas: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    profiles: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    yo: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  };

  container.innerHTML += `
    <nav id="tour-nav-bar" class="nav-bar">
      <div id="tour-nav-home" class="nav-item ${state.view === 'home' || state.view === 'selector' || state.view === 'card' ? 'active' : ''}" onclick="setView('home')"><span class="nav-icon">${icons.home}</span><span>Home</span></div>
      <div id="tour-nav-faro" class="nav-item ${state.view === 'faro' || state.view === 'faro_selector' || state.view === 'mastery' || state.view === 'bitacora' ? 'active' : ''}" onclick="navToFaro()"><span class="nav-icon">${icons.faro}</span><span>Faro</span></div>
      <div id="tour-nav-mentor" class="nav-item mentor-nav-item ${state.view === 'mentor' ? 'active' : ''}" onclick="setView('mentor')" style="position:relative; top:-5px;">
        <div class="mentor-nav-glow" style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); width:40px; height:40px; background:radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%); z-index:-1;"></div>
        <span class="nav-icon" style="color:#F59E0B;">${icons.mentor}</span>
        <span style="color:#F59E0B; font-weight:800;">Mentor</span>
      </div>
      <div id="tour-nav-profiles" class="nav-item ${state.view === 'profiles' || state.view === 'edit_child' ? 'active' : ''}" onclick="setView('profiles')"><span class="nav-icon">${icons.profiles}</span><span>Familia</span></div>
      <div id="tour-nav-yo" class="nav-item ${state.view === 'yo' ? 'active' : ''}" onclick="setView('yo')" style="position:relative;">
        <span class="nav-icon">${icons.yo}</span>
        <span>Yo</span>
        ${!state.parentProfile.parentTestResult ? `
            <div style="position:absolute; top:8px; right:20%; width:8px; height:8px; background:#F59E0B; border-radius:50%; box-shadow:0 0 10px #F59E0B; animation: pulseS 2s infinite;"></div>
        ` : ''}
      </div>
    </nav>
  `;
}

// --- SPLASH SCREEN DELUXE (CINEMATIC INTRO) ---
function renderSplashScreen(container) {
  // Generamos letras individuales para animación por pasos
  const logo = "PIVOT";
  const letters = logo.split('').map((l, i) =>
    `<span style="animation-delay: ${0.2 + (i * 0.1)}s">${l}</span>`
  ).join('');

  container.innerHTML = `
    <style>
      .splash-screen {
        position: fixed;
        inset: 0;
        background: #020617;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        overflow: hidden;
      }

      /* Animated Nebula Background */
      .splash-bg {
        position: absolute;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle at center, #1e1b4b 0%, #020617 70%);
        animation: bgRotate 15s linear infinite;
        opacity: 0.6;
      }
      @keyframes bgRotate {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }

      /* Logo Reveal */
      .splash-logo {
        position: relative;
        font-family: 'Outfit', sans-serif;
        font-size: 64px;
        font-weight: 900;
        color: white;
        letter-spacing: 15px;
        display: flex;
        z-index: 10;
      }
      .splash-logo span {
        display: inline-block;
        opacity: 0;
        filter: blur(10px);
        transform: translateY(20px) scale(0.5);
        animation: letterReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes letterReveal {
        to { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
      }

      /* Golden Glow Sweep */
      .splash-logo::after {
        content: '${logo}';
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.8), transparent);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: lightSweep 3s infinite 1.5s;
        z-index: 11;
        pointer-events: none;
        opacity: 0.8;
      }
      @keyframes lightSweep {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      .splash-tagline {
        font-family: 'Outfit', sans-serif;
        color: #F59E0B;
        font-size: 12px;
        letter-spacing: 6px;
        margin-top: 30px;
        font-weight: 900;
        text-transform: uppercase;
        z-index: 10;
        opacity: 0;
        transform: translateY(10px);
        animation: fadeInSlide 1s forwards 1.8s;
        text-shadow: 0 0 15px rgba(245, 158, 11, 0.4);
      }
      @keyframes fadeInSlide {
        to { opacity: 0.8; transform: translateY(0); }
      }

      /* Cinematic Out Animation */
      .splash-fade-out {
        animation: splashExit 0.8s forwards;
      }
      @keyframes splashExit {
        to { opacity: 0; transform: scale(1.1); filter: blur(20px); }
      }
    </style>
    <div class="splash-screen" id="splashScreen">
      <div class="splash-bg"></div>
      <div class="splash-logo">${letters}</div>
      <div class="splash-tagline">Educar con Amor</div>
    </div>
  `;
}

let isAppInitialized = false;

export function render() {
  const app = document.getElementById('app');
  if (!app) return;

  // Si es la primera carga, mostramos Splash y volvemos a renderizar en 2 seg con transición
  if (!isAppInitialized) {
    renderSplashScreen(app);
    isAppInitialized = true;
    setTimeout(() => {
      const splash = document.getElementById('splashScreen');
      if (splash) splash.classList.add('splash-fade-out');
      setTimeout(() => render(), 700); // Esperamos a que termine la animación de salida
    }, 3000);
    return;
  }

  app.innerHTML = '';

  if (state.view === 'login') {
    renderLogin(app);
    return;
  }

  if (state.view === 'onboarding') {
    renderOnboarding(app);
    return;
  }

  // RENDER VIEWS
  if (state.view === 'home') renderHome(app);
  else if (state.view === 'selector') renderSelector(app);
  else if (state.view === 'sos_child_select' || state.view === 'huella_child_select') renderHuellaChildSelect(app);
  else if (state.view === 'huella_registration') renderHuellaRegistration(app);
  else if (state.view === 'card') renderCard(app, state.selectedSituation);
  else if (state.view === 'feedback') renderFeedback(app);
  else if (state.view === 'faro' || state.view === 'mastery') renderFaro(app);
  else if (state.view === 'faro_selector') renderFaroSelector(app);
  else if (state.view === 'mentor') renderMentor(app);
  else if (state.view === 'profiles') renderProfiles(app);
  else if (state.view === 'edit_child') renderEditChild(app, state.editingChildId);
  else if (state.view === 'yo') renderYo(app);
  else if (state.view === 'parent_test') renderParentTest(app);
  else if (state.view === 'parent_test_result') renderParentTestResult(app);
  else if (state.view === 'connection_keys') renderConnectionKeys(app, state.selectedChildId);
  else if (state.view === 'expert') renderMentor(app); // Re-map expert to mentor
  else if (state.view === 'evaluation') renderEvaluation(app);
  else if (state.view === 'tips') renderTips(app);
  else if (state.view === 'tip_detail') renderTipDetail(app, state.selectedTipId);
  else if (state.view === 'challenge_detail') viewChallenge(state.selectedChallengeId, app);
  else if (state.view === 'bitacora') renderBitacora(app);
  else if (state.view === 'ideas') renderNowInFamily(app);
  else if (state.view === 'story_creator') renderStoryCreator(app);
  else if (state.view === 'story_reader') renderStoryReader(app);

  renderNav(app);
  save();
}

window.render = render;
render();
