function renderNowInFamily(container) {
    const context = getIdeasContext();
    const ideas = getPersonalizedIdeas();

    container.innerHTML = `
    <style>
        .now-in-family-view {
            background: #0F172A;
            color: #F8FAFC;
            font-family: 'Plus Jakarta Sans', sans-serif;
            padding-bottom: 120px;
        }
        .moment-header {
            padding: 40px 25px 30px;
            background: linear-gradient(to bottom, #1E293B, #0F172A);
        }
        .moment-tag {
            background: rgba(245, 158, 11, 0.15);
            color: #F59E0B;
            padding: 6px 14px;
            border-radius: 99px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: inline-block;
            border: 1px solid rgba(245, 158, 11, 0.2);
        }
        
        .cards-container {
            padding: 0 25px;
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .pivot-card {
            background: linear-gradient(145deg, #1E293B, #0F172A);
            border-radius: 32px;
            padding: 24px;
            color: #F8FAFC;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            display: flex;
            flex-direction: column;
            min-height: 320px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.05);
        }
        
        .pivot-card.featured {
            border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .card-title {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 900;
            margin: 0 0 16px 0;
            color: white;
            letter-spacing: -0.5px;
        }

        .card-image-wrapper {
            width: 100%;
            height: 200px;
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 20px;
            background: rgba(255,255,255,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-desc {
            font-size: 15px;
            line-height: 1.6;
            color: rgba(255,255,255,0.7);
            margin-bottom: 24px;
            flex-grow: 1;
        }

        .card-footer {
            display: flex;
            align-items: center;
            margin-top: auto;
            gap: 12px;
        }

        .pill-category {
            background: rgba(245, 158, 11, 0.15);
            color: #F59E0B;
            font-size: 11px;
            font-weight: 800;
            padding: 6px 14px;
            border-radius: 99px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid rgba(245, 158, 11, 0.2);
        }
        
        .card-age {
            font-size: 13px;
            font-weight: 700;
            color: rgba(255,255,255,0.5);
            flex-grow: 1;
        }

        .heart-icon {
            color: #F59E0B;
            font-size: 18px;
            opacity: 0.8;
        }

        .btn-pivot-orange {
            background: linear-gradient(90deg, #EA580C 0%, #FB923C 100%);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 18px;
            font-weight: 900;
            font-size: 14px;
            letter-spacing: 0.5px;
            box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4);
            cursor: pointer;
            width: 100%;
            margin-bottom: 20px;
            text-transform: uppercase;
        }
    </style>

    <div class="view scroll-y now-in-family-view">
        <header class="header-compact" style="background:transparent; border:none; z-index:100; padding: 20px 25px; display:flex; align-items:center;">
            <button onclick="setView('home')" style="background:transparent; color:white; border:none; display:flex; align-items:center; gap:8px; cursor:pointer; padding:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
                <span style="font-weight:800; font-size:12px; letter-spacing:1px; text-transform:uppercase;">ATRÁS</span>
            </button>
        </header>

        <div class="moment-header">
            <span class="moment-tag">${context.momentLabel}</span>
            <h1 style="font-size:32px; font-weight:900; font-family:'Outfit', sans-serif; margin:0;">Ahora en Familia</h1>
            <p style="color:rgba(255,255,255,0.5); font-size:16px; margin-top:10px;">Dos propuestas especiales para hoy.</p>
        </div>

        <div class="cards-container">
            ${ideas.map(idea => `
                <div class="pivot-card ${idea.type === 'Cuento' ? 'featured' : ''}">
                    <h2 class="card-title">${idea.title}</h2>
                    
                    <div class="card-image-wrapper">
                        <img src="${idea.image}" class="card-image" alt="${idea.title}" onerror="this.src='https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800'">
                    </div>
                    
                    <p class="card-desc">${idea.desc}</p>
                    
                    ${idea.type === 'Cuento' ? `
                        <button class="btn-pivot-orange" onclick="startStoryInvention('${idea.id}')">INVENTAR CUENTO</button>
                    ` : ''}

                    ${idea.type !== 'Cuento' ? `
                        <div class="card-footer">
                            <span class="pill-category">${idea.category}</span>
                            <span class="card-age">${idea.min_age}-${idea.max_age} años</span>
                            <div class="heart-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

window.startStoryInvention = (ideaId) => {
    const idea = IDEAS_DB.ACTIVITIES.find(a => a.id === ideaId);
    state.currentStorySource = idea;
    // We navigate to the reader for now, but we are ready to insert the 'Invention' steps
    state.view = 'story_creator';
    render();
};
