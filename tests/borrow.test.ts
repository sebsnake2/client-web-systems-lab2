/// <reference types="mocha" />

import { expect } from 'chai';
import { Book } from '../src/models/Book';
import { User } from '../src/models/User';
import { BorrowService } from '../src/services/BorrowService';

describe('BorrowService', () => {
  let book: Book;
  let user: User;
  let borrowService: BorrowService;

  beforeEach(() => {
    book = new Book('1', 'Clean Code', 'Robert Martin', 2008);
    user = new User('1', 'Sebastian', 'sebastian@example.com');
    borrowService = new BorrowService();
  });

  it('borrows a book', () => {
    borrowService.borrowBook(book, user);

    expect(book.isBorrowed).to.equal(true);
    expect(book.borrowedBy).to.equal(user.id);
    expect(user.borrowedBookIds).to.include(book.id);
  });

  it('returns a book', () => {
    borrowService.borrowBook(book, user);
    borrowService.returnBook(book, user);

    expect(book.isBorrowed).to.equal(false);
    expect(book.borrowedBy).to.equal(null);
    expect(user.borrowedBookIds).not.to.include(book.id);
  });
});
