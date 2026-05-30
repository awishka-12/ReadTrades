// Sample Orders Data
const ordersData = [
    {
        id: '#ORD-001234',
        date: '2026-05-30',
        status: 'delivered',
        paymentMethod: 'Credit Card (Visa)',
        subtotal: 2500.00,
        shipping: 250.00,
        total: 2750.00,
        items: [
            {
                id: 1,
                title: 'The Pragmatic Programmer',
                author: 'David Thomas, Andrew Hunt',
                image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=100&h=130&fit=crop',
                quantity: 1,
                price: 2500.00
            }
        ],
        customer: {
            name: 'John Doe',
            phone: '+94 77 123 4567',
            email: 'john.doe@example.com',
            address: '45 Book Street, Colombo 03, Sri Lanka'
        }
    },
    {
        id: '#ORD-001235',
        date: '2026-05-28',
        status: 'pending',
        paymentMethod: 'PayHere',
        subtotal: 5399.95,
        shipping: 0.00,
        total: 5399.95,
        items: [
            {
                id: 2,
                title: 'The Pragmatic Programmer',
                author: 'David Thomas, Andrew Hunt',
                image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=100&h=130&fit=crop',
                quantity: 1,
                price: 2500.00
            },
            {
                id: 3,
                title: 'A Game of Thrones',
                author: 'George R.R. Martin',
                image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=130&fit=crop',
                quantity: 1,
                price: 2899.95
            }
        ],
        customer: {
            name: 'Sarah Williams',
            phone: '+94 71 234 5678',
            email: 'sarah@example.com',
            address: 'Nawalapitiya, Thispane, Sri Lanka'
        }
    },
    {
        id: '#ORD-001236',
        date: '2026-05-25',
        status: 'processing',
        paymentMethod: 'Debit Card',
        subtotal: 3200.00,
        shipping: 300.00,
        total: 3500.00,
        items: [
            {
                id: 4,
                title: 'Atomic Habits',
                author: 'James Clear',
                image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=130&fit=crop',
                quantity: 2,
                price: 1600.00
            }
        ],
        customer: {
            name: 'Mike Johnson',
            phone: '+94 76 345 6789',
            email: 'mike@example.com',
            address: '123 Reading Lane, Kandy, Sri Lanka'
        }
    },
    {
        id: '#ORD-001237',
        date: '2026-05-22',
        status: 'shipped',
        paymentMethod: 'PayHere',
        subtotal: 4800.00,
        shipping: 250.00,
        total: 5050.00,
        items: [
            {
                id: 5,
                title: 'Dune',
                author: 'Frank Herbert',
                image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=130&fit=crop',
                quantity: 1,
                price: 3200.00
            },
            {
                id: 6,
                title: '1984',
                author: 'George Orwell',
                image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=130&fit=crop',
                quantity: 1,
                price: 1600.00
            }
        ],
        customer: {
            name: 'Emma Brown',
            phone: '+94 77 456 7890',
            email: 'emma@example.com',
            address: '78 Story Avenue, Galle, Sri Lanka'
        }
    },
    {
        id: '#ORD-001238',
        date: '2026-05-20',
        status: 'cancelled',
        paymentMethod: 'Credit Card',
        subtotal: 1899.00,
        shipping: 0.00,
        total: 1899.00,
        items: [
            {
                id: 7,
                title: 'Introduction to Algorithms',
                author: 'Thomas H. Cormen',
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=130&fit=crop',
                quantity: 1,
                price: 1899.00
            }
        ],
        customer: {
            name: 'Robert Wilson',
            phone: '+94 72 567 8901',
            email: 'robert@example.com',
            address: '56 Novel Lane, Negombo, Sri Lanka'
        }
    }
];

// Calculate summary stats
const totalOrders = ordersData.length;
const deliveredOrders = ordersData.filter(o => o.status === 'delivered').length;
const pendingOrders = ordersData.filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'shipped').length;
const totalSpent = ordersData
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

// DOM Elements
let currentFilter = 'all';
let currentSearch = '';

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    updateSummaryCards();
    loadOrdersTable();
    setupEventListeners();
});

// Update Summary Cards
function updateSummaryCards() {
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('deliveredOrders').textContent = deliveredOrders;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('totalSpent').innerHTML = `Rs. ${totalSpent.toLocaleString('en-IN')}`;
}

