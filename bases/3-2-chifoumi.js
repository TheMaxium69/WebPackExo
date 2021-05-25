"use strict";

// Je mets les différentes valeurs que j'utilise dans des constantes,
// pour éviter les fautes de frappe quand je m'en sers
const STONE = 'pierre';
const PAPER = 'feuille';
const SCISSORS = 'ciseaux';

const WINNER_USER = 1;
const WINNER_COMPUTER = 2;

// Je stocke la liste des choix possible dans une variable (une constante serait aussi bien ;) )
let choices = [
    STONE,
    PAPER,
    SCISSORS
];

// On initialise les scores de chaque joueur pour les différentes manches
let userScore = 0;
let computerScore = 0;

// Dès qu'un des joueurs a 2 points, on arrête la partie.
// En attendant, on force l'utilisateur à jouer.
while (userScore < 2 && computerScore < 2) {

    // On gère le choix de l'utilisateur ici
    // D'abord on initialise une variable qui contiendra son choix
    let userChoice;
    // Puis, tant que l'utilisateur n'entre pas un choix correct (un choix présent dans notre tableau choices)
    // on lui demande son choix
    while (choices.indexOf(userChoice) < 0) {
        // On présente ses choix à l'utilisateur
        // (choices.join(', ') nous permet de transformer notre tableau en une chaine de caractères).
        // Le deuxième paramètre de prompt() nous permet d'entrer un choix par défaut (texte entré dans le champ)
        // Très utile pour gagner du temps pendant les tests
        userChoice = prompt(`Entrez ${choices.join(', ')}`, choices[0]);
        // Pour vérifier que la saisie de l'utilisateur est correcte,
        // on s'assure qu'elle soit dans le même format que nous: en minuscule
        userChoice = userChoice.toLowerCase();
    }

    // Maintenant que nous avons le choix de l'utilisateur pour cette manche,
    // créons celui de l'ordinateur
    // getRandomInt(3) renvoie 0, 1 ou 2 et on récupère
    // la valeur correspondant à cet index dans notre tableau
    let computerChoice = choices[getRandomInt(3)];

    // Notre fonction de comparaison nous dit qui a gagné (potentiellement personne)
    let winner = compare(userChoice, computerChoice);
    // Si c'est l'utilisateur qui a gagné, on lui donne un point bien mérité
    if (winner == WINNER_USER) {
        userScore++;
    } else if (winner == WINNER_COMPUTER) {
        // Si c'est l'ordinateur, c'est à lui qu'on donne un point
        computerScore++;
    }
    // Sinon, personne n'a de point et il faut continuer

    // On affiche les scores dans la console, pour l'utilisateur
    console.log(`Vous : ${userScore}, ordinateur : ${computerScore}`);
}

// Une fois notre match terminé (on est sorti de la boucle)
// On compare les scores et on voit qui a gagné le match
if (userScore >= 2) {
    console.log('Félicitations ! vous avez gagné !');
} else {
    console.log('Dommage ! vous avez perdu !');
}

/**
 * @param integer max
 * @returns integer un nombre entre 0 et le nombre demandé (non inclu)
 */
function getRandomInt(max) {
    // Math.random() génère un nombre entre 0 et 1 (exclu)
    // Math.floor() récupère l'entier inférieur au nombre passé en paramètre ( Math.floor(2.8) == 2 )
    return Math.floor(Math.random() * max);
}

/**
 *
 * @param string user
 * @param string computer
 *
 * @returns string la personne qui a gagné WINNER_COMPUTER ou WINNER_USER
 */
function compare(user, computer) {
    console.log('compare : ' + user + ' versus ' + computer);

    // Si c'est une égalité (les deux ont donné la même réponse), on renvoie null
    if (user == computer) {
        return null;
    }

    // Selon la réponse de l'utilisateur, on compare avec ce qu'à fait l'ordinateur
    // et on regarde qui a gagné. Ici, pas de secret, il faut utiliser beaucoup de if ;)
    if (user == STONE) {
        if (computer == PAPER) {
            return WINNER_COMPUTER;
        }

        if (computer == SCISSORS) {
            return WINNER_USER;
        }
    } else if (user == PAPER) {
        if (computer == STONE) {
            return WINNER_USER;
        }

        if (computer == SCISSORS) {
            return WINNER_COMPUTER;
        }
    } else if (user == SCISSORS) {
        if (computer == PAPER) {
            return WINNER_USER;
        }

        if (computer == STONE) {
            return WINNER_COMPUTER;
        }
    }
}
