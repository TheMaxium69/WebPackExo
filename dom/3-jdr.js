"use strict";

// On initialise notre aventurier et le Maître du Donjon
let player = {
    name: "player",
    hp: 20,
    strength: 0,
    defense: 0,
    isAlive: function () {
        return this.hp > 0;
    }
};

let dungeonMaster = {
    name: "dungeonMaster",
    hp: 25,
    strength: 6,
    defense: 4,
    isAlive: function () {
        return this.hp > 0;
    }
};


// On initialise nos armes et armures (pour pouvoir récupérer facilement leurs statistiques après le choix de l'utilisateur)
let weapons = {
    wood: 2,
    iron: 5,
    magic: 10
};

let armours = {
    wood: 1,
    iron: 3,
    magic: 5
};


// On récupère les noeuds du HTML dont on va avoir besoin
let form = $('form#form');
let resultTitle = $('[data-result-title]');
let resultDetail = $('[data-result-detail]');

// Tout notre JS va se déclencher quand le formulaire est soumis
// On ne veut pas le faire avant, pour être sûr d'avoir les informations contenus dans le formulaire

// On ajoute un événement sur le formulaire, quand il est soumis (soit en cliquant sur le bouton, en appuyant sur la touche Entrée ou même s'il est soumis en JS !)
form.on('submit', function (event) {
    event.preventDefault();

    // On récupère l'input qui a été coché par l'utilisateur
    let weapon = $('input[name="weapon"]:checked');
    // On récupère sa valeur wood, iron ou magic
    let chosenWeapon = weapon.val();
    // On récupère la valeur correspondante
    player.strength = weapons[chosenWeapon];

    let armour = $('input[name="armour"]:checked');
    let chosenArmour = armour.val();
    player.defense = armours[chosenArmour];

    // Maintenant que tout le monde a des armes en main, on peut commencer la bataille
    startBattle();
});

// On crée une fonction pour avoir un nombre aléatoire entre 2 valeurs (les deux sont incluses et peuvent être renvoyées)
function randomInt(min, max) {
    // Attention, code récupéré ici : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random#obtenir_un_entier_al%C3%A9atoire_dans_un_intervalle_ferm%C3%A9

    // min = 2, max = 13
    // Math.floor(): arrondie à l'entier inférieur (ex: 2.8 devient 2)
    // Math.random(): Renvoie un nombre entre 0 et 1 : [0, 1[ (ne renvoie jamais 1)
    // (max - min + 1): (13 - 2 + 1) = 12 donc mon nombre aléatoire généré est entre 0 et 12 (exclu) : [0, 12[
    // (max - min + 1) + min: mon nombre aléatoire généré est entre 2 et 14 (exclu): [2, 14[
    // Donc mon résultat (une fois Math.floor() appliquée) est entre 2 et 13 (inclus)
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Notre fonction pour gérer le combat
function startBattle() {
    // On détermine les points de vie de nos personnages au début du combat
    player.hp = randomInt(20, 25);
    dungeonMaster.hp = randomInt(25, 35);

    // On vide la liste affichant le détail du combat, au cas où il y avait déjà quelque chose
    resultDetail.html("");

    // Tant que les deux personnages sont en vie, ils se battent
    while (dungeonMaster.isAlive() && player.isAlive()) {
        // On calcule les dégats infligés par le Maître
        let dmDamages = randomInt(1, dungeonMaster.strength) - player.defense;

        // On va gérer les textes liés aux dégâts
        let damageMessage;

        if (dmDamages > 0) {
            // Si le Maître inflige des dégats, on modifie les points de vie de notre aventurier
            player.hp -= dmDamages;
            damageMessage = `Il vous inflige ${dmDamages} points de dégâts ! `;
        } else {
            damageMessage = `Il vous rate ! `;
        }
        if (player.isAlive()) {
            damageMessage += `Heureusement, il vous reste <strong>${player.hp} points de vie</strong>`;
        } else {
            damageMessage += `Il vous a eu ! `;
        }
        // On crée un noeud li, qu'on ajouter à notre liste
        let log = $('<li>');
        // On donne à ce li un contenu (HTML), incluant notre message précédent
        log.html("Le Maître du Donjon attaque ! " + damageMessage);
        resultDetail.append(log);

        // Si le joueur est toujours en vie, on fait la même chose !
        if (player.isAlive()) {
            let playerDamages = randomInt(1, player.strength) - dungeonMaster.defense;
            let damageMessage;
            if (playerDamages > 0) {
                dungeonMaster.hp -= playerDamages;
                damageMessage = `Vous lui infligé ${playerDamages} points de dégâts ! `;
            } else {
                damageMessage = `Vous l'avez raté ! `;
            }
            if (dungeonMaster.isAlive()) {
                damageMessage += `Malheureusement, il lui reste <strong>${dungeonMaster.hp} points de vie</strong>`;
            } else {
                damageMessage += `Vous l'avez eu ! `;
            }
            let log = $('<li>');
            // On donne à ce li un contenu (HTML), incluant notre message précédent
            log.html("A votre tour ! " + damageMessage);
            resultDetail.append(log);
        }
    }

    // Si le joueur est en vie, c'est qu'il a gagné, sinon le Maître a triomphé
    if (player.isAlive()) {
        resultTitle.text("Vous avez triomphé du Maître du Donjon !");
    } else {
        resultTitle.text("Le mal triomphe !");
    }
}
