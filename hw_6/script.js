
// ============================================
// TUTORIAL 6: LOAD REAL DATA
// From static data to async data loading
// ============================================

// Global variable to store loaded restaurant data
let restaurants = [];

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 6: Async data loading ready!');
    
    // Get UI elements
    const loadButton = document.querySelector('#load-data-button');
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    // Get the method buttons (start disabled)
    const displayButton = document.querySelector('#display-button');
    const filterButton = document.querySelector('#filter-button');
    const mapButton = document.querySelector('#map-button');
    const errorButton = document.querySelector('#error-button');
    
    // ============================================
    // MAIN DATA LOADING FUNCTION
    // ============================================
    
    // This is the key new skill - loading data asynchronously
    loadButton.addEventListener('click', async function() {
        
        // Step 1: Show loading state
        // Hint: Change statusDisplay classes and statusMessage text
        // Hint: Disable the load button while loading
        
        // YOUR CODE HERE:
        console.log('Loading data...');
        updateStatus('loading', 'Loading restaurant data...');
        loadButton.disabled = true;
        
        try {
            // Step 2: Use fetch() to load data
            // Hint: const response = await fetch('restaurants.json');
            // Hint: Check if response.ok before continuing
            
            // Step 3: Convert response to JSON
            // Hint: const data = await response.json();
            
            // Step 4: Store data in global variable
            // Hint: restaurants = data;
            
            // YOUR CODE HERE:
            const response = await fetch('restaurants.json');

            if (!response.ok) {
                throw new Error('Failed to fetch restaurant data');
            }
            const data = await response.json();
            restaurants = data;

            // Step 5: Show success state and enable buttons
            // Hint: Update statusDisplay classes and message
            // Hint: Enable all the method buttons
            
            // YOUR CODE HERE:
            console.log(`Loaded ${restaurants.length} restaurants`);
            updateStatus('success', 'Data loaded successfully!');
            loadButton.disabled = false;
            toggleMethodButtons(true);

        } catch (error) {
            // Step 6: Handle errors gracefully
            // Hint: Show error state with user-friendly message
            // Hint: Log the actual error for debugging
            
            // YOUR CODE HERE:
            console.error('Error loading data:', error);
            updateStatus('error', 'Error loading data. Please try again.');
            loadButton.disabled = false;
            toggleMethodButtons(false);

        }
    });
    
    // ============================================
    // ARRAY METHOD FUNCTIONS - Same as Tutorial 5
    // ============================================
    
    // Display all restaurants (same as Tutorial 5, but using loaded data)
    displayButton.addEventListener('click', function() {
        const restaurantList = document.querySelector('#restaurant-list');
        
        // Check if we have data first
        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
            return;
        }
        
        // Step 7: Use the same forEach logic from Tutorial 5
        // Hint: restaurants.forEach(function(restaurant) { })
        
        // YOUR CODE HERE:
        let html = '<ul>';
        restaurants.forEach((restaurant) => {
            html += `<li>${restaurant.name} - ${restaurant.cuisine}</li>`;
        });
        html += '</ul>';
        restaurantList.innerHTML = html;

        console.log('Displayed all restaurants using forEach');
    });

    
    // Filter cheap restaurants (same logic, loaded data)
    filterButton.addEventListener('click', function() {
        const filteredList = document.querySelector('#filtered-list');
        
        if (restaurants.length === 0) {
            filteredList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
            return;
        }
        
        // Step 8: Use the same filter logic from Tutorial 5
        // Hint: const cheapRestaurants = restaurants.filter(function(restaurant) { })
        
        // YOUR CODE HERE:
        const cheapRestaurants = restaurants.filter((restaurant) =>{ return restaurant.priceRange === "$" || restaurant.priceRange === "$$"; })
        if (cheapRestaurants.length > 0) {
            let html = '<ul>';
            cheapRestaurants.forEach((restaurant) => {
                html += `<li>${restaurant.name} - ${restaurant.priceRange}</li>`;
            });
            html += '</ul>';
            filteredList.innerHTML = html;
        } else {
            filteredList.innerHTML = '<p>No cheap restaurants found</p>';
        }
        
        
        console.log(`Found ${cheapRestaurants.length} affordable restaurants using filter`);
        
        
    });
    
    // Show restaurant names (same logic, loaded data)
    mapButton.addEventListener('click', function() {
        const mappedList = document.querySelector('#mapped-list');
        
        if (restaurants.length === 0) {
            mappedList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
            return;
        }
        
        // Step 9: Use the same map logic from Tutorial 5
        // Hint: const names = restaurants.map(function(restaurant) { })
        
        // YOUR CODE HERE:
        const names = restaurants.map((restaurant) =>{ return restaurant.name; })
        let html = '<ul>';
        names.forEach((name) => {
            html += `<li>${name}</li>`;
        });
        html += '</ul>';
        mappedList.innerHTML = html;
        
        console.log('Showed restaurant names using map');        
        
    });
    
    // ============================================
    // ERROR HANDLING DEMO
    // ============================================
    
    // This demonstrates what happens when fetch() fails
    errorButton.addEventListener('click', async function() {
        const errorDisplay = document.querySelector('#error-display');
        
        errorDisplay.innerHTML = '<div class="status-display loading"><p class="status-message">Trying to load from bad URL...</p></div>';
        
        try {
            // This will fail because the URL doesn't exist
            const response = await fetch('nonexistent-file.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            errorDisplay.innerHTML = '<p class="placeholder">This should not appear</p>';
            
        } catch (error) {
            // Step 10: Show user-friendly error message
            // Hint: Create error message div with helpful text
            
            // YOUR CODE HERE:
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('status-display', 'error');
            errorMessage.innerHTML = `<p class="status-message">Failed to load data. Please check your connection or try again later.</p>`;
            errorDisplay.innerHTML = '';
            errorDisplay.appendChild(errorMessage);
            
            console.error('Demonstrated error:', error);
        }
    });
    
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Helper function to enable/disable method buttons
function toggleMethodButtons(enabled) {
    const buttons = [
        document.querySelector('#display-button'),
        document.querySelector('#filter-button'),
        document.querySelector('#map-button')
    ];
    
    buttons.forEach(button => {
        button.disabled = !enabled;
    });
}

// Helper function to update status display
function updateStatus(state, message) {
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    // Remove all state classes
    statusDisplay.classList.remove('loading', 'success', 'error');
    
    // Add new state class
    if (state !== 'ready') {
        statusDisplay.classList.add(state);
    }
    
    statusMessage.textContent = message;
}

// ============================================
// DEBUGGING FUNCTIONS
// ============================================

// Check if data is loaded
function checkDataStatus() {
    console.log('=== Data Status ===');
    console.log('Restaurants loaded:', restaurants.length);
    if (restaurants.length > 0) {
        console.log('First restaurant:', restaurants[0].name);
        console.log('All restaurant names:', restaurants.map(r => r.name));
    }
    console.log('==================');
}

// Manually load data (for testing)
async function manualLoadData() {
    try {
        const response = await fetch('restaurants.json');
        if (!response.ok) throw new Error('Load failed');
        const data = await response.json();
        restaurants = data;
        console.log(`Manually loaded ${restaurants.length} restaurants`);
        toggleMethodButtons(true);
        updateStatus('success', `Successfully loaded ${restaurants.length} restaurants`);
    } catch (error) {
        console.error('Manual load failed:', error);
        updateStatus('error', 'Failed to load data');
    }
}

// Reset everything
function resetTutorial() {
    restaurants = [];
    toggleMethodButtons(false);
    updateStatus('ready', 'Ready to load data');
    
    // Clear all displays
    document.querySelector('#restaurant-list').innerHTML = '<p class="placeholder">Load data first, then click to display all restaurants</p>';
    document.querySelector('#filtered-list').innerHTML = '<p class="placeholder">Load data first, then click to show only affordable restaurants</p>';
    document.querySelector('#mapped-list').innerHTML = '<p class="placeholder">Load data first, then click to show just the restaurant names</p>';
    document.querySelector('#error-display').innerHTML = '<p class="placeholder">Click to see error handling in action</p>';
    
    console.log('Tutorial reset');
}

// Call these functions in the browser console:
// checkDataStatus() - see if data is loaded
// manualLoadData() - load data without clicking button
// resetTutorial() - reset everything for testing