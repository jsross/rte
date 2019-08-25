import Sprite from './sprite';

export default class CircleSprite extends Sprite {
    width: number;
    height: number;

    constructor(context:CanvasRenderingContext2D,
                x:number,
                y:number,
                diameter:number){
        super(context, x, y);
        this.width = diameter;
        this.height= diameter;
    }

    _draw(): void {
        this._context.beginPath();
        this._context.arc(this._x, this._y, this.width / 2, 0, 2 * Math.PI);
        this._context.stroke();
    }
}