let cart = {};
  
  function updateProductList() {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      let subtotal = 0;
  
      for (const [product, details] of Object.entries(cart)) {
          const itemTotal = details.price * details.cantidad;
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
  
  function placeOrder() {
      // Aquí iría la lógica para procesar el pedido
      alert('¡Gracias por tu pedido! Se ha procesado correctamente.');
  }
  
  // Recuperar carrito desde localStorage y actualizar la lista de productos
  document.addEventListener('DOMContentLoaded', () => {
      cart = JSON.parse(localStorage.getItem('cart')) || {};
      console.log(cart);
      updateProductList();
      handleDeliveryMethod();
  });
  
  // Event listeners
  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
      radio.addEventListener('change', handleDeliveryMethod);
  });
  