// js/data/loaders.js
// Handles loading ancestry, background, class, and heritage data

let ancestryData = null;

export function getAncestryData() {
    return ancestryData;
}

export async function loadAncestries() {
    const ancestrySelect = document.getElementById("ancestry-select");

    try {
        if (!ancestryData) {
            const response = await fetch("data/ancestries.json");
            ancestryData = await response.json();
        }

        Object.keys(ancestryData).forEach(ancestry => {
            const option = document.createElement("option");
            option.value = ancestry;
            option.textContent = ancestry;
            ancestrySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading ancestries:", error);
    }
}

export async function loadHeritages() {
    const ancestrySelect = document.getElementById("ancestry-select");
    const heritageSelect = document.getElementById("heritage-select");

    const selected = ancestrySelect.value;
    if (!selected) return;

    try {
        if (!ancestryData) {
            const response = await fetch("data/ancestries.json");
            ancestryData = await response.json();
        }

        heritageSelect.innerHTML = '<option value="">Select Heritage</option>';
        heritageSelect.disabled = false;

        ancestryData[selected].heritages.forEach(heritage => {
            const option = document.createElement("option");
            option.value = heritage;
            option.textContent = heritage;
            heritageSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading heritages:", error);
    }
}

export async function loadBackgrounds() {
    const backgroundSelect = document.getElementById("background-select");

    try {
        const response = await fetch("data/backgrounds.json");
        const backgrounds = await response.json();

        Object.keys(backgrounds).forEach(background => {
            const option = document.createElement("option");
            option.value = background;
            option.textContent = background;
            backgroundSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading backgrounds:", error);
    }
}

export async function loadClasses() {
    const classSelect = document.getElementById("class-select");

    try {
        const response = await fetch("data/classes.json");
        const classes = await response.json();

        Object.keys(classes).forEach(cls => {
            const option = document.createElement("option");
            option.value = cls;
            option.textContent = cls;
            classSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading classes:", error);
    }
}
