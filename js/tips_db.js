
// --- DAILY TIPS DATABASE (EDUCATION WITH LOVE & POSITIVE DISCIPLINE) ---
// Sources: Discipline with Love, Montessori, Attachment Parenting
const TIPS_DB = [
    // --- 0-2 AÑOS: APEGO Y SEGURIDAD ---
    {
        id: 't001', area: 'autocontrol', min: 0, max: 2, title: 'El Poder del Abrazo',
        text: 'Cuando llore, tu abrazo no malcría, regula su estrés. Es su puerto seguro.',
        explanation: '<b>El Porqué:</b> En esta edad, el sistema nervioso del bebé es inmaduro y no puede autorregularse solo. Tu contacto físico libera oxitocina, que reduce los niveles de cortisol (la hormona del estrés) de forma inmediata.<br><br><b>Cómo aplicarlo:</b> Mantén un abrazo firme y calmado, respirando hondo. Tu calma se "contagia" a través de la corregulación biológica.',
        color: '#EF4444', icon: '🫂'
    },
    {
        id: 't002', area: 'autonomia', min: 0, max: 2, title: 'Déjame Intentarlo',
        text: 'Si intenta ponerse el zapato, espera 30 segundos antes de ayudar. Valora su esfuerzo.',
        explanation: '<b>El Porqué:</b> La autonomía empieza con la percepción de autoeficacia ("yo puedo"). Intervenir demasiado pronto envía el mensaje de que su esfuerzo no es suficiente.<br><br><b>Cómo aplicarlo:</b> Observa sin hablar. Si se frustra, ayúdale solo en el punto exacto donde se ha quedado bloqueado para que él pueda terminar la acción.',
        color: '#10B981', icon: '👟'
    },
    {
        id: 't003', area: 'respeto', min: 0, max: 2, title: 'Anticipa el Cambio',
        text: 'No lo saques del baño de golpe. Avísale: "Un minuto y salimos". Respeta su actividad.',
        explanation: '<b>El Porqué:</b> Para un niño pequeño, las transiciones bruscas se sienten como una pérdida de control, lo que dispara las rabietas. La anticipación crea previsibilidad y seguridad.<br><br><b>Cómo aplicarlo:</b> Usa señales visuales o auditivas. "Cuando pite el patito, salimos del agua". Dale tiempo a su cerebro para procesar el cambio.',
        color: '#F59E0B', icon: '🛁'
    },
    {
        id: 't004', area: 'social', min: 0, max: 2, title: 'Mirada Atenta',
        text: 'Cuando te hable (o balbucee), deja el móvil y mírale a los ojos. Le enseñas a escuchar.',
        explanation: '<b>El Porqué:</b> El desarrollo del lenguaje y la sociabilidad dependen de la "atención conjunta". Sentirse mirado es sentirse existido y valorado.<br><br><b>Cómo aplicarlo:</b> Agáchate hasta que tus ojos estén a su nivel. Responde a sus sonidos como si fueran frases reales; esto valida su intención comunicativa.',
        color: '#3B82F6', icon: '👀'
    },
    {
        id: 't005', area: 'autonomia', min: 0, max: 2, title: 'Dos Cucharas',
        text: 'En la comida, dale una cuchara para que practique mientras tú le ayudas con otra.',
        explanation: '<b>El Porqué:</b> La alimentación no es solo nutrición, es una oportunidad de desarrollo motor. La curiosidad por explorar texturas y utensilios es la base de su independencia.<br><br><b>Cómo aplicarlo:</b> Deja que ensucie un poco. Tener su propia cuchara satisface su deseo de control mientras recibe el alimento necesario de la tuya.',
        color: '#10B981', icon: '🥄'
    },
    {
        id: 't006', area: 'autocontrol', min: 0, max: 2, title: 'Nombra la Emoción',
        text: 'Si llora, di: "Estás triste porque se cayó la torre". Pones nombre al caos que siente.',
        explanation: '<b>El Porqué:</b> Lo que no se nombra, no se puede gestionar. Poner palabras a sus sensaciones físicas ayuda a conectar el hemisferio derecho (emoción) con el izquierdo (lógica).<br><br><b>Cómo aplicarlo:</b> Usa un tono empático. No juzgues la importancia del motivo, simplemente describe lo que ves: "Veo frustración porque no encaja".',
        color: '#EF4444', icon: '😢'
    },

    // --- 3-5 AÑOS: VALIDACIÓN Y AUTONOMÍA ---
    {
        id: 't101', area: 'autocontrol', min: 3, max: 5, title: 'Validar no es Ceder',
        text: 'Puedes aceptar su enfado ("Entiendo que querías la chuche") sin dársela. Conexión antes que corrección.',
        explanation: '<b>El Porqué:</b> Validar la emoción permite que el niño se sienta comprendido, lo que reduce su actitud defensiva. Mantener el límite enseña estructura y seguridad.<br><br><b>Cómo aplicarlo:</b> "Sé que te encantaría tener ese juguete, es precioso. Pero hoy no lo vamos a comprar". Acepta su tristeza sin cambiar tu decisión.',
        color: '#EF4444', icon: '❤️'
    },
    {
        id: 't102', area: 'autonomia', min: 3, max: 5, title: 'Canasta de Vestir',
        text: 'Pon ropa básica en una canasta a su altura. Vestirse solo construye autoestima.',
        explanation: '<b>El Porqué:</b> El entorno debe estar preparado para su éxito. Si la ropa está fuera de su alcance, siempre dependerá de ti. Acceder a ella le da poder sobre su vida diaria.<br><br><b>Cómo aplicarlo:</b> Selecciona 2 opciones de pantalones y 2 de camisetas. Deja que él elija la combinación final. Menos opciones evitan la parálisis de decisión.',
        color: '#10B981', icon: '🧺'
    },
    {
        id: 't103', area: 'responsabilidad', min: 3, max: 5, title: 'Encargado del Agua',
        text: 'Dale la misión de regar una planta cada viernes. Pequeños cargos crean pertenencia.',
        explanation: '<b>El Porqué:</b> La responsabilidad nace de sentirse útil. Cuando un niño contribuye al bienestar de otro ser vivo o de la casa, su sentido de pertenencia se fortalece.<br><br><b>Cómo aplicarlo:</b> Haz que la tarea sea sagrada. Dale su propia regadera pequeña y marca el día en el calendario. Lo importante no es la planta, sino su constancia.',
        color: '#8B5CF6', icon: '🪴'
    },
    {
        id: 't104', area: 'respeto', min: 3, max: 5, title: 'Opciones Cerradas',
        text: 'Para evitar luchas: "¿Te pones el pijama rojo o el azul?". Decide él, pero dentro de tu límite.',
        explanation: '<b>El Porqué:</b> Los niños de esta edad están en la fase de autoafirmación. Al darles una opción, satisfaces su necesidad de mando mientras aseguras que se cumpla la tarea necesaria.<br><br><b>Cómo aplicarlo:</b> Ambas opciones deben ser aceptables para ti. "¿Prefieres ir saltando como un conejo hasta el coche o caminando como un soldado?". El objetivo es llegar al coche.',
        color: '#F59E0B', icon: '👕'
    },
    {
        id: 't105', area: 'social', min: 3, max: 5, title: 'Juego de Turnos',
        text: 'Usa un reloj de arena para turnarse un juguete. "Cuando caiga la arena, te toca". Es visual y justo.',
        explanation: '<b>El Porqué:</b> El concepto del tiempo es abstracto para ellos. Un reloj de arena convierte la espera en algo visible, reduciendo la ansiedad por "perder" el juguete.<br><br><b>Cómo aplicarlo:</b> No obligues a compartir de inmediato. Deja que juegue un rato y avisa: "Cuando termine la arena, será el turno de Juan". Esto fomenta la generosidad voluntaria.',
        color: '#3B82F6', icon: '⏳'
    },
    {
        id: 't106', area: 'esfuerzo', min: 3, max: 5, title: 'Elogio Descriptivo',
        text: 'En vez de "¡Muy bien!", di: "Has recogido todos los bloques rojos". Fomenta la motivación interna.',
        explanation: '<b>El Porqué:</b> El elogio genérico crea adicción a la aprobación externa. El elogio descriptivo hace que el niño reflexione sobre su propio logro y capacidad.<br><br><b>Cómo aplicarlo:</b> Describe la realidad: "Veo que has puesto mucho esfuerzo en ese dibujo, has usado muchos colores". Deja que él mismo sea quien juzgue si le gusta.',
        color: '#6366F1', icon: '🧱'
    },
    {
        id: 't107', area: 'autocontrol', min: 3, max: 5, title: 'Rincón de la Calma',
        text: 'Crea un espacio con cojines y cuentos. No es para castigar, es para ir cuando necesita paz.',
        explanation: '<b>El Porqué:</b> El aislamiento (tiempo fuera) genera abandono y resentimiento. Un rincón de la calma enseña que es lícito alejarse para recuperar el control sobre uno mismo.<br><br><b>Cómo aplicarlo:</b> Id juntos la primera vez. "Parece que tu cerebro está muy revolucionado, ¿quieres que vayamos un ratito al rincón de la calma a leer?". Debe ser un refugio, no una cárcel.',
        color: '#EF4444', icon: '⛺'
    },

    // --- 6-9 AÑOS: CONEXIÓN Y HÁBITOS ---
    {
        id: 't201', area: 'responsabilidad', min: 6, max: 9, title: 'Reunión Familiar',
        text: 'Los domingos, sentaos 10 min a planear la semana. Que todos opinen. Crea equipo.',
        explanation: '<b>El Porqué:</b> Participar en la toma de decisiones aumenta el compromiso. Cuando los niños ayudan a planear el menú o las salidas, se sienten respetados como miembros activos del sistema.<br><br><b>Cómo aplicarlo:</b> Usa una libreta o pizarra. Pregunta: "¿Qué plato especial os gustaría esta semana?" o "¿Qué juego haremos el sábado tarde?". Los acuerdos se cumplen mejor que las órdenes.',
        color: '#8B5CF6', icon: '🗓️'
    },
    {
        id: 't202', area: 'social', min: 6, max: 9, title: 'La Regla de Oro',
        text: 'Ante un conflicto, pregunta: "¿Cómo te sentirías tú si te hicieran eso?". Empatía activa.',
        explanation: '<b>El Porqué:</b> A esta edad se desarrolla la capacidad de perspectiva. Sacar el foco de su propio enfado y ponerlo en el otro es la base de la inteligencia social y el civismo.<br><br><b>Cómo aplicarlo:</b> Hazlo cuando la calma haya vuelto. "¿Has visto la cara de tu hermana cuando le has dicho eso? ¿Cómo crees que tiene el corazón ahora?". No busques culpa, busca comprensión.',
        color: '#3B82F6', icon: '📏'
    },
    {
        id: 't203', area: 'esfuerzo', min: 6, max: 9, title: 'El Poder del "Todavía"',
        text: 'Si dice "No sé hacerlo", añade "TODAVÍA". Cambia la frustración por esperanza.',
        explanation: '<b>El Porqué:</b> El cerebro es plástico. El "todavía" activa la mentalidad de crecimiento, enseñando que la capacidad no es fija, sino algo que se entrena con el tiempo y el esfuerzo.<br><br><b>Cómo aplicarlo:</b> Cada vez que use el "No sé" o "No puedo", corrígele cariñosamente: "No te sale TODAVÍA, significa que tu cerebro está aprendiendo el camino".',
        color: '#6366F1', icon: '🌱'
    },
    {
        id: 't204', area: 'respeto', min: 6, max: 9, title: 'Preguntas Curiosas',
        text: 'En lugar de sermonear por un error, pregunta: "¿Qué ha pasado? ¿Cómo lo arreglamos?".',
        explanation: '<b>El Porqué:</b> El sermón activa la desconexión mental. Las preguntas curiosas obligan al niño a pensar, analizar las consecuencias y buscar soluciones por sí mismo.<br><br><b>Cómo aplicarlo:</b> "Vaya, se ha derramado la leche. ¿Qué necesitamos para limpiar esto?". Enfócate en la solución, no en el culpable. Esto entrena la responsabilidad práctica.',
        color: '#F59E0B', icon: '❓'
    },
    {
        id: 't205', area: 'autocontrol', min: 6, max: 9, title: 'Tiempo Fuera Positivo',
        text: 'Enséñale a retirarse voluntariamente cuando "va a explotar". Es un signo de madurez, no un castigo.',
        explanation: '<b>El Porqué:</b> El autocontrol empieza por saber cuándo vamos a perderlo. Identificar la rabia antes de que se convierta en acción destructiva es la habilidad emocional más valiosa.<br><br><b>Cómo aplicarlo:</b> Modela la acción tú primero. "Hijo, ahora estoy muy enfadado y no quiero hablarte mal. Voy a la cocina 2 minutos para calmarme". Le enseñas con tu ejemplo el camino a la paz.',
        color: '#EF4444', icon: '✋'
    },
    {
        id: 't206', area: 'autonomia', min: 6, max: 9, title: 'Checklist de Salida',
        text: 'Pega una lista en la puerta (Mochila, Agua, Beso). Que él la revise sin que tú se lo repitas.',
        explanation: '<b>El Porqué:</b> Convertir tu voz en un "disco rayado" daña la relación. Ceder la responsabilidad a una herramienta externa (la lista) empodera al niño y reduce el estrés matutino.<br><br><b>Cómo aplicarlo:</b> Dibujad o escribid la lista juntos. Dile: "¿Qué dice la puerta que nos falta?". Deja que él sea el capitán de su propia organización.',
        color: '#10B981', icon: '✅'
    },
    {
        id: 't207', area: 'responsabilidad', min: 6, max: 9, title: 'Gestión de Paga',
        text: 'Dale una pequeña cantidad semanal para sus caprichos. Deja que la malgaste y aprenda.',
        explanation: '<b>El Porqué:</b> El valor del dinero se aprende con la escasez y la elección. Malgastar la paga en algo que se rompe enseguida es una lección mucho más potente que mil consejos tuyos.<br><br><b>Cómo aplicarlo:</b> Si se queda sin dinero el martes, no le des más. "Te entiendo, qué rabia que ya no te quede. El próximo domingo volverás a tener otra oportunidad para decidir mejor".',
        color: '#8B5CF6', icon: '💰'
    },

    // --- 10-18 AÑOS: ADOLESCENCIA Y CONFIANZA ---
    {
        id: 't301', area: 'social', min: 10, max: 18, title: 'Escucha de 5 Minutos',
        text: 'Escucha sus problemas 5 minutos sin dar NINGÚN consejo. Solo asiente y valida. Es magia.',
        explanation: '<b>El Porqué:</b> El adolescente necesita sentir que su voz tiene peso por sí misma. El consejo no solicitado se percibe como una crítica a su capacidad de resolver problemas.<br><br><b>Cómo aplicarlo:</b> Cierra la boca y abre el corazón. "Entiendo... debe ser duro... entiendo por qué te sientes así". A menudo, solo necesitan ser escuchados para encontrar ellos mismos la salida.',
        color: '#3B82F6', icon: '👂'
    },
    {
        id: 't302', area: 'autocontrol', min: 10, max: 18, title: 'Acuerdos, no Normas',
        text: 'Pactad la hora de llegada juntos. Si participa en la regla, la cumplirá mejor.',
        explanation: '<b>El Porqué:</b> El cerebro adolescente busca independencia. Una norma impuesta invita a la rebelión. Un acuerdo negociado apela a su sentido de la responsabilidad y honorabilidad.<br><br><b>Cómo aplicarlo:</b> "Necesito que estés en casa a una hora que me permita dormir tranquilo/a. ¿Qué hora te parece justa teniendo en cuenta que el bus pasa a las 11:30?". La negociación crea compromiso.',
        color: '#EF4444', icon: '🤝'
    },
    {
        id: 't303', area: 'respeto', min: 10, max: 18, title: 'Privacidad Sagrada',
        text: 'Llama a su puerta antes de entrar. Si quieres respeto, modela respeto.',
        explanation: '<b>El Porqué:</b> Su cuarto es su laboratorio de identidad. Respetar su espacio físico es la forma más directa de decir "confío en ti y respeto la persona que estás construyendo".<br><br><b>Cómo aplicarlo:</b> Llama suavemente y espera a que responda. No revises su móvil o cajones a escondidas; la pérdida de confianza es mucho más cara que cualquier secreto que puedas encontrar.',
        color: '#F59E0B', icon: '🚪'
    },
    {
        id: 't304', area: 'autonomia', min: 10, max: 18, title: 'Gestor de Viajes',
        text: 'Deja que planifique una excursión familiar: ruta, comida y horario. Confía en su criterio.',
        explanation: '<b>El Porqué:</b> Practicar la gestión en un entorno seguro les prepara para la vida adulta. Ver que su familia disfruta de un plan organizado por él eleva su autoestima masivamente.<br><br><b>Cómo aplicarlo:</b> Dale un presupuesto y unas necesidades básicas. "Tenemos 50€ y queremos pasar el día fuera. Tú decides dónde y cómo". Acompaña, pero deja que él dirija el timón.',
        color: '#10B981', icon: '🗺️'
    },
    {
        id: 't305', area: 'esfuerzo', min: 10, max: 18, title: 'Valora el Carácter',
        text: 'Elogia su integridad o amabilidad, no solo sus notas. ¿Quién es él, más allá de lo que hace?',
        explanation: '<b>El Porqué:</b> En un mundo obsesionado con el éxito externo, necesitan saber que su valor reside en su ser interior. Valorar su honestidad o valentía construye un carácter sólido.<br><br><b>Cómo aplicarlo:</b> "Me ha gustado mucho la elegancia con la que has saludado a esa persona" o "Valoro tu honestidad al contarme esto, sé que no era fácil". Refuerza la identidad, no solo el resultado.',
        color: '#6366F1', icon: '💎'
    },
    {
        id: 't306', area: 'responsabilidad', min: 10, max: 18, title: 'Consecuencias Naturales',
        text: 'Si no pone la ropa a lavar, no tiene ropa limpia. No le salves, acompáñale en el aprendizaje.',
        explanation: '<b>El Porqué:</b> Salvarles de los problemas les hace frágiles y dependientes. La consecuencia natural es la mejor maestra porque es lógica, justa y no emocional.<br><br><b>Cómo aplicarlo:</b> Sé empático pero firme. "Oh, no tienes la camiseta del fútbol limpia es una pena... ¿cómo vas a hacer la próxima vez para que me dé cuenta de que está sucia?". No es un castigo, es la vida.',
        color: '#8B5CF6', icon: '🧺'
    },
    {
        id: 't307', area: 'social', min: 10, max: 18, title: 'Coche-Terapia',
        text: 'Aprovecha los trayectos en coche para hablar. Al no haber contacto visual directo, se abren más.',
        explanation: '<b>El Porqué:</b> El contacto visual directo puede sentirse como un interrogatorio para el adolescente. Mirar ambos hacia la carretera reduce la presión y permite que fluyan temas más profundos.<br><br><b>Cómo aplicarlo:</b> Pon música suave y no fuerces la charla. Lanza una pregunta abierta y dales tiempo para responder. A veces, pasados 10 minutos de silencio, surge el gran tema.',
        color: '#3B82F6', icon: '🚗'
    },
    {
        id: 't308', area: 'autocontrol', min: 12, max: 18, title: 'Contrato Digital',
        text: 'Firmad un acuerdo de uso de pantallas que os incluya a TODOS (papás también).',
        explanation: '<b>El Porqué:</b> La coherencia es la madre de la autoridad. Si pides que dejen el móvil pero tú lo usas en la cena, tu mensaje es nulo. Un contrato compartido crea cultura familiar.<br><br><b>Cómo aplicarlo:</b> Acordad "Zonas Libres": ej. la mesa de comer y las habitaciones a partir de las 22:00. Si alguien lo incumple, todos aceptan la misma consecuencia pactada.',
        color: '#EF4444', icon: '📱'
    }
];

