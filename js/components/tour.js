import { state, save, getChild } from '../state.js';

let currentStepIndex = 0;
let steps = [];

export function startTour(tourSteps) {
    if (state.hasSeenTour) return;
    steps = tourSteps;
    currentStepIndex = 0;
    showStep();
}

export function showStep() {
    removeExistingTour();

    const step = steps[currentStepIndex];
    if (!step) {
        finishTour();
        return;
    }

    // Si el paso requiere una vista específica y no estamos en ella
    if (step.view && state.view !== step.view) {
        // Lógica especial para retos
        if (step.view === 'challenge_detail' && !state.selectedChallengeId) {
            const child = getChild();
            const challenges = window.getWeeklyChallenges ? window.getWeeklyChallenges(child) : [];
            state.selectedChallengeId = challenges[0]?.areaKey || 'autocontrol';
        }

        window.setView(step.view);
        // Esperar un poco a que renderice
        setTimeout(showStep, 400);
        return;
    }

    const target = document.querySelector(step.target);
    if (!target) {
        console.warn("Tour target not found:", step.target);
        nextStep();
        return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
        const rect = target.getBoundingClientRect();
        createOverlay(rect, step);
    }, 400);
}

function createOverlay(rect, step) {
    const overlay = document.createElement('div');
    overlay.id = 'tour-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(4px);
        z-index: 100000;
        pointer-events: none;
    `;

    // Spotlight effect using clip-path
    const padding = 10;
    const hole = {
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + (padding * 2),
        height: rect.height + (padding * 2)
    };

    overlay.style.clipPath = `polygon(
        0% 0%, 0% 100%, 
        ${hole.left}px 100%, 
        ${hole.left}px ${hole.top}px, 
        ${hole.left + hole.width}px ${hole.top}px, 
        ${hole.left + hole.width}px ${hole.top + hole.height}px, 
        ${hole.left}px ${hole.top + hole.height}px, 
        ${hole.left}px 100%, 
        100% 100%, 100% 0%
    )`;

    const tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(30, 41, 59, 0.95);
        color: white;
        padding: 25px;
        border-radius: 24px;
        width: 280px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.1);
        z-index: 100001;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Plus Jakarta Sans', sans-serif;
    `;

    tooltip.innerHTML = `
        <div style="font-size:10px; color:#F59E0B; font-weight:900; letter-spacing:1px; margin-bottom:8px; text-transform:uppercase;">PASO ${currentStepIndex + 1} DE ${steps.length}</div>
        <h3 style="font-family:'Outfit'; font-size:20px; font-weight:900; margin:0 0 10px;">${step.title}</h3>
        <p style="font-size:14px; color:rgba(255,255,255,0.7); line-height:1.5; margin:0 0 25px;">${step.content}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <button onclick="window.tour.skip()" style="background:none; border:none; color:rgba(255,255,255,0.3); font-size:12px; font-weight:800; cursor:pointer;">Saltar</button>
            <button onclick="window.tour.next()" style="background:#F59E0B; color:white; border:none; padding:12px 25px; border-radius:12px; font-weight:900; font-size:14px; cursor:pointer; box-shadow:0 8px 20px rgba(245,158,11,0.3);">${currentStepIndex === steps.length - 1 ? 'FINALIZAR' : 'SIGUIENTE'}</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);

    // Ajustar posición del tooltip
    let top = hole.top + hole.height + 20;
    let left = hole.left + (hole.width / 2) - 140;

    if (top + 200 > window.innerHeight) {
        top = hole.top - 200 - 20;
    }
    if (left < 20) left = 20;
    if (left + 280 > window.innerWidth - 20) left = window.innerWidth - 300;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });
}

export function nextStep() {
    currentStepIndex++;
    showStep();
}

export function skipTour() {
    finishTour();
}

function finishTour() {
    removeExistingTour();
    state.hasSeenTour = true;
    save();
}

function removeExistingTour() {
    const overlay = document.getElementById('tour-overlay');
    const tooltip = document.querySelector('.tour-tooltip');
    if (overlay) overlay.remove();
    if (tooltip) tooltip.remove();
}

// Global exposure for buttons
window.tour = {
    next: nextStep,
    skip: skipTour
};
