let cart = {};
let selectedPaymentMethod = null;

// Initialize cart and event listeners
document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || {};
    updateProductList();
    handleDeliveryMethod();
    initializePaymentMethods();
});

// Payment method selection
function initializePaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');

    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Remove selected class from all methods
            paymentMethods.forEach(m => m.classList.remove('selected'));
            // Hide all payment forms
            paymentForms.forEach(form => form.style.display = 'none');

            // Select clicked method
            method.classList.add('selected');
            selectedPaymentMethod = method.dataset.method;

            // Show corresponding form
            const form = document.getElementById(`${selectedPaymentMethod}-form`);
            if (form) {
                form.style.display = 'block';
            }
        });
    });
}

function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    let subtotal = 0;

    for (const [product, details] of Object.entries(cart)) {
        const itemTotal = details.precio * details.cantidad;
        subtotal += itemTotal;
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <span>${details.nombre} x ${details.cantidad}</span>
            <span>S/${itemTotal.toFixed(2)}</span>
        `;
        productList.appendChild(li);
    }

    updateTotals(subtotal);
}

function updateTotals(subtotal) {
    const shipping = document.querySelector('input[name="delivery"]:checked').value === 'delivery' ? 5 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `S/${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `S/${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `S/${total.toFixed(2)}`;
}

function handleDeliveryMethod() {
    updateProductList();
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const shippingForm = document.getElementById('shipping-form');

    if (deliveryMethod === 'delivery') {
        shippingForm.style.display = 'block';
    } else {
        shippingForm.style.display = 'none';
    }
}

function generateOrderNumber() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateQRCode(orderNumber) {
    // Simulate QR code with a placeholder
    const qrCode = document.getElementById('order-qr');
    qrCode.innerHTML = `
        <div style="background: #000; color: #fff; padding: 10px; text-align: center;">
            ${orderNumber}
        </div>
    `;
}

function placeOrder() {
    if (!selectedPaymentMethod) {
        alert('Por favor selecciona un método de pago');
        return;
    }

    // Simulate order processing
    const orderNumber = generateOrderNumber();
    
    // Clear cart from localStorage
    localStorage.removeItem('cart');
    cart = {};

    // Show success modal
    const modal = document.getElementById('success-modal');
    document.getElementById('order-number').textContent = orderNumber;
    generateQRCode(orderNumber);
    modal.style.display = 'flex';

    // Simulate updating inventory in backend
    const order = {
        orderNumber: orderNumber,
        items: cart,
        delivery: document.querySelector('input[name="delivery"]:checked').value,
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };

    // Simulate sending order to backend
    console.log('Order placed:', order);
}

function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
    // Redirect to home or order confirmation page
    window.location.href = '/';
}

// Event listeners
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', handleDeliveryMethod);
});

// Input validation and formatting
document.getElementById('card-number')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substr(0, 16);
});

document.getElementById('expiry')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substr(0, 2) + '/' + value.substr(2);
    }
    e.target.value = value.substr(0, 5);
});

document.getElementById('cvv')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substr(0, 4);
});
