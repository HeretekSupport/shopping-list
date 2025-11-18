class Storage {
  constructor(storageKey = 'items') {
    this.storageKey = storageKey;
  }

  getItems() {
    const itemsFromStorage = localStorage.getItem(this.storageKey);
    return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
  }

  addItem(item) {
    const items = this.getItems();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  removeItem(itemTextContent) {
    let items = this.getItems();
    items = items.filter((item) => item !== itemTextContent);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clearAll() {
    localStorage.removeItem(this.storageKey);
  }
}

export default Storage;
