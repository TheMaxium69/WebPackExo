"use strict";

let wrapper = document.getElementById('wrapper');
let inner = document.getElementById('inner');
let email = document.getElementById('email');
let formResult = document.getElementById('form-result');
let form = document.querySelector('form.form');
let button = document.querySelector('form.form button');

// au clic dans le bloc wrapper (n'importe où), dupliquer le <span> (avec la méthode cloneNode() par exemple)
wrapper.addEventListener('click', function (event) {
    let spans = wrapper.querySelectorAll('span');
    let clone = spans[0].cloneNode(true);
    clone.removeAttribute('id');
    wrapper.appendChild(clone);
});

// au clic sur le lien inner, ajouter dans la console le texte "Le lien a été cliqué", mais sans dupliquer le span
inner.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Le lien a été cliqué");
});

email.addEventListener('keyup', fillFormResult);
// email.oninput = fillFormResult;
email.addEventListener('change', fillFormResult);


button.setAttribute('type', 'submit');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    fillFormResult();
    console.log(email.value);

    let checked = document.querySelector('input[name="test"]:checked');
    console.log(checked, checked.value);
});

function fillFormResult() {
    formResult.textContent = email.value;
}
