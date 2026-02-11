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
