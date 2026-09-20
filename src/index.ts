import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import { Book } from './models/Book';
import { User } from './models/User';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { BorrowService } from './services/BorrowService';
import { NotificationService } from './ui/NotificationService';

import type { BookData, UserData } from './types';
import type { BookSort } from './ui/components/BookControls';

import { generateId } from './utils/idGenerator';
import { renderApp } from './ui/render';
import { showUserIdModal } from './ui/components/Modal';

const BOOKS_STORAGE_KEY = 'library-books';
const USERS_STORAGE_KEY = 'library-users';

const PAGE_SIZE = 5;

let bookSearch = '';
let bookSort: BookSort = 'title-asc';

let bookPage = 1;
let userPage = 1;

function getAppRoot(): HTMLElement {
  const app = document.getElementById('app');

  if (!app) {
    throw new Error('App root element was not found');
  }

  return app;
}

const app = getAppRoot();

const bookLibrary = new Library<Book>();
const userLibrary = new Library<User>();

const storage = new Storage();
const borrowService = new BorrowService();
const notificationService = new NotificationService();

const savedBooks = storage.load<BookData[]>(BOOKS_STORAGE_KEY) ?? [];

const savedUsers = storage.load<UserData[]>(USERS_STORAGE_KEY) ?? [];

for (const bookData of savedBooks) {
  bookLibrary.addItem(Book.fromData(bookData));
}

for (const userData of savedUsers) {
  userLibrary.addItem(User.fromData(userData));
}

function saveState(): void {
  storage.save(
    BOOKS_STORAGE_KEY,
    bookLibrary.getAll().map((book) => book.toData())
  );

  storage.save(
    USERS_STORAGE_KEY,
    userLibrary.getAll().map((user) => user.toData())
  );
}

function render(): void {
  const allBooks = [...bookLibrary.getAll()];
  const allUsers = [...userLibrary.getAll()];

  const normalizedSearch = bookSearch.trim().toLowerCase();

  const filteredBooks = allBooks.filter((book) => {
    if (!normalizedSearch) {
      return true;
    }

    return (
      book.title.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch)
    );
  });

  filteredBooks.sort((a, b) => {
    switch (bookSort) {
      case 'title-desc':
        return b.title.localeCompare(a.title);

      case 'author-asc':
        return a.author.localeCompare(b.author);

      case 'year-desc':
        return b.year - a.year;

      case 'year-asc':
        return a.year - b.year;

      case 'title-asc':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const totalBookPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / PAGE_SIZE)
  );

  const totalUserPages = Math.max(1, Math.ceil(allUsers.length / PAGE_SIZE));

  bookPage = Math.min(bookPage, totalBookPages);
  userPage = Math.min(userPage, totalUserPages);

  const bookStart = (bookPage - 1) * PAGE_SIZE;

  const visibleBooks = filteredBooks.slice(bookStart, bookStart + PAGE_SIZE);

  const userStart = (userPage - 1) * PAGE_SIZE;

  const visibleUsers = allUsers.slice(userStart, userStart + PAGE_SIZE);

  renderApp({
    root: app,

    books: visibleBooks,
    users: visibleUsers,

    bookSearch,
    bookSort,

    bookPage,
    userPage,

    totalBooks: filteredBooks.length,
    totalUsers: allUsers.length,

    pageSize: PAGE_SIZE,

    onAddBook: (data) => {
      const book = new Book(generateId(), data.title, data.author, data.year);

      bookLibrary.addItem(book);

      saveState();
      render();
    },

    onAddUser: (data) => {
      const user = new User(generateId(), data.name, data.email);

      userLibrary.addItem(user);

      saveState();
      render();
    },

    onBorrowBook: (book) => {
      showUserIdModal((userId) => {
        const user = userLibrary.findById(userId);

        if (!user) {
          notificationService.show('Користувача з таким ID не знайдено.');
          return;
        }

        if (user.borrowedBookIds.length >= 3) {
          notificationService.show(
            'Користувач не може позичити більше 3 книг.'
          );
          return;
        }

        try {
          borrowService.borrowBook(book, user);

          saveState();
          render();

          notificationService.show(
            `${book.title} by ${book.author} (${book.year}) has been borrowed by ${user.id} ${user.name} (${user.email}).`
          );
        } catch (error) {
          notificationService.show(
            error instanceof Error
              ? error.message
              : 'Не вдалося позичити книгу.'
          );
        }
      });
    },

    onReturnBook: (book) => {
      if (!book.borrowedBy) {
        return;
      }

      const user = userLibrary.findById(book.borrowedBy);

      if (!user) {
        notificationService.show(
          'Користувача, який позичив книгу, не знайдено.'
        );
        return;
      }

      try {
        borrowService.returnBook(book, user);

        saveState();
        render();

        notificationService.show(
          `${book.title} by ${book.author} (${book.year}) has been returned.`
        );
      } catch (error) {
        notificationService.show(
          error instanceof Error ? error.message : 'Не вдалося повернути книгу.'
        );
      }
    },

    onDeleteBook: (book) => {
      if (book.isBorrowed) {
        notificationService.show(
          'Спочатку поверніть книгу, а потім видаліть її.'
        );
        return;
      }

      bookLibrary.removeItem(book.id);

      saveState();
      render();

      notificationService.show(`Книгу "${book.title}" видалено.`);
    },

    onDeleteUser: (user) => {
      if (user.borrowedBookIds.length > 0) {
        notificationService.show(
          'Неможливо видалити користувача, поки він має позичені книги.'
        );
        return;
      }

      userLibrary.removeItem(user.id);

      saveState();
      render();

      notificationService.show(`Користувача ${user.name} видалено.`);
    },

    onSearchChange: (value) => {
      bookSearch = value;
      bookPage = 1;
      render();
    },

    onSortChange: (value) => {
      bookSort = value;
      bookPage = 1;
      render();
    },

    onBookPageChange: (page) => {
      bookPage = page;
      render();
    },

    onUserPageChange: (page) => {
      userPage = page;
      render();
    },
  });
}

render();
