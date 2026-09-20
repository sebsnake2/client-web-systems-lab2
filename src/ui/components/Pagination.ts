interface PaginationOptions {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function createPagination(options: PaginationOptions): HTMLElement {
  const { currentPage, totalItems, pageSize, onPageChange } = options;

  const totalPages = Math.ceil(totalItems / pageSize);

  const nav = document.createElement('nav');
  nav.className = 'mt-3';

  if (totalPages <= 1) {
    return nav;
  }

  const list = document.createElement('ul');
  list.className = 'pagination justify-content-center mb-0';

  for (let page = 1; page <= totalPages; page++) {
    const item = document.createElement('li');
    item.className = `page-item ${page === currentPage ? 'active' : ''}`;

    const button = document.createElement('button');
    button.className = 'page-link';
    button.textContent = String(page);

    button.addEventListener('click', () => {
      onPageChange(page);
    });

    item.appendChild(button);
    list.appendChild(item);
  }

  nav.appendChild(list);

  return nav;
}
