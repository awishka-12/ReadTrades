class HeaderContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<div class="axil-header-top">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <div class="header-top-left">
                    <div class="dropdown header-dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-globe-americas"></i>
                            <span>English</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item active" href="#"><i class="fas fa-check me-2"></i>English</a></li>
                            <li><a class="dropdown-item" href="#"><i class="flag-icon flag-es me-2"></i>Español</a></li>
                            <li><a class="dropdown-item" href="#"><i class="flag-icon flag-fr me-2"></i>Français</a></li>
                            <li><a class="dropdown-item" href="#"><i class="flag-icon flag-de me-2"></i>Deutsch</a></li>
                            <li><a class="dropdown-item" href="#"><i class="flag-icon flag-cn me-2"></i>中文</a></li>
                        </ul>
                    </div>
                    <div class="dropdown header-dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-dollar-sign"></i>
                            <span>USD</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item active" href="#"><i class="fas fa-check me-2"></i>USD</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-euro-sign me-2"></i>EUR</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-pound-sign me-2"></i>GBP</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-rupee-sign me-2"></i>INR</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-yen-sign me-2"></i>JPY</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="header-top-right">
                    <ul class="quick-link">
                        <li><a href="help-center.html"><i class="fas fa-headset"></i>Help Center</a></li>
                        <li><a href="become-seller.html"><i class="fas fa-store"></i>Sell on ReadTrade</a></li>
                        <li><a href="sign-up.html"><i class="fas fa-user-plus"></i>Join Us</a></li>
                        <li class="divider"></li>
                        <li><a href="sign-in.html" class="sign-in-link"><i class="fas fa-sign-in-alt"></i>Sign In</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="axil-mainmenu">
    <div class="container">
        <div class="header-navbar">
            <!-- Logo -->
            <div class="header-brand">
                <a href="index.html" class="logo logo-dark">
                    <div class="logo-icon">
                        <i class="fas fa-book-reader"></i>
                    </div>
                    <div class="logo-text">
                        <span class="brand-name">ReadTrade</span>
                        <span class="brand-tagline">Trade • Discover • Connect</span>
                    </div>
                </a>
               
            </div>

            <!-- Search Bar -->
            <div class="header-search">
                <div class="search-container">
                    <form class="search-form" id="main-search-form">
                        <div class="input-group">
                            <div class="search-category-dropdown">
                                <button class="btn btn-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>All Categories</span>
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu category-dropdown">
                                    <li><h6 class="dropdown-header">Book Categories</h6></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-book"></i> All Categories</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><h6 class="dropdown-header">Fiction</h6></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-pen-nib"></i> Literary</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-rocket"></i> Sci-Fi</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-dragon"></i> Fantasy</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-magnifying-glass"></i> Mystery</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-heart"></i> Romance</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><h6 class="dropdown-header">Non-Fiction</h6></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-graduation-cap"></i> Academic</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-chart-line"></i> Business</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-flask"></i> Science</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-history"></i> History</a></li>
                                </ul>
                            </div>
                            <input type="text" class="form-control" placeholder="Search books, authors, ISBN..." id="main-search-input">
                            <button type="submit" class="btn btn-search">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                    <div class="search-suggestions" id="search-suggestions">
                        <div class="suggestions-header">
                            <h6>Trending Searches</h6>
                            <a href="search-history.html" class="clear-history">Clear History</a>
                        </div>
                        <div class="suggestions-content">
                            <a href="#" class="suggestion-item">
                                <i class="fas fa-clock"></i>
                                <span>Harry Potter Complete Series</span>
                            </a>
                            <a href="#" class="suggestion-item">
                                <i class="fas fa-clock"></i>
                                <span>Stephen King Novels</span>
                            </a>
                            <a href="#" class="suggestion-item">
                                <i class="fas fa-fire"></i>
                                <span>Computer Science Textbooks</span>
                            </a>
                            <a href="#" class="suggestion-item">
                                <i class="fas fa-fire"></i>
                                <span>Self-Help Books 2024</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Header Actions -->
            <div class="header-actions">
                <div class="action-list">
                    <div class="action-item wishlist">
                        <a href="wishlist.html" class="action-link">
                            <i class="fas fa-heart"></i>
                            <span class="action-label">Wishlist</span>
                            <span class="action-badge">12</span>
                        </a>
                    </div>
                    <div class="action-item cart">
                        <a href="javascript:void(0)" class="action-link cart-toggle">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="action-label">Cart</span>
                            <span class="action-badge">3</span>
                        </a>
                        <div class="cart-dropdown">
                            <div class="cart-header">
                                <h5>Shopping Cart</h5>
                                <button class="btn-close cart-close"></button>
                            </div>
                            <div class="cart-body">
                                <div class="cart-empty">
                                    <i class="fas fa-shopping-cart"></i>
                                    <p>Your cart is empty</p>
                                    <a href="browse.html" class="btn btn-primary">Start Shopping</a>
                                </div>
                                <div class="cart-items">
                                    <!-- Cart items will be loaded here -->
                                </div>
                            </div>
                            <div class="cart-footer">
                                <div class="cart-subtotal">
                                    <span>Subtotal:</span>
                                    <span class="amount">$49.99</span>
                                </div>
                                <div class="cart-buttons">
                                    <a href="cart.html" class="btn btn-outline">View Cart</a>
                                    <a href="checkout.html" class="btn btn-primary">Checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="action-item account">
                        <a href="javascript:void(0)" class="action-link account-toggle">
                            <i class="fas fa-user-circle"></i>
                            <span class="action-label">Account</span>
                        </a>
                        <div class="account-dropdown">
                            <div class="account-header">
                                <div class="user-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="user-info">
                                    <h6>Welcome to ReadTrade</h6>
                                    <p>Sign in to your account</p>
                                </div>
                            </div>
                            <div class="account-links">
                                <a href="my-account.html" class="account-link">
                                    <i class="fas fa-user-circle"></i>
                                    <span>My Account</span>
                                </a>
                                <a href="my-orders.html" class="account-link">
                                    <i class="fas fa-shopping-bag"></i>
                                    <span>My Orders</span>
                                </a>
                                <a href="my-wishlist.html" class="account-link">
                                    <i class="fas fa-heart"></i>
                                    <span>Wishlist</span>
                                </a>
                                <a href="Single-Product-View.html" class="account-link">
                                    <i class="fas fa-heart"></i>
                                    <span>Single-product-View</span>
                                </a>
                                <a href="book-inventory.html" class="account-link">
                                    <i class="fas fa-exchange-alt"></i>
                                    <span>book-inventory</span>
                                </a>
                                <a href="add-book.html" class="account-link">
                                    <i class="fas fa-cog"></i>
                                    <span>add-book</span>
                                </a>
                            </div>
                            <div class="account-footer">
                                <a href="sign-in.html" class="btn btn-primary btn-block">Sign In</a>
                                <p class="text-center mt-2">New customer? <a href="sign-up.html">Join Now</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu Toggle -->
            <div class="mobile-toggle">
                <button class="btn-menu-toggle">
                    <span class="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Mobile Navigation -->
