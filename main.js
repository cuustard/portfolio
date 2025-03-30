// Function to load a reusable component
function loadComponent(elementId, filePath, callback) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error(`Error loading ${filePath}:`, error));
}

// Load reusable components
loadComponent("navBar", "HTMLcomponents/navBar.html");
loadComponent("footer", "HTMLcomponents/footer.html");
loadComponent("content", "HTMLcomponents/contentPages/homePageContent.html");

// Set page-specific content
(function setPageContent() {
  const contentMap = {
    "index.html": "<h1>Hello, I'm Jake Evans.</h1>",
    "about.html": "HTMLcomponents/contentPages/aboutPageContents.html", // Updated to load external file
  };
  const currentPage = window.location.pathname.split("/").pop();
  if (contentMap[currentPage]?.endsWith(".html")) {
    loadComponent("content", contentMap[currentPage]); // Load external file if specified
  } else {
    document.getElementById("content").innerHTML =
      contentMap[currentPage] || "<h1>Page Not Found</h1>";
  }
})();
