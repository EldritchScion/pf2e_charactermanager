import { updateAbilityScorePreview } from "./ui/preview.js";
import { renderAncestryBoosts } from "./ui/boosts.js";
import { setupPreviewInput } from "./events/binding.js";
import { loadAncestries, loadBackgrounds, loadClasses, loadHeritages, getAncestryData } from "./data/loaders.js";
import { resetHeritageDropdown, resetHeritagePreview } from "./ui/heritage.js";


// Initialize the character builder page with all necessary setup
export function initBuilderPage() {
    setupPreviewInput((value) => {
        renderAncestryBoosts(value, getAncestryData());
    });

    loadAncestries();
    loadBackgrounds();
    loadClasses();

    const ancestrySelect = document.getElementById("ancestry-select");
    if (ancestrySelect) {
        ancestrySelect.addEventListener("change", () => {
            resetHeritageDropdown();
            loadHeritages();
            resetHeritagePreview();
        });
    }

    updateAbilityScorePreview();
}
