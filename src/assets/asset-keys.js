export const AssetKeys = Object.freeze({
	ENVIORNMENT: {
		BACKGROUND: {
			GRASS: 'src/assets/world/Grass.png',
			WALL: 'src/assets/world/Wall.png',
			MAP: 'src/assets/world/map.tmj',
			TREE: 'src/assets/world/mainTree.png',
			LOG: 'src/assets/world/log.png'
		},

		OBJECTS: {
			//Object Pngs
			CAMPFIRE: 'src/assets/world/campfire.jpg'
		}
	},
	CHARACTER: {
		GUNNER: {
			//Gunner Pngs

			SPRITESHEET: 'src/assets/gunner/gunner48x32.png'
		},
		GUN: {
			//Gun Pngs
			PISTOL: 'src/assets/guns/pistol.png',
			SHOTGUN: 'src/assets/guns/shotgun.png',
			MACHINE: 'src/assets/guns/machine.png'
		},

		MOVEMENT: {
			//Movement Pngs
			XROLL: 'src/assets/dude/xRoll.png',
			YROLL: 'src/assets/dude/yRoll.png',
			DWWALK: 'src/assets/dude/dWalk.png',
			UPWALK: 'src/assets/dude/uWalk.png',
			XWALK: 'src/assets/dude/xWalk.png',
			IDLE: 'src/assets/dude/idle.png',
			//Damage Pngs
			GETHIT: 'src/assets/dude/getHit.png',
			DIE: 'src/assets/dude/die.png'
		},
		WEAPON: { BAT: 'src/assets/summons/bat.png' }
	},
	BULLETS: {
		//Bullet Pngs
		WBULLET: 'src/assets/bullets/Wbullet.png',
		BULLET: 'src/assets/bullets/bullet.png'
	},
	PARTICLES: {
		//Particle Pngs
		SMOKE: {
			WSMOKE: 'src/assets/particles/Wsmoke.png'
		},
		FLAME: {
			FLAMER: 'src/assets/particles/Flamer.png'
		},
		BLOOD: { SPLATTER: 'src/assets/particles/blood.png' }
	},
	SPELLS: {
		//Spell Pngs
		//fire beats air
		FIRE: {
			FIRE1: 'src/assets/spells/fire/fire1.png'
		},
		//water beats fire
		WATER: {
			WATER1: 'src/assets/particles/spit.png'
		},
		//earth beats water
		EARTH: {},
		//air beats earth
		AIR: {}
	},
	//Enemy Pngs
	ENIMIES: {
		GOBLIN: {
			PNG: {
				RUN: 'src/assets/enemies/goblin/goblinBlackrun.png',
				DIE: 'src/assets/enemies/goblin/goblinBlackdie.png'
			}
		},
		GHOUL: {
			PNG: {
				WALK: 'src/assets/enemies/ghoul/Walk.png'
			}
		},
		SPITTER: {
			PNG: {
				WALK: 'src/assets/enemies/spitter/walk.png',
				IDLE: 'src/assets/enemies/spitter/idle.png',
				ATTACK: 'src/assets/enemies/spitter/attack.png'
			}
		}

		// Add more asset categories here
	}
});
