"use strict"

export class Character {
    constructor(hp = 100, weapon = null, armour = null) {
        this.hp = hp;
        this.weapon = weapon;
        this.armour = armour;
    }

    isAlive() {
        return this.hp > 0;
    }

    attack(otherCharacter) {
        let damages = this.weapon.strength - otherCharacter.armour.defense;

        if (damages > 0) {
            otherCharacter.hp -= damages;
        } else {
            damages = 0;
        }

        return damages;
    }
}
