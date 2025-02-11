var shoppingCart = (function () {
    var cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    }

    if (localStorage.getItem("shoppingCart")) {
        loadCart();
    }

    var obj = {};

    obj.addItemToCart = function (name, price) {
        let found = cart.find(item => item.name === name);
        if (found) {
            found.count++;
        } else {
            cart.push(new Item(name, price, 1));
        }
        saveCart();
        displayCart();
    };

    obj.removeItemFromCart = function (name) {
        cart = cart.filter(item => item.name !== name);
        saveCart();
        displayCart();
    };

    obj.clearCart = function () {
        cart = [];
        saveCart();
        displayCart();
    };

    obj.totalCount = function () {
        return cart.reduce((sum, item) => sum + item.count, 0);
    };

    obj.totalCart = function () {
        return cart.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2);
    };

    obj.listCart = function () {
        return cart.map(item => ({ ...item, total: (item.price * item.count).toFixed(2) }));
    };

    return obj;
})();

// Event Listeners
$(document).on("click", ".add-to-cart", function () {
    let name = $(this).data("name");
    let price = parseFloat($(this).data("price"));
    shoppingCart.addItemToCart(name, price);
});

$(document).on("click", ".clear-cart", function () {
    shoppingCart.clearCart();
});

$(document).on("click", ".checkout-btn", function () {
    alert("Checkout complete!");
    shoppingCart.clearCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = cartArray
        .map(
            item => `
            <tr>
                <td>${item.name}</td>
                <td>($${item.price})</td>
                <td>${item.count}</td>
                <td>$${item.total}</td>
                <td><button class="btn btn-danger delete-item" data-name="${item.name}">X</button></td>
            </tr>
        `
        )
        .join("");

    $(".show-cart").html(output);
    $(".total-cart").html(shoppingCart.totalCart());
    $(".total-count").html(shoppingCart.totalCount());
}

// Lazy Load Images
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lazy-load").forEach(img => {
        img.src = img.dataset.src;
    });
});

displayCart();
