// --- Product catalog - all products with sizes and prices
const PRODUCTS = [
  // Brownies
  { cat: "brownie", name: "Classic Brownie", img: "classic_brownie.jpg", sizes: ["250g", "500g", "1kg"], prices: [250, 500, 1000] },
  { cat: "brownie", name: "Double Chocolate", img: "double_chocolate.jpg", sizes: ["250g", "500g", "1kg"], prices: [300, 600, 1200] },
  { cat: "brownie", name: "Triple Chocolate", img: "triple_chocolate.jpg", sizes: ["250g", "500g", "1kg"], prices: [315, 625, 1249] },
  { cat: "brownie", name: "Nuts Loaded", img: "nuts_loaded_brownie.jpg", sizes: ["250g", "500g", "1kg"], prices: [325, 650, 1299] },
  { cat: "brownie", name: "Chocochips", img: "chocochips_brownie.jpg", sizes: ["250g", "500g", "1kg"], prices: [300, 600, 1199] },
  { cat: "brownie", name: "Nutella", img: "nutella_brownie.jpg", sizes: ["250g", "500g", "1kg"], prices: [290, 575, 1149] },
  { cat: "brownie", name: "KitKat", img: "kitkat_brownie.jpg", sizes: ["250g", "500g", "1kg"], prices: [290, 575, 1149] },
  // Cookies
  { cat: "cookie", name: "Butter Wheat", img: "butter_wheat.jpg", sizes: ["125g", "250g", "500g", "1kg"], prices: [105, 210, 420, 840] },
  { cat: "cookie", name: "Butter Ragi", img: "butter_ragi.jpg", sizes: ["125g", "250g", "500g", "1kg"], prices: [108, 215, 430, 860] },
  { cat: "cookie", name: "Butter Wheat Nuts", img: "butter_wheat_nuts.jpg", sizes: ["125g", "250g", "500g", "1kg"], prices: [109, 218, 435, 870] },
  { cat: "cookie", name: "Butter Raagi Nuts", img: "butter_raagi_nuts.jpg", sizes: ["125g", "250g", "500g", "1kg"], prices: [110, 220, 440, 880] },
  // Tea Cakes
  { cat: "teacake", name: "Tea Cake", img: "tea_cake.jpg", sizes: ["250g", "500g", "1kg"], prices: [113, 225, 449] }
];

// --- Render Products
const root = document.getElementById("product-root");
root.innerHTML = `
<div class="products-grid">
${PRODUCTS.map((p, i) => `
  <div class="card">
    <img src="${p.img}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <div class="cat">${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</div>
    <div class="price-row">
      <select id="sel-${i}">
        ${p.sizes
          .map(
            (sz, idx) =>
              `<option value="${idx}">${sz} – ₹${p.prices[idx]}</option>`
          )
          .join("")}
      </select>
    </div>
    <button class="add-btn" onclick="addToCart(${i})">Add to Cart</button>
  </div>
`).join("")}
</div>
`;

// --- Cart utilities using localStorage
const CART_KEY = "swc_cart";
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const setCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));
const updateCartCount = () => {
  document.getElementById("cart-count").textContent = getCart().reduce((sum, item) => sum + item.qty, 0);
};
updateCartCount();

// --- Add product to cart
function addToCart(idx) {
  const prod = PRODUCTS[idx];
  const sizeIdx = Number(document.getElementById(`sel-${idx}`).value);
  const key = `${idx}-${sizeIdx}`;
  let cart = getCart();
  const found = cart.find(i => i.key === key);
  if (found) {
    found.qty++;
  } else {
    cart.push({
      key,
      name: prod.name,
      img: prod.img,
      size: prod.sizes[sizeIdx],
      price: prod.prices[sizeIdx],
      qty: 1
    });
  }
  setCart(cart);
  updateCartCount();
  alert(`Added: ${prod.name} (${prod.sizes[sizeIdx]}) to cart`);
}

