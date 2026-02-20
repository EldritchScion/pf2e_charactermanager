// js/state/character.js
// Central character state and ability score math

export const character = {
    name: "",
    ancestry: null,
    heritage: null,
    background: null,
    class: null,
    abilityScores: {
        STR: 10,
        DEX: 10,
        CON: 10,
        INT: 10,
        WIS: 10,
        CHA: 10
    },
    ancestryBoostChoice: [],
    ancestryFreeBoost: null,
};

export function resetAbilityScores() {
    character.abilityScores = {
        STR: 10,
        DEX: 10,
        CON: 10,
        INT: 10,
        WIS: 10,
        CHA: 10
    };
}

export function applyAbilityBoost(ability, onAfterChange) {
    const current = character.abilityScores[ability];

    if (current >= 18) {
        character.abilityScores[ability] += 1;
    } else {
        character.abilityScores[ability] += 2;
    }

    if (onAfterChange) onAfterChange();
}
