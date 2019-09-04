import Sprite from './sprite';
import { Update } from './update';
import {ColorValue} from '../color-value';
import { OverlayElement } from '../../components/overlay/overlay-element';

export class CaretSprite extends Sprite {
    
    private _stroke:number;
    private _lineHeight:number;
    private _blinkOffset:number = 0;
    private _blinkFrequency:number = 500;
    private _isOn:boolean = false;

    private _colorValue: ColorValue = new ColorValue(0,0,0,1);

    constructor(context:CanvasRenderingContext2D){
        super(context);
    }

    public render(timestamp: number): void {
        var update = this._updateQueue.pop() as CaretUpdate;

        if(update && this.isRendered) {
            this.clear();
            this._isOn = false;
            this._isRendered = false;
        }

        if(update) {
            this._x = update.x;
            this._y = update.y;
            this._stroke = update.stroke;
            this._lineHeight = update.lineHeight;
            this._blinkOffset = timestamp - update.timeStamp;
        }

        var shouldBeOn = Math.floor((timestamp - this._blinkOffset)/ this._blinkFrequency) % 2 === 0;

        if(!this._isOn && shouldBeOn){
            this._draw(this._x, this._y, this._stroke, this._lineHeight, this._colorValue);
            this._isOn = true;
        }
        else if(this._isOn && !shouldBeOn) {
            this.clear();
            this._isOn = false;
        }
        
        this._isRendered = true;
    }

    public clear(): void {
        this._context.clearRect(this._x - this._stroke, this._y, this._stroke * 2, this._lineHeight);
    }

    private _draw(x:number, y:number, stroke: number, lineHeight: number, color:ColorValue): void {
        this._context.beginPath(); 
        this._context.moveTo(x, y);
        this._context.lineWidth = stroke;
        this._context.strokeStyle = color.toRgba();
        this._context.lineTo(x, y + lineHeight);
        this._context.stroke();
    }
}

export class CaretUpdate implements Update {
    x: number;
    y: number;
    timeStamp:number;
    lineHeight: number;
    stroke: number;
}

declare module '../../components/overlay/overlay-element' {
    interface OverlayElement {
        addCaretSprite():CaretSprite;
    }
}

OverlayElement.prototype.addCaretSprite = function(): CaretSprite{
    var sprite = new CaretSprite(this._context);

    this._sprites.push(sprite);

    return sprite;
};