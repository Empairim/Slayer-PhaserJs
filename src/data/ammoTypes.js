export const AmmoTypes = {
  single: {
    bulletSpeed: 500,
    bulletSize: { width: 10, height: 10 },
    damage: { min: 5, max: 10 },
    fireDelay: 600,
    //Bullet combat properties
    emitterProperties: {
      speed: 100,
      angle: { min: -30, max: 30 },
      scale: { start: 0.5, end: 0 },
    },
    particleProperties: {
      color: 0x00ff00, // Green
      size: 10,
    },
  },
  spray: {
    bulletSpeed: 200,
    bulletSize: { width: 50, height: 50 },
    damage: { min: 25, max: 45 },
    fireDelay: 1200,
    //Bullet combat properties
    emitterProperties: {
      speed: 200,
      angle: { min: 0, max: 360 },
      scale: { start: 0.7, end: 0 },
    },
    particleProperties: {
      color: 0xff0000, // Red
      size: 20,
    },
  },
  // Add more ammo types as needed
};
