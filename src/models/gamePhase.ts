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
     * An object containing data about a game phase.
     * @param name The phase's name.
     * @param maxDifficulty The phase's maximum difficulty.
     */
    constructor(name: string, maxDifficulty: number) {
        this.name = name;
        this.maxDifficulty = maxDifficulty;
    }
}