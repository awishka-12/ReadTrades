// Sample Users Data
const usersData = [
    {
        id: 1,
        userId: '#USR-001234',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+94 77 123 4567',
        totalOrders: 12,
        totalSpent: 45600.00,
        registrationDate: '2024-01-15',
        status: 'verified',
        lastLogin: '2026-05-30 14:30:00',
        role: 'Customer',
        recentOrders: [
            { id: '#ORD-001234', date: '2026-05-30', amount: 2750.00, status: 'delivered' },
            { id: '#ORD-001235', date: '2026-05-28', amount: 5399.95, status: 'pending' },
            { id: '#ORD-001236', date: '2026-05-25', amount: 3500.00, status: 'processing' }
        ]
    },
    {
        id: 2,
        userId: '#USR-001235',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+94 71 234 5678',
        totalOrders: 8,
        totalSpent: 28900.50,
        registrationDate: '2024-02-20',
        status: 'verified',
        lastLogin: '2026-05-29 09:15:00',
        role: 'Customer',
        recentOrders: [
            { id: '#ORD-001237', date: '2026-05-22', amount: 5050.00, status: 'shipped' },
            { id: '#ORD-001238', date: '2026-05-20', amount: 1899.00, status: 'delivered' }
        ]
    },
    {
        id: 3,
        userId: '#USR-001236',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+94 76 345 6789',
        totalOrders: 5,
        totalSpent: 12500.00,
        registrationDate: '2024-03-10',
        status: 'pending',
        lastLogin: '2026-05-28 18:45:00',
        role: 'Customer',
        recentOrders: [
            { id: '#ORD-001239', date: '2026-05-18', amount: 3200.00, status: 'pending' }
        ]
    },
    {
        id: 4,
        userId: '#USR-001237',
        name: 'Emma Brown',
        email: 'emma@example.com',
        phone: '+94 77 456 7890',
        totalOrders: 15,
        totalSpent: 67800.00,
        registrationDate: '2024-01-05',
        status: 'blocked',
        lastLogin: '2026-05-25 11:20:00',
        role: 'Customer',
        recentOrders: [
            { id: '#ORD-001240', date: '2026-05-15', amount: 4200.00, status: 'cancelled' }
        ]
    },
    {
        id: 5,
        userId: '#USR-001238',
        name: 'Robert Wilson',
        email: 'robert@example.com',
        phone: '+94 72 567 8901',
        totalOrders: 3,
        totalSpent: 8900.00,
        registrationDate: '2024-04-18',
        status: 'verified',
        lastLogin: '2026-05-30 10:00:00',
        role: 'Customer',
        recentOrders: [
            { id: '#ORD-001241', date: '2026-05-12', amount: 2500.00, status: 'delivered' }
        ]
    },
    {
        id: 6,
        userId: '#USR-001239',
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        phone: '+94 78 678 9012',
        totalOrders: 0,
        totalSpent: 0,
        registrationDate: '2026-05-28',
        status: 'pending',
        lastLogin: '2026-05-28 20:00:00',
        role: 'Customer',
        recentOrders: []
    },
    {
        id: 7,
        userId: '#USR-001240',
        name: 'David Lee',
        email: 'david@example.com',
        phone: '+94 75 789 0123',
        totalOrders: 20,
        totalSpent: 89500.00,
        registrationDate: '2023-12-01',
        status: 'verified',
        lastLogin: '2026-05-29 16:30:00',
        role: 'Customer',
        recentOrders: [
            { id: '#ORD-001242', date: '2026-05-10', amount: 6500.00, status: 'delivered' },
            { id: '#ORD-001243', date: '2026-05-05', amount: 3200.00, status: 'delivered' }
        ]
    }
];

// Pagination Settings
const itemsPerPage = 10;
let currentPage = 1;
let filteredUsers = [...usersData];
let currentFilters = {
    name: '',
    email: '',
    status: 'all',
    sortBy: 'date_desc'
};

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    updateSummaryCards();
    setupEventListeners();
    applyFilters();
    renderUsersTable();
});

