import { WEEKLY_PLAN_DB, CHALLENGE_DB, RADAR_AREAS, PARENT_CHILD_MATCH_DB, DIAGNOSIS_MATRIX } from './data.js';
import { state } from './state.js';

export function calculateAge(birthDate) {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

export function getAgeBracket(age) {
    if (age <= 3) return '1-3';
    if (age <= 6) return '4-6';
    if (age <= 9) return '7-9';
    if (age <= 13) return '10-13';
    return '14-18';
}

export function calculateInitialRadar(responses, age = 5) {
    const radar = {};
    const ageMatrix = DIAGNOSIS_MATRIX[age] || DIAGNOSIS_MATRIX[5];

    Object.keys(responses).forEach(key => {
        const val = responses[key]; // 0, 1, 2
        const target = ageMatrix[key]?.target || 3.0;

        if (val === 2) radar[key] = target; // Sí = Meta de su edad
        else if (val === 1) radar[key] = target * 0.7; // A veces = 70% de su meta
        else radar[key] = Math.max(1, target * 0.4); // No = 40% de su meta
    });
    return radar;
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
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const isWeekend = (day === 0 || day === 6);
    const age = child.age;

    if (age >= 3 && age <= 10) {
        // MAÑANAS
        if (hour >= 6 && hour <= 9) {
            if (isWeekend) return { sit: 'autonomia', title: 'Mañana de Descanso', text: 'Es fin de semana. Deja que gestione su tiempo de juego tranquilo mientras despiertas.' };
            return { sit: 'autonomia', title: 'Rutina Escolar', text: 'Fomenta su autonomía con el desayuno y la mochila. ¡Tú solo supervisas!' };
        }
        // TARDES
        if (hour >= 17 && hour <= 19) {
            if (day === 0) return { sit: 'social', title: 'Domingo de Calma', text: 'Tarde de puerto seguro. Una actividad tranquila juntos preparará su corazón para la semana escolar sin estrés.' };
            if (isWeekend) return { sit: 'social', title: 'Conexión Total', text: 'Momento ideal para un juego de mesa o una actividad compartida sin prisas.' };
            return { sit: 'pantallas_resistencia', title: 'Gestión de Pantallas', text: 'Alerta de fin de tiempo. Prepáralo 5 minutos antes para evitar rabieta.' };
        }
        // NOCHES
        if (hour >= 20) {
            if (day === 0) return { sit: 'bebe_sueno', title: 'Paz de Domingo', text: 'Cierre de semana. Un momento de lectura o charla suave hoy le dará la paz necesaria para mañana.' };
            return { sit: 'bebe_sueno', title: 'Rutina Nocturna', text: 'Es tarde. Una rutina de calma ahora evitará tensión al ir a la cama.' };
        }

        return { sit: 'rabietas', title: 'Orden Activo', text: 'Momento de transición. Invítale a recoger sus cosas como un juego.' };
    }

    if (age >= 11) {
        // MAÑANAS
        if (hour >= 6 && hour <= 9 && !isWeekend) return { sit: 'responsabilidad', title: 'Autogestión', text: 'Día de instituto. No le despiertes: que use su alarma para entrenar responsabilidad.' };

        // TARDES
        if (hour >= 15 && hour <= 18) {
            if (isWeekend) return { sit: 'social', title: 'Ocio Compartido', text: 'Salid a caminar o haced algo que le guste. Es el momento de fortalecer el vínculo.' };
            return { sit: 'adiccion_movil', title: 'Uso del Móvil', text: 'Pico de consumo digital detectado. Propón un plan físico para resetear dopamina.' };
        }
        // NOCHES
        if (hour >= 20) return { sit: 'adiccion_movil', title: 'Higiene del Sueño', text: 'Retira dispositivos ahora. Su cerebro necesita desconectar 1h antes de dormir.' };

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

    // 1. UPDATE PARENT RADAR
    const pRadar = state.parentProfile.radar;
    const pLR = 0.12; // Learning rate
    const pDecay = 1 - pLR;

    pRadar.serenidad = (pRadar.serenidad * pDecay) + (data.parent.calma * pLR);
    pRadar.firmeza_afectuosa = (pRadar.firmeza_afectuosa * pDecay) + (data.parent.firmeza * pLR);
    pRadar.conexion = (pRadar.conexion * pDecay) + (data.parent.conexion * pLR);

    // 2. UPDATE CHILD RADAR (BASED ON EVALUATION)
    const cLR = 0.10; // Learning rate for child
    const cDecay = 1 - cLR;

    // Impact on Autocontrol (based on Intensity)
    child.radar.autocontrol = (child.radar.autocontrol * cDecay) + (data.child.intensity * cLR);

    // Impact on Respeto (based on Cooperation)
    child.radar.respeto = (child.radar.respeto * cDecay) + (data.child.cooperation * cLR);

    // Specific Situation Bonus
    if (data.situationId === 'acierto') {
        Object.keys(child.radar).forEach(k => {
            child.radar[k] = Math.min(5, child.radar[k] + 0.05);
        });
    }

    // 3. LOG HISTORY
    if (!state.parentProfile.huellaHistory) state.parentProfile.huellaHistory = [];
    state.parentProfile.huellaHistory.push({
        timestamp: new Date().toISOString(),
        childId,
        childName: child.name,
        situationId: data.situationId,
        data: data,
        insight: getHuellaInsight(data)
    });
}

function getHuellaInsight(data) {
    const p = data.parent;
    const c = data.child;

    if (p.calma >= 4 && c.intensity >= 4) return "Sincronía perfecta. Habéis gestionado la emoción con madurez.";
    if (p.calma >= 4 && c.intensity < 3) return "Gran resiliencia: Tu calma ha sido el ancla en su tormenta.";
    if (p.firmeza >= 4 && c.cooperation < 3) return "Firmeza serena: Has mantenido el límite pese a su resistencia.";
    if (p.conexion >= 4) return "El vínculo es lo primero. Has priorizado la relación.";

    return "Cada paso cuenta en vuestra maestría familiar.";
}