<div class="mobile-navigation">
    <div class="mobile-nav-header">
        <div class="mobile-logo">
            <a href="index.html">
                <i class="fas fa-book-reader"></i>
                <span>ReadTrade</span>
            </a>
        </div>
        <button class="btn-mobile-close">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <!-- Mobile Search -->
    <div class="mobile-search">
        <form class="mobile-search-form">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search books...">
                <button class="btn" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </form>
    </div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <ul class="mobile-menu-list">
            <li class="menu-item">
                <a href="index.html" class="menu-link active">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
            </li>
            <li class="menu-item has-submenu">
                <a href="javascript:void(0)" class="menu-link">
                    <i class="fas fa-book"></i>
                    <span>Browse Books</span>
                    <i class="fas fa-chevron-right"></i>
                </a>
                <ul class="submenu">
                    <li><a href="browse.html?category=fiction"><i class="fas fa-pen-nib"></i> Fiction</a></li>
                    <li><a href="browse.html?category=nonfiction"><i class="fas fa-graduation-cap"></i> Non-Fiction</a></li>
                    <li><a href="browse.html?category=academic"><i class="fas fa-book-open"></i> Academic</a></li>
                    <li><a href="browse.html?category=children"><i class="fas fa-child"></i> Children's</a></li>
                </ul>
            </li>
            <li class="menu-item">
                <a href="trade.html" class="menu-link">
                    <i class="fas fa-exchange-alt"></i>
                    <span>Trade Books</span>
                </a>
            </li>
            <li class="menu-item">
                <a href="sell.html" class="menu-link">
                    <i class="fas fa-tags"></i>
                    <span>Sell Books</span>
                </a>
            </li>
            <li class="menu-item">
                <a href="community.html" class="menu-link">
                    <i class="fas fa-users"></i>
                    <span>Community</span>
                </a>
            </li>
            <li class="menu-item has-submenu">
                <a href="javascript:void(0)" class="menu-link">
                    <i class="fas fa-info-circle"></i>
                    <span>About</span>
                    <i class="fas fa-chevron-right"></i>
                </a>
                <ul class="submenu">
                    <li><a href="about.html"><i class="fas fa-building"></i> About Us</a></li>
                    <li><a href="how-it-works.html"><i class="fas fa-cogs"></i> How It Works</a></li>
                    <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                    <li><a href="faq.html"><i class="fas fa-question-circle"></i> FAQ</a></li>
                </ul>
            </li>
        </ul>
        
        <div class="mobile-menu-footer">
            <div class="user-section">
                <a href="sign-in.html" class="btn btn-primary btn-block">
                    <i class="fas fa-sign-in-alt"></i> Sign In
                </a>
                <p class="text-center mt-2">New to ReadTrade? <a href="sign-up.html">Join Now</a></p>
            </div>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    </div>
