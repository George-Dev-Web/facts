// Select elements
const factDisplay = document.getElementById("fact-display");
const fetchFactBtn = document.getElementById("fetch-fact");
const saveFactBtn = document.getElementById("save-fact");
const savedFactsList = document.getElementById("saved-facts");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// API URL (Random Fact API - No Key Required)
const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
const LOCAL_API_URL = "http://localhost:3000/savedFacts"; // json-server URL

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

// Save fact to json-server
async function saveFact() {
  const factText = factDisplay.textContent;

  if (!factText || factText === "Failed to fetch a fact. Try again!") {
    alert("No fact to save!");
    return;
  }

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
      displaySavedFacts(); // Refresh saved facts list
    } else {
      alert("Failed to save fact.");
    }
  } catch (error) {
    console.error("Error saving fact:", error);
  }
}

// Display saved facts from db.json
async function displaySavedFacts() {
  try {
    const response = await fetch(LOCAL_API_URL);
    const data = await response.json();

    savedFactsList.innerHTML = ""; // Clear previous list

    data.forEach((fact) => {
      const li = document.createElement("li");
      li.textContent = fact.text;

      // Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteFact(fact.id); // Delete fact on click

      li.appendChild(deleteBtn);
      savedFactsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading saved facts:", error);
  }
}

// Delete a fact from json-server
async function deleteFact(id) {
  try {
    const response = await fetch(`${LOCAL_API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Fact deleted!");
      displaySavedFacts(); // Refresh the list
    } else {
      alert("Failed to delete fact.");
    }
  } catch (error) {
    console.error("Error deleting fact:", error);
  }
}

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Event listeners
fetchFactBtn.addEventListener("click", getRandomFact);
saveFactBtn.addEventListener("click", saveFact);

// Load data on page load
getRandomFact();
displaySavedFacts();
