"use strict";

let containerJquery = $('#jokes');
let container = document.querySelector('#jokes');

// Version VanillaJS

// fetch('https://official-joke-api.appspot.com/jokes/ten')
//     .then(function (rawData) {
//         return rawData.json();
//     })
//     .then(function (jokes) {
//         jokes.forEach(joke => {
//             let article = document.createElement('article');
//             article.setAttribute('id', 'joke-' + joke.id);
//             article.dataset.type = joke.type;

//             let setup = document.createElement('h2');
//             setup.innerHTML = joke.setup;
//             article.appendChild(setup);

//             let punchline = document.createElement('p');
//             punchline.innerHTML = joke.punchline;
//             article.appendChild(punchline);

//             container.appendChild(article);
//         });
//     });


// Version JQuery
$.ajax({
    url: "https://official-joke-api.appspot.com/jokes/ten",
    success: function (jokes) {
        // Attention, on a un tableau d'éléments, il faut donc le parcourir pour récupérer chaque élément.
        jokes.forEach(joke => {
            createArticleJQuery(containerJquery, joke);
        });
    }
});

/**
 * @param jokesHTML l'élément HTML (récupéré avec JQuery) qui va contenir nos blagues
 * @param jokeJSON L'objet JS (converti du JSON) qu'on a récupéré avec l'API
 */
function createArticleJQuery(jokesHTML, jokeJSON) {
    // On crée nos éléments HTML
    let article = $('<article>');
    let setup = $('<h2>');
    let punchline = $('<p>');

    // On en met à jour le contenu
    article.attr('id', 'joke-' + jokeJSON.id);
    article.attr('data-type', jokeJSON.type);
    setup.text(jokeJSON.setup);
    punchline.text(jokeJSON.punchline);

    // On oublie pas d'imbriquer les différents éléments
    // setup et punchline vont dans l'article
    // Et l'article va dans notre
    article.append(setup);
    article.append(punchline);
    // On peut aussi écrire article.appendTo('#jokes');
    jokesHTML.append(article);
}
