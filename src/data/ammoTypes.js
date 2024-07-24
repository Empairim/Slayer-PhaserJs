export const AmmoTypes = {
	//WIDTH CONTROLS HOW LONG HEIGHT CONTROLS HOW WIDE
	pistol: {
		frame: 0,
		animation: 'pisolAmmo',
		gatTexture: 'pistol',
		particleTexture: 'wSmoke',
		bulletSpeed: 500, // how much range bullet has
		bulletSize: { width: 12, height: 5 }, // how much spread bullet has depends on height
		damage: { min: 5, max: 8 },
		fireDelay: 800, // fire rate of gun/reload speed
		penetrates: false, // if bullet goes through enemies hits multiple enemies
		screenShake: { duration: 200, intensity: 0.005 },
		lifespan: 1000, // / 500 = 4 seconds // how long bullet stays on screen also effects range
		//Bullet combat properties
		emitterProperties: {
			speed: 5,
			angle: { min: 0, max: 0 },
			scale: { start: 0.3, end: 0 }
		},
		particleProperties: {
			color: 0x00ff00, // Green
			size: 1
		}
	},
	shotgun: {
		frame: 1,
		animation: 'shotgunAmmo',
		gatTexture: 'shotgun',
		particleTexture: 'fire1',
		bulletSpeed: 500,
		bulletSize: { width: 100, height: 100 },
		damage: { min: 30, max: 45 },
		fireDelay: 2000,
		penetrates: true,
		screenShake: { duration: 200, intensity: 0.007 },
		lifespan: 300, // / 500 = 1.2 seconds

		//Bullet combat properties
		emitterProperties: {
			speed: 30,
			angle: { min: -45, max: 45 },
			scale: { start: 2.5, end: 0 }
		},
		particleProperties: {
			color: 0xff0000, // Red
			size: 1
		}
	},
	machine: {
		frame: 2,
		animation: 'machineAmmo',
		gatTexture: 'machine',
		particleTexture: 'flamer',
		bulletSpeed: 1000,
		bulletSize: { width: 5, height: 5 },
		damage: { min: 1, max: 1.5 },
		fireDelay: 200,
		penetrates: false,
		screenShake: { duration: 100, intensity: 0.004 },
		lifespan: 2000, // / 500 = 4 seconds

		//Bullet combat properties
		emitterProperties: {
			speed: 100,
			angle: { min: 0, max: 5 },
			scale: { start: 0.2, end: 0 }
		},
		particleProperties: {
			color: 0x00ff00, // Green
			size: 1
		}
	}
	// Add more ammo types as needed
};
