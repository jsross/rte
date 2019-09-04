import {Update} from './update';
import { Queue } from '../../../models/queue';

export default abstract class Sprite { 

    protected _context: CanvasRenderingContext2D = null;
    protected _isRendered: boolean = false;
    protected _updateQueue: Queue<Update> = new Queue<Update>();
    protected _x: number = 0;
    protected _y: number = 0;

    get isRendered():boolean {
        return this._isRendered;
    }

    protected constructor(context:CanvasRenderingContext2D){
        this._context = context;
    }

    public scheduleUpdate(update: Update) {
        this._updateQueue.push(update);
    }

    public abstract render(timestamp:number):void;

    public abstract clear():void;
}