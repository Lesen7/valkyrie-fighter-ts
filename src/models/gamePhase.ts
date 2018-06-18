import Enemy from "./enemy";

export default class GamePhase {
    /**
     * The phase's name.
     */
    name: string;
    /**
     * The phase's maximum difficulty.
     */
    maxDifficulty: number;
    /**
     * The score needed to finish this phase. This amount is relative to already obtained score. A negative value will ensure the phase will never advance automatically.
     */
    maxScore: number;
    /**
     * The enemies that can spawn in the phase, along with their aspect ratios.
     */
    availableEnemies: string[];

    /**
     * An object containing data about a game phase.
     * @param name The phase's name.
     * @param maxDifficulty The phase's maximum difficulty.
     * @param maxScore The score needed to finish this phase. This amount is relative to already obtained score. A negative value will ensure the phase will never advance automatically.
     */
    constructor(name: string, maxDifficulty: number, maxScore: number) {
        this.availableEnemies = [];
        this.name = name;
        this.maxDifficulty = maxDifficulty;
        this.maxScore = maxScore;
    }

    /**
     * Sets which enemies can spawn in this phase. Their proportional amount in the array will determine how likely each of them are to spawn.
     * @param enemies The enemies that will be added to this phase.
     */
    setEnemies(enemies: string[]) {
        this.availableEnemies = enemies;
    }
}