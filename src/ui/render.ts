import { Book } from '../models/Book';
import { User } from '../models/User';
import { BookFormData, createBookForm } from './components/BookForm';
import { createUserForm, UserFormData } from './components/UserForm';
import { createBookList } from './components/BookList';
import { createUserList } from './components/UserList';

interface RenderOptions {
  root: HTMLElement;
  books: readonly Book[];
  users: readonly User[];
  onAddBook: (data: BookFormData) => void;
  onAddUser: (data: UserFormData) => void;
  onBorrowBook: (book: Book) => void;
  onReturnBook: (book: Book) => void;
}

export function renderApp(options: RenderOptions): void {
  const {
    root,
    books,
    users,
    onAddBook,
    onAddUser,
    onBorrowBook,
    onReturnBook,
  } = options;

  root.replaceChildren();

  const container = document.createElement('div');
  container.className = 'container py-4';

  const title = document.createElement('h1');
  title.className = 'text-center mb-4';
  title.textContent = 'Система Управління Бібліотекою';

  container.append(
    title,
    createBookForm(onAddBook),
    createUserForm(onAddUser),
    createBookList({
      books,
      onBorrow: onBorrowBook,
      onReturn: onReturnBook,
    }),
    createUserList(users)
  );

  root.appendChild(container);
}
