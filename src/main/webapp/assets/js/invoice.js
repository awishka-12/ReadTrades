const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");

window.addEventListener("load", async () => {
    if (!orderId) {
        alert("No order ID found!");
        window.location.href = "index.html";
        return;
    }
    await loadInvoice(orderId);
});

async function loadInvoice(orderId) {
    try {
        const response = await fetch("api/orders/invoice?orderId=" + orderId);
        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        if (!data.status) {
            alert(data.message || "Invoice not found");
            return;
        }

        const inv = data.invoice;

        // Invoice header info
        document.getElementById("invoice-no").textContent = inv.invoiceNo;
        document.getElementById("invoice-date").textContent = inv.date;

        // Status badge
        const statusEl = document.getElementById("invoice-status");
        if (inv.status === "COMPLETED") {
            statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Paid';
            statusEl.className = "status-badge status-paid";
        } else if (inv.status === "PENDING") {
            statusEl.innerHTML = '<i class="fas fa-clock"></i> Pending';
            statusEl.className = "status-badge status-pending";
        } else {
            statusEl.innerHTML = '<i class="fas fa-times-circle"></i> ' + inv.status;
            statusEl.className = "status-badge status-failed";
        }

        // Buyer info
        document.getElementById("buyer-name").textContent = inv.buyerName;
        document.getElementById("buyer-email").textContent = inv.buyerEmail;
        document.getElementById("buyer-phone").textContent = inv.buyerPhone || "N/A";
        document.getElementById("buyer-address").textContent = inv.buyerAddress || "N/A";
        document.getElementById("city-name").textContent = inv.buyerCity || "N/A";
        document.getElementById("country-name").textContent = "Sri Lanka";

        // Order items
        const tbody = document.getElementById("item-tbody");
        tbody.innerHTML = "";
        inv.items.forEach((item, index) => {
            tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <div class="item-info">
                        <div class="item-details">
                            <div class="item-title">${item.title}</div>
                            <div class="item-category">${item.category}</div>
                        </div>
                    </div>
                </td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-end">Rs. ${item.unitPrice.toFixed(2)}</td>
                <td class="text-end fw-bold">Rs. ${item.total.toFixed(2)}</td>
            </tr>`;
        });

        // Totals
        document.getElementById("subtotal").textContent = inv.subtotal.toFixed(2);
        document.getElementById("shipping-charges").textContent = inv.shipping.toFixed(2);
        document.getElementById("total").textContent = inv.total.toFixed(2);

        // Hide discount and tax rows if not used
        const discountRow = document.querySelector(".total-row.discount");
        if (discountRow) discountRow.style.display = "none";
        const taxRow = document.getElementById("tax-amount");
        if (taxRow) taxRow.closest(".total-row").style.display = "none";
        const savedAmount = document.querySelector(".saved-amount");
        if (savedAmount) savedAmount.style.display = "none";

    } catch (e) {
        console.error(e);
        alert("Failed to load invoice: " + e.message);
    }
}