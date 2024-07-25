// @ts-nocheck
import { SpitterShootingBehavior } from '../../data/enemyBehavior.js';
import Enemy from './enemy.js';

export default class Spitter extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 'spitter');
		this.body.setSize(20, 25);

		this.body.setOffset(10, 13);
		this.setScale(4);
		this.health = 10;
		this.speed = 220;
		this.damage = 1;
		this.hitStun = 1000;
		this.behavior = new SpitterShootingBehavior(this);

		this.body.setCollideWorldBounds(true);
	}
}
