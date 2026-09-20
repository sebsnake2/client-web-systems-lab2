type Identifiable = {
  id: string;
};

export class Library<T extends Identifiable> {
  private items: T[] = [];

  addItem(item: T): void {
    if (this.findById(item.id)) {
      throw new Error(`Item with id "${item.id}" already exists`);
    }

    this.items.push(item);
  }

  removeItem(id: string): void {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id "${id}" was not found`);
    }

    this.items.splice(index, 1);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): readonly T[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }
}
