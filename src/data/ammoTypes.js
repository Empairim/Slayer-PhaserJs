export const AmmoTypes = {
  //WIDTH CONTROLS HOW LONG HEIGHT CONTROLS HOW WIDE
  pistol: {
    particleTexture: "wSmoke",
    bulletSpeed: 650,
    bulletSize: { width: 1, height: 5 },
    damage: { min: 5, max: 8 },
    fireDelay: 800,
    penetrates: false,
    screenShake: { duration: 200, intensity: 0.005 },
    lifespan: 2000, // / 500 = 4 seconds
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
    bulletSpeed: 500,
    bulletSize: { width: 1, height: 75 },
    damage: { min: 30, max: 45 },
    fireDelay: 2000,
    penetrates: true,
    screenShake: { duration: 200, intensity: 0.007 },
    lifespan: 600, // / 500 = 1.2 seconds

    //Bullet combat properties
    emitterProperties: {
      speed: 30,
      angle: { min: -45, max: 45 },
      scale: { start: 2.5, end: 0 },
    },
    particleProperties: {
      color: 0xff0000, // Red
      size: 1,
    },
  },
  machine: {
    particleTexture: "fire1",
    bulletSpeed: 1000,
    bulletSize: { width: 1, height: 5 },
    damage: { min: 1, max: 1.5 },
    fireDelay: 200,
    penetrates: false,
    screenShake: { duration: 200, intensity: 0.003 },
    lifespan: 2000, // / 500 = 4 seconds

    //Bullet combat properties
    emitterProperties: {
      speed: 200,
      angle: { min: -5, max: 5 },
      scale: { start: 0.8, end: 0 },
    },
    particleProperties: {
      color: 0x00ff00, // Green
      size: 1,
    },
  },
  // Add more ammo types as needed
};
