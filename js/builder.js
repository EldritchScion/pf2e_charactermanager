// Initialize the character builder page with all necessary setup
export function initBuilderPage() {
    // Set up event listeners for character preview synchronization
    setupPreviewInput();
    // Load ancestry options from data file
    loadAncestries();

    // Get the ancestry dropdown element
    const ancestrySelect = document.getElementById("ancestry-select");
    // Only set up listeners if the element exists
    if (ancestrySelect) {
        // Listen for ancestry changes to load heritages
        ancestrySelect.addEventListener("change",  loadHeritages);

        // Listen for ancestry changes to update heritage options and preview
        ancestrySelect.addEventListener("change", () => {
            // Reset the heritage dropdown to default state
            resetHeritageDropdown();
            // Load heritages for the newly selected ancestry
            loadHeritages();
            // Clear the heritage preview text
            resetHeritagePreview();
        });
    }
}

// Set up real-time preview updates as user enters character details
function setupPreviewInput() {
    // Get input elements for character creation form
    const nameInput = document.getElementById("name-input");
    const ancestryInput = document.getElementById("ancestry-select");
    const heritageInput = document.getElementById("heritage-select");

    // Get preview display elements
    const previewName = document.getElementById("preview-name");
    const previewAncestry = document.getElementById("preview-ancestry");
    const previewHeritage = document.getElementById("preview-heritage");

    // Update name preview as user types
    if (nameInput) {
        nameInput.addEventListener("input", () => {
            if (nameInput.value === "") {
                previewName.textContent = "Name:";
            } else {
                previewName.textContent = `Name: ${nameInput.value}`;
            }
        });
    }

    // Update ancestry preview when selection changes
    if (ancestryInput) {
        ancestryInput.addEventListener("change", () => {
            if (ancestryInput.value === "") {
                previewAncestry.textContent = "Ancestry:";
            } else {
                previewAncestry.textContent = `Ancestry: ${ancestryInput.value}`;
            }
        });
    }

    // Update heritage preview when selection changes
    if (heritageInput) {
        heritageInput.addEventListener("change", () => {
            if (heritageInput.value === "") {
                previewHeritage.textContent = "Heritage:";
            } else {
                previewHeritage.textContent = `Heritage: ${heritageInput.value}`;
            }
        });
    }
}

// Load ancestry data from JSON file and populate ancestry dropdown
async function loadAncestries() {
    // Get the ancestry select element
    const ancestrySelect = document.getElementById("ancestry-select");

    try {
        // Fetch ancestries data from external JSON file
        const response = await fetch("data/ancestries.json");
        const ancestries = await response.json();

        // Create and add an option for each ancestry
        Object.keys(ancestries).forEach(ancestry => {
            const option = document.createElement("option");
            option.value = ancestry;
            option.textContent = ancestry;
            ancestrySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading ancestries:", error);
    }
}

// Load heritages based on the selected ancestry and populate heritage dropdown
async function loadHeritages() {
    // Get the ancestry and heritage select elements
    const ancestrySelect = document.getElementById("ancestry-select");
    const heritageSelect = document.getElementById("heritage-select");

    // Get the currently selected ancestry
    const selected = ancestrySelect.value;
    // Exit early if no ancestry is selected
    if (!selected) return;

    try {
        // Fetch ancestries data to get heritages for the selected ancestry
        const response = await fetch("data/ancestries.json");
        const ancestries = await response.json();

        // Clear previous heritage options and add default placeholder
        heritageSelect.innerHTML = '<option value="">Select Heritage</option>';

        // Create and add an option for each heritage of the selected ancestry
        ancestries[selected].heritages.forEach(heritage => {
            const option = document.createElement("option");
            option.value = heritage;
            option.textContent = heritage;
            heritageSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading heritages:", error);
    }
}

// Reset the heritage dropdown to its default empty state
function resetHeritageDropdown() {
    const heritageSelect = document.getElementById("heritage-select");
    heritageSelect.innerHTML = '<option value="">Select Heritage</option>';
}

// Clear the heritage preview text
function resetHeritagePreview() {
    const previewHeritage = document.getElementById("preview-heritage");
    previewHeritage.textContent = "Heritage:";
}