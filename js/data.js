export const PARENT_CHILD_MATCH_DB = {
    CALMADO: {
        Tranquilo: {
            level: 'Alto',
            keys: ['Sincronía emocional equilibrada.', 'Riesgo de baja estimulación por falta de fricción.', 'Ambiente de paz que favorece el pensamiento crítico.'],
            advice: 'Vuestro riesgo es la inercia. Como no hay conflictos, podrías olvidar proponer retos que le saquen de su zona de confort. ¡Estimula su iniciativa!'
        },
        Intenso: {
            level: 'Medio',
            keys: ['Eres el ancla necesaria para su tormenta.', 'Riesgo de desconexión por ritmos opuestos.', 'Peligro de burnout parental por demanda energética.'],
            advice: 'Tu calma es su medicina, pero cuidado: él puede sentir que "no te importa" si no muestras algo de su intensidad. Valida su energía antes de pedirle calma.'
        },
        Sensible: {
            level: 'Alto',
            keys: ['Refugio seguro inmejorable.', 'Procesamiento profundo conjunto.', 'Entorno de baja reactividad ideal.'],
            advice: 'Eres el puerto perfecto. Tu reto es no dejar que vuestra sintonía os aísle; ayúdale a ganar piel frente a un mundo que será más reactivo que tú.'
        }
    },
    FIRME: {
        Tranquilo: {
            level: 'Alto',
            keys: ['Claridad que genera seguridad.', 'Riesgo de obediencia ciega sin criterio.', 'Estructura sólida para el aprendizaje.'],
            advice: 'Le das el mapa perfecto. Tu reto es fomentar su rebeldía sana: asegúrate de que tome decisiones propias aunque se salgan de tu estructura.'
        },
        Intenso: {
            level: 'A mejorar',
            keys: ['Choque de voluntades frecuente.', 'Riesgo de "escalada simétrica" (gritos contra gritos).', 'Luchas de poder por el control del marco.'],
            advice: 'Vuestra relación es un "choque de trenes". Necesitas usar "firmeza blanda": mantén el límite pero baja el volumen. Si tú subes, él subirá al doble.'
        },
        Sensible: {
            level: 'A mejorar',
            keys: ['Riesgo de ruptura del vínculo por exceso de exigencia.', 'El niño percibe la firmeza como falta de amor.', 'Bloqueo emocional ante la corrección.'],
            advice: 'Tu tono de voz es su mayor amenaza. Necesitas aplicar la regla de "Conectar antes de Corregir": un abrazo de 10 segundos antes de cualquier instrucción.'
        }
    },
    DIALOGANTE: {
        Tranquilo: {
            level: 'Alto',
            keys: ['Comunicación fluida y asertiva.', 'Relación basada en la confianza lógica.', 'Ambiente de aprendizaje mutuo.'],
            advice: 'Disfrutad de la palabra, pero aterrizadla. Asegúrate de que tanto diálogo no retrase las rutinas básicas necesarias (sueño, comidas).'
        },
        Intenso: {
            level: 'A mejorar',
            keys: ['La "Negociación Eterna": pérdida de autoridad por exceso de palabra.', 'El niño se agota con explicaciones largas en pleno desborde.', 'Inconsistencia percibida en los límites.'],
            advice: 'Con él, "menos es más". En plena rabieta o conflicto, no dialogues; actúa con presencia física y silencio. El diálogo se reserva para cuando haya calma total.'
        },
        Sensible: {
            level: 'Alto',
            keys: ['Sintonía afectiva y validación constante.', 'Capacidad de poner palabras a emociones complejas.', 'Vínculo de gran profundidad.'],
            advice: 'Sois grandes aliados. Tu reto es el exceso de rumia: no os quedéis atrapados analizando el "por qué" de cada emoción; buscad soluciones prácticas juntos.'
        }
    },
    PROTECTOR: {
        Tranquilo: {
            level: 'Medio',
            keys: ['Vínculo cálido pero de alta dependencia.', 'Riesgo de infantilización sistemática.', 'Dificultad del niño para enfrentar retos solo.'],
            advice: 'Le cuidas con excelencia, pero le estás quitando sus "músculos" de autonomía. Déjale fallar en cosas pequeñas para que aprenda que puede sobrevivir al error.'
        },
        Intenso: {
            level: 'A mejorar',
            keys: ['Reactividad parental por miedo al conflicto.', 'El niño empuja más fuerte para sentir el límite.', 'Sobre-servicio que genera tiranía infantil.'],
            advice: 'Su intensidad te asusta y eso te hace ceder. El niño necesita que seas un muro firme, no una almohada blanda. Confía en su capacidad para frustrarse.'
        },
        Sensible: {
            level: 'Medio',
            keys: ['Contagio emocional (si él sufre, tú sufres más).', 'Dificultad para ser el "adulto regulador".', 'Refuerzo inadvertido de la vulnerabilidad.'],
            advice: 'Cuidado con el espejo: si él llora y tú te angustias, él siente que su emoción es peligrosa. Sé su ancla calmada, no su compañero de llanto.'
        }
    }
};

export const PARENT_TEST_DB = {
    dimensions: {
        reactividad: { name: 'Reactividad Emocional', low: 'Serenidad', high: 'Impulsividad' },
        firmeza: { name: 'Nivel de Firmeza', low: 'Flexibilidad', high: 'Determinación' },
        control: { name: 'Necesidad de Control', low: 'Soltura', high: 'Supervisión' },
        estilo: { name: 'Estilo Relacional', low: 'Dirección', high: 'Conexión' },
        reparacion: { name: 'Capacidad de Reparación', low: 'Dificultad', high: 'Apertura' }
    },
    questions: [
        { id: 1, dim: 'reactividad', text: 'Ante un ruido fuerte o desorden repentino, me siento tenso/a de inmediato.' },
        { id: 2, dim: 'firmeza', text: 'Me cuesta mantener un "no" si veo que mi hijo/a se pone muy triste.' },
        { id: 3, dim: 'control', text: 'Prefiero hacer yo las cosas para asegurar que salgan bien y rápido.' },
        { id: 4, dim: 'estilo', text: 'Busco entender qué siente mi hijo antes de decirle lo que ha hecho mal.' },
        { id: 5, dim: 'reparacion', text: 'Si pierdo los papeles, me resulta fácil pedir perdón y explicar por qué pasó.' },
        { id: 6, dim: 'reactividad', text: 'Respondo con un tono de voz elevado cuando me desobedecen repetidamente.' },
        { id: 7, dim: 'firmeza', text: 'Considero que las normas en casa son sagradas y deben cumplirse siempre.' },
        { id: 8, dim: 'control', text: 'Me genera ansiedad no saber exactamente qué está haciendo mi hijo en cada momento.' },
        { id: 9, dim: 'estilo', text: 'Doy instrucciones claras y directas sin dar demasiadas explicaciones.' },
        { id: 10, dim: 'reparacion', text: 'Me quedo rumiando el enfado mucho tiempo después de que el conflicto haya terminado.' },
        { id: 11, dim: 'reactividad', text: 'Soy capaz de respirar hondo y no gritar aunque la situación sea caótica.' },
        { id: 12, dim: 'firmeza', text: 'Cambio las reglas según mi estado de ánimo o el cansancio del día.' },
        { id: 13, dim: 'control', text: 'Dejo que mis hijos asuman riesgos aunque se equivoquen o tarden más.' },
        { id: 14, dim: 'estilo', text: 'Siento que mi prioridad es que mi hijo se sienta escuchado y validado.' },
        { id: 15, dim: 'reparacion', text: 'Busco un momento de calma para hablar de lo ocurrido tras una rabieta o discusión.' }
    ],
    profiles: {
        CALMADO: {
            title: 'Equilibrado y Sereno',
            desc: 'Tiendes a educar desde la calma y la observación. Eres el ancla de tu familia en momentos de tormenta.',
            strength: 'Generas una seguridad emocional inmensa.',
            risk: 'A veces puede faltar un extra de firmeza en los límites.',
            lever: 'La validación y la paciencia constante.'
        },
        FIRME: {
            title: 'Firme y Estructurado',
            desc: 'Para ti, el orden y los límites son la base de la seguridad. Tus hijos saben qué esperar de ti.',
            strength: 'Aportas claridad y estructura al desarrollo.',
            risk: 'Cuidado con silenciar la emoción por priorizar la norma.',
            lever: 'La predictibilidad y la autoridad sana.'
        },
        DIALOGANTE: {
            title: 'Conector y Dialogante',
            desc: 'Tu prioridad es el vínculo. Buscas el acuerdo y la comprensión profunda de cada situación.',
            strength: 'Fomentas una autoestima basada en el respeto mutuo.',
            risk: 'La negociación excesiva puede diluir tu liderazgo.',
            lever: 'La empatía y la escucha activa.'
        },
        PROTECTOR: {
            title: 'Protector y Nutricio',
            desc: 'Cuidas el bienestar emocional por encima de todo. Eres un refugio constante para tus hijos.',
            strength: 'Creas un vínculo de confianza irrompible.',
            risk: 'Puedes dificultar que desarrollen su propia autonomía.',
            lever: 'El apoyo incondicional y la cercanía.'
        }
    }
};

