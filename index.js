// Select elements
const fetchFactBtn = document.getElementById("fetch-fact");
const saveFactBtn = document.getElementById("save-fact");
const factDisplay = document.getElementById("fact-display");

// API URLs
const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
const LOCAL_API_URL = "http://localhost:3000/savedFacts"; // json-server URL

// Create loading indicators
const fetchFactLoading = document.createElement("span");
fetchFactLoading.textContent = " ⏳";
fetchFactLoading.style.display = "none"; // Hide initially
fetchFactBtn.appendChild(fetchFactLoading);

const saveFactLoading = document.createElement("span");
saveFactLoading.textContent = " ⏳";
saveFactLoading.style.display = "none"; // Hide initially
saveFactBtn.appendChild(saveFactLoading);

// Fetch a random fact from the API with loading indicator
async function getRandomFact() {
  fetchFactLoading.style.display = "inline"; // Show loading icon

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    factDisplay.textContent = data.text; // Display the fact
  } catch (error) {
    factDisplay.textContent = "Failed to fetch a fact. Try again!";
    console.error("Error fetching fact:", error);
  }

  fetchFactLoading.style.display = "none"; // Hide loading icon
}

// Save fact with loading indicator
async function saveFact() {
  const factText = factDisplay.textContent;

  if (!factText || factText === "Failed to fetch a fact. Try again!") {
    alert("No fact to save!");
    return;
  }

  saveFactLoading.style.display = "inline"; // Show loading icon

  const factData = { text: factText };

  try {
    const response = await fetch(LOCAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(factData),
    });

    if (response.ok) {
      alert("Fact saved successfully!");
    } else {
      alert("Failed to save fact.");
    }
  } catch (error) {
    console.error("Error saving fact:", error);
  }

  saveFactLoading.style.display = "none"; // Hide loading icon
}

// Add event listeners to buttons
fetchFactBtn.addEventListener("click", getRandomFact);
saveFactBtn.addEventListener("click", saveFact);
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
