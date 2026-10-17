/*
 Voxel Graphics Boost — visual post-processing starter
 Version: 1.0
 This is a lightweight visual enhancement layer for browser-based voxel games.
 It boosts canvas color/contrast and adds subtle atmospheric lighting.
 IMPORTANT: This does not replace a real 3D shader pipeline. For true dynamic
 shadows, reflections, PBR materials, or volumetric lighting, the game engine's
 renderer/source code must be modified.
*/
(() => {
  if (window.__voxelGraphicsBoostLoaded) return;
  window.__voxelGraphicsBoostLoaded = true;

  const style = document.createElement("style");
  style.id = "voxel-graphics-boost-style";
  style.textContent = `
    canvas {
      filter: saturate(1.22) contrast(1.08) brightness(1.035);
      image-rendering: auto;
    }
    .voxel-gfx-atmosphere {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9998;
      opacity: .22;
      background:
        radial-gradient(ellipse at 50% 18%, rgba(255,245,205,.16), transparent 48%),
        linear-gradient(180deg, rgba(120,190,255,.08), transparent 40%, rgba(10,25,12,.08));
      mix-blend-mode: screen;
    }
    @media (prefers-reduced-motion: no-preference) {
      .voxel-gfx-atmosphere {
        animation: voxelGfxAtmosphere 12s ease-in-out infinite alternate;
      }
      @keyframes voxelGfxAtmosphere {
        from { opacity: .16; }
        to   { opacity: .25; }
      }
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "voxel-gfx-atmosphere";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  // Optional console controls:
  // voxelGraphicsBoost.setIntensity(0.0 to 1.0)
  window.voxelGraphicsBoost = {
    setIntensity(value) {
      const n = Math.max(0, Math.min(1, Number(value) || 0));
      overlay.style.opacity = String(n * 0.28);
      document.querySelectorAll("canvas").forEach((canvas) => {
        canvas.style.filter = `saturate(${1 + n * .35}) contrast(${1 + n * .12}) brightness(${1 + n * .05})`;
      });
    },
    disable() {
      style.disabled = true;
      overlay.remove();
      document.querySelectorAll("canvas").forEach((canvas) => canvas.style.filter = "");
    },
    enable() {
      style.disabled = false;
      if (!document.querySelector(".voxel-gfx-atmosphere")) document.body.appendChild(overlay);
    }
  };
})();