export const SITUATIONS = [
    { id: 'bebe_sueno', name: 'Sueño / Dormir', icon: '🌙', min_age: 0, max_age: 2, radarAreas: ['autonomia'], cards: [{ age: 'Bebé', phrase: 'Es hora de descansar, te acompaño.', steps: ['Mantén luz tenue.', 'Evita juegos activos.', 'Rutina de arrullo habitual.'], limit: 'Horario regular.', consequence: 'Cansancio acumulado.', repair: 'Mimos al despertar.' }] },
    { id: 'bebe_comida', name: 'Alimentación', icon: '🍼', min_age: 0, max_age: 2, radarAreas: ['autonomia'], cards: [{ age: 'Bebé', phrase: 'Prueba un poquito más, es bueno para ti.', steps: ['No fuerces.', 'Hazlo divertido.', 'Respeta su saciedad.'], limit: 'Nutrición básica.', consequence: 'Hambre posterior.', repair: 'Juego tras comer.' }] },
    { id: 'bebe_seguridad', name: 'Seguridad / Peligro', icon: '⚠️', min_age: 0, max_age: 2, radarAreas: ['respeto'], cards: [{ age: 'Bebé', phrase: '¡Cuidado! Eso duele. Ven aquí.', steps: ['Retira del peligro físicamente.', 'Explica "Pupa" con calma.', 'Ofrece alternativa segura.'], limit: 'Integridad física.', consequence: 'Riesgo de daño.', repair: 'Abrazo de consuelo.' }] },
    { id: 'rabietas', name: 'Rabieta / Pataleta', icon: '😤', min_age: 2, max_age: 6, radarAreas: ['autocontrol'], cards: [{ age: 'Infantil', phrase: 'Veo que estás muy enfadado y te acompaño.', steps: ['Mantén la calma física.', 'No intentes razonar en el pico.', 'Valida la emoción sin ceder.'], limit: 'No agresión.', consequence: 'Pausa en la actividad.', repair: 'Reconexión física.' }] },
    { id: 'negativismo', name: 'Negativismo ("No")', icon: '🙅', min_age: 2, max_age: 5, radarAreas: ['respeto', 'autonomia'], cards: [{ age: 'Infantil', phrase: 'Tú eliges: ¿calcetines rojos o azules?', steps: ['Ofrece opciones limitadas (A o B).', 'Evita preguntas cerradas.', 'Hazlo un juego.'], limit: 'Cumplimiento de la tarea.', consequence: 'Pérdida de autonomía.', repair: 'Elogio a la decisión.' }] },
    { id: 'compartir', name: 'No quiere compartir', icon: '🤝', min_age: 2, max_age: 6, radarAreas: ['social'], cards: [{ age: 'Infantil', phrase: 'Ahora lo tiene él, luego será tu turno.', steps: ['Usa temporizador.', 'No fuerces el préstamo inmediato.', 'Fomenta la generosidad progresiva.'], limit: 'Respeto al turno.', consequence: 'Retirada del juguete.', repair: 'Juego compartido guiado.' }] },
    { id: 'esfinteres', name: 'Accidentes de baño', icon: '🚽', min_age: 2, max_age: 4, radarAreas: ['autonomia'], cards: [{ age: 'Infantil', phrase: 'No pasa nada, vamos a limpiarlo juntos.', steps: ['No avergüences.', 'Limpia sin drama.', 'Recuerda ir al baño antes.'], limit: 'Higiene básica.', consequence: 'Incomodidad física.', repair: 'Refuerzo de éxito posterior.' }] },
    { id: 'comida_selectiva', name: 'Comer "Selectivo"', icon: '🥦', min_age: 2, max_age: 10, radarAreas: ['autonomia', 'respeto'], cards: [{ age: 'Infantil', phrase: 'En esta casa probamos las cosas nuevas.', steps: ['Regla de un mordisco.', 'No prepares menú alternativo.', 'Ambiente relajado.'], limit: 'Respeto al menú familiar.', consequence: 'No hay postre.', repair: 'Cocinar juntos mañana.' }] },
    { id: 'miedo_dormir', name: 'Miedo a la oscuridad', icon: '👻', min_age: 3, max_age: 8, radarAreas: ['autocontrol'], cards: [{ age: 'Infantil', phrase: 'Aquí estás seguro, mamá/papá vigilan.', steps: ['Luz quitamiedos.', 'Spray "anti-monstruos".', 'Validación del miedo.'], limit: 'Quedarse en su cama.', consequence: 'Falta de descanso.', repair: 'Cuento de valentía.' }] },
    { id: 'vestirse_solo', name: 'Lucha por vestirse', icon: '👕', min_age: 3, max_age: 7, radarAreas: ['autonomia'], cards: [{ age: 'Infantil', phrase: 'Sé que puedes hacerlo solo, ¡tú puedes!', steps: ['Ropa fácil de poner.', 'Dalo como un reto.', 'Ayuda mínima necesaria.'], limit: 'Puntualidad.', consequence: 'Llegar tarde (consecuencia natural).', repair: 'Celebración del logro.' }] },
    { id: 'deberes', name: 'Guerra de Deberes', icon: '📝', min_age: 6, max_age: 12, radarAreas: ['responsabilidad', 'esfuerzo'], cards: [{ age: 'Primaria', phrase: 'Es tu responsabilidad, yo estoy aquí si necesitas ayuda.', steps: ['Espacio sin distracciones.', 'Divide tareas grandes en pequeñas.', 'No hagas tú el trabajo.'], limit: 'Finalización de la tarea.', consequence: 'Menos tiempo de juego.', repair: 'Lectura juntos.' }] },
    { id: 'mentiras', name: 'Mentiras / Engaños', icon: '🤥', min_age: 4, max_age: 13, radarAreas: ['responsabilidad', 'respeto'], cards: [{ age: 'Infantil', phrase: 'Valoro la verdad más que el error.', steps: ['No acuses sin pruebas.', 'Explora el porqué del miedo.', 'Reafirma la confianza.'], limit: 'Sinceridad absoluta.', consequence: 'Pérdida momentánea de confianza.', repair: 'Acto de honestidad posterior.' }] },
    { id: 'pantallas_resistencia', name: 'Resistencia a pantallas', icon: '🎮', min_age: 3, max_age: 13, radarAreas: ['autocontrol', 'respeto'], cards: [{ age: 'Primaria', phrase: 'El tiempo de juego ha terminado. Apaga tú.', steps: ['Aviso 5 min antes.', 'Recogida activa.', 'Proponer alternativa física.'], limit: 'Horario estricto.', consequence: 'Menos tiempo mañana.', repair: 'Juego de mesa juntos.' }] },
    { id: 'adiccion_movil', name: 'Adicción al móvil', icon: '📵', min_age: 11, max_age: 18, radarAreas: ['autocontrol', 'responsabilidad'], cards: [{ age: 'Adolescente', phrase: 'Necesitamos desconectar para conectar de verdad.', steps: ['Zonas libres de pantallas.', 'Control parental pactado.', 'Ejemplo mutuo.'], limit: 'Desconexión nocturna.', consequence: 'Retirada del dispositivo.', repair: 'Excursión sin móviles.' }] },
    { id: 'aislamiento', name: 'Aislamiento / Silencio', icon: '🤐', min_age: 11, max_age: 18, radarAreas: ['social'], cards: [{ age: 'Adolescente', phrase: 'Respeto tu espacio, siempre estoy aquí.', steps: ['No fuerces la charla.', 'Intereses comunes mínimos.', 'Presencia no invasiva.'], limit: 'Comunicación mínima.', consequence: 'Desconexión familiar.', repair: 'Actividad que le guste.' }] },
    { id: 'mal_humor', name: 'Retraimiento / Humor', icon: '👺', min_age: 10, max_age: 18, radarAreas: ['respeto', 'autocontrol'], cards: [{ age: 'Adolescente', phrase: 'Entiendo que estés molesto, hablemos luego.', steps: ['No te lo lleves a lo personal.', 'Dale tiempo.', 'Frase corta y cariñosa.'], limit: 'Falta de respeto prohibida.', consequence: 'Sin privilegios sociales.', repair: 'Cena favorita.' }] },
    { id: 'futuro_ansiedad', name: 'Ansiedad por el futuro', icon: '🔮', min_age: 14, max_age: 18, radarAreas: ['esfuerzo', 'autocontrol'], cards: [{ age: 'Adolescente', phrase: 'Confía en tus talentos, el camino se hace paso a paso.', steps: ['Orientación constructiva.', 'No proyectes tus miedos.', 'Enfoque en el hoy.'], limit: 'Estudio/Trabajo.', consequence: 'Angustia paralizante.', repair: 'Paseo por la naturaleza.' }] }
];

export const TEMPERAMENTS = {
    'intenso': {
        name: 'Explorador / Intenso',
        icon: '🔥',
        desc: 'Alta energía, reacciones fuertes y mucha persistencia. Necesita límites muy claros con alta conexión.'
    },
    'sensible': {
        name: 'Sensible / Perceptivo',
        icon: '🌿',
        desc: 'Siente todo con mucha profundidad. Se abruma fácil. Necesita mucha validación y calma.'
    },
    'tranquilo': {
        name: 'Tranquilo / Adaptable',
        icon: '☀️',
        desc: 'Suele estar de buen humor y se ajusta bien a los cambios. El reto es no olvidarnos de sus necesidades.'
    },
    'observador': {
        name: 'Observador / Cuidadoso',
        icon: '🦉',
        desc: 'Necesita tiempo para los cambios. Observa mucho antes de actuar. Precisa paciencia y seguridad.'
    }
};

export const RADAR_AREAS = {
    'autocontrol': { name: 'Autocontrol', icon: '🧘', why: 'Impulsos, frustración, pausa y gestión de ira.' },
    'respeto': { name: 'Respeto y Obediencia', icon: '🤝', why: 'Seguir instrucciones, límites, normas y tono respetuoso.' },
    'autonomia': { name: 'Autonomía y Hábitos', icon: '🏠', why: 'Rutinas, autocuidado, orden y constancia diaria.' },
    'responsabilidad': { name: 'Responsabilidad', icon: '🎒', why: 'Cumplir compromisos, tareas y asumir consecuencias.' },
    'social': { name: 'Habilidades Sociales', icon: '👥', why: 'Empatía, cooperación, comunicación y conflictos.' },
    'esfuerzo': { name: 'Esfuerzo y Aprendizaje', icon: '📖', why: 'Atención, perseverancia, terminar tareas y actitud.' }
};



