const auth = firebase.auth();
const db = firebase.firestore();

/**
 * Send a message from the logged-in user (owner) to a client.
 * @param {string} text - The message content.
 * @param {string} clientId - The client user ID.
 */
async function sendMessage(text, clientId) {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to send messages.");
    return;
  }
  if (!text || !clientId) {
    alert("Please enter a message and select a client.");
    return;
  }

  const messageData = {
    ownerId: user.uid,          // The dashboard owner (logged-in user)
    clientId: clientId,         // The client receiving the message
    senderId: user.uid,         // The sender (owner)
    receiverId: clientId,       // The receiver (client)
    text: text.trim(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await db.collection('messages').add(messageData);
    console.log("Message sent!");
  } catch (error) {
    console.error("Failed to send message:", error);
    alert("Failed to send message. See console for details.");
  }
}

/**
 * Listen to real-time messages between the logged-in user (owner) and a specific client.
 * @param {string} clientId - The client user ID.
 * @param {function} onUpdate - Callback receiving array of messages on every update.
 * @returns {function} Unsubscribe function for the listener.
 */
function listenToMessages(clientId, onUpdate) {
  const user = auth.currentUser;
  if (!user) {
    console.warn("User not logged in, cannot listen to messages.");
    return () => {};
  }

  return db.collection('messages')
    .where('ownerId', '==', user.uid)
    .where('clientId', '==', clientId)
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      const messages = [];
      snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
      onUpdate(messages);
    }, error => {
      console.error("Error fetching messages:", error);
    });
}
// Cache DOM elements
const clientSelect = document.getElementById('client-select');
const messageList = document.getElementById('message-list');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let unsubscribeMessages = null;

// Load clients for the logged-in owner
async function loadClients() {
  const user = auth.currentUser;
  if (!user) return;

  const clientsSnapshot = await db.collection('clients')
    .where('ownerId', '==', user.uid)
    .get();

  clientsSnapshot.forEach(doc => {
    const client = doc.data();
    const option = document.createElement('option');
    option.value = doc.id; // assuming client doc id is clientId
    option.textContent = client.displayName || client.email || 'Unnamed Client';
    clientSelect.appendChild(option);
  });
}

// Render messages in the UI
function renderMessages(messages) {
  messageList.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message-item');
    // Sent messages (by owner)
    if (msg.senderId === auth.currentUser.uid) {
      div.classList.add('message-sent');
    } else {
      div.classList.add('message-received');
    }
    div.textContent = msg.text;
    messageList.appendChild(div);
  });
  messageList.scrollTop = messageList.scrollHeight;
}

// Listen for messages when a client is selected
clientSelect.addEventListener('change', () => {
  if (unsubscribeMessages) {
    unsubscribeMessages();
  }
  messageList.innerHTML = '';
  const selectedClientId = clientSelect.value;
  if (!selectedClientId) return;

  unsubscribeMessages = listenToMessages(selectedClientId, renderMessages);
});

// Handle message form submit
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  const clientId = clientSelect.value;
  if (!clientId) {
    alert("Please select a client to send a message.");
    return;
  }
  if (!text) {
    alert("Please type a message.");
    return;
  }
  await sendMessage(text, clientId);
  messageInput.value = '';
});

// On auth state changed, load clients
auth.onAuthStateChanged(user => {
  if (user) {
    loadClients();
  } else {
    window.location.href = 'index.html';
  }
});
