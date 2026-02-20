// Import the builder page initialization function
import { initBuilderPage } from "./builder.js";

// Initialize the client-side router by setting up click listeners on navigation buttons
export function initRouter() {
    // Find all buttons with data-route attribute and attach click event listeners
    document.querySelectorAll('[data-route]').forEach(btn => {
        document.body.addEventListener("click", (e) => {
            const route = e.target.dataset.route;
            if (route) navigateTo(route);
            });
        })

    // Load the landing page as the default starting page
    navigateTo("landing")
}

// Navigate to a specified route by fetching and displaying the corresponding HTML page
export async function navigateTo(route) {
    // Get the main content container where page content will be inserted
    const pageContent = document.getElementById("page-content");

    // ROUTE MAP
    const routes = {
        landing: { file: "landing.html" },
        builder: { file: "builder.html", init: initBuilderPage },
        load: { file: "load.html" },
        about: { file: "about.html" }
    }

    // CHECK IF ROUTES EXIST
    if (!routes[route]) {
            pageContent.innerHTML = "<p>Page not found.</p>"
            return;
        }

    // LOADING STATE
    pageContent.innerHTML = "<p>Loading...</p>"

    try {
        // FETCH THE PAGE
        const { file, init } = routes[route];
        const response = await fetch(`pages/${file}`);

        // CHECK FOR SERVER 404
        if (!response.ok) {
            pageContent.innerHTML = "<p>Page not found.</p>"
            return;
        }

        // INSERT HTML
        pageContent.innerHTML = await response.text();

        // RUN PAGE-SPECIFC JS
        if (init) init();
        
    } catch (error) {
        // Log any errors that occur during page loading
        console.error(`Error loading page ${route}:`, error);
        // Display an error message if the page fails to load
        pageContent.innerHTML = "<p>Error loading page.</p>";
    }
}