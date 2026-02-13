import { state } from '../state.js';


export function renderStoryReader(container) {
    if (!state.currentStorySource) {
        setView('ideas');
        return;
    }

    const story = state.generatedStory || { title: 'Cargando...', content: 'Preparando tu aventura...', metadata: { virtue: '', pillar: '', duration: '' } };
    const fontSize = state.storyFontSize || 18;
    const isDark = state.storyDarkMode !== false;

    container.innerHTML = `
    <style>
        .reader-view {
            background: ${isDark ? '#0F172A' : '#F8FAFC'};
            color: ${isDark ? 'white' : '#1E293B'};
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: all 0.3s;
        }
        .reader-header {
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
            position: sticky;
            top: 0;
            background: ${isDark ? '#0F172A' : '#F8FAFC'};
            z-index: 100;
        }
        .reader-content {
            padding: 40px 25px 120px;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.8;
            font-size: ${fontSize}px;
            white-space: pre-wrap;
        }
        .reader-controls {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
            backdrop-filter: blur(10px);
            padding: 10px 20px;
            border-radius: 99px;
            display: flex;
            gap: 20px;
            align-items: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
        }
        .control-btn {
            background: transparent;
            border: none;
            color: ${isDark ? 'white' : '#1E293B'};
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .virtue-tag {
            display: inline-block;
            background: #F59E0B;
            color: white;
            padding: 2px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 20px;
        }
    </style>

    <div class="view scroll-y reader-view">
        <header class="reader-header">
            <button onclick="setView('ideas')" style="background:transparent; color:${isDark ? 'white' : '#1E293B'}; border:none; display:flex; align-items:center; gap:8px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                <span style="font-weight:800; font-size:12px;">VOLVER</span>
            </button>
            <h2 style="font-family:'Outfit', sans-serif; font-size:16px; margin:0;">Cuento Personalizado</h2>
            <div style="width:40px;"></div>
        </header>

        <div class="reader-content">
            <span class="virtue-tag">${story.metadata.virtue}</span>
            <h1 style="font-family:'Outfit', sans-serif; font-size:32px; font-weight:900; margin:0 0 30px;">${story.title}</h1>
            <div style="opacity: 0.9;">${story.content}</div>
        </div>
    </div>
    `;
}

export function adjustFontSize(delta) {
    state.storyFontSize = (state.storyFontSize || 18) + delta;
    if (state.storyFontSize < 12) state.storyFontSize = 12;
    if (state.storyFontSize > 32) state.storyFontSize = 32;
    render();
}

export function toggleReaderMode() {
    state.storyDarkMode = state.storyDarkMode === false;
    render();
}

export function saveStory() {
    alert("¡Cuento guardado en tus favoritos! ✨");
}

window.renderStoryReader = renderStoryReader;
window.adjustFontSize = adjustFontSize;
window.toggleReaderMode = toggleReaderMode;
window.saveStory = saveStory;


