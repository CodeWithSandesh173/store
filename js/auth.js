// Check Auth State
auth.onAuthStateChanged((user) => {
    const authLinks = document.getElementById('authLinks');
    const adminLink = document.getElementById('adminLink');

    if (user) {
        // User is signed in
        console.log("User logged in:", user.email);
        if (authLinks) {
            authLinks.innerHTML = `
                <span style="margin-right:10px; font-size:0.9rem;">${user.email}</span>
                <button onclick="logout()" class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;">Logout</button>
            `;
        }

        // Simple admin check (In production this should be claimed based or backend enforced)
        // For this demo, let's assume the owner's email
        if (user.email === "sandesh@admin.com") {
            if (adminLink) adminLink.style.display = "block";
        }

    } else {
        // User is signed out
        console.log("User logged out");
        if (authLinks) {
            authLinks.innerHTML = '<a href="login.html" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem;">Login</a>';
        }
        if (adminLink) adminLink.style.display = "none";
    }
});

function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Sign out error", error);
    });
}