// --- Cart modal
const cartModal = document.getElementById("cart-modal");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
document.getElementById("open-cart").onclick = () => {
  renderCart();
  cartModal.classList.add("active");
  cartModal.focus();
};
document.getElementById("close-cart").onclick = () => {
  cartModal.classList.remove("active");
};
function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = "";
  let total = 0;
  if (!cart.length) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "₹0";
    document.getElementById("checkout-btn").disabled = true;
    return;
  }
  document.getElementById("checkout-btn").disabled = false;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    cartItemsEl.innerHTML += `
      <div class="cart-item-row">
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-item-name">${item.name}<br><small>${item.size}</small></div>
        <div class="cart-item-controls">
          <button onclick="changeQty(${idx}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${idx}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${idx})">&times;</button>
        </div>
        <div style="font-weight:600;">₹${item.price * item.qty}</div>
      </div>
    `;
  });
  cartTotalEl.textContent = `₹${total}`;
}
function changeQty(idx, dir) {
  let cart = getCart();
  if (dir === -1 && cart[idx].qty > 1) cart[idx].qty--;
  if (dir === 1) cart[idx].qty++;
  setCart(cart);
  renderCart();
  updateCartCount();
}
function removeItem(idx) {
  let cart = getCart();
  cart.splice(idx, 1);
  setCart(cart);
  renderCart();
  updateCartCount();
}

// --- Checkout modal
const checkoutModal = document.getElementById("checkout-modal");
document.getElementById("checkout-btn").onclick = () => {
  cartModal.classList.remove("active");
  checkoutModal.classList.add("active");
  checkoutModal.focus();
};
document.getElementById("close-checkout").onclick = () => {
  checkoutModal.classList.remove("active");
};

// --- Geolocation for current location
const locBtn = document.getElementById("get-location");
const locField = document.getElementById("customer-location");
const locStatus = document.getElementById("location-status");

locBtn.onclick = () => {
  if (!navigator.geolocation) {
    locStatus.textContent = "Geolocation not supported.";
    return;
  }
  locStatus.textContent = "Detecting...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
      locField.value = coords;
      locStatus.innerHTML = `<a href="https://maps.google.com/?q=${coords}" target="_blank" rel="noopener noreferrer">Location Set ✔</a>`;
    },
    () => {
      locStatus.textContent = "Unable to fetch location. Allow GPS & retry.";
    }
  );
}

// --- WhatsApp order submit
document.getElementById("checkout-form").onsubmit = e => {
  e.preventDefault();

  const cart = getCart();
  if (!cart.length) {
    alert("Cart is empty.");
    return;
  }
  const name = document.getElementById("customer-name").value.trim();
  const mobile = document.getElementById("customer-mobile").value.trim();
  const addr = document.getElementById("customer-address").value.trim();
  const coords = locField.value.trim();
  const deliveryDT = document.getElementById("delivery-datetime").value;

  if (!coords) {
    alert("Please set your location.");
    return;
  }
  if (!deliveryDT) {
    alert("Please select your desired delivery date and time.");
    return;
  }

  const mapsLink = `https://maps.google.com/?q=${coords}`;
  const totalAmt = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Individual lines per item/qty like your example
  let orderLines = "";
  cart.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      orderLines += `${item.name} (${item.size}) x1 = ₹${item.price}`;
    }
  });

  // Format delivery datetime to a readable format
  const dt = new Date(deliveryDT);
  const options = {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  };
  const formattedDeliveryDT = dt.toLocaleString("en-IN", options).replace(",", "");

  const message =
`Hi Sasi Wonder Cakes!

👤 Name: ${name}
📞 Mobile: ${mobile}
🏡 Address: ${addr}
📍 Location: ${mapsLink}

🧁 Order:
${orderLines}
💰 Total: ₹${totalAmt}

Delivery Date & Time: ${formattedDeliveryDT}

Please confirm the order soon 😊`;

  const phoneNumber = "918300434665";

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

  // Cleanup form & cart
  checkoutModal.classList.remove("active");
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  alert("Order sent via WhatsApp! Thank you.");
};
