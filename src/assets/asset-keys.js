export const AssetKeys = Object.freeze({
  ENVIORNMENT: {
    BACKGROUND: { MAIN: "src/assets/background/grass.png" },
  },
  CHARACTER: {
    GUNNER: {
      //Gunner Pngs

      SPRITESHEET: "src/assets/gunner/gunner48x32.png",
    },
    GUN: {
      //Gun Pngs
      PISTOL: "src/assets/guns/pistol.png",
    },

    MOVEMENT: {
      //Movement Pngs
      XROLL: "src/assets/dude/xRoll.png",
      YROLL: "src/assets/dude/yRoll.png",
      DWWALK: "src/assets/dude/dWalk.png",
      UPWALK: "src/assets/dude/uWalk.png",
      XWALK: "src/assets/dude/xWalk.png",
      IDLE: "src/assets/dude/idle.png",
      //Damage Pngs
      GETHIT: "src/assets/dude/getHit.png",
      DIE: "src/assets/dude/die.png",
    },
    WEAPON: { BAT: "src/assets/summons/bat.png" },
  },
  BULLETS: {
    //Bullet Pngs
    WBULLET: "src/assets/bullets/Wbullet.png",
    BULLET: "src/assets/bullets/bullet.png",
  },
  PARTICLES: {
    //Particle Pngs
    SMOKE: {
      WSMOKE: "src/assets/particles/Wsmoke.png",
    },
    FLAME: {
      FLAMER: "src/assets/particles/Flamer.png",
    },
    BLOOD: { SPLATTER: "src/assets/particles/blood.png" },
  },
  SPELLS: {
    //Spell Pngs
    //fire beats air
    FIRE: {
      FIRE1: "src/assets/spells/fire/fire1.png",
    },
    //water beats fire
    WATER: {
      WATER1: "src/assets/spells/water/water100x100px.png",
    },
    //earth beats water
    EARTH: {},
    //air beats earth
    AIR: {},
  },
  ENIMIES:
    //Enemy Pngs
    {
      GOBLIN: {
        PNG: {
          RUN: "src/assets/enemies/goblin/goblinBlackrun.png",
          DIE: "src/assets/enemies/goblin/goblinBlackdie.png",
        },
      },

      // Add more asset categories here
    },
});
