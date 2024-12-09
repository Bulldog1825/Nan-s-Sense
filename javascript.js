// Sidebar toggle functionality
const sidebar = document.getElementById("sidebar");
const logoToggle = document.getElementById("logoToggle");

logoToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

const cart = []; // Array to store cart items

// Add item to cart
function addToCart(id, title, price, image) {
    price = parseFloat(price); // Ensure price is a number

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1; // Increment the quantity
    } else {
        cart.push({ id, title, price, image, quantity: 1 }); // Add new item
    }

    alert(`${title} has been added to your cart!`);
    console.log("Cart:", cart); // Debugging
}

// Display the shopping cart
function shoppingCart() {
    const cartContainer = document.getElementById("cart-container");
    const mainContent = document.getElementById("main-content");
    const footer = document.getElementById("footer");

    // Hide the main content and show the cart
    mainContent.style.display = "none"; // Hide product content
    cartContainer.style.display = "block"; // Show cart content
    footer.style.display = "none"; // Hide the footer

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear previous cart content

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your shopping cart is empty!</p>";
        return;
    }

    // Populate the cart with items
    cart.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" width="100" />
                <div>
                    <h3>${item.title}</h3>
                    <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                    <p>
                        <strong>Quantity:</strong>
                        <button onclick="decreaseQuantity('${item.id}')">-</button>
                        ${item.quantity}
                        <button onclick="increaseQuantity('${item.id}')">+</button>
                    </p>
                </div>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });
}

// Hide the cart and show the home/products
function showHome() {
    const cartContainer = document.getElementById("cart-container");
    const mainContent = document.getElementById("main-content");
    const footer = document.getElementById("footer");

    // Show main content and hide the cart
    mainContent.style.display = "block"; // Show product content
    cartContainer.style.display = "none"; // Hide cart content
    footer.style.display = "block"; // Show the footer

    // Default home content
    mainContent.innerHTML = `
        <center> <h1 class="greet" alt="Greet">Hello Customer, There are many items available for you, Click and shop now!</h1> </center>
        <div class="image-cont">
            <div class="image-box1">
                <img src="bag.png" alt="Bag product" onclick="fetchProducts()" />
            </div>
            <div class="image-box2">
                <img src="Accessories.png" alt="Accessories product" onclick="fetchProducts()" />
            </div>
            <div class="image-box3">
                <img src="Slim_fit_T-shirts.png" alt="T-shirt product" onclick="fetchProducts()" />
            </div>
        </div>
    `;
}

// Fetch products from Fake Store API
function fetchProducts() {
    const mainContent = document.getElementById('main-content');
    const cartContainer = document.getElementById("cart-container");
    const footer = document.getElementById("footer");

    // Show main content and hide the cart
    mainContent.style.display = "block";
    cartContainer.style.display = "none";
    footer.style.display = "none"; // Hide the footer

    mainContent.innerHTML = ''; // Clear previous content

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const productsList = document.createElement('div');
            productsList.classList.add('products-container');
            mainContent.appendChild(productsList);

            data.forEach(product => {
                const productItem = `
                    <div class="product">
                        <h2>${product.title}</h2>
                        <img src="${product.image}" alt="${product.title}" width="200" />
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <button onclick="addToCart('${product.id}', '${product.title}', '${product.price}', '${product.image}')">Add to Cart</button>
                    </div>
                `;
                productsList.innerHTML += productItem;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Decrease item quantity
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
            // Remove the item if quantity is 0
            cart.splice(cart.indexOf(item), 1);
        }
        shoppingCart(); // Refresh the cart display
        console.log("Item quantity decreased!");
    }
}

// Increase item quantity
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        shoppingCart(); // Refresh the cart display
        console.log("Item quantity increased!");
    }
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Thank you for shopping.");
    cart.length = 0; // Clear cart
    shoppingCart(); // Refresh cart display
    console.log("Order placed!");
}

// Show home by default
document.addEventListener('DOMContentLoaded', () => {
    showHome(); // Show home page
    const cartIcon = document.querySelector(".cart-icon");

    if (cartIcon) {
        cartIcon.addEventListener("click", shoppingCart);
    } else {
        console.error("Cart icon not found");
    }
});
