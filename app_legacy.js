const SITUATIONS = [
  // Precise mapping using min/max age
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

const RADAR_AREAS = {
  'autocontrol': { name: 'Autocontrol', icon: '🧘', why: 'Impulsos, frustración, pausa y gestión de ira.' },
  'respeto': { name: 'Respeto y Obediencia', icon: '🤝', why: 'Seguir instrucciones, límites, normas y tono respetuoso.' },
  'autonomia': { name: 'Autonomía y Hábitos', icon: '🏠', why: 'Rutinas, autocuidado, orden y constancia diaria.' },
  'responsabilidad': { name: 'Responsabilidad', icon: '🎒', why: 'Cumplir compromisos, tareas y asumir consecuencias.' },
  'social': { name: 'Habilidades Sociales', icon: '👥', why: 'Empatía, cooperación, comunicación y conflictos.' },
  'esfuerzo': { name: 'Esfuerzo y Aprendizaje', icon: '📖', why: 'Atención, perseverancia, terminar tareas y actitud.' }
};

const RADAR_INDICATORS = {
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

function getAgeBracket(age) {
  if (age <= 3) return '1-3';
  if (age <= 6) return '4-6';
  if (age <= 9) return '7-9';
  if (age <= 12) return '10-12';
  if (age <= 15) return '13-15';
  return '16-18';
}

const VERSION = 12;
const savedStorage = JSON.parse(localStorage.getItem('pivot_state'));
const DEFAULT_STATE = {
  version: VERSION,
  isAuthenticated: false,
  parentProfile: { name: 'Papá/Mamá', temperament: 'Calmado' },
  children: [
    { id: '1', name: 'Mateo', age: 4, temperament: 'Intenso', radar: { autocontrol: 3, respeto: 2, autonomia: 3, responsabilidad: 2, social: 3, esfuerzo: 2 }, currentChallenge: null, weeklyFocus: ['autocontrol', 'respeto'] },
    { id: '2', name: 'Lucía', age: 16, temperament: 'Tranquilo', radar: { autocontrol: 4, respeto: 5, autonomia: 4, responsabilidad: 4, social: 5, esfuerzo: 4 }, currentChallenge: null, weeklyFocus: ['autonomia', 'social'] }
  ],
  currentChildId: '1',
  streak: 5,
  view: 'login'
};

const WEEKLY_PLAN_DB = {
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

function getWeeklyPlan(child) {
  if (!child || !child.weeklyFocus) return { obj: 'Define un enfoque...', phrase: 'Empecemos juntos.', consequence: 'Natural.', repair: 'Reconexión.' };
  const bracket = getAgeBracket(child.age);
  const area = child.weeklyFocus[0] || 'autocontrol';
  return (WEEKLY_PLAN_DB[bracket] && WEEKLY_PLAN_DB[bracket][area]) || { obj: 'Desarrollo de hábito...', phrase: 'Vamos a trabajar esto juntos.', consequence: 'Consecuencia natural.', repair: 'Reparación positiva.' };
}

const CHALLENGE_DB = {
  '0-2': {
    autocontrol: { title: "Esperar calmado", description: "Esperar 10-20s antes de coger algo con ayuda.", steps: ["Di 'espera' suave.", "Cuenta hasta 3.", "Entrégalo."], icon: "⏳", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Canta bajito mientras esperáis." },
    responsabilidad: { title: "Ayudante de Limpieza", description: "Guardar 2 juguetes en una caja con ayuda.", steps: ["Guía su mano.", "Hazlo juego.", "Celebra."], icon: "🧸", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Hazlo siempre al terminar de jugar." },
    respeto: { title: "Respuesta al Nombre", description: "Responder a su nombre mirando.", steps: ["Llámale alegre.", "Espera mirada.", "Haz cosquillas."], icon: "👀", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Ponte a su nivel de ojos." },
    autonomia: { title: "Manitas Limpias", description: "Lavarse manos con ayuda.", steps: ["Sube mangas.", "Jabón.", "Secar."], icon: "🧼", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Usa un escalón si no llega." },
    social: { title: "Juego de Turnos", description: "Pasar pelota (toma y dame).", steps: ["Siéntate cerca.", "Rueda pelota.", "Pídela de vuelta."], icon: "⚽", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Turnos muy cortos." },
    esfuerzo: { title: "Pequeño Constructor", description: "Intentar encajar piezas.", steps: ["Pon pocas piezas.", "Anima el intento.", "Ayuda final."], icon: "🧱", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "No lo hagas por él." }
  },
  '3-5': {
    autocontrol: { title: "Pausa de Tortuga", description: "Respirar 10s cuando se enfada.", steps: ["Señal de tortuga.", "Respirar juntos.", "Felicitar."], icon: "🐢", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Practica en frío." },
    responsabilidad: { title: "Misión Mesa", description: "Poner plato y vaso.", steps: ["Deja cosas a mano.", "Pide ayuda.", "Agradece."], icon: "🍽️", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Usa vajilla de plástico." },
    respeto: { title: "Hola y Adiós", description: "Saludar mirando a ojos.", steps: ["Recuerda antes.", "Modelalo tú.", "Sonríe."], icon: "👋", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "No fuerces contacto físico." },
    autonomia: { title: "Vestirse Solito", description: "Ponerse 2 prendas solo.", steps: ["Ropa fácil.", "Carrera reloj.", "No corregir."], icon: "👕", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Hazlo en fin de semana." },
    social: { title: "Compartir Turno", description: "Prestar juguete 1 min.", steps: ["Usa reloj.", "Avisa fin.", "Elogia."], icon: "⏳", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Empieza con juguetes no favoritos." },
    esfuerzo: { title: "Terminar Tarea", description: "No cambiar hasta acabar.", steps: ["Tarea corta.", "Anima final.", "Celebra."], icon: "✅", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "Si se cansa, haz pausa, no abandono." }
  },
  '6-9': {
    autocontrol: { title: "Respuesta Pausada", description: "Contar a 3 antes de gritar.", steps: ["Señal de Stop.", "Respira 3 veces.", "Habla suave."], icon: "🛑", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Valida su enfado, limita el grito." },
    responsabilidad: { title: "Mochila Lista", description: "Preparar mochila noche anterior.", steps: ["Checklist.", "Hora fija.", "Revisión."], icon: "🎒", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Deja que asuma olvidos pequeños." },
    respeto: { title: "Sin Interrupciones", description: "Esperar turno para hablar.", steps: ["Señal mano.", "Espera mirada.", "Habla."], icon: "✋", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Atiéndele rápido al principio." },
    autonomia: { title: "Ducha Autónoma", description: "Ducha completa solo.", steps: ["Prepara ropa.", "Reloj agua.", "Recoge baño."], icon: "🚿", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Revisa limpieza discretamente." },
    social: { title: "Resolver Conflicto", description: "Usar palabras, no manos.", steps: ["Para.", "Di 'No me gusta'.", "Pide acuerdo."], icon: "🤝", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Role-play en casa." },
    esfuerzo: { title: "Foco 20 Min", description: "Deberes sin distracciones.", steps: ["Mesa limpia.", "Reloj 20m.", "Descanso."], icon: "🎯", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "El descanso es sagrado." }
  },
  '10-13': {
    autocontrol: { title: "Desconexión Digital", description: "Dejar móvil sin pelea.", steps: ["Aviso 5m.", "Apaga.", "Zona común."], icon: "📵", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Hazlo tú también." },
    responsabilidad: { title: "Tarea Doméstica", description: "Encargado de basura/lavavajillas.", steps: ["Día fijo.", "Sin recordatorio.", "Avisa fin."], icon: "🏠", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Agradécelo sinceramente." },
    respeto: { title: "Tono Respetuoso", description: "Argumentar sin gritar.", steps: ["Escucha.", "Habla bajo.", "Pide pausa."], icon: "⚖️", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Si grita, para la charla." },
    autonomia: { title: "Rutina Mañanera", description: "Listo a tiempo solo.", steps: ["Alarma.", "Aseo/Desayuno.", "Salir."], icon: "⏰", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "La consecuencia es llegar tarde." },
    social: { title: "Mensaje Asertivo", description: "Decir NO sin agresión.", steps: ["Di No.", "Razón breve.", "Mantente."], icon: "🛡️", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Es su derecho negarse." },
    esfuerzo: { title: "Estudio Planificado", description: "Cumplir plan 45 min.", steps: ["Móvil fuera.", "Objetivo.", "Cumplir."], icon: "📚", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "Valora el proceso." }
  },
  '14-18': {
    autocontrol: { title: "Calma Presión", description: "Gestionar estrés examen/social.", steps: ["Identifica estrés.", "Pausa.", "Actúa."], icon: "🧊", gradient: "linear-gradient(135deg, #FAB005, #F03E3E)", tips: "Pregunta antes de aconsejar." },
    responsabilidad: { title: "Agenda Propia", description: "Gestionar sus compromisos.", steps: ["Anota.", "Revisa.", "Cumple."], icon: "📅", gradient: "linear-gradient(135deg, #3BC9DB, #228BE6)", tips: "Deja que falle y aprenda." },
    respeto: { title: "Límite Respetuoso", description: "Aceptar normas familia.", steps: ["Opina.", "Acepta.", "Sin caras."], icon: "😐", gradient: "linear-gradient(135deg, #7950F2, #BE4BDB)", tips: "Negocia en frío." },
    autonomia: { title: "Vida Adulta", description: "Trámite o gestión $$ solo.", steps: ["Investiga.", "Hazlo.", "Asume."], icon: "🔑", gradient: "linear-gradient(135deg, #40C057, #82C91E)", tips: "Confía en su criterio." },
    social: { title: "Redes Sanas", description: "No entrar en conflictos online.", steps: ["Piensa.", "Ignora.", "Bloquea."], icon: "📱", gradient: "linear-gradient(135deg, #FD7E14, #FF922B)", tips: "Hablemos de reputación." },
    esfuerzo: { title: "Proyecto Personal", description: "Constancia en meta propia.", steps: ["Meta.", "Acción.", "Revisión."], icon: "🚀", gradient: "linear-gradient(135deg, #FA5252, #E03131)", tips: "Apoya lo extraescolar." }
  }
};


function getOptimalChallenge(child) {
  return { id: 'radar_focus', title: 'Mejorar Autocontrol', concept: 'autocontrol' };
}


function getWeeklyChallenges(child) {
  // Determine Age Bracket
  let bracket = '0-2';
  if (child.age >= 3 && child.age <= 5) bracket = '3-5';
  else if (child.age >= 6 && child.age <= 9) bracket = '6-9';
  else if (child.age >= 10 && child.age <= 13) bracket = '10-13';
  else if (child.age >= 14) bracket = '14-18';

  const library = CHALLENGE_DB[bracket] || CHALLENGE_DB['3-5']; // Fallback

  // 1. Calculate Gaps
  const gaps = Object.keys(child.radar).map(key => {
    const target = getSmartTarget(child.age, key);
    const current = child.radar[key] || 1;
    return { key, gap: target - current, val: current };
  });

  // 2. Sort by biggest gap
  let candidates = gaps.filter(g => g.gap > 0).sort((a, b) => b.gap - a.gap);
  if (candidates.length === 0) candidates = gaps.sort((a, b) => b.val - a.val);

  // 3. Take Top 2
  return candidates.slice(0, 2).map(c => {
    const lib = library[c.key]; // Get specific challenge for this age/area

    // Create a stable ID for the week
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


// SMART TARGET LOGIC
function getSmartTarget(age, area) {
  // Base targets mapped by age ranges for key development areas
  // 1-5 Scale: 1 (Emerging) -> 5 (Mastered for age)
  const targets = {
    '0-3': { autonomia: 3.5, autocontrol: 3.0, social: 3.5, respeto: 3.0 },
    '4-6': { autonomia: 3.8, autocontrol: 3.5, responsabilidad: 3.2, respeto: 4.0 },
    '7-12': { responsabilidad: 4.2, esfuerzo: 4.0, social: 4.0, autonomia: 4.5 },
    '13-18': { responsabilidad: 4.8, autocontrol: 4.5, social: 4.5, esfuerzo: 4.5 }
  };

  let bracket = '0-3';
  if (age >= 4 && age <= 6) bracket = '4-6';
  else if (age >= 7 && age <= 12) bracket = '7-12';
  else if (age >= 13) bracket = '13-18';

  // Return specific target or generic fallback of 4.0
  return (targets[bracket] && targets[bracket][area]) || 4.0;
}


const LOGO_SVG = `
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

const RESOURCES = {
  'bebe': [
    { type: 'Libro', title: 'Dormir sin lágrimas', meta: 'Lectura de 5 min', icon: '📚' },
    { type: 'Sesión', title: 'Videoconsulta Sueño', meta: '30 min - Dra. Ramos', icon: '🎥' }
  ],
  'conducta': [
    { type: 'Artículo', title: 'El cerebro del niño', meta: 'Psicología infantil', icon: '📰' },
    { type: 'Libro', title: 'Educar en la caridad', meta: 'Valores cristianos', icon: '📚' },
    { type: 'Sesión', title: 'Coaching Disciplina', meta: 'Reserva 15 min', icon: '🎥' }
  ],
  'adolescencia': [
    { type: 'Libro', title: 'Generación Z', meta: 'Entendiendo a tu hijo', icon: '📚' },
    { type: 'Sesión', title: 'Mesa redonda: Tics', meta: 'Evento grabado', icon: '🎥' }
  ]
};

let state = savedStorage && savedStorage.version === VERSION ? savedStorage : DEFAULT_STATE;

// REQUISITO: Forzar login al refrescar/entrar de nuevo
state.isAuthenticated = false;
state.view = 'login';
function save() { localStorage.setItem('pivot_state', JSON.stringify(state)); }
function getChild() { return state.children.find(c => c.id === state.currentChildId) || state.children[0]; }

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (!state.isAuthenticated && state.view === 'login') {
    renderLogin(app);
    return;
  }

  // RENDER VIEWS
  if (state.view === 'home') renderHome(app);
  else if (state.view === 'selector') renderSelector(app);
  else if (state.view === 'card') renderCard(app, state.selectedSituation);
  else if (state.view === 'feedback') renderFeedback(app);
  else if (state.view === 'radar' || state.view === 'mastery') renderRadar(app);
  else if (state.view === 'profiles') renderProfiles(app);
  else if (state.view === 'edit_child') renderEditChild(app, state.editingChildId);
  else if (state.view === 'expert') renderExpert(app);
  else if (state.view === 'radar') renderRadarView(app);
  else if (state.view === 'ideas') renderIdeas(app);
  else if (state.view === 'evaluation') renderEvaluation(app);

  renderNav(app);
  save();
}

function renderLogin(container) {
  container.innerHTML = `
    <div class="view login-screen">
      <!-- High-End Background Blobs -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      
      <div class="login-card" style="background:rgba(15, 23, 42, 0.8); backdrop-filter:blur(30px); border:1px solid rgba(255,255,255,0.1); border-radius:40px; padding:50px 40px; text-align:center;">
        <div class="pivot-logo-box" style="margin-bottom:30px; display:flex; justify-content:center; align-items:center;">
          <div style="width:220px;">${LOGO_SVG}</div>
        </div>
        <p class="login-subtitle" style="color:rgba(255,255,255,0.6); font-size:16px; margin-bottom:40px; font-weight:500; letter-spacing:0.5px;">Un Hogar en Paz</p>
        
        <div style="width:100%;">
          <input type="email" placeholder="Email o Usuario" class="input-premium" style="background:rgba(255,255,255,0.05); color:white; border-color:rgba(255,255,255,0.1); border-radius:18px;">
          <input type="password" placeholder="Contraseña" class="input-premium" style="margin-top:15px; background:rgba(255,255,255,0.05); color:white; border-color:rgba(255,255,255,0.1); border-radius:18px;">
          <button class="btn-primary login-btn" style="margin-top:40px; font-size:16px; padding:20px; border-radius:20px; font-weight:900; background:var(--primary); box-shadow:0 10px 30px var(--primary-glow);" onclick="authenticate()">ENTRAR AL HOGAR</button>
        </div>

        <div class="login-footer">
          <p style="font-size:12px; color:rgba(255,255,255,0.3); margin-top:30px;">
            ¿Has olvidado tu acceso? <span class="login-link" style="color:var(--primary); cursor:pointer; font-weight:800;">Recuperar</span>
          </p>
          <button class="btn-admin" style="margin-top:40px; width:100%; padding:15px; border-radius:15px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1);" onclick="authenticate(true)">ACCESO DIRECTO (DEMO)</button>
        </div>
      </div>
    </div>
  `;
}

function authenticate(isAdmin) {
  state.isAuthenticated = true;
  state.view = 'home';
  save(); // Helper removed (rad) - using internal toRad
  render();
}

// Helper for Radar Chart SVG
// Helper for Radar Chart SVG
function getRadarSVG(child) {
  if (!child || !child.radar) return '';
  const toRad = (deg) => (deg * Math.PI) / 180;

  // Increased size for text
  const size = 320;
  const c = size / 2;
  const radius = 90;

  const keys = Object.keys(RADAR_AREAS);
  if (keys.length === 0) return '';
  const angleStep = 360 / keys.length;

  let currentPoly = [];
  let targetPoly = [];
  let axesSvg = '';

  keys.forEach((key, i) => {
    const angle = i * angleStep - 90;
    const val = child.radar[key] || 1;
    let target = 3;
    try { if (typeof getSmartTarget === 'function') target = getSmartTarget(child.age, key); } catch (e) { }

    const rVal = (val / 5) * radius;
    const rTarget = (target / 5) * radius;

    // Points
    const xVal = c + rVal * Math.cos(toRad(angle));
    const yVal = c + rVal * Math.sin(toRad(angle));

    const xTarget = c + rTarget * Math.cos(toRad(angle));
    const yTarget = c + rTarget * Math.sin(toRad(angle));

    currentPoly.push(`${xVal},${yVal}`);
    targetPoly.push(`${xTarget},${yTarget}`);

    // Axis
    const xOuter = c + radius * Math.cos(toRad(angle));
    const yOuter = c + radius * Math.sin(toRad(angle));
    axesSvg += `<line x1="${c}" y1="${c}" x2="${xOuter}" y2="${yOuter}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />`;

    // Label
    const labelR = radius + 35;
    const xLabel = c + labelR * Math.cos(toRad(angle));
    const yLabel = c + labelR * Math.sin(toRad(angle));

    // Simple text split for 2 lines
    const name = RADAR_AREAS[key].name;
    const words = name.split(' ');
    // Heuristic: if > 1 word, split
    let line1 = words[0];
    let line2 = words.length > 1 ? words.slice(1).join(' ') : '';

    // Text Anchor logic based on angle to avoid overlap
    let anchor = "middle";
    if (angle > -90 && angle < 90) anchor = "start";
    if (angle > 90 && angle < 270) anchor = "end";
    // Adjust anchor for perfect top/bottom
    if (Math.abs(angle + 90) < 1 || Math.abs(angle - 270) < 1) anchor = "middle"; // Top
    if (Math.abs(angle - 90) < 1) anchor = "middle"; // Bottom

    // Custom fine-tuning for 6 points (-90, -30, 30, 90, 150, 210)
    // 0: -90 (Top) -> Middle
    // 1: -30 (Top Right)
    // 2: 30 (Bottom Right)
    // 3: 90 (Bottom) -> Middle
    // 4: 150 (Bottom Left)
    // 5: 210 (Top Left)

    // Resetting simple middle anchor as it looks better usually if spaced enough
    anchor = "middle";

    axesSvg += `
      <text x="${xLabel}" y="${yLabel - (line2 ? 5 : 0)}" fill="rgba(255,255,255,0.9)" font-size="10" font-weight="700" text-anchor="${anchor}" dominant-baseline="middle" style="text-shadow:0 2px 4px rgba(0,0,0,0.5);">
         ${line1}
      </text>
      ${line2 ? `<text x="${xLabel}" y="${yLabel + 8}" fill="rgba(255,255,255,0.9)" font-size="10" font-weight="700" text-anchor="${anchor}" dominant-baseline="middle" style="text-shadow:0 2px 4px rgba(0,0,0,0.5);">${line2}</text>` : ''}
    `;
  });

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
       ${[1, 2, 3, 4, 5].map(l => `<circle cx="${c}" cy="${c}" r="${(l / 5) * radius}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-dasharray="2 2" />`).join('')}
       ${axesSvg}
       <polygon points="${targetPoly.join(' ')}" fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4 2" />
       <polygon points="${currentPoly.join(' ')}" fill="rgba(251, 146, 60, 0.4)" stroke="#fb923c" stroke-width="2" />
       ${keys.map((key, i) => {
    const angle = i * angleStep - 90;
    const val = child.radar[key] || 1;
    const rVal = (val / 5) * radius;
    const x = c + rVal * Math.cos(toRad(angle));
    const y = c + rVal * Math.sin(toRad(angle));
    return `<circle cx="${x}" cy="${y}" r="3" fill="#fb923c" stroke="white" stroke-width="1" />`;
  }).join('')}
       <g transform="translate(${c - 50}, ${size - 20})">
          <circle cx="0" cy="0" r="4" fill="#fb923c" />
          <text x="10" y="4" fill="rgba(255,255,255,0.6)" font-size="10">Actual</text>
          <circle cx="60" cy="0" r="4" fill="#22d3ee" />
          <text x="70" y="4" fill="rgba(255,255,255,0.6)" font-size="10">Meta</text>
       </g>
    </svg>
  `;
}

function renderRadarView(container) {
  const child = getChild();
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2>Radar Detallado</h2></header>
      <div style="display:flex; justify-content:center; margin:20px 0;">
         ${getRadarSVG(child)}
      </div>
      <div class="os-card">
         <p style="text-align:center; color:rgba(255,255,255,0.7); font-size:13px;">Vista ampliada de las 6 áreas fundamentales.</p>
      </div>
    </div>
  `;
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

function renderHome(container) {
  const child = getChild();
  if (!child.radar) child.radar = { autocontrol: 1, responsabilidad: 1, respeto: 1, autonomia: 1, emocional: 1, social: 1, esfuerzo: 1, reparacion: 1 };
  if (!child.weeklyFocus) child.weeklyFocus = ['autocontrol'];
  const advice = getContextAdvice(child);
  container.innerHTML = `
    <div style="height:100vh; display:flex; flex-direction:column; overflow:hidden;">
      <div style="flex-shrink:0; background:#0F172A; z-index:10; border-bottom:1px solid rgba(255,255,255,0.05);">
        <header class="header" style="border:none; background:transparent; padding: 20px 25px 10px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="logo" style="display:flex; align-items:center; gap:12px;">
           <div style="height:40px; display:flex; align-items:center; filter: drop-shadow(0 0 10px rgba(79, 70, 229, 0.5));">${LOGO_SVG.replace('viewBox="0 0 400 120"', 'viewBox="0 0 80 100" width="40" height="40"')}</div>
           <span style="font-weight:900; letter-spacing:1px; color:white; font-size:24px; font-family:'Outfit', sans-serif;">PIVOT</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
           <div onclick="setView('expert')" style="width:35px; height:35px; border-radius:12px; background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; cursor:pointer;">🔐</div>
        </div>
      </div>
      <div class="child-switcher" style="padding: 20px 0 0;">
        ${state.children.map(c => `
          <div class="child-chip ${state.currentChildId === c.id ? 'active' : ''}" onclick="switchChild('${c.id}')" style="background:${state.currentChildId === c.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; color:white; border:1px solid ${state.currentChildId === c.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};">
            ${c.name}
          </div>
        `).join('')}
        <div class="child-chip" onclick="setView('profiles')" style="background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1);">⚙️</div>
      </div>
    </header>

    <div style="padding-top:10px; padding-bottom:10px;">
      
      <!-- METRICS SPIRALS -->
      <div style="padding: 0 25px; margin-bottom:30px; margin-top:20px;">
         <div class="os-card" style="background:rgba(15, 23, 42, 0.8); border-radius:30px; border:1px solid rgba(255,255,255,0.1); padding:30px 20px; text-align:center;">
            
            <span class="label" style="color:rgba(255,255,255,0.5); font-size:11px; letter-spacing:2px; font-weight:800; text-transform:uppercase;">OBJETIVOS INTELIGENTES</span>
            <h3 style="margin:10px 0 30px; color:white; font-size:24px; font-family:'Outfit', sans-serif;">${child.name} (${child.age} años)</h3>
            
             <div style="display:flex; align-items:center; gap:10px;">
                
                <!-- LEFT: SPIRALS (Wrapped, No Scroll) -->
                <div style="flex:1; display:flex; flex-wrap:wrap; justify-content:center; gap:15px;">
                   ${Object.keys(RADAR_AREAS).map(key => {
    const val = child.radar[key] || 1;
    const numVal = typeof val === 'string' ? parseFloat(val) : val;
    const target = getSmartTarget(child.age, key);
    const diff = target - numVal;

    // Color Logic
    let color = '#EF4444';
    let statusText = 'Atención';
    let statusColor = '#EF4444';

    if (diff <= 0) {
      color = '#10B981';
      statusText = 'Logrado';
      statusColor = '#10B981';
    } else if (diff <= 1.0) {
      color = '#F59E0B';
      statusText = 'En proceso';
      statusColor = '#F59E0B';
    }

    // Visuals
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(100, (numVal / 5) * 100);
    const dashoffset = circumference - (progress / 100) * circumference;

    return `
                         <div style="display:flex; flex-direction:column; align-items:center; min-width: 90px; flex-shrink: 0;">
                            <div style="position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center;">
                               <!-- Glow -->
                               <div style="position:absolute; width:100%; height:100%; background:${color}; opacity:0.15; filter:blur(15px); border-radius:50%;"></div>
                               
                               <svg width="90" height="90" viewBox="0 0 80 80" style="transform: rotate(-90deg);">
                                  <circle cx="40" cy="40" r="${radius}" stroke="rgba(255,255,255,0.1)" stroke-width="6" fill="none" />
                                  <circle cx="40" cy="40" r="${radius}" stroke="${color}" stroke-width="6" fill="none" stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" style="transition: stroke-dashoffset 1s ease-out;" />
                               </svg>
                               
                               <div style="position:absolute; text-align:center;">
                                  <div style="font-size:18px; font-weight:900; color:white; line-height:1;">${numVal.toFixed(1)}</div>
                                  <div style="font-size:10px; color:rgba(255,255,255,0.5); font-weight:600;">/${target.toFixed(1)}</div>
                               </div>
                            </div>
                            
                            <div style="margin-top:10px; font-size:13px; font-weight:700; color:white; text-align:center;">${RADAR_AREAS[key]?.name.split(' ')[0]}</div>
                            <div style="margin-top:2px; font-size:10px; color:${statusColor}; font-weight:800; background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:6px;">${statusText}</div>
                         </div>
                      `;
  }).join('')}
                </div>

                <!-- RIGHT: RADAR CHART -->
                <div style="flex:0 0 350px; display:flex; justify-content:center; padding-left:10px; border-left:1px solid rgba(255,255,255,0.05);">
                   ${getRadarSVG(child)}
                </div>

             </div>
             </div>
          </div>
       </div>

      </div>
      </div>
      <div style="flex-grow:1; overflow-y:auto; padding-bottom:120px; scrollbar-width:none; -ms-overflow-style:none;">
      <!-- WEEKLY CHALLENGES -->
      ${(() => {
      const challenges = getWeeklyChallenges(child);
      return `
        <div style="padding: 0 25px; margin-bottom:30px;">
           <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:15px;">
              <h3 style="color:white; font-size:18px; font-weight:900; margin:0; font-family:'Outfit', sans-serif;">Retos Semanales</h3>
              <span style="font-size:11px; color:var(--primary); font-weight:700;">Ver todo ➔</span>
           </div>
           
           <p style="font-size:12px; color:rgba(255,255,255,0.6); margin-top:-10px; margin-bottom:15px;">Retos personalizados que ayudarán a <b>${child.name}</b> a mejorar esta semana.</p>

           <div style="display:flex; gap:15px; overflow-x:auto; padding-bottom:10px; scrollbar-width:none; -ms-overflow-style:none;">
              
              ${challenges.map(c => `
                  <div class="challenge-card" onclick="viewChallenge('${c.areaKey}')" style="min-width: 280px; background:${c.bgGradient}; border:1px solid ${c.borderColor}; border-radius:24px; padding:20px; position:relative; overflow:hidden; cursor:pointer; box-shadow:0 4px 15px rgba(0,0,0,0.2);">
                     
                     <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                        <div>
                           <div style="font-size:11px; color:rgba(255,255,255,0.8); font-weight:800; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">${c.area}</div>
                           <div style="display:flex; gap:2px; font-size:12px; color:#FFD700;">${'★'.repeat(c.stars)}${'☆'.repeat(5 - c.stars)}</div>
                        </div>
                        <div style="font-size:32px; filter:drop-shadow(0 4px 4px rgba(0,0,0,0.2));">${c.icon}</div>
                     </div>

                     <h4 style="color:white; font-size:18px; margin:0 0 5px; line-height:1.2; font-weight:800;">${c.task}</h4>
                     
                     <div style="display:inline-block; background:rgba(0,0,0,0.2); padding:4px 10px; border-radius:8px; font-size:10px; font-weight:800; color:white; margin-bottom:10px; border:1px solid rgba(255,255,255,0.2);">
                        ${c.level}
                     </div>

                     <p style="font-size:13px; color:rgba(255,255,255,0.9); margin-bottom:20px; line-height:1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        ${c.description}
                     </p>

                     <!-- Progress -->
                     <div style="background:rgba(0,0,0,0.2); padding:10px; border-radius:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; color:white; margin-bottom:6px;">
                           <span>Progreso Semanal</span>
                           <span>${c.completedDays} / ${c.totalDays} días</span>
                        </div>
                        <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                           <div style="width:${(c.completedDays / c.totalDays) * 100}%; height:100%; background:white; border-radius:3px;"></div>
                        </div>
                     </div>

                  </div>
              `).join('')}
              
              <!-- Add New Challenge Placeholder -->
              <div style="min-width: 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:2px dashed rgba(255,255,255,0.1); border-radius:24px; cursor:pointer; opacity:0.5;" onclick="alert('Próximamente: Crear reto manual')">
                 <div style="font-size:24px; color:white; margin-bottom:5px;">+</div>
                 <div style="font-size:10px; color:white; font-weight:800;">Añadir</div>
              </div>

           </div>
        </div>
        `;
    })()}

      </div>
    </div>

  <div class="pivot-anchor-container">
    <div class="pivot-anchor-btn" onclick="setView('selector')">
      <h2 style="font-size:12px;">PIVOT<br>AHORA</h2>
    </div>
  </div>
`;
}

function renderSelector(container) {
  const child = getChild();
  const filtered = SITUATIONS.filter(s => child.age >= s.min_age && child.age <= s.max_age);
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact">
        <button class="btn-back" onclick="setView('home')">←</button>
        <div style="display:flex; flex-direction:column;">
           <span style="font-weight:900; font-size:16px;">¿Qué sucede ahora?</span>
           <span style="font-size:12px; color:var(--text-muted);">Asistente PIVOT activo para ${child.name}</span>
        </div>
      </header>
      <div class="grid-situations" style="grid-template-columns: 1fr; gap: 12px; margin-top:20px;">
        ${filtered.length === 0 ? '<p style="text-align:center; color:var(--text-muted); padding:40px;">No hay situaciones críticas detectadas para esta edad precisa. IA en modo escucha.</p>' : filtered.map(s => `
          <div class="os-card" style="display:flex; align-items:center; gap:15px; padding:15px; margin-bottom:0;" onclick="selectSituation('${s.id}')">
            <span style="font-size:24px;">${s.icon}</span>
            <div style="flex:1;">
               <h4 style="margin:0; font-size:14px;">${s.name}</h4>
               <div class="stat-bar-bg" style="width:60px; height:4px; margin-top:5px;"><div class="stat-bar-fill" style="width:100%; background:#E2E8F0;"></div></div>
            </div>
            <span style="color:var(--primary); font-size:18px;">➔</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCard(container, sitId) {
  const child = getChild();
  const sit = SITUATIONS.find(s => s.id === sitId);
  if (!sit || !sit.cards) return;
  const card = sit.cards[0];
  const resKey = child.age <= 2 ? 'bebe' : (child.age >= 11 ? 'adolescencia' : 'conducta');
  const relevantRes = RESOURCES[resKey] || RESOURCES['conducta'];

  container.innerHTML = `
    <div class="view scroll-y" style="padding-bottom:150px;">
      <header class="header-compact" style="background:transparent; border:none; padding: 30px 25px 10px;">
         <button class="btn-back" onclick="setView('selector')" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer;">←</button>
         <div style="margin-left:15px;">
            <span style="font-weight:900; font-size:20px; color:white; font-family:'Outfit', sans-serif;">Guía: ${sit.name}</span>
         </div>
      </header>

      <div class="p-20" style="padding-top:10px;">
        ${(() => { state.currentReportVal = 66; return ''; })()}
        <div class="os-card" style="background:rgba(15, 23, 42, 0.6); border:1px solid rgba(255,255,255,0.1); padding:30px;">
          <div class="label" style="color:var(--primary); font-size:11px; letter-spacing:1px; font-weight:800; margin-bottom:15px;">DICE ESTO:</div>
          <div class="phrase-large" style="color:white; font-size:24px; font-weight:900; font-family:'Outfit', sans-serif; line-height:1.3;">"${card.phrase}"</div>
          
          <div class="label" style="color:var(--primary); font-size:11px; letter-spacing:1px; font-weight:800; margin:35px 0 15px;">PASOS DE ACCIÓN:</div>
          <div style="display:flex; flex-direction:column; gap:15px;">
             ${card.steps.map((s, i) => `
                <div class="step-row" style="display:flex; gap:15px; align-items:flex-start;">
                   <div class="step-idx" style="background:var(--primary); color:white; min-width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px;">${i + 1}</div>
                   <p style="margin:0; color:rgba(255,255,255,0.85); font-size:15px; line-height:1.5;">${s}</p>
                </div>
             `).join('')}
          </div>
        </div>
        
        <div class="os-card" style="margin-top:20px; background:linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)); border:1px solid rgba(255,255,255,0.1); padding:25px;">
           <p class="label" style="color:rgba(255,255,255,0.5); font-size:10px; letter-spacing:1px; font-weight:800;">EL LÍMITE Y LA CONSECUENCIA</p>
           <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px;">
              <p style="font-size:14px; color:white; margin:0;"><b>Límite:</b> ${card.limit}</p>
              <p style="font-size:14px; color:white; margin:0;"><b>Consecuencia:</b> ${card.consequence}</p>
           </div>
        </div>

        <div class="resource-hub" style="margin-top:30px;">
           <p class="label" style="color:rgba(255,255,255,0.5); font-size:10px; letter-spacing:1px; font-weight:800; margin-bottom:15px;">¿QUIERES PROFUNDIZAR?</p>
           ${relevantRes.map(r => `
             <div class="resource-card" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:20px; display:flex; gap:15px; align-items:center; margin-bottom:10px; cursor:pointer;" onclick="alert('Abriendo ${r.title}...')">
                <div class="res-icon" style="font-size:24px;">${r.icon}</div>
                <div>
                   <div class="res-meta" style="font-size:10px; color:var(--primary); font-weight:800; text-transform:uppercase;">${r.type}</div>
                   <h5 style="margin:0; color:white; font-size:14px;">${r.title}</h5>
                   <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.5);">${r.meta}</p>
                </div>
             </div>
           `).join('')}
        </div>
        
        <div class="os-card" style="margin-top:30px; background:rgba(255,255,255,0.05); border:1px dotted rgba(255,255,255,0.2); padding:25px; text-align:center;">
           <p class="label" style="color:var(--primary); font-weight:800;">TU MISIÓN FINALIZADA</p>
           <p style="font-size:13px; margin-top:10px; color:rgba(255,255,255,0.6);">¿Cómo ha resultado la aplicación de esta guía? Evalúa para ver el impacto en su Radar.</p>
           <div class="report-options" style="margin-top:25px; display:flex; gap:10px; justify-content:center;">
              <div class="report-opt-btn" id="opt-0" onclick="setReportVal(0, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Mal</div>
              <div class="report-opt-btn" id="opt-33" onclick="setReportVal(33, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Regular</div>
              <div class="report-opt-btn active" id="opt-66" onclick="setReportVal(66, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:var(--primary); color:white; font-size:11px; font-weight:900; border:1px solid var(--primary); cursor:pointer;">Bien</div>
              <div class="report-opt-btn" id="opt-100" onclick="setReportVal(100, this)" style="flex:1; padding:15px 5px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Muy bien</div>
           </div>
        </div>
        
        <button class="btn-primary" onclick="submitReport()" style="margin-top:40px; width:100%; border-radius:20px; padding:20px; font-weight:900; font-size:16px;">EVALUAR Y CERRAR</button>
      </div>
    </div>
  `;
}

function renderProfiles(container) {
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">La Familia</h2></header>
      
      <div class="os-card" style="display:flex; justify-content:space-between; align-items:center; background:var(--primary); color:white;">
        <div>
           <h4 style="margin:0;">${state.parentProfile.name}</h4>
           <p style="font-size:12px; opacity:0.8;">Perfil Principal (Administrador)</p>
        </div>
        <span style="font-size:20px;">👤</span>
      </div>

      <span class="label" style="margin:30px 0 15px; display:block;">Crecimiento de Hijos</span>
      <div style="display:flex; flex-direction:column; gap:12px;">
      ${state.children.map(c => `
        <div class="os-card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0;" onclick="editChild('${c.id}')">
          <div style="display:flex; align-items:center; gap:15px;">
            <div style="width:45px; height:45px; background:#F1F5F9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--primary); font-weight:900; font-size:18px;">${c.name[0]}</div>
            <div>
               <h4 style="margin:0;">${c.name}</h4>
               <p style="font-size:12px; color:var(--text-muted);">${c.age} años • ${c.age >= 11 ? 'Adolescente' : (c.age >= 3 ? 'Infantil' : 'Bebé')}</p>
            </div>
          </div>
          <span style="color:var(--primary); font-weight:800; font-size:12px;">CONFIGURAR ⚙️</span>
        </div>
      `).join('')}
      </div>

      <button class="btn-primary" style="margin-top:25px; background:#F8FAFC; color:var(--primary); border:2px dashed var(--primary);" onclick="editChild()">+ Añadir nuevo perfil</button>
    </div>
  `;
}

function renderRadar(container) {
  const child = getChild();
  const ageBracket = getAgeBracket(child.age);
  const indicators = RADAR_INDICATORS[ageBracket] || {};

  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">Radar PIVOT</h2></header>
      
      <div class="life-stage-banner" style="background:var(--primary-light); border-color:var(--primary);">
         <div class="banner-title" style="color:var(--primary);">Estado de ${child.name} (${child.age} años)</div>
         <div class="banner-text">Puntuación de 1 a 5 basada en comportamientos observables.</div>
      </div>

      <div style="margin-top:20px;">
        ${Object.keys(RADAR_AREAS).map(key => {
    const area = RADAR_AREAS[key];
    const val = child.radar[key] || 1;
    const indicator = indicators[key] || 'Hito en desarrollo...';
    return `
            <div class="os-card" style="margin-bottom:12px; padding:12px; display:flex; align-items:center; gap:15px;">
               <div style="font-size:24px;">${area.icon}</div>
               <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <h4 style="margin:0; font-size:13px;">${area.name}</h4>
                    <span style="font-weight:900; color:var(--primary); font-size:14px;">${val.toFixed(1)}/5</span>
                  </div>
                  <div class="stat-bar-bg" style="height:6px; border-radius:3px; background:#F1F5F9;">
                    <div class="stat-bar-fill" style="width:${(val / 5) * 100}%; background:var(--primary); border-radius:3px;"></div>
                  </div>
                  <p style="font-size:10px; color:var(--text-muted); margin-top:5px; font-style:italic; line-height:1.2;">"${indicator}"</p>
               </div>
            </div>
          `;
  }).join('')}
      </div>

      <button class="btn-primary" onclick="setView('evaluation')" style="margin-top:20px;">✓ Evaluación 1 minuto</button>
    </div>
  `;
}

function setReportVal(val, element) {
  state.currentReportVal = val;
  document.querySelectorAll('.report-opt-btn').forEach(el => {
    el.style.background = 'rgba(255,255,255,0.05)';
    el.style.border = '1px solid rgba(255,255,255,0.1)';
    el.style.fontWeight = '800';
  });
  element.style.background = 'var(--primary)';
  element.style.border = '1px solid var(--primary)';
  element.style.fontWeight = '900';
}

function renderChallengeReport(container) {
  const child = getChild();
  state.currentReportVal = 66; // Default to 'Bien'
  container.innerHTML = `
    <div class="view scroll-y p-20">
      <header class="header-compact"><button class="btn-back" onclick="setView('home')">✕</button><h2 style="font-size:20px; font-weight:900;">Reporte Diario</h2></header>
      <div class="os-card" style="margin-top:40px;">
         <p class="label">RETO EN CURSO</p>
         <h3>${child.currentChallenge.title}</h3>
         <div class="focus-why">${GROWTH_CONCEPTS[child.currentChallenge.concept].why}</div>
         
         <div style="margin-top:40px;">
            <p style="font-size:14px; font-weight:800; text-align:center; color:var(--text-muted); margin-bottom:10px;">¿Cómo ha ido hoy?</p>
            <div class="report-options" style="display:flex; gap:10px; justify-content:center;">
               <div class="report-opt-btn" id="opt-0" onclick="setReportVal(0, this)" style="flex:1; padding:15px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">No cumple</div>
               <div class="report-opt-btn" id="opt-33" onclick="setReportVal(33, this)" style="flex:1; padding:15px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">A veces</div>
               <div class="report-opt-btn active" id="opt-66" onclick="setReportVal(66, this)" style="flex:1; padding:15px; border-radius:12px; background:var(--primary); color:white; font-size:11px; font-weight:900; border:1px solid var(--primary); cursor:pointer;">Bien</div>
               <div class="report-opt-btn" id="opt-100" onclick="setReportVal(100, this)" style="flex:1; padding:15px; border-radius:12px; background:rgba(255,255,255,0.05); color:white; font-size:11px; font-weight:800; border:1px solid rgba(255,255,255,0.1); cursor:pointer;">Muy bien</div>
            </div>
         </div>
      </div>
      <button class="btn-primary" onclick="submitReport()" style="margin-top:20px;">Guardar Reporte</button>
    </div>
  `;
}

function submitReport() {
  const val = state.currentReportVal !== undefined ? state.currentReportVal : 66;
  const child = getChild();
  const situation = state.selectedSituation ? SITUATIONS.find(s => s.id === state.selectedSituation) : null;

  let growthMessage = "Manteniendo el rumbo...";
  let improvedAreas = [];
  let isPositive = val >= 66;

  if (situation && situation.radarAreas) {
    situation.radarAreas.forEach(area => {
      const oldVal = child.radar[area] || 1;
      if (isPositive) {
        // Positive: "Bien" (0.1) or "Muy bien" (0.2)
        const increment = val === 100 ? 0.2 : 0.1;
        child.radar[area] = Math.min(5, oldVal + increment);
        improvedAreas.push({ name: RADAR_AREAS[area].name, icon: RADAR_AREAS[area].icon });
      } else {
        // Negative: "Regular" (-0.1) or "Mal" (-0.2)
        const decrement = val === 0 ? 0.2 : 0.1;
        child.radar[area] = Math.max(1, oldVal - decrement);
        improvedAreas.push({ name: RADAR_AREAS[area].name, icon: RADAR_AREAS[area].icon });
      }
    });
  }

  if (improvedAreas.length > 0) {
    if (isPositive) {
      growthMessage = `¡ÉXITO! +${val === 100 ? '0.2' : '0.1'} en ${improvedAreas.map(a => a.name).join(', ')}`;
    } else {
      growthMessage = `REAJUSTE: -${val === 0 ? '0.2' : '0.1'} en ${improvedAreas.map(a => a.name).join(', ')}`;
    }
  }

  child.lastReport = {
    val: val,
    date: new Date().toISOString(),
    situation: situation ? situation.name : 'Varios',
    message: growthMessage,
    isPositive: isPositive
  };

  state.streak = isPositive ? state.streak + 1 : 0;
  state.view = 'feedback';
  render();
}

function renderFeedback(container) {
  const child = getChild();
  const report = child.lastReport;
  const icons = {
    success: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
    calm: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
  };

  container.innerHTML = `
    <div class="view login-screen" style="z-index:99999;">
      <div class="login-card" style="text-align:center; animation: cardFadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); width: 90%; max-width: 400px; padding: 40px 30px;">
        
        ${report.isPositive
      ? `<div style="margin-bottom:20px;">${icons.success}</div>`
      : `<div class="breathing-circle">${icons.calm}</div>`
    }

        <h2 style="font-family:'Outfit', sans-serif; font-weight:900; font-size:28px; margin-bottom:12px; color: white;">
          ${report.isPositive ? '¡Excelente Conexión!' : 'Coge aire y sigue'}
        </h2>
        
        <p style="color:rgba(255,255,255,0.7); font-size:15px; line-height:1.6; margin-bottom:30px;">
          ${report.isPositive
      ? `Tu acompañamiento hoy con <b>${child.name}</b> está construyendo un vínculo indestructible.`
      : `Ánimo, sigue trabajando porque los frutos están cerca.`}
        </p>
        
        <div class="os-card" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); padding:20px; border-radius:20px;">
           <div style="font-weight:800; font-size:16px; color:var(--primary); letter-spacing:1px; text-transform:uppercase;">
              ${report.message}
           </div>
        </div>

        <button class="btn-primary" style="margin-top:40px; width:100%; border-radius:20px; font-weight:800; background: white; color: var(--primary);" onclick="setView('home')">CONTINUAR AVENTURA</button>
      </div>
    </div>
  `;
}

function editChild(id) { state.editingChildId = id; state.view = 'edit_child'; render(); }
function saveChild(id) {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const temp = document.getElementById('temp').value;

  if (!id) {
    const radar = {};
    Object.keys(RADAR_AREAS).forEach(k => {
      radar[k] = parseInt(state.tempRadarValues && state.tempRadarValues[k] ? state.tempRadarValues[k] : 1);
    });
    state.children.push({
      id: Date.now().toString(), name, age: parseInt(age), temperament: temp,
      radar: radar,
      weeklyFocus: [Object.keys(RADAR_AREAS)[0]],
      currentChallenge: null
    });
  } else {
    const c = state.children.find(ch => ch.id === id);
    c.name = name; c.age = parseInt(age); c.temperament = temp;
    Object.keys(RADAR_AREAS).forEach(k => {
      c.radar[k] = parseInt(state.tempRadarValues && state.tempRadarValues[k] ? state.tempRadarValues[k] : (c.radar[k] || 1));
    });
  }
  state.tempRadarValues = null;
  state.view = 'profiles'; render();
}

function deleteChild(id) {
  if (state.children.length <= 1) { alert("Debes tener al menos un perfil de hijo."); return; }
  state.children = state.children.filter(c => c.id !== id);
  if (state.currentChildId === id) state.currentChildId = state.children[0].id;
  state.view = 'profiles'; render();
}

function setTempRadar(key, val) {
  if (!state.tempRadarValues) state.tempRadarValues = {};
  state.tempRadarValues[key] = val;
  // Update UI manually for speed
  document.querySelectorAll(`.radar-btn-${key}`).forEach(btn => {
    btn.style.background = 'rgba(255,255,255,0.05)';
    btn.style.color = 'white';
  });
  const activeBtn = document.getElementById(`radar-btn-${key}-${val}`);
  if (activeBtn) {
    activeBtn.style.background = 'var(--primary)';
    activeBtn.style.color = 'white';
  }
}

function renderEditChild(container, id) {
  const child = state.children.find(c => c.id === id) || { name: '', age: 3, temperament: 'Tranquilo', radar: {} };
  if (!state.tempRadarValues) {
    state.tempRadarValues = {};
    Object.keys(RADAR_AREAS).forEach(k => state.tempRadarValues[k] = child.radar[k] || 1);
  }

  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><button class="btn-back" onclick="setView('profiles')">✕</button><h2 style="color:white; font-family:'Outfit', sans-serif;">${id ? 'Editar Perfil' : 'Nuevo Hijo'}</h2></header>
      
      <div style="margin-top:20px;">
        <label class="label">Nombre</label><input type="text" id="name" class="input-premium" value="${child.name}" style="margin-bottom:20px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1);">
        
        <label class="label">Edad (años)</label>
        <input type="number" id="age" class="input-premium" value="${child.age}" min="0" max="18" style="margin-bottom:20px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1);">

        <label class="label">Temperamento</label>
        <select id="temp" class="input-premium" style="margin-bottom:20px; background:rgba(25, 30, 45, 0.9); color:white; border:1px solid rgba(255,255,255,0.1);">
          <option value="Tranquilo" ${child.temperament === 'Tranquilo' ? 'selected' : ''}>Tranquilo</option>
          <option value="Intenso" ${child.temperament === 'Intenso' ? 'selected' : ''}>Intenso / Activo</option>
          <option value="Sensible" ${child.temperament === 'Sensible' ? 'selected' : ''}>Sensible</option>
        </select>

        <div class="os-card" style="margin-top:20px; background:rgba(15, 23, 42, 0.6); border:1px solid var(--primary);">
          <p class="label" style="color:var(--primary); margin-bottom:15px; font-weight:800; letter-spacing:1px;">EVALUACIÓN INICIAL RADAR</p>
          <p style="font-size:11px; color:rgba(255,255,255,0.5); margin-bottom:20px;">Selecciona el nivel de madurez actual de 1 a 5.</p>
          ${Object.keys(RADAR_AREAS).map(k => {
    const val = state.tempRadarValues[k];
    return `
              <div style="margin-bottom:25px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                  <span style="font-size:13px; font-weight:700; color:white;">${RADAR_AREAS[k].icon} ${RADAR_AREAS[k].name}</span>
                </div>
                <div style="display:flex; gap:10px;">
                   ${[1, 2, 3, 4, 5].map(v => `
                      <div id="radar-btn-${k}-${v}" class="radar-btn-${k}" onclick="setTempRadar('${k}', ${v})" style="flex:1; height:45px; border-radius:12px; background:${val == v ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; color:white; display:flex; align-items:center; justify-content:center; font-weight:900; border:1px solid ${val == v ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; cursor:pointer; transition:all 0.2s;">${v}</div>
                   `).join('')}
                </div>
              </div>
            `;
  }).join('')}
        </div>

        <button class="btn-primary" onclick="saveChild('${id || ''}')" style="margin-top:30px; width:100%; padding:20px; font-weight:900;">GUARDAR CAMBIOS</button>
        ${id ? `<button class="btn-delete" onclick="deleteChild('${id}')" style="margin-top:15px; width:100%; border:none; background:none; color:rgba(255,255,255,0.4); font-size:12px;">Eliminar Perfil</button>` : ''}
      </div>
    </div>
  `;
}

function toggleFocusArea(area) {
  const child = getChild();
  const idx = child.weeklyFocus.indexOf(area);
  if (idx > -1) {
    child.weeklyFocus.splice(idx, 1);
  } else {
    if (child.weeklyFocus.length < 2) child.weeklyFocus.push(area);
    else alert("Máximo 2 áreas de enfoque por semana.");
  }
  render();
}

function updateEvalScore(area, val) {
  const child = getChild();
  child.radar[area] = val;
  render();
}

function saveEvaluation() {
  setView('home');
}

function renderEvaluation(container) {
  const child = getChild();
  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><button class="btn-back" onclick="setView('radar')">✕</button><h2 style="font-size:20px; font-weight:900;">Evaluación Semanal</h2></header>
      
      <div class="os-card" style="margin-top:20px;">
         <p class="label">HIJO: ${child.name}</p>
         <p style="font-size:13px; color:var(--text-muted);">Elige 1 o 2 áreas para trabajar esta semana y pon su nota actual.</p>
      </div>

      <div style="margin-top:20px;">
        ${Object.keys(RADAR_AREAS).map(key => {
    const area = RADAR_AREAS[key];
    const isSelected = child.weeklyFocus.includes(key);
    const score = child.radar[key] || 1;
    return `
            <div class="os-card" style="border-color:${isSelected ? 'var(--primary)' : 'var(--border)'}; opacity:${isSelected ? 1 : 0.7}; transition:0.3s; padding:15px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="toggleFocusArea('${key}')">
                  <div style="width:20px; height:20px; border:2px solid var(--primary); border-radius:4px; display:flex; align-items:center; justify-content:center;">
                    ${isSelected ? '<div style="width:12px; height:12px; background:var(--primary); border-radius:2px;"></div>' : ''}
                  </div>
                  <span style="font-weight:800; font-size:14px;">${area.icon} ${area.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                  ${[1, 2, 3, 4, 5].map(v => `
                    <div onclick="updateEvalScore('${key}', ${v})" style="width:28px; height:28px; border-radius:50%; background:${score === v ? 'var(--primary)' : '#F1F5F9'}; color:${score === v ? 'white' : 'var(--text)'}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; cursor:pointer;">${v}</div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
  }).join('')}
      </div>

      <button class="btn-primary" onclick="saveEvaluation()" style="margin-top:20px;">Finalizar Evaluación</button>
    </div>
  `;
}

function renderIdeas(container) {
  const child = getChild();
  if (!child.radar) child.radar = { autocontrol: 1, responsabilidad: 1, respeto: 1, autonomia: 1, emocional: 1, social: 1, esfuerzo: 1, reparacion: 1 };
  const ideas = IDEA_DB[Math.min(18, child.age)];

  container.innerHTML = `
    <div class="view scroll-y p-20" style="padding-bottom:120px;">
      <header class="header-compact"><h2 style="font-size:24px; font-weight:900;">Ideas IA</h2></header>
      <div class="life-stage-banner" style="background:var(--primary-light); border-color:var(--primary);">
         <div class="banner-title" style="color:var(--primary);">Estrategia para ${child.name}</div>
         <div class="banner-text">Basado en sus ${child.age} años y temperamento ${child.temperament}, estas son las mejores acciones para los próximos 2-3 días.</div>
      </div>

      <div class="next-steps-list" style="margin-top:20px;">
        ${ideas.map(idea => `
          <div class="next-step-item" onclick="alert('Abriendo guía detallada...')">
             <div class="next-step-icon">💡</div>
             <div>
                <div class="next-step-category">Acción sugerida</div>
                <h4 style="margin:0;">${idea}</h4>
                <p style="margin:0; font-size:11px; color:var(--text-muted);">Pulsa para ver el paso a paso científico.</p>
             </div>
          </div>
        `).join('')}
      </div>

      <div class="os-card" style="margin-top:20px; border-color:var(--primary); background: #F5F3FF;">
         <p class="label" style="color:var(--primary);">💡 AUTO-APRENDIZAJE PIVOT</p>
         <p style="font-size:13px; margin-top:8px;">${child.lastReport ? `Tras el reporte "${child.lastReport.val >= 66 ? 'Positivo' : 'Regular'}" en ${child.lastReport.situation}, he ajustado su perfil de madurez.` : `Analizando comportamiento de ${child.name}. He notado que ha mejorado en su ${RADAR_AREAS[Object.keys(child.radar).sort((a, b) => child.radar[b] - child.radar[a])[0]].name}. Esto indica madurez en sus ${child.age} años.`}</p>
      </div>
    </div>
  `;
}

function renderNav(container) {
  const icons = {
    home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    radar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>`,
    ideas: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
    profiles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  };

  container.innerHTML += `
    <nav class="nav-bar">
      <div class="nav-item ${state.view === 'home' || state.view === 'selector' || state.view === 'card' ? 'active' : ''}" onclick="setView('home')"><span class="nav-icon">${icons.home}</span><span>Home</span></div>
      <div class="nav-item ${state.view === 'radar' || state.view === 'mastery' ? 'active' : ''}" onclick="setView('radar')"><span class="nav-icon">${icons.radar}</span><span>Radar</span></div>
      <div class="nav-item ${state.view === 'ideas' ? 'active' : ''}" onclick="setView('ideas')"><span class="nav-icon">${icons.ideas}</span><span>Ideas</span></div>
      <div class="nav-item ${state.view === 'profiles' || state.view === 'edit_child' ? 'active' : ''}" onclick="setView('profiles')"><span class="nav-icon">${icons.profiles}</span><span>Familia</span></div>
    </nav>
  `;
}


function renderExpert(container) { container.innerHTML = `<div class="view p-20"><header class="header-compact"><button class="btn-back" onclick="setView('home')">✕</button><h2>Expertos</h2></header><p>Contenido cifrado...</p></div>`; }

window.setView = (v) => { state.view = v; render(); };
window.switchChild = (id) => { state.currentChildId = id; render(); };
window.selectSituation = (id) => { state.selectedSituation = id; state.view = 'card'; render(); };
window.editChild = editChild;
window.saveChild = saveChild;
window.deleteChild = deleteChild;
window.setReportVal = setReportVal;
window.submitReport = submitReport;
window.authenticate = authenticate;
window.toggleFocusArea = toggleFocusArea;
window.updateEvalScore = updateEvalScore;
// PROGRESS LOGIC
// PROGRESS LOGIC
window.toggleChallengeProgress = (challengeId) => {
  if (!state.challengeProgress) state.challengeProgress = {};
  if (!state.challengeLastUpdate) state.challengeLastUpdate = {};

  const current = state.challengeProgress[challengeId] || 0;
  const lastUpdate = state.challengeLastUpdate[challengeId];
  const today = new Date().toDateString();

  // Check if already completed today
  if (lastUpdate === today) {
    alert('¡Ya has registrado tu avance de hoy! Vuelve mañana para seguir sumando.');
    return;
  }

  if (current < 7) {
    state.challengeProgress[challengeId] = current + 1;
    state.challengeLastUpdate[challengeId] = today; // Mark as done for today
  }

  save();
  // Re-render
  const areaKey = challengeId.split('_')[2];
  viewChallenge(areaKey);
};

window.viewChallenge = (areaKey) => {
  const child = getChild();

  // Resolve library for age
  let bracket = '0-2';
  if (child.age >= 3 && child.age <= 5) bracket = '3-5';
  else if (child.age >= 6 && child.age <= 9) bracket = '6-9';
  else if (child.age >= 10 && child.age <= 13) bracket = '10-13';
  else if (child.age >= 14) bracket = '14-18';

  const lib = CHALLENGE_DB[bracket][areaKey];

  // Find the challenge object to get current progress
  const challenges = getWeeklyChallenges(child);
  const challenge = challenges.find(c => c.areaKey === areaKey);

  // Fallback if not currently active
  const progress = challenge ? challenge.completedDays : 0;
  const total = 7;
  const percentage = (progress / total) * 100;
  const chId = challenge ? challenge.id : `ch_${child.id}_${areaKey}_w1`;

  const app = document.getElementById('app');

  /* Logic needed for status */
  const savedLastUpdate = state.challengeLastUpdate?.[chId];
  const today = new Date().toDateString();
  const isDoneToday = savedLastUpdate === today;

  app.innerHTML = `
    <div class="view scroll-y" style="background:#0F172A; padding-bottom:100px;">
      
      <!-- NAV HEADER -->
      <div style="padding: 20px 25px; display:flex; justify-content:space-between; align-items:center;">
         <button onclick="setView('home')" style="background:transparent; border:none; color:white; font-size:18px; cursor:pointer; display:flex; align-items:center; gap:5px;">
            <span>←</span> <span style="font-size:14px; color:rgba(255,255,255,0.7);">Mis Retos</span>
         </button>
         <div style="color:#F59E0B; font-size:14px;">${'★'.repeat(Math.ceil(progress / 2))}${'☆'.repeat(3 - Math.ceil(progress / 2))}</div>
      </div>

      <div style="padding: 0 25px;">
         <div style="font-size:12px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:1px; font-weight:700;">Desarrollo de ${child.name}</div>
         <h1 style="color:white; margin:5px 0 10px; font-size:24px; font-family:'Outfit', sans-serif;">Reto de ${RADAR_AREAS[areaKey].name}</h1>
         
         <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div style="font-size:15px; color:white; font-weight:500;">Meta: <span style="color:rgba(255,255,255,0.8);">${lib.title}</span></div>
         </div>

         <!-- HERO CARD -->
         <div style="background:linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border:1px solid rgba(255,255,255,0.1); border-radius:30px; padding:20px; overflow:hidden; position:relative;">
            
            <!-- Visual Placeholder for Concept Art -->
            <div style="height:160px; width:100%; border-radius:20px; background:${lib.gradient}; display:flex; align-items:center; justify-content:center; margin-bottom:20px; position:relative; overflow:hidden;">
               <div style="font-size:80px; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.3));">${lib.icon}</div>
               <!-- Status Badge (Non-interactive) -->
               ${isDoneToday || progress >= total ? `
               <div style="position:absolute; bottom:15px; right:15px; background:rgba(255,255,255,0.9); padding:5px 12px; border-radius:20px; display:flex; align-items:center; gap:5px; box-shadow:0 10px 20px rgba(0,0,0,0.2);">
                  <span style="font-size:16px; color:#10B981;">✔</span>
                  <span style="font-size:11px; color:#0F172A; font-weight:800; text-transform:uppercase;">Al día</span>
               </div>` : ''}
            </div>

            <!-- Progress Bar -->
            <div style="text-align:center; margin-bottom:5px;">
               <span style="font-size:16px; color:white; font-weight:700;">${progress} / ${total}</span>
               <span style="font-size:14px; color:rgba(255,255,255,0.6);"> días completados</span>
            </div>
            <div style="height:8px; width:100%; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
               <div style="height:100%; width:${percentage}%; background:var(--primary); border-radius:4px; transition: width 0.5s ease;"></div>
            </div>

         </div>

         <!-- MISSION -->
         <div style="margin-top:25px; margin-bottom:25px;">
            <p style="font-size:18px; color:white; line-height:1.4; text-align:center; font-weight:600;">"${lib.description}"</p>
         </div>

         <!-- HOW TO SECTION -->
         <h3 style="color:white; font-size:18px; font-weight:900; margin:0 0 15px; font-family:'Outfit', sans-serif;">Paso a Paso</h3>
         
         <div style="display:flex; overflow-x:auto; gap:15px; padding-bottom:20px; scrollbar-width:none; -ms-overflow-style:none;">
            ${lib.steps.map((step, i) => `
               <div style="min-width:200px; background:rgba(30, 41, 59, 0.6); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:15px; display:flex; flex-direction:column;">
                  <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
                     <div style="width:24px; height:24px; background:#F59E0B; color:#0F172A; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px;">${i + 1}</div>
                     <span style="color:#F59E0B; font-weight:700; font-size:11px; text-transform:uppercase;">Paso ${i + 1}</span>
                  </div>
                  <p style="color:rgba(255,255,255,0.9); font-size:13px; line-height:1.4; margin:0;">${step}</p>
               </div>
            `).join('')}
         </div>

         <!-- PRO TIP -->
         <div style="margin-top:5px; background:linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05)); border:1px solid rgba(59, 130, 246, 0.3); border-radius:20px; padding:15px; display:flex; gap:15px; align-items:center;">
            <div style="font-size:24px;">💡</div>
            <div>
               <p style="color:rgba(255,255,255,0.9); font-size:13px; line-height:1.4; margin:0; font-style:italic;">"${lib.tips}"</p>
            </div>
         </div>

         <button onclick="toggleChallengeProgress('${chId}')" ${isDoneToday || progress >= total ? 'disabled' : ''} style="margin-top:30px; width:100%; background:${isDoneToday || progress >= total ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)'}; color:${isDoneToday || progress >= total ? 'rgba(255,255,255,0.4)' : 'white'}; font-weight:900; padding:20px; border-radius:24px; border:none; font-size:16px; box-shadow: ${isDoneToday ? 'none' : '0 10px 30px rgba(245, 158, 11, 0.2)'}; cursor:${isDoneToday ? 'default' : 'pointer'};">
            ${progress >= total ? '¡Reto Completado!' : (isDoneToday ? '¡Vuelve mañana!' : '¡Registrar Avance Hoy!')}
         </button>

      </div>
    </div >
    `;
};

render();
