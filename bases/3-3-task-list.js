"use strict";

// On définit notre liste de tâches, dans un tableau simple
let list = [
    "écrire plus d'exercices",
    "manger",
    "gouter",
    "petit déjeuner"
];

// On défini un ensemble de variable pour les actions possibles par l'utilisateur,
// le nombre attendu par l'utilisateur et le texte dans le prompt

// Une constante est écrite, par convention, en screaming snake case
const ACTION_QUIT = { // Notre constante est un objet
    number: 0, // qui contient un nombre (celui que va entrer l'utilisateur pour faire cette action)
    label: 'Quitter' // et le texte qu'on va afficher dans le prompt principal pour cette action
};

const ACTION_LIST = {
    number: 1,
    label: 'Lister'
};

const ACTION_ADD = {
    number: 2,
    label: 'Ajouter'
};

const ACTION_SEARCH = {
    number: 3,
    label: 'Chercher'
};

const ACTION_DELETE_ONE = {
    number: 4,
    label: 'Supprimer une'
};

const ACTION_DELETE_ALL = {
    number: 5,
    label: 'Supprimer tout'
};

// On crée un autre constante, pour générer ensuite la phrase à afficher à l'utilisateur
// (qui contient la liste des actions, avec leur numéro et leur label à afficher)
const LIST_ACTIONS = [
    ACTION_LIST,
    ACTION_ADD,
    ACTION_SEARCH,
    ACTION_DELETE_ONE,
    ACTION_DELETE_ALL,
    ACTION_QUIT
];

// On va générer un texte pour le prompt principal
// (celui qui demande à l'utilisateur quoi faire).
// On utilise notre tableau pour générer ce texte.
let actionsText = '';

for (const action of LIST_ACTIONS) {
    actionsText += action.number + ': ' + action.label + '  ';
}

// On initialise l'action de l'utilisateur (qu'on va lui demander)
// Au départ, il n'a encore rien fait et on veut qu'il entre dans la boucle
// pour nous donner ses intentions
let userAction = null;

// Tant que l'utilisateur n'a pas tapé 0
// (qu'il n'a pas demandé explicitement à quitter le programme),
// on lui demande l'action à effectuer.
while (userAction !== ACTION_QUIT.number) {
    // On lui pose notre question
    // Par défaut, on lui propose de lister les éléments (1 est déjà entré dans le champ de prompt())
    userAction = prompt(actionsText, ACTION_LIST.number);
    // On s'assure que l'action entrée par l'utilisateur est comparée sous forme de nombre,
    // comme dans nos constantes
    userAction = parseInt(userAction);

    // On appelle nos différentes fonctions,
    // selon le choix de l'utilisateur (tout en affichant des messages d'aide)
    switch (userAction) {
        case ACTION_LIST.number:
            console.log("Vous avez demandé l'affichage de la liste : ");

            listTasks(list);

            break;
        case ACTION_ADD.number:
            console.log("Vous voulez ajouter une tâche : ");

            let newTask = prompt('Nouvelle tâche à ajouter :');
            let newSizeOfList = addTask(list, newTask);

            console.log('La tâche ' + newTask + ' a été ajoutée. Il y a maintenant ' + newSizeOfList + ' éléments dans la liste');

            break;
        case ACTION_SEARCH.number:
            let taskToSearch = prompt('Nom de la tâche à trouver :');

            console.log("Vous voulez chercher une tâche : " + taskToSearch);

            if (searchTask(list, taskToSearch)) {
                console.log("La tâche " + taskToSearch + " est dans la liste");
            } else {
                console.log("La tâche " + taskToSearch + " n'est pas dans la liste");
            }

            break;
        case ACTION_DELETE_ONE.number:
            let taskToDelete = prompt('Nom de la tâche à supprimer :');

            console.log("Vous voulez supprimer une tâche : " + taskToDelete);

            if (!deleteTask(list, taskToDelete)) {
                console.log("La suppression n'a pas fonctionnée, êtes-vous sûr que " + taskToDelete + " est bien dans la liste ?");
            } else {
                console.log(taskToDelete + " a bien été supprimée de la liste");
            }

            break;
        case ACTION_DELETE_ALL.number:
            if (confirm('Êtes-vous sûr de vouloir vider la liste ?')) {
                deleteAll(list);

                console.log('Liste vidée');
            } else {
                console.log('Liste non modifiée');
            }
            break;

        // Si l'utilisateur tappe quelque chose qui n'est pas dans nos constantes,
        // On lui précise que l'action qu'il a entré n'est pas valide.
        default:
            console.log('Action invalide');
            break;
    }
}

console.log("Votre liste de tâche, si vous l'acceptez : ");
listTasks(list);

console.log('The end!');



// listTasks(list);
// addTask(list, 'dormir');
// console.log(searchTask(list, 'dormir'));
// deleteTask(list, 'gouter');
// listTasks(list);
// deleteAll(list);
// listTasks(list);

// On affiche la liste des tâches
// soit directement avec un console.log() qui nous affiche tout,
// soit avec une boucle pour afficher chacun des éléments
function listTasks(tasks) {
    // console.log("Nombre de tâches : " + tasks.length);
    // console.log('liste des tâches :')
    // tasks.forEach(element => {
    //     console.log(element);
    // });
    console.log(tasks);
}

// Ajouter une tâche à la liste
function addTask(tasks, task) {
    // Si la tâche est une chaine de caractère vide
    // on arrête la fonction et on n'ajoute pas la tâche
    if (task.length <= 0) {
        return null;
    }
    // Si la tâche n'est pas déjà dans la liste, on l'ajoute
    if (!searchTask(tasks, task)) {
        return tasks.push(task);
    }

    return null;
}

// Vérifie si une tâche est est dans la liste
function searchTask(tasks, task) {
    // return tasks.indexOf(task); // Renvoie -1 si la tâche n'est pas dans la liste, son index, sinon
    return tasks.includes(task.toLowerCase()); // false si la tâche n'est pas dans la liste, true sinon
}

// Retourne l'index de la tache si elle est dans la liste
function searchIndexOfTask(tasks, task) {
    return tasks.indexOf(task); // Renvoie -1 si la tâche n'est pas dans la liste, son index, sinon
}

// Supprimer une tâche de la liste
function deleteTask(tasks, task) {
    // On cherche la tâche et si elle est présente dans la liste (on récupère son index), on la supprime du tableau
    let index = searchIndexOfTask(tasks, task);
    if (index >= 0) {
        tasks.splice(index, 1);
        return true; // Si la suppression a fonctionné, on renvoie true (optionnel)
    }

    return false; // Si la suppression n'a pas fonctionné, on renvoie false (optionnel)
}

// Supprimer tous les éléments de la liste
function deleteAll(tasks) {
    tasks.splice(0, tasks.length);
}
