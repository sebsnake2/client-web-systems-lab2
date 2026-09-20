export class NotificationService {
  show(message: string): void {
    const backdrop = document.createElement('div');
    backdrop.className =
      'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.zIndex = '1060';

    const modal = document.createElement('div');
    modal.className = 'bg-white rounded shadow';
    modal.style.width = '500px';
    modal.style.maxWidth = '90%';

    const body = document.createElement('div');
    body.className = 'p-4';

    const text = document.createElement('p');
    text.className = 'mb-0 fs-5';
    text.textContent = message;

    body.appendChild(text);

    const footer = document.createElement('div');
    footer.className = 'p-3 border-top text-end';

    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Закрити';

    footer.appendChild(button);

    modal.append(body, footer);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    button.addEventListener('click', () => {
      backdrop.remove();
    });
  }
}
