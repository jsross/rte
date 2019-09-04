export class ColorValue {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toHex() {
        return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }

    toRgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    toRgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}