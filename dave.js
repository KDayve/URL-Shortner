// script.js

let cart = [];

// 1. Fetch Products from Backend
async function loadProducts() {
    try {
        // Note: Ensure your backend server.js is running on port 5000
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; 

        products.forEach(product => {
            // We use a placeholder image URL since we don't have real images yet
            const imageUrl = product.image || 'https://placehold.co/300x400/e0e0e0/333?text=No+Image';
            
            productList.innerHTML += `
                <div class="product-card">
                    <img src="${imageUrl}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">$${product.price}</span>
                            <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById('product-list').innerHTML = "<p>Failed to load products. Is the backend running?</p>";
    }
}

// 2. Cart Functions
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItemsList = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align:center; color:#888;">Your cart is empty.</p>';
    } else {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            cartItemsList.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>$${item.price} <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;margin-left:10px;">&times;</button></span>
                </div>
            `;
            total += item.price;
        });
        document.getElementById('cart-total').innerText = total.toFixed(2);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 3. Toggle Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    // Toggle overlay visibility
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
}

// 4. Checkout
async function checkout() {
    if(cart.length === 0) return alert("Your cart is empty!");
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                items: cart, 
                total: total, 
                customerEmail: "guest@example.com" // In a real app, this comes from the logged-in user
            })
        });
        
        if(response.ok) {
            alert("Order placed successfully! Thank you for shopping with Apex.");
            cart = [];
            updateCartUI();
            toggleCart(); // Close cart
        } else {
            alert("Failed to place order.");
        }
    } catch (error) {
        console.error("Checkout error:", error);
    }
}

// Initialize
loadProducts();