const prompts = [
  "neon glowing sulphuric 3d realistic crystals in a cracked geode 16k",
  "fractal dragon head, Dieselpunk, Teslapunk, Spacepunk, Trey Ratcliff, Cindy Sherman, full body portrait, action shot portrait, ultra realistic, photorealisim, deeply real, amazing detail, mind-blowing detail, Moonlight Engine, Unreal Engine, Surrealistic lighting, Volumetric lighting, God ray",
  "liquid otherworldly cool dreamy dog, cuddly, arrogant, powerful, high fantasy, epic, cinematic, internal glow",
  "yggdrasil, vivid colors, gold sun light, pixie dust, rising sun pictures, cryengine, realistic lighting, spiritual lighting, volumetric lighting, god rays, ultra detailed, 4 k, realistic",
  "kneeling cat knight, portrait, finely detailed armor, intricate design, silver, silk, cinematic lighting, 4k",
  "Vast sci-fi post apocalyptic spaceship space-craft salvage yard, hyper realistic, future engine parts, modules, rats, environment cinematic scene, ultra realism, beautifully lit",
  "expansive castle, cinematic —ar 16:9 —chaos 20 --testp",
  "A intricate stunning highly detailed eye by Greg Rutkowski, Vladimir Kush, Peter Mohrbacher, detailed tenticles, Cthulhu, detailed ink, translucent, bioluminescent, 8k portrait render, deep ocean ,ethereal, artstation, ultra realistic, cinematic lighting",
  "time machine on a table, indoor, steampunk, realistic, highly detailed, 8k --testp --upbeta",
  "futuristic city skyline, synthwave colors, neurocybernetics, neal asher, industrial light & magic, v - ray, tragic lighting, volumetric lighting, film noir lighting",
  "perspective, curious old secret town of Manila city, cascading armour shops and potion shops, art nouveau, animation art, dark fantasy, overgrown with lush vegetation, cinematic, smooth, detailed, hyperrealism, very small aperture, clear reflection, post production, post-processing, 8k, retouch, HDR, Super-Resolution, Soft Lighting, Ray Tracing Global Illumination, Lumen Reflections, pastel color palette, art deco, Bloodborne feeling",
  "nikkor 135 mm 1.8, depth of field, ultra realistic, fallen angel carved out of marble",
  "a beautiful hyperrealistic detailed 3D render of a a masked assassin, borderlands, rendering by Jan Ditlev, Klaus Pillon, Abbott Fuller Graves, Atey Ghailan, genzoman"
];


const getRandomPropmt = ()=>{
    return prompts[Math.floor(Math.random()*prompts.length)];
}

export default getRandomPropmt;