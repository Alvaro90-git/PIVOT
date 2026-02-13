import { state } from '../state.js';

import { getIdeasContext, getPersonalizedIdeas } from '../logic/ideas_engine.js';
import { IDEAS_DB } from '../data.js';

export async function renderNowInFamily(container) {
    const context = getIdeasContext();

    // Si NO hay NADA en caché, mostramos estado de carga (primera vez absoluta)
    if (!state.cachedIdeas) {
        container.innerHTML = `
        <div class="view now-in-family-view" style="z-index: 9999; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px;">
            <div class="breathing-circle" style="width:80px; height:80px; margin-bottom:20px;">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 3s linear infinite;">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                 </svg>
            </div>
            <h2 style="font-family:'Outfit'; font-weight:900; color:white; margin:0;">Generando inspiración...</h2>
        </div>`;
    }

    // Al existir caché en ideas_engine.js, esta llamada resuelve instantáneamente los datos guardados
    const ideas = await getPersonalizedIdeas();

    container.innerHTML = `
    <style>
        .now-in-family-view {
            background: #020617;
            color: #F8FAFC;
            font-family: 'Plus Jakarta Sans', sans-serif;
            padding-bottom: 120px;
            background-image: 
                radial-gradient(at 0% 0%, hsla(253, 16%, 15%, 1) 0, transparent 60%),
                radial-gradient(at 100% 0%, hsla(225, 39%, 20%, 1) 0, transparent 60%);
        }
        
        .moment-header {
            padding: 20px 25px 30px;
            text-align: left;
        }

        .cards-container {
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .pivot-card {
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 32px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .card-header-image {
            width: 100%;
            height: 180px;
            position: relative;
            background: #1e293b;
        }

        .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.8;
        }

        .card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 60%);
        }

        .pill-type {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(245, 158, 11, 0.2);
            backdrop-filter: blur(10px);
            color: #F59E0B;
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .card-body {
            padding: 24px;
            padding-top: 10px;
        }

        .card-title {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 900;
            color: white;
            margin: 0 0 12px 0;
            line-height: 1.2;
        }

        .card-desc {
            font-size: 15px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 25px;
            font-weight: 500;
        }

        .card-meta-row {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.5);
        }

        .meta-icon { color: #F59E0B; }

        .btn-pivot-premium {
            background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
            color: white;
            border: none;
            padding: 16px;
            border-radius: 20px;
            font-weight: 900;
            font-size: 14px;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            width: 100%;
            box-shadow: 0 10px 20px rgba(217, 119, 6, 0.3);
        }
    </style>

    <div class="view scroll-y now-in-family-view" style="z-index: 9999;">
        <header class="header-compact" style="background:transparent; padding: 25px 25px; display:flex; align-items:center;">
            <button onclick="setView('home')" style="background:rgba(255,255,255,0.1); color:white; border:none; width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
            </button>
            <div style="margin-left:15px;">
                <span style="font-weight:900; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#F59E0B;">${context.momentLabel}</span>
            </div>
        </header>

        <div class="moment-header" style="margin-top:-10px;">
            <h1 style="font-size:36px; font-weight:900; font-family:'Outfit', sans-serif; margin:0; line-height:1.1;">Ahora en Familia</h1>
            <p style="color:rgba(255,255,255,0.6); font-size:17px; margin-top:10px; font-weight:500;">Propuestas personalizadas según vuestro momento.</p>
        </div>

        <div id="tour-ideas-container" class="cards-container">
            ${ideas.map((idea, index) => `
                <div class="pivot-card">
                    <div class="card-header-image">
                        <img src="${idea.image}" class="card-image" alt="${idea.title}">
                        <div class="card-overlay"></div>
                        <span class="pill-type">${idea.type}</span>
                    </div>
                    
                    <div class="card-body">
                        <h2 class="card-title">${idea.title}</h2>
                        <p class="card-desc">${idea.desc}</p>
                        
                        <div class="card-meta-row">
                            <div class="meta-item">
                                <span class="meta-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                </span>
                                ${idea.category}
                            </div>
                        </div>

                        ${idea.type === 'Cuento' ? `
                            <button id="${index === 0 ? 'tour-create-story-btn' : ''}" class="btn-pivot-premium" onclick="startStoryInvention('${idea.id}')">Crear Cuento</button>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

export function startStoryInvention(ideaId) {
    console.log("Iniciando invención de cuento para ID:", ideaId);

    // Buscar la idea en la base de datos o en el caché de la IA
    let idea = IDEAS_DB.ACTIVITIES.find(a => a.id === ideaId);
    if (!idea && state.cachedIdeas) {
        idea = state.cachedIdeas.find(i => i.id === ideaId);
    }

    // Si no se encuentra, creamos un objeto mínimo
    if (!idea) idea = { title: 'vuestra aventura', id: ideaId };

    state.currentStorySource = idea;
    state.view = 'story_creator';

    if (window.render) window.render();
}

window.renderNowInFamily = renderNowInFamily;
window.startStoryInvention = startStoryInvention;