// Load Orders Table
function loadOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    const searchTerm = document.getElementById('searchOrder')?.value.toLowerCase() || '';
    const filterStatus = document.getElementById('filterStatus')?.value || 'all';

    let filteredOrders = [...ordersData];

    // Filter by search
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order =>
            order.id.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by status
    if (filterStatus !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }

    // Check if no orders
    if (filteredOrders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="padding: 0;">
                    <div class="empty-state">
                        <div class="empty-illustration">
                            <i class="fas fa-book-open"></i>
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <h3>You haven't placed any orders yet</h3>
                        <p>Start your reading journey with ReadTrade</p>
                        <a href="browse.html" class="btn-browse">
                            <i class="fas fa-book"></i> Browse Books
                        </a>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredOrders.map(order => `
        <tr>
            <td data-label="Order ID"><span class="order-id">${order.id}</span></td>
            <td data-label="Date">${formatDate(order.date)}</td>
            <td data-label="Items">${order.items.length}</td>
            <td data-label="Total">Rs. ${order.total.toLocaleString('en-IN')}</td>
            <td data-label="Status">
                <span class="status-badge status-${order.status}">
                    <i class="fas ${getStatusIcon(order.status)}"></i>
                    ${capitalize(order.status)}
                </span>
            </td>
            <td data-label="Action">
                <button class="btn-view-details" onclick="viewOrderDetails('${order.id}')">
                    <i class="fas fa-eye"></i> View Details
                </button>
            </td>
        </tr>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchOrder');
    if (searchInput) {
        searchInput.addEventListener('input', () => loadOrdersTable());
    }

    const filterSelect = document.getElementById('filterStatus');
    if (filterSelect) {
        filterSelect.addEventListener('change', () => loadOrdersTable());
    }

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;

            // Update filter select to match
            if (filterSelect) {
                filterSelect.value = currentFilter;
            }

            loadOrdersTable();
        });
    });
}

// View Order Details
function viewOrderDetails(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;

    const modalBody = document.getElementById('orderModalBody');

    modalBody.innerHTML = `
        <!-- Order Information -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-info-circle"></i>
                <span>Order Information</span>
            </div>
            <div class="order-info-grid">
                <div class="info-card">
                    <h5>Order ID</h5>
                    <p>${order.id}</p>
                </div>
                <div class="info-card">
                    <h5>Order Date</h5>
                    <p>${formatDate(order.date)}</p>
                </div>
                <div class="info-card">
                    <h5>Payment Method</h5>
                    <p>${order.paymentMethod}</p>
                </div>
                <div class="info-card">
                    <h5>Status</h5>
                    <div class="status-badge-large status-${order.status}">
                        <i class="fas ${getStatusIcon(order.status)}"></i>
                        ${capitalize(order.status)}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Purchased Books -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-book"></i>
                <span>Purchased Books</span>
            </div>
            <div class="products-list">
                ${order.items.map(item => `
                    <div class="product-item">
                        <div class="product-image">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="product-details">
                            <div class="product-title">${item.title}</div>
                            <div class="product-author">
                                <i class="fas fa-user"></i> ${item.author}
                            </div>
                            <div class="product-meta">
                                <span><strong>Qty:</strong> ${item.quantity}</span>
                            </div>
                        </div>
                        <div class="product-price">
                            <span class="price-label">Price</span>
                            <span class="price-value">Rs. ${item.price.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Order Summary -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-calculator"></i>
                <span>Order Summary</span>
            </div>
            <div class="order-summary">
                <div class="summary-row">
                    <span class="label">Subtotal</span>
                    <span class="value">Rs. ${order.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div class="summary-row">
                    <span class="label">Shipping</span>
                    <span class="value">Rs. ${order.shipping.toLocaleString('en-IN')}</span>
                </div>
                <div class="summary-row total">
                    <span class="label">Total</span>
                    <span class="value">Rs. ${order.total.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
        
        <!-- Shipping Information -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-truck"></i>
                <span>Shipping Information</span>
            </div>
            <div class="shipping-info">
                <div class="shipping-item">
                    <i class="fas fa-user"></i>
                    <div class="shipping-details">
                        <span class="label">Customer Name</span>
                        <span class="value">${order.customer.name}</span>
                    </div>
                </div>
                <div class="shipping-item">
                    <i class="fas fa-phone"></i>
                    <div class="shipping-details">
                        <span class="label">Phone Number</span>
                        <span class="value">${order.customer.phone}</span>
                    </div>
                </div>
                <div class="shipping-item">
                    <i class="fas fa-envelope"></i>
                    <div class="shipping-details">
                        <span class="label">Email</span>
                        <span class="value">${order.customer.email}</span>
                    </div>
                </div>
                <div class="shipping-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="shipping-details">
                        <span class="label">Delivery Address</span>
                        <span class="value">${order.customer.address}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Order Timeline -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-clock"></i>
                <span>Order Timeline</span>
            </div>
            <div class="timeline">
                <div class="timeline-item ${order.status === 'delivered' ? 'completed' : order.status === 'pending' ? 'active' : ''}">
                    <div class="timeline-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="timeline-content">
                        <h6>Order Placed</h6>
                        <p>${formatDate(order.date)}</p>
                    </div>
                </div>
                <div class="timeline-item ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''}">
                    <div class="timeline-icon">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <div class="timeline-content">
                        <h6>Order Confirmed</h6>
                        <p>${formatDate(addDays(order.date, 1))}</p>
                    </div>
                </div>
                <div class="timeline-item ${order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''}">
                    <div class="timeline-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="timeline-content">
                        <h6>Shipped</h6>
                        <p>${formatDate(addDays(order.date, 3))}</p>
                    </div>
                </div>
                <div class="timeline-item ${order.status === 'delivered' ? 'completed' : ''}">
                    <div class="timeline-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="timeline-content">
                        <h6>Delivered</h6>
                        <p>${order.status === 'delivered' ? formatDate(addDays(order.date, 5)) : 'Expected delivery'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('orderModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Order Modal
function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusIcon(status) {
    switch(status) {
        case 'delivered': return 'fa-check-circle';
        case 'pending': return 'fa-clock';
        case 'processing': return 'fa-spinner fa-pulse';
        case 'shipped': return 'fa-truck';
        case 'cancelled': return 'fa-times-circle';
        default: return 'fa-question-circle';
    }
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});

// Close modal on outside click
document.getElementById('orderModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeOrderModal();
    }
});