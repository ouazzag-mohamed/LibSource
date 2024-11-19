
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotFrame = document.getElementById("chatbot-frame");

chatbotToggle.addEventListener("click", () => {
  if (chatbotFrame.style.display === "none" || chatbotFrame.style.display === "") {
    chatbotFrame.style.display = "block";
  } else {
    chatbotFrame.style.display = "none";
  }
});
