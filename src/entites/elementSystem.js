import Phaser from "../lib/phaser.js";

export default class ElementSystem {
    constructor() {
        this.elements = ['fire', 'water', 'air', 'earth'];
    }

    getRandomElement() {
        const randomIndex = Math.floor(Math.random() * this.elements.length);
        return this.elements[randomIndex];
    }

    setElement(entity, element) {
        if (!this.elements.includes(element)) {
            throw new Error(`Invalid element: ${element}`);
        }
        entity.element = element;
        // Set the tint color based on the element
        switch (element) {
            case 'fire':
                entity.setTint(0xff0000); // Red
                break;
            case 'water':
                entity.setTint(0x0000ff); // Blue
                break;
            case 'air':
                entity.setTint(0x00ff00); // Green
                break;
            case 'earth':
                entity.setTint(0xA52A2A); // Brown
                break;
        }
    }

    getElement(entity) {
        return entity.element;
    }
}