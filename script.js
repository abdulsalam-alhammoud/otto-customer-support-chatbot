// wenn das web seite an ist sendt das nachricht
window.onload = () => {
    setTimeout(() => {
        const welcomeMessage = "Hallo und herzlich willkommen! Ich kann dir bei verschiedenen Themen helfen, wie zum Beispiel: Kundenkonto, Bestellungen und Zahlungen. Was möchtest du wissen?";
        displayMessage(welcomeMessage, 'bot');
    }, 500);  // spätung das 0,5 
};

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        // aus druck user message
        displayMessage(message, 'user');
        userInput.value = ''; // löcht das sendung platz

        // sendung zum bot
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // spätung message vor ausdruck
        setTimeout(() => {
            // ausdruck das bot massge nach spätung
            displayMessage(data.reply, 'bot');
        }, 1500);  // spätung 1.5 sek
    }
}

// ausdruck das message in user platz
function displayMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
//sendung mit Enter، 
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage(); 
    }
});

//sendung mit send
document.querySelector('button').addEventListener('click', sendMessage);
