"use strict"

let container = document.querySelector('#pokemon');

fetch('https://pokeapi.co/api/v2/generation/1/')
    .then(function (rawData) {
        return rawData.json();
    })
    .then(function (generation) {
        let pokemons = generation.pokemon_species;

        for (let i = 0; i < pokemons.length; i++) {
            const element = pokemons[i];

            fetch(element.url)
                .then(function (rawPokemonData) {
                    return rawPokemonData.json();
                })
                .then(function (pokemon) {
                    buildHTMLNode(container, pokemon, element.url);
                });
        }
    });

function buildHTMLNode(htmlContainer, pokemon, pokemonUrl) {
    let id = pokemon.id;
    let name = getFrenchNameFromPokemon(pokemon);
    let parent = pokemon.evolves_from_species;

    let section = document.createElement('section');
    section.dataset.url = pokemonUrl;
    section.dataset.name = name;
    section.dataset.id = id;

    let link = document.createElement('a');
    link.classList.add('more');
    link.innerHTML = "Plus d'informations";
    link.setAttribute('href', "");

    let nameTitle = document.createElement('h2');
    nameTitle.innerHTML = name;

    section.appendChild(nameTitle);
    section.appendChild(link);

    if (parent) {
        // Récupération des informations du parent
        fetch(parent.url)
            .then(function (rawParentData) {
                return rawParentData.json();
            })
            .then(function (parentPokemon) {
                let parentName = getFrenchNameFromPokemon(parentPokemon);
                let newDiv = document.createElement('div');
                newDiv.innerHTML = `${name} est une évolution de <span data-parent-url="${parent.url}">${parentName}</span>`;

                link.parentNode.insertBefore(newDiv, link);
            });
    }

    htmlContainer.appendChild(section);
}

function getFrenchNameFromPokemon(pokemon) {
    // On récupère la liste des noms (dans tous les langues)
    let names = pokemon.names;
    for (let i = 0; i < names.length; i++) {
        const nameObj = names[i];
        if (nameObj.language.name === "fr") {
            return nameObj.name;
        }
    }

    return pokemon.name;
}
