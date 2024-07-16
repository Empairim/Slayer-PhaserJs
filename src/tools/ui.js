// @ts-check
import Phaser from "../lib/phaser.js";

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene" });
    this.healthBar = null;
    this.damageText = null;
  }
  create() {
    this.healthBar = this.add.text(10, 10, "Health: 100", {
      fontSize: "32px",
      color: "#fff",
    });
    this.damageText = this.add.text(10, 50, "Damage: 0", {
      fontSize: "32px",
      color: "#fff",
    });
  }

  updateHealth(healthPercent) {
    // Update the health bar
    if (typeof healthPercent === "number") {
      // Update the health bar
      console.log("Updating health");

      this.healthBar.setText("Health: " + Math.round(healthPercent * 100));
      if (healthPercent < 0.3) {
        this.healthBar.setColor("#ff0000"); // Set color to red if health is low
      } else {
        this.healthBar.setColor("#00ff00"); // Set color to green otherwise
      }
    }
  }
}
