"use strict";

class Author {
    constructor(firstName, lastName = "", books = [], dateOfBirth = new Date()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.books = books;
        this.dateOfBirth = dateOfBirth;
    }

    addBook(book) {
        if (!this.books.includes(book)) {
            this.books.push(book);
            book.addAuthor(this);
        }
    }
}
