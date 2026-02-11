function renderConnectionKeys(container, childId) {
    const child = state.children.find(c => c.id === childId) || state.children[0];
    if (!child) return;
    const parent = state.parentProfile;
    const testDone = !!parent.parentTestResult;

    if (!testDone) {
        container.innerHTML = `<div class="view p-20" style="background:#0F172A; text-align:center; padding-top:100px;">
            <p style="color:white; font-size:18px;">Debes completar el Test YO primero para que podamos analizar vuestra conexión.</p>
            <button onclick="setView('yo')" class="btn-primary" style="margin-top:20px;">Volver</button>
        </div>`;
        return;
    }

    const parentStyle = parent.parentTestResult.style;
    const childTemp = child.temperament;
    const match = PARENT_CHILD_MATCH_DB[parentStyle][childTemp] || { level: 'Pendiente', keys: [], advice: 'Analizando conexión...' };
    const age = child.age;

    // PEDAGOGICAL CONTENT GENERATOR
    const dynamicMatch = getDynamicMatch(childId);
    const content = generatePedagogicalContent(parentStyle, childTemp, age);

    container.innerHTML = `
    <style>
        .keys-view {
            background: #0F172A;
            min-height: 100vh;
            padding: 0 0 120px;
        }
        .keys-header {
            padding: 40px 25px 30px;
            background: linear-gradient(180deg, rgba(30,41,59,0.5) 0%, transparent 100%);
            position: relative;
        }
        .keys-section {
            padding: 0 25px;
            margin-bottom: 40px;
        }
        .section-label {
            color: #3B82F6;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 15px;
            display: block;
        }
        .feature-card {
            background: #1E293B;
            border-radius: 24px;
            padding: 20px;
            margin-bottom: 15px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .need-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 12px;
            color: white;
            font-size: 15px;
            font-weight: 600;
        }
        .need-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #3B82F6;
        }
        .advice-box {
            border-radius: 20px;
            padding: 18px;
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 1.5;
        }
        .advice-success {
            background: rgba(16, 185, 129, 0.08);
            border-left: 4px solid #10B981;
            color: #A7F3D0;
        }
        .advice-risk {
            background: rgba(239, 68, 68, 0.08);
            border-left: 4px solid #EF4444;
            color: #FECACA;
        }
        .phrase-pill {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            padding: 12px 18px;
            border-radius: 15px;
            color: white;
            font-size: 14px;
            font-style: italic;
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
        }
    </style>

    <div class="view keys-view scroll-y">
        <!-- HEADER -->
        <div class="keys-header">
            <button onclick="setView('yo')" style="background:none; border:none; color:rgba(255,255,255,0.5); font-size:14px; font-weight:700; cursor:pointer; padding:0; margin-bottom:20px; display:flex; align-items:center; gap:5px;">
                <span>←</span> Volver a YO
            </button>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                <div>
                    <h1 style="color:white; font-size:26px; font-weight:800; margin:0; font-family:'Outfit', sans-serif;">${child.name}</h1>
                    <p style="color:rgba(255,255,255,0.4); font-size:15px; margin:5px 0 0;">${age} años • Rasgo: <span style="color:#F59E0B; font-weight:700;">${childTemp}</span></p>
                </div>
                <div style="text-align:right;">
                    <div style="background:${dynamicMatch.color}22; color:${dynamicMatch.color}; padding:4px 10px; border-radius:8px; font-size:10px; font-weight:900; letter-spacing:1px;">ACOM. ${dynamicMatch.level.toUpperCase()}</div>
                </div>
            </div>
            <p style="color:white; font-size:16px; font-weight:600; line-height:1.4; margin-top:20px; font-style:italic;">
                "${content.intro}"
            </p>
        </div>

        <!-- SECTION 1: NECESIDADES -->
        <div class="keys-section">
            <span class="section-label">Lo que ${child.name} necesita ahora</span>
            <div class="feature-card">
                <div style="font-size: 11px; color: #F59E0B; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 5px;">
                    <span>${content.timeIcon}</span> Foco: ${content.timeContext}
                </div>
                ${content.needs.map(n => `
                    <div class="need-item">
                        <div class="need-dot"></div>
                        <span>${n}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- SECTION 2: CÓMO ACOMPAÑAR -->
        <div class="keys-section">
            <span class="section-label">Cómo acompañarlo mejor</span>
            
            <p style="color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:12px; font-weight:800; text-transform:uppercase;">✔️ Funciona mejor cuando tú...</p>
            ${content.positives.map(p => `
                <div class="advice-box advice-success">${p}</div>
            `).join('')}

            <p style="color:rgba(255,255,255,0.5); font-size:13px; margin:20px 0 12px; font-weight:800; text-transform:uppercase;">⚠️ Conviene evitar</p>
            ${content.negatives.map(n => `
                <div class="advice-box advice-risk">${n}</div>
            `).join('')}
        </div>

        <!-- SECTION 3: FRASES QUE AYUDAN -->
        <div class="keys-section">
            <span class="section-label">Frases que ayudan</span>
            <div style="display:flex; flex-direction:column;">
                ${content.phrases.map(f => `
                    <div class="phrase-pill">"${f}"</div>
                `).join('')}
            </div>
        </div>

        <!-- SECTION 5: RECURSOS -->
        <div class="keys-section" style="margin-bottom:60px;">
            <span class="section-label">Recursos para profundizar</span>
            <div style="display:flex; flex-direction:column; gap:15px;">
                ${content.recommendedResources.map(r => {
        if (r.type === 'Libro') {
            return `
                        <div class="feature-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column;">
                            <div style="display:flex; gap:15px; padding:20px 20px 10px; align-items:center;">
                                <div style="width:60px; height:80px; background:rgba(255,255,255,0.05); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:32px; border:1px solid rgba(255,255,255,0.1);">📚</div>
                                <div style="flex:1;">
                                    <div style="color:rgba(255,255,255,0.4); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:1px;">Libro Recomendado</div>
                                    <div style="color:white; font-size:16px; font-weight:800; line-height:1.2; margin-top:4px;">${r.title}</div>
                                    <div style="color:rgba(255,255,255,0.5); font-size:12px; margin-top:2px;">${r.author}</div>
                                </div>
                            </div>
                            <div style="padding:0 20px 20px; text-align:center;">
                                <p style="color:rgba(255,255,255,0.6); font-size:13px; font-style:italic; line-height:1.4; margin-bottom:15px; border-left:3px solid #F59E0B; padding-left:12px; text-align:left;">
                                    "Te recomendamos este libro porque puede ayudarte especialmente a acompañar a un hijo ${childTemp} en esta etapa."
                                </p>
                                <button onclick="showResourceDetail('${r.id}', '${child.name}', '${childTemp}')" class="btn-primary" style="width:auto; min-width:160px; background:linear-gradient(90deg, #D97706 0%, #F59E0B 100%); border:none; padding:10px 25px; font-size:12px; border-radius:30px; margin:0 auto;">VER LIBRO</button>
                            </div>
                        </div>
                        `;
        } else {
            return `
                        <div class="feature-card" onclick="openExternalResource('${r.url}', '${r.title}', '${r.id}')" style="cursor:pointer; padding:15px; display:flex; gap:15px; align-items:center;">
                            <div style="width:80px; height:50px; background:#0F172A; border-radius:10px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
                                <span style="font-size:20px;">🎬</span>
                                <div style="position:absolute; bottom:4px; right:4px; background:rgba(0,0,0,0.8); color:white; font-size:8px; padding:2px 4px; border-radius:4px; font-weight:800;">${r.meta}</div>
                            </div>
                            <div style="flex:1;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <div style="color:rgba(16, 185, 129, 1); font-size:10px; font-weight:900; text-transform:uppercase;">Vídeo recomendado</div>
                                </div>
                                <div style="color:white; font-size:14px; font-weight:800; margin-top:2px;">${r.title}</div>
                                <div style="color:rgba(255,255,255,0.4); font-size:11px;">${r.author}</div>
                            </div>
                        </div>
                        `;
        }
    }).join('')}
            </div>
        </div>

        <!-- FOOTER -->
        <div style="text-align:center; padding: 0 40px;">
            <p style="color:rgba(255,255,255,0.4); font-size:14px; line-height:1.5; font-style:italic;">
                "Cada hijo necesita un acompañamiento distinto. Educar con amor es aprender a adaptarse a cada uno."
            </p>
        </div>
    </div>
    `;
}

function showResourceDetail(resourceId, childName, temperament) {
    const r = RESOURCES_DB.find(res => res.id === resourceId);
    if (!r) return;

    // Create Modal for Book Detail
    let modal = document.getElementById('book-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'book-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #0F172A; z-index: 20000;
            display: flex; flex-direction: column; overflow-y: auto;
        `;
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="padding: 25px;">
            <button onclick="document.getElementById('book-modal').style.display='none'" style="background:none; border:none; color:rgba(255,255,255,0.5); font-size:14px; font-weight:700; cursor:pointer; padding:0; margin-bottom:30px; display:flex; align-items:center; gap:5px;">
                <span>←</span> Volver
            </button>

            <div style="display:flex; flex-direction:column; align-items:center; text-align:center; margin-bottom:40px;">
                <div style="width:120px; height:160px; background:rgba(255,255,255,0.05); border-radius:20px; display:flex; align-items:center; justify-content:center; font-size:64px; border:1px solid rgba(255,255,255,0.1); margin-bottom:25px; box-shadow:0 15px 35px rgba(0,0,0,0.3);">📚</div>
                <h1 style="color:white; font-size:24px; font-weight:800; margin:0; line-height:1.2;">${r.title}</h1>
                <p style="color:rgba(255,255,255,0.5); font-size:16px; margin-top:8px;">${r.author}</p>
            </div>

            <div style="background:#1E293B; border-radius:24px; padding:25px; margin-bottom:30px;">
                <span class="section-label" style="color:#F59E0B;">¿Por qué este libro para ti?</span>
                <p style="color:white; font-size:15px; line-height:1.6; margin-top:10px;">
                    Te recomendamos esta obra porque puede ayudarte especialmente a acompañar a un hijo <span style="color:#F59E0B; font-weight:700;">${temperament}</span> como ${childName} en su etapa educativa actual.
                </p>
                <div style="margin-top:20px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px;">
                    <span style="color:rgba(255,255,255,0.4); font-size:12px; font-weight:800; text-transform:uppercase;">Aspectos que ayuda a trabajar:</span>
                    <p style="color:#3B82F6; font-size:14px; font-weight:600; margin-top:8px;">${r.aspects}</p>
                </div>
            </div>

            <div style="margin-bottom:40px; padding-bottom:60px;">
                <span class="section-label">Sinopsis Editorial</span>
                <p style="color:rgba(255,255,255,0.7); font-size:15px; line-height:1.7; margin-top:10px;">${r.description}</p>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

function openExternalResource(url, title, resourceId) {
    const reportLinkIssue = (id) => {
        const res = RESOURCES_DB.find(r => r.id === id);
        if (res) {
            res.status = 'broken';
            res.lastChecked = new Date().toISOString().split('T')[0];
            const currentChildId = state.selectedChildId;
            renderConnectionKeys(document.getElementById('main-content'), currentChildId);
        }
    };

    if (confirm(`Vas a salir de PIVOT para ver un contenido en YouTube.\n\n¿Quieres continuar?`)) {
        const win = window.open(url, '_blank');

        setTimeout(() => {
            if (!confirm("¿Pudiste ver el vídeo sin problemas?")) {
                reportLinkIssue(resourceId);
            }
        }, 4000);
    }
}

function generatePedagogicalContent(parentStyle, childTemp, age) {
    const hour = new Date().getHours();
    let timeContext = "Momento del día";
    let timeIcon = "🕒";
    let timeNeeds = [];

    // Time context logic
    if (hour >= 6 && hour < 12) {
        timeContext = "Ritmo de mañana";
        timeIcon = "🌅";
        timeNeeds = ["Previsibilidad en la rutina", "Conexión antes de la separación"];
    } else if (hour >= 12 && hour < 20) {
        timeContext = "Vuelta a casa / Tarde";
        timeIcon = "🌇";
        timeNeeds = ["Descompresión tras el colegio", "Tiempo de juego no dirigido"];
    } else {
        timeContext = "Cierre del día / Sueño";
        timeIcon = "🌙";
        timeNeeds = ["Bajar revoluciones sensoriales", "Ritual de seguridad"];
    }

    const stageKey = age <= 3 ? 'bebe' : (age <= 6 ? 'infantil' : (age <= 12 ? 'primaria' : 'adolescente'));

    // DEVELOPMENTAL STAGES AI LOGIC
    const getStageLogic = (age, temperament, parentStyle) => {
        if (age <= 3) {
            return {
                intro: "A esta edad, su cerebro procesa el mundo a través de tus gestos y tu contacto físico.",
                baseNeeds: ["Seguridad en el vínculo", "Regulación emocional externa", "Rutinas de descanso estables"],
                positives: ["Usar un tono de voz suave y cadencioso.", "Anticipar cambios con contacto físico.", "Validación de su llanto como comunicación."],
                negatives: ["Ignorar su demanda por miedo a 'malacostumbrar'.", "Sobrestimular con demasiadas pantallas o ruido.", "Esperar razonamientos lógicos que no puede tener."],
                phrases: ["Estás a salvo, papá/mamá está aquí.", "Entiendo que estés cansado, te acompaño.", "Vamos a calmar el cuerpo juntos."]
            };
        } else if (age <= 6) {
            return {
                intro: "Tu hijo está descubriendo que es una persona distinta a ti; tu paciencia es su guía.",
                baseNeeds: ["Límites claros pero amorosos", "Opciones limitadas de elección", "Fomento de la autonomía guiada"],
                positives: ["Dar instrucciones cortas y cara a cara.", "Refuerzar el esfuerzo, no solo el resultado.", "Permitir que elija entre dos opciones válidas."],
                negatives: ["Entrar en luchas de poder innecesarias.", "Usar etiquetas negativas ante su conducta.", "Comparar su ritmo con el de otros niños."],
                phrases: ["Tú puedes hacerlo solo, yo te miro.", "Entiendo que estés enfadado, pero no puedes pegar.", "Dime con palabras qué necesitas."]
            };
        } else if (age <= 12) {
            return {
                intro: "A esta edad busca entender el 'por qué' de las cosas y sentirse capaz en el mundo.",
                baseNeeds: ["Pertenencia y contribución", "Desarrollo de habilidades sociales", "Estructura que permita responsabilidad"],
                positives: ["Pedir su opinión en temas familiares.", "Establecer acuerdos y consecuencias pactadas.", "Escuchar sus argumentos antes de decidir."],
                negatives: ["Sermonear largamente sin escucharle.", "Invalidar sus problemas sociales por 'infantiles'.", "Resolverle problemas que ya puede gestionar solo."],
                phrases: ["Me importa tu opinión, cuéntame.", "¿Qué solución se te ocurre para esto?", "Confío en que sabrás gestionarlo."]
            };
        } else {
            return {
                intro: "Tu papel cambia de guía a consultor apasionado por su bienestar futuro.",
                baseNeeds: ["Privacidad y espacio personal", "Validación de su identidad propia", "Comunicación basada en el respeto mutuo"],
                positives: ["Ofrecer apoyo sin ser invasivo.", "Mantener la calma ante su reactividad.", "Interesarse por sus gustos genuinamente."],
                negatives: ["Juzgar sus amistades o intereses.", "Invadir su espacio sin previo aviso.", "Castigar sin ofrecer diálogo posterior."],
                phrases: ["Aquí estoy si me necesitas.", "Respeto tu espacio, hablamos cuando estés listo.", "Te quiero por quién eres."]
            };
        }
    };

    const pattern = getStageLogic(age, childTemp, parentStyle);

    // AI VALIDATION ENGINE: Ensures content availability and pedagogical alignment
    const validateResourceAvailability = (resources) => {
        return resources.filter(r => {
            // In a production environment, this would call a PIVOT cloud function 
            // that checks YouTube/Video APIs for 200 OK status and availability.
            const isVerified = r.status === 'verified';
            const isRecent = new Date(r.lastChecked) > new Date('2026-01-01');
            return isVerified && isRecent;
        });
    };

    // Fine-tune according to Temperament/Style
    if (childTemp === 'Intenso') {
        pattern.baseNeeds.unshift("Canalización de energía física");
        pattern.positives.unshift("Mantener la calma cuando él escala.");
    } else if (childTemp === 'Sensible') {
        pattern.baseNeeds.unshift("Validación emocional profunda");
        pattern.positives.unshift("Anticipar cambios con mucha suavidad.");
    }

    // RESOURCE SELECTION & VALIDATION
    const potentialResources = RESOURCES_DB.filter(r =>
        r.ageGroups && r.ageGroups.includes(stageKey) &&
        r.parentStyles && r.parentStyles.includes(parentStyle)
    );

    // Balanced selection: At most 1 Video, rest are Books/others
    const validResources = validateResourceAvailability(potentialResources);

    const videos = validResources.filter(r => r.type === 'Vídeo').sort(() => Math.random() - 0.5);
    const books = validResources.filter(r => r.type === 'Libro').sort(() => Math.random() - 0.5);

    const recommendedResources = [];
    if (videos.length > 0) recommendedResources.push(videos[0]);
    if (books.length > 0) recommendedResources.push(books[0]);

    // Merge time-based needs with pedagogical needs
    const finalNeeds = [...timeNeeds.slice(0, 1), ...pattern.baseNeeds.slice(0, 2)];

    return { ...pattern, needs: finalNeeds, timeContext, timeIcon, recommendedResources };
}

window.showResourceDetail = showResourceDetail;
window.openExternalResource = openExternalResource;
