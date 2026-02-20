// js/ui/heritage.js
// Small helpers for heritage UI

export function resetHeritageDropdown() {
    const heritageSelect = document.getElementById("heritage-select");
    heritageSelect.innerHTML = '<option value="">Select Heritage</option>';
    heritageSelect.disabled = true;
}

export function resetHeritagePreview() {
    const previewHeritage = document.getElementById("preview-heritage");
    previewHeritage.textContent = "Heritage:";
}
