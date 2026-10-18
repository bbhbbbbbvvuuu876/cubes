/* Cubes Mobile Controls Theme — safe add-on
   This script only styles existing controls and provides optional custom events.
   It does NOT replace your game's world, save system, or block logic. */
(() => {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = './controls.css';
  document.head.appendChild(style);

  // Optional action bridge: game code can listen for these events.
  // Example: window.addEventListener('cubes:build', () => yourBuildFunction());
  const aliases = {
    build: ['#build','[data-action="build"]','.build-button'],
    dig: ['#dig','[data-action="dig"]','.dig-button'],
    jump: ['#jump','[data-action="jump"]','.jump-button'],
    fly: ['#fly','[data-action="fly"]','.fly-button'],
    down: ['#down','[data-action="down"]','.down-button']
  };
  Object.entries(aliases).forEach(([action, selectors]) => {
    const el = document.querySelector(selectors.join(','));
    if (el && !el.dataset.cubesBridge) {
      el.dataset.cubesBridge = '1';
      el.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('cubes:' + action));
      });
    }
  });
  window.CubesControlsAddon = {
    version: '1.0',
    emit(action) {
      if (['build','dig','jump','fly','down'].includes(action)) {
        window.dispatchEvent(new CustomEvent('cubes:' + action));
      }
    }
  };
})();
