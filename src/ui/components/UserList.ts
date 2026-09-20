import { User } from '../../models/User';

interface UserListOptions {
  users: readonly User[];
  onDelete: (user: User) => void;
}

export function createUserList(options: UserListOptions): HTMLElement {
  const { users, onDelete } = options;

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
      item.className =
        'list-group-item d-flex justify-content-between align-items-center gap-3';

      const info = document.createElement('span');
      info.textContent = `${user.id} ${user.name} (${user.email})`;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.textContent = 'Видалити';

      deleteButton.addEventListener('click', () => {
        onDelete(user);
      });

      item.append(info, deleteButton);
      list.appendChild(item);
    }

    body.appendChild(list);
  }

  card.appendChild(body);

  return card;
}
