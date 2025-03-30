var messageBox = document.getElementById("message");
if (messageBox) {
  function adjustHeight() {
    messageBox.style.height = "auto";
    messageBox.style.height = `${messageBox.scrollHeight}px`;
  }
  adjustHeight(); // Adjust height on load
  messageBox.addEventListener("input", adjustHeight);
  messageBox.addEventListener("keypress", adjustHeight);
} else {
  console.error('Element with id "message" not found');
}
