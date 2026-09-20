import { Book } from '../models/Book';
import { User } from '../models/User';

export class BorrowService {
  borrowBook(book: Book, user: User): void {
    book.borrow(user.id);
    user.addBorrowedBook(book.id);
  }

  returnBook(book: Book, user: User): void {
    if (book.borrowedBy !== user.id) {
      throw new Error('This book was not borrowed by this user');
    }

    book.returnBook();
    user.removeBorrowedBook(book.id);
  }
}
