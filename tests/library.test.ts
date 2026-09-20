/// <reference types="mocha" />

import { expect } from 'chai';
import { Library } from '../src/services/Library';
import { Book } from '../src/models/Book';

describe('Library', () => {
  let library: Library<Book>;

  beforeEach(() => {
    library = new Library<Book>();
  });

  it('adds an item', () => {
    const book = new Book('1', 'Clean Code', 'Robert Martin', 2008);

    library.addItem(book);

    expect(library.getAll()).to.have.length(1);
    expect(library.findById('1')).to.equal(book);
  });

  it('removes an item', () => {
    const book = new Book('1', 'Clean Code', 'Robert Martin', 2008);

    library.addItem(book);
    library.removeItem('1');

    expect(library.getAll()).to.have.length(0);
  });

  it('finds items using a predicate', () => {
    library.addItem(new Book('1', 'Clean Code', 'Robert Martin', 2008));

    library.addItem(new Book('2', 'Code Complete', 'Steve McConnell', 2004));

    const result = library.find((book) =>
      book.title.toLowerCase().includes('clean')
    );

    expect(result).to.have.length(1);
    expect(result[0].title).to.equal('Clean Code');
  });
});
