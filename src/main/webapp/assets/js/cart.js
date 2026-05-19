// ─────────────────────────────────────────────
//  cart.js  –  ReadTrade cart module
// ─────────────────────────────────────────────

let cartItems = [];

// ── Bootstrap ────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("activeCartGrid")) {
        loadAllCart();
    }

    // Single, permanent event delegation for all cart interactions.
    // Registered ONCE here so re-renders never stack up listeners.
    document.addEventListener("click", handleCartClick);
});

// ── Event delegation (ONE listener, lives forever) ───────────────
function handleCartClick(e) {
    const incrementBtn = e.target.closest(".increment");
    const decrementBtn = e.target.closest(".decrement");
    const removeBtn    = e.target.closest(".remove-btn");
    const checkoutBtn  = e.target.closest("#checkoutBtn");
    const continueLink = e.target.closest(".continue-shopping");

    if (incrementBtn) {
        const id = parseInt(incrementBtn.dataset.id);
        incrementQuantity(id);
    }

    if (decrementBtn) {
        const id = parseInt(decrementBtn.dataset.id);
        decrementQuantity(id);
    }

    if (removeBtn) {
        const id = parseInt(removeBtn.dataset.id);
        removecart(id);
    }

    if (checkoutBtn) {
        handleCheckout();
    }

    if (continueLink) {
        e.preventDefault();
        alert("Continue shopping – browse our collection!");
    }
}

// ── Add to cart (called from product pages) ──
async function addToCart(title, price, bookId) {
    try {
        Notiflix.Loading.pulse("Wait...", {
            clickToClose: false,
            svgColor: "#0284c7",
        });

        const response = await fetch(`api/cart/addToCart?bid=${bookId}`);

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        if (data.status) {
            Notiflix.Notify.success(data.message);
        } else {
            Notiflix.Notify.failure(data.message, { position: "center-top" });
        }
    } catch (e) {
        console.error("addToCart error:", e);
        Notiflix.Notify.failure("Something went wrong. Please try again.");
    } finally {
        Notiflix.Loading.remove();
    }
}

// ── Load cart from server ────────────────────
async function loadAllCart() {
    try {
        const response = await fetch("api/cart/all");

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        if (data.status) {
            cartItems = data.data.map((item) => ({
                id:       item.productid,   // matches ProductDTO field name
                title:    item.title,
                price:    item.price,
                author:   item.name,
                quantity: item.quantity,
                image:    item.images,
            }));

            renderCart();
        } else {
            console.warn("Could not load cart:", data.message);
        }
    } catch (e) {
        console.error("loadAllCart error:", e);
    }
}

// ── Quantity helpers ─────────────────────────
function incrementQuantity(id) {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    updateQty(id, item.quantity + 1);
}

function decrementQuantity(id) {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity > 1) {
        updateQty(id, item.quantity - 1);
    } else {
        removecart(id);
    }
}

// ── API: update quantity ─────────────────────
async function updateQty(id, qty) {
    try {
        const response = await fetch(`api/cart/updateQty?id=${id}&qty=${qty}`);

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        if (data.status) {
            await loadAllCart();        // refresh from server after success
        } else {
            alert(data.message || "Could not update quantity.");
        }
    } catch (e) {
        console.error("updateQty error:", e);
        alert("Something went wrong while updating quantity.");
    }
}

// ── API: remove item ─────────────────────────
async function removecart(id) {
    try {
        const response = await fetch(`api/cart/removeItem?id=${id}`);

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        await loadAllCart();
    } catch (e) {
        console.error("removecart error:", e);
        alert("Something went wrong while removing the item.");
    }
}

// ── Summary & header helpers ─────────────────
function updateHeaderCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountHeader = document.getElementById("cartCountHeader");
    if (cartCountHeader) cartCountHeader.innerText = totalItems;
}

function updateSummary() {

    const subtotal   = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const subtotalEl = document.getElementById("summarySubtotal");
    const totalEl    = document.getElementById("summaryTotal");

    if (subtotalEl) subtotalEl.innerText = `Rs ${subtotal.toFixed(2)}`;
    if (totalEl)    totalEl.innerText    = `Rs ${subtotal.toFixed(2)}`;
}

// ── Checkout ─────────────────────────────────
function handleCheckout() {
    const total = cartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    alert(`Thank you for your purchase!\nTotal: $${total}\nThis is a demo checkout.` );
    window.location="CheckOut.html";
}

// ── Render ───────────────────────────────────
function renderCart() {
    const activeCartGrid  = document.getElementById("activeCartGrid");
    const emptyCartState  = document.getElementById("emptyCartState");

    if (!activeCartGrid) return;

    updateHeaderCartCount();

    // ── Empty state ──
    if (cartItems.length === 0) {
        activeCartGrid.style.display = "none";
        if (emptyCartState) emptyCartState.style.display = "block";
        return;
    }

    activeCartGrid.style.display = "grid";
    if (emptyCartState) emptyCartState.style.display = "none";

    // ── Build rows ──
    const rows = cartItems
        .map((item) => {
            const itemTotal  = (item.price * item.quantity).toFixed(2);
            const imageSrc   = Array.isArray(item.image) ? item.image[0] : item.image;

            return `
            <tr data-id="${item.id}">
                <td>
                    <div class="product-info">
                        <div class="product-image">
                            <img src="${imageSrc}" class="product-img" alt="${item.title}" />
                        </div>
                        <div class="product-details">
                            <h5>${item.title}</h5>
                            <div class="author">by ${item.author}</div>
                        </div>
                    </div>
                </td>
                <td class="item-price">Rs ${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn decrement" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increment" data-id="${item.id}">+</button>
                    </div>
                </td>
                <td class="item-total">$${itemTotal}</td>
                <td>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`;
        })
        .join("");

    // ── Full template ──
    activeCartGrid.innerHTML = `
        <div class="cart-table-wrapper">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div style="padding: 0 20px 20px 20px;">
                <a href="#" class="continue-shopping">
                    <i class="fas fa-arrow-left"></i> Continue Shopping
                </a>
            </div>
        </div>

        <div class="cart-summary">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span id="summarySubtotal">Rs 0.00</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
            </div>
            <div class="summary-row">
                <span>Tax</span>
                <span>Estimated Rs 0.00</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span id="summaryTotal">Rs 0.00</span>
            </div>
            <button class="checkout-btn" id="checkoutBtn"> Proceed to Checkout</button>
            <p class="text-muted text-center mt-3" style="font-size: 0.75rem;">
                <i class="fas fa-lock"></i> Secure payment • Free returns
            </p>
        </div>`;


    updateSummary();
}