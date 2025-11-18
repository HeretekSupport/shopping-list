import Storage from './Storage.js';
import UI from './UI.js';

class ShoppingListApp {
  constructor() {
    this.storage = new Storage('items');
    this.ui = new UI();
    this.EMPTY_INPUT_MESSAGE =
      'Gotta type in an item if you wanna add it, KID *teleports behind you*';

    this.itemFormInput = document.querySelector('.form-input');
    this.enterItemForm = document.querySelector('#item-form');

    this.init();
  }

  init() {
    // Load items from storage on page load
    this.ui.displayItemsFromStorage(this.storage.getItems());

    // Event Listeners
    this.enterItemForm.addEventListener('submit', (e) => this.addItem(e));
    this.ui.itemList.addEventListener('click', (e) => this.removeItem(e));
    this.ui.clearButton.addEventListener('click', () => this.clearAll());
    this.ui.filter.addEventListener('input', (e) => this.filterItems(e));
  }

  addItem(e) {
    e.preventDefault();

    const itemText = this.itemFormInput.value.trim();

    if (itemText === '') {
      alert(this.EMPTY_INPUT_MESSAGE);
      return;
    }

    const normalizedText = itemText.toLowerCase();

    // Add to DOM and storage
    this.ui.addItemToDOM(normalizedText);
    this.storage.addItem(normalizedText);

    // Reset input and update UI
    this.itemFormInput.value = '';
    this.ui.updateUI();
  }

  removeItem(e) {
    if (e.target.closest('.remove-item')) {
      const listItem = e.target.closest('li');
      const itemText = listItem.textContent;

      // Remove from storage and DOM
      this.storage.removeItem(itemText);
      this.ui.removeItemFromDOM(listItem);
      this.ui.updateUI();
    }
  }

  clearAll() {
    const allItems = this.ui.itemList.querySelectorAll('li');
    if (allItems.length < 1) {
      return;
    }

    // Clear storage and DOM
    this.storage.clearAll();
    this.ui.clearAllItems();
    this.ui.updateUI();
  }

  filterItems(e) {
    this.ui.filterItems(e.target.value);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ShoppingListApp();
});
