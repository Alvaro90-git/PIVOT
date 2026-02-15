import { state } from '../state.js';
import { IDEAS_DB } from '../data.js';

export function getIdeasContext() {
    const now = new Date();
    const currentHour = now.getHours();
    const dayOfWeek = now.getDay();

    let moment = 'NOCHE';
    for (const [key, m] of Object.entries(IDEAS_DB.MOMENTS)) {
        if (m.hours.includes(currentHour)) {
            moment = key;
            break;
        }
    }

    return {
        moment,
        momentLabel: IDEAS_DB.MOMENTS[moment].label,
        dayOfWeek,
        isWeekend: [0, 6].includes(dayOfWeek)
    };
}

// --- CONFIGURACIÓN DE IA PARA IDEAS ---
const OPENAI_API_KEY = "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";

// Imágenes fijas profesionales (Rutas locales en assets/images/)
const IMAGES = {
    JUEGO: 'assets/images/card_juego.png',
    EVENTO: 'assets/images/card_evento.png',
    CUENTO: 'assets/images/card_cuento.png'
};

const IDEAS_VERSION = 5; // Incrementar para forzar refresco de caché

export async function getPersonalizedIdeas() {
    const context = getIdeasContext();
    const now = new Date();
    const currentHour = now.getHours();

    // Tarjeta fija de Cuento (siempre presente como 2ª opción)
    const storyCard = {
        id: 'story_fixed',
        type: 'Cuento',
        category: 'Imaginación',
        title: 'UN SÚPER CUENTO...',
        desc: 'Sumergíos en una historia única donde los valores y la aventura se entrelazan. Vuestros hijos son los protagonistas.',
        image: IMAGES.CUENTO
    };

    // Si tenemos caché reciente y de la misma versión, devolvemos inmediatamente
    const cacheAge = Date.now() - (state.lastIdeasUpdate || 0);
    const isSameVersion = state.ideasVersion === IDEAS_VERSION;

    if (state.cachedIdeas && cacheAge < 7200000 && isSameVersion) {
        return [state.cachedIdeas[0], storyCard];
    }

    const parentTest = state.parentProfile?.parentTestResult;
    const parentContext = parentTest ? `Estilo Parental: ${parentTest.style}. Palanca de cambio: ${parentTest.lever}.` : "";

    const childrenStr = state.children.map(c => {
        const focusAreas = Object.entries(c.radar || {})
            .filter(([_, val]) => val <= 2)
            .map(([key, _]) => key.replace('_', ' '))
            .join(', ');
        return `${c.name} (${c.age} años${focusAreas ? `. Áreas de crecimiento: ${focusAreas}` : ''})`;
    }).join('; ');

    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = days[context.dayOfWeek];
    const dayType = context.isWeekend ? 'FIN DE SEMANA (Sin colegio)' : 'DÍA DE COLEGIO';

    const systemPrompt = `Eres el Motor de Sabiduría PIVOT. Tu objetivo es proponer 1 conexión familiar inspirada en "EDUCAR CON AMOR".

REGLAS DE TONO Y SUSTANCIA (Prioridad Máxima):
- Sé NATURAL y ORGÁNICO. No seas "intenso" con el lenguaje religioso o pedagógico. 
- Los valores (Amor, Fe, Virtudes) se deben vivir en la ACCIÓN del juego/evento, no explicarse con etiquetas pesadas. 
- Evita que las actividades parezcan una clase o una catequesis. Normaliza los juegos (ej: un escondite sigue siendo un escondite, pero diseñado para dar seguridad o unión).
- COMPOSICIÓN: Solo un padre (papá) y una madre (mamá).
- ALINEACIÓN PARENTAL: Tus argumentos deben centrarse en cómo la calma y virtud del padre/madre "se prestan" al hijo. Si el hijo tiene un área de mejora (ej: autocontrol), explica cómo la SERENIDAD del padre hoy le ayudará a regularse. 

MISIÓN:
- Si es tarde/noche (19h-7h): Propón un "EVENTO" de calma, paz o bendición familiar.
- Si es día (7h-19h): Propón un "JUEGO" original que trabaje sutilmente las áreas de crecimiento indicadas.
- IMPORTANTE: Ajusta la intensidad al tipo de día (Colegio vs Fin de semana).

CONTEXTO TEMPORAL CRÍTICO:
- Hoy es: ${dayName} (${dayType}).
- Hora actual: ${currentHour}:00h (${context.momentLabel}).
- REGLA DE FIN DE SEMANA: Si es fin de semana (Sábado/Domingo), PROHIBIDO mencionar colegio, deberes o mochilas. Las propuestas son de ocio y paz familiar.
- ADVERTENCIA: No propongas actividades de otros días. Si hoy es ${dayName}, la propuesta es exclusivamente para hoy ${dayName}.

CONTEXTO FAMILIAR:
- Padres: ${parentContext}
- Hijos: ${childrenStr}.

Formato: JSON con 1 objeto "idea". Campos: id, type ("Juego", "Evento"), title, desc (40 palabras max), category (virtud trabajada).`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY} `
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "system", content: systemPrompt }],
                response_format: { type: "json_object" },
                temperature: 0.7
            })
        });

        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);
        let aiIdea = content.idea || content;

        // Inyectar imagen fija según tipo (robusto a mayúsculas/minúsculas)
        const typeValue = (aiIdea.type || '').toUpperCase();
        aiIdea.image = typeValue.includes('JUEGO') ? IMAGES.JUEGO : IMAGES.EVENTO;

        // Guardar en caché con versión
        state.cachedIdeas = [aiIdea];
        state.lastIdeasUpdate = Date.now();
        state.ideasVersion = IDEAS_VERSION;

        return [aiIdea, storyCard];

    } catch (error) {
        console.error("Error AI Ideas:", error);
        return [getFallbackIdeas(currentHour)[0], storyCard];
    }
}

function getFallbackIdeas(hour) {
    const isNight = hour >= 19 || hour < 7;
    return [
        {
            id: 'f1',
            type: isNight ? 'Evento' : 'Juego',
            category: isNight ? 'Paz' : 'Conexión',
            title: isNight ? 'La Bendición del Día' : 'El Tesoro Compartido',
            desc: isNight ? 'Un momento de gratitud profunda al cerrar el día, dando gracias por un don recibido en familia.' : 'Buscad un objeto en casa que represente algo bueno que os haya pasado hoy.',
            image: isNight ? IMAGES.EVENTO : IMAGES.JUEGO
        },
        {
            id: 'f2',
            type: 'Cuento',
            category: 'Virtudes',
            title: 'Un Súper Cuento de Valentía',
            desc: 'Cread juntos una historia donde los niños son héroes que superan un reto real usando el amor y el perdón.',
            image: IMAGES.CUENTO
        }
    ];
}

export async function generateAIStory(idea) {
    const config = state.storyConfig || { theme: 'Aventura', characters: [] };
    const protagonists = config.characters.filter(c => c.trim() !== '');
    const childrenNames = state.children.map(c => c.name).join(', ');

    const systemPrompt = `Eres un cuentacuentos experto en narrativa infantil y pedagogía de virtudes. 
