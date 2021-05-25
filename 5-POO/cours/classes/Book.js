"use strict";

class Book {
    constructor(isbn = "", title = "", authors = [], date = new Date(), sumup = "") {
        this.isbn = isbn;
        this.setTitle(title);
        this.authors = [];

        authors.forEach(author => {
            this.addAuthor(author);
        });

        this.date = date;
        this.sumup = sumup;
    }

    setTitle(title) {
        this.title = title.toUpperCase();
    }

    addAuthor(author) {
        if (!this.authors.includes(author)) {
            this.authors.push(author);
            author.addBook(this);
        }
    }
}
