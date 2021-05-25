"use strict";

let list = document.querySelector('#player-list');
let listJquery = $('#player-list');

fetch('data/exercice-ajax-html.html')
    .then(function (rawData) {
        return rawData.text();
    })
    .then(function (data) {
        let node = htmlToNode(data);
        list.prepend(node);
    })
    .catch(function(error) {
        console.log(error);
    })
;

fetch('data/exercice-ajax-single.json')
    .then(function (rawData) {
        return rawData.json();
    })
    .then(function (player) {
        let liNode = document.createElement('li');

        liNode.setAttribute('id', player.name);
        liNode.setAttribute('data-name', player.name);
        liNode.setAttribute('data-hp', player.hp);
        liNode.setAttribute('data-defense', player.defense);
        liNode.setAttribute('data-strength', player.strength);
        liNode.innerHTML = `Le joueur ${player.name} a ${player.hp} points de vie, ${player.strength} points de force et ${player.defense} points de défense.`;

        list.appendChild(liNode);
    })
    .catch(function(error) {
        console.log(error);
    })
;

fetch('data/exercice-ajax-tab.json')
    .then(function (rawData) {
        return rawData.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            const player = data[i];
            let liNode = document.createElement('li');

            liNode.setAttribute('id', player.name);
            liNode.setAttribute('data-name', player.name);
            liNode.setAttribute('data-hp', player.hp);
            liNode.setAttribute('data-defense', player.defense);
            liNode.setAttribute('data-strength', player.strength);
            liNode.innerHTML = `Le joueur ${player.name} a ${player.hp} points de vie, ${player.strength} points de force et ${player.defense} points de défense.`;

            list.appendChild(liNode);
        }
    })
    .catch(function(error) {
        console.log(error);
    })
;

function createJqueryNode(obj, list) {
    let liNode = $('<li>');
    liNode.attr('id', obj.name);
    liNode.attr('data-name', obj.name);
    liNode.attr('data-hp', obj.hp);
    liNode.attr('data-defense', obj.defense);
    liNode.attr('data-strength', obj.strength);
    liNode.html(`Le joueur ${obj.name} a ${obj.hp} points de vie, ${obj.strength} points de force et ${obj.defense} points de défense.`);
    list.append(liNode);
}

function htmlToNode(htmlData) {
    // On crée une balise temporaire, pour nous aider à créer notre noeud HTML
    let tmp = document.createElement('div');
    // On lui donne comme contenu le HTML récupéré
    tmp.innerHTML = htmlData;
    // On conserve le premier élément (c'est à dire ce qu'on avait dans data), qui est maintenant convertit en noeud HTML propre, au sens du DOM
    return tmp.firstChild;
}
