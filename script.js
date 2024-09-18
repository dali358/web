document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');
    const purchaseLink = document.getElementById('purchase-link');
    const purchaseButton = document.getElementById('purchase-button');

    const phoneNumber = "959480609"; 
    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Eliminar';
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += item.price;
        });
        totalPrice.textContent = total;
        cartCount.textContent = cart.length;

        // Mostrar o ocultar el botón de "Realizar compra"
        if (cart.length > 0) {
            purchaseLink.classList.remove('hidden');
            generateWhatsAppMessage();
        } else {
            purchaseLink.classList.add('hidden');
        }
    }

    function generateWhatsAppMessage() {
        let message = '¡Hola! Me gustaría realizar la siguiente compra:\n';
        cart.forEach(item => {
            message += `- ${item.name}: $${item.price}\n`;
        });
        message += `Total: $${totalPrice.textContent}`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        purchaseLink.setAttribute('href', whatsappUrl);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            cart.push({ name, price });
            updateCart();
        });
    });

    document.getElementById('empty-cart').addEventListener('click', () => {
        cart = [];
        updateCart();
    });
});