export const RADAR_INDICATORS = {
    '1-3': {
        autocontrol: 'Espera 10s con apoyo, se calma con abrazo.',
        respeto: 'Responde a su nombre, sigue instrucc. de 1 paso.',
        autonomia: 'Colabora en aseo/vestido, recoge 1 juguete.',
        responsabilidad: 'Tira pañal a basura, guarda 1 cosa.',
        social: 'Juego paralelo, turnos breves con guía.',
        esfuerzo: 'Atención 2-3 min, intenta encajar piezas.'
    },
    '4-6': {
        autocontrol: 'Pausa ante frustración, verbaliza enfado simple.',
        respeto: 'Obedece a la primera (mayoría veces), saluda.',
        autonomia: 'Se viste solo (fácil), aseo con supervisión.',
        responsabilidad: 'Mochila, pone mesa (simple), ropa sucia.',
        social: 'Comparte, juega con reglas, pide perdón.',
        esfuerzo: 'Termina tarea 10m, persiste si falla.'
    },
    '7-9': {
        autocontrol: 'Gestión de ira sin agresión, espera turnos largos.',
        respeto: 'No interrumpe, acepta corrección sin drama.',
        autonomia: 'Ducha sola, deberes (rutina), orden cuarto.',
        responsabilidad: 'Material escolar, tarea doméstica fija.',
        social: 'Resuelve conflicto verbal, empatía básica.',
        esfuerzo: 'Estudio 20m, prepara mochila sin ayuda.'
    },
    '10-13': {
        autocontrol: 'Desconexión pantallas, control impulsos verbales.',
        respeto: 'Argumenta sin faltar, cumple horarios.',
        autonomia: 'Rutina completa autónoma (mañana/noche).',
        responsabilidad: 'Agenda, deberes, compromisos cumplidos.',
        social: 'Asertividad (decir no), evita chismes.',
        esfuerzo: 'Planificación semanal, lectura constante.'
    },
    '14-18': {
        autocontrol: 'Calma bajo presión, gestión riesgos.',
        respeto: 'Relación madura autoridad, negocia bien.',
        autonomia: 'Vida adulta (trámites, $$), autogestión total.',
        responsabilidad: 'Cumple promesas, asume errores graves.',
        social: 'Liderazgo, cuidado de vínculos, redes sanas.',
        esfuerzo: 'Proyecto personal, constancia a largo plazo.'
    }
};

export const WEEKLY_PLAN_DB = {
    '1-3': {
        autocontrol: { obj: 'Esperar 15s antes de pedir algo', phrase: 'Cuenta hasta 15 conmigo...', consequence: 'Pausa del juego inmediata.', repair: 'Abrazo y volver a empezar.' },
        autonomia: { obj: 'Poner los zapatos en el armario', phrase: 'Zapatos a su casita.', consequence: 'No salimos hasta que estén.', repair: 'Lo hacemos juntos una vez.' }
    },
    '4-6': {
        autocontrol: { obj: 'Cuando me frustro, hago PAUSA 10s', phrase: 'Pausa. Respiro contigo. Luego lo intentas otra vez.', consequence: 'Si gritas, paramos el juego 2 min.', repair: 'Te abrazo y lo repetimos bien.' },
        respeto: { obj: 'Obedecer a la primera instrucción', phrase: 'Mírame, por favor. [Instrucción].', consequence: 'Pérdida de 5 min de postre/juego.', repair: 'Repetir la acción con alegría.' }
    },
    '7-9': {
        responsabilidad: { obj: 'Mochila lista antes de cenar', phrase: 'Primero mochila, luego juego.', consequence: 'Se reduce tiempo de pantalla 10 min.', repair: 'Hacerlo juntos hoy, mañana tú.' },
        esfuerzo: { obj: '20 min de estudio sin distracciones', phrase: 'Foco total por 20 min, luego descanso.', consequence: 'Se repite el tiempo de estudio.', repair: 'Revisión final conjunta.' }
    }
};

