class UI {
  constructor() {
    this.itemList = document.querySelector('#item-list');
    this.clearButton = document.querySelector('#clear');
    this.filter = document.querySelector('#filter');
  }

  createListItem(itemText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    const icon = document.createElement('i');

    li.className = 'item';
    span.className = 'item-text';
    button.className = 'remove-item btn-link text-red';
    icon.className = 'fa-solid fa-xmark';

    span.textContent = itemText.toLowerCase();

    button.appendChild(icon);
    li.appendChild(span);
    li.appendChild(button);

    return li;
  }

  addItemToDOM(itemText) {
    const newItem = this.createListItem(itemText);
    this.itemList.appendChild(newItem);
  }

  removeItemFromDOM(listItem) {
    listItem.remove();
  }

  clearAllItems() {
    const allItems = this.itemList.querySelectorAll('li');
    allItems.forEach((item) => item.remove());
  }

  filterItems(searchText) {
    const items = this.itemList.querySelectorAll('li');
    const lowerSearchText = searchText.toLowerCase();

    items.forEach((item) => {
      item.innerText.includes(lowerSearchText)
        ? (item.style.display = 'flex')
        : (item.style.display = 'none');
    });
  }

  updateUI() {
    const items = this.itemList.querySelectorAll('li');
    const hasItems = items.length > 0;

    this.clearButton.style.display = hasItems ? 'block' : 'none';
    this.filter.style.display = hasItems ? 'block' : 'none';
  }

  displayItemsFromStorage(items) {
    items.forEach((item) => {
      this.addItemToDOM(item);
    });
    this.updateUI();
  }
}

export default UI;
