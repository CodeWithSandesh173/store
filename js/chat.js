// chat.js
// Handles both Client Widget and Admin Panel Logic

const chatWidget = document.getElementById('chatWidget');
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

// === CLIENT SIDE LOGIC ===
function toggleChat() {
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
        chatWidget.textContent = "💬";
    } else {
        chatWindow.style.display = 'flex';
        chatWidget.textContent = "❌";
        scrollToBottom();
    }
}

function initClientChat() {
    if (!auth.currentUser) return; // Wait for auth
    const user = auth.currentUser;
    const chatRef = db.ref(`chats/${user.uid}/messages`);

    // Listen for new messages
    chatRef.on('child_added', (snapshot) => {
        const msg = snapshot.val();
        appendMessage(msg.text, msg.sender === 'user' ? 'msg-user' : 'msg-admin');
        scrollToBottom();
    });
}

function sendClientMessage() {
    const text = chatInput.value.trim();
    if (!text || !auth.currentUser) return;

    const user = auth.currentUser;

    // Push message
    db.ref(`chats/${user.uid}/messages`).push({
        sender: 'user',
        text: text,
        timestamp: Date.now()
    });

    // Update metadata for Admin List
    db.ref(`chats/${user.uid}`).update({
        userEmail: user.email,
        lastMessage: text,
        lastActive: Date.now()
    });

    chatInput.value = '';
}


function appendMessage(text, className) {
    const div = document.createElement('div');
    div.classList.add('chat-msg', className);
    div.textContent = text;
    chatBody.appendChild(div);
}

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// === ADMIN SIDE LOGIC ===
let currentChatUid = null;

function initAdminChat() {
    const listContainer = document.getElementById('chatList');
    const adminChatBody = document.getElementById('adminChatBody');

    // Listen to all chats
    db.ref('chats').on('value', (snapshot) => {
        const chats = snapshot.val();
        listContainer.innerHTML = '';

        if (!chats) return;

        Object.entries(chats).forEach(([uid, data]) => {
            const div = document.createElement('div');
            div.className = 'chat-list-item';
            div.innerHTML = `
                <div style="font-weight:bold; font-size:0.9rem;">${data.userEmail || 'User'}</div>
                <div style="font-size:0.8rem; color:#aaa; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${data.lastMessage}</div>
            `;
            div.onclick = () => loadAdminChat(uid, data.userEmail);
            if (uid === currentChatUid) div.classList.add('active');
            listContainer.appendChild(div);
        });
    });
}

function loadAdminChat(uid, email) {
    currentChatUid = uid;
    document.getElementById('currentChatUser').textContent = email;
    const adminChatBody = document.getElementById('adminChatBody');
    adminChatBody.innerHTML = ''; // Clear

    // Listen to specific chat
    db.ref(`chats/${uid}/messages`).off(); // Detach old listeners if any (simple implementation)
    db.ref(`chats/${uid}/messages`).on('child_added', (snapshot) => {
        const msg = snapshot.val();
        // In admin view: 'user' is received (left), 'admin' is sent (right)
        const className = msg.sender === 'admin' ? 'msg-user' : 'msg-admin'; // 'msg-user' styling is 'right' aligned (blue), which is what we want for us (admin)

        const div = document.createElement('div');
        div.classList.add('chat-msg', className);
        div.textContent = msg.text;
        adminChatBody.appendChild(div);
        adminChatBody.scrollTop = adminChatBody.scrollHeight;
    });
}

function sendAdminMessage() {
    const input = document.getElementById('adminChatInput');
    const text = input.value.trim();
    if (!text || !currentChatUid) return;

    db.ref(`chats/${currentChatUid}/messages`).push({
        sender: 'admin',
        text: text,
        timestamp: Date.now()
    });

    input.value = '';
}
