import { Validation } from '../../utils/validators';

export interface UserFormData {
  name: string;
  email: string;
}

export function createUserForm(
  onSubmit: (data: UserFormData) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card shadow-sm mb-4';

  const body = document.createElement('div');
  body.className = 'card-body';

  const heading = document.createElement('h2');
  heading.className = 'h4 mb-3';
  heading.textContent = 'Додати Користувача';

  const form = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.className = 'form-control mb-2';
  nameInput.placeholder = "Ім'я";

  const nameError = document.createElement('div');
  nameError.className = 'text-danger small mb-2';

  const emailInput = document.createElement('input');
  emailInput.className = 'form-control mb-2';
  emailInput.placeholder = 'Email';

  const emailError = document.createElement('div');
  emailError.className = 'text-danger small mb-2';

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn btn-success';
  button.textContent = 'Додати Користувача';

  form.append(nameInput, nameError, emailInput, emailError, button);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    nameError.textContent = '';
    emailError.textContent = '';

    let isValid = true;

    if (!Validation.required(nameInput.value)) {
      nameError.textContent = 'Це поле є обов’язковим';
      isValid = false;
    }

    if (!Validation.required(emailInput.value)) {
      emailError.textContent = 'Це поле є обов’язковим';
      isValid = false;
    } else if (!Validation.validEmail(emailInput.value)) {
      emailError.textContent = 'Введіть коректний email';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    onSubmit({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    });

    form.reset();
  });

  body.append(heading, form);
  card.appendChild(body);

  return card;
}
