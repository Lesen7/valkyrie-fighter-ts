export default class GamePhase {
    // Properties
    name: string;
    maxDifficulty: number;

    // Methods
    constructor(name: string, maxDifficulty: number) {
        this.name = name;
        this.maxDifficulty = maxDifficulty;
    }
}