export const CHALLENGE_DB = {
    '0-2': {
        autocontrol: { title: "Esperar calmado", description: "Entrenar la paciencia básica en periodos de 10-20 segundos.", steps: ["Anticipa el momento: Antes de darle lo que quiere, dile suavemente 'Espera un poquito'.", "Mantén contacto visual: Cuenta hasta tres despacio con los dedos para que vea el paso del tiempo.", "Premia la calma: Dale el objeto inmediatamente y dile '¡Qué bien has esperado!' con una sonrisa."], icon: "⏳", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Si se impacienta mucho, empieza con solo 3 segundos y sube poco a poco." },
        responsabilidad: { title: "Ayudante de Limpieza", description: "Fomentar el hábito de recoger participando activamente.", steps: ["Prepara el entorno: Señala la caja de juguetes y di '¡Es hora de guardar!'.", "Guía la acción: Coge su mano suavemente, ayúdale a coger un juguete y soltarlo dentro de la caja.", "Celebra el trabajo: Choca esos cinco y dile '¡Gracias por ayudar a que la casa esté bonita!'."], icon: "🧸", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Usa una canción de limpieza para que identifique el momento como algo divertido." },
        respeto: { title: "Respuesta al Nombre", description: "Establecer la base de la comunicación y el respeto mutuo.", steps: ["Acércate físicamente: Ponte a su altura antes de llamarle para captar su atención total.", "Usa un tono alegre: Di su nombre con cariño y espera a que sus ojos se crucen con los tuyos.", "Valida el contacto: Cuando te mire, dale una pequeña caricia o un beso para reforzar esa conexión."], icon: "👀", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Evita llamarle gritando desde otra habitación; la cercanía es clave en esta etapa." },
        autonomia: { title: "Manitas Limpias", description: "Primeros pasos en la higiene personal independiente.", steps: ["Prepara el acceso: Pon un taburete seguro y abre el grifo con un hilo de agua tibia.", "Muestra la técnica: Ponle un poco de jabón y frota sus manos mientras cantas una canción corta.", "Fomenta el final: Deja que él intente secarse las manos solo con la toalla a su alcance."], icon: "🧼", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Convierte el agua en un aliado, no en una obligación, deja que juegue un poco con las burbujas." },
        social: { title: "Juego de Turnos", description: "Aprender que la interacción social requiere tiempos de espera.", steps: ["Inicia el intercambio: Siéntate frente a él con una pelota y ródala hacia sus manos.", "Pide con paciencia: Extiende tus manos y dile '¿Me la pasas ahora a papá/mamá?'.", "Refuerza el ciclo: Cuando te la devuelva, celebra efusivamente y repite el proceso enseguida."], icon: "⚽", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Empieza con un solo objeto para no crear distracciones en el flujo de la comunicación." },
        esfuerzo: { title: "Pequeño Constructor", description: "Desarrollar la tolerancia al reto físico y la frustración leve.", steps: ["Presenta el reto: Dale una pieza de encajable que ya conozca y otra un poco más difícil.", "Anima sin intervenir: Si falla, dile 'Prueba a girarlo un poco' en lugar de hacerlo tú.", "Reconoce el intento: Aunque no lo encaje perfecto, dile '¡Me gusta ver cómo lo intentas!'."], icon: "🧱", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "El objetivo no es que la pieza encaje, sino que lo intente durante un par de minutos." }
    },
    '3-5': {
        autocontrol: { title: "Pausa de Tortuga", description: "Técnica de autorregulación emocional ante la rabia o frustración.", steps: ["Identifica la señal: Cuando veas que empieza a tensarse, haz la señal de la tortuga (encogerse).", "Respira en equipo: Pon su mano en tu pecho y respirad hondo tres veces muy despacio.", "Verbaliza la calma: Dile 'Ya pasó, ahora podemos hablar sin gritar' y abrázale fuerte."], icon: "🐢", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Ensaya esta técnica cuando esté tranquilo para que sepa qué hacer cuando se enfade." },
        responsabilidad: { title: "Misión Mesa", description: "Asignar una tarea doméstica fija para fomentar el sentido de utilidad.", steps: ["Asigna el material: Dale solo los platos y vasos de plástico para que se sienta capaz.", "Guía el orden: Dile dónde va cada cosa con paciencia la primera vez.", "Agradece la contribución: Al terminar, dile 'Gracias a tu ayuda ya podemos cenar todos'."], icon: "🍽️", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "No corrijas si el plato está un poco torcido, valora el hecho de que lo ha puesto él." },
        respeto: { title: "Hola y Adiós", description: "Hábito social de cortesía y reconocimiento hacia los demás.", steps: ["Recordatorio suave: Antes de entrar a un sitio, recuérdale con un susurro: '¿Qué decimos al entrar?'.", "Modela la acción: Saluda tú primero con alegría y mirando a los ojos a la persona.", "Elogia el gesto: Cuando salude, dile después en privado 'Me ha encantado lo educado que has sido'."], icon: "👋", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Si le da vergüenza, permite que salude solo con la mano al principio; no fuerces el beso." },
        autonomia: { title: "Vestirse Solito", description: "Fomentar la confianza en sus capacidades motoras.", steps: ["Prepara el terreno: Deja la ropa estirada en el suelo en el orden correcto para ponerla.", "Establece el reto: Dile 'Voy a preparar el desayuno, ¡seguro que cuando vuelva ya tienes los pantalones!'.", "Felicita el logro: Celebra aunque la camiseta esté del revés; lo importante es que lo ha hecho solo."], icon: "👕", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Empieza con ropa de cintura elástica y sin botones complejos para evitar la frustración inicial." },
        social: { title: "Compartir Turno", description: "Entrenar la generosidad y el respeto por los tiempos de otros.", steps: ["Pon un límite claro: Usa un temporizador visual de 2 minutos para el juguete en disputa.", "Avisa del cambio: Dile 'Queda poco tiempo, prepárate para dárselo a tu amigo'.", "Refuerza la acción: Cuando entregue el juguete, dile '¡Qué generoso eres, así todos nos divertimos!'."], icon: "⏳", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "No compartas sus juguetes favoritos de dormir; empieza con cosas neutras." },
        esfuerzo: { title: "Terminar Tarea", description: "Hábito de finalización y constancia en actividades lúdicas.", steps: ["Elige un reto corto: Un puzzle de 10 piezas o un dibujo para colorear pequeño.", "Apoyo constante: Si quiere dejarlo, dile 'Solo dos piezas más y hacemos un descanso'.", "Marca el final: Cuando termine, haced un baile de la victoria para marcar el cierre de la tarea."], icon: "✅", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "Es mejor hacer tareas muy cortas que termine solo, que una larga que dependa de ti." }
    },
    '6-9': {
        autocontrol: { title: "Respuesta Pausada", description: "Controlar la impulsividad verbal ante las negativas.", steps: ["Señal de calma: Cuando no esté de acuerdo, enséñale a levantar la mano y esperar 3 segundos.", "Escucha activa: Dile 'Te escucho, pero dímelo sin gritar' y mantén tu tono bajo.", "Premia el tono: Si explica lo que siente con serenidad, dile 'Valoro mucho que me hables así'."], icon: "🛑", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Si tú mantienes el tono bajo, él bajará el suyo por imitación natural." },
        responsabilidad: { title: "Mochila Lista", description: "Autogestión del material escolar y organización personal.", steps: ["Checklist visual: Cread juntos una lista con las 4-5 cosas que debe llevar siempre.", "Momento nocturno: Establece que la mochila se revisa antes de cenar, nunca por la mañana.", "Supervisión final: Que él te enseñe que lleva todo; tú solo validas con el dedo en la lista."], icon: "🎒", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Si olvida algo menor, deja que experimente la consecuencia natural en el colegio." },
        respeto: { title: "Sin Interrupciones", description: "Respetar el espacio de comunicación de los adultos y hermanos.", steps: ["Señal de espera: Si estás hablando, pon tu mano en su hombro para indicar 'te he oído, espera'.", "Atención rápida: En cuanto termines tu frase, dale la palabra y agradécele haber esperado.", "Refuerzo positivo: Dile 'Me encanta que sepas esperar tu turno, ahora cuéntame todo'."], icon: "✋", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "No le hagas esperar demasiado al principio o perderá el incentivo de hacerlo." },
        autonomia: { title: "Ducha Autónoma", description: "Higiene personal completa sin necesidad de recordatorios constantes.", steps: ["Prepara el kit: Ten el jabón y la esponja a su altura y una toalla seca lista.", "Reloj de agua: Pon una canción de 5 minutos; el objetivo es terminar de ducharse antes de que acabe.", "Revisión de orden: Al salir, el reto es que la ropa sucia esté en su sitio y el baño seco."], icon: "🚿", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Hazle responsable también de dejar la alfombrilla del baño estirada al terminar." },
        social: { title: "Resolver Conflicto", description: "Uso de la comunicación asertiva en lugar de la queja o el llanto.", steps: ["Para la acción: Si hay conflicto, dile 'No puedo ayudarte si lloras, respira y hablemos'.", "Usa la frase: Enséñale a decir 'No me gusta que hagas eso' de forma clara y firme.", "Busca el pacto: Pregúntale '¿Qué solución se te ocurre para que los dos estéis bien?'."], icon: "🤝", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Actúa como mediador, no como juez; deja que ellos propongan la solución." },
        esfuerzo: { title: "Foco 20 Min", description: "Entrenar la atención sostenida en tareas académicas o creativas.", steps: ["Espacio Zen: Mesa vacía, solo lo necesario para la tarea, sin ruidos ni pantallas.", "Reloj de meta: Pon un temporizador de 20 minutos y dile 'A por ello, yo estoy cerca'.", "Descanso activo: Cuando pite el reloj, dadle 5 minutos de movimiento total antes de seguir."], icon: "🎯", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "Valora más que haya estado concentrado 20 minutos que la cantidad de deberes hechos." }
    },
    '10-13': {
        autocontrol: { title: "Desconexión Digital", description: "Gestión autónoma del tiempo de ocio con pantallas.", steps: ["Pacto previo: Acordad el tiempo antes de encender el dispositivo (ej: 45 min).", "Aviso de salida: Avísale 5 minutos antes y dile 'Sabes qué toca ahora, prepárate para cerrar'.", "Cumplimiento: Al apagar sin protestar, dile 'Confío plenamente en ti porque cumples lo que dices'."], icon: "📵", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Si apaga a la primera, podrías sumarle 5 minutos extra de 'bonus' para el fin de semana." },
        responsabilidad: { title: "Tarea Doméstica", description: "Asumir una carga real en el funcionamiento del hogar.", steps: ["Define el rol: Él es el 'Responsable del Reciclaje' o del 'Lavavajillas' toda la semana.", "Sin avisos: No le recuerdes su tarea; deja que vea por sí mismo cuándo hay que hacerlo.", "Reconocimiento social: En la cena, comenta 'Qué bien está la cocina gracias a [Nombre]'."], icon: "🏠", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "La tarea debe ser algo que aporte a todos, no solo limpiar su propio cuarto." },
        respeto: { title: "Tono Respetuoso", description: "Defender opiniones sin cruzar la línea de la mala educación.", steps: ["Escucha sin juicio: Deja que exponga su queja o desacuerdo sin interrumpirle.", "Marca el límite: Si usa un tono agresivo, dile 'Me interesa lo que dices, pero no cómo lo dices'.", "Reanuda en frío: Vuelve a la charla solo cuando el tono sea educado y asertivo."], icon: "⚖️", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Si tú pierdes las formas, pídele perdón; eso le enseñará más que cualquier sermón." },
        autonomia: { title: "Rutina Mañanera", description: "Independencia total en la preparación para el día escolar.", steps: ["Autogestión: Él pone su propia alarma y decide a qué hora levantarse para llegar a tiempo.", "Bloque de tareas: Debe desayunar, asearse y vestirse sin que tú le dirijas cada paso.", "Consecuencia natural: Si llega tarde un día, deja que viva esa vergüenza o sanción escolar."], icon: "⏰", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Resiste la tentación de ir detrás de él diciendo '¡que no llegas!'. Confía en el proceso." },
        social: { title: "Mensaje Asertivo", description: "Saber decir 'No' y mantener límites personales sanos.", steps: ["Ensaya la frase: Practicad el 'No me siento cómodo con esto' para situaciones sociales.", "Razón breve: Enséñale que no necesita dar mil explicaciones para decir que no.", "Valida su criterio: Dile 'Me hace sentir tranquilo saber que tienes criterio propio'."], icon: "🛡️", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Role-play situaciones de presión de grupo para que sepa qué palabras exactas usar." },
        esfuerzo: { title: "Estudio Planificado", description: "Organización de tareas académicas a medio plazo.", steps: ["Plan de tarde: Que anote sus tres objetivos del día antes de empezar a estudiar.", "Foco profundo: 45 minutos de trabajo sin móvil en la habitación, ni siquiera encima de la mesa.", "Auto-revisión: Que él mismo marque con un check lo logrado al final de la sesión."], icon: "📚", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "Ayúdale a visualizar la satisfacción de terminar la tarea antes de empezar el ocio." }
    },
    '14-18': {
        autocontrol: { title: "Calma bajo Presión", description: "Gestión de la ansiedad en picos de trabajo o conflictos sociales.", steps: ["Autodetector: Enséñale a identificar los síntomas físicos del estrés (pulso, sudor).", "Pausa racional: Realizar una actividad de 'reseteo' de 10 minutos (música, paseo).", "Acción enfocada: Atacar el problema de uno en uno, sin rumiar lo que no puede controlar."], icon: "🧊", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Pregúntale siempre: '¿Necesitas que te escuche o que busquemos una solución?'." },
        responsabilidad: { title: "Agenda Propia", description: "Gestión integral de compromisos y vida social/académica.", steps: ["Centralización: Uso de agenda física o digital para citas, exámenes y entregas.", "Revisión semanal: Los domingos 10 minutos para ver qué viene en la semana.", "Autonomía en el fallo: Si olvida algo, él debe llamar y dar la cara para solucionarlo."], icon: "📅", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "No le gestiones sus citas médicas o escolares; deja que él lleve el control." },
        respeto: { title: "Límite Respetuoso", description: "Convivencia basada en acuerdos mutuos y no en la imposición.", steps: ["Espacio de debate: Deja que proponga cambios en las normas de casa con argumentos.", "Aceptación pactada: Una vez acordado el límite, se cumple sin 'mala cara' añadida.", "Respeto al entorno: Mantener las zonas comunes según el estándar acordado por todos."], icon: "😐", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Trátale como a un adulto en formación: con exigencia pero con respeto absoluto." },
        autonomia: { title: "Vida Adulta", description: "Gestión de tareas de adulto para ganar independencia real.", steps: ["Gestión real: Encárgale que pida una cita oficial o gestione una compra compleja solo.", "Presupuesto: Dale una cantidad fija para algo concreto y deja que la gestione solo.", "Asunción de errores: Si el trámite sale mal, debe investigar cómo arreglarlo él."], icon: "🔑", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Confía en su capacidad para resolver problemas; no le salves al primer intento." },
        social: { title: "Redes Sanas", description: "Construcción de una reputación digital integra y saludable.", steps: ["Pausa del post: Esperar 1 minuto antes de responder a un comentario que le ha molestado.", "Cribe de perfiles: Revisar a quién sigue y qué contenido consume que le hace daño.", "Comunicación real: Fomentar que los temas importantes se hablen en persona, no por chat."], icon: "📱", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Hablad sobre el concepto de 'huella digital' y cómo lo que pone hoy afecta a su futuro." },
        esfuerzo: { title: "Proyecto Personal", description: "Dedicación constante a una meta elegida por él mismo.", steps: ["Meta SMART: Definir un objetivo concreto, medible y con fecha límite.", "Hábito diario: Dedicar al menos 15-30 minutos diarios a ese proyecto personal.", "Resiliencia: Seguir cuando el entusiasmo inicial desaparece y queda la disciplina."], icon: "🚀", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "El proyecto puede ser cualquier cosa: aprender un código, un deporte o un idioma." }
    }
};

export const LOGO_SVG = `
<svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gBlue" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#3B82F6"/></linearGradient>
    <linearGradient id="gOrange" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#EA580C"/><stop offset="100%" stop-color="#FB923C"/></linearGradient>
    <linearGradient id="gGreen" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#34D399"/></linearGradient>
  </defs>
  <!-- Icon Group -->
  <g transform="translate(10, 10)">
    <!-- Hand (Orange) -->
    <path d="M 20 70 Q 30 90 60 80 L 70 75 Q 50 100 20 70 Z" fill="url(#gOrange)" stroke="none" />
    <path d="M 20 70 C 20 70, 45 95, 75 75 C 75 75, 55 105, 20 70" fill="url(#gOrange)" />
    <!-- Wing (Blue) -->
    <path d="M 25 20 Q 5 40 20 65 L 28 60 Q 15 40 25 20 Z" fill="url(#gBlue)" />
    <path d="M 25 20 C 25 20, 0 45, 28 62 L 35 55 C 35 55, 15 40, 25 20" fill="url(#gBlue)" />
    <!-- Arrow (Green) Upward -->
    <path d="M 45 55 L 60 25 L 75 55 L 60 60 L 45 55 Z" fill="url(#gGreen)" />
  </g>
  <!-- Text -->
  <text x="110" y="80" font-family="'Outfit', sans-serif" font-weight="900" font-size="65" fill="white" letter-spacing="2">PIVOT</text>
</svg>`;

export const RESOURCES_DB = [
    {
        id: 'r1',
        type: 'Libro',
        title: 'El cerebro del niño',
        author: 'Daniel J. Siegel',
        meta: '250 páginas',
        cover: 'https://m.media-amazon.com/images/I/81+f8mI4tFL.jpg',
        description: 'Una guía revolucionaria para entender cómo se desarrolla la mente de tu hijo y cómo convertir los conflictos diarios en oportunidades para integrar su cerebro.',
        parentStyles: ['FIRME', 'CALMADO', 'PROTECTOR'],
        ageGroups: ['bebe', 'infantil', 'primaria'],
        focusAreas: ['vínculo y apego', 'neurociencia', 'límites con amor'],
        intensity: 'profundización',
        values: 'educativo',
        buyUrl: 'https://www.amazon.es/cerebro-del-ni%C3%B1o-revolucionaria-desarrollar/dp/8492716447',
        aspects: 'Integración emocional, gestión de berrinches desde la biología, desarrollo de la resiliencia.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Te ayuda a entender la biología detrás de sus desbordes para que tu firmeza sea más empática.'
    },
    {
        id: 'b2',
        type: 'Libro',
        title: 'Bésame mucho',
        author: 'Carlos González',
        meta: '300 páginas',
        cover: 'https://m.media-amazon.com/images/I/71Y7X6c5zEL.jpg',
        description: 'Una obra fundamental que defiende la crianza basada en el amor, el respeto y la libertad frente a los métodos de adiestramiento rígidos.',
        parentStyles: ['PROTECTOR', 'DIALOGANTE', 'CALMADO'],
        ageGroups: ['bebe', 'infantil'],
        focusAreas: ['vínculo y apego', 'autonomía', 'amor'],
        intensity: 'introductorio',
        values: 'familiar',
        buyUrl: 'https://www.amazon.es/B%C3%A9same-mucho-Carlos-Gonz%C3%A1lez/dp/8484605151',
        aspects: 'Lactancia, sueño respetuoso, necesidades afectivas básicas, psicología infantil.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Una defensa del amor y el respeto en la crianza de los más pequeños.'
    },
    {
        id: 'b3',
        type: 'Libro',
        title: 'Cómo hablar para que escuchen',
        author: 'Adele Faber y Elaine Mazlish',
        meta: '280 páginas',
        cover: 'https://m.media-amazon.com/images/I/71lM6X2L9xL.jpg',
        description: 'El método definitivo para resolver los conflictos diarios de comunicación con tus hijos, basado en el respeto mutuo y la escucha activa.',
        parentStyles: ['DIALOGANTE', 'FIRME', 'CALMADO'],
        ageGroups: ['infantil', 'primaria', 'adolescente'],
        focusAreas: ['comunicación', 'límites con amor', 'autonomía'],
        intensity: 'profundización',
        values: 'educativo',
        buyUrl: 'https://www.amazon.es/hablar-hijos-para-que-escuchen/dp/849244465X',
        aspects: 'Resolución de conflictos, alternativas al castigo, fomento de la cooperación.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Herramientas prácticas para mejorar la comunicación diaria.'
    },
    {
        id: 'b4',
        type: 'Libro',
        title: 'Educar en el asombro',
        author: 'Catherine L\'Ecuyer',
        meta: '220 páginas',
        cover: 'https://m.media-amazon.com/images/I/71wYpInLInL.jpg',
        description: 'Un manifiesto por una educación que respete la naturaleza del niño, sus ritmos y su capacidad innata de asombrarse ante el mundo.',
        parentStyles: ['CALMADO', 'PROTECTOR', 'DIALOGANTE'],
        ageGroups: ['bebe', 'infantil', 'primaria'],
        focusAreas: ['autonomía', 'educación del carácter', 'ritmo'],
        intensity: 'profundización',
        values: 'cristiano',
        buyUrl: 'https://www.amazon.es/Educar-asombro-Catherine-LEcuyer/dp/84 Plataforma/dp/841511585X',
        aspects: 'Gestión del tiempo, sobreestimulación, atención, valores familiares profundos.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Cómo cultivar la curiosidad innata respetando los ritmos naturales.'
    },
    {
        id: 'b5',
        type: 'Libro',
        title: 'Tormenta de cerebros',
        author: 'Daniel J. Siegel',
        meta: '350 páginas',
        cover: 'https://m.media-amazon.com/images/I/81xU+1iF92L.jpg',
        description: 'El Dr. Siegel desmitifica la adolescencia como una etapa de "problemas" para revelarla como una etapa vital de crecimiento y pasión.',
        parentStyles: ['FIRME', 'CALMADO', 'DIALOGANTE'],
        ageGroups: ['adolescente'],
        focusAreas: ['vínculo y apego', 'neurociencia', 'adolescencia'],
        intensity: 'profundización',
        values: 'educativo',
        buyUrl: 'https://www.amazon.es/Tormenta-cerebros-poder-adolescencia-ALBA/dp/8484289837',
        aspects: 'Cambios cerebrales, impulsividad, conexión emocional profunda, identidad.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Entiende qué pasa en el cerebro adolescente para reconectar con ellos.'
    },
    {
        id: 'b6',
        type: 'Libro',
        title: 'Disciplina sin lágrimas',
        author: 'Daniel J. Siegel y Tina Payne Bryson',
        meta: '260 páginas',
        cover: 'https://m.media-amazon.com/images/I/81XmC8+UenL.jpg',
        description: 'Enfoque práctico de la disciplina que fomenta el desarrollo cerebral y fortalece el vínculo afectivo entre padres e hijos.',
        parentStyles: ['FIRME', 'CALMADO', 'DIALOGANTE'],
        ageGroups: ['bebe', 'infantil', 'primaria'],
        focusAreas: ['límites con amor', 'vínculo y apego', 'autocontrol'],
        intensity: 'introductorio',
        values: 'educativo',
        buyUrl: 'https://www.amazon.es/Disciplina-sin-l%C3%A1grimas-desarrollo-fortalecer/dp/8415594391',
        aspects: 'Calmar la rabieta, redirigir la conducta, conexión antes de corrección.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Disciplina que educa y conecta en lugar de solo castigar.'
    },
    {
        id: 'b7',
        type: 'Libro',
        title: 'Los 5 lenguajes del amor de los niños',
        author: 'Gary Chapman y Ross Campbell',
        meta: '210 páginas',
        cover: 'https://m.media-amazon.com/images/I/81uE5Zk-g7L.jpg',
        description: 'Descubre cómo tu hijo percibe el amor para que tus muestras de afecto lleguen realmente a su corazón.',
        parentStyles: ['FIRME', 'PROTECTOR', 'CALMADO', 'DIALOGANTE'],
        ageGroups: ['infantil', 'primaria', 'adolescente'],
        focusAreas: ['vínculo y apego', 'educación del carácter', 'amor'],
        intensity: 'introductorio',
        values: 'cristiano',
        buyUrl: 'https://www.amazon.es/Los-lenguajes-del-amor-ni%C3%B1os/dp/0829768222',
        aspects: 'Tanque emocional, formas de afecto, identidad, seguridad familiar.',
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Aprende a amar a tu hijo en el lenguaje que él mejor entiende.'
    },
    {
        id: 'v1',
        type: 'Vídeo',
        title: 'Berrinches: cómo manejarlos',
        author: 'Enfoque a la Familia',
        meta: '20 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=_9oxE9_YozU',
        focus: ['rabietas', 'calma'],
        ageGroups: ['bebe', 'infantil'],
        parentStyles: ['CALMADO', 'FIRME', 'PROTECTOR'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Manejo de desbordes sin perder la calma.'
    },
    {
        id: 'v2',
        type: 'Vídeo',
        title: 'Límites y disciplina',
        author: 'Enfoque a la Familia',
        meta: '15 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=hLgZgtu3Tvg',
        focus: ['equilibrio', 'amor', 'firmeza'],
        ageGroups: ['infantil', 'primaria'],
        parentStyles: ['FIRME', 'DIALOGANTE'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Encuentra el equilibrio justo entre afecto y límites claros.'
    },
    {
        id: 'v3',
        type: 'Vídeo',
        title: 'Disciplina inteligente',
        author: 'Estrategias Prácticas',
        meta: '12 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=UzZuW_qtrg0',
        focus: ['berrinches', 'disciplina'],
        ageGroups: ['bebe', 'infantil'],
        parentStyles: ['FIRME', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Cómo controlar las rabietas con inteligencia emocional.'
    },
    {
        id: 'v4',
        type: 'Vídeo',
        title: 'Cómo corregir a tus hijos',
        author: 'Sixto Porras',
        meta: '18 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=nARyRXTdP7Y',
        focus: ['correccion', 'vinculo'],
        ageGroups: ['infantil', 'primaria', 'adolescente'],
        parentStyles: ['DIALOGANTE', 'PROTECTOR', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Corregir el comportamiento sin dañar la relación.'
    },
    {
        id: 'v5',
        type: 'Vídeo',
        title: 'Poner límites: 5 técnicas',
        author: 'Guía Práctica',
        meta: '11 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=PnUvaBqavvI',
        focus: ['tecnicas', 'limites'],
        ageGroups: ['infantil', 'primaria'],
        parentStyles: ['FIRME', 'PROTECTOR'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Técnicas aplicables de inmediato para establecer estructura.'
    },
    {
        id: 'v6',
        type: 'Vídeo',
        title: 'Faltas de respeto: 5 pasos',
        author: 'Gestión Conductual',
        meta: '14 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=RkrV0-wfMkc',
        focus: ['respeto', 'pasos'],
        ageGroups: ['primaria', 'adolescente'],
        parentStyles: ['FIRME', 'DIALOGANTE'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Cómo reaccionar ante la mala educación de forma constructiva.'
    },
    {
        id: 'v7',
        type: 'Vídeo',
        title: 'Educar niños fuertes',
        author: 'Autoestima y Fortaleza',
        meta: '16 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=D0q_MR2z1UE',
        focus: ['autoestima', 'fortaleza'],
        ageGroups: ['infantil', 'primaria', 'adolescente'],
        parentStyles: ['PROTECTOR', 'DIALOGANTE', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Fomenta la seguridad infantil y la resiliencia emocional.'
    },
    {
        id: 'v8',
        type: 'Vídeo',
        title: '5 claves para el adolescente',
        author: 'Comunicación y Límites',
        meta: '22 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=9hGQ3P8ZcLQ',
        focus: ['adolescencia', 'comunicacion'],
        ageGroups: ['adolescente'],
        parentStyles: ['FIRME', 'DIALOGANTE', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Mantén el puente de diálogo abierto en la etapa más crítica.'
    },
    {
        id: 'v9',
        type: 'Vídeo',
        title: 'Afecto y respaldo adolescente',
        author: 'Vínculo Familiar',
        meta: '15 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=J70MjiF8A7E',
        focus: ['afecto', 'vinculo'],
        ageGroups: ['adolescente'],
        parentStyles: ['PROTECTOR', 'DIALOGANTE', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Por qué tu apoyo es más importante que nunca en la adolescencia.'
    },
    {
        id: 'v10',
        type: 'Vídeo',
        title: 'Rebeldía: qué hacer',
        author: 'Manejo de Desafío',
        meta: '19 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=aUrWSHBrvbg',
        focus: ['desafio', 'respeto'],
        ageGroups: ['primaria', 'adolescente'],
        parentStyles: ['FIRME', 'DIALOGANTE'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Cómo gestionar la rebeldía sin escalar el conflicto familiar.'
    },
    {
        id: 'v11',
        type: 'Vídeo',
        title: 'Redes sociales y cerebro',
        author: 'Neurociencia y Hábitos',
        meta: '13 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=Pmxn6Vj3_PI',
        focus: ['pantallas', 'habitos'],
        ageGroups: ['primaria', 'adolescente'],
        parentStyles: ['FIRME', 'DIALOGANTE', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Impacto de la tecnología en el desarrollo y cómo poner límites sanos.'
    },
    {
        id: 'v12',
        type: 'Vídeo',
        title: 'Aumenta su confianza',
        author: 'Autonomía Progresiva',
        meta: '11 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=sDRsevIQqWI',
        focus: ['confianza', 'autonomia'],
        ageGroups: ['infantil', 'primaria'],
        parentStyles: ['PROTECTOR', 'DIALOGANTE', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Pasos para que tu hijo gane seguridad en sus propias capacidades.'
    },
    {
        id: 'v13',
        type: 'Vídeo',
        title: 'El error #1 de los padres',
        author: 'Coherencia Familiar',
        meta: '17 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=etL0aBQLVOs',
        focus: ['coherencia', 'presencia'],
        ageGroups: ['bebe', 'infantil', 'primaria', 'adolescente'],
        parentStyles: ['CALMADO', 'FIRME', 'DIALOGANTE', 'PROTECTOR'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Un punto de inflexión para mejorar tu enfoque educativo hoy mismo.'
    },
    {
        id: 'v14',
        type: 'Vídeo',
        title: 'Niños mentalmente fuertes',
        author: 'Resiliencia y Carácter',
        meta: '14 min',
        icon: '🎥',
        url: 'https://www.youtube.com/watch?v=NHmj5SQlZjA',
        focus: ['resiliencia', 'frustracion'],
        ageGroups: ['infantil', 'primaria', 'adolescente'],
        parentStyles: ['FIRME', 'DIALOGANTE', 'CALMADO'],
        status: 'verified',
        lastChecked: '2026-02-09',
        why: 'Cómo criar hijos capaces de superar la adversidad con carácter.'
    }
];

// BIBLIOTECA EXPERTA PIVOT (Fuentes de Verdad)
export const EXPERT_BOOKS_DB = [
    // DESARROLLO EMOCIONAL Y DISCIPLINA
    { id: 'lib_01', type: 'Libro', title: 'El cerebro del niño', author: 'Daniel J. Siegel & Tina Payne Bryson', focus: 'Neuroeducación', core: 'Integración cerebral y vínculo.' },
    { id: 'lib_02', type: 'Libro', title: 'Disciplina sin lágrimas', author: 'Daniel J. Siegel & Tina Payne Bryson', focus: 'Disciplina', core: 'Conectar antes de corregir.' },
    { id: 'lib_03', type: 'Libro', title: 'La inteligencia emocional de los niños', author: 'John Gottman', focus: 'Emociones', core: 'Coaching emocional y validación.' },
    { id: 'lib_04', type: 'Libro', title: 'El niño explosivo', author: 'Ross W. Greene', focus: 'Conflictos', core: 'Resolución colaborativa y proactiva.' },
    { id: 'lib_05', type: 'Libro', title: 'Cómo hablar para que sus hijos escuchen', author: 'Adele Faber & Elaine Mazlish', focus: 'Comunicación', core: 'Habilidades prácticas de escucha y habla.' },
    { id: 'lib_06', type: 'Libro', title: 'Disciplina positiva', author: 'Jane Nelsen', focus: 'Disciplina', core: 'Firmeza y respeto simultáneos.' },

    // APEGO Y VÍNCULO
    { id: 'lib_07', type: 'Libro', title: 'Apego y pérdida', author: 'John Bowlby', focus: 'Apego', core: 'Teoría científica del vínculo seguro.' },
    { id: 'lib_08', type: 'Libro', title: 'No me sueltes', author: 'Gordon Neufeld', focus: 'Vínculo', core: 'Recuperar la jerarquía natural del apego.' },

    // PANTALLAS Y TECNOLOGÍA
    { id: 'lib_09', type: 'Libro', title: 'Educar en el asombro', author: 'Catherine L’Ecuyer', focus: 'Atención', core: 'Protección contra la hiperestimulación.' },
    { id: 'lib_10', type: 'Libro', title: 'La fábrica de cretinos digitales', author: 'Michel Desmurget', focus: 'Pantallas', core: 'Impacto cognitivo de la tecnología.' },
    { id: 'lib_11', type: 'Libro', title: 'La generación ansiosa', author: 'Jonathan Haidt', focus: 'Adolescencia', core: 'Redes sociales y salud mental.' },

    // VALORES Y VISIÓN CRISTIANA
    { id: 'lib_12', type: 'Libro', title: 'Los 5 lenguajes del amor de los niños', author: 'Gary Chapman', focus: 'Amor', core: 'Cómo percibe el afecto cada niño.' },
    { id: 'lib_13', type: 'Libro', title: 'Paternidad', author: 'Paul David Tripp', focus: 'Valores', core: 'Educación centrada en el corazón.' },
    { id: 'lib_14', type: 'Libro', title: 'Cómo educar a tus hijos', author: 'James Stenson', focus: 'Carácter', core: 'Liderazgo parental y virtudes.' },
    { id: 'lib_15', type: 'Libro', title: 'Educar con sentido común', author: 'José Pedro Manglano', focus: 'Sentido Común', core: 'Pautas sencillas y profundas.' },
    { id: 'lib_16', type: 'Libro', title: 'Formación del carácter', author: 'Francisco Cardona', focus: 'Virtudes', core: 'Hábitos y voluntad.' },

    // AUTONOMÍA Y CARÁCTER
    { id: 'lib_17', type: 'Libro', title: 'La mente absorbente del niño', author: 'Maria Montessori', focus: 'Autonomía', core: 'Respeto al potencial natural del niño.' },
    { id: 'lib_18', type: 'Libro', title: 'Mindset', author: 'Carol Dweck', focus: 'Mentalidad', core: 'Elogio del esfuerzo frente al talento.' },
    { id: 'lib_19', type: 'Libro', title: 'Bésame mucho', author: 'Carlos González', focus: 'Cercanía', core: 'Respeto a las necesidades biológicas.' },
    { id: 'lib_20', type: 'Libro', title: 'Tormenta cerebral', author: 'Daniel Siegel', focus: 'Adolescencia', core: 'Neurobiología de la etapa adolescente.' }
];

export const IDEAS_DB = {
    MOMENTS: {
        MAÑANA: { hours: [6, 7, 8, 9, 10, 11], label: 'Mañana activa' },
        MEDIODIA: { hours: [12, 13, 14, 15], label: 'Sobremesa' },
        TARDE: { hours: [16, 17, 18, 19], label: 'Tarde de juegos' },
        TRANSICION: { hours: [20, 21], label: 'Rumbo al descanso' },
        NOCHE: { hours: [22, 23, 0, 1, 2, 3, 4, 5], label: 'Noche' }
    },
    ACTIVITIES: [
        {
            id: 'game1',
            type: 'Juego',
            category: 'Habilidades Sociales',
            title: 'Chocar Cinco',
            desc: '¡Risas y conexión garantizadas! Descubrid juntos esta propuesta diseñada para fortalecer vuestro vínculo mientras os divertís en grande.',
            duration: 15,
            energy: 'Media',
            min_age: 3,
            max_age: 7,
            pillars: ['social', 'respeto'],
            adult_profiles: ['CALMADO', 'FIRME', 'DIALOGANTE'],
            image: 'assets/images/juego_familia.jpg'
        },
        {
            id: 'story1',
            type: 'Cuento',
            category: 'Imaginación',
            title: 'Un súper cuento...',
            desc: '¡Vuestra imaginación es el único límite! Cread juntos una historia única con personajes mágicos y aventuras que solo vosotros podéis imaginar.',
            duration: 10,
            energy: 'Baja',
            min_age: 3,
            max_age: 12,
            pillars: ['social', 'autocontrol'],
            adult_profiles: ['PROTECTOR', 'CALMADO', 'DIALOGANTE'],
            is_story: true,
            image: 'assets/images/cuento_familia.jpg'
        }
    ],
    VIRTUES: ['amor', 'perdón', 'servicio', 'generosidad', 'humildad', 'respeto', 'gratitud'],
    STORY_PROMPTS: {
        adventure: {
            intro: "¡Atención equipo! Los exploradores {names} acaban de descubrir un portal mágico hacia el Reino de {adventure_type}. La misión es clara: encontrar {item} antes de que se oculte el sol.",
            conflict: "De repente, un enorme {obstacle} bloqueó el camino. Para pasar, no servía la fuerza, hacía falta {virtue} y mucha astucia.",
            action: "{child_name} dio un paso al frente y dijo: '¡Yo sé cómo hacerlo!'. Recordó que lo más importante era {action_description}.",
            climax: "Fue emocionante ver cómo {names} trabajaban juntos. El {obstacle} se transformó en un camino de flores/estrellas/burbujas.",
            resolution: "¡Misión cumplida! Con el {item} en sus manos, regresaron a casa sintiéndose más fuertes y unidos que nunca. ¡Qué gran aventura!",
            closing: "Y así, en su propia cama, {names} supieron que los verdaderos héroes son los que aman y sirven a los demás. Fin de la transmisión."
        }
    }
};

export const FARO_DB = {
    '1-3': {
        neuro: "El cerebro de {name} está en la fase de 'Explosión Sináptica'. Su corteza prefrontal es muy inmadura, lo que le impide regular impulsos de forma autónoma. No es desobediencia, es incapacidad biológica.",
        psychology: "Se encuentra en la etapa de 'Autonomía frente a Vergüenza'. {pron.cap} necesita límites claros que le den seguridad mientras explora su voluntad naciente.",
        virtue: "La **Paciencia** y la **Confianza**. Estamos sembrando en {pron} la seguridad de que el mundo es un lugar bueno y que tú eres su puerto seguro.",
        upcoming: "Aparición del juego simbólico y mayor consciencia del 'yo' frente a los otros."
    },
    '4-6': {
        neuro: "Fase de 'Mielinización activa'. {name} está perfeccionando la conexión entre {art}s hemisferios de su cerebro. Sus emociones son intensas porque su amígdala reacciona rápido, pero su freno racional aún está en construcción.",
        psychology: "Etapa de 'Iniciativa'. Su curiosidad es su motor. Los límites deben proteger su seguridad sin apagar su deseo de descubrir.",
        virtue: "La **Obediencia por Amor** y el **Orden**. No obedece por miedo, sino porque confía en tu guía expert{end}.",
        upcoming: "Desarrollo de la empatía cognitiva: empezará a entender realmente cómo se sienten los demás."
    },
    '7-10': {
        neuro: "Gran desarrollo del cuerpo calloso. {name} empieza a tener una lógica más sólida y puede empezar a planificar. Es la 'edad de la razón' en términos de desarrollo cognitivo.",
        psychology: "Etapa de 'Laboriosidad'. Su autoestima se basa en sentirse capaz y útil. El refuerzo del esfuerzo es vital aquí.",
        virtue: "La **Fortaleza** y la **Sinceridad**. Aprender a esforzarse en lo pequeño y a valorar la verdad por encima del resultado.",
        upcoming: "Aparición del pensamiento abstracto y mayor influencia del grupo de iguales."
    },
    '11-13': {
        neuro: "Inicio de la 'Remodelación Cerebral' (Poda Sináptica). El cerebro de {name} está priorizando conexiones. Hay un desajuste temporal entre su sistema emocional (muy activo) y su sistema de control (en obras).",
        psychology: "Búsqueda de identidad temprana. {pron.cap} necesita sentir que su opinión cuenta mientras mantienes el marco de seguridad familiar.",
        virtue: "La **Templanza** y el **Respeto**. Aprender a dominar los impulsos nuevos y a valorar la autoridad desde la madurez.",
        upcoming: "Desarrollo del juicio crítico y mayor necesidad de intimidad emocional."
    },
    '14-18': {
        neuro: "Consolidación de la corteza prefrontal dorsal. {name} está terminando de construir su 'freno de mano' cerebral. Es la etapa de mayor plasticidad para valores éticos y sociales.",
        psychology: "Crisis de Identidad. {name} necesita diferenciarse para ser {pron} mism{end}. Tu papel pasa de 'director' a 'consultor de confianza'.",
        virtue: "La **Caridad** y el **Propósito**. Descubrir que su vida es un don para los demás y encontrar su sentido de misión en el mundo.",
        upcoming: "Autogestión total y transición a la vida adulta independiente."
    }
};

/**
 * PIVOT PROFESSIONAL DIAGNOSIS MATRIX (MICP)
 * Matriz maestra de 1 a 18 años para las 8 áreas del radar.
 * Cada pregunta es un "hecho observable" para garantizar la objetividad.
 */
export const DIAGNOSIS_MATRIX = {
    1: {
        autocontrol: { q: "¿Detiene su acción al menos un instante ante un 'no' firme?", target: 2.0 },
        responsabilidad: { q: "¿Colabora mínimamente al vestirle (estira brazos/piernas)?", target: 1.5 },
        respeto: { q: "¿Busca tu mirada para validar lo que hace (referencia social)?", target: 2.5 },
        autonomia: { q: "¿Intenta beber de un vaso solo o coger la cuchara?", target: 2.0 },
        emocional: { q: "¿Usa el contacto físico contigo para calmarse tras un susto?", target: 3.0 },
        social: { q: "¿Muestra interés por observar o acercarse a otros niños?", target: 2.5 },
        esfuerzo: { q: "¿Persiste en alcanzar un objeto difícil de coger?", target: 2.0 },
        reparacion: { q: "¿Se calma en pocos minutos al ser abrazado tras un llanto?", target: 3.0 }
    },
    2: {
        autocontrol: { q: "¿Es capaz de esperar unos segundos a que le des algo sin arrebatarlo?", target: 2.2 },
        responsabilidad: { q: "¿Ayuda a guardar un juguete si tú lo haces con él/ella?", target: 1.8 },
        respeto: { q: "¿A acepta dejar un objeto peligroso si se le da una alternativa?", target: 2.8 },
        autonomia: { q: "¿Intenta ponerse alguna prenda sencilla (calcetín, gorro) solo?", target: 2.5 },
        emocional: { q: "¿Es capaz de señalar lo que le duele o le molesta?", target: 3.2 },
        social: { q: "¿Comparte un juguete brevemente si tú se lo pides?", target: 2.8 },
        esfuerzo: { q: "¿Sigue intentando una tarea motriz después de un primer fallo?", target: 2.5 },
        reparacion: { q: "¿Busca tu afecto tras haber tenido una rabieta o enfado?", target: 3.5 }
    },
    3: {
        autocontrol: { q: "¿Cesa el llanto físico en menos de 5 min al ser acogido tras un 'no'?", target: 2.5 },
        responsabilidad: { q: "¿Lleva su pañal sucio o un papel al sitio indicado si se le pide?", target: 2.2 },
        respeto: { q: "¿Usa el nombre de los demás sin gritar para llamar la atención?", target: 3.0 },
        autonomia: { q: "¿Come solo la mayor parte del tiempo (aunque ensucie)?", target: 3.0 },
        emocional: { q: "¿Empieza a usar palabras como 'triste' o 'enfadado'?", target: 3.5 },
        social: { q: "¿Inicia interacciones sencillas con iguales (ofrece un juguete)?", target: 3.0 },
        esfuerzo: { q: "¿Intenta terminar un puzle sencillo aunque le cueste encajarlo?", target: 3.0 },
        reparacion: { q: "¿Acepta un beso o abrazo de reconciliación tras un conflicto?", target: 3.8 }
    },
    4: {
        autocontrol: { q: "¿Acepta un 'ahora no' sin entrar en bucle de repeticiones?", target: 2.8 },
        responsabilidad: { q: "¿Recoge sus juguetes al terminar si se le guía paso a paso?", target: 2.5 },
        respeto: { q: "¿Pide las cosas 'por favor' habitual u ocasionalmente?", target: 3.5 },
        autonomia: { q: "¿Se quita y pone los zapatos solo si no tienen cordones?", target: 3.5 },
        emocional: { q: "¿Sabe distinguir entre un dolor físico y un disgusto?", target: 3.8 },
        social: { q: "¿Es capaz de esperar un turno corto en un juego compartido?", target: 3.5 },
        esfuerzo: { q: "¿Termina una tarea sencilla (dibujo, construcción) que ha empezado?", target: 3.5 },
        reparacion: { q: "¿Pide perdón si se le indica que ha hecho daño a alguien?", target: 4.0 }
    },
    5: {
        autocontrol: { q: "¿Es capaz de frenar un juego físico intenso cuando se le indica?", target: 3.2 },
        responsabilidad: { q: "¿Coloca su ropa sucia en el cesto o sus zapatos en su sitio solo?", target: 3.0 },
        respeto: { q: "¿Escucha sin interrumpir sistemáticamente las frases de los adultos?", target: 3.8 },
        autonomia: { q: "¿Es capaz de vestirse solo (excepto botones o cordones difíciles)?", target: 4.0 },
        emocional: { q: "¿Explica la causa de su enfado con frases sencillas en frío?", target: 4.0 },
        social: { q: "¿Muestra empatía cuando ve a otro niño llorar o sufrir?", target: 3.8 },
        esfuerzo: { q: "¿Persiste en una actividad nueva que no le sale a la primera?", target: 3.8 },
        reparacion: { q: "¿Intenta 'arreglar' algo que ha roto o manchado sin esconderse?", target: 4.2 }
    },
    6: {
        autocontrol: { q: "¿Puede esperar a que todos estén en la mesa para empezar a comer?", target: 3.5 },
        responsabilidad: { q: "¿Prepara su mochila (metiendo el agua/merienda) con tu ayuda?", target: 3.2 },
        respeto: { q: "¿Acepta las normas de los juegos sin intentar hacer trampas siempre?", target: 4.0 },
        autonomia: { q: "¿Se asea o ducha con supervisión mínima pero siguiendo pasos?", target: 4.2 },
        emocional: { q: "¿Es capaz de calmarse solo usando alguna técnica (respirar, rincón)?", target: 4.2 },
        social: { q: "¿Mantiene amistades estables y juega en grupo sin conflictos graves?", target: 4.0 },
        esfuerzo: { q: "¿Se esfuerza por mejorar en algo que le cuesta (deporte, lectura)?", target: 4.0 },
        reparacion: { q: "¿Pide perdón por iniciativa propia si se da cuenta de un error?", target: 4.4 }
    },
    7: {
        autocontrol: { q: "¿Tolera perder en un juego sin enfados desproporcionados o llanto?", target: 3.8 },
        responsabilidad: { q: "¿Se encarga de una tarea fija en casa (poner la mesa, regar)?", target: 3.5 },
        respeto: { q: "¿Usa un tono de voz adecuado en lugares públicos sin que se le pida?", target: 4.2 },
        autonomia: { q: "¿Gestiona su tiempo de juego y deberes con solo un recordatorio?", target: 4.4 },
        emocional: { q: "¿Sabe pedir ayuda emocional cuando se siente desbordado?", target: 4.4 },
        social: { q: "¿Defiende a un compañero o hermano si ve una injusticia clara?", target: 4.2 },
        esfuerzo: { q: "¿Continúa una tarea aunque sea aburrida (p.ej. practicar caligrafía)?", target: 4.2 },
        reparacion: { q: "¿Busca una forma práctica de compensar a alguien tras un fallo?", target: 4.5 }
    },
    8: {
        autocontrol: { q: "¿Es capaz de dejar una pantalla al primer aviso sin hostilidad?", target: 4.0 },
        responsabilidad: { q: "¿Se acuerda de sus deberes o materiales sin que se le recuerde?", target: 3.8 },
        respeto: { q: "¿Muestra respeto por las pertenencias de otros (pide permiso)?", target: 4.4 },
        autonomia: { q: "¿Es autónomo en el estudio/deberes la mayor parte del tiempo?", target: 4.5 },
        emocional: { q: "¿Identifica emociones complejas como el agobio o la envidia?", target: 4.5 },
        social: { q: "¿Es capaz de colaborar en equipo por un objetivo común?", target: 4.4 },
        esfuerzo: { q: "¿Acepta críticas constructivas sobre su trabajo sin desanimarse?", target: 4.4 },
        reparacion: { q: "¿Reconoce su parte de culpa en una discusión aunque el otro también?", target: 4.6 }
    },
    9: {
        autocontrol: { q: "¿Controla sus impulsos físicos (manos, pies) en momentos de tensión?", target: 4.2 },
        responsabilidad: { q: "¿Gestiona bien su dinero (paga) o pequeños recursos propios?", target: 4.0 },
        respeto: { q: "¿Mantiene conductas cívicas (no tirar papeles, saludar) por hábito?", target: 4.5 },
        autonomia: { q: "¿Es capaz de prepararse algo sencillo de comer (un bocadillo)?", target: 4.6 },
        emocional: { q: "¿Puede expresar qué necesita de ti cuando se siente mal?", target: 4.6 },
        social: { q: "¿Resuelve conflictos con amigos mediante el diálogo habitual?", target: 4.5 },
        esfuerzo: { q: "¿Se pone metas propias (p.ej. aprender un truco) y las persigue?", target: 4.5 },
        reparacion: { q: "¿Se asegura de que el clima familiar sea bueno tras un conflicto?", target: 4.7 }
    },
    10: {
        autocontrol: { q: "¿Maneja la frustración de no conseguir lo que quiere con calma?", target: 4.4 },
        responsabilidad: { q: "¿Cuida de sus dispositivos o material valioso con conciencia?", target: 4.2 },
        respeto: { q: "¿Respeta la autoridad de otros adultos (profesores, abuelos)?", target: 4.6 },
        autonomia: { q: "¿Es capaz de ir solo a sitios cercanos (colegio, panadería)?", target: 4.7 },
        emocional: { q: "¿Muestra equilibrio entre sus necesidades y las de los demás?", target: 4.7 },
        social: { q: "¿Es capaz de decir 'no' a una mala propuesta de un amigo?", target: 4.6 },
        esfuerzo: { q: "¿Entiende el valor del sacrificio para conseguir algo a largo plazo?", target: 4.6 },
        reparacion: { q: "¿Tiene iniciativa para reconciliar a otros miembros de la familia?", target: 4.8 }
    },
    11: {
        autocontrol: { q: "¿Es capaz de autorregularse ante un comentario que no le gusta?", target: 4.5 },
        responsabilidad: { q: "¿Cumple con sus tareas de casa de forma sistemática y sin aviso?", target: 4.4 },
        respeto: { q: "¿Valora el tiempo y el esfuerzo que haces por él/ella de corazón?", target: 4.7 },
        autonomia: { q: "¿Planifica su semana de exámenes o retos con previsión?", target: 4.8 },
        emocional: { q: "¿Muestra una autoestima sólida, reconociendo errores y aciertos?", target: 4.8 },
        social: { q: "¿Se integra bien en distintos grupos sociales sin timidez extrema?", target: 4.7 },
        esfuerzo: { q: "¿Persiste en retos intelectuales o físicos de alta dificultad?", target: 4.7 },
        reparacion: { q: "¿Busca la paz familiar reconociendo su impacto en los demás?", target: 4.9 }
    },
    12: {
        autocontrol: { q: "¿Controla su reactividad (portazos, malas caras) en discusiones?", target: 4.6 },
        responsabilidad: { q: "¿Gestiona su propia higiene y orden de cuarto sin supervisión?", target: 4.5 },
        respeto: { q: "¿Entiende y respeta los momentos de descanso de los padres?", target: 4.8 },
        autonomia: { q: "¿Inicia actividades de ocio o aprendizaje de forma independiente?", target: 4.9 },
        emocional: { q: "¿Distinga entre lo que siente (emoción) y lo que debe hacer?", target: 4.9 },
        social: { q: "¿Elige amistades que le suman y le respetan de forma madura?", target: 4.8 },
        esfuerzo: { q: "¿Acepta el rigor necesario para alcanzar la excelencia en algo?", target: 4.8 },
        reparacion: { q: "¿Es capaz de pedir perdón de forma profunda y sincera?", target: 5.0 }
    },
    13: {
        autocontrol: { q: "¿Gestiona el uso de pantallas de forma ética y con autocontrol?", target: 4.7 },
        responsabilidad: { q: "¿Es consciente de su impacto económico en el hogar?", target: 4.6 },
        respeto: { q: "¿Argumenta sus opiniones sin usar la humillación o el desprecio?", target: 4.9 },
        autonomia: { q: "¿Es capaz de cuidar de un hermano menor o de una mascota solo?", target: 5.0 },
        emocional: { q: "¿Maneja la presión del grupo sin perder sus propios valores?", target: 5.0 },
        social: { q: "¿Muestra habilidades de liderazgo positivo en sus grupos?", target: 4.9 },
        esfuerzo: { q: "¿Trabaja por objetivos que no tienen una recompensa inmediata?", target: 4.9 },
        reparacion: { q: "¿Toma la iniciativa para sanar heridas tras un mal día familiar?", target: 5.0 }
    },
    14: {
        autocontrol: { q: "¿Es capaz de mantener la calma en entornos de alta provocación?", target: 4.8 },
        responsabilidad: { q: "¿Asume las consecuencias de sus actos sin culpar a otros?", target: 4.7 },
        respeto: { q: "¿Trata con igual dignidad a personas de cualquier condición?", target: 5.0 },
        autonomia: { q: "¿Gestiona sus trámites personales (médico, papeles) con guía?", target: 5.0 },
        emocional: { q: "¿Sabe procesar el fracaso sin que afecte a su valor personal?", target: 5.0 },
        social: { q: "¿Es un referente de confianza para sus amigos y familia?", target: 5.0 },
        esfuerzo: { q: "¿Busca la superación personal constante en sus talentos?", target: 5.0 },
        reparacion: { q: "¿Es un mediador de paz natural en los conflictos que presencia?", target: 5.0 }
    },
    15: {
        autocontrol: { q: "¿Domina sus impulsos y sabe esperar el momento oportuno para cada acción?", target: 4.9 },
        responsabilidad: { q: "¿Es un pilar de ayuda en la organización familiar?", target: 4.8 },
        respeto: { q: "¿Su lenguaje y trato reflejan una madurez humana profunda?", target: 5.0 },
        autonomia: { q: "¿Es capaz de viajar o moverse con total autonomía y seguridad?", target: 5.0 },
        emocional: { q: "¿Tiene un autoconocimiento profundo y sabe autorregularse solo?", target: 5.0 },
        social: { q: "¿Sus relaciones se basan en la entrega y el respeto mutuo?", target: 5.0 },
        esfuerzo: { q: "¿Entiende que el esfuerzo es la base de cualquier logro virtuoso?", target: 5.0 },
        reparacion: { q: "¿Pide perdón y repara incluso errores sutiles de trato?", target: 5.0 }
    },
    16: {
        autocontrol: { q: "¿Muestra un dominio de sí mismo propio de un adulto maduro?", target: 5.0 },
        responsabilidad: { q: "¿Es totalmente responsable de sus compromisos y palabras?", target: 4.9 },
        respeto: { q: "¿Es un ejemplo de cortesía y honor en su trato diario?", target: 5.0 },
        autonomia: { q: "¿Gestiona su vida personal con independencia y criterio sólido?", target: 5.0 },
        emocional: { q: "¿Es capaz de acompañar las emociones de otros con solidez?", target: 5.0 },
        social: { q: "¿Es un ciudadano consciente y comprometido con el bien común?", target: 5.0 },
        esfuerzo: { q: "¿Valora el trabajo bien hecho por encima de la comodidad?", target: 5.0 },
        reparacion: { q: "¿Es un motor activo de perdón y reconciliación familiar?", target: 5.0 }
    },
    17: {
        autocontrol: { q: "¿Refleja serenidad incluso en situaciones de estrés máximo?", target: 5.0 },
        responsabilidad: { q: "¿Su nivel de fiabilidad es absoluto ante cualquier encargo?", target: 5.0 },
        respeto: { q: "¿Vive el respeto como un valor sagrado hacia toda persona?", target: 5.0 },
        autonomia: { q: "¿Está listo para la independencia total con criterio moral?", target: 5.0 },
        emocional: { q: "¿Tiene una inteligencia emocional orientada al servicio?", target: 5.0 },
        social: { q: "¿Construye comunidades de bien allá donde va?", target: 5.0 },
        esfuerzo: { q: "¿Vive el esfuerzo con alegría por el propósito que le guía?", target: 5.0 },
        reparacion: { q: "¿Es capaz de perdonar de forma heroica y restaurar?", target: 5.0 }
    },
    18: {
        autocontrol: { q: "¿Es dueño de sus actos y emociones con maestría humana?", target: 5.0 },
        responsabilidad: { q: "¿Asume su papel en el mundo con total responsabilidad?", target: 5.0 },
        respeto: { q: "¿Su trato es exquisito y respeta la libertad de los demás?", target: 5.0 },
        autonomia: { q: "¿Es un adulto autónomo, con propósito y valores firmes?", target: 5.0 },
        emocional: { q: "¿Mantiene su paz interior y sabe dársela a los demás?", target: 5.0 },
        social: { q: "¿Es un líder humilde que trabaja por un mundo mejor?", target: 5.0 },
        esfuerzo: { q: "¿No teme al sacrificio si el bien lo requiere?", target: 5.0 },
        reparacion: { q: "¿Vive la caridad y el perdón como su ley de vida?", target: 5.0 }
    }
};
