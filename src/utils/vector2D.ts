export default class Vector2D {
    /**
     * The X component of the vector.
     */
    x: number;
    /**
     * The Y component of the vector.
     */
    y: number;

    /**
     * A simple two-dimensional vector.
     * @param x The X component of the vector.
     * @param y The Y component of the vector.
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the vector's length.
     */
    getLength(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Returns the normalized vector.
     */
    normalize(): Vector2D {
        return new Vector2D(this.x / this.getLength(), this.y / this.getLength());
    }
}