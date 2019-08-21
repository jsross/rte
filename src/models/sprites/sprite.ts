export default abstract class Sprite { 

    protected _context: CanvasRenderingContext2D;
    protected _x:number;
    protected _y:number;
    
    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    abstract get width(): number;
    abstract get height(): number;

    constructor(context:CanvasRenderingContext2D, x:number, y:number){
        this._x = x;
        this._y = y;
    }

    abstract render():void;
    abstract render(x:number, y:number):void;
    public clear():void {  
        this._context.clearRect(this.x, this.y, this.width, this.height);
    };

}