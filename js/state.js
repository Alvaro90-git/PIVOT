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
            birthDate: '2017-05-15',
            temperament: 'intenso',
            radar: {
                autocontrol: 3,
                respeto: 3,
                autonomia: 3,
                responsabilidad: 3,
                social: 3,
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
    mentorPreferences: { likesBooks: true, lastTopics: [] },
    editStep: 1,
    editData: {
        name: '',
        birthDate: '',
        gender: 'chico',
        temperament: 'tranquilo',
        responses: {}
    }
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

// FORCE INITIALIZATION OF NEW STATE FIELDS (Fisura Cero)
if (!state.editData) {
    state.editData = {
        name: '',
        birthDate: '',
        gender: 'chico',
        temperament: 'tranquilo',
        responses: {}
    };
}
if (!state.editStep) state.editStep = 1;

export function save() {
    localStorage.setItem('pivot_state', JSON.stringify(state));
}

export function getChild() {
    // Robust getChild: if ID not found, return first child, or a safe placeholder
    const child = state.children.find(c => c.id === state.currentChildId) || state.children[0];

    // Safety check: Ensure radar exists
    if (child && !child.radar) {
        child.radar = { autocontrol: 1, respeto: 1, autonomia: 1, responsabilidad: 1, social: 1, esfuerzo: 1 };
    }

    // Dynamic Age Calculation
    if (child && child.birthDate) {
        const today = new Date();
        const birth = new Date(child.birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        child.age = age;
    } else if (child && !child.age) {
        child.age = 5; // Safe fallback
    }

    return child;
}
