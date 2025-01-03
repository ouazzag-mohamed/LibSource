function displayMessage(message, messageClass, isLoading = false) {
    const chatWindow = document.getElementById("chat-window");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", messageClass);
    if (isLoading) {
        messageContainer.id = "loading-message";
    }
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper");
    const icon = document.createElement("div");
    icon.classList.add("message-icon");
    if (messageClass === "bot-message") {
        if (isLoading) {
            icon.innerHTML = '<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
        } else {
            icon.innerHTML = '<i class="fas fa-robot"></i>';
        }
    } else if (messageClass === "user-message") {
        icon.innerHTML = '<i class="fas fa-user"></i>';
    }
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (!isLoading) {
        messageElement.textContent = message;
    }
    messageWrapper.appendChild(icon);
    messageWrapper.appendChild(messageElement);
    messageContainer.appendChild(messageWrapper);
    chatWindow.appendChild(messageContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
  

function sendMessage() {
    const message = document.getElementById("user-input").value;
    if (message.trim() === "") return; 
  
    displayMessage(message, "user-message"); 
    document.getElementById("user-input").value = ""; 
    
    // loading
    displayMessage("", "bot-message", true);
  
    const data = {
      user: message,
    };
  
    // fetch to backend
    fetch("http://127.0.0.1:5000/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove loading 
        const loadingMessage = document.getElementById("loading-message");
        if (loadingMessage) {
            loadingMessage.remove();
        }
        
        if (data.response_bot) {
          displayMessage(data.response_bot, "bot-message");
        } else {
          displayMessage("Error summarizing PDF.", "bot-message");
        }
      })
      .catch((error) => {
        
        const loadingMessage = document.getElementById("loading-message");
        if (loadingMessage) {
            loadingMessage.remove();
        }
        
        console.error("Error:", error);
        displayMessage("Error: Unable to get response from the bot.", "bot-message");
      });
}
  
  
window.addEventListener("DOMContentLoaded", () => {
    showBotIntroduction();
});

// add enter
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// PDF
document.getElementById("pdf-file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      displayMessage(`PDF uploaded: Processing...`, "user-message");
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