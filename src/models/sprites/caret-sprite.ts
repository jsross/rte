import Sprite from './sprite';
import { Update } from './update';
import {ColorValue} from '../color-value';
import { OverlayElement } from '../../components/overlay/overlay-element';

export class CaretSprite extends Sprite {
    
    private _stroke:number;
    private _lineHeight:number;

    constructor(context:CanvasRenderingContext2D){
        super(context);
    }

    public render(timestamp: number): void {
        var update = this._updateQueue.pop() as CaretUpdate;

        if(update === undefined) {
            return;
        }

        if(this.isRendered) {
            this.clear();
            this._isRendered = false;
        }

        this._x = update.x;
        this._y = update.y;
        this._stroke = update.stroke;
        this._lineHeight = update.lineHeight;

        var colorValue = new ColorValue(0,0,0,1);

        this._draw(this._x, this._y, this._stroke, this._lineHeight, colorValue);
        this._isRendered = true;
    }

    public clear(): void {
        this._context.clearRect(this._x - this._stroke / 2, this._y, this._stroke, this._lineHeight);
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