let cart = [];
function addToCart(name, price, img) {
    let idx = cart.findIndex(item => item.name === name);
    if (idx !== -1) cart[idx].qty++;
    else cart.push({ name, price, img, qty: 1 });
    updateCartUI();
}
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.reduce((a,i)=>a+i.qty, 0);
}
function openCheckout() {
    if (!cart.length) return alert("Your cart is empty!");
    let summary = '';
    cart.forEach(i => { summary += `<div>• <b>${i.name}</b> x${i.qty} — ${i.price}</div>`; });
    document.getElementById('modal-cart-summary').innerHTML = summary;
    document.getElementById('order-modal').classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
}
function closeCheckout() {
    document.getElementById('order-modal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}
document.getElementById('overlay').onclick = closeCheckout;

// Google Maps Pin
let map, marker;
window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 13.0827, lng: 80.2707}, // Chennai
        zoom: 13, disableDefaultUI: true
    });
    map.addListener('click', function(e) {
        if (marker) marker.setMap(null);
        marker = new google.maps.Marker({ map, position: e.latLng });
        document.getElementById('location-coords').value = e.latLng.lat()+","+e.latLng.lng();
    });
}

document.getElementById('order-form').onsubmit = function(e) {
    e.preventDefault();
    let name = document.getElementById('cust-name').value.trim();
    let mobile = document.getElementById('cust-mobile').value.trim();
    let addr = document.getElementById('cust-address').value.trim();
    let date = document.getElementById('cust-date').value;
    let occasion = document.getElementById('cust-occasion').value;
    let notes = (document.getElementById('cust-notes').value||"").trim();
    let coords = document.getElementById('location-coords').value;
    let mapsLink = coords ? ("https://maps.google.com?q="+coords) : "";
    if (!coords) return alert("Please pin your delivery location.");
    let items = "";
    cart.forEach(i => { items += `- ${i.name} x${i.qty}%0A`; });
    let msg =
`Hi Sasi Wonder Cakes,

This is ${name}.

I want to place an order for the following products:
${items}

Delivery date: ${date}
Occasion: ${occasion}
${ notes ? 'Notes: '+notes : '' }

My details:
Mobile: ${mobile}
Address: ${addr}
Location Pin: ${mapsLink}`;
    window.open(`https://wa.me/917708298887?text=${encodeURIComponent(msg)}`, '_blank');
    closeCheckout();
    cart = [];
    updateCartUI();
    document.getElementById('order-form').reset();
    if (marker) { marker.setMap(null); marker = null; }
    setTimeout(()=>alert("Order sent! Thank you."), 800);
}
