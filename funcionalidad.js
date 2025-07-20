document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const cartTotalSpan = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart-btn');

    let cart = []; // Este array almacenará los ítems en el carrito

    // Función para actualizar el carrito en la interfaz
    function updateCartUI() {
        cartItemsList.innerHTML = ''; // Limpia la lista actual del carrito
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>No hay productos agregados en el carrito.</li>';
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)} 
                        <button class="remove-item-btn" data-index="${index}">Quitar</button>
                    </span>
                `;
                cartItemsList.appendChild(li);
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });
        }

        cartItemCountSpan.textContent = totalItems;
        cartTotalSpan.textContent = totalPrice.toFixed(2);
    }

    // Manejador de botones "Agregar"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const name = menuItem.dataset.name;
            const price = parseFloat(menuItem.dataset.price);

            // Verifica si el ítem ya está en el carrito
            const existingItemIndex = cart.findIndex(item => item.name === name);

            if (existingItemIndex > -1) {
                // Si existe, incrementa la cantidad
                cart[existingItemIndex].quantity++;
            } else {
                // Si no existe, agrégalo como un nuevo ítem
                cart.push({ name: name, price: price, quantity: 1 });
            }
            updateCartUI(); // Actualiza la interfaz del carrito
        });
    });

    // Manejador de eventos para el botón "Vaciar Carrito"
    clearCartButton.addEventListener('click', () => {
        cart = []; // Vacía el array del carrito
        updateCartUI(); 
    });

    // Manejador de eventos para los botones "Quitar" dentro del carrito
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const indexToRemove = parseInt(event.target.dataset.index);

            if (cart[indexToRemove].quantity > 1) {
                cart[indexToRemove].quantity--; // Si hay más de uno, solo decrementa la cantidad
            } else {
                cart.splice(indexToRemove, 1); // Si es solo uno, quita el ítem completamente
            }
            updateCartUI(); // Actualiza la interfaz
        }
    });

    // Inicializa la interfaz del carrito al cargar la página
    updateCartUI();
});