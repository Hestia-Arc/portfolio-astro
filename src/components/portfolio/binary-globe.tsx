import { useEffect, useRef } from 'react';
import countries from './world-geography.json';

// Natural Earth public-domain geography, rasterized once for inexpensive sampling.
// Mask channels encode land (red) and country boundaries (green), not UI colors.
const MAP_WIDTH = 2048, MAP_HEIGHT = 1024;
function createGeographyMask() {
  const mask = document.createElement('canvas');
  mask.width = MAP_WIDTH; mask.height = MAP_HEIGHT;
  const context = mask.getContext('2d', { willReadFrequently: true });
  if (!context) return null;
  context.fillStyle = 'rgb(255, 0, 0)';
  context.strokeStyle = 'rgb(255, 255, 0)';
  context.lineWidth = 1.4;
  for (const polygon of countries) {
    context.beginPath();
    for (const ring of polygon) {
      ring.forEach(([lon, lat], index) => {
        if (lon === undefined || lat === undefined) return;
        const x = (lon + 180) / 360 * MAP_WIDTH;
        const y = (90 - lat) / 180 * MAP_HEIGHT;
        if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
      });
      context.closePath();
    }
    context.fill('evenodd'); context.stroke();
  }
  return context.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT).data;
}
export function BinaryGlobe({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const geography = createGeographyMask();
    if (!geography) return;
    let frame = 0;
    let width = 0, height = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    const render = (time: number) => {
      const styles = getComputedStyle(document.documentElement);
      const bright = styles.getPropertyValue('--globe').trim();
      const faint = styles.getPropertyValue('--globe-faint').trim();
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(height * .66, width * 1.12);
      const cx = -width * .08;
      const cy = height * .50;
      const cellX = 7, cellY = 9;
      const rotation = reduced ? 24 : 24 + time * .0025;
      ctx.font = '8px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      for (let x = Math.max(0, cx - radius); x < Math.min(width, cx + radius); x += cellX) {
        const column = Math.floor(x / cellX);
        for (let y = cy - radius - cellY; y < cy + radius + cellY; y += cellY) {
          const py = y;
          const nx = (x - cx) / radius, ny = (cy - py) / radius;
          const distance = nx * nx + ny * ny;
          if (distance > .985) continue;
          const lat = Math.asin(ny) * 180 / Math.PI;
          const lon = ((Math.atan2(nx, Math.sqrt(1 - distance)) * 180 / Math.PI + rotation + 180) % 360) - 180;
          const mapX = Math.min(MAP_WIDTH - 1, Math.max(0, Math.floor((lon + 180) / 360 * MAP_WIDTH)));
          const mapY = Math.min(MAP_HEIGHT - 1, Math.max(0, Math.floor((90 - lat) / 180 * MAP_HEIGHT)));
          const offset = (mapY * MAP_WIDTH + mapX) * 4;
          const land = (geography[offset] ?? 0) > 100;
          const boundary = (geography[offset + 1] ?? 0) > 80;
          const fade = Math.pow(1 - distance, .28);
          const flicker = .75 + .25 * Math.sin(column * 3.7 + Math.floor(y / cellY) * 1.3);
          ctx.globalAlpha = (boundary ? 1 : land ? .85 : .16) * fade * flicker;
          ctx.fillStyle = land ? bright : faint;
          ctx.shadowColor = bright;
          ctx.shadowBlur = boundary && dark ? 4 : 0;
          const bit = Math.sin(Math.floor(lon / 2) * 42.31 + Math.floor(lat / 2) * 17.7) > 0 ? '1' : '0';
          ctx.fillText(bit, x, py);
        }
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      if (!reduced) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [dark]);
  return <canvas ref={ref} className="globe-canvas" role="img" aria-label="Half a world globe formed from glowing turquoise zeros and ones" />;
}
