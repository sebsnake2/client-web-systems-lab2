export interface IBook {
  readonly id: string;

  title: string;
  author: string;
  year: number;

  readonly isBorrowed: boolean;
  readonly borrowedBy: string | null;

  borrow(userId: string): void;
  returnBook(): void;
}
