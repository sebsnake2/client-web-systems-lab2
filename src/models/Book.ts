import { IBook } from './interfaces/IBook';
import { BookData } from '../types';

export class Book implements IBook {
  private _isBorrowed = false;
  private _borrowedBy: string | null = null;

  constructor(
    private readonly _id: string,
    private _title: string,
    private _author: string,
    private _year: number
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get isBorrowed(): boolean {
    return this._isBorrowed;
  }

  get borrowedBy(): string | null {
    return this._borrowedBy;
  }

  borrow(userId: string): void {
    if (this._isBorrowed) {
      throw new Error('Book is already borrowed');
    }

    this._isBorrowed = true;
    this._borrowedBy = userId;
  }

  returnBook(): void {
    if (!this._isBorrowed) {
      throw new Error('Book is not borrowed');
    }

    this._isBorrowed = false;
    this._borrowedBy = null;
  }

  toData(): BookData {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      year: this.year,
      isBorrowed: this.isBorrowed,
      borrowedBy: this.borrowedBy,
    };
  }

  static fromData(data: BookData): Book {
    const book = new Book(data.id, data.title, data.author, data.year);

    if (data.isBorrowed && data.borrowedBy) {
      book.borrow(data.borrowedBy);
    }

    return book;
  }
}
