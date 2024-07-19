// @ts-nocheck
import Enemy from './enemy.js';

export default class Spitter extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 'spitter');
		this.body.setSize(20, 25);

		this.body.setOffset(10, 13);
		this.setScale(4);
		this.health = 50;
		this.speed = 300;
		this.damage = 1;
		this.hitStun = 200;

		this.body.setCollideWorldBounds(true);
	}
}