</div>



<div class="overlay" id="overlay"></div>


<style>
    /* Header Variables */
    :root {
        --header-bg: #ffffff;
        --header-top-bg: #1a1a2e;
        --primary-color: #5d4fff;
        --primary-hover: #4a3fcc;
        --text-color: #333333;
        --text-light: #666666;
        --border-color: #e6e6e6;
        --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        --transition: all 0.3s ease;
    }

    /* Header Top */
    .axil-header-top {
        background: var(--header-top-bg);
        color: #ffffff;
        padding: 8px 0;
        font-size: 13px;
    }

    .header-top-left {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .header-dropdown .dropdown-toggle {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.9);
        padding: 4px 12px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        transition: var(--transition);
    }

    .header-dropdown .dropdown-toggle:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .header-dropdown .dropdown-menu {
        border: none;
        box-shadow: var(--shadow);
        border-radius: 8px;
        padding: 8px 0;
    }

    .header-dropdown .dropdown-item {
        padding: 8px 16px;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .header-dropdown .dropdown-item.active {
        background: var(--primary-color);
        color: white;
    }

    /* Header Top Right */
    .header-top-right .quick-link {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-end;
        gap: 20px;
    }

    .header-top-right .quick-link li {
        display: inline-block;
    }

    .header-top-right .quick-link a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        transition: var(--transition);
    }

    .header-top-right .quick-link a:hover {
        color: #ffffff;
    }

    .header-top-right .quick-link .divider {
        width: 1px;
        height: 14px;
        background: rgba(255, 255, 255, 0.2);
        margin: 0 10px;
    }

    .sign-in-link {
        color: var(--primary-color) !important;
        font-weight: 500;
    }

    /* Main Menu */
    .axil-mainmenu {
        background: var(--header-bg);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        position: sticky;
        top: 0;
        z-index: 1000;
        transition: var(--transition);
    }

    .axil-mainmenu.sticky {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .header-navbar {
        display: flex;
        align-items: center;
        padding: 16px 0;
        gap: 30px;
    }

    /* Logo */
    .header-brand .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        min-width: 180px;
    }

    .logo-icon {
        font-size: 32px;
        color: var(--primary-color);
    }

    .logo-text {
        display: flex;
        flex-direction: column;
    }

    .brand-name {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-color);
        line-height: 1;
    }

    .brand-tagline {
        font-size: 11px;
        color: var(--text-light);
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-top: 4px;
    }

    /* Search Bar */
    .header-search {
        flex: 1;
        max-width: 600px;
    }

    .search-container {
        position: relative;
    }

    .search-form .input-group {
        background: #f8f9fa;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid transparent;
        transition: var(--transition);
    }

    .search-form .input-group:focus-within {
        border-color: var(--primary-color);
        background: #ffffff;
    }

    .search-category-dropdown {
        position: relative;
    }

    .btn-dropdown {
        background: #ffffff;
        border: none;
        padding: 12px 16px;
        font-weight: 500;
        color: var(--text-color);
        display: flex;
        align-items: center;
        gap: 8px;
        border-right: 1px solid var(--border-color);
    }

    .category-dropdown {
        width: 250px;
        border: none;
        box-shadow: var(--shadow);
        border-radius: 8px;
        padding: 12px 0;
    }

    .category-dropdown .dropdown-header {
        font-size: 12px;
        text-transform: uppercase;
        color: var(--text-light);
        padding: 8px 16px;
    }

    .search-form .form-control {
        border: none;
        background: transparent;
        padding: 12px 16px;
        font-size: 14px;
    }

    .search-form .form-control:focus {
        box-shadow: none;
        background: transparent;
    }

    .btn-search {
        background: var(--primary-color);
        border: none;
        color: white;
        padding: 12px 24px;
        transition: var(--transition);
    }

    .btn-search:hover {
        background: var(--primary-hover);
    }

    /* Search Suggestions */
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: var(--shadow);
        margin-top: 8px;
        padding: 16px;
        display: none;
        z-index: 1000;
    }

    .search-container:focus-within .search-suggestions {
        display: block;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-color);
    }

    .suggestions-header h6 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
    }

    .clear-history {
        font-size: 12px;
        color: var(--text-light);
        text-decoration: none;
    }

    .suggestions-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .suggestion-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        color: var(--text-color);
        text-decoration: none;
        border-radius: 6px;
        transition: var(--transition);
    }

    .suggestion-item:hover {
        background: #f8f9fa;
    }

    .suggestion-item i.fa-fire {
        color: #ff6b6b;
    }

    .suggestion-item i.fa-clock {
        color: var(--text-light);
    }

    /* Header Actions */
    .header-actions {
        margin-left: auto;
    }

    .action-list {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .action-item {
        position: relative;
    }

    .action-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: var(--text-color);
        gap: 4px;
        position: relative;
        padding: 8px;
        border-radius: 8px;
        transition: var(--transition);
    }

    .action-link:hover {
        background: #f8f9fa;
    }

    .action-link i {
        font-size: 20px;
    }

    .action-label {
        font-size: 12px;
        font-weight: 500;
    }

    .action-badge {
        position: absolute;
        top: 0;
        right: 0;
        background: var(--primary-color);
        color: white;
        font-size: 10px;
        min-width: 18px;
        height: 18px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Cart Dropdown */
    .cart-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        width: 320px;
        background: white;
        border-radius: 12px;
        box-shadow: var(--shadow);
        padding: 20px;
        display: none;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    }

    .cart:hover .cart-dropdown {
        display: block;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
    }

    .cart-header h5 {
        margin: 0;
        font-size: 16px;
    }

    .cart-empty {
        text-align: center;
        padding: 40px 20px;
    }

    .cart-empty i {
        font-size: 48px;
        color: #e0e0e0;
        margin-bottom: 16px;
    }

    .cart-empty p {
        color: var(--text-light);
        margin-bottom: 20px;
    }

    /* Account Dropdown */
    .account-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        width: 280px;
        background: white;
        border-radius: 12px;
        box-shadow: var(--shadow);
        padding: 20px;
        display: none;
        z-index: 1000;
    }

    .account:hover .account-dropdown {
        display: block;
    }

    .account-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border-color);
    }

    .user-avatar {
        width: 48px;
        height: 48px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .user-info h6 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
    }

    .user-info p {
        margin: 4px 0 0;
        font-size: 12px;
        color: var(--text-light);
    }

    .account-links {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 20px;
    }

    .account-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        color: var(--text-color);
        text-decoration: none;
        border-radius: 6px;
        transition: var(--transition);
    }

    .account-link:hover {
        background: #f8f9fa;
    }

    .account-link i {
        width: 20px;
        text-align: center;
        color: var(--text-light);
    }

    /* Mobile Toggle */
    .mobile-toggle {
        display: none;
    }

    .btn-menu-toggle {
        background: none;
        border: none;
        padding: 8px;
        cursor: pointer;
    }

    .menu-icon {
        display: block;
        width: 24px;
        height: 20px;
        position: relative;
    }

    .menu-icon span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: var(--text-color);
        border-radius: 2px;
        transition: var(--transition);
    }

    .menu-icon span:nth-child(1) { top: 0; }
    .menu-icon span:nth-child(2) { top: 9px; }
    .menu-icon span:nth-child(3) { top: 18px; }

    /* Mobile Navigation */
    .mobile-navigation {
        position: fixed;
        top: 0;
        left: -320px;
        width: 320px;
        height: 100%;
        background: white;
        z-index: 1100;
        transition: var(--transition);
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
    }

    .mobile-navigation.active {
        left: 0;
    }

    .mobile-nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
    }

    .mobile-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-color);
        text-decoration: none;
    }

    .btn-mobile-close {
        background: none;
        border: none;
        font-size: 20px;
        color: var(--text-color);
        cursor: pointer;
    }

    /* Overlay */
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1099;
        display: none;
    }

    .overlay.active {
        display: block;
    }

    /* Responsive Design */
    @media (max-width: 1199px) {
        .header-search {
            max-width: 450px;
        }
    }

    @media (max-width: 991px) {
        .header-navbar {
            gap: 20px;
        }
        
        .header-search {
            display: none;
        }
        
        .mobile-toggle {
            display: block;
        }
        
        .action-label {
            display: none;
        }
        
        .action-link {
            padding: 8px 12px;
        }
        
        .brand-tagline {
            display: none;
        }
    }

    @media (max-width: 767px) {
        .header-top-left,
        .header-top-right .quick-link li:not(.divider) {
            display: none;
        }
        
        .header-top-right .quick-link .divider,
        .sign-in-link {
            display: block !important;
        }
        
        .header-navbar {
            padding: 12px 0;
        }
    }

    @media (max-width: 575px) {
        .cart-dropdown,
        .account-dropdown {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 16px 16px 0 0;
            max-height: 80vh;
            overflow-y: auto;
        }
    }
