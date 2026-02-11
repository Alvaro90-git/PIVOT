function renderSplash(container) {
    container.innerHTML = `
    <style>
        .splash-view {
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0B2428; /* Dark teal background */
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            overflow: hidden;
        }

        .splash-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: kenBurns 4s ease-out forwards;
        }

        @keyframes kenBurns {
            0% { transform: scale(1.1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1); }
        }
    </style>
    <div class="splash-view">
        <img src="Logo_Portada_app.png" class="splash-image" alt="PIVOT Splash">
    </div>
    `;

    // Transition after 3 seconds
    setTimeout(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding_v1');
        window.setView(hasSeenOnboarding ? 'login' : 'onboarding');
    }, 3000);
}
