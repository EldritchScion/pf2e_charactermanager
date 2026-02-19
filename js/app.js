// Import the router initialization function from router module
import { initRouter } from "./router.js";

// Wait for DOM to be fully loaded before initializing the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the client-side router to handle navigation between pages
  initRouter();
});