Tu misión es escribir un cuento para niños que sea AMENO, MÁGICO y que enganche desde la primera frase.

DIRECTRICES DE TONO Y VALORES:
    1. SUTILEZA: No seas "intenso" con el lenguaje religioso o bíblico.Los valores cristianos(amor, obediencia, compañerismo, gratitud) deben ser la esencia del comportamiento de los personajes, no un sermón explícito.
2. NARRATIVA INFANTIL: El cuento debe ser una aventura o historia mágica real.Las lecciones de vida se aprenden a través de lo que ocurre en la trama(ej: colaborar para superar un obstáculo).
3. LONGITUD: Unas 600 - 700 palabras(aprox. 5 - 7 minutos de lectura). 
4. PROTAGONISTAS: ${protagonists.length > 0 ? protagonists.join(' y ') : childrenNames}.
    5. TEMA: ${config.theme}.

Formato de salida: JSON con:
    - title: Título creativo y sugerente.
- content: El texto completo del cuento(usa \n\n para párrafos).
- metadata: { virtue: "${config.theme}", duration: "6-7 min" } `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY} `
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "system", content: systemPrompt }],
                response_format: { type: "json_object" },
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (!data.choices || !data.choices[0]) throw new Error("Fallo en respuesta OpenAI");

        const content = JSON.parse(data.choices[0].message.content);

        return {
            title: content.title || "Una Historia de PIVOT",
            content: content.content || "El cuento no pudo ser recuperado. Por favor, inténtalo de nuevo.",
            metadata: {
                virtue: (content.metadata && content.metadata.virtue) ? content.metadata.virtue : config.theme,
                duration: (content.metadata && content.metadata.duration) ? content.metadata.duration : "6 min",
                author_influence: 'Inspirado en PIVOT y valores cristianos'
            }
        };
    } catch (error) {
        console.error("Error AI Story:", error);
        return {
            title: "Una Aventura de Conexión",
            content: "Había una vez un lugar donde el amor siempre ganaba...",
            metadata: { virtue: config.theme, duration: "2 min" }
        };
    }
}

window.getIdeasContext = getIdeasContext;
window.getPersonalizedIdeas = getPersonalizedIdeas;
window.generateAIStory = generateAIStory;
