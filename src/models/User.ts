import { IUser } from './interfaces/IUser';
import { UserData } from '../types';

export class User implements IUser {
  private _borrowedBookIds: string[] = [];

  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get borrowedBookIds(): readonly string[] {
    return this._borrowedBookIds;
  }

  addBorrowedBook(bookId: string): void {
    if (!this._borrowedBookIds.includes(bookId)) {
      this._borrowedBookIds.push(bookId);
    }
  }

  removeBorrowedBook(bookId: string): void {
    this._borrowedBookIds = this._borrowedBookIds.filter((id) => id !== bookId);
  }

  toData(): UserData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      borrowedBookIds: [...this.borrowedBookIds],
    };
  }

  static fromData(data: UserData): User {
    const user = new User(data.id, data.name, data.email);

    for (const bookId of data.borrowedBookIds) {
      user.addBorrowedBook(bookId);
    }

    return user;
  }
}
