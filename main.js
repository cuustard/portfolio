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
loadComponent("navBar", "HTMLcomponents/navBar.html", applySavedTheme);
loadComponent("footer", "HTMLcomponents/footer.html");

// Set page-specific content
(function setPageContent() {
  const contentMap = {
    "index.html": "<h1>Hello, I'm Jake Evans.</h1>", // Use double quotes
    "about.html": "<h1>Welcome to the About page!</h1>",
  };
  const currentPage = window.location.pathname.split("/").pop();
  document.getElementById("content").innerHTML =
    contentMap[currentPage] || "<h1>Page Not Found</h1>";
})();

// Apply saved theme on page load
function applySavedTheme() {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  const savedImageSrc = localStorage.getItem("theme-toggle-img") || "moon.svg";
  const themeToggle = document.getElementById("themeToggleImg");
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  if (themeToggle) themeToggle.src = savedImageSrc;
}

// Theme toggle functionality
function toggleTheme() {
  const themeToggle = document.getElementById("themeToggleImg");
  const isMoon = themeToggle.src.includes("moon.svg");
  const newSrc = isMoon ? "sun.svg" : "moon.svg";
  themeToggle.src = newSrc;
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "dark-mode",
    document.body.classList.contains("dark-mode")
  );
  localStorage.setItem("theme-toggle-img", newSrc);
}

// Add event listener to theme toggle button
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggleImg");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});
