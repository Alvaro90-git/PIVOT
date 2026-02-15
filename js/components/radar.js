import { RADAR_AREAS, DIAGNOSIS_MATRIX } from '../data.js';
import { getSmartTarget } from '../logic.js';

export function getRadarSVG(child) {
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

window.getRadarSVG = getRadarSVG;

export function getParentRadarSVG(parent) {
   if (!parent || !parent.radar) return '';
   const toRad = (deg) => (deg * Math.PI) / 180;

   const size = 300;
   const c = size / 2;
   const radius = 85;

   const areas = {
      serenidad: 'Serenidad',
      firmeza_afectuosa: 'Firmeza',
      conexion: 'Conexión',
      reparacion: 'Reparación',
      ejemplo: 'Ejemplo'
   };
   const keys = Object.keys(areas);
   const angleStep = 360 / keys.length;

   let polyPoints = [];
   let targetPoints = [];
   let axesSvg = '';

   keys.forEach((key, i) => {
      const angle = i * angleStep - 90;
      const val = parent.radar[key] || 1;
      const target = 4.5; // Mastery target for parents

      const rVal = (val / 5) * radius;
      const rTarget = (target / 5) * radius;

      const xVal = c + rVal * Math.cos(toRad(angle));
      const yVal = c + rVal * Math.sin(toRad(angle));
      polyPoints.push(`${xVal},${yVal}`);

      const xTarget = c + rTarget * Math.cos(toRad(angle));
      const yTarget = c + rTarget * Math.sin(toRad(angle));
      targetPoints.push(`${xTarget},${yTarget}`);

      // Axis
      const xOuter = c + radius * Math.cos(toRad(angle));
      const yOuter = c + radius * Math.sin(toRad(angle));
      axesSvg += `<line x1="${c}" y1="${c}" x2="${xOuter}" y2="${yOuter}" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />`;

      // Label
      const labelR = radius + 25;
      const xLabel = c + labelR * Math.cos(toRad(angle));
      const yLabel = c + labelR * Math.sin(toRad(angle));

      axesSvg += `
      <text x="${xLabel}" y="${yLabel}" fill="rgba(215,215,225,0.7)" font-size="9" font-weight="900" text-anchor="middle" dominant-baseline="middle" style="text-transform:uppercase; letter-spacing:0.5px;">
         ${areas[key]}
      </text>`;
   });

   return `
   <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="margin: 0 auto; display: block;">
      ${[1, 2, 3, 4, 5].map(l => `<circle cx="${c}" cy="${c}" r="${(l / 5) * radius}" fill="none" stroke="rgba(255,255,255,0.05)" />`).join('')}
      ${axesSvg}
      
      <!-- TARGET POLYGON (MAESTRÍA) -->
      <path d="M ${targetPoints.join(' L ')} Z" fill="rgba(34, 211, 238, 0.05)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="1.5" stroke-dasharray="4 2" />
      
      <!-- CURRENT POLYGON -->
      <path d="M ${polyPoints.join(' L ')} Z" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" stroke-width="3" stroke-linejoin="round" />
      
      ${keys.map((key, i) => {
      const angle = i * angleStep - 90;
      const val = parent.radar[key] || 1;
      const rVal = (val / 5) * radius;
      const x = c + rVal * Math.cos(toRad(angle));
      const y = c + rVal * Math.sin(toRad(angle));
      return `<circle cx="${x}" cy="${y}" r="4.5" fill="#F59E0B" stroke="#0F172A" stroke-width="2" />`;
   }).join('')}

      <!-- LEGEND -->
      <g transform="translate(${c - 60}, ${size - 10})">
         <circle cx="0" cy="0" r="3" fill="#F59E0B" />
         <text x="8" y="4" fill="rgba(255,255,255,0.4)" font-size="9" font-weight="700">ACTUAL</text>
         <circle cx="65" cy="0" r="3" fill="none" stroke="#22d3ee" stroke-width="1" />
         <text x="73" y="4" fill="rgba(255,255,255,0.4)" font-size="9" font-weight="700">META</text>
      </g>
   </svg>
   `;
}

window.getParentRadarSVG = getParentRadarSVG;

export function getHarmonyRadarSVG(parentData, childData, childAge = 5, coParentData = null) {
   if (!parentData || !childData) return '';
   const ageMatrix = DIAGNOSIS_MATRIX[childAge] || DIAGNOSIS_MATRIX[5];
   const toRad = (deg) => (deg * Math.PI) / 180;

   const size = 300;
   const c = size / 2;
   const radius = 80;

   const axes = [
      { name: 'Regulación', pKey: 'serenidad', cKey: 'autocontrol' },
      { name: 'Autoridad', pKey: 'firmeza_afectuosa', cKey: 'respeto' },
      { name: 'Vínculo', pKey: 'conexion', cKey: 'social' },
      { name: 'Autonomía', pKey: 'ejemplo', cKey: 'autonomia' },
      { name: 'Compromiso', pKey: 'reparacion', cKey: 'responsabilidad' }
   ];

   const angleStep = 360 / axes.length;
   let pPoints = [];
   let coPoints = [];
   let cPoints = [];
   let targetPoints = [];
   let axesSvg = '';

   axes.forEach((axis, i) => {
      const angle = i * angleStep - 90;
      const pVal = parentData[axis.pKey] || 1;
      const coVal = coParentData ? (coParentData[axis.pKey] || 1) : null;
      const cVal = childData[axis.cKey] || 1;
      const targetVal = ageMatrix[axis.cKey]?.target || 4.5; // Meta específica por edad de la Matriz MICP

      const pRadius = (pVal / 5) * radius;
      const coRadius = coVal !== null ? (coVal / 5) * radius : null;
      const cRadius = (cVal / 5) * radius;
      const tRadius = (targetVal / 5) * radius;

      const px = c + pRadius * Math.cos(toRad(angle));
      const py = c + pRadius * Math.sin(toRad(angle));
      pPoints.push(`${px},${py}`);

      if (coRadius !== null) {
         const cox = c + coRadius * Math.cos(toRad(angle));
         const coy = c + coRadius * Math.sin(toRad(angle));
         coPoints.push(`${cox},${coy}`);
      }

      const cx = c + cRadius * Math.cos(toRad(angle));
      const cy = c + cRadius * Math.sin(toRad(angle));
      cPoints.push(`${cx},${cy}`);

      const tx = c + tRadius * Math.cos(toRad(angle));
      const ty = c + tRadius * Math.sin(toRad(angle));
      targetPoints.push(`${tx},${ty}`);

      // Axis Line
      const ox = c + radius * Math.cos(toRad(angle));
      const oy = c + radius * Math.sin(toRad(angle));
      axesSvg += `<line x1="${c}" y1="${c}" x2="${ox}" y2="${oy}" stroke="rgba(255,255,255,0.05)" stroke-width="1" />`;

      // Label
      const lx = c + (radius + 20) * Math.cos(toRad(angle));
      const ly = c + (radius + 20) * Math.sin(toRad(angle));
      axesSvg += `<text x="${lx}" y="${ly}" fill="rgba(255,255,255,0.4)" font-size="8" font-weight="800" text-anchor="middle" dominant-baseline="middle" style="text-transform:uppercase;">${axis.name}</text>`;
   });

   return `
   <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="margin:0 auto; display:block;">
      ${[1, 2, 3, 4, 5].map(l => `<circle cx="${c}" cy="${c}" r="${(l / 5) * radius}" fill="none" stroke="rgba(255,255,255,0.05)" />`).join('')}
      ${axesSvg}
      
      <!-- COMMON GOAL (DASHED) -->
      <path d="M ${targetPoints.join(' L ')} Z" fill="none" stroke="rgba(34, 211, 238, 0.4)" stroke-width="1.5" stroke-dasharray="4 2" />

      <!-- CHILD AREA -->
      <path d="M ${cPoints.join(' L ')} Z" fill="rgba(34, 211, 238, 0.15)" stroke="#3B82F6" stroke-width="2" stroke-linejoin="round" />
      
      ${coParentData ? `
      <!-- CO-PARENT AREA (DASHED) -->
      <path d="M ${coPoints.join(' L ')} Z" fill="none" stroke="rgba(167, 139, 250, 0.6)" stroke-width="2" stroke-dasharray="2 2" />
      ` : ''}

      <!-- PARENT AREA -->
      <path d="M ${pPoints.join(' L ')} Z" fill="rgba(245, 158, 11, 0.25)" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round" />
      
      <!-- LEGEND -->
      <g transform="translate(${c - 95}, ${size - 10})">
         <circle cx="0" cy="0" r="3" fill="#F59E0B" />
         <text x="8" y="4" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="700">TÚ</text>
         
         ${coParentData ? `
         <circle cx="35" cy="0" r="3" fill="none" stroke="#A78BFA" stroke-width="1" stroke-dasharray="1 1" />
         <text x="43" y="4" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="700">OTRO MENTOR</text>
         ` : ''}

         <circle cx="${coParentData ? 100 : 45}" cy="0" r="3" fill="#3B82F6" />
         <text x="${coParentData ? 108 : 53}" y="4" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="700">HIJO</text>
         
         <circle cx="${coParentData ? 140 : 95}" cy="0" r="3" fill="none" stroke="#22d3ee" stroke-width="1" stroke-dasharray="2 1" />
         <text x="${coParentData ? 148 : 103}" y="4" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="700">META</text>
      </g>
   </svg>
   `;
}

window.getHarmonyRadarSVG = getHarmonyRadarSVG;
