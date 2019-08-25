import Sprite from './sprite';

export default class CaretSprite extends Sprite {
    width: number;
    height: number;

    constructor(context:CanvasRenderingContext2D,
                x:number,
                y:number,
                stroke:number,
                height:number){
        super(context, x, y);

        this.width = stroke;
        this.height= height;
    }

    _draw(): void {
        var lineStart_x = this._x + this.width/2;    
        var yEnd = (this._y + this.height);

        this._context.beginPath(); 
        this._context.moveTo(lineStart_x,this._y);
        this._context.lineWidth = this.width;
        this._context.lineTo(lineStart_x, yEnd);
        this._context.stroke();
    }
}