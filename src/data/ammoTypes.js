export const AmmoTypes = {
  single: {
    bulletSpeed: 500,
    bulletSize: { width: 10, height: 10 },
    damage: { min: 5, max: 10 },
    fireDelay: 600,
    emitterProperties: {
      speed: 100,
      angle: { min: -30, max: 30 },
      scale: { start: 0.5, end: 0 },
      // Add more properties as needed
    },
  },
  spray: {
    bulletSpeed: 200,
    bulletSize: { width: 50, height: 50 },
    damage: { min: 25, max: 45 },
    fireDelay: 1200,
    emitterProperties: {
      speed: 50,
      angle: { min: -30, max: 30 },
      scale: { start: 0.7, end: 0 },
      // Add more properties as needed
    },
    // ...
  },
  // Add more ammo types as needed
};
