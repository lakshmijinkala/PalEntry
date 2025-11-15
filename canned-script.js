// All available suggestions
const allSuggestions = [
    "What can I cook in under 10 minutes?",
    "What recipes use my soon-to-expire items?",
    "What's a healthy meal with pasta?",
    "What is a high protein meal I can make?",
    "When do my bananas ripen?",
    "What kind of salad can I make?",
    "What can I make with chicken?",
    "What's a quick breakfast idea?",
    "What desserts use eggs?",
    "What vegetarian dinner options do I have?",
    "What can I meal prep for the week?",
    "What recipes use leftover rice?"
];

// DOM elements
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');

// Initialize suggestions
function renderSuggestions(filter = '') {
    suggestionsContainer.innerHTML = '';
    
    const filtered = filter.trim() === '' 
        ? allSuggestions 
        : allSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(filter.toLowerCase())
          );
    
    if (filtered.length === 0) {
        suggestionsContainer.innerHTML = '<div class="suggestion-item">No matching suggestions found</div>';
        return;
    }
    
    filtered.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = suggestion;
        div.addEventListener('click', () => handleSuggestionClick(suggestion));
        suggestionsContainer.appendChild(div);
    });
}

// Handle suggestion click
function handleSuggestionClick(suggestion) {
    searchInput.value = suggestion;
    // You can add navigation or search logic here
    console.log('Selected:', suggestion);
    // Example: window.location.href = 'results.html?q=' + encodeURIComponent(suggestion);
}

// Search input listener
searchInput.addEventListener('input', (e) => {
    renderSuggestions(e.target.value);
});

// Search button
document.querySelector('.search-btn').addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        console.log('Searching for:', query);
        // Add your search logic here
        // Example: window.location.href = 'results.html?q=' + encodeURIComponent(query);
    }
});

// Enter key to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Add your search logic here
        }
    }
});

// Menu button
document.getElementById('menuBtn').addEventListener('click', () => {
    console.log('Menu clicked');
    // Add menu logic here
    // Example: window.location.href = 'menu.html';
});

// Notification button
document.getElementById('notifBtn').addEventListener('click', () => {
    console.log('Notifications clicked');
    // Add notification logic here
    // Example: window.location.href = 'notifications.html';
});

// Initialize on load
renderSuggestions();