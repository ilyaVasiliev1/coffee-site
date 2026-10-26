import { categories, items } from './menu.js';

const state = { category: 'Все', cart: 0 };

const filters = document.getElementById('filters');
const menu = document.getElementById('menu');
const cartCount = document.getElementById('cart-count');

function renderFilters() {
  filters.innerHTML = '';
  for (const name of categories) {
    const b = document.createElement('button');
    b.textContent = name;
    b.className = 'chip';
    b.setAttribute('aria-pressed', String(name === state.category));
    b.addEventListener('click', () => {
      state.category = name;
      renderFilters();
      renderMenu();
    });
    filters.append(b);
  }
}

function renderMenu() {
  menu.innerHTML = '';
  for (const item of items.filter((i) => state.category === 'Все' || i.category === state.category)) {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<span class="name">${item.name}</span><span class="price">${item.price} ₽</span>`;
    const add = document.createElement('button');
    add.textContent = 'В корзину';
    add.addEventListener('click', () => {
      state.cart += 1;
      cartCount.textContent = String(state.cart);
    });
    li.append(add);
    menu.append(li);
  }
}

renderFilters();
renderMenu();
