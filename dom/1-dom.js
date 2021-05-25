"use strict";

let header = document.querySelector("#header");
let main = document.getElementById('main');
let paragraphs = document.querySelectorAll('p');
let footer = document.getElementById('footer');
let footer1 = document.querySelector('footer#footer');

let newParagraph = document.createElement('p');
newParagraph.innerHTML = 'Ceci est un contenu <strong>très important</strong>';

main.appendChild(newParagraph);

paragraphs.forEach(paragraph => {
    paragraph.style.color = "#000F00";
    paragraph.classList.replace('paragraph', 'text');
});

let newList = document.createElement('ul');
header.appendChild(newList);

newList.classList.add("list");
newList.setAttribute('id', 'important-list');

for (let i = 0; i < 4; i++) {
    let newLi = document.createElement('li');
    newList.appendChild(newLi);

    newLi.classList.add('list__element');
    newLi.dataset.num = i + 1;
    newLi.textContent = `Ceci est l'élément n°${i}`;
}
