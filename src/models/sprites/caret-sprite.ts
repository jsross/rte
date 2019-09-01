import Sprite from './sprite';

export default class CaretSprite extends Sprite {

    constructor(context:CanvasRenderingContext2D,
                x:number,
                y:number,
                stroke:number,
                height:number){
        super(context, x, y);

        this._width = stroke;
        this._height= height;
    }

    _draw(): void {
        var lineStart_x = this._x + this._width/2;    
        var yEnd = (this._y + this._height);

        this._context.beginPath(); 
        this._context.moveTo(lineStart_x,this._y);
        this._context.lineWidth = this._width;
        this._context.lineTo(lineStart_x, yEnd);
        this._context.stroke();
    }
}