// Update Summary Cards
function updateSummaryCards() {
    const total = usersData.length;
    const verified = usersData.filter(u => u.status === 'verified').length;
    const pending = usersData.filter(u => u.status === 'pending').length;
    const blocked = usersData.filter(u => u.status === 'blocked').length;

    document.getElementById('totalUsers').textContent = total;
    document.getElementById('verifiedUsers').textContent = verified;
    document.getElementById('pendingUsers').textContent = pending;
    document.getElementById('blockedUsers').textContent = blocked;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search inputs
    document.getElementById('searchName').addEventListener('input', (e) => {
        currentFilters.name = e.target.value;
        currentPage = 1;
        applyFilters();
    });

    document.getElementById('searchEmail').addEventListener('input', (e) => {
        currentFilters.email = e.target.value;
        currentPage = 1;
        applyFilters();
    });

    // Filter status
    document.getElementById('filterStatus').addEventListener('change', (e) => {
        currentFilters.status = e.target.value;
        currentPage = 1;
        applyFilters();
    });

    // Sort by
    document.getElementById('sortBy').addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        currentPage = 1;
        applyFilters();
    });

    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Pagination buttons
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderUsersTable();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderUsersTable();
        }
    });
}

// Reset Filters
function resetFilters() {
    currentFilters = {
        name: '',
        email: '',
        status: 'all',
        sortBy: 'date_desc'
    };
    document.getElementById('searchName').value = '';
    document.getElementById('searchEmail').value = '';
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('sortBy').value = 'date_desc';
    currentPage = 1;
    applyFilters();
}

// Apply Filters
function applyFilters() {
    filteredUsers = usersData.filter(user => {
        // Filter by name
        if (currentFilters.name && !user.name.toLowerCase().includes(currentFilters.name.toLowerCase())) {
            return false;
        }

        // Filter by email
        if (currentFilters.email && !user.email.toLowerCase().includes(currentFilters.email.toLowerCase())) {
            return false;
        }

        // Filter by status
        if (currentFilters.status !== 'all' && user.status !== currentFilters.status) {
            return false;
        }

        return true;
    });

    // Apply sorting
    filteredUsers.sort((a, b) => {
        switch(currentFilters.sortBy) {
            case 'date_desc':
                return new Date(b.registrationDate) - new Date(a.registrationDate);
            case 'date_asc':
                return new Date(a.registrationDate) - new Date(b.registrationDate);
            case 'orders_desc':
                return b.totalOrders - a.totalOrders;
            case 'orders_asc':
                return a.totalOrders - b.totalOrders;
            default:
                return 0;
        }
    });

    renderUsersTable();
}