</style>`;

        // Initialize header functionality after DOM is added
        setTimeout(() => {
            this.initializeHeader();
        }, 0);
    }

    initializeHeader() {
        // Initialize Bootstrap dropdowns
        this.initializeDropdowns();

        // Initialize search functionality
        this.initializeSearch();

        // Initialize cart functionality
        this.initializeCart();

        // Initialize account dropdown
        this.initializeAccount();

        // Initialize mobile navigation
        this.initializeMobileNav();

        // Initialize sticky header
        this.initializeStickyHeader();

        // Initialize event listeners
        this.initializeEventListeners();
    }

    initializeDropdowns() {
        // Initialize all dropdowns
        const dropdowns = this.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            this.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        });

        // Prevent dropdowns from closing when clicking inside
        this.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    initializeSearch() {
        const searchInput = this.querySelector('#main-search-input');
        const searchForm = this.querySelector('#main-search-form');
        const searchSuggestions = this.querySelector('#search-suggestions');

        // Search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            });
        }

        // Show suggestions on focus
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                searchSuggestions.style.display = 'block';
            });

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    this.updateSearchSuggestions(query);
                }
            });
        }

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchSuggestions.style.display = 'none';
            }
        });
    }

    initializeCart() {
        const cartToggle = this.querySelector('.cart-toggle');
        const cartDropdown = this.querySelector('.cart-dropdown');
        const cartClose = this.querySelector('.cart-close');

        if (cartToggle) {
            cartToggle.addEventListener('click', (e) => {
                e.preventDefault();
                cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
            });
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => {
                cartDropdown.style.display = 'none';
            });
        }

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cart')) {
                cartDropdown.style.display = 'none';
            }
        });
    }

    initializeAccount() {
        const accountToggle = this.querySelector('.account-toggle');
        const accountDropdown = this.querySelector('.account-dropdown');

        if (accountToggle) {
            accountToggle.addEventListener('click', (e) => {
                e.preventDefault();
                accountDropdown.style.display = accountDropdown.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Close account dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.account')) {
                accountDropdown.style.display = 'none';
            }
        });
    }

    initializeMobileNav() {
        const mobileToggle = this.querySelector('.btn-menu-toggle');
        const mobileClose = this.querySelector('.btn-mobile-close');
        const mobileNav = this.querySelector('.mobile-navigation');
        const overlay = this.querySelector('#overlay');
        const submenuToggles = this.querySelectorAll('.has-submenu > .menu-link');

        // Toggle mobile menu
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileNav.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close mobile menu
        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Submenu toggle for mobile
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    const submenu = toggle.nextElementSibling;
                    const icon = toggle.querySelector('.fa-chevron-right');

                    toggle.classList.toggle('active');
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';

                    if (icon) {
                        icon.style.transform = toggle.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
                    }
                }
            });
        });
    }

    initializeStickyHeader() {
        const mainMenu = this.querySelector('.axil-mainmenu');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainMenu.classList.add('sticky');
            } else {
                mainMenu.classList.remove('sticky');
            }
        });
    }

    initializeEventListeners() {
        // Close all dropdowns on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.querySelectorAll('.dropdown-menu, .cart-dropdown, .account-dropdown').forEach(element => {
                    element.style.display = 'none';
                });

                const mobileNav = this.querySelector('.mobile-navigation');
                const overlay = this.querySelector('#overlay');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Update cart count (simulated)
        this.updateCartCount();
    }

    performSearch(query) {
        console.log('Searching for:', query);
        // Here you would normally make an API call
        // For now, just show a notification
        this.showNotification(`Searching for "${query}"...`);
    }

    updateSearchSuggestions(query) {
        // In a real application, you would fetch suggestions from an API
        console.log('Updating suggestions for:', query);
    }

    updateCartCount() {
        // Simulate cart count update
        const cartBadge = this.querySelector('.cart .action-badge');
        if (cartBadge) {
            // This would normally come from your cart system
            cartBadge.textContent = '3';
        }
    }

    showNotification(message) {
        // Create a notification element
        const notification = document.createElement('div');
        notification.className = 'header-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .header-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: var(--shadow);
                z-index: 2000;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Define the custom element
customElements.define("header-content", HeaderContent);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if header exists and initialize
    const header = document.querySelector('header-content');
    if (header && header.initializeHeader) {
        header.initializeHeader();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderContent;
}