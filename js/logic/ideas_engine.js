function getIdeasContext() {
    const now = new Date();
    const currentHour = now.getHours();
    const dayOfWeek = now.getDay();

    let moment = 'NOCHE';
    for (const [key, m] of Object.entries(IDEAS_DB.MOMENTS)) {
        if (m.hours.includes(currentHour)) {
            moment = key;
            break;
        }
    }

    return {
        moment,
        momentLabel: IDEAS_DB.MOMENTS[moment].label,
        dayOfWeek,
        isWeekend: [0, 6].includes(dayOfWeek)
    };
}

function getPersonalizedIdeas() {
    const context = getIdeasContext();
    const adultProfile = state.parentProfile || 'CALMADO';

    const childrenAges = state.children.length > 0 ? state.children.map(c => c.age) : [0];
    const minAge = Math.min(...childrenAges);
    const maxAge = Math.max(...childrenAges);

    // Pick exactly one Juego and one Cuento
    const types = ['Juego', 'Cuento'];
    const selected = [];

    types.forEach(type => {
        let candidates = IDEAS_DB.ACTIVITIES.filter(act => {
            if (act.type !== type) return false;

            // Age compatibility
            const ageOverlap = act.min_age <= maxAge && act.max_age >= minAge;
            if (!ageOverlap) return false;

            // Adult profile compatibility
            if (!act.adult_profiles.includes(adultProfile)) return false;

            return true;
        });

        if (candidates.length === 0) {
            candidates = IDEAS_DB.ACTIVITIES.filter(act => act.type === type);
        }

        if (candidates.length > 0) {
            selected.push(candidates[0]);
        }
    });

    return selected;
}

function generateAIStory(idea) {
    const config = state.storyConfig || { theme: 'Aventura', characters: [] };
    const validChars = config.characters.filter(c => c.trim() !== '');

    // Default protagonists if none provided
    const protagonists = validChars.length > 0 ? validChars : (state.children.length > 0 ? state.children.map(c => c.name) : ['dos valientes exploradores']);

    const theme = config.theme;
    const settings = {
        'Aventura': 'las Tierras del Horizonte Infinito',
        'Risa': 'el Valle de las Cosquillas Eternas',
        'Autonomía': 'la Cumbre del Amanecer Propio',
        'Superación': 'el Sendero de los Desafíos Olvidados',
        'Obediencia': 'el Reino del Orden Armónico',
        'Generosidad': 'el Manantial de los Corazones Abiertos'
    };

    const setting = settings[theme] || 'un paraje de leyenda';
    const mainProtagonist = protagonists[0];
    const supportingProtagonists = protagonists.slice(1);

    let storyContent = `Había una vez en ${setting}, un lugar donde el tiempo parecía detenerse para escuchar el susurro de las estrellas, un grupo unido por un vínculo inquebrantable. Este grupo estaba liderado por ${mainProtagonist}, cuya curiosidad siempre les guiaba hacia lo desconocido. A su lado, ${supportingProtagonists.join(' y ')} aportaban la fuerza y la alegría necesarias para enfrentar cualquier tempestad.\n\n`;

    storyContent += `Cierto día, una extraña neblina cubrió el horizonte. No era una neblina común; era un desafío enviado por los antiguos guardianes de ${setting}. El mensaje era claro: para que el sol volviera a brillar, debían demostrar la verdadera esencia de la ${theme}. ${mainProtagonist} miró a sus compañeros y supo que esta no sería una simple caminata, sino una prueba de su carácter y de la profundidad de su amistad.\n\n`;

    storyContent += `El primer encuentro fue con el Guardián del Silencio. Este les pidió que cruzaran el Puente de Cristal, que solo se mantenía firme si el grupo actuaba con absoluta ${theme}. ${protagonists[1] || mainProtagonist} dio el primer paso, sintiendo cómo la estructura vibraba bajo sus pies. Comprendieron que no bastaba con caminar juntos; debían sintonizar sus corazones. La ${theme} no era una regla impuesta, sino un lenguaje de respeto mutuo que les permitía avanzar cuando otros habrían retrocedido.\n\n`;

    storyContent += `Más adelante, en el Bosque de los Reflejos, se toparon con sus propias dudas. Las sombras parecían hablarles de fracaso, pero ${protagonists[2] || mainProtagonist} recordó al grupo por qué habían empezado este viaje. "Nuestra fuerza no reside en la ausencia de miedo", dijo con voz firme, "sino en nuestra capacidad de superarlo juntos a través de la ${theme}". Fue en ese instante cuando la neblina empezó a disiparse, revelando senderos de luz que antes eran invisibles a sus ojos.\n\n`;

    storyContent += `La aventura continuó a través de valles donde las flores cantaban historias de antiguos héroes. ${mainProtagonist} y ${supportingProtagonists.join(' y ')} se dieron cuenta de que cada paso que daban les transformaba. Ya no solo buscaban salvar su hogar; estaban descubriendo facetas de sí mismos que desconocían. La ${theme} se había convertido en su brújula, una guía interna que les recordaba que cada acto de bondad y cada decisión valiente dejaba una huella en el mundo.\n\n`;

    storyContent += `Finalmente, alcanzaron el Templo de la Sabiduría en la cima más alta de ${setting}. Allí, no encontraron un tesoro de oro, sino un gran libro con las páginas en blanco. El Gran Guardián les explicó que su victoria no estribaba en llegar, sino en los capítulos que habían escrito con sus acciones durante el camino. La ${theme} que habían practicado con tanta pureza era la tinta con la que se escribiría el futuro de su reino.\n\n`;

    storyContent += `De regreso a casa, mientras las luces del hogar empezaban a vislumbrarse en la distancia, el grupo caminaba con una nueva serenidad. ${mainProtagonist} sabía que, independientemente de los retos futuros, siempre tendrían la ${theme} como aliada. ${supportingProtagonists.join(' y ')} sonrieron, comprendiendo que el verdadero viaje acababa de empezar en su día a día.\n\n`;

    storyContent += `Al cruzar el umbral de su puerta, la paz regresó a ${setting}. Pero la historia de ${protagonists.join(', ')} no terminó allí, pues se contaba de generación en generación como el ejemplo máximo de lo que seres unidos pueden lograr cuando el corazón late al ritmo de la ${theme}. Y así, bajo el manto protector de una noche estrellada, el mundo de PIVOT celebró una vez más el triunfo de la voluntad y el amor. Colorín colorado, esta lección de vida nunca será olvidada.`;

    return {
        title: `La Odisea de la ${theme} en ${setting}`,
        content: storyContent,
        metadata: {
            virtue: theme,
            pillar: theme,
            duration: `8 min`
        }
    };
}
