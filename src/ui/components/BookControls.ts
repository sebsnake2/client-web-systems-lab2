export type BookSort =
  'title-asc' | 'title-desc' | 'author-asc' | 'year-desc' | 'year-asc';

interface BookControlsOptions {
  search: string;
  sort: BookSort;
  onSearchChange: (value: string) => void;
  onSortChange: (value: BookSort) => void;
}

export function createBookControls(options: BookControlsOptions): HTMLElement {
  const { search, sort, onSearchChange, onSortChange } = options;

  const wrapper = document.createElement('div');
  wrapper.className = 'row g-2 mb-3';

  const searchColumn = document.createElement('div');
  searchColumn.className = 'col-md-8';

  const searchForm = document.createElement('form');
  searchForm.className = 'd-flex gap-2';

  const searchInput = document.createElement('input');
  searchInput.className = 'form-control';
  searchInput.placeholder = 'Пошук за назвою або автором';
  searchInput.value = search;

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'btn btn-primary';
  searchButton.textContent = 'Пошук';

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    onSearchChange(searchInput.value);
  });

  searchForm.append(searchInput, searchButton);
  searchColumn.appendChild(searchForm);

  const sortColumn = document.createElement('div');
  sortColumn.className = 'col-md-4';

  const select = document.createElement('select');
  select.className = 'form-select';

  const optionsList: Array<[BookSort, string]> = [
    ['title-asc', 'Назва: A → Z'],
    ['title-desc', 'Назва: Z → A'],
    ['author-asc', 'Автор: A → Z'],
    ['year-desc', 'Рік: новіші спочатку'],
    ['year-asc', 'Рік: старіші спочатку'],
  ];

  for (const [value, label] of optionsList) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    option.selected = value === sort;

    select.appendChild(option);
  }

  select.addEventListener('change', () => {
    onSortChange(select.value as BookSort);
  });

  sortColumn.appendChild(select);
  wrapper.append(searchColumn, sortColumn);

  return wrapper;
}
