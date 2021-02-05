(function() {
    
    var body = document.getElementsByTagName('body')[0];
    var isHome = body.classList.contains('home');
    var isSupport = body.classList.contains('support');
    var isBuyForm = body.classList.contains('buy-form');
    
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.toggle('sticky-top', isHome);
    navbar.classList.toggle('sup-navbar', isSupport);
    
    let totalPrice = 0;
    const cart = getCart();
    for (let index = 0, indexMax = cart.length; index < indexMax; index++) {
        const item = cart[index];
        totalPrice += item.price * item.quantity;
    }

    /* Simplification de la boucle for
    * const additionFn = (lastVal, currItem) => lastVal + (currItem.quantity * currItem.price); 
    * const totalPrice = getCart().reduce(additionFn, 0);
    */
    
    jQuery('.dropdown-toggle').on('click', function (e) {
        $(this).next().toggle();
    });
    jQuery('.dropdown-menu.keep-open').on('click', function (e) {
        e.stopPropagation();
    });
    
    if(1) {
        $('body').attr('tabindex', '0');
    }
    else {
        alertify.confirm().set({'reverseButtons': true});
        alertify.prompt().set({'reverseButtons': true});
    }
    
    if (isBuyForm) { 
        document.addEventListener("DOMContentLoaded", function() {
            for (let i = 0; i < cart.length; i++) {
                var tr = document.createElement('tr')
                tr.innerHTML = `
                    <th>Produit : </th>
                    <td><input type="text" class="form-control product-input" name="cart[${i}][name]" value="${cart[i].name}" readonly></td>
                    <td><input type="text" class="form-control product-input" name="cart[${i}][id]" value="${cart[i].id}" readonly></td>
                    <td><input type="text" class="form-control product-input" name="cart[${i}][price]" value="${cart[i].price} CHF" readonly></td>
                    <td><input type="number" class="form-control product-input" name="cart[${i}][qty]" value="${cart[i].quantity}" readonly></td>
                `;
                
                document.getElementById('display-cart').appendChild(tr);
            }
            
            document.querySelector('form').addEventListener("submit", function(){
                gtag('event', 'purchase', {
                    "transaction_id": `${new Date().getTime()}`,
                    "affiliation": "NTX online store",
                    "currency": "CHF",
                    "tax": `${totalPrice * 0,77}`,
                    "items": cart
                });
            });    
        });
    }
    
    document.querySelectorAll('.add-to-cart').forEach(item => {
        item.addEventListener('click', event => {
            var addToCartBtn = item;
            var id = addToCartBtn.dataset.productId;
            var name = addToCartBtn.dataset.productName;
            var price = addToCartBtn.dataset.productPrice;
            var quantity = 1;
            
            createProduct(id, name, price, quantity);
            displayCart();
        })
    });
    
    document.getElementById('shopping-cart-button').addEventListener('click', event => {
        displayCart();
    });
    
    document.addEventListener('click', event => {
        changeCart();
    });
    
    if (!String.prototype.formatUnicorn) {
        
        /**
        * Amazing formatter
        *
        * Example: "Hello, {name}, are you feeling {adjective}?".formatUnicorn({name:"John", adjective: "good"});
        *
        * @param {object} Token to replace in the original string 
        * @returns A formatted string
        * @type String
        */
        String.prototype.formatUnicorn = function () {
            var e = this.toString();
            if (!arguments.length)
            return e;
            var t = typeof arguments[0]
            , n = "string" == t || "number" == t ? Array.prototype.slice.call(arguments) : arguments[0];
            for (var i in n)
            e = e.replace(new RegExp("\\{" + i + "\\}", "gi"), n[i]);
            return e
        };
    }
    
    function displayCart() {
        var cart = getCart();
        var totalPrice = 0;
        document.getElementById('cart').innerHTML = "";
        
        for (let index = 0; index < cart.length; index++) {
            var div = document.createElement('div');
            
            div.setAttribute('class', 'col-8')
            div.innerHTML = `
                <dic class="container">
                    <div class="row mt-3">
                        <div class="text-left">
                            <label for="product">Article :</label>
                            <input type="text" class="product-name" name="product" placeholder="" value="${cart[index].name}" readonly>
                        </div>
                        <div class="text-right">
                            <div class="row product-quantity">
                                <div class="col-3">
                                    <button class="add-product quantity-btn" data-product-id="${cart[index].id}" data-product-name="${cart[index].name}" data-product-price="${cart[index].price}" data-product-quantity="${cart[index].quantity}">+</button>
                                </div>
                                <div class="col-3">
                                    <input type="text" class="quantity-input" name="quantity" placeholder="" value="${cart[index].quantity}" readonly>
                                </div>
                                <div class="col-3">
                                    <button class="remove-product quantity-btn" data-product-id="${cart[index].id}" data-product-name="${cart[index].name}" data-product-price="${cart[index].price}" data-product-quantity="${cart[index].quantity}">-</button>
                                </div>
                                <div class="col-3">
                                    <button class="delete-product quantity-btn" data-product-id="${cart[index].id}" data-product-name="${cart[index].name}" data-product-price="${cart[index].price}" data-product-quantity="${cart[index].quantity}">
                                        x
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('cart').appendChild(div);
            
            totalPrice += Math.round((+cart[index].price * cart[index].quantity) * 100) / 100;
        }
        
        if (totalPrice === undefined || totalPrice === 0) {
            document.getElementById('price-input').innerHTML = `Panier vide`;
        }
        else {
            document.getElementById('price-input').innerHTML = `${Math.round(totalPrice)} CHF`;
        }
    }
    
    function changeCart() {
        var element = event.target;
        var btn = element;
        var product = {
            id: btn.dataset.productId,
            name: btn.dataset.productName,
            price: btn.dataset.productPrice
        };
        if (element.tagName == 'BUTTON' && element.classList.contains('add-product')) {
            addProductToCart(product);
            displayCart();
        }
        else if (element.tagName == 'BUTTON' && element.classList.contains('remove-product')) {    
            removeProductFromCart(product);
            displayCart();
        }
        else if (element.tagName == 'BUTTON' && element.classList.contains('delete-product')) {
            var cart = getCart();
            var productIndex = cart.findIndex((element) => element.id === product.id);
            
            cart[productIndex].quantity = 1;
            updateCart(cart);
            removeProductFromCart(product);
            displayCart();
        }    
    }    
})();