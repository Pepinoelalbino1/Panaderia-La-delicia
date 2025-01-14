    let productos = [];
    let cart = {};

    // Cargar productos desde JSON
    fetch('/json/productos.json')
    .then(response => response.json())
    .then(data => {
    productos = data.productos;
    cargarProductos();
    })
    .catch(error => {
    console.error('Error cargando productos:', error);
    alert('Error al cargar los productos. Por favor, recarge la página.');
    });

    function cargarProductos() {
    const productContainer = document.getElementById('product-list');
    const categoria = document.getElementById('categoria').value;
    const productosFiltrados = categoria === "todos" 
    ? productos 
    : productos.filter(producto => producto.categoria === categoria);

    productContainer.innerHTML = productosFiltrados
    .map(producto => `
        <div class="product-item">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="price">S/ ${producto.precio.toFixed(2)}</p>
                <p>Stock: ${producto.cantidad}</p>
                <button class="btn" onclick="addToCart('${producto.id}')">
                    <i class="fas fa-cart-plus"></i> Añadir al carrito
                </button>
            </div>
        </div>
    `).join('');
    }

    function addToCart(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;

    if (cart[productId]) {
    if (cart[productId].cantidad < producto.cantidad) {
        cart[productId].cantidad++;
    } else {
        alert("No hay más stock disponible de este producto.");
        return;
    }
    } else {
    cart[productId] = {
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
    };
    }
    updateCart();
    }

    function removeFromCart(productId) {
    if (!cart[productId]) return;

    if (cart[productId].cantidad > 1) {
    cart[productId].cantidad--;
    } else {
    delete cart[productId];
    }
    updateCart();
    }

    function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = Object.entries(cart)
    .map(([productId, details]) => {
        const itemTotal = details.precio * details.cantidad;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-header">
                    <h4>${details.nombre}</h4>
                    <span>S/ ${itemTotal.toFixed(2)}</span>
                </div>
                <div class="cart-controls">
                    <button class="btn btn-small" onclick="removeFromCart('${productId}')">
                    -
                    </button>
                    <span>${details.cantidad}</span>
                    <button class="btn btn-small" onclick="addToCart('${productId}')">
                    +
                    </button>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
    }

    function Pago() {
    if (Object.keys(cart).length === 0) {
    alert("El carrito está vacío. Añade al menos un producto antes de proceder al pago.");
    return;
    }
    window.location.href = "/login/invitado.html";
    }

    // Initialize cart from localStorage if exists
    document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
    }
    });

    function filtrarProductos() {
    cargarProductos();
    }