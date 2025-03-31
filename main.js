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
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  const project = urlParams.get("project");

  if (page) {
    const pageMap = {
      about: "HTMLcomponents/aboutPageContents.html",
    };

    if (pageMap[page]) {
      document.title = "About Me - Jake Evans"; // Set title for 'about' page
      loadComponent("content", pageMap[page]);
    } else {
      document.title = "Page Not Found - Jake Evans";
      document.getElementById("content").innerHTML = "<h1>Page Not Found</h1>";
    }
  } else if (project) {
    document.title = `Project: ${project} - Jake Evans`; // Set title for projects
    loadComponent("content", `HTMLcomponents/${project}.html`);
  } else {
    document.title = "Home - Jake Evans"; // Default title for home page
    loadComponent("content", "HTMLcomponents/homePageContent.html");
  }
});
