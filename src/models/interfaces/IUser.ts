export interface IUser {
  readonly id: string;

  name: string;
  email: string;

  readonly borrowedBookIds: readonly string[];

  addBorrowedBook(bookId: string): void;
  removeBorrowedBook(bookId: string): void;
}
