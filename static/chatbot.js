const sendBtn = document.getElementById("send-btn");
const userMessage = document.getElementById("user-message");
const chatbotDiv = document.getElementById("chatbot");
const goBtn = document.getElementById("go-to-cookbook");

// Redirect to cookbook page
goBtn.addEventListener("click", () => {
    window.location.href = "/cookbook_page";
});

// Handle sending user message
sendBtn.addEventListener("click", async () => {
    const message = userMessage.value.trim();
    if (!message) return;

    const res = await fetch("/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message})
    });

    const data = await res.json();
    const recipe = data.response;

    displayChatbotRecipe(recipe);
});

// Display recipe with Save button
function displayChatbotRecipe(recipe) {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
        <h2>${recipe.title}</h2>
        <strong>Ingredients</strong>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <strong>Steps</strong>
        <ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
        <button class="save-btn">Save to Cookbook</button>
    `;

    card.querySelector(".save-btn").addEventListener("click", () => saveRecipe(recipe));

    chatbotDiv.appendChild(card);
}

// Save recipe to backend
async function saveRecipe(recipe) {
    const res = await fetch("/add_recipe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({recipe})
    });

    const data = await res.json();
    if (data.status === "saved") alert("Recipe saved to cookbook!");
}
