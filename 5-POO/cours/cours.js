"use strict";

let valeriePerrin = new Author("Valérie", "Perrin");
valeriePerrin.dateOfBirth = new Date('1967/01/19');

let trois = new Book();
trois.date = new Date("2021/03/31");
trois.isbn = '9782226451149';
trois.sumup = `Je m'appelle Virginie.`;
trois.title = "Trois";
trois.addAuthor(valeriePerrin);

let changerLEau = new Book('9782253078647', `Changer l'eau des fleurs`, [valeriePerrin], new Date('2020/10/28'), "Violette Toussaint est garde-cimetière dans une petite ville de Bourgogne.");

console.log(trois);
console.log(changerLEau);
console.log(valeriePerrin);
