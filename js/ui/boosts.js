// js/ui/boosts.js
// Handles rendering ability boost selection UI

import { character, resetAbilityScores, applyAbilityBoost } from "../state/character.js";
import { updateAbilityScorePreview } from "./preview.js";

export const abilityMap = {
    "Strength": "STR",
    "Dexterity": "DEX",
    "Constitution": "CON",
    "Intelligence": "INT",
    "Wisdom": "WIS",
    "Charisma": "CHA"
};

export function renderBoostGroup({
    containerId,
    title,
    options,
    maxSelections = 1,
    selected = [],
    disabled = [],
    onChange
}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const group = document.createElement("div");
    group.classList.add("boost-group");

    const heading = document.createElement("div");
    heading.classList.add("boost-group-title");
    heading.textContent = title;
    group.appendChild(heading);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("boost-options");

    const currentSelection = new Set(selected);

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = option;
        btn.classList.add("boost-option");

        const isDisabled = disabled.includes(option);
        const isSelected = currentSelection.has(option);

        if (isSelected) btn.classList.add("selected");
        if (isDisabled) btn.classList.add("disabled");

        btn.addEventListener("click", () => {
            if (isDisabled) return;

            if (currentSelection.has(option)) {
                currentSelection.delete(option);
            } else {
                if (currentSelection.size >= maxSelections) return;
                currentSelection.add(option);
            }

            onChange(Array.from(currentSelection));
        });

        optionsWrapper.appendChild(btn);
    });

    group.appendChild(optionsWrapper);
    container.appendChild(group);
}

export function renderAncestryBoosts(ancestryKey, ancestryData) {
    const ancestry = ancestryData?.[ancestryKey];
    if (!ancestry || !ancestry.ability_boosts) {
        document.getElementById("ancestry-choice-boost").innerHTML = "";
        document.getElementById("ancestry-free-boost").innerHTML = "";
        return;
    }

    const boosts = ancestry.ability_boosts;

    const choiceOptions = boosts
        .filter(b => b !== "Free")
        .map(b => abilityMap[b]);
    const hasFree = boosts.includes("Free");

    const selectedChoice = character.ancestryBoostChoice || [];

    // 1) Choice group
    if (choiceOptions.length > 0) {
        renderBoostGroup({
            containerId: "ancestry-choice-boost",
            title: "Ancestry Ability Boost",
            options: choiceOptions,
            maxSelections: 1,
            selected: selectedChoice,
            disabled: [],
            onChange: (newSelection) => {
                resetAbilityScores();

                character.ancestryBoostChoice = newSelection;
                character.ancestryFreeBoost = null;

                if (newSelection.length === 1) {
                    applyAbilityBoost(newSelection[0], updateAbilityScorePreview);
                }

                renderAncestryBoosts(ancestryKey, ancestryData);
            }
        });
    } else {
        document.getElementById("ancestry-choice-boost").innerHTML = "";
    }

    // 2) Free boost
    if (hasFree && selectedChoice.length === 1) {
        const chosenAbbrev = selectedChoice[0];
        const allAbilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

        renderBoostGroup({
            containerId: "ancestry-free-boost",
            title: "Ancestry Free Boost",
            options: allAbilities,
            maxSelections: 1,
            selected: character.ancestryFreeBoost ? [character.ancestryFreeBoost] : [],
            disabled: [chosenAbbrev],
            onChange: (newSelection) => {
                resetAbilityScores();

                character.ancestryFreeBoost = newSelection[0] || null;

                if (character.ancestryBoostChoice?.length === 1) {
                    applyAbilityBoost(character.ancestryBoostChoice[0], updateAbilityScorePreview);
                }

                if (newSelection.length === 1) {
                    applyAbilityBoost(newSelection[0], updateAbilityScorePreview);
                }

                renderAncestryBoosts(ancestryKey, ancestryData);
            }
        });
    } else {
        document.getElementById("ancestry-free-boost").innerHTML = "";
    }
}
