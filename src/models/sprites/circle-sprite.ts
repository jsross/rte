import Sprite from './sprite';

export default class CircleSprite extends Sprite {

    constructor(context:CanvasRenderingContext2D,
                x:number,
                y:number,
                diameter:number){
        super(context, x, y);
        this._width = diameter;
        this._height= diameter;
    }

    _draw(): void {
        this._context.beginPath();
        this._context.arc(this._x, this._y, this._width / 2, 0, 2 * Math.PI);
        this._context.stroke();
    }
}