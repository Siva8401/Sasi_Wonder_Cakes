// ------ PRODUCT DATA ------
const PRODUCTS = [
  {
    category: "Brownies", cat: "brownie", items: [
      { name: "Classic Brownie", img: "images/classic_brownie.jpg", prices: [250, 500, 1000], sizes: ["250g", "500g", "1kg"] },
      { name: "Double Chocolate", img: "images/double_chocolate.jpg", prices: [300, 600, 1200], sizes: ["250g", "500g", "1kg"] },
      { name: "Triple Chocolate", img: "images/triple_chocolate.jpg", prices: [315, 625, 1249], sizes: ["250g", "500g", "1kg"] },
      { name: "Nuts Loaded", img: "images/nuts_loaded_brownie.jpg", prices: [325, 650, 1299], sizes: ["250g", "500g", "1kg"] },
      { name: "Chocochips", img: "images/chocochips_brownie.jpg", prices: [300, 600, 1199], sizes: ["250g", "500g", "1kg"] },
      { name: "Nutella", img: "images/nutella_brownie.jpg", prices: [290, 575, 1149], sizes: ["250g", "500g", "1kg"] },
      { name: "KitKat", img: "images/kitkat_brownie.jpg", prices: [290, 575, 1149], sizes: ["250g", "500g", "1kg"] }
    ]
  },
  {
    category: "Cookies", cat: "cookie", items: [
      { name: "Butter Wheat", img: "images/butter_wheat.jpg", prices: [105, 210, 420, 840], sizes: ["125g","250g","500g","1kg"] },
      { name: "Butter Ragi", img: "images/butter_ragi.jpg", prices: [108, 215, 430, 860], sizes: ["125g","250g","500g","1kg"] },
      { name: "Butter Wheat Nuts", img: "images/butter_wheat_nuts.jpg", prices: [109, 218, 435, 870], sizes: ["125g","250g","500g","1kg"] },
      { name: "Butter Raagi Nuts", img: "images/butter_raagi_nuts.jpg", prices: [110, 220, 440, 880], sizes: ["125g","250g","500g","1kg"] },
    ]
  },
  {
    category: "Tea Cakes", cat: "teacake", items: [
      { name: "Tea Cake", img: "images/tea_cake.jpg", prices: [113, 225, 449], sizes: ["250g", "500g", "1kg"] }
    ]
  }
];

// ---------- DYNAMIC PRODUCT RENDERING -----------
const root = document.getElementById('product-root');
root.innerHTML = `<div class="products-grid">
${PRODUCTS.flatMap(cat => cat.items.map((p, idx) => `
  <div class="card" data-cat="${cat.cat}">
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <div class="cat">${cat.category}</div>
    <div class="price-row">
      <div class="variant-price">
        <select data-product='${cat.cat}-${idx}'>
          ${p.sizes.map((size, i) => `<option value="${i}">${size} - ₹${p.prices[i]}</option>`).join('')}
        </select>
      </div>
    </div>
    <button class="add-btn" onclick="addToCart('${cat.cat}',${idx})">Add to Cart</button>
  </div>
`)).join("")
}</div>`;

// ------------ CART LOGIC (localStorage) ---------------
function getCart() {
  return JSON.parse(localStorage.getItem("swc_cart")||"[]");
}
function setCart(cart) {
  localStorage.setItem("swc_cart", JSON.stringify(cart));
}
function fullProduct(cat, idx) {
  for(const C of PRODUCTS) if(C.cat===cat) return { cat, ...C.items[idx] };
}
function addToCart(cat, idx) {
  let cart = getCart();
  let select = document.querySelector(`[data-product='${cat}-${idx}']`);
  let sizeIdx = +select.value;
  // Find same product & size
  let key = `${cat}-${idx}-${sizeIdx}`;
  let ex = cart.find(it=>it.key===key);
  if(ex) ex.qty += 1;
  else {
    let P = fullProduct(cat, idx);
    cart.push({
      key, cat, idx, sizeIdx, name: P.name, img: P.img,
      size: P.sizes[sizeIdx], price: P.prices[sizeIdx], qty: 1
    });
  }
  setCart(cart);
  updateCartCount();
}
function updateCartCount() {
  document.getElementById('cart-count').innerText = getCart().reduce((s, i) => s + i.qty, 0);
}
// Initial update
updateCartCount();

