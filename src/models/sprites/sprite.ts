import {Update} from './update';

export default abstract class Sprite { 

    protected _context: CanvasRenderingContext2D = null;
    private _isRendered: boolean = false;
    protected _update: Update = null;
    protected _x: number = 0;
    protected _y: number = 0;
    protected _width: number = 0;
    protected _height: number = 0;

    get isRendered():boolean {
        return this._isRendered;
    }

    protected constructor(context:CanvasRenderingContext2D,
                          x:number,
                          y:number){
        this._context = context;
        this._x = x;
        this._y = y;
    }

    public scheduleUpdate(update: Update) {
        this._update = update;
    }

    public render(): void {
        if(this._isRendered && this._update == null) {
            return;
        }
        else if(this._isRendered && this._update != null){
            this.clear();
        }

        if(this._update != null){
            this._x = this._update.x;
            this._y = this._update.y;
        }
        
        this._draw();
        
        this._isRendered = true;
        this._update = null;
    }

    public clear():void {  
        this._context.clearRect(this._x, this._y, this._width, this._height);
        this._isRendered = false;
    };

    protected abstract _draw():void;

}