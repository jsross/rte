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
        
        this._context.beginPath(); 
        this._context.moveTo(this.x,this.y);
        this._context.lineTo(this.x,this.y + this.height);
        this._context.stroke();
    }

    constructor(context:CanvasRenderingContext2D, x:number, y:number){
        super(context, x, y);
        this.width = 10;
        this.height= 30;
    }
}