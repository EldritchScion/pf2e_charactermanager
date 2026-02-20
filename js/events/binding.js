// js/events/bindings.js
// Binds form inputs to character state and preview

import { character } from "../state/character.js";
import { updatePreview } from "../ui/preview.js";

export function bindInputToCharacter(inputID, characterKey, onChangeCallback = null) {
    const input = document.getElementById(inputID);
    if (!input) return;

    const update = () => {
        character[characterKey] = input.value || null;
        updatePreview();

        if (onChangeCallback) {
            onChangeCallback(character[characterKey]);
        }
    };

    input.addEventListener("input", update);
    input.addEventListener("change", update);
}

export function setupPreviewInput(onAncestryChange) {
    bindInputToCharacter("name-input", "name");
    bindInputToCharacter("ancestry-select", "ancestry", (value) => {
        if (onAncestryChange) onAncestryChange(value);
    });
    bindInputToCharacter("heritage-select", "heritage");
    bindInputToCharacter("background-select", "background");
    bindInputToCharacter("class-select", "class");
}
