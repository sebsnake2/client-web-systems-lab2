export interface BookData {
  id: string;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
  borrowedBy: string | null;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  borrowedBookIds: string[];
}
