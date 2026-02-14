const VERSION = '1.7';
let savedStorage = null;
try {
    savedStorage = JSON.parse(localStorage.getItem('pivot_state'));
} catch (e) {
    console.error("Error loading state:", e);
}

const DEFAULT_STATE = {
    version: VERSION,
    isAuthenticated: false,
    parentProfile: {
        name: 'Papá/Mamá',
        temperament: 'Calmado',
        parentTestResult: null, // style, strengths, risks, lever
        radar: {
            serenidad: 3.0,
            firmeza_afectuosa: 3.0,
            conexion: 3.0,
            reparacion: 3.0,
            ejemplo: 3.0
        },
        huellaHistory: []
    },
    children: [
        {
            id: '1',
            name: 'Alvaro',
            age: 7,
            temperament: 'Intenso',
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
    selectedTipId: null,
    cachedIdeas: null,
    lastIdeasUpdate: 0,
    hasSeenTour: false,
    mentorMessages: [],
    mentorPreferences: { likesBooks: true, lastTopics: [] }
};

// Logic to load state or reset if version mismatch
export const state = savedStorage && savedStorage.version === VERSION ? savedStorage : DEFAULT_STATE;

// AL INICIO: Forzamos la vista de entrada.
if (localStorage.getItem('hasSeenOnboarding_v13') !== 'true') {
    state.view = 'onboarding';
} else if (state.isAuthenticated) {
    state.view = 'home';
} else {
    state.view = 'login';
}

export function save() {
    localStorage.setItem('pivot_state', JSON.stringify(state));
}

export function getChild() {
    // Robust getChild: if ID not found, return first child, or a safe placeholder
    const child = state.children.find(c => c.id === state.currentChildId) || state.children[0];

    // Safety check: Ensure radar exists
    if (child && !child.radar) {
        child.radar = { autocontrol: 1, respeto: 1, autonomia: 1, responsabilidad: 1, habilidades_sociales: 1, esfuerzo: 1 };
    }

    return child;
}
