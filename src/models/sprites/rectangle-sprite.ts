import Sprite from './sprite';
import { Update } from './update';

export default class RectangleSprite extends Sprite {
    private _rectWidth: number;
    private _rectHeight: number;

    constructor(context:CanvasRenderingContext2D,
                x: number,
                y: number,
                width:number,
                height:number){
        super(context, x, y);
        this._rectWidth = width;
        this._rectHeight = height;
        this._width = width + 2;
        this._height= height + 2;
    }

    _draw(): void {
        this._context.beginPath();
        this._context.lineWidth = 1;
        this._context.strokeStyle = 'rgba(0,0,0,1)';
        this._context.rect(this._x + 1, this._y + 1, this._rectWidth, this._rectHeight);
        this._context.stroke();
    }

}