// ------------- CART MODAL WINDOWS ---------------
let cartModal = document.getElementById("cart-modal");
let openCartBtn = document.getElementById("open-cart");
let closeCartBtn = document.getElementById("close-cart");
let cartItemsEl = document.getElementById("cart-items");
let cartTotalEl = document.getElementById("cart-total");
let checkoutBtn = document.getElementById("checkout-btn");
openCartBtn.onclick = ()=>{ renderCart(); cartModal.classList.add("active"); }
closeCartBtn.onclick = ()=> cartModal.classList.remove("active");

function renderCart() {
  let cart = getCart();
  cartItemsEl.innerHTML = "";
  let total = 0;
  if(cart.length===0) {
      cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalEl.innerHTML = "₹0";
      checkoutBtn.disabled = true;
      return;
  }
  checkoutBtn.disabled = false;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    cartItemsEl.innerHTML += `
      <div class="cart-item-row">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-name">${item.name}<br><small>${item.size}</small></div>
        <div class="cart-item-controls">
          <button onclick="updateQty(${i},-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${i},1)">+</button>
          <button class="remove-btn" onclick="removeItem(${i})">&times;</button>
        </div>
        <div style="font-weight:600;">₹${item.price * item.qty}</div>
      </div>
    `;
  });
  cartTotalEl.innerHTML = "₹"+total;
}
function updateQty(idx, dir) {
  let cart = getCart();
  if(dir===-1) { if(cart[idx].qty>1) cart[idx].qty-=1; } else { cart[idx].qty+=1; }
  setCart(cart); renderCart(); updateCartCount();
}
function removeItem(idx) {
  let cart = getCart(); cart.splice(idx,1); setCart(cart); renderCart(); updateCartCount();
}

// --------- CHECKOUT LOGIC --------------
let checkoutModal = document.getElementById("checkout-modal");
let checkoutForm = document.getElementById("checkout-form");
let closeCheckoutBtn = document.getElementById("close-checkout");
document.getElementById("checkout-btn").onclick = ()=>{
  cartModal.classList.remove("active");
  checkoutModal.classList.add("active");
};
closeCheckoutBtn.onclick = ()=> checkoutModal.classList.remove("active");

// --- LOCATION FETCH
let locBtn = document.getElementById("get-location");
let locField = document.getElementById("customer-location");
let locStatus = document.getElementById("location-status");
let latestCoords = "";
locBtn.onclick = ()=>{
  locStatus.innerText = "Detecting...";
  navigator.geolocation.getCurrentPosition(
    pos=>{
      latestCoords = pos.coords.latitude+","+pos.coords.longitude;
      locField.value = latestCoords;
      locStatus.innerHTML = `<a href="https://maps.google.com/?q=${latestCoords}" target="_blank" style="color:#15843e;">Location Set!</a>`;
    },
    ()=>{locStatus.innerText="Could not get location. Allow GPS and try again.";}
  )
}

// --- WHATSAPP ORDER GENERATION
checkoutForm.onsubmit = function(e){
  e.preventDefault();
  let cart = getCart();
  if(cart.length===0) {alert("Cart is empty."); return;}
  let name = document.getElementById("customer-name").value.trim();
  let mobile = document.getElementById("customer-mobile").value.trim();
  let addr = document.getElementById("customer-address").value.trim();
  let coords = locField.value.trim();
  if(!coords) {alert("Please allow location access for accurate delivery."); return;}
  let mapsLink = `https://maps.google.com/?q=${coords}`;
  let msg =
`🧁 New Order from Sasi Wonder Cakes
👤 Name: ${name}
📞 Mobile: ${mobile}
🏠 Address: ${addr}
📍 Location: ${mapsLink}
🛒 Order:
${cart.map(i=>`- ${i.name} (${i.size}) x${i.qty} = ₹${i.price*i.qty}`).join('\n')}
Total: ₹${cart.reduce((s,i)=>s+i.price*i.qty,0)}`;
  let number = "917708298887";
  let waURL = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  window.open(waURL, "_blank");
  checkoutModal.classList.remove("active");
  localStorage.removeItem("swc_cart");
  updateCartCount();
};
