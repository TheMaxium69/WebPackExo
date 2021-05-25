"use strict";

/** Enoncé :
 * Une petite calculatrice de montant TTC à partir du HT :
 *
 * - On va demander un montant HT (hors taxe) à l'utilisateur (avec la fonction `prompt`)
 * - si ce que l'utilisateur a entré n'est pas un nombre (utiliser la fonction [isNaN()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/isNaN), afficher un message d'erreur avec `alert()`
 * - sinon, calculer le montant TTC selon la formule suivante : `montantTTC = montantHT * 1.2`
 */

// On initialise un montant HT vide (vaut null pour le moment)
let montantHT;

// On demande à l'utilisateur de nous donner un nombre
// Tant qu'il ne nous a pas donné un nombre valide, on lui re-pose la question
while (isNaN(montantHT)) {
    // On donne une valeur par défaut (tout à fait arbitraire) à ce champ (42.42)
    montantHT = prompt("Entrez un montant Hors Taxe à calculer", 42.42);
}

// On affiche le résultat avec un message (rappel : + permet de fusionner 2 chaines de caractères)
console.log('Le montant avec TVA : ' + computeVAT(montantHT));

// On crée une fonction de calcul de la TVA à partir d'un montant Hors Taxe
/**
 * @param float ht
 * @returns float
 */
function computeVAT(ht) {
    return ht * 1.2;
}
