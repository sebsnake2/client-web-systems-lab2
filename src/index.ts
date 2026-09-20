import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import { Book } from './models/Book';
import { User } from './models/User';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { BookData, UserData } from './types';
import { generateId } from './utils/idGenerator';
import { renderApp } from './ui/render';
import { BorrowService } from './services/BorrowService';
import { NotificationService } from './services/NotificationService';
import { showUserIdModal } from './ui/components/Modal';

const BOOKS_STORAGE_KEY = 'library-books';
const USERS_STORAGE_KEY = 'library-users';

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
  renderApp({
    root: app,
    books: bookLibrary.getAll(),
    users: userLibrary.getAll(),

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
  });
}

render();
