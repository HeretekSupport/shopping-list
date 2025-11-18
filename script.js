const STORAGE_KEY = 'items';
const EMPTY_INPUT_MESSAGE =
  'Gotta type in an item if you wanna add it, KID *teleports behind you*';

const enterItemForm = document.querySelector('#item-form');
const itemFormInput = document.querySelector('.form-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const filter = document.querySelector('#filter');

// ADD ITEMS

// Template for list items;
// Allows you to create items with exact attributes if no items exist to clone off of
function createListItem(itemText) {
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

function addItemToList(e) {
  e.preventDefault(); // Want to avoid sending anything for now

  const itemText = itemFormInput.value.trim();

  if (itemText === '') {
    alert(EMPTY_INPUT_MESSAGE);
    return;
  }

  //Create list item
  const normalizedText = itemText.toLowerCase();
  const newItem = createListItem(normalizedText);

  itemList.appendChild(newItem);
  itemFormInput.value = ''; //Reset the input each time

  addItemToStorage(normalizedText); //Add it to local storage as well
  checkUI();
}

// REMOVE ITEMS
function removeItemFromList(e) {
  if (e.target.closest('.remove-item')) {
    removeItemFromStorage(e.target.closest('li').textContent); //remove it from storage as well
    e.target.closest('li').remove();
    checkUI();
  }
}

function removeItemFromStorage(itemTextContent) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter(
    (item) => item !== itemTextContent
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsFromStorage));
}

function clearListItems(e) {
  const allItems = itemList.querySelectorAll('li');
  if (allItems.length < 1) {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  allItems.forEach((item) => item.remove());

  checkUI();
}

// CLEAR UI
// Filter and ClearAll should not show if there are no items

// FILTER ITEMS
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const searchText = e.target.value.toLowerCase();

  items.forEach((item) => {
    item.innerText.includes(searchText)
      ? (item.style.display = 'flex')
      : (item.style.display = 'none');
  });
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  const hasItems = items.length > 0;

  clearButton.style.display = hasItems ? 'block' : 'none';
  filter.style.display = hasItems ? 'block' : 'none';
}

// LOCAL STORAGE
// Get an array of the items, stringify and store locally (Local can only store strings)

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  const itemsFromStorage = localStorage.getItem(STORAGE_KEY);
  return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
}

function displayItemsFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    const newItem = createListItem(item);
    itemList.appendChild(newItem);
  });
  checkUI();
}

// Initialize App
function init() {
  //Event Listeners
  enterItemForm.addEventListener('submit', addItemToList);
  itemList.addEventListener('click', removeItemFromList);
  clearButton.addEventListener('click', clearListItems);
  filter.addEventListener('input', filterItems);
  displayItemsFromStorage();
}

// Wait for DOM to be ready and then init
document.addEventListener('DOMContentLoaded', init);