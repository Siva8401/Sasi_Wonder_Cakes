/* ==========================================================
   Sasi Wonder Cakes – Front-End Cart & Checkout Logic
   ----------------------------------------------------------
   - Stores cart in localStorage for persistence
   - Generates WhatsApp message with GPS link
   - Modal handling, quantity controls, responsive fixes
========================================================== */

/* ---------- 1. Product Catalog (flat arrays for speed) ---------- */
const PRODUCTS = [
  {cat:"brownie",  name:"Classic Brownie",   img:"images/classic_brownie.jpg",   sizes:["250g","500g","1kg"],      prices:[250,500,1000]},
  {cat:"brownie",  name:"Double Chocolate",  img:"images/double_chocolate.jpg",  sizes:["250g","500g","1kg"],      prices:[300,600,1200]},
  {cat:"brownie",  name:"Triple Chocolate",  img:"images/triple_chocolate.jpg",  sizes:["250g","500g","1kg"],      prices:[315,625,1249]},
  {cat:"brownie",  name:"Nuts Loaded",       img:"images/nuts_loaded_brownie.jpg",sizes:["250g","500g","1kg"],      prices:[325,650,1299]},
  {cat:"brownie",  name:"Chocochips",        img:"images/chocochips_brownie.jpg",sizes:["250g","500g","1kg"],      prices:[300,600,1199]},
  {cat:"brownie",  name:"Nutella",           img:"images/nutella_brownie.jpg",   sizes:["250g","500g","1kg"],      prices:[290,575,1149]},
  {cat:"brownie",  name:"KitKat",            img:"images/kitkat_brownie.jpg",    sizes:["250g","500g","1kg"],      prices:[290,575,1149]},

  {cat:"cookie",   name:"Butter Wheat",      img:"images/butter_wheat.jpg",      sizes:["125g","250g","500g","1kg"],prices:[105,210,420,840]},
  {cat:"cookie",   name:"Butter Ragi",       img:"images/butter_ragi.jpg",       sizes:["125g","250g","500g","1kg"],prices:[108,215,430,860]},
  {cat:"cookie",   name:"Butter Wheat Nuts", img:"images/butter_wheat_nuts.jpg", sizes:["125g","250g","500g","1kg"],prices:[109,218,435,870]},
  {cat:"cookie",   name:"Butter Raagi Nuts", img:"images/butter_raagi_nuts.jpg", sizes:["125g","250g","500g","1kg"],prices:[110,220,440,880]},

  {cat:"teacake",  name:"Tea Cake",          img:"images/tea_cake.jpg",          sizes:["250g","500g","1kg"],      prices:[113,225,449]}
];

/* ---------- 2. Render Product Cards ---------- */
const root = document.getElementById("product-root");
root.innerHTML = `
  <div class="products-grid">
    ${PRODUCTS.map((p,i)=>`
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="cat">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</div>
        <div class="price-row">
          <select id="sel-${i}">
            ${p.sizes.map((sz,idx)=>`<option value="${idx}">${sz} – ₹${p.prices[idx]}</option>`).join("")}
          </select>
        </div>
        <button class="add-btn" onclick="addToCart(${i})">Add to Cart</button>
      </div>`
    ).join("")}
  </div>`;

/* ---------- 3. Cart Utilities (localStorage) ---------- */
const CART_KEY = "swc_cart";
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const setCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));
const updateCartCount = () => {
  document.getElementById("cart-count").textContent =
    getCart().reduce((sum,item)=>sum+item.qty,0);
};
updateCartCount();

/* ---------- 4. Add to Cart ---------- */
function addToCart(idx){
  const prod = PRODUCTS[idx];
  const sizeIdx = Number(document.getElementById(`sel-${idx}`).value);
  const key = `${idx}-${sizeIdx}`;
  let cart = getCart();
  const found = cart.find(i=>i.key===key);
  if(found){ found.qty++; } 
  else {
    cart.push({
      key,
      name: prod.name,
      img: prod.img,
      size: prod.sizes[sizeIdx],
      price: prod.prices[sizeIdx],
      qty: 1
    });
  }
  setCart(cart); updateCartCount();
}

/* ---------- 5. Cart Modal Interactions ---------- */
const cartModal   = document.getElementById("cart-modal");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

document.getElementById("open-cart").onclick = () => {
  renderCart(); cartModal.classList.add("active");
};
document.getElementById("close-cart").onclick = () => {
  cartModal.classList.remove("active");
};

function renderCart(){
  const cart = getCart();
  cartItemsEl.innerHTML = ""; let total = 0;
  if(!cart.length){
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "₹0";
    document.getElementById("checkout-btn").disabled = true;
    return;
  }
  document.getElementById("checkout-btn").disabled = false;
  cart.forEach((item,idx)=>{
    total += item.price*item.qty;
    cartItemsEl.innerHTML += `
      <div class="cart-item-row">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-name">${item.name}<br><small>${item.size}</small></div>
        <div class="cart-item-controls">
          <button onclick="changeQty(${idx},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${idx},1)">+</button>
          <button class="remove-btn" onclick="removeItem(${idx})">&times;</button>
        </div>
        <div style="font-weight:600;">₹${item.price*item.qty}</div>
      </div>`;
  });
  cartTotalEl.textContent = "₹"+total;
}
function changeQty(idx,dir){
  let cart = getCart();
  if(dir===-1 && cart[idx].qty>1) cart[idx].qty--;
  if(dir===1) cart[idx].qty++;
  setCart(cart); renderCart(); updateCartCount();
}
function removeItem(idx){
  let cart = getCart(); cart.splice(idx,1); setCart(cart);
  renderCart(); updateCartCount();
}

/* ---------- 6. Checkout Modal ---------- */
const checkoutModal = document.getElementById("checkout-modal");
document.getElementById("checkout-btn").onclick = () => {
  cartModal.classList.remove("active");
  checkoutModal.classList.add("active");
};
document.getElementById("close-checkout").onclick = () =>{
  checkoutModal.classList.remove("active");
};

/* ---------- 7. Location Detection (Geolocation API) ---------- */
const locBtn    = document.getElementById("get-location");
const locField  = document.getElementById("customer-location");
const locStatus = document.getElementById("location-status");

locBtn.onclick = () => {
  if(!navigator.geolocation){
    locStatus.textContent = "Geolocation not supported.";
    return;
  }
  locStatus.textContent = "Detecting...";
  navigator.geolocation.getCurrentPosition(
    pos => {
      const coords = `${pos.coords.latitude},${pos.coords.longitude}`;   // high-accuracy data[3][15]
      locField.value = coords;
      locStatus.innerHTML = `<a href="https://maps.google.com/?q=${coords}" target="_blank">Location Set ✔</a>`;
    },
    () => locStatus.textContent = "Unable to fetch location. Allow GPS & retry."
  );
};

/* ---------- 8. WhatsApp Order Submit ---------- */
document.getElementById("checkout-form").onsubmit = e => {
  e.preventDefault();
  const cart = getCart();
  if(!cart.length){ alert("Cart is empty."); return; }

  const name   = document.getElementById("customer-name").value.trim();
  const mobile = document.getElementById("customer-mobile").value.trim();
  const addr   = document.getElementById("customer-address").value.trim();
  const coords = locField.value.trim();
  if(!coords){ alert("Please set your location."); return; }

  const mapsLink = `https://maps.google.com/?q=${coords}`;
  const totalAmt = cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  const itemsMsg = cart.map(i=>`- ${i.name} (${i.size}) x${i.qty} = ₹${i.price*i.qty}`).join("%0A");

  const message = 
`🧁 New Order from Sasi Wonder Cakes
👤 Name: ${name}
📞 Mobile: ${mobile}
🏠 Address: ${addr}
📍 Location: ${mapsLink}
🛒 Order:
${itemsMsg}
Total: ₹${totalAmt}`;

  window.open(`https://wa.me/917708298887?text=${encodeURIComponent(message)}`,"_blank");

  // reset
  checkoutModal.classList.remove("active");
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  alert("Order sent via WhatsApp!\nThank you for choosing Sasi Wonder Cakes.");
};
