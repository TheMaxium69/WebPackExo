"use strict"

// On récupère dans un premier temps les informations
// sur la première génération de pokémons
$.ajax({
    url: 'https://pokeapi.co/api/v2/generation/1/',
    success: function (generation) {
        // On récupère la liste des pokémons de cette génération (151)
        const list = generation.pokemon_species;

        // On récupère la liste complète des pokémons,
        // mais on pourrait tout à fait tester sur
        // un échantillon plus réduit (du 20 au 30 par exemple)
        for (let i = 0; i < list.length; i++) {
            const element = list[i];

            // Pour chaque pokémon, il nous faut
            // chercher plus d'informations et appeler l'url
            $.ajax({
                url: element.url,
                success: function (data) {
                    // Une fois qu'on a récupéré les informations sur 1 pokémon
                    // On va construire notre HTML
                    buildHTMLFromPokemon(data, element.url);
                }
            });
        }
    }
});

/**
 *
 * @param pokemon Les informations complètes sur un pokémon
 * @param pokemonUrl l'url pour récupérer un pokémon
 */
function buildHTMLFromPokemon(pokemon, pokemonUrl) {
    let id = pokemon.id;
    let name = getFrenchNameFromPokemon(pokemon);
    let parent = pokemon.evolves_from_species;

    // On construit la section et on met à jour ses attributs
    let section = $('<section>');
    section.attr('data-id', id);
    section.attr('data-name', name);
    section.attr('data-url', pokemonUrl);

    // On crée le lien et le h2
    let link = $('<a href="" class="more">Plus d\'informations</a>');

    let titleName = $('<h2>');
    titleName.html(name);

    // Si notre pokémon est une évolution d'un autre, on va chercher les informations nécessaires
    if (parent) {
        $.ajax({
            url: parent.url,
            success: function (parentPokemon) {
                let parentFrenchName = getFrenchNameFromPokemon(parentPokemon);

                let newDiv = $('<div>');
                newDiv.html(`${name} est une évolution de <span data-parent-url="${parent.url}">${parentFrenchName}</span>`);

                newDiv.insertAfter(titleName);
            }
        });
    }

    // On ajoute le titre et le lien dans notre section
    section.prepend(titleName);
    section.append(link);

    // Et on n'oublie pas d'ajouter notre section à la liste !
    section.appendTo('#pokemon');
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
