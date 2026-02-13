import { state } from '../state.js';

import { PARENT_TEST_DB } from '../data.js';

let currentTestStep = 0;
let testAnswers = {};

export function startParentTest() {
    currentTestStep = 0;
    testAnswers = {};
    if (window.setView) window.setView('parent_test');
}

export function renderParentTest(container) {
    const question = PARENT_TEST_DB.questions[currentTestStep];
    const totalSteps = PARENT_TEST_DB.questions.length;
    const progress = (currentTestStep / totalSteps) * 100;

    container.innerHTML = `
    <style>
        .test-view {
            background: #0F172A;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 40px 25px 120px;
        }
        .progress-bar-bg {
            height: 6px;
            background: rgba(255,255,255,0.05);
            border-radius: 3px;
            margin-bottom: 40px;
            overflow: hidden;
            flex-shrink: 0;
        }
        .progress-bar-fill {
            height: 100%;
            background: var(--primary-gradient);
            transition: width 0.3s ease;
        }
        .question-num {
            color: var(--primary);
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 12px;
        }
        .question-text {
            color: white;
            font-size: 20px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 30px;
        }
        .option-btn {
            background: #1E293B;
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 16px 20px;
            color: rgba(255,255,255,0.8);
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 10px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .option-btn:active {
            transform: scale(0.98);
            background: #2D3748;
        }
    </style>

    <div class="view test-view scroll-y">
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>

        <div style="flex: 1;">
            <div class="question-num">Pregunta ${currentTestStep + 1} de ${totalSteps}</div>
            <h2 class="question-text">${question.text}</h2>

            <div style="display: flex; flex-direction: column;">
                <button class="option-btn" onclick="handleTestAnswer(1)">Nunca <span>1</span></button>
                <button class="option-btn" onclick="handleTestAnswer(2)">Rara vez <span>2</span></button>
                <button class="option-btn" onclick="handleTestAnswer(3)">A veces <span>3</span></button>
                <button class="option-btn" onclick="handleTestAnswer(4)">A menudo <span>4</span></button>
                <button class="option-btn" onclick="handleTestAnswer(5)">Casi siempre <span>5</span></button>
            </div>
        </div>

        <div style="margin-top: 30px; text-align: center; color: rgba(255,255,255,0.3); font-size: 11px;">
            ⌛ 2-3 minutos • Sin respuestas malas
        </div>
    </div>
    `;
}

export function handleTestAnswer(value) {
    const question = PARENT_TEST_DB.questions[currentTestStep];
    testAnswers[question.dim] = (testAnswers[question.dim] || 0) + value;

    if (currentTestStep < PARENT_TEST_DB.questions.length - 1) {
        currentTestStep++;
        if (window.render) window.render();
    } else {
        calculateTestResult();
    }
}

export function calculateTestResult() {
    const dims = ['reactividad', 'firmeza', 'control', 'estilo', 'reparacion'];

    // Determine profile
    let profileKey = 'CALMADO';

    const avgFirmeza = (testAnswers['firmeza'] || 0) / 3;
    const avgEstilo = (testAnswers['estilo'] || 0) / 3;
    const avgReact = (testAnswers['reactividad'] || 0) / 3;

    if (avgFirmeza > 3.5) profileKey = 'FIRME';
    else if (avgEstilo > 3.5) profileKey = 'DIALOGANTE';
    else if (avgReact < 2.5) profileKey = 'CALMADO';
    else profileKey = 'PROTECTOR';

    const pData = PARENT_TEST_DB.profiles[profileKey];

    state.parentProfile.parentTestResult = {
        style: profileKey,
        title: pData.title,
        desc: pData.desc,
        strength: pData.strength,
        risk: pData.risk,
        lever: pData.lever,
        scores: testAnswers
    };

    state.view = 'parent_test_result';
    if (window.render) window.render();
}

export function renderParentTestResult(container) {
    const result = state.parentProfile.parentTestResult;

    container.innerHTML = `
    <style>
        .result-view {
            background: #0F172A;
            min-height: 100vh;
            padding: 40px 25px 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .profile-badge {
            background: var(--primary-gradient);
            color: white;
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 25px;
        }
        .result-card {
            background: #1E293B;
            border-radius: 28px;
            padding: 30px 20px;
            border: 1px solid rgba(255,255,255,0.08);
            margin-bottom: 30px;
            width: 100%;
        }
        .feat-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            text-align: left;
            margin-bottom: 20px;
        }
    </style>

    <div class="view result-view scroll-y">
        <div style="font-size: 60px; margin-bottom: 20px;">🏆</div>
        <div class="profile-badge">Test Completado</div>
        
        <h1 style="color:white; font-size:28px; font-family:'Outfit', sans-serif; font-weight:800; margin:0 0 10px;">Perfil: ${result.title}</h1>
        <p style="color:rgba(255,255,255,0.5); font-size:15px; line-height:1.5; margin-bottom:30px;">
            ${result.desc}
        </p>

        <div class="result-card">
            <h3 style="color:white; font-size:17px; font-weight:800; margin-bottom:20px; font-family:'Outfit', sans-serif;">Lo que te define</h3>
            
            <div class="feat-item">
                <span style="font-size:22px;">✔️</span>
                <div>
                    <div style="color:white; font-weight:800; font-size:14px;">Fortaleza</div>
                    <div style="color:rgba(255,255,255,0.5); font-size:13px;">${result.strength}</div>
                </div>
            </div>

            <div class="feat-item" style="margin-bottom:0;">
                <span style="font-size:22px;">⚠️</span>
                <div>
                    <div style="color:white; font-weight:800; font-size:14px;">Atención</div>
                    <div style="color:rgba(255,255,255,0.5); font-size:13px;">${result.risk}</div>
                </div>
            </div>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px dashed rgba(16, 185, 129, 0.3); padding: 22px; border-radius: 24px; margin-bottom: 35px; width:100%;">
            <p style="color:white; font-size:15px; font-weight:700; margin:0; line-height:1.4;">"Ahora podemos ayudarte a conectar mejor con cada uno de tus hijos."</p>
        </div>

        <button class="btn-primary" style="width:100%; height:62px; font-weight:900; letter-spacing:1px; border-radius:31px;" onclick="setView('yo')">VER CÓMO CONECTAR CON MIS HIJOS</button>
    </div>
    `;
}

window.startParentTest = startParentTest;
window.renderParentTest = renderParentTest;
window.handleTestAnswer = handleTestAnswer;
window.calculateTestResult = calculateTestResult;
window.renderParentTestResult = renderParentTestResult;


