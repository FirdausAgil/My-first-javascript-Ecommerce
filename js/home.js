import { dataMenu } from "../data/dataMenu.js";

const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

// Tambahkan event listener untuk membuka jendela belanja
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Tambahkan event listener untuk menutup jendela belanja
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

const listCards = [];

function initApp() {
    dataMenu.forEach((value, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button class="addToCartButton">Add To Cart</button>`;
        list.appendChild(newDiv);

        // Tambahkan event listener untuk tombol "Add To Cart"
        newDiv.querySelector('.addToCartButton').addEventListener('click', () => {
            addToCard(key);
        });
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // Copy product from dataMenu to listCard
        listCards[key] = { ...dataMenu[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            const newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button class="decrementButton">-</button>
                    <div class="count">${value.quantity}</div>
                    <button class="incrementButton">+</button>
                </div>`;
            listCard.appendChild(newDiv);

            // Tambahkan event listener untuk tombol increment dan decrement
            newDiv.querySelector('.decrementButton').addEventListener('click', () => {
                changeQuantity(key, value.quantity - 1);
            });
            newDiv.querySelector('.incrementButton').addEventListener('click', () => {
                changeQuantity(key, value.quantity + 1);
            });
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}

// (Tidak ada perubahan pada bagian pengelolaan data pengguna)

function getDataUser() {
    const dataUser = localStorage.getItem('user');

    if (dataUser) {
        const conData = JSON.parse(dataUser);

        const imgElm = document.getElementById('img_user');
        imgElm.src = conData.imgUrl;

        const usernameElm = document.getElementById('username');
        usernameElm.innerHTML = conData.username;
    } else {
        window.location.href = 'login.html';
    }
}

getDataUser();

const onLogout = () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
};

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
    onLogout();
});