// Render Users Table
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    // Update table info
    document.getElementById('userCount').textContent = `Showing ${filteredUsers.length} users`;

    // Check if no users
    if (filteredUsers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="padding: 0;">
                    <div class="empty-state">
                        <div class="empty-illustration">
                            <i class="fas fa-users"></i>
                            <i class="fas fa-user-slash"></i>
                        </div>
                        <h3>No users found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                </td>
            </tr>
        `;
        document.getElementById('pagination').style.display = 'none';
        return;
    }

    document.getElementById('pagination').style.display = 'flex';

    tbody.innerHTML = paginatedUsers.map(user => `
        <tr>
            <td data-label="User ID"><span class="user-id">${user.userId}</span></td>
            <td data-label="Customer Name"><strong>${user.name}</strong></td>
            <td data-label="Email Address">${user.email}</td>
            <td data-label="Phone Number">${user.phone}</td>
            <td data-label="Total Orders">${user.totalOrders}</td>
            <td data-label="Total Spent">Rs. ${user.totalSpent.toLocaleString('en-IN')}</td>
            <td data-label="Reg. Date">${formatDate(user.registrationDate)}</td>
            <td data-label="Account Status">
                <span class="status-badge status-${user.status}">
                    <i class="fas ${getStatusIcon(user.status)}"></i>
                    ${capitalize(user.status)}
                </span>
            </td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewUserDetails(${user.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${user.status === 'blocked' ?
        `<button class="btn-action btn-unblock" onclick="unblockUser(${user.id})" title="Unblock User">
                            <i class="fas fa-unlock-alt"></i>
                        </button>` :
        `<button class="btn-action btn-block" onclick="blockUser(${user.id})" title="Block User">
                            <i class="fas fa-ban"></i>
                        </button>`
    }
                    <button class="btn-action btn-delete" onclick="deleteUser(${user.id})" title="Delete User">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Update pagination
    updatePagination(totalPages);
}

// Update Pagination
function updatePagination(totalPages) {
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    let pagesHTML = '';
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesHTML += `
            <div class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </div>
        `;
    }

    pageNumbers.innerHTML = pagesHTML;
}

// Go to Page
function goToPage(page) {
    currentPage = page;
    renderUsersTable();
}

// View User Details
function viewUserDetails(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const modalBody = document.getElementById('userModalBody');

    modalBody.innerHTML = `
        <!-- Customer Information -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-user-circle"></i>
                <span>Customer Information</span>
            </div>
            <div class="info-grid">
                <div class="info-card">
                    <h5>Full Name</h5>
                    <p>${user.name}</p>
                </div>
                <div class="info-card">
                    <h5>Email</h5>
                    <p>${user.email}</p>
                </div>
                <div class="info-card">
                    <h5>Phone Number</h5>
                    <p>${user.phone}</p>
                </div>
                <div class="info-card">
                    <h5>Registration Date</h5>
                    <p>${formatDate(user.registrationDate)}</p>
                </div>
                <div class="info-card">
                    <h5>Last Login</h5>
                    <p>${formatDateTime(user.lastLogin)}</p>
                </div>
            </div>
        </div>
        
        <!-- Purchase Statistics -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-chart-line"></i>
                <span>Purchase Statistics</span>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <h4>${user.totalOrders}</h4>
                    <p>Total Orders</p>
                </div>
                <div class="stat-card">
                    <h4>${user.totalOrders === 0 ? 0 : user.recentOrders.reduce((sum, o) => sum + 1, 0)}</h4>
                    <p>Total Books Purchased</p>
                </div>
                <div class="stat-card">
                    <h4>Rs. ${user.totalSpent.toLocaleString('en-IN')}</h4>
                    <p>Total Amount Spent</p>
                </div>
            </div>
        </div>
        
        <!-- Recent Orders -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-clock"></i>
                <span>Recent Orders</span>
            </div>
            ${user.recentOrders.length > 0 ? `
                <table class="recent-orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${user.recentOrders.slice(0, 5).map(order => `
                            <tr>
                                <td><span class="user-id">${order.id}</span></td>
                                <td>${formatDate(order.date)}</td>
                                <td>Rs. ${order.amount.toLocaleString('en-IN')}</td>
                                <td><span class="status-badge status-${order.status}">${capitalize(order.status)}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : '<p style="color: var(--text-light); text-align: center;">No orders yet</p>'}
        </div>
        
        <!-- Account Information -->
        <div class="modal-section">
            <div class="section-title">
                <i class="fas fa-shield-alt"></i>
                <span>Account Information</span>
            </div>
            <div class="info-grid">
                <div class="info-card">
                    <h5>User Role</h5>
                    <p>${user.role}</p>
                </div>
                <div class="info-card">
                    <h5>Account Status</h5>
                    <div class="account-status status-${user.status}">
                        <i class="fas ${getStatusIcon(user.status)}"></i>
                        ${capitalize(user.status)}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('userModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close User Modal
function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Block User
function blockUser(userId) {
    if (confirm('Are you sure you want to block this user?')) {
        const user = usersData.find(u => u.id === userId);
        if (user) {
            user.status = 'blocked';
            updateSummaryCards();
            applyFilters();
            renderUsersTable();
            showNotification('User has been blocked successfully', 'success');
        }
    }
}

// Unblock User
function unblockUser(userId) {
    if (confirm('Are you sure you want to unblock this user?')) {
        const user = usersData.find(u => u.id === userId);
        if (user) {
            user.status = 'verified';
            updateSummaryCards();
            applyFilters();
            renderUsersTable();
            showNotification('User has been unblocked successfully', 'success');
        }
    }
}

// Delete User
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const index = usersData.findIndex(u => u.id === userId);
        if (index !== -1) {
            usersData.splice(index, 1);
            updateSummaryCards();
            applyFilters();
            renderUsersTable();
            showNotification('User has been deleted successfully', 'success');
        }
    }
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

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusIcon(status) {
    switch(status) {
        case 'verified': return 'fa-check-circle';
        case 'pending': return 'fa-clock';
        case 'blocked': return 'fa-ban';
        default: return 'fa-question-circle';
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00c9a7' : '#ff4757'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeUserModal();
    }
});

// Close modal on outside click
document.getElementById('userModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeUserModal();
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);