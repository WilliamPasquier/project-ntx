const cartName = "cart";

function createProduct(id, name, price, quantity) {
    if (id.length === 0) {
        throw new Error('Name couldn\'t be empty');
    }

    if (name.length === 0) {
        throw new Error('Name couldn\'t be empty');
    }

    if (price < 0) {
        throw new Error('Price couldn\'t be under 0');
    }

    if (quantity < 0) {
        throw new Error('Name couldn\'t be under 0');
    }

    var product = {
        id: id,
        name: name,
        price: price,
        quantity: quantity
    }
    addProductToCart(product);
}

function getCart() {
    var cart = window.localStorage.getItem(cartName);

    if (cart === null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}

function updateCart(cart) {
    if (Array.isArray(cart)) {
        window.localStorage.setItem(cartName, JSON.stringify(cart));
    }
    else {
        throw new Error('Not an array');
    }
}

function addProductToCart(product) {
    var cart = getCart();
    var productIndex = cart.findIndex((element) => element.id === product.id);

    if (productIndex === -1) {
        product.quantity = product.quantity || 1;
        cart.push(product);
    }
    else {
        cart[productIndex].quantity++;
    }

    updateCart(cart);
}

function removeProductFromCart(product) {
    var cart = getCart();
    var productIndex = cart.findIndex((element) => element.id === product.id);

    if (productIndex >= 0) {
        if (cart[productIndex].quantity === 1) {
            cart.splice(productIndex, 1);    
        }
        else {
            cart[productIndex].quantity--;
        }
        updateCart(cart);
    }
}

function clearCart() {
    window.localStorage.clear();
}