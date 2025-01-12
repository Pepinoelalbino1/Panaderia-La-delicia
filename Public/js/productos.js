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
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: S/${producto.precio.toFixed(2)}</p>
                <p>Disponibles: ${producto.cantidad}</p>
                <button onclick="addToCart('${producto.id}')">Añadir al carrito</button>
            </div>
        `).join('');
}

function filtrarProductos() {
    cargarProductos();  
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
            price: producto.precio, 
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
            const itemTotal = details.price * details.cantidad;
            total += itemTotal;
            return `
                <div class="cart-item">
                    <p>${details.nombre}</p>
                    <p>Cantidad: ${details.cantidad} - S/${itemTotal.toFixed(2)}</p>
                    <div class="cart-controls">
                        <button onclick="removeFromCart('${productId}')">-</button>
                        <button onclick="addToCart('${productId}')">+</button>
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
