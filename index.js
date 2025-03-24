// Select elements
const factDisplay = document.getElementById("fact-display");
const fetchFactBtn = document.getElementById("fetch-fact");
const saveFactBtn = document.getElementById("save-fact");
const savedFactsList = document.getElementById("saved-facts");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// API URL (Random Fact API - No Key Required)
const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

// Fetch a random fact from the API
async function getRandomFact() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    factDisplay.textContent = data.text; // Display the fact
  } catch (error) {
    factDisplay.textContent = "Failed to fetch a fact. Try again!";
    console.error("Error fetching fact:", error);
  }
}

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Event listener for fetching a fact
fetchFactBtn.addEventListener("click", getRandomFact);

// Initial fact load
getRandomFact();
