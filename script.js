/* REQS:
1) Add items to list via form [X]
2) Remove items from list when clicking X button [X]
3) Clear ALL items with "clear" button [X]
4) Filter items by typing in the filter field [X]
5) Add localStorage to persist items [~]
6) Click on an item to put into "edit mode" and add to form
7) Update item
8) Deploy to Netlify
*/

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

function addItemToList (e) {
    e.preventDefault(); // Want to avoid sending anything for now

    if (itemFormInput.value.trim() === '') {
        alert('Gotta type in an item if you wanna add it, KID *teleports behind you*');
        return;
    } 
    //Create list item
    const newItem = createListItem(itemFormInput.value);

    itemList.appendChild(newItem);
    
    itemFormInput.value = ''; //Reset the input each time
    addItemToStorage(newItem.textContent); //Add it to local storage as well
    checkUI();
}

// REMOVE ITEMS
function removeItemFromList(e) {
    if (e.target.closest('.remove-item')){
        removeItemFromStorage(e.target.closest('li').textContent); //remove it from storage as well
        e.target.closest('li').remove();
    }
    
    checkUI();
}

function removeItemFromStorage(itemTextContent){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((item) => item !== itemTextContent);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    checkUI();
}

function clearListItems(e) {
    const allItems = itemList.querySelectorAll('li');
    if (allItems.length < 1) {
        return;
    }
    allItems.forEach(item => {
        removeItemFromStorage(item.textContent);
        item.remove();
        
    })
    checkUI();
}

// CLEAR UI 
// Filter and ClearAll should not show if there are no items

// FILTER ITEMS
function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        if (item.innerText.includes(text.toLowerCase())){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}

function checkUI(){
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearButton.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        filter.style.display = 'block';
    }
}

// LOCAL STORAGE
// Get an array of the items, stringify and store locally (Local can only store strings)

function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    
    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage)); //Here we decide to use the 'items' key
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
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
function init (){
    //Event Listeners
enterItemForm.addEventListener('submit', addItemToList);
itemList.addEventListener('click', removeItemFromList);
clearButton.addEventListener('click', clearListItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItemsFromStorage);

checkUI();
}

init();

