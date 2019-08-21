import Sprite from './sprite';

export default class CaretSprite extends Sprite {
    width: number;
    height: number;

    render(): void;
    render(x: number, y: number): void;
    render(x?: any, y?: any) {
        if(x != null || y != null){
            this.clear();
            this._x = x;
            this._y = y;
        }

        var lineStart_x = this._x + this.width/2;    
        var yEnd = (this._y + this.height);

        this._context.beginPath(); 
        this._context.moveTo(lineStart_x,this._y);
        this._context.lineWidth = this.width;
        this._context.lineTo(lineStart_x, yEnd);
        this._context.stroke();
    }

    constructor(context:CanvasRenderingContext2D, x:number, y:number){
        super(context, x, y);
        this.width = 2;
        this.height= 30;
    }
}