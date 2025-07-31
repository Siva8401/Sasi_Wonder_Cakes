function renderProducts(activeFilter = "all") {
  const categories = [
    "Brownies", "Cookies", "Tea Cakes",
    "Muffins & Buns", "Bombolonis", "Premium Cakes", "Bento Cakes", "Add-Ons"
  ];
  let html = "";
  categories.forEach(cat => {
    // Only render this category if filter matches or is "all"
    if (activeFilter === "all" || cat === activeFilter) {
      const catProducts = PRODUCTS.filter(p => p.cat === cat);
      if (catProducts.length) {
        html += `<h3 class="prod-category-heading">${cat}</h3>
        <div class="grid category-group">
        ${catProducts.map((p, idx) => {
          // Find the global product idx in PRODUCTS for addToCart
          const globalIdx = PRODUCTS.indexOf(p);
          return `
          <div class="card" data-cat="${p.cat}">
            <img src="${p.img}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <div class="desc">${p.desc}</div>
            <div class="price-row">
              <select id="option-${globalIdx}" aria-label="Select size for ${p.name}">
                ${p.options.map((opt, i) =>
                  `<option value="${i}">${opt.w} – ₹${opt.price}</option>`
                ).join("")}
              </select>
            </div>
<button class="cart-button" onclick="addToCart(${globalIdx}, this)" aria-label="Add ${p.name} to cart">
  <span class="add-to-cart">Add to cart</span>
  <span class="added">Added</span>
  <i class="fas fa-shopping-cart"></i>
  <i class="fas fa-box"></i>
</button>
          </div>
        `;
        }).join("")}
        </div>`;
      }
    }
  });
  productGrid.innerHTML = html;
}


// ========== PRODUCT CATALOG ==========
const PRODUCTS = [
  // Brownies
  {
    cat: "Brownies",
    img: "classic_brownie.jpg",
    name: "Classic Brownie",
    desc: "Soft chocolate brownie with rich flavor and a moist center.",
    options: [
      { w: "250g", price: 249 },
      { w: "500g", price: 499 },
      { w: "1kg", price: 999 }
    ]
  },
  {
    cat: "Brownies",
    img: "Double_chocolate.jpg",
    name: "Double Chocolate Brownie",
    desc: "Chocolate brownie with extra choco chunks for double the taste.",
    options: [
      { w: "250g", price: 299 },
      { w: "500g", price: 599 },
      { w: "1kg", price: 1199 }
    ]
  },
  {
    cat: "Brownies",
    img: "triple_chocolate.jpg",
    name: "Triple Chocolate Brownie",
    desc: "Brownie made with dark, milk, and white chocolate together.",
    options: [
      { w: "250g", price: 319 },
      { w: "500g", price: 629 },
      { w: "1kg", price: 1249 }
    ]
  },
  {
    cat: "Brownies",
    img: "nuts_loaded_brownie.jpg",
    name: "Nuts Loaded Brownie",
    desc: "Brownie mixed with lots of crunchy nuts in every bite.",
    options: [
      { w: "250g", price: 329 },
      { w: "500g", price: 649 },
      { w: "1kg", price: 1299 }
    ]
  },
  {
    cat: "Brownies",
    img: "chocochips_brownie.jpg",
    name: "Chocochips Brownie",
    desc: "Soft brownie filled with small chocolate chips on top.",
    options: [
      { w: "250g", price: 299 },
      { w: "500g", price: 599 },
      { w: "1kg", price: 1199 }
    ]
  },
  {
    cat: "Brownies",
    img: "nutella_brownie.jpg",
    name: "Nutella Brownie",
    desc: "Chocolate brownie swirled with creamy Nutella spread inside.",
    options: [
      { w: "250g", price: 289 },
      { w: "500g", price: 579 },
      { w: "1kg", price: 1149 }
    ]
  },
  {
    cat: "Brownies",
    img: "kitkat_brownie.jpg",
    name: "KitKat Brownie",
    desc: "Brownie with a KitKat layer for a crispy surprise.",
    options: [
      { w: "250g", price: 289 },
      { w: "500g", price: 579 },
      { w: "1kg", price: 1149 }
    ]
  },
  {
    cat: "Brownies",
    img: "assorted.jpg",
    name: "Assorted Brownie Box",
    desc: "A perfect mix of our best brownie flavours in one box. Great for gifting or sharing!",
    options: [{ w: "7 Pcs", price: 549 }]
  },
  // Cookies
  {
    cat: "Cookies",
    img: "butter_wheat.jpg",
    name: "Butter Wheat Cookies",
    desc: "Wheat cookies with a light crunch and buttery taste.",
    options: [
      { w: "125g", price: 105 },
      { w: "250g", price: 210 },
      { w: "500g", price: 420 },
      { w: "1kg", price: 840 }
    ]
  },
  {
    cat: "Cookies",
    img: "butter_ragi.jpg",
    name: "Butter Ragi Cookies",
    desc: "Ragi cookies that are slightly crispy and mildly sweet.",
    options: [
      { w: "125g", price: 108 },
      { w: "250g", price: 215 },
      { w: "500g", price: 430 },
      { w: "1kg", price: 860 }
    ]
  },
  {
    cat: "Cookies",
    img: "butter_wheat_nuts.jpg",
    name: "Butter Wheat Nuts Cookies",
    desc: "Wheat cookies with small bits of nuts in every bite.",
    options: [
      { w: "125g", price: 109 },
      { w: "250g", price: 218 },
      { w: "500g", price: 435 },
      { w: "1kg", price: 870 }
    ]
  },
  {
    cat: "Cookies",
    img: "butter_raagi_nuts.jpg",
    name: "Butter Ragi Nuts Cookies",
    desc: "Ragi cookies with added nuts for extra crunch.",
    options: [
      { w: "125g", price: 110 },
      { w: "250g", price: 220 },
      { w: "500g", price: 440 },
      { w: "1kg", price: 880 }
    ]
  },
  // Tea Cakes
  {
    cat: "Tea Cakes",
    img: "tea_cake.jpg",
    name: "Tea Cake",
    desc: "Soft and spongy cake, perfect with tea or coffee.",
    options: [
      { w: "250g", price: 125 },
      { w: "500g", price: 249 },
      { w: "1kg", price: 499 }
    ]
  },
  // Muffins & Buns
  {
    cat: "Muffins & Buns",
    img: "banana_muffins.jpg",
    name: "Banana Muffins",
    desc: "Soft muffins made with ripe bananas, sweet and fluffy inside.",
    options: [{ w: "Per Piece", price: 20 }]
  },
  {
    cat: "Muffins & Buns",
    img: "cheese_garlic_bun.jpg",
    name: "Korean Cheese Garlic Bun",
    desc: "Bun filled with cheese and garlic, slightly sweet and savory.",
    options: [{ w: "Per Piece", price: 140 }]
  },
  // Bombolonis
  {
    cat: "Bombolonis",
    img: "nutella_bomboloni.jpg",
    name: "Nutella Bomboloni",
    desc: "Fluffy donut stuffed with creamy Nutella in every bite.",
    options: [{ w: "Per Piece", price: 140 }]
  },
  {
    cat: "Bombolonis",
    img: "choc_bomboloni.jpg",
    name: "Chocolate Bomboloni",
    desc: "Soft donut filled with smooth and rich chocolate cream.",
    options: [{ w: "Per Piece", price: 120 }]
  },
  // Premium Cakes
  {
    cat: "Premium Cakes",
    img: "choco_truffle.jpg",
    name: "Choco Truffle Cake",
    desc: "Rich chocolate cake with creamy layers and smooth truffle topping.",
    options: [{ w: "500g", price: 550 }]
  },
  {
    cat: "Premium Cakes",
    img: "rasamalai_cake.jpg",
    name: "Rasamalai Cake",
    desc: "Soft cake layered with rasamalai cream and cardamom flavor.",
    options: [{ w: "500g", price: 600 }]
  },
  {
    cat: "Premium Cakes",
    img: "gulab_jamun_cake.jpg",
    name: "Gulab Jamun Cake",
    desc: "Moist cake topped with soft gulab jamuns and syrup.",
    options: [{ w: "500g", price: 580 }]
  },
  // Bento Cakes
  {
    cat: "Bento Cakes",
    img: "bento_cake.jpg",
    name: "Bento Cake",
    desc: "Mini cakes perfect for gifting, decorated with cute custom designs.",
    options: [{ w: "Mini", price: 250 }]
  },
  // Add-Ons
  {
    cat: "Add-Ons",
    img: "addon_nuts.jpg",
    name: "Crushed Nuts",
    desc: "Cashew and almond mix for rich crunch.",
    options: [{ w: "Add-On", price: 45 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_chocochips.jpg",
    name: "Choco Chips",
    desc: "Extra chocolate chips inside or on top.",
    options: [{ w: "Add-On", price: 30 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_oreo.jpg",
    name: "Oreo Crumbs",
    desc: "Crushed Oreo bits for extra crunch.",
    options: [{ w: "Add-On", price: 10 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_nutella.jpg",
    name: "Nutella Drizzle",
    desc: "A smooth swirl of Nutella on top.",
    options: [{ w: "Add-On", price: 40 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_ferrero.jpg",
    name: "Ferrero Rocher (2 pcs)",
    desc: "Two Ferrero Rocher pieces on top.",
    options: [{ w: "Add-On", price: 90 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_kitkat.jpg",
    name: "KitKat Pieces",
    desc: "Crushed KitKat topping for crispy texture.",
    options: [{ w: "Add-On", price: 30 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_sprinkles.jpg",
    name: "Color Sprinkles",
    desc: "Fun rainbow sprinkles for decoration.",
    options: [{ w: "Add-On", price: 20 }]
  },
  {
    cat: "Add-Ons",
    img: "addon_box.jpg",
    name: "Brownie Slab Box Upgrade",
    desc: "Brownie packed in a neat gift-style box.",
    options: [{ w: "Add-On", price: 50 }]
  }
];

// ========== RENDER PRODUCT GRID ==========
const productGrid = document.getElementById("product-grid");
const filterButtons = document.querySelectorAll(".filter-item");

function renderProducts(filter = "all") {
  productGrid.innerHTML = PRODUCTS
    .filter((p) => filter === "all" || p.cat === filter)
    .map(
      (p, idx) => `
    <div class="card" data-cat="${p.cat}">
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <div class="desc">${p.desc}</div>
      <div class="price-row">
        <select id="option-${idx}" aria-label="Select size for ${p.name}">
          ${p.options
            .map(
              (opt, i) =>
                `<option value="${i}">${opt.w} – ₹${opt.price}</option>`
            )
            .join("")}
        </select>
      </div>
      <button class="cart-button" onclick="addToCart(${idx}, this)" aria-label="Add ${p.name} to cart">
      <span class="add-to-cart">Add to cart</span>
      <span class="added">Added</span>
      <i class="fas fa-shopping-cart"></i>
      <i class="fas fa-box"></i>
      </button>
      </div>`
    )
    .join("");
}

// Initial render
renderProducts();

// Filter buttons
filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  })
);

// ========== CART LOGIC ==========
const CART_KEY = "swc_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function updateCartCount() {
  const count = getCart().reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
}
updateCartCount();

window.addToCart = function (idx, buttonEl) {
  const prod = PRODUCTS[idx];
  const select = document.getElementById(`option-${idx}`);
  const optIdx = Number(select.value);
  const opt = prod.options[optIdx];
  const key = `${idx}-${optIdx}`;

  let cart = getCart();
  let found = cart.find((i) => i.key === key);
  if (found) found.qty++;
  else
    cart.push({
      key,
      name: prod.name,
      img: prod.img,
      size: opt.w,
      price: opt.price,
      qty: 1,
    });
  setCart(cart);
  updateCartCount();

  // ✅ Trigger animation if button element is provided
  if (buttonEl) {
    buttonEl.classList.remove("clicked");     // Reset animation
    void buttonEl.offsetWidth;                // Force reflow
    buttonEl.classList.add("clicked");        // Start animation
  }
};


function renderCart() {
  const cart = getCart();
  const list = document.getElementById("cart-list");
  if (!cart.length) {
    list.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-modal-total").textContent = "₹0";
    document.getElementById("checkout-btn").disabled = true;
    return;
  }
  document.getElementById("checkout-btn").disabled = false;

  let total = 0;
  list.innerHTML = cart
    .map((item, i) => {
      let sub = item.price * item.qty;
      total += sub;
      return `
        <div class="cart-item-row" role="listitem">
          <img src="${item.img}" alt="${item.name}" />
          <span style="font-weight:600;">${item.name} <small>(${item.size})</small></span>
          <span>x${item.qty}</span>
          <span>₹${sub}</span>
          <button aria-label="Remove ${item.name} from cart" style="background:none; border:none; color:#e16420; font-size:1.15em;" onclick="removeCartItem(${i})">&times;</button>
        </div>
        `;
    })
    .join("");
  document.getElementById("cart-modal-total").textContent = `₹${total}`;
}

window.removeCartItem = function (idx) {
  let cart = getCart();
  cart.splice(idx, 1);
  setCart(cart);
  renderCart();
  updateCartCount();
};

// Modal toggles
const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");

document.getElementById("cart-btn").onclick = () => {
  renderCart();
  cartModal.classList.remove("hidden");
  cartModal.focus();
};
document.getElementById("close-cart-btn").onclick = () => {
  cartModal.classList.add("hidden");
};
document.getElementById("checkout-btn").onclick = () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
  document.getElementById("customer-name").focus();
};
document.getElementById("close-checkout-btn").onclick = () => {
  checkoutModal.classList.add("hidden");
};

// ========== GEOLOCATION (CURRENT LOCATION) ==========
const locBtn = document.getElementById("get-location");
const locField = document.getElementById("customer-location");
const locStatus = document.getElementById("location-status");

locBtn.onclick = () => {
  if (!navigator.geolocation) {
    showAlert("Geolocation is not supported by your browser.");
    return;
  }
  locStatus.textContent = "Detecting location...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
      locField.value = coords;
      locStatus.innerHTML = `<a href="https://maps.google.com/?q=${coords}" target="_blank" rel="noopener"> Current Location Fetched ✔</a>`;
    },
    () => {
      locStatus.textContent = "Unable to fetch location. Please allow GPS access and try again.";
    }
  );
};

// ========== CHECKOUT FORM SUBMIT ==========
const checkoutForm = document.getElementById("checkout-form");
const alertModal = document.getElementById("alert-modal");
const alertMessage = document.getElementById("alert-message");
const alertCloseBtn = document.getElementById("alert-close-btn");

checkoutForm.onsubmit = (e) => {
  e.preventDefault();

  const cart = getCart();
  if (!cart.length) {
    showAlert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const mobile = document.getElementById("customer-mobile").value.trim();
  const addr = document.getElementById("customer-address").value.trim();
  const coords = locField.value.trim();
  const deliveryDT = document.getElementById("delivery-datetime").value;

  if (!coords) {
    showAlert("Please set your location.");
    return;
  }
  if (!deliveryDT) {
    showAlert("Please select your desired delivery date and time.");
    return;
  }

  const mapsLink = `https://maps.google.com/?q=${coords}`;
  const totalAmt = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Build order lines with bullets for each quantity, on separate lines
  let orderLines = "";
  cart.forEach((item) => {
    for (let i = 0; i < item.qty; i++) {
      orderLines += `• ${item.name} (${item.size}) x1 = ₹${item.price}\n`;
    }
  });

  // Format delivery date/time human-readably
  const dt = new Date(deliveryDT);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDeliveryDT = dt.toLocaleString("en-IN", options).replace(",", "");

  const message = `Hi Sasi Wonder Cakes!\n
👤 Name: ${name}
📞 Mobile: ${mobile}
🏡 Address: ${addr}
📍 Location: ${mapsLink}

🧁 Orders:\n
${orderLines}💰\n \n
Total: ₹${totalAmt}

Delivery Date & Time: ${formattedDeliveryDT}

Please confirm the order soon 😊`;

  const phoneNumber = "918870020111";

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

  checkoutModal.classList.add("hidden");
  localStorage.removeItem(CART_KEY);
  updateCartCount();

  showAlert("Order sent via WhatsApp! Thank you.");
};

// ========== CUSTOM ALERT MODAL ==========
function showAlert(message) {
  alertMessage.textContent = message;
  alertModal.classList.remove("hidden");
  alertModal.focus();
}
alertCloseBtn.onclick = () => {
  alertModal.classList.add("hidden");
  // Optionally return focus to an element, e.g., checkout form
  document.getElementById("checkout-form").focus();
};

// ========== DOWNLOAD MENU BUTTON ==========
document.getElementById("download-menu-btn").onclick = () => {
  window.open("./Sasi Wonder Cakes Menu.pdf", "_blank");
};

// Category Dropdown Filtering
document.getElementById("category-dropdown").addEventListener("change", function() {
  renderProducts(this.value);
});

