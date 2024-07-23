export default class Weapon {
	constructor(type, properties) {
		this.type = type;
		this.frame = properties.frame;
		this.animation = properties.animation;
		this.gatTexture = properties.gatTexture;
		this.particleTexture = properties.particleTexture;
		this.bulletSpeed = properties.bulletSpeed;
		this.bulletSize = properties.bulletSize;
		this.damage = properties.damage;
		this.fireDelay = properties.fireDelay;
		this.penetrates = properties.penetrates;
		this.screenShake = properties.screenShake;
		this.lifespan = properties.lifespan;
		this.emitterProperties = properties.emitterProperties;
		this.particleProperties = properties.particleProperties;
	}
}
