import { Book } from '../models/Book';
import { User } from '../models/User';
import { BookFormData, createBookForm } from './components/BookForm';
import { createUserForm, UserFormData } from './components/UserForm';
import { createBookList } from './components/BookList';
import { createUserList } from './components/UserList';
import { BookSort, createBookControls } from './components/BookControls';
import { createPagination } from './components/Pagination';

interface RenderOptions {
  root: HTMLElement;
  books: readonly Book[];
  users: readonly User[];
  onAddBook: (data: BookFormData) => void;
  onAddUser: (data: UserFormData) => void;
  onBorrowBook: (book: Book) => void;
  onReturnBook: (book: Book) => void;
  onDeleteBook: (book: Book) => void;
  onDeleteUser: (user: User) => void;
  bookSearch: string;
  bookSort: BookSort;

  bookPage: number;
  userPage: number;

  totalBooks: number;
  totalUsers: number;
  pageSize: number;

  onSearchChange: (value: string) => void;
  onSortChange: (value: BookSort) => void;

  onBookPageChange: (page: number) => void;
  onUserPageChange: (page: number) => void;
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
    onDeleteBook,
    onDeleteUser,
    bookSearch,
    bookSort,
    bookPage,
    userPage,
    totalBooks,
    totalUsers,
    pageSize,
    onSearchChange,
    onSortChange,
    onBookPageChange,
    onUserPageChange,
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

    createBookControls({
      search: bookSearch,
      sort: bookSort,
      onSearchChange,
      onSortChange,
    }),

    createBookList({
      books,
      onBorrow: onBorrowBook,
      onReturn: onReturnBook,
      onDelete: onDeleteBook,
    }),

    createPagination({
      currentPage: bookPage,
      totalItems: totalBooks,
      pageSize,
      onPageChange: onBookPageChange,
    }),

    createUserList({
      users,
      onDelete: onDeleteUser,
    }),

    createPagination({
      currentPage: userPage,
      totalItems: totalUsers,
      pageSize,
      onPageChange: onUserPageChange,
    })
  );

  root.appendChild(container);
}
