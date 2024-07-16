export const AmmoTypes = {
  //WIDTH CONTROLS HOW LONG HEIGHT CONTROLS HOW WIDE
  pistol: {
    particleTexture: "wSmoke",
    bulletSpeed: 500,
    bulletSize: { width: 1, height: 5 },
    damage: { min: 5, max: 8 },
    fireDelay: 800,
    penetrates: false,
    screenShake: { duration: 200, intensity: 0.005 },
    //Bullet combat properties
    emitterProperties: {
      speed: 25,
      angle: { min: -10, max: 10 },
      scale: { start: 0.3, end: 0 },
    },
    particleProperties: {
      color: 0x00ff00, // Green
      size: 1,
    },
  },
  shotgun: {
    particleTexture: "fire1",
    bulletSpeed: 300,
    bulletSize: { width: 1, height: 100 },
    damage: { min: 30, max: 50 },
    fireDelay: 2000,
    penetrates: true,
    screenShake: { duration: 200, intensity: 0.007 },

    //Bullet combat properties
    emitterProperties: {
      speed: 30,
      angle: { min: -360, max: 360 },
      scale: { start: 2.5, end: 0 },
    },
    particleProperties: {
      color: 0xff0000, // Red
      size: 1,
    },
  },
  machine: {
    particleTexture: "water1",
    bulletSpeed: 1000,
    bulletSize: { width: 1, height: 3 },
    damage: { min: 1, max: 2 },
    fireDelay: 100,
    penetrates: false,
    screenShake: { duration: 200, intensity: 0.003 },
    //Bullet combat properties
    emitterProperties: {
      speed: 1000,
      angle: { min: -5, max: 5 },
      scale: { start: 0.1, end: 0 },
    },
    particleProperties: {
      color: 0x00ff00, // Green
      size: 1,
    },
  },
  // Add more ammo types as needed
};
