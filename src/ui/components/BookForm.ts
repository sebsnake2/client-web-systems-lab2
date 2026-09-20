import { Validation } from '../../utils/validators';

export interface BookFormData {
  title: string;
  author: string;
  year: number;
}

export function createBookForm(
  onSubmit: (data: BookFormData) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card shadow-sm mb-4';

  const body = document.createElement('div');
  body.className = 'card-body';

  const heading = document.createElement('h2');
  heading.className = 'h4 mb-3';
  heading.textContent = 'Додати Книгу';

  const form = document.createElement('form');

  const titleInput = document.createElement('input');
  titleInput.className = 'form-control mb-2';
  titleInput.placeholder = 'Назва книги';

  const titleError = document.createElement('div');
  titleError.className = 'text-danger small mb-2';

  const authorInput = document.createElement('input');
  authorInput.className = 'form-control mb-2';
  authorInput.placeholder = 'Автор';

  const authorError = document.createElement('div');
  authorError.className = 'text-danger small mb-2';

  const yearInput = document.createElement('input');
  yearInput.className = 'form-control mb-2';
  yearInput.placeholder = 'Рік видання';

  const yearError = document.createElement('div');
  yearError.className = 'text-danger small mb-2';

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn btn-success';
  button.textContent = 'Додати Книгу';

  form.append(
    titleInput,
    titleError,
    authorInput,
    authorError,
    yearInput,
    yearError,
    button
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    titleError.textContent = '';
    authorError.textContent = '';
    yearError.textContent = '';

    let isValid = true;

    if (!Validation.required(titleInput.value)) {
      titleError.textContent = 'Це поле є обов’язковим';
      isValid = false;
    }

    if (!Validation.required(authorInput.value)) {
      authorError.textContent = 'Це поле є обов’язковим';
      isValid = false;
    }

    if (!Validation.required(yearInput.value)) {
      yearError.textContent = 'Це поле є обов’язковим';
      isValid = false;
    } else if (!Validation.validYear(yearInput.value)) {
      yearError.textContent = 'Введіть коректний рік цифрами';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    onSubmit({
      title: titleInput.value.trim(),
      author: authorInput.value.trim(),
      year: Number(yearInput.value),
    });

    form.reset();
  });

  body.append(heading, form);
  card.appendChild(body);

  return card;
}
