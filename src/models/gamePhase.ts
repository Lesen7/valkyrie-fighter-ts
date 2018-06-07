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
     * An object containing data about a game phase.
     * @param name The phase's name.
     * @param maxDifficulty The phase's maximum difficulty.
     * @param maxScore The score needed to finish this phase. This amount is relative to already obtained score. A negative value will ensure the phase will never advance automatically.
     */
    constructor(name: string, maxDifficulty: number, maxScore: number) {
        this.name = name;
        this.maxDifficulty = maxDifficulty;
        this.maxScore = maxScore;
    }
}