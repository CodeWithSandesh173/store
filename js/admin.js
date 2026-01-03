// Admin Logic

auth.onAuthStateChanged((user) => {
    if (user) {
        // In a real app, check custom claims or database roles here.
        // For now, we trust the login.
        loadOrders();
    } else {
        window.location.href = "login.html";
    }
});

function logoutAdmin() {
    auth.signOut();
}

function loadOrders() {
    const ordersRef = db.ref('orders');

    ordersRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const table = document.getElementById('ordersTable');
        const tbody = document.getElementById('ordersBody');
        const loading = document.getElementById('loadingMsg');

        tbody.innerHTML = ''; // Clear current

        if (!data) {
            loading.textContent = "No orders found.";
            table.style.display = 'none';
            return;
        }

        loading.style.display = 'none';
        table.style.display = 'table';

        // Convert object to array and reverse (newest first)
        const orders = Object.entries(data).map(([key, val]) => ({ key, ...val })).reverse();

        orders.forEach(order => {
            const tr = document.createElement('tr');

            const date = new Date(order.timestamp).toLocaleString();
            const statusClass = order.status === 'completed' ? 'status-completed' : 'status-pending';

            const proofHtml = order.screenshotUrl && order.screenshotUrl.startsWith('http')
                ? `<a href="${order.screenshotUrl}" target="_blank" style="color:var(--primary); text-decoration:underline;">View Image</a>`
                : (order.screenshotUrl || 'No Proof');

            const authDetails = order.targetPassword
                ? `<span style="color: #ff4d4d; font-family: monospace;">${order.targetPassword}</span>`
                : '<span style="color: var(--text-muted);">-</span>';

            tr.innerHTML = `
                <td style="font-size: 0.8rem; color: var(--text-muted);">${date}</td>
                <td>
                    <div style="font-weight: bold;">${order.productName || 'Unknown'}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${order.package}</div>
                </td>
                <td style="font-weight: bold;">Rs. ${order.price}</td>
                <td style="font-family: monospace; color: var(--accent);">${order.targetId}</td>
                <td>${authDetails}</td>
                <td style="font-family: monospace;">${order.txnId}</td>
                <td>${order.contactEmail}</td>
                <td style="font-size: 0.9rem;">${proofHtml}</td>
                <td class="${statusClass}" style="text-transform: uppercase; font-weight: bold; font-size: 0.8rem;">${order.status}</td>
                <td>
                    ${order.status !== 'completed' ? `<button class="action-btn" onclick="markCompleted('${order.key}')">Mark Done</button>` : '✅'}
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function markCompleted(orderKey) {
    if (confirm("Mark this order as completed?")) {
        db.ref('orders/' + orderKey).update({ status: 'completed' })
            .catch(err => alert(err.message));
    }
}
