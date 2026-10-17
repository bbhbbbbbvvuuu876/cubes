VOXEL GRAPHICS BOOST — STARTER PACK
===================================

What this does
--------------
- Adds a mild color/contrast/brightness boost to HTML canvas elements.
- Adds a subtle atmospheric light overlay across the page.
- Includes optional enable/disable/intensity controls.

What it does NOT do
-------------------
This is not a universal high-end shader pack and cannot magically add true
3D shadows, reflections, realistic water, physically based materials, or GTA 6
quality graphics to every game. Those effects require changes to the game's
actual rendering engine and assets.

How to use
----------
1. Extract this ZIP.
2. Copy voxel-graphics-boost.js into your game's project files.
3. Open the main HTML file (often index.html).
4. Add this line just before </body>:

   <script src="./voxel-graphics-boost.js"></script>

5. Save and rebuild/redeploy the game.

Important
---------
Make a backup of your project first. If your game builder does not let you add
custom JavaScript, this pack cannot be installed directly through that builder.
For engine-level graphics improvements, provide the original project/source
files so the renderer can be identified and modified.

Optional controls (browser developer console)
---------------------------------------------
voxelGraphicsBoost.setIntensity(0.8);
voxelGraphicsBoost.disable();
voxelGraphicsBoost.enable();
