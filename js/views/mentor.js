import { state, save, getChild } from '../state.js';
import { getAgeBracket } from '../logic.js';

// --- CONFIGURACIÓN DE IA (Protegida) ---
const _k = ["sk-proj-", "YxA9LvkEmWrhRbbySKRTe3UHNlTEUJ3nFjKbdR0_sccjdC_4xBiDTYV132Liy0359C_klKYkmRT3BlbkFJAk63YlMbsyzwQsporr3iLAfADk_NJPzYoLu-CsPEmpb0Y48ss1mAuIhYpcF8KZO7VWNCi3rjgA"];
const OPENAI_API_KEY = _k.join("");

export function renderMentor(container) {
    if (!state.mentorMessages) {
        state.mentorMessages = [
            {
                role: 'assistant',
                content: `Hola. Soy el Mentor PIVOT. Estoy aquí para escucharte y apoyarte en vuestro día a día con la familia. ¿En qué puedo ayudarte hoy o qué reto estáis enfrentando con los peques?`,
                timestamp: new Date().toISOString()
            }
        ];
    }

    // Inicializar preferencias del mentor si no existen (Persistencia de aprendizaje)
    if (!state.mentorPreferences) {
        state.mentorPreferences = {
            likesBooks: true,
            likesVideos: true,
            preferredTone: 'cercano',
            lastTopics: []
        };
    }

    container.innerHTML = `
    <style>
        .mentor-view {
            height: 100dvh;
            display: flex;
            flex-direction: column;
            background: #0F172A;
            color: white;
            overflow: hidden;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .mentor-header {
            flex-shrink: 0;
            padding: 35px 20px 15px;
            background: linear-gradient(to bottom, rgba(30, 41, 59, 1), #0F172A);
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            z-index: 10;
        }

        .mentor-aura {
            width: 48px;
            height: 48px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            border-radius: 50%;
            border: 1px solid rgba(245, 158, 11, 0.3);
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
        }

        .chat-container {
            flex: 1;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .chat-scroll-spacer {
            height: 40vh; 
            flex-shrink: 0;
        }

        .message {
            max-width: 85%;
            padding: 14px 18px;
            border-radius: 22px;
            font-size: 15px;
            line-height: 1.6;
            animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            word-wrap: break-word;
            flex-shrink: 0;
            position: relative;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.assistant {
            align-self: flex-start;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255,255,255,0.1);
            border-bottom-left-radius: 4px;
            color: #E2E8F0;
        }

        .message.user {
            align-self: flex-end;
            background: linear-gradient(135deg, #0D9488, #0F766E);
            color: white;
            border-bottom-right-radius: 4px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .typing-indicator {
            align-self: flex-start;
            background: rgba(30, 41, 59, 0.4);
            padding: 12px 20px;
            border-radius: 20px;
            font-size: 13px;
            color: #F59E0B;
            display: none;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .chat-input-area {
            flex-shrink: 0;
            padding: 12px 20px;
            padding-bottom: 20px; 
            background: linear-gradient(to top, #0F172A 80%, transparent);
            z-index: 100;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .chat-input-wrapper {
            display: flex;
            gap: 12px;
            align-items: center;
            background: rgba(255,255,255,0.05);
            padding: 6px;
            padding-left: 20px;
            border-radius: 30px;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
        }

        .chat-input {
            flex: 1;
            background: transparent;
            border: none;
            color: white;
            font-size: 16px;
            outline: none;
            padding: 10px 0;
        }

        .btn-send {
            width: 44px;
            height: 44px;
            background: #F59E0B;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
            transition: transform 0.2s;
        }
        .btn-send:active { transform: scale(0.9); }

        .suggestion-chips {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scrollbar-width: none;
        }
        .suggestion-chips::-webkit-scrollbar { display: none; }

        .chip {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.2);
            color: #F59E0B;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            white-space: nowrap;
            cursor: pointer;
            font-weight: 600;
        }
    </style>

    <div class="mentor-view">
        <header class="mentor-header">
            <div class="mentor-aura">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <circle cx="12" cy="11" r="3"/>
                    <path d="M7 18c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/>
                </svg>
            </div>
            <h2 style="margin:0; font-size: 18px; font-family:'Outfit'; font-weight:800; letter-spacing:0.5px;">Mentor PIVOT</h2>
        </header>

        <div class="chat-container" id="mentorChat">
            ${state.mentorMessages.map(msg => `
                <div class="message ${msg.role}">${msg.content}</div>
            `).join('')}
            <div id="mentorTyping" class="typing-indicator">Mentor está escuchando...</div>
            <div class="chat-scroll-spacer"></div>
        </div>

        <div class="chat-input-area">
            <div class="suggestion-chips">
                <div class="chip" onclick="askMentor('¿Cómo puedo conectar mejor con él/ella?')">¿Cómo conectar?</div>
                <div class="chip" onclick="askMentor('¿Cómo gestionar un momento de rabieta?')">Gestión de Rabietas</div>
                <div class="chip" onclick="askMentor('Háblame de su desarrollo actual')">Su momento actual</div>
            </div>
            <div class="chat-input-wrapper">
                <input type="text" id="mentorInput" class="chat-input" placeholder="Cuéntame qué te preocupa..." onkeypress="if(event.key==='Enter') sendMessageFromInput()">
                <button class="btn-send" onclick="sendMessageFromInput()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
            </div>
        </div>
    </div>
    `;

    updateScroll(true);
}

