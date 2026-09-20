import { User } from '../../models/User';

export function createUserList(users: readonly User[]): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card shadow-sm mb-4';

  const body = document.createElement('div');
  body.className = 'card-body';

  const heading = document.createElement('h2');
  heading.className = 'h4 mb-3';
  heading.textContent = 'Список Користувачів';

  body.appendChild(heading);

  if (users.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'text-muted mb-0';
    emptyMessage.textContent = 'Користувачів поки немає.';

    body.appendChild(emptyMessage);
  } else {
    const list = document.createElement('div');
    list.className = 'list-group list-group-flush';

    for (const user of users) {
      const item = document.createElement('div');
      item.className = 'list-group-item';

      item.textContent = `${user.id} ${user.name} (${user.email})`;

      list.appendChild(item);
    }

    body.appendChild(list);
  }

  card.appendChild(body);

  return card;
}