function getDailyTipsForChild(child, count = 3) {
    const today = new Date().toDateString(); // "Fri Feb 08 2026"
    const storageKeyDate = `tips_date_${child.id}`;
    const storageKeyTips = `tips_current_${child.id}`;
    const storageKeyHistory = `tips_history_${child.id}`;

    // 1. Check Previous Tips for Today
    const lastDate = localStorage.getItem(storageKeyDate);
    if (lastDate === today) {
        const stored = localStorage.getItem(storageKeyTips);
        if (stored) {
            try {
                const tipIds = JSON.parse(stored);
                // Ensure we find the tips (in case DB changed)
                const foundTips = tips = TIPS_DB.filter(t => tipIds.includes(t.id));
                if (foundTips.length > 0) return foundTips;
            } catch (e) { console.error("Error loading tips", e); }
        }
    }

    // 2. Generate New Tips
    const age = child.age;

    // Gap Analysis
    const gaps = Object.keys(RADAR_AREAS).map(area => {
        const target = getSmartTarget(age, area);
        const current = child.radar[area] || 1;
        return { area, gap: target - current };
    });

    const sortedAreas = gaps.sort((a, b) => b.gap - a.gap).map(g => g.area);
    const topWeakAreas = sortedAreas.slice(0, 3);

    // Filter Candidates
    const history = JSON.parse(localStorage.getItem(storageKeyHistory) || '[]');
    let candidates = TIPS_DB.filter(t => age >= t.min && age <= t.max);

    // Filter History
    const freshCandidates = candidates.filter(t => !history.includes(t.id));

    // Reset if low supply
    if (freshCandidates.length < count) {
        localStorage.setItem(storageKeyHistory, '[]');
        candidates = TIPS_DB.filter(t => age >= t.min && age <= t.max);
    } else {
        candidates = freshCandidates;
    }

    // Prioritize Weak Areas
    candidates.sort((a, b) => {
        const scoreA = topWeakAreas.includes(a.area) ? 5 : 0;
        const scoreB = topWeakAreas.includes(b.area) ? 5 : 0;
        return (scoreB + Math.random()) - (scoreA + Math.random()); // Add randomness
    });

    // Select
    const selected = candidates.slice(0, count);
    const selectedIds = selected.map(t => t.id);

    // 3. Save
    localStorage.setItem(storageKeyDate, today);
    localStorage.setItem(storageKeyTips, JSON.stringify(selectedIds));

    // Update History
    const newHistory = [...history, ...selectedIds].slice(-30);
    localStorage.setItem(storageKeyHistory, JSON.stringify(newHistory));

    return selected;
}
