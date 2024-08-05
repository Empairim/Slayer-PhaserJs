// @ts-nocheck
import { SpitterShootingBehavior } from '../../data/enemyBehavior.js';
import Enemy from './enemy.js';
import EnemyProjectile from './enemyProjectiles.js';

export default class Spitter extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 'spitter');
		this.scene = scene;
		this.body.setSize(20, 25);

		this.body.setOffset(10, 13);
		this.setScale(4);
		this.health = 10;
		this.speed = 150;
		this.damage = 1;
		this.hitStun = 1000;
		this.behavior = new SpitterShootingBehavior(this);
		this.postFX.addGlow(0x80ff80, 2, 0, false, 0.00001, 2);
		// this.projectile = new EnemyProjectile(this.scene, this.x, this.y, this.scene.player, this.damage);

		// this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 3, 0.7);

		this.body.setCollideWorldBounds(true);
	}
	reset(x, y) {
		this.x = x;
		this.y = y;
		this.health = 10;
		this.speed = 220;
		this.damage = 1;
		this.hitStun = 1000;
	}
}
