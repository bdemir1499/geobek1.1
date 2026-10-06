const fs = require('fs');

const width = 800;
const height = 450;
const cx = 400;
const cy = 400;
const outerRadius = 380;
const innerRadius = 240;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

// Add a defs section for gradients
svg += `
  <defs>
    <linearGradient id="plastic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.4)" />
      <stop offset="50%" stop-color="rgba(255, 255, 255, 0.1)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.4)" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" flood-opacity="0.3" />
    </filter>
  </defs>
`;

// Draw the main plastic body
svg += `<path d="M ${cx - outerRadius} ${cy} A ${outerRadius} ${outerRadius} 0 0 1 ${cx + outerRadius} ${cy} L ${cx + outerRadius} ${height - 10} L ${cx - outerRadius} ${height - 10} Z" fill="url(#plastic)" stroke="rgba(0,0,0,0.2)" stroke-width="2" filter="url(#shadow)" />`;

// Draw the inner cutout arc
svg += `<path d="M ${cx - innerRadius} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${cx + innerRadius} ${cy} L ${cx - innerRadius} ${cy}" fill="transparent" stroke="rgba(0,0,0,0.1)" stroke-width="2" />`;

// Draw the center crosshair
svg += `
  <circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="rgba(0,0,0,0.8)" stroke-width="2" />
  <line x1="${cx - 25}" y1="${cy}" x2="${cx + 25}" y2="${cy}" stroke="rgba(0,0,0,0.8)" stroke-width="2" />
  <line x1="${cx}" y1="${cy - 25}" x2="${cx}" y2="${cy}" stroke="rgba(0,0,0,0.8)" stroke-width="2" />
`;

// Ticks and Numbers
const tickStart = innerRadius + 20;
const textRadiusOuter = outerRadius - 30;
const textRadiusInner = outerRadius - 65;

for (let i = 0; i <= 180; i++) {
  let angle = Math.PI - (i * Math.PI) / 180;
  let isTen = i % 10 === 0;
  let isFive = i % 5 === 0;
  
  let tickLen = isTen ? 25 : (isFive ? 15 : 8);
  let tickOuter = outerRadius - 5;
  let tickInner = tickOuter - tickLen;
  
  let x1 = cx + tickOuter * Math.cos(angle);
  let y1 = cy - tickOuter * Math.sin(angle);
  let x2 = cx + tickInner * Math.cos(angle);
  let y2 = cy - tickInner * Math.sin(angle);
  
  svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,0,0.7)" stroke-width="${isTen ? 2 : 1}" />`;
  
  if (isTen) {
    // Outer numbers (0 on right, 180 on left)
    let tx1 = cx + textRadiusOuter * Math.cos(angle);
    let ty1 = cy - textRadiusOuter * Math.sin(angle);
    svg += `<text x="${tx1}" y="${ty1}" fill="black" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle" transform="rotate(${90 - i}, ${tx1}, ${ty1})">${i}</text>`;
    
    // Inner numbers (180 on right, 0 on left)
    let tx2 = cx + textRadiusInner * Math.cos(angle);
    let ty2 = cy - textRadiusInner * Math.sin(angle);
    svg += `<text x="${tx2}" y="${ty2}" fill="black" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" dominant-baseline="middle" transform="rotate(${90 - i}, ${tx2}, ${ty2})">${180 - i}</text>`;
  }
}

// Draw a bottom ruler markings
const rulerY = height - 10;
for (let i = -350; i <= 350; i += 10) {
  let isTen = i % 100 === 0;
  let isFive = i % 50 === 0;
  let tickH = isTen ? 15 : (isFive ? 10 : 5);
  svg += `<line x1="${cx + i}" y1="${rulerY}" x2="${cx + i}" y2="${rulerY - tickH}" stroke="rgba(0,0,0,0.7)" stroke-width="1" />`;
  
  if (isTen) {
    let cm = Math.abs(i) / 10;
    svg += `<text x="${cx + i}" y="${rulerY - 20}" fill="black" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">${cm}</text>`;
  }
}

svg += `</svg>`;

fs.writeFileSync('aciolcer.svg', svg);
console.log('Saved aciolcer.svg');
