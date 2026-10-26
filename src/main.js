import { categories, items } from './menu.js';

const state = { category: 'Все', cart: 0 };

const filters = document.getElementById('filters');
const menu = document.getElementById('menu');
const cartCount = document.getElementById('cart-count');

const dialog = document.createElement('dialog');
dialog.id = 'photo-dialog';
dialog.className = 'photo-dialog';
dialog.innerHTML = '<img class="photo" alt="" /><p class="photo-title"></p><button class="photo-close">Закрыть</button>';
document.body.append(dialog);
dialog.querySelector('.photo-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});

// Заглушка вместо реального фото: SVG в data-URI, без внешних путей.
function photoSrc(item) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320"><rect width="480" height="320" fill="#e4d8c8"/><text x="240" y="170" font-size="32" text-anchor="middle" fill="#8a4b24" font-family="sans-serif">${item.name}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function openPhoto(item) {
  const img = dialog.querySelector('.photo');
  img.src = photoSrc(item);
  img.alt = item.name;
  dialog.querySelector('.photo-title').textContent = `${item.name} · ${item.price} ₽`;
  dialog.showModal();
}

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
    const photo = document.createElement('button');
    photo.textContent = 'Фото';
    photo.className = 'photo-btn';
    photo.setAttribute('aria-label', `Фото: ${item.name}`);
    photo.addEventListener('click', () => openPhoto(item));
    li.append(photo);
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
