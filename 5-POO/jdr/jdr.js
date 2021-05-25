import {Weapon} from "./classes/Weapon";
import {Armour} from "./classes/Armour";
import {Character} from "./classes/Character";

import "./sass/app.scss";

export default function jdr() {
// Préparation du matériel
    let woodWeapon = new Weapon(2);
    let ironWeapon = new Weapon(5);
    let magicWeapon = new Weapon(10);
    let dmWeapon = new Weapon(6);

    let woodArmour = new Armour(1);
    let ironArmour = new Armour(3);
    let magicArmour = new Armour(5);
    let dmArmour = new Armour(4);

    let character = new Character();

// Initialisation du Maitre du Donjon
    let dungeonMaster = new Character(
        150,
        dmWeapon,
        dmArmour
    );

// On prépare les armes
    let weapons = {
        bois: woodWeapon,
        fer: ironWeapon,
        magique: magicWeapon
    };

// On prépare les armures
    let armours = {
        bois: woodArmour,
        fer: ironArmour,
        magique: magicArmour
    };

// Demander quelle arme l'aventurier utilise
    let chooseWeapon = null;
    while (chooseWeapon !== 'bois' && chooseWeapon !== 'fer' && chooseWeapon !== 'magique') {
        chooseWeapon = prompt('Choisissez une arme (bois, fer ou magique) :');
        chooseWeapon = chooseWeapon.toLowerCase();
    }

// On récupère l'arme dans la matière demandée (exemple : weapons['bois'])
    character.weapon = weapons[chooseWeapon];

// Demander quelle armure l'aventurier utilise
    let chooseArmour = null;
    while (chooseArmour !== 'bois' && chooseArmour !== 'fer' && chooseArmour !== 'magique') {
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

        let dmDamages = dungeonMaster.attack(character);

        if (dmDamages > 0) {
            console.log("Le Maître inflige " + dmDamages + ' points de dégâts');
        } else {
            console.log("L'attaque du Maître a échoué !");
        }

        if (character.isAlive()) {
            // Le personnage attaque
            console.log('Au tour de l\'aventurier !');

            let damages = character.attack(dungeonMaster);

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
        console.log('Félicitations ! Vous avez vaincu !');
    } else {
        console.log('Le Maître a gagné !');
    }
}

jdr();