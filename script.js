// ===============================
// 1. THE DATABASE (Simulated)
// ===============================
const products = [
  { id: 1, name: "Sony WH-1000XM5", price: 349, category: "Audio", image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=500&q=60" },
  { id: 2, name: "Apple Watch Ultra", price: 799, category: "Wearables", image: "https://images.unsplash.com/photo-1673308891251-872fa82a1599?auto=format&fit=crop&w=500&q=60" },
  { id: 3, name: "Nike Air Max 90", price: 129, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60" },
  { id: 4, name: "Mechanical Keyboard", price: 159, category: "Tech", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60" },
  { id: 5, name: "RayBan Aviator", price: 199, category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=60" },
  { id: 6, name: "PlayStation 5 Controller", price: 69, category: "Gaming", image: "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&w=500&q=60" }
];
// ===============================
// 2. STATE MANAGEMENT (The Cart)
// ===============================
// We check LocalStorage. If saved data exists, we use it. If not, we start with an empty array [].
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// DOM Elements
const productGrid = document.getElementById("product-grid");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
// ===============================
// 3. RENDER PRODUCTS (The Painter)
// ===============================
function renderProducts(items) {
  productGrid.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p style="color: grey; font-size: 0.9rem;">${product.category}</p>
                </div>
                <div>
                    <div class="product-price">$${product.price}</div>
                    <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    productGrid.appendChild(card);
  });
}
// ===============================
// 4. CART LOGIC (The Brain)
// ===============================
// A. SHOW / HIDE CART
function toggleCart() {
  // We toggle the class "open" which triggers the CSS slide animation
  cartSidebar.classList.toggle("open");
  cartOverlay.classList.toggle("open");
}
// B. ADD ITEM
function addToCart(id) {
  // 1. Find the product details from our database
  const product = products.find(p => p.id === id);
  // 2. Check if item is ALREADY in cart
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    // If yes, just increase quantity
    existingItem.quantity++;
  } else {
    // If no, add it as a new item with quantity 1
    cart.push({ ...product, quantity: 1 });
  }
  // 3. Save & Update UI
  saveCart();
  updateCartUI();
  toggleCart(); // Open cart automatically to show user
}
// C. REMOVE ITEM
function removeFromCart(id) {
  // We keep only the items that DO NOT match this ID
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}
// D. CHANGE QUANTITY (+ or -)
function updateQuantity(id, change) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change;
    // If quantity drops to 0, remove the item
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}
// E. UPDATE THE UI (The Refresher)
function updateCartUI() {
  // 1. Update the items drawn in the sidebar
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align: center; color: grey; margin-top: 50px;">Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(cartItem);
    });
  }
  // 2. Update Total Price (Using REDUCE - Senior Level!)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalElement.textContent = "$" + total.toFixed(2);
  // 3. Update Cart Badge Count
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalCount;
}
// F. SAVE TO LOCAL STORAGE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// G. CHECKOUT (Fake)
function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");
  alert("Thank you for your order! Total: " + cartTotalElement.textContent);
  cart = []; // Clear cart
  saveCart();
  updateCartUI();
  toggleCart(); // Close sidebar
}
// ===============================
// 5. INITIALIZATION
// ===============================
renderProducts(products);
updateCartUI(); // Load saved cart on refresh
// Add Search Functionality
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});
// ===============================
// 6. THEME SWITCHER (Dark/Light)
// ===============================
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;
// Check if user previously chose Light Mode
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeBtn.textContent = "🌙";
}
function toggleTheme() {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙";
  } else {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️";
  }
}
// ===============================
// 7. PAYMENT MODAL LOGIC
// ===============================
const paymentModal = document.getElementById("payment-modal");
const payAmountElement = document.getElementById("pay-amount");
function closeModal() {
  paymentModal.classList.remove("open");
}
// REDEFINE CHECKOUT (Override previous simple version)
function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");
  // Close sidebar first
  toggleCart();
  // Set total inside modal
  payAmountElement.textContent = document.getElementById("cart-total").textContent;
  // Open Modal
  paymentModal.classList.add("open");
}
// ASYNC PAYMENT SIMULATION
function processPayment() {
  const btn = document.getElementById("pay-btn");
  // 1. Loading State
  btn.textContent = "Processing... ⏳";
  btn.disabled = true;
  // 2. Simulate 2-second delay (Network Request)
  new Promise(resolve => setTimeout(resolve, 2000))
    .then(() => {
      // 3. Success State
      btn.textContent = "Success! ✅";
      btn.style.background = "#10b981";
      // Wait 1 more second so user sees "Success"
      return new Promise(resolve => setTimeout(resolve, 1000));
    })
    .then(() => {
      // 4. Cleanup
      alert("Order Placed Successfully!");
      cart = [];
      saveCart();
      updateCartUI();
      closeModal();
      // Reset Button
      btn.textContent = "Pay Now 🔒";
      btn.disabled = false;
    });
}
