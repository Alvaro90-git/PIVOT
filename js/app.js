function renderNav(container) {
  const icons = {
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    faro: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m8 6 4-4 4 4"/><path d="M9 22h6"/><path d="M10 18h4"/><path d="M11 14h2"/></svg>`,
    ideas: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    profiles: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    yo: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  };

  container.innerHTML += `
    <nav class="nav-bar">
      <div class="nav-item ${state.view === 'home' || state.view === 'selector' || state.view === 'card' ? 'active' : ''}" onclick="setView('home')"><span class="nav-icon">${icons.home}</span><span>Home</span></div>
      <div class="nav-item ${state.view === 'faro' || state.view === 'faro_selector' || state.view === 'mastery' || state.view === 'bitacora' ? 'active' : ''}" onclick="navToFaro()"><span class="nav-icon">${icons.faro}</span><span>Faro</span></div>
      <div class="nav-item ${state.view === 'ideas' || state.view === 'story_reader' ? 'active' : ''}" onclick="setView('ideas')"><span class="nav-icon">${icons.ideas}</span><span>Ideas</span></div>
      <div class="nav-item ${state.view === 'profiles' || state.view === 'edit_child' ? 'active' : ''}" onclick="setView('profiles')"><span class="nav-icon">${icons.profiles}</span><span>Familia</span></div>
      <div class="nav-item ${state.view === 'yo' ? 'active' : ''}" onclick="setView('yo')"><span class="nav-icon">${icons.yo}</span><span>Yo</span></div>
    </nav>
  `;
}

function renderExpert(container) { container.innerHTML = `<div class="view p-20"><header class="header-compact"><button class="btn-back" onclick="setView('home')">✕</button><h2>Expertos</h2></header><p>Contenido cifrado...</p></div>`; }

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (state.view === 'onboarding') {
    renderOnboarding(app);
    return;
  }

  if (!state.isAuthenticated && state.view === 'login') {
    renderLogin(app);
    return;
  }

  // RENDER VIEWS
  if (state.view === 'home') renderHome(app);
  else if (state.view === 'selector') renderSelector(app);
  else if (state.view === 'sos_child_select') renderSosChildSelect(app);
  else if (state.view === 'card') renderCard(app, state.selectedSituation);
  else if (state.view === 'feedback') renderFeedback(app);
  else if (state.view === 'faro' || state.view === 'mastery') renderFaro(app);
  else if (state.view === 'faro_selector') renderFaroSelector(app);
  else if (state.view === 'profiles') renderProfiles(app);
  else if (state.view === 'edit_child') renderEditChild(app, state.editingChildId);
  else if (state.view === 'yo') renderYo(app);
  else if (state.view === 'parent_test') renderParentTest(app);
  else if (state.view === 'parent_test_result') renderParentTestResult(app);
  else if (state.view === 'connection_keys') renderConnectionKeys(app, state.selectedChildId);
  else if (state.view === 'expert') renderExpert(app);
  else if (state.view === 'evaluation') renderEvaluation(app);
  else if (state.view === 'tips') renderTips(app);
  else if (state.view === 'tip_detail') renderTipDetail(app, state.selectedTipId);
  else if (state.view === 'challenge_detail') viewChallenge(state.selectedChallengeId);
  else if (state.view === 'bitacora') renderBitacora(app);
  else if (state.view === 'ideas') renderNowInFamily(app);
  else if (state.view === 'story_creator') renderStoryCreator(app);
  else if (state.view === 'story_reader') renderStoryReader(app);

  renderNav(app);
  save();
}

window.setView = (v) => { state.view = v; render(); };
window.navToFaro = () => {
  if (state.children.length > 1) {
    state.view = 'faro_selector';
  } else {
    state.currentChildId = state.children[0].id;
    state.view = 'faro';
  }
  render();
};
window.switchChild = (id) => { state.currentChildId = id; render(); };
window.selectSituation = (id) => { state.selectedSituation = id; state.view = 'card'; render(); };
window.editChild = editChild;
window.saveChild = saveChild;
window.deleteChild = deleteChild;
window.setReportVal = setReportVal;
window.submitReport = submitReport;
window.authenticate = authenticate;
window.toggleFocusArea = toggleFocusArea;
window.updateEvalScore = updateEvalScore;
window.toggleChallengeProgress = toggleChallengeProgress;
window.viewChallenge = viewChallenge;
window.viewTipDetail = (id) => { state.selectedTipId = id; state.view = 'tip_detail'; render(); };
window.closeTipDetail = () => { state.selectedTipId = null; state.view = 'tips'; render(); };

render();
