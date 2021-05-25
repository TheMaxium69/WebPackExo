"use strict";

let character = {
    hp: 100,
    weapon: null,
    armour: null,
    isAlive: function () {
        return this.hp > 0;
    }
};

// Initialisation du Maitre du Donjon
let dungeonMaster = {
    hp: 150,
    weapon: {
        strength: 6
    },
    armour: {
        defense: 4
    },
    isAlive: function () {
        return this.hp > 0;
    }
};

// On prépare les armes
let weapons = {
    bois: {
        strength: 2
    },
    fer: {
        strength: 5
    },
    magique: {
        strength: 10
    }
};

// On prépare les armures
let armours = {
    bois: {
        defense: 1
    },
    fer: {
        defense: 3
    },
    magique: {
        defense: 5
    }
};

// Demander quelle arme l'aventurier utilise
let chooseWeapon = null;
while (chooseWeapon != 'bois' && chooseWeapon != 'fer' && chooseWeapon != 'magique') {
    chooseWeapon = prompt('Choisissez une arme (bois, fer ou magique) :');
    chooseWeapon = chooseWeapon.toLowerCase();
}

// On récupère l'arme dans la matière demandée (exemple : weapons['bois'])
character.weapon = weapons[chooseWeapon];

// Demander quelle armure l'aventurier utilise
let chooseArmour = null;
while (chooseArmour != 'bois' && chooseArmour != 'fer' && chooseArmour != 'magique') {
    chooseArmour = prompt('Choisissez une armure (bois, fer ou magique) :');
    chooseArmour = chooseArmour.toLowerCase();
}

// On récupère l'armure dans la matière demandée (exemple : armours['bois'])
character.armour = armours[chooseArmour];

// Compte des tours
let i = 1;

// Boucle de combat (les adversaires se battent
// jusqu'à ce que l'un des deux n'ait plus de points de vie)
while (dungeonMaster.isAlive() && character.isAlive()) {

    // Compteur de tour

    console.log('Tour n°' + i);
    i++;

    // Le maitre attaque
    console.log('Le Maître attaque !');

    let damages = attack(dungeonMaster, character);

    if (damages > 0) {
        console.log("Le Maître inflige " + damages + ' points de dégâts');
    } else {
        console.log("L'attaque du Maître a échoué !");
    }

    if (character.isAlive()) {
        // Le personnage attaque
        console.log('Au tour de l\'aventurier !');

        let damages = attack(character, dungeonMaster);

        if (damages > 0) {
            console.log("L'aventurier inflige " + damages + ' points de dégâts');
        } else {
            console.log("L'attaque de l'aventurier a échoué !");
        }
    }

    console.log('Maitre : ' + dungeonMaster.hp + ' | aventurier : ' + character.hp);
}

// Annonce du vainqueur
if (character.isAlive()) {
    console.log('Féliciations ! Vous avez vaincu !');
} else {
    console.log('Le Maître a gagné !');
}

/**
 * @param Object attacker L'attaquant
 * @param Object defender Le défenseur
 *
 * @returns Les dégats infligés par cette attaque
 */
function attack(attacker, defender) {
    let damages = attacker.weapon.strength - defender.armour.defense;

    if (damages > 0) {
        defender.hp -= damages;
    } else {
        damages = 0;
    }

    return damages;
}
