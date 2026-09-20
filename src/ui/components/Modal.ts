import { Validation } from '../../utils/validators';

export function showUserIdModal(onSubmit: (userId: string) => void): void {
  const backdrop = document.createElement('div');
  backdrop.className =
    'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
  backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  backdrop.style.zIndex = '1050';

  const modal = document.createElement('div');
  modal.className = 'bg-white rounded shadow';
  modal.style.width = '500px';
  modal.style.maxWidth = '90%';

  const header = document.createElement('div');
  header.className =
    'p-4 border-bottom d-flex justify-content-between align-items-center';

  const title = document.createElement('h2');
  title.className = 'h4 mb-0';
  title.textContent = 'Введіть ID користувача для позичення книги:';

  const closeButton = document.createElement('button');
  closeButton.className = 'btn-close';

  header.append(title, closeButton);

  const body = document.createElement('div');
  body.className = 'p-4';

  const input = document.createElement('input');
  input.className = 'form-control form-control-lg';
  input.placeholder = 'ID';

  const error = document.createElement('div');
  error.className = 'text-danger small mt-2';

  body.append(input, error);

  const footer = document.createElement('div');
  footer.className = 'p-3 border-top d-flex justify-content-end gap-2';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'btn btn-secondary';
  cancelButton.textContent = 'Скасувати';

  const saveButton = document.createElement('button');
  saveButton.className = 'btn btn-primary';
  saveButton.textContent = 'Зберегти';

  footer.append(cancelButton, saveButton);

  modal.append(header, body, footer);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const close = (): void => {
    backdrop.remove();
  };

  closeButton.addEventListener('click', close);
  cancelButton.addEventListener('click', close);

  saveButton.addEventListener('click', () => {
    const userId = input.value.trim();

    if (!Validation.required(userId)) {
      error.textContent = 'ID користувача є обов’язковим';
      return;
    }

    if (!Validation.validUserId(userId)) {
      error.textContent = 'ID користувача повинен містити тільки цифри';
      return;
    }

    close();
    onSubmit(userId);
  });

  input.focus();
}
