let cart = [];
let products = [
    { id: 1, name: 'Areca Nut Shell Coasters', price: 10, image: 'coasters.jpg' },
    { id: 2, name: 'Areca Nut Shell Bowls', price: 20, image: 'bowls.jpg' }
];
let loggedInUser = null;

function addToCart(id, name, price) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    let totalPrice = 0;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        cartItems.innerHTML += 
            `<li>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</li>`;
    });

    totalPriceElem.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    document.getElementById('cart-count').innerText = cart.length;
}

function filterProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    document.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').innerText.toLowerCase();
        product.style.display = name.includes(query) ? '' : 'none';
    });
}

function showAddProductForm() {
    document.getElementById('add-product-form').style.display = 'block';
}

function addNewProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;
    
    if (name && !isNaN(price) && image) {
        const id = products.length + 1;
        products.push({ id, name, price, image });
        addProductToCatalog({ id, name, price, image });
        document.getElementById('add-product-form').style.display = 'none';
    }
}

function addProductToCatalog(product) {
    const productList = document.getElementById('product-list');
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.dataset.id = product.id;
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
}

function checkout() {
    if (loggedInUser) {
        alert('Proceeding to checkout.');
    } else {
        alert('Please log in to checkout.');
    }
}

function login() {
    const username = prompt('Enter username:');
    if (username) {
        loggedInUser = username;
        document.getElementById('username').innerText = `Welcome, ${username}`;
        document.getElementById('account-info').style.display = 'block';
        document.getElementById('login-register').style.display = 'none';
    }
}

function register() {
    const username = prompt('Enter a username to register:');
    if (username) {
        alert(`User ${username} registered successfully.`);
        login(); // Auto-login after registration
    }
}

function logout() {
    loggedInUser = null;
    document.getElementById('username').innerText = '';
    document.getElementById('account-info').style.display = 'none';
    document.getElementById('login-register').style.display = 'block';
}

// Initialize the product catalog
products.forEach(product => addProductToCatalog(product));
function checkout() {
    if (loggedInUser) {
        // Save cart data to localStorage and redirect to checkout page
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    } else {
        alert('Please log in to checkout.');
    }
}

function addNewProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;
    const email = document.getElementById('product-email').value; // Get email

    if (name && !isNaN(price) && image && email) {
        const id = products.length + 1;
        products.push({ id, name, price, image, email }); // Store email with product
        addProductToCatalog({ id, name, price, image, email });
        document.getElementById('add-product-form').style.display = 'none';
    } else {
        alert('Please fill out all fields.');
    }
}

function sendEmail(to, subject, body) {
    // This is a placeholder. You will need to integrate an email service here.
    console.log(`Email to: ${to}\nSubject: ${subject}\nBody: ${body}`);
}
function confirmOrder() {
    const email = document.getElementById('customer-email').value;
    if (email) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                sendEmail(product.email, 'New Order Received', `Order details: ${JSON.stringify(cart)}`);
            }
        });

        alert('Order confirmed! A confirmation email has been sent.');
        localStorage.removeItem('cart');
        window.location.href = 'thankyou.html'; // Redirect to thank you page
    } else {
        alert('Please enter your email.');
    }
}
