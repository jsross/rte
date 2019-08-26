import Sprite from './sprite';

export default class RectangleSprite extends Sprite {
    width: number;
    height: number;

    constructor(context:CanvasRenderingContext2D,
                x:number,
                y:number,
                width:number,
                height:number){
        super(context, x, y);
        this.width = width;
        this.height= height;
    }

    update(x:number,y:number,width:number,height:number): void{
        this.width = width;
        this.height = height;
        super.update(x,y);
    }

    _draw(): void {
        this._context.beginPath();
        this._context.rect(this._x, this._y, this.width, this.height);
        this._context.stroke();
    }
}