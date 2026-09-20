import { Book } from '../../models/Book';

interface BookListOptions {
  books: readonly Book[];
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export function createBookList(options: BookListOptions): HTMLElement {
  const { books, onBorrow, onReturn } = options;

  const card = document.createElement('div');
  card.className = 'card shadow-sm mb-4';

  const body = document.createElement('div');
  body.className = 'card-body';

  const heading = document.createElement('h2');
  heading.className = 'h4 mb-3';
  heading.textContent = 'Список Книг';

  body.appendChild(heading);

  if (books.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'text-muted mb-0';
    emptyMessage.textContent = 'Книг поки немає.';

    body.appendChild(emptyMessage);
  } else {
    const list = document.createElement('div');
    list.className = 'list-group list-group-flush';

    for (const book of books) {
      const item = document.createElement('div');
      item.className =
        'list-group-item d-flex justify-content-between align-items-center gap-3';

      const info = document.createElement('span');
      info.textContent = `${book.title} by ${book.author} (${book.year})`;

      const button = document.createElement('button');

      if (book.isBorrowed) {
        button.className = 'btn btn-warning btn-sm';
        button.textContent = 'Повернути';

        button.addEventListener('click', () => {
          onReturn(book);
        });
      } else {
        button.className = 'btn btn-primary btn-sm';
        button.textContent = 'Позичити';

        button.addEventListener('click', () => {
          onBorrow(book);
        });
      }

      item.append(info, button);
      list.appendChild(item);
    }

    body.appendChild(list);
  }

  card.appendChild(body);

  return card;
}
