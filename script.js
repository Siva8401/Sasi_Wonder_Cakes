// ---- Product Data ----
const products = [
    // Brownies
    {
      name: "Classic Brownie",
      type: "Brownie",
      photo: "images/classic_brownie.jpg",
      variants: [
        { size: "250g", price: 250 },
        { size: "500g", price: 500 },
        { size: "1kg", price: 1000 }
      ]
    },
    {
      name: "Double Chocolate Brownie",
      type: "Brownie",
      photo: "images/double_choco_brownie.jpg",
      variants: [
        { size: "250g", price: 300 },
        { size: "500g", price: 600 },
        { size: "1kg", price: 1200 }
      ]
    },
    {
      name: "Triple Chocolate Brownie",
      type: "Brownie",
      photo: "images/triple_choco_brownie.jpg",
      variants: [
        { size: "250g", price: 315 },
        { size: "500g", price: 625 },
        { size: "1kg", price: 1249 }
      ]
    },
    {
      name: "Nuts Loaded Brownie",
      type: "Brownie",
      photo: "images/nuts_brownie.jpg",
      variants: [
        { size: "250g", price: 325 },
        { size: "500g", price: 650 },
        { size: "1kg", price: 1299 }
      ]
    },
    {
      name: "Chocochips Brownie",
      type: "Brownie",
      photo: "images/chocochips_brownie.jpg",
      variants: [
        { size: "250g", price: 300 },
        { size: "500g", price: 600 },
        { size: "1kg", price: 1199 }
      ]
    },
    {
      name: "Nutella Brownie",
      type: "Brownie",
      photo: "images/nutella_brownie.jpg",
      variants: [
        { size: "250g", price: 290 },
        { size: "500g", price: 575 },
        { size: "1kg", price: 1149 }
      ]
    },
    {
      name: "KitKat Brownie",
      type: "Brownie",
      photo: "images/kitkat_brownie.jpg",
      variants: [
        { size: "250g", price: 290 },
        { size: "500g", price: 575 },
        { size: "1kg", price: 1149 }
      ]
    },

    // Cookies
    {
      name: "Butter Wheat Cookies",
      type: "Cookie",
      photo: "images/butter_wheat_cookies.jpg",
      variants: [
        { size: "125g", price: 105 },
        { size: "250g", price: 210 },
        { size: "500g", price: 420 },
        { size: "1kg", price: 840 }
      ]
    },
    {
      name: "Butter Ragi Cookies",
      type: "Cookie",
      photo: "images/butter_ragi_cookies.jpg",
      variants: [
        { size: "125g", price: 108 },
        { size: "250g", price: 215 },
        { size: "500g", price: 430 },
        { size: "1kg", price: 860 }
      ]
    },
    {
      name: "Butter Wheat Nuts Cookies",
      type: "Cookie",
      photo: "images/butter_wheat_nuts_cookies.jpg",
      variants: [
        { size: "125g", price: 109 },
        { size: "250g", price: 218 },
        { size: "500g", price: 435 },
        { size: "1kg", price: 870 }
      ]
    },
    {
      name: "Butter Raagi Nuts Cookies",
      type: "Cookie",
      photo: "images/butter_raagi_nuts_cookies.jpg",
      variants: [
        { size: "125g", price: 110 },
        { size: "250g", price: 220 },
        { size: "500g", price: 440 },
        { size: "1kg", price: 880 }
      ]
    },

    // Tea Cake
    {
      name: "Tea Cake",
      type: "Tea Cake",
      photo: "images/tea_cake.jpg",
      variants: [
        { size: "250g", price: 113 },
        { size: "500g", price: 225 },
        { size: "1kg", price: 449 }
      ]
    }
];

// ---- Generate Products ----
const productsSection = document.getElementById('products');
products.forEach((product, idx) => {
    const prodCard = document.createElement('div');
    prodCard.className = 'product-card';
    prodCard.innerHTML =
      `<img src="${product.photo}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div>
        <select id="var${idx}">
          ${product.variants.map((v,i) => `<option value="${i}">${v.size} - ₹${v.price}</option>`).join('')}
        </select>
        <button onclick="addToCart(${idx})">Add to Cart</button>
      </div>
     `;
    productsSection.appendChild(prodCard);
});

// ---- Cart System ----
let cart = [];

window.addToCart = function(idx) {
    const prod = products[idx];
    const sel = document.getElementById('var'+idx);
    const variant = prod.variants[sel.value];
    // Group by name+size
    const cartIdx = cart.findIndex(item => item.name===prod.name && item.size===variant.size);
    if (cartIdx >= 0) {
        cart[cartIdx].qty += 1;
    } else {
        cart.push({ name: prod.name, size: variant.size, price: variant.price, qty: 1 });
    }
    updateCart();
};

function updateCart() {
    const items = document.getElementById('cart-items');
    items.innerHTML = '';
    let sum = 0;
    cart.forEach((item, i) => {
        items.innerHTML += `<li>
          ${item.name} (${item.size}) x${item.qty} - ₹${item.price*item.qty}
          <button onclick="removeCart(${i})">❌</button>
        </li>`;
        sum += item.price * item.qty;
    });
    document.getElementById('cart-total').innerText = sum;
    document.getElementById('checkout-btn').disabled = cart.length===0;
}

window.removeCart = function(i) {
    cart.splice(i,1);
    updateCart();
};

document.getElementById('checkout-btn').onclick = () => {
    document.getElementById('checkout-section').classList.remove('hidden');
};

document.getElementById('cancel-checkout').onclick = () => {
    document.getElementById('checkout-section').classList.add('hidden');
};

document.getElementById('order-form').onsubmit = function(e) {
    e.preventDefault();
    // --- Gather Data ---
    const name = document.getElementById('cust-name').value;
    const mobile = document.getElementById('cust-mobile').value;
    const addr = document.getElementById('cust-address').value;
    const loc = document.getElementById('cust-location').value;
    let msg = `NEW ORDER from Sasi Wonder Cakes:%0A%0AProducts:%0A`;
    cart.forEach(i => {
        msg += `- ${i.name} (${i.size}) x${i.qty}: ₹${i.price*i.qty}%0A`;
    });
    msg += `%0AName: ${name}%0AMobile: ${mobile}%0AAddress: ${addr}`;
    if (loc) msg += `%0ALocation Pin: ${loc}`;
    // WhatsApp Link
    window.open(`https://wa.me/917708298887?text=${msg}`, '_blank');
    document.getElementById('checkout-section').classList.add('hidden');
    cart = [];
    updateCart();
};

// ---- Google Maps Location ----
document.getElementById('get-location').onclick = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
            const latlong = pos.coords.latitude + ',' + pos.coords.longitude;
            const mapsUrl = `https://www.google.com/maps?q=${latlong}`;
            document.getElementById('cust-location').value = mapsUrl;
            alert('Location added!');
        }, function(err){alert('Unable to fetch location!');});
    } else {
        alert('Geolocation not supported!');
    }
};
