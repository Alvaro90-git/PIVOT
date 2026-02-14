import { WEEKLY_PLAN_DB, CHALLENGE_DB, RADAR_AREAS, PARENT_CHILD_MATCH_DB } from './data.js';
import { state } from './state.js';

export function getAgeBracket(age) {
    if (age <= 3) return '1-3';
    if (age <= 6) return '4-6';
    if (age <= 10) return '7-10';
    if (age <= 13) return '11-13';
    return '14-18';
}

export function getWeeklyPlan(child) {
    if (!child || !child.weeklyFocus) return { obj: 'Define un enfoque...', phrase: 'Empecemos juntos.', consequence: 'Natural.', repair: 'Reconexión.' };
    const bracket = getAgeBracket(child.age);
    const area = child.weeklyFocus[0] || 'autocontrol';
    return (WEEKLY_PLAN_DB[bracket] && WEEKLY_PLAN_DB[bracket][area]) || { obj: 'Desarrollo de hábito...', phrase: 'Vamos a trabajar esto juntos.', consequence: 'Consecuencia natural.', repair: 'Reparación positiva.' };
}

export function getOptimalChallenge(child) {
    return { id: 'radar_focus', title: 'Mejorar Autocontrol', concept: 'autocontrol' };
}

export function getSmartTarget(age, area) {
    // Scientific Developmental Targets (1-5 Scale)
    if (age <= 2) {
        switch (area) {
            case 'respeto': return 3.0;
            case 'autonomia': return 2.5;
            case 'social': return 2.5;
            case 'esfuerzo': return 2.0;
            case 'autocontrol': return 1.5;
            case 'responsabilidad': return 1.0;
            default: return 2.0;
        }
    }
    if (age <= 5) {
        switch (area) {
            case 'autonomia': return 3.8;
            case 'social': return 3.5;
            case 'respeto': return 3.5;
            case 'autocontrol': return 3.0;
            case 'esfuerzo': return 3.0;
            case 'responsabilidad': return 2.8;
            default: return 3.2;
        }
    }
    if (age <= 9) {
        switch (area) {
            case 'respeto': return 4.2;
            case 'responsabilidad': return 3.8;
            case 'esfuerzo': return 4.0;
            case 'social': return 4.0;
            case 'autonomia': return 4.5;
            case 'autocontrol': return 3.8;
            default: return 4.0;
        }
    }
    return 4.8;
}

export function getContextAdvice(child) {
    const hour = new Date().getHours();
    const age = child.age;
    if (age >= 3 && age <= 10) {
        if (hour >= 17 && hour <= 19) return { sit: 'pantallas_resistencia', title: 'Gestión de Pantallas', text: 'Alerta de fin de tiempo. Prepáralo 5 minutos antes para evitar rabieta.' };
        if (hour >= 20) return { sit: 'bebe_sueno', title: 'Rutina Nocturna', text: 'Es tarde. Una rutina de calma ahora evitará tensión al ir a la cama.' };
        return { sit: 'rabietas', title: 'Orden Activo', text: 'Momento de transición. Invítale a recoger sus cosas como un juego.' };
    }
    if (age >= 11) {
        if (hour >= 20) return { sit: 'adiccion_movil', title: 'Higiene del Sueño', text: 'Retira dispositivos ahora. Su cerebro necesita desconectar 1h antes de dormir.' };
        if (hour >= 15 && hour <= 18) return { sit: 'adiccion_movil', title: 'Uso del Móvil', text: 'Pico de consumo digital detectado. Propón un plan físico para resetear dopamina.' };
        return { sit: 'aislamiento', title: 'Conexión Emocional', text: 'Momento ideal para charlar sin juicios sobre su día. Abre el canal.' };
    }
    return { sit: 'bebe_sueno', title: 'Cuidado Vital', text: 'Mantén la calma y la rutina habitual para asegurar su bienestar.' };
}

export function getWeeklyChallenges(child) {
    let bracket = '0-2';
    if (child.age >= 3 && child.age <= 5) bracket = '3-5';
    else if (child.age >= 6 && child.age <= 9) bracket = '6-9';
    else if (child.age >= 10 && child.age <= 13) bracket = '10-13';
    else if (child.age >= 14) bracket = '14-18';

    const library = CHALLENGE_DB[bracket] || CHALLENGE_DB['3-5'];

    const gaps = Object.keys(child.radar).map(key => {
        const target = getSmartTarget(child.age, key);
        const current = child.radar[key] || 1;
        return { key, gap: target - current, val: current };
    });

    let candidates = gaps.filter(g => g.gap > 0).sort((a, b) => b.gap - a.gap);
    if (candidates.length === 0) candidates = gaps.sort((a, b) => b.val - a.val);

    return candidates.slice(0, 2).map(c => {
        const lib = library[c.key];
        const challengeId = `ch_${child.id}_${c.key}_w1`;
        const savedProgress = state.challengeProgress?.[challengeId] || 0;

        return {
            id: challengeId,
            areaKey: c.key,
            area: RADAR_AREAS[c.key].name,
            icon: lib.icon,
            task: lib.title,
            description: lib.description,
            bgGradient: lib.gradient,
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#FFFFFF',
            level: c.gap > 0 ? '🔥 MEJORA' : '🌟 MAESTRÍA',
            stars: 3,
            totalDays: 7,
            completedDays: savedProgress,
            isMastery: c.gap <= 0
        };
    });
}

