// Import the builder page initialization function
import { initBuilderPage } from "./builder.js";

// Initialize the client-side router by setting up click listeners on navigation buttons
export function initRouter() {
    // Find all buttons with data-route attribute and attach click event listeners
    document .querySelectorAll('[data-route').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get the route value from the button's data-route attribute
            const route = btn.getAttribute('data-route');
            // Navigate to the selected page
            navigateTo(route);
        });
    })

    // Load the landing page as the default starting page
    navigateTo("landing")
}

// Navigate to a specified route by fetching and displaying the corresponding HTML page
export async function navigateTo(route) {
    // Get the main content container where page content will be inserted
    const pageContent = document.getElementById("page-content");

    try {
        // Fetch the HTML file for the requested route from the pages directory
        const response = await fetch(`pages/${route}.html`);
        // Convert the response to text
        const html = await response.text();
        // Insert the fetched HTML into the page content container
        pageContent.innerHTML = html;

        // Special handling for the builder page - initialize its specific functionality
        if (route === "builder") {
            initBuilderPage();
        }
    } catch (error) {
        // Log any errors that occur during page loading
        console.error(`Error loading page ${route}:`, error);
        // Display an error message if the page fails to load
        pageContent.innerHTML = "<p>Error loading page.</p>";
    }
}