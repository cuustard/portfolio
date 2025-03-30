// Function to load a reusable component
function loadComponent(elementId, filePath, callback) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      element.innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error(`Error loading ${filePath}:`, error));
}

// Load reusable components
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navBar", "HTMLcomponents/navBar.html");
  loadComponent("footer", "HTMLcomponents/footer.html");
  loadComponent("content", "HTMLcomponents/contentPages/homePageContent.html");

  // Set page-specific content
  function setPageContent() {
    const contentMap = {
      "index.html": "<h1>Hello, I'm Jake Evans.</h1>",
      "about.html": "HTMLcomponents/contentPages/aboutPageContents.html",
    };
    const currentPage = window.location.pathname.split("/").pop();
    if (typeof contentMap[currentPage] === "string") {
      if (contentMap[currentPage].endsWith(".html")) {
        loadComponent("content", contentMap[currentPage]);
      } else {
        document.getElementById("content").innerHTML = contentMap[currentPage];
      }
    } else {
      document.getElementById("content").innerHTML = "<h1>Page Not Found</h1>";
    }
  }

  setPageContent();

  // Auto-adjust textarea height
  const messageBox = document.getElementById("message");
  if (messageBox) {
    function adjustHeight() {
      messageBox.style.height = "auto";
      messageBox.style.height = `${messageBox.scrollHeight}px`;
    }
    adjustHeight();
    messageBox.addEventListener("input", adjustHeight);
    messageBox.addEventListener("keypress", adjustHeight);
  } else {
    console.error('Element with id "message" not found');
  }
});
