/*
 Voxel Ultra Graphics & UI integration helper
 Include after your game's main scripts:
 <link rel="stylesheet" href="./voxel-ultra-ui.css">
 <script src="./voxel-ultra.js"></script>
*/
(() => {
  if (window.__voxelUltraInstalled) return;
  window.__voxelUltraInstalled = true;

  const css = document.createElement("style");
  css.textContent = `
    canvas.vu-enhanced, canvas {
      filter: saturate(1.12) contrast(1.045) brightness(1.025);
    }
    .vu-atmosphere {
      position: fixed; inset: 0; z-index: 9990; pointer-events:none;
      background:
        radial-gradient(ellipse at 48% 12%, rgba(255,242,196,.13), transparent 48%),
        linear-gradient(180deg, rgba(113,190,255,.06), transparent 44%, rgba(10,30,14,.09));
      mix-blend-mode: screen; opacity:.7;
    }
    @media (prefers-reduced-motion:no-preference) {
      .vu-atmosphere { animation: vuBreathe 14s ease-in-out infinite alternate; }
      @keyframes vuBreathe { from {opacity:.42} to {opacity:.78} }
    }
  `;
  document.head.appendChild(css);
  const atmosphere = document.createElement("div");
  atmosphere.className = "vu-atmosphere";
  atmosphere.setAttribute("aria-hidden","true");
  document.body.appendChild(atmosphere);

  // Adds a new visual class to game canvases without replacing their behavior.
  document.querySelectorAll("canvas").forEach(c => c.classList.add("vu-enhanced"));

  window.voxelUltra = {
    setIntensity(value) {
      const n = Math.max(0, Math.min(1, Number(value) || 0));
      atmosphere.style.opacity = String(.15 + n * .75);
      document.querySelectorAll("canvas").forEach(c => {
        c.style.filter = `saturate(${1+n*.22}) contrast(${1+n*.09}) brightness(${1+n*.04})`;
      });
    },
    disable() {
      atmosphere.remove();
      document.querySelectorAll("canvas").forEach(c => { c.style.filter = ""; c.classList.remove("vu-enhanced"); });
    }
  };
})();
