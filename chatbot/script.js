// Function to display messages with icons
function displayMessage(message, messageClass) {
    const chatWindow = document.getElementById("chat-window");
  
    // Create message container
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", messageClass);
  
    // Create a wrapper for the icon and text
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper");
  
    // Create an icon for the message
    const icon = document.createElement("div");
    icon.classList.add("message-icon");
    if (messageClass === "bot-message") {
      icon.innerHTML = '<i class="fas fa-robot"></i>'; // Bot icon
    } else if (messageClass === "user-message") {
      icon.innerHTML = '<i class="fas fa-user"></i>'; // User icon
    }
  
    // Create the message text
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
  
    // Append icon and message to the wrapper
    messageWrapper.appendChild(icon);
    messageWrapper.appendChild(messageElement);
  
    // Append the wrapper to the message container
    messageContainer.appendChild(messageWrapper);
  
    // Append the container to the chat window
    chatWindow.appendChild(messageContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
  }
  
  // Function to handle user input and bot response
  function sendMessage() {
    const message = document.getElementById("user-input").value;
    if (message.trim() === "") return; // Prevent empty messages
  
    displayMessage(message, "user-message"); // Display user message
    document.getElementById("user-input").value = ""; // Clear input
  
    const data = {
      user: message,
    };
  
    // Send data to the backend
    fetch("http://127.0.0.1:5000/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response_bot) {
          displayMessage(data.response_bot, "bot-message");
        } else {
          displayMessage("Error summarizing PDF.", "bot-message");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., display an error message to the user)
      });
  }
  
  // Function to show bot introduction when the page loads
  function showBotIntroduction() {
    const chatWindow = document.getElementById("chat-window");
    if (chatWindow.children.length === 0) {
      displayMessage(
        "Bonjour ! Je suis votre assistant bot. J'aide les étudiants à résumer des documents PDF et à répondre à leurs questions. Comment puis-je vous aider aujourd'hui ?",
        "bot-message"
      );
    }
  }
  
  // Trigger bot introduction on page load
  window.addEventListener("DOMContentLoaded", showBotIntroduction);
  
  // Handle PDF file upload
  document.getElementById("pdf-file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      displayMessage(`PDF uploaded: Processing...`, "user-message");
  
      // Send the file to the backend
      fetch("http://localhost:5000/upload_pdf", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.summary) {
            displayMessage(data.summary, "bot-message");
          } else {
            displayMessage("Error summarizing PDF.", "bot-message");
          }
        })
        .catch((error) => {
          displayMessage(
            "Error uploading PDF: " + error.message,
            "bot-message"
          );
        });
    }
  });

document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage(); 
      event.preventDefault(); 
    }
  });
    