export function getDynamicMatch(childId) {
    const child = state.children.find(c => c.id === childId);
    if (!child) return { level: 'Pendiente', color: '#64748B', score: 0 };

    const parent = state.parentProfile;
    const parentStyle = parent.parentTestResult?.style || 'CALMADO';

    // 1. Base Match Level from DB
    const baseMatch = PARENT_CHILD_MATCH_DB[parentStyle]?.[child.temperament] || { level: 'Medio' };
    let score = baseMatch.level === 'Alto' ? 70 : (baseMatch.level === 'Medio' ? 50 : 30);

    // 2. Radar Influence (Real performance/score)
    const areas = Object.keys(child.radar);
    const avgRadar = areas.reduce((sum, k) => sum + child.radar[k], 0) / areas.length;
    // Difference from neutral point (3.0). Higher average improves accompaniment perception.
    const radarInfluence = (avgRadar - 3) * 12; // Range: -24 to +24
    score += radarInfluence;

    // 3. Challenge Diligence (Intent and Effort)
    let totalEffort = 0;
    if (state.challengeProgress) {
        Object.keys(state.challengeProgress).forEach(key => {
            if (key.includes(`ch_${child.id}_`)) {
                totalEffort += (state.challengeProgress[key] || 0);
            }
        });
    }
    // Each successful day in challenges adds up. Cap at +20.
    score += Math.min(20, totalEffort * 1.5);

    // 4. Final Label Mapping
    if (score >= 82) return { level: 'Sobresaliente', color: '#10B981', score };
    if (score >= 62) return { level: 'Alto', color: '#10B981', score };
    if (score >= 38) return { level: 'Medio', color: '#F59E0B', score };
    return { level: 'A mejorar', color: '#EF4444', score };
}
export function getPersonalizedFeedbackPhrase(childName, situationId, score) {
    // Evaluación basada en Sabiduría PIVOT: Empatía + Guía Experta
    const isVeryPositive = score === 100;
    const isPositive = score >= 66;
    const isNeutral = score === 33;

    // Fallback con tono de Mentor Experto
    if (!situationId) {
        if (isVeryPositive) return `<b>Conexión profunda:</b> Tu sintonía con <b>${childName}</b> hoy ha sido excepcional. Como dice Siegel, estás integrando su mundo emocional y creando un cerebro resiliente.`;
        if (isPositive) return `<b>Base Segura:</b> Estás haciendo un gran trabajo de acompañamiento. <b>${childName}</b> siente que eres su refugio seguro, lo cual es vital para su autonomía futura.`;
        return `<b>Oportunidad de Crecimiento:</b> Educar es sembrar a largo plazo. Mañana será un nuevo día para volver a conectar con el corazón de <b>${childName}</b>.`;
    }

    const SIT_DATA = {
        'bebe_sueno': {
            good: `Tu presencia calmada es el 'ancla' que <b>${childName}</b> necesita. Estás transmitiendo seguridad biológica pura.`,
            benefit: `Al dormir desde la calma, el sistema nervioso de <b>${childName}</b> se desarrolla en un entorno de confianza absoluta.`,
            bad: `El sueño es neurodesarrollo. No es falta de voluntad; <b>${childName}</b> solo necesita tu regulación emocional para volver a la calma.`
        },
        'rabietas': {
            good: `¡Excelente ejercicio de <b>Conectar y Redirigir</b>! Has atendido su emoción antes de intentar razonar con su cerebro lógico.`,
            benefit: `Como enseña Siegel, estás ayudando a <b>${childName}</b> a 'nombrar para dominar' sus tormentas internas, fortaleciendo sus funciones ejecutivas.`,
            bad: `En plena rabieta, el 'cerebro de abajo' de <b>${childName}</b> ha tomado el mando. Tu papel es ser su corteza prefrontal externa hasta que pase la tormenta.`
        },
        'negativismo': {
            good: `Al darle opciones, estás respetando su <b>Dignidad y Autonomía</b>, tal como propondría Montessori.`,
            benefit: `Esto reduce la resistencia de <b>${childName}</b> y fomenta una autoafirmación sana dentro de unos límites seguros y amorosos.`,
            bad: `El "No" es una fase de descubrimiento del yo. Guía a <b>${childName}</b> con firmeza amable, recordándole que su opinión importa, pero tú mantienes el rumbo.`
        },
        'pantallas_resistencia': {
            good: `Has protegido el <b>Asombro</b> de <b>${childName}</b> limitando la sobreestimulación digital. ¡Un gran paso hacia la realidad!`,
            benefit: `Como apunta L’Ecuyer, estás permitiendo que su cerebro recupere la capacidad de concentrarse en lo real y lo tangible.`,
            bad: `Las pantallas son dopamina pura. La resistencia de <b>${childName}</b> es fisiológica. Sé su guía en este 'desierto digital' con paciencia infinita.`
        },
        'aislamiento': {
            good: `Has respetado su espacio manteniendo el <b>Vínculo</b> intacto. Sabes ser su Base Segura incluso en la distancia.`,
            benefit: `Esto le da a <b>${childName}</b> la intimidad necesaria para su etapa adolescente, sabiendo que siempre hay un puerto de amor al que volver.`,
            bad: `A veces el silencio es su forma de procesar. Mantente cerca 'sin invadir', recordándole a <b>${childName}</b> que tu amor es incondicional.`
        },
        'mal_humor': {
            good: `Has aplicado un perfecto <b>Emotional Coaching</b> (Gottman). Validar su emoción es la llave de su corazón.`,
            benefit: `<b>${childName}</b> aprende que todas sus emociones son válidas, aunque algunas conductas no lo sean. Eso es madurez emocional pura.`,
            bad: `Su mal humor es una petición de ayuda oculta. Intenta descifrar qué 'lenguaje del amor' necesita <b>${childName}</b> en este momento de tensión.`
        }
    };

    const data = SIT_DATA[situationId];
    if (!data) return isPositive ? `Tu enfoque con <b>${childName}</b> refuerza vuestra conexión y su seguridad interna.` : `Cada reto es una oportunidad para pastorear el corazón de <b>${childName}</b> con más sabiduría.`;

    if (isVeryPositive) {
        return `<b>${data.good}</b> ${data.benefit}`;
    } else if (isPositive) {
        return `${data.good} Estás construyendo un vínculo de amor que durará para siempre.`;
    } else if (score >= 33) {
        return `Educar con amor no es ser perfecto. Tu intención de guiar a <b>${childName}</b> ya está dando frutos en su carácter.`;
    } else {
        return `<b>${data.bad}</b> Manten la calma; eres el mentor experto que <b>${childName}</b> necesita para crecer en virtud.`;
    }
}
export function processHuella(childId, data) {
    const child = state.children.find(c => c.id === childId);
    if (!child) return;

    // Update Parent Radar
    const pRadar = state.parentProfile.radar;
    const learningRate = 0.15; // 15% weight for each entry (faster growth for engagement)
    const decay = 1 - learningRate;

    pRadar.serenidad = (pRadar.serenidad * decay) + (data.calma * learningRate);
    pRadar.firmeza_afectuosa = (pRadar.firmeza_afectuosa * decay) + (data.firmeza * learningRate);
    pRadar.conexion = (pRadar.conexion * decay) + (data.conexion * learningRate);

    // Impact on Child Radar (Example)
    if (data.type === 'acierto') {
        Object.keys(child.radar).forEach(k => {
            child.radar[k] = Math.min(5, child.radar[k] + 0.1);
        });
    } else if (data.type === 'conflicto' && data.calma >= 4) {
        // Successful conflict management boosts self-control
        child.radar.autocontrol = Math.min(5, child.radar.autocontrol + 0.15);
    }

    // Save history
    if (!state.parentProfile.huellaHistory) state.parentProfile.huellaHistory = [];
    state.parentProfile.huellaHistory.push({
        timestamp: new Date().toISOString(),
        childId,
        childName: child.name,
        type: data.type,
        scores: data,
        insight: getHuellaInsight(data)
    });
}

function getHuellaInsight(data) {
    if (data.calma >= 4 && data.firmeza >= 4) return "Equilibrio perfecto: Autoridad con Ternura.";
    if (data.calma < 3) return "Recuerda: Tu calma es el ancla de su tormenta.";
    if (data.firmeza < 3) return "La firmeza es amor: le da seguridad saber el límite.";
    return "Cada experiencia es un peldaño en vuestro crecimiento.";
}
