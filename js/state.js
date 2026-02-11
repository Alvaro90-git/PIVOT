const VERSION = 13; // Bump version to wipe old corrupt data
const savedStorage = JSON.parse(localStorage.getItem('pivot_state'));

const DEFAULT_STATE = {
    version: VERSION,
    isAuthenticated: false,
    parentProfile: {
        name: 'Papá/Mamá',
        temperament: 'Calmado',
        parentTestResult: null // style, strengths, risks, lever
    },
    children: [
        {
            id: '1',
            name: 'Alvaro',
            age: 7,
            temperament: 'Intenso',
            // Ensure all radar areas are initialized
            radar: {
                autocontrol: 3,
                respeto: 3,
                autonomia: 3,
                responsabilidad: 3,
                habilidades_sociales: 3,
                esfuerzo: 3
            },
            currentChallenge: null,
            weeklyFocus: ['autocontrol', 'respeto']
        }
    ],
    currentChildId: '1',
    selectedChildId: null,
    streak: 0,
    view: 'login',
    selectedTipId: null
};

// Logic to load state or reset if version mismatch
let state = savedStorage && savedStorage.version === VERSION ? savedStorage : DEFAULT_STATE;

// Requirements: Check Onboarding -> Login
state.isAuthenticated = false;
// User Request: Always show Onboarding for now
state.view = 'onboarding';
// const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding_v1');
// state.view = hasSeenOnboarding ? 'login' : 'onboarding';

function save() {
    localStorage.setItem('pivot_state', JSON.stringify(state));
}

function getChild() {
    // Robust getChild: if ID not found, return first child, or a safe placeholder
    const child = state.children.find(c => c.id === state.currentChildId) || state.children[0];

    // Safety check: Ensure radar exists
    if (child && !child.radar) {
        child.radar = { autocontrol: 1, respeto: 1, autonomia: 1, responsabilidad: 1, habilidades_sociales: 1, esfuerzo: 1 };
    }

    return child;
}