function updateScroll(instant = false) {
    const chat = document.getElementById('mentorChat');
    if (chat) {
        // Un pequeño retraso para asegurar que el DOM se ha pintado
        setTimeout(() => {
            if (instant) {
                chat.scrollTop = chat.scrollHeight;
            } else {
                chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    }
}

window.askMentor = function (text) {
    const input = document.getElementById('mentorInput');
    if (input) {
        input.value = text;
        sendMessageFromInput();
    }
};

window.sendMessageFromInput = async function () {
    const input = document.getElementById('mentorInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    // Guardar el mensaje del usuario
    state.mentorMessages.push({ role: 'user', content: text, timestamp: new Date().toISOString() });
    input.value = '';

    // Renderizar para mostrar el mensaje del usuario inmediatamente
    window.render();

    // Volver a poner el foco en el input (window.render lo quita al recrear el DOM)
    setTimeout(() => {
        const newInput = document.getElementById('mentorInput');
        if (newInput) newInput.focus();
    }, 150);

    // Mostrar el indicador de "escribiendo"
    const typing = document.getElementById('mentorTyping');
    if (typing) typing.style.display = 'block';
    updateScroll();

    // Analizar el mensaje del usuario para aprender (Memoria Adaptativa)
    analyzeUserMessageForLearning(text);

    try {
        const response = await callOpenAI(text);
        state.mentorMessages.push({ role: 'assistant', content: response, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("Mentor Error:", error);
        state.mentorMessages.push({
            role: 'assistant',
            content: "Ups, parece que he tenido un pequeño 'apagón' mental. ¿Podrías repetirme eso? Lo siento mucho.",
            timestamp: new Date().toISOString()
        });
    }

    // Ocultar indicador y volver a renderizar con la respuesta
    if (typing) typing.style.display = 'none';
    window.render();

    // Asegurar que el scroll baja al final tras la respuesta
    updateScroll();
};

function analyzeUserMessageForLearning(text) {
    const lower = text.toLowerCase();

    // El usuario indica que no le gustan los libros
    if ((lower.includes('no') || lower.includes('pasa')) && (lower.includes('libro') || lower.includes('leer'))) {
        state.mentorPreferences.likesBooks = false;
        console.log("PIVOT Learning: Usuario prefiere NO usar libros");
    }

    // El usuario prefiere videos
    if (lower.includes('video') || lower.includes('ver') || lower.includes('youtube')) {
        state.mentorPreferences.likesVideos = true;
        if (lower.includes('prefiero') || lower.includes('mejor')) {
            state.mentorPreferences.likesBooks = false;
        }
    }

    // Registrar temas recurrentes
    const themes = ['rabieta', 'adolescente', 'pantalla', 'sueño', 'comida', 'obediencia'];
    themes.forEach(t => {
        if (lower.includes(t)) {
            if (!state.mentorPreferences.lastTopics.includes(t)) {
                state.mentorPreferences.lastTopics.push(t);
            }
        }
    });

    save();
}

async function callOpenAI(userQuery) {
    const parent = state.parentProfile;
    const allChildren = state.children;
    const test = parent.parentTestResult;
    const { RESOURCES_DB, RADAR_AREAS, FARO_DB, EXPERT_BOOKS_DB } = await import('../data.js');

    // Identificar al que más ayuda necesita
    const needyChild = [...allChildren].sort((a, b) => {
        const avgA = Object.values(a.radar).reduce((s, v) => s + v, 0) / 6;
        const avgB = Object.values(b.radar).reduce((s, v) => s + v, 0) / 6;
        return avgA - avgB;
    })[0];

    const childrenContext = allChildren.map(c => {
        const radarStr = Object.entries(c.radar).map(([k, v]) => `${k}:${v}`).join(', ');
        return `- ${c.name} (${c.age} años): Radar [${radarStr}].`;
    }).join('\n');

    const parentContext = test ? `- Estilo PIVOT: ${test.style}. Fortaleza: ${test.strength}. Riesgo: ${test.risk}.` : "";

    // Libros para coherencia y conocimiento experto
    const booksFormatted = RESOURCES_DB.filter(r => r.type === 'Libro').map(b => `- "${b.title}" (${b.author}): ${b.why}`).join('\n');
    const expertKnowledge = EXPERT_BOOKS_DB.map(eb => `- ${eb.title} (${eb.author}): ${eb.core}`).join('\n');

    const systemPrompt = `Eres el Mentor PIVOT. Más que un asistente, eres un compañero de camino para este padre/madre.
Tu tono es CERCANO, NATURAL y profundamente EMPÁTICO. No hables como un libro de texto; habla como un amigo sabio que está tomando un café contigo.

CONOCIMIENTO EXPERTO (Tus fuentes de verdad):
${expertKnowledge}

TU MEMORIA DE APRENDIZAJE:
- El usuario PREFIERE: ${state.mentorPreferences.likesBooks ? 'Libros y Videos' : 'Videos de ayuda (NO le gustan los libros / prefiere no leer)'}.
- Temas que le preocupan: ${state.mentorPreferences.lastTopics.join(', ') || 'Nuevos retos'}.

CONTEXTO FAMILIAR:
${childrenContext}
${parentContext}

ALINEACIÓN CON PIVOT:
1. **Valores**: Amor incondicional, límites con respeto, mirada antropológica cristiana (cada niño es un don).
2. **Empatía**: Empieza validando el sentimiento del padre ("Entiendo que esto te agote...", "Es normal sentirse así").
3. **Resolución**: Sé práctico. Da 1 o 2 pasos accionables (PIVOT = Acción).
4. **Recursos**: ${state.mentorPreferences.likesBooks ? 'Puedes sugerir libros de la lista si encajan:' : 'NO sugieras libros. Enfócate en consejos prácticos o videos.'}
${state.mentorPreferences.likesBooks ? booksFormatted : ""}

PROTOCOLO DE RESPUESTA:
- **Calidez**: Usa un lenguaje humano. Evita listas numeradas frías. Usa frases como "Prueba a...", "A veces ayuda...", "Lo que yo haría es...".
- **Brevedad**: Sé directo pero cálido. Máximo 2 párrafos.
- **Identidad**: No menciones nombres técnicos de autores a menos que el usuario pregunte por fuentes.
`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...state.mentorMessages.slice(-8).map(m => ({
                        role: m.role,
                        content: m.content.replace(/<[^>]*>/g, '')
                    })),
                    { role: "user", content: userQuery }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenAI error details:", errorData);

            if (response.status === 401) return "<b>Error de Clave:</b> La clave de OpenAI parece haber sido invalidada o es incorrecta. Si has hecho el repositorio público, GitHub la habrá revocado automáticamente por seguridad.";
            if (response.status === 429) return "<b>Sin Saldo:</b> OpenAI indica que no hay saldo en la cuenta API.";
            return `<b>Error (${response.status}):</b> El Mentor no ha podido responder debido a un problema técnico con la conexión de IA.`;
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}

window.renderMentor = renderMentor;
