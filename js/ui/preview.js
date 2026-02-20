// js/ui/preview.js
// Handles updating the character preview UI

import { character } from "../state/character.js";

export function updatePreview() {
    document.getElementById("preview-name").textContent = `Name: ${character.name || ""}`;
    document.getElementById("preview-ancestry").textContent = `Ancestry: ${character.ancestry || ""}`;
    document.getElementById("preview-heritage").textContent = `Heritage: ${character.heritage || ""}`;
    document.getElementById("preview-background").textContent = `Background: ${character.background || ""}`;
    document.getElementById("preview-class").textContent = `Class: ${character.class || ""}`;
}

export function updateAbilityScorePreview() {
    const scores = character.abilityScores;

    document.getElementById("str-score").textContent = scores.STR;
    document.getElementById("dex-score").textContent = scores.DEX;
    document.getElementById("con-score").textContent = scores.CON;
    document.getElementById("int-score").textContent = scores.INT;
    document.getElementById("wis-score").textContent = scores.WIS;
    document.getElementById("cha-score").textContent = scores.CHA;
}
