// Grab URL parameters
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const email = params.get("email");
const message = params.get("message");

// Insert into page safely
document.getElementById("displayName").textContent = name || "N/A";
document.getElementById("displayEmail").textContent = email || "N/A";
document.getElementById("displayMessage").textContent = message || "N/A";
