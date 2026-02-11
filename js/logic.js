function getAgeBracket(age) {
    if (age <= 3) return '1-3';
    if (age <= 6) return '4-6';
    if (age <= 10) return '7-10';
    if (age <= 13) return '11-13';
    return '14-18';
}

function getWeeklyPlan(child) {
    if (!child || !child.weeklyFocus) return { obj: 'Define un enfoque...', phrase: 'Empecemos juntos.', consequence: 'Natural.', repair: 'Reconexión.' };
    const bracket = getAgeBracket(child.age);
    const area = child.weeklyFocus[0] || 'autocontrol';
    return (WEEKLY_PLAN_DB[bracket] && WEEKLY_PLAN_DB[bracket][area]) || { obj: 'Desarrollo de hábito...', phrase: 'Vamos a trabajar esto juntos.', consequence: 'Consecuencia natural.', repair: 'Reparación positiva.' };
}

function getOptimalChallenge(child) {
    return { id: 'radar_focus', title: 'Mejorar Autocontrol', concept: 'autocontrol' };
}

function getSmartTarget(age, area) {
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

function getContextAdvice(child) {
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

function getWeeklyChallenges(child) {
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

function getDynamicMatch(childId) {
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
function getPersonalizedFeedbackPhrase(childName, situationId, score) {
    // Evaluation levels
    const isVeryPositive = score === 100;
    const isPositive = score >= 66;
    const isNeutral = score === 33;

    // Fallback if no specific situation
    if (!situationId) {
        if (isVeryPositive) return `La conexión con <b>${childName}</b> hoy ha sido excepcional; estás construyendo un vínculo de confianza indestructible.`;
        if (isPositive) return `Buen trabajo acompañando a <b>${childName}</b>. Cada paso cuenta para fortalecer vuestra relación.`;
        return `Educar es una carrera de fondo. Mañana será un gran día para volver a conectar con <b>${childName}</b>.`;
    }

    const SIT_DATA = {
        'bebe_sueno': {
            good: `Tu calma al acostar a <b>${childName}</b> le da la seguridad necesaria para entregarse al sueño.`,
            benefit: `Con esto, <b>${childName}</b> desarrolla una relación sana con el descanso y se siente profundamente protegido.`,
            bad: `El sueño es un proceso madurativo complejo. Tu paciencia es el mejor refugio para <b>${childName}</b> en las noches difíciles.`
        },
        'bebe_comida': {
            good: `Respetar los ritmos de <b>${childName}</b> en la mesa hoy ha sido un acierto total.`,
            benefit: `Así <b>${childName}</b> aprende a escuchar sus propias señales de saciedad y desarrolla una sana relación con la comida.`,
            bad: `La alimentación puede ser estresante. Lo importante es que <b>${childName}</b> sienta que la mesa es un lugar seguro, no de conflicto.`
        },
        'rabietas': {
            good: `Tu forma de acompañar a <b>${childName}</b> con la rabieta ha sido fabulosa.`,
            benefit: `Con esto <b>${childName}</b> consigue más seguridad en sí mismo, aprende a regular sus emociones y a conocer mejor los límites de su entorno.`,
            bad: `Las tormentas emocionales de <b>${childName}</b> son agotadoras. Mantenerse presente sin juzgar es la semilla de su futuro autocontrol.`
        },
        'negativismo': {
            good: `Gestionar el "no" de <b>${childName}</b> dándole opciones ha sido una estrategia brillante.`,
            benefit: `Esto permite que <b>${childName}</b> sienta que tiene cierto control sobre su vida, reduciendo la frustración y fomentando su autonomía.`,
            bad: `El negativismo es una fase de autoafirmación. Aunque sea difícil, tu guía firme y amorosa enseñará a <b>${childName}</b> a colaborar.`
        },
        'compartir': {
            good: `Acompañar a <b>${childName}</b> en el respeto de turnos hoy ha sido una lección de vida fundamental.`,
            benefit: `Al no forzar el préstamo, <b>${childName}</b> entiende que sus pertenencias están seguras y esto le predispone a ser generoso de forma natural.`,
            bad: `No querer compartir es normal a su edad. Tu mediación ayuda a <b>${childName}</b> a entender que los turnos hacen el juego más divertido para todos.`
        },
        'comida_selectiva': {
            good: `Tu firmeza amable con el nuevo alimento ha ayudado mucho a <b>${childName}</b> hoy.`,
            benefit: `Al exponerle sin presiones, <b>${childName}</b> va perdiendo el miedo a lo desconocido y mejora su curiosidad por texturas y sabores.`,
            bad: `Comer debe ser un placer. Si <b>${childName}</b> hoy ha rechazado algo, tu constancia sin presión será la clave para que lo pruebe mañana.`
        },
        'deberes': {
            good: `Tu apoyo en los deberes de <b>${childName}</b> ha sido equilibrado y muy efectivo.`,
            benefit: `Al no darle las respuestas y valorar su esfuerzo, <b>${childName}</b> gana confianza en su capacidad de superación y mejora su hábito de estudio.`,
            bad: `Hay días de poca concentración. Recordar a <b>${childName}</b> que su valor no depende de sus notas le da la paz mental necesaria para seguir.`
        },
        'pantallas_resistencia': {
            good: `Anticipar y pactar el fin de las pantallas con <b>${childName}</b> ha funcionado de maravilla.`,
            benefit: `Gracias a esto, <b>${childName}</b> aprende a gestionar sus impulsos y a desconectar sin que su sistema de dopamina colapse en una rabieta.`,
            bad: `Poner límites digitales es un reto constante. Tu perseverancia protege el cerebro de <b>${childName}</b> y vuestro tiempo de calidad juntos.`
        },
        'adiccion_movil': {
            good: `Pactar espacios de "desconexión total" con <b>${childName}</b> hoy ha sido una victoria para vuestro vínculo.`,
            benefit: `Sin el móvil de por medio, el canal de comunicación con <b>${childName}</b> se abre y él siente que su presencia es lo más importante para ti.`,
            bad: `El mundo digital es muy adictivo. Tu esfuerzo por ofrecer alternativas atractivas a <b>${childName}</b> es vital para su equilibrio emocional.`
        },
        'aislamiento': {
            good: `Respetar el espacio de <b>${childName}</b> pero recordándole que estás ahí ha sido el enfoque perfecto.`,
            benefit: `Esto le da a <b>${childName}</b> la intimidad que necesita en esta etapa mientras mantiene la red de seguridad de saber que puede contar contigo.`,
            bad: `A veces necesitan retirarse. No lo tomes como algo personal; tu presencia silenciosa es un ancla de estabilidad invisible para <b>${childName}</b>.`
        },
        'mal_humor': {
            good: `Validar el mal humor de <b>${childName}</b> sin dejarte arrastrar por él ha sido un ejemplo de maestría parental.`,
            benefit: `Al verte calmado, <b>${childName}</b> aprende que las emociones se pueden gestionar sin que el entorno se desmorone por completo.`,
            bad: `Es difícil lidiar con el mal humor. Tomar aire y recordar que <b>${childName}</b> está aprendiendo a regularse te ayudará a ser su guía.`
        }
    };

    const data = SIT_DATA[situationId];
    if (!data) return isPositive ? `Tu enfoque con <b>${childName}</b> en esta situación refuerza vuestra conexión.` : `Cada reto con <b>${childName}</b> es una oportunidad de aprendizaje.`;

    if (isVeryPositive) {
        return `<b>${data.good}</b> ${data.benefit}`;
    } else if (isPositive) {
        return `${data.good} Cada día que acompañas así a <b>${childName}</b>, vuestra relación crece.`;
    } else if (isNeutral) {
        return `Educar no es perfecto. Hoy ha sido un reto, pero tu intención de guiar a <b>${childName}</b> es lo que realmente importa.`;
    } else {
        return `<b>${data.bad}</b> No te detengas, <b>${childName}</b> te necesita como su referente de calma más que nunca.`;
    }
}
