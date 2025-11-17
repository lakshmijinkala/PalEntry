async function loadCookbook() {
    const res = await fetch("/cookbook");
    const data = await res.json();

    const container = document.getElementById("cookbook");
    container.innerHTML = "";

    if (data.recipes.length === 0) {
        container.innerHTML = "<p>No recipes yet.</p>";
        return;
    }

    data.recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h2>${recipe.title}</h2>
            <strong>Ingredients</strong>
            <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <strong>Steps</strong>
            <ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
        `;

        container.appendChild(card);
    });
}

// Load recipes when the page loads
window.addEventListener("DOMContentLoaded", loadCookbook);