// Function to display messages in the chat window
function displayMessage(message) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Function to handle the collection and display of user details
function sendDetails() {
    const userName = document.getElementById("user-name").value.trim();
    const userCne = document.getElementById("user-cne").value.trim();
    if (!userName || !userCne) {
        displayMessage("Please provide both your name and CNE.");
        return;
    }

    displayMessage(`Hello, ${userName}! Your CNE is: ${userCne}`);
    // Here you can add code to send these details to the server if needed
}

// Add an event listener to handle enter key in input fields
document.getElementById("user-name").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendDetails(); 
        event.preventDefault(); 
    }
});
document.getElementById("user-cne").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendDetails(); 
        event.preventDefault(); 
    }
});

// Introduction message when the page loads
window.addEventListener("DOMContentLoaded", function() {
    displayMessage("Welcome to the University Chatbot! Please enter your name and CNE.");
});
