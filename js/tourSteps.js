export const TOUR_STEPS = [
    // HOME
    {
        view: 'home',
        target: '#tour-logo',
        title: '¡Bienvenido a PIVOT!',
        content: 'Tu brújula para una educación consciente. Aquí tienes todo lo necesario para conectar con tus hijos.'
    },
    {
        view: 'home',
        target: '#tour-radar',
        title: 'El Radar de Crecimiento',
        content: 'Visualiza la evolución de tu hijo en las 6 áreas clave. El punto verde es vuestro objetivo ideal.'
    },
    {
        view: 'home',
        target: '#tour-child-switcher',
        title: 'Cambio de Perfil',
        content: 'Si tienes varios hijos, aquí puedes saltar de uno a otro al instante.'
    },
    {
        view: 'home',
        target: '#tour-ideas-btn',
        title: 'Inspiración Diaria',
        content: '¿No sabes qué hacer ahora? Pulsa aquí para obtener ideas personalizadas según el momento del día.'
    },

    // IDEAS PAGE
    {
        view: 'ideas',
        target: '#tour-ideas-container',
        title: 'Cosas que podéis hacer',
        content: 'Te proponemos cuentos, juegos o charlas según vuestro contexto actual (mañana, tarde, crisis...).'
    },
    {
        view: 'ideas',
        target: '#tour-create-story-btn',
        title: 'Cuentos Mágicos',
        content: '¿Ves este botón? Te permite crear un cuento personalizado con IA donde tus hijos son los protagonistas.'
    },

    // STORY CREATOR
    {
        view: 'story_creator',
        target: '#tour-story-themes',
        title: 'Elige la temática',
        content: 'Puedes enfocar el cuento en la risa, la autonomía o incluso en superar un pequeño conflicto.'
    },
    {
        view: 'story_creator',
        target: '#tour-story-chars',
        title: 'Los Protagonistas',
        content: 'Añade el nombre de tu hijo y de sus amigos o juguetes favoritos para que aparezcan en la historia.'
    },
    {
        view: 'story_creator',
        target: '#tour-story-btn',
        title: 'Generar Magia',
        content: 'En segundos, nuestra IA redactará un cuento profesional y educativo para leer juntos.'
    },

    // BACK TO HOME & CHALLENGES
    {
        view: 'home',
        target: '#tour-challenges',
        title: 'Retos Semanales',
        content: 'Pequeñas misiones diarias para entrenar habilidades específicas y ver impacto real.'
    },

    // CHALLENGE DETAIL
    {
        view: 'challenge_detail', // In current system, setView('challenge_detail') with state.selectedChallengeId
        target: '#tour-challenge-header',
        title: 'Misión del Reto',
        content: 'Aquí verás qué estamos trabajando exactamente y por qué es importante para su edad.'
    },
    {
        view: 'challenge_detail',
        target: '#tour-challenge-mission',
        title: 'Seguimiento Diario',
        content: 'Marca cada día que logréis el objetivo. Necesitáis 7 días para superar el reto.'
    },
    {
        view: 'challenge_detail',
        target: '#tour-challenge-steps',
        title: 'Guía para Padres',
        content: 'Te damos el paso a paso exacto y hasta la frase que debes usar para que el reto funcione.'
    },
    {
        view: 'challenge_detail',
        target: '#tour-challenge-logro-btn',
        title: 'Impacto Positivo',
        content: 'Al pulsar aquí, verás cómo el radar de tu hijo crece en tiempo real. ¡Ese es su progreso!'
    },

    // NAVIGATION
    {
        view: 'home',
        target: '#tour-nav-mentor',
        title: 'El Mentor PIVOT',
        content: 'Tu experto en educación disponible 24/7 para dudas urgentes o consejos profundos.'
    },
    {
        view: 'home',
        target: '#tour-nav-faro',
        title: 'Bitácora y Faro',
        content: 'Revisa vuestra historia, lo que habéis logrado y planifica el futuro.'
    },
    {
        view: 'home',
        target: '#tour-pivot-sos',
        title: 'Botón SOS',
        content: 'En momentos de tensión máxima, pulsa aquí. Te guiaremos paso a paso para recuperar la calma.'
    }
];
