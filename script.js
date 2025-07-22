// --- Product Data ---
const products = [
    { name: "Classic Brownie", type: "Brownie", photo: "images/classic_brownie.jpg", variants: [{size:"250g", price:250},{size:"500g", price:500},{size:"1kg", price:1000}] },
    { name: "Double Chocolate Brownie", type: "Brownie", photo: "images/double_choco_brownie.jpg", variants: [{size:"250g", price:300},{size:"500g", price:600},{size:"1kg", price:1200}] },
    { name: "Triple Chocolate Brownie", type: "Brownie", photo: "images/triple_choco_brownie.jpg", variants: [{size:"250g", price:315},{size:"500g", price:625},{size:"1kg", price:1249}] },
    { name: "Nuts Loaded Brownie", type: "Brownie", photo: "images/nuts_brownie.jpg", variants: [{size:"250g", price:325},{size:"500g", price:650},{size:"1kg", price:1299}] },
    { name: "Chocochips Brownie", type: "Brownie", photo: "images/chocochips_brownie.jpg", variants: [{size:"250g", price:300},{size:"500g", price:600},{size:"1kg", price:1199}] },
    { name: "Nutella Brownie", type: "Brownie", photo: "images/nutella_brownie.jpg", variants: [{size:"250g", price:290},{size:"500g", price:575},{size:"1kg", price:1149}] },
    { name: "KitKat Brownie", type: "Brownie", photo: "images/kitkat_brownie.jpg", variants: [{size:"250g", price:290},{size:"500g", price:575},{size:"1kg", price:1149}] },
    { name: "Butter Wheat Cookies", type: "Cookie", photo: "images/butter_wheat_cookies.jpg", variants: [{size:"125g", price:105},{size:"250g", price:210},{size:"500g", price:420},{size:"1kg", price:840}] },
    { name: "Butter Ragi Cookies", type: "Cookie", photo: "images/butter_ragi_cookies.jpg", variants: [{size:"125g", price:108},{size:"250g", price:215},{size:"500g", price:430},{size:"1kg", price:860}] },
    { name: "Butter Wheat Nuts Cookies", type: "Cookie", photo: "images/butter_wheat_nuts_cookies.jpg", variants: [{size:"125g", price:109},{size:"250g", price:218},{size:"500g", price:435},{size:"1kg", price:870}] },
    { name: "Butter Raagi Nuts Cookies", type: "Cookie", photo: "images/butter_raagi_nuts_cookies.jpg", variants: [{size:"125g", price:110},{size:"250g", price:220},{size:"500g", price:440},{size:"1kg", price:880}] },
    { name: "Tea Cake", type: "Tea Cake", photo: "images/tea_cake.jpg", variants: [{size:"250g", price:113},{size:"500g", price:225},{size:"1kg", price:449}] }
];

// --- Render Products ---
const productsSection = document.getElementById('products');
products.forEach((product, idx) => {
    const prodCard = document.createElement('div');
    prodCard.className = 'product-card';
    prodCard.innerHTML = `
      <img src="${product.photo}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div>
        <select id="var${idx}">
          ${product.variants.map((v,i) => `<option value="${i}">${v.size} — ₹${v.price}</option>`).join('')}
        </select>
        <button onclick="addToCart(${idx})">Add to Cart</button>
      </div>
     `;
    productsSection.appendChild(prodCard);
});

// --- Cart System ---
let cart = [];

window.addToCart = function(idx) {
    const prod = products[idx];
    const sel = document.getElementById('var'+idx);
    const variant = prod.variants[sel.value];
    const key = prod.name + "|" + variant.size;
    const cartIdx = cart.findIndex(item => item.key === key);
    if (cartIdx >= 0) {
        cart[cartIdx].qty += 1;
    } else {
        cart.push({ key, name: prod.name, size: variant.size, price: variant.price, qty: 1 });
    }
    updateCartUI();
    document.getElementById('cart-btn').classList.add('active');
    setTimeout(()=>{document.getElementById('cart-btn').classList.remove('active')}, 300);
};

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.reduce((a,i)=>a+i.qty, 0);
}
updateCartUI();

// --- Overlay Modal Cart/Order ---
function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let summary = "";
    let total = 0;
    cart.forEach(i => {
        summary += `<div>• <b>${i.name}</b> (${i.size}) x${i.qty} — ₹${i.price*i.qty}</div>`;
        total += i.price*i.qty;
    });
    summary += `<div style="margin-top:0.8em;font-weight:bolder;">Total: ₹${total}</div>`;
    document.getElementById('modal-cart-summary').innerHTML = summary;
    document.getElementById('order-modal').classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
}
function closeCheckout() {
    document.getElementById('order-modal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}
document.getElementById('overlay').onclick = closeCheckout;

// --- Map Logic ---
let map, marker;
window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 13.0827, lng: 80.2707}, // Center on Chennai
        zoom: 13,
        disableDefaultUI: true,
        gestureHandling: "greedy"
    });
    map.addListener('click', function(e) {
        if (marker) marker.setMap(null);
        marker = new google.maps.Marker({ map, position: e.latLng });
        document.getElementById('location-coords').value = e.latLng.lat()+","+e.latLng.lng();
    });
};

// --- WhatsApp Order Logic ---
document.getElementById('order-form').onsubmit = function(e) {
    e.preventDefault();
    // Gather Data
    const name = document.getElementById('cust-name').value.trim();
    const mobile = document.getElementById('cust-mobile').value.trim();
    const addr = document.getElementById('cust-address').value.trim();
    const date = document.getElementById('cust-date').value;
    const occasion = document.getElementById('cust-occasion').value;
    const notes = (document.getElementById('cust-notes').value||"").trim();
    const coords = document.getElementById('location-coords').value;
    const mapsLink = coords ? ("https://maps.google.com?q="+coords) : "";
    if (!coords) {
        alert("Please tap to PIN your exact delivery location!");
        return;
    }
    let totalAmt = 0;
    let items = "";
    cart.forEach(i => {
        items += `- ${i.name} (${i.size}) x${i.qty}%0A`;
        totalAmt += i.price*i.qty;
    });
    const msg =
`Hi Sasi Wonder Cakes,

This is ${name}.

I want to place an order for the following products:
${items}
Total: ₹${totalAmt}

Please deliver on: ${date}
Occasion: ${occasion}
${ notes ? 'Notes: '+notes : ''}

My details:
Mobile: ${mobile}
Address: ${addr}
Location Pin: ${mapsLink}`;
    const url = `https://wa.me/917708298887?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    closeCheckout();
    cart = [];
    updateCartUI();
    document.getElementById('order-form').reset();
    if (marker) { marker.setMap(null); marker = null; }
    setTimeout(()=>alert("Order sent! We'll contact you soon."), 500);
};
