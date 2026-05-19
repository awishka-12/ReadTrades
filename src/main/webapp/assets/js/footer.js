class FooterContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<!-- Start Footer Top Area  -->
<div class="footer-top separator-top">
    <div class="container">
        <div class="row">
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Support</h5>
                    <div class="inner">
                        <p>Need help? Our support team is here to assist you with any questions about ReadTrade.</p>
                        <ul class="support-list-item">
                            <li><a href="mailto:support@readtrade.com"><i class="fas fa-envelope-open me-2"></i> support@readtrade.com</a></li>
                            <li><a href="tel:+11234567890"><i class="fas fa-phone-alt me-2"></i> +1 (123) 456-7890</a></li>
                            <li><a href="help.html"><i class="fas fa-question-circle me-2"></i> Help Center</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Account</h5>
                    <div class="inner">
                        <ul>
                            <li><a href="../../my-account.html"><i class="fas fa-user-circle me-2"></i> My Account</a></li>
                            <li><a href="sign-in.html"><i class="fas fa-sign-in-alt me-2"></i> Login / Register</a></li>
                            <li><a href="cart.html"><i class="fas fa-shopping-cart me-2"></i> Cart</a></li>
                            <li><a href="wishlist.html"><i class="fas fa-heart me-2"></i> Wishlist</a></li>
                            <li><a href="my-books.html"><i class="fas fa-book me-2"></i> My Books</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Quick Link</h5>
                    <div class="inner">
                        <ul>
                            <li><a href="privacy-policy.html"><i class="fas fa-shield-alt me-2"></i> Privacy Policy</a></li>
                            <li><a href="terms.html"><i class="fas fa-file-contract me-2"></i> Terms Of Use</a></li>
                            <li><a href="faq.html"><i class="fas fa-question me-2"></i> FAQ</a></li>
                            <li><a href="contact.html"><i class="fas fa-envelope me-2"></i> Contact</a></li>
                            <li><a href="about.html"><i class="fas fa-info-circle me-2"></i> About Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Download App</h5>
                    <div class="inner">
                        <p>Get the ReadTrade app for a better trading experience on your mobile device.</p>
                        <div class="download-btn-group">
                            <div class="app-link">
                                <a href="#" class="app-store-btn">
                                    <div class="app-icon">
                                        <i class="fab fa-apple"></i>
                                    </div>
                                    <div class="app-text">
                                        <span>Download on the</span>
                                        <strong>App Store</strong>
                                    </div>
                                </a>
                                <a href="#" class="play-store-btn">
                                    <div class="app-icon">
                                        <i class="fab fa-google-play"></i>
                                    </div>
                                    <div class="app-text">
                                        <span>Get it on</span>
                                        <strong>Google Play</strong>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
        </div>
    </div>
</div>
<!-- End Footer Top Area  -->

<!-- Start Copyright Area  -->
<div class="copyright-area copyright-default separator-top">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-xl-4">
                <div class="social-share">
                    <a href="#" class="social-facebook" title="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="social-instagram" title="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="social-twitter" title="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-linkedin" title="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="social-pinterest" title="Pinterest">
                        <i class="fab fa-pinterest"></i>
                    </a>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="copyright-left d-flex flex-wrap justify-content-center">
                    <ul class="quick-link">
                        <li>©2024. All rights reserved by <a href="index.html" class="readtrade-link">ReadTrade</a>.</li>
                    </ul>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="copyright-right d-flex flex-wrap justify-content-xl-end justify-content-center align-items-center">
                    <span class="card-text me-3">We Accept:</span>
                    <ul class="payment-icons-bottom quick-link">
                        <li><i class="fab fa-cc-visa" title="Visa"></i></li>
                        <li><i class="fab fa-cc-mastercard" title="Mastercard"></i></li>
                        <li><i class="fab fa-cc-amex" title="American Express"></i></li>
                        <li><i class="fab fa-cc-paypal" title="PayPal"></i></li>
                        <li><i class="fab fa-cc-apple-pay" title="Apple Pay"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Copyright Area  -->`;

        // Add CSS for footer app buttons
        const style = document.createElement('style');
        style.textContent = `
            .app-store-btn, .play-store-btn {
                display: flex;
                align-items: center;
                background: #333;
                color: white;
                text-decoration: none;
                padding: 10px 15px;
                border-radius: 8px;
                margin-bottom: 10px;
                transition: all 0.3s ease;
            }
            .app-store-btn:hover, .play-store-btn:hover {
                background: #555;
                transform: translateY(-2px);
            }
            .app-icon {
                font-size: 1.5rem;
                margin-right: 10px;
            }
            .app-text {
                display: flex;
                flex-direction: column;
            }
            .app-text span {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            .app-text strong {
                font-size: 1rem;
            }
            .app-store-btn { background: #000; }
            .play-store-btn { background: #4285F4; }
            .payment-icons-bottom {
                display: flex;
                gap: 15px;
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .payment-icons-bottom li i {
                font-size: 1.8rem;
                color: rgba(255, 255, 255, 0.7);
                transition: all 0.3s ease;
            }
            .payment-icons-bottom li i:hover {
                color: white;
                transform: translateY(-2px);
            }
            .readtrade-link {
                color: var(--secondary);
                text-decoration: none;
                font-weight: 600;
            }
            .readtrade-link:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }
}

customElements.define("footer-content", FooterContent);