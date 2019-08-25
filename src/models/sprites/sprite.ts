export default abstract class Sprite { 

    protected _context: CanvasRenderingContext2D;
    protected _x:number;
    protected _y:number;
    protected _isUpdated: boolean;
    
    private _isRendered: boolean;
    
    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get isRendered():boolean {
        return this._isRendered;
    }

    abstract get width(): number;
    abstract get height(): number;

    constructor(context:CanvasRenderingContext2D,
                x:number,
                y:number){
        this._context = context;
        this._x = 0;
        this._y = 0;
    }

    public update(x:number, y:number) {
        this._x = x;
        this._y = y;

        this._isUpdated = true;
    }

    public render(): void {
        if(this._isRendered && !this._isUpdated) {
            return;
        }
        else if(this._isRendered && this._isUpdated){
            this.clear();
        }

        this._isRendered = true;
        this._isUpdated = false;

        this._draw();
    }

    public clear():void {  
        this._context.clearRect(this.x, this.y, this.width, this.height);
        this._isRendered = false;
    };

    protected abstract _draw():void;

}