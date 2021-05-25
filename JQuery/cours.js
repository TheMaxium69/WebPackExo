"use strict";

let links = $('a');
// console.log(links);

let footers = $('#footer');
// console.log(footers);

let articles = $('.article');
// console.log(articles);

let paragraphs = $("article p:nth-child(2)");
// console.log(p);

links.on('click', function (event) {
    event.preventDefault();

    // return false; // équivalent au preventDefault, mais uniquement en JQuery
});

// Equivalent avec 2 événements
//
// paragraphs.on('mouseenter', function () {
//     console.log('Vous entrez');
// });
//
// paragraphs.on('mouseleave', function () {
//     console.log('vous sortez');
// })

paragraphs.hover(function (event) {
    $(this).addClass('paragraph--hovered');
    console.log('Vous entrez');

    // Equivalent à
    // let self = $(event.target);
    // self.addClass('paragraph--hovered');
}, function (event) {
    $(this).removeClass('paragraph--hovered');
    console.log('Vous sortez');

    // Equivalent à
    // let self = $(event.target);
    // self.removeClass('paragraph--hovered');
});

// D'autres manières de faire la même chose

// paragraphs.on('mouseenter', function () {
//     $(this).addClass('paragraph--hovered');
// });

// paragraphs.on('mouseleave', function () {
//     $(this).removeClass('paragraph--hovered');
// });

// paragraphs.hover(function () {
//     $(this).toggleClass('paragraph--hovered');
// });

$('footer a').on('click', function (event) {
    $(this).html('Ce lien a été cliqué');
    event.preventDefault();
});

let countArticles = articles.length;
let main = $('main');
main.prepend(`Il y a ${countArticles} articles`);

articles.on('mouseenter', function (event) {
    // let number = $(this).attr('data-number');
    let number = $(event.target).data('number');
    $(this).attr('id', 'article-' + number);
});
