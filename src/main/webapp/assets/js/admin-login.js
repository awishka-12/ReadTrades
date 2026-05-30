// Check if already logged in as admin
window.addEventListener("load", async () => {
    try {
        const response = await fetch("api/admin/check-session");
        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                // Already logged in, redirect to dashboard
                window.location.href = "admin.html";
            }
        }
    } catch (e) {
        console.log("Session check failed", e);
    }
});

// Wire up form submit
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("adminLoginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            adminSignIn();
        });
    }

    // Toggle password visibility
    const toggleBtn = document.getElementById("togglePassword");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const passwordInput = document.getElementById("password");
            const icon = toggleBtn.querySelector("i");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                icon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                passwordInput.type = "password";
                icon.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }
});

async function adminSignIn() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
    const btnLoader = document.querySelector(".btn-loader");
    const btnText = loginBtn.querySelector("span");
    const alertMessage = document.getElementById("alertMessage");
    const alertText = document.getElementById("alertText");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic frontend validation
    if (!email) {
        showAlert("Please enter your email address.");
        return;
    }
    if (!password) {
        showAlert("Please enter your password.");
        return;
    }

    // Show loading state
    loginBtn.disabled = true;
    btnLoader.style.display = "inline-block";
    btnText.textContent = "Signing in...";
    alertMessage.style.display = "none";

    const adminObj = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("api/admin/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminObj)
        });

        const data = await response.json();

        if (data.status) {
            Notiflix.Report.success(
                "ReadTrade Admin",
                data.message,
                "Go to Dashboard",
                () => {
                    window.location.href = "admin.html";
                }
            );
        } else {
            showAlert(data.message);
        }
    } catch (e) {
        console.error(e);
        showAlert("Connection error. Please try again.");
    } finally {
        loginBtn.disabled = false;
        btnLoader.style.display = "none";
        btnText.textContent = "Sign In";
    }
}

function showAlert(message) {
    const alertMessage = document.getElementById("alertMessage");
    const alertText = document.getElementById("alertText");
    alertText.textContent = message;
    alertMessage.style.display = "flex";
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        Notiflix.Notify.success("Copied to clipboard!", { position: 'center-top' });
    });
}

function closeTwoFactorModal() {
    document.getElementById("twoFactorModal").style.display = "none";
}

function moveToNext(current, nextId) {
    if (current.value.length === 1) {
        const next = document.getElementById(nextId);
        if (next) next.focus();
    }
}
 