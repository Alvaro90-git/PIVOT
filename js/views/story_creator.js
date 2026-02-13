import { state } from '../state.js';

import { generateAIStory } from '../logic/ideas_engine.js';

export function renderStoryCreator(container) {
    if (!state.storyConfig) {
        state.storyConfig = {
            theme: 'Aventura',
            characters: ['', '', '', '']
        };
    }

    const themes = [
        { id: 'Aventura', icon: '🚀', label: 'Aventura' },
        { id: 'Risa', icon: '😂', label: 'Risa' },
        { id: 'Autonomía', icon: '🌟', label: 'Autonomía' },
        { id: 'Superación', icon: '💪', label: 'Superación' },
        { id: 'Obediencia', icon: '🤝', label: 'Obediencia' },
        { id: 'Generosidad', icon: '❤️', label: 'Generosidad' }
    ];

    container.innerHTML = `
    <style>
        .story-creator-view {
            background: #0F172A;
            color: #F8FAFC;
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100dvh; /* Mobile height safety */
            padding-bottom: 180px; /* Increased safety margin for scrolling */
            overflow-y: auto;
        }
        .header-section {
            padding: 40px 25px 20px;
            background: linear-gradient(to bottom, #1E293B, #0F172A);
        }
        .creator-title {
            font-family: 'Outfit', sans-serif;
            font-size: 28px;
            font-weight: 900;
            margin: 0;
            color: white;
        }
        
        .section-label {
            font-size: 13px;
            font-weight: 800;
            color: #F59E0B;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 30px 25px 15px;
        }

        .themes-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            padding: 0 25px;
        }
        .theme-card {
            background: #1E293B;
            border-radius: 20px;
            padding: 15px 10px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.05);
            transition: all 0.2s;
            cursor: pointer;
        }
        .theme-card.active {
            background: rgba(245, 158, 11, 0.1);
            border-color: #F59E0B;
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
        }
        .theme-icon { font-size: 24px; margin-bottom: 8px; display: block; }
        .theme-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.8); }
        .theme-card.active .theme-label { color: #F59E0B; }

        .characters-section {
            padding: 0 25px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .char-input-wrapper {
            position: relative;
            background: #1E293B;
            border-radius: 16px;
            padding: 4px 15px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .char-input {
            width: 100%;
            background: transparent;
            border: none;
            color: white;
            padding: 12px 0;
            font-size: 15px;
            font-weight: 600;
            outline: none;
        }
        .char-input::placeholder { color: rgba(255,255,255,0.2); }

        .btn-generate {
            background: linear-gradient(90deg, #EA580C 0%, #FB923C 100%);
            color: white;
            border: none;
            padding: 20px;
            border-radius: 20px;
            font-weight: 900;
            font-size: 16px;
            margin: 40px 25px 20px;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(234, 88, 12, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
            width: calc(100% - 50px);
        }
    </style>

    <div class="view scroll-y story-creator-view">
        <header class="header-compact" style="background:transparent; border:none; padding: 20px 25px;">
            <button onclick="setView('ideas')" style="background:transparent; color:white; border:none; display:flex; align-items:center; gap:8px; cursor:pointer; padding:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
                <span style="font-weight:800; font-size:12px; letter-spacing:1px; text-transform:uppercase;">ATRÁS</span>
            </button>
        </header>

        <div class="header-section">
            <h1 class="creator-title">Inventemos vuestro cuento</h1>
            <p style="color:rgba(255,255,255,0.5); font-size:15px; margin-top:10px;">Configurad los ingredientes de la aventura.</p>
        </div>

        <div class="section-label">1. ¿Qué tipo de cuento queréis?</div>
        <div id="tour-story-themes" class="themes-grid">
            ${themes.map(t => `
                <div class="theme-card ${state.storyConfig.theme === t.id ? 'active' : ''}" onclick="selectStoryTheme('${t.id}')">
                    <span class="theme-icon">${t.icon}</span>
                    <span class="theme-label">${t.label}</span>
                </div>
            `).join('')}
        </div>

        <div class="section-label">2. ¿Quiénes son los protagonistas?</div>
        <div id="tour-story-chars" class="characters-section">
            ${state.storyConfig.characters.map((name, i) => `
                <div class="char-input-wrapper">
                    <input type="text" class="char-input" placeholder="Personaje ${i + 1}..." value="${name}" onchange="updateStoryCharacter(${i}, this.value)">
                </div>
            `).join('')}
        </div>

        <button id="tour-story-btn" class="btn-generate" onclick="generateFinalStory()">CREAR CUENTO MÁGICO</button>
    </div>
    `;
}

export function selectStoryTheme(id) {
    state.storyConfig.theme = id;
    if (window.render) window.render();
}

export function updateStoryCharacter(index, value) {
    state.storyConfig.characters[index] = value;
}

export async function generateFinalStory() {
    const btn = document.querySelector('.btn-generate');
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '✨ Generando magia...';

    try {
        console.log("PIVOT: Iniciando generación de cuento...");

        // Llamada asíncrona a la IA real
        const story = await generateAIStory(state.currentStorySource || { title: 'vuestra familia' });

        // Guardar resultado y limpiar inputs
        state.generatedStory = story;
        state.storyConfig.characters = ['', '', '', ''];

        console.log("PIVOT: Cuento recibido, saltando al lector");

        // Usar setView global para asegurar renderizado correcto
        if (window.setView) {
            window.setView('story_reader');
        } else {
            state.view = 'story_reader';
            if (window.render) window.render();
        }

    } catch (error) {
        console.error("PIVOT ERROR: generateFinalStory falló", error);
        alert("Lo sentimos, la magia se ha interrumpido. Reintenta en unos segundos.");
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

window.renderStoryCreator = renderStoryCreator;
window.selectStoryTheme = selectStoryTheme;
window.updateStoryCharacter = updateStoryCharacter;
window.generateFinalStory = generateFinalStory;


