import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import Sprite from './models/sprite';
import ResizeObserver from 'resize-observer-polyfill';
import { CaretSprite } from './models/caret-sprite';

@customElement('sprite-overlay')
export default class OverlayElement extends LitElement {
  private _canvas: HTMLCanvasElement;
  private _context:CanvasRenderingContext2D;
  private _isAnimationInProgress:boolean = false;
  private _sprites: Array<Sprite> = [];
  private _resizeObserver:ResizeObserver;

  constructor(){
    super();

    this._resizeObserver = new ResizeObserver(this._handleNotify_resizeObserver.bind(this));    
  }

  static get styles() {
    return [ css`:host { display: block; }`];
  }
  
  public addCaretSprite = function(): CaretSprite{
    var sprite = new CaretSprite(this._context);

    this._sprites.push(sprite);

    return sprite;
};

  public firstUpdated(){
    this._canvas = this.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
    this._context = this._canvas.getContext('2d');

    this._resizeObserver.observe(this._canvas);
  }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }
  
  public removeSprite(sprite:Sprite) {
    var index = this._sprites.indexOf(sprite);

    if(index < 0){
      throw 'Not found';
    }

    this._sprites.splice(index,1);

    sprite.clear();
  }

  public render() {
    return html`<canvas id='canvas'></canvas>`;
  }

  public start() {
    if(this._isAnimationInProgress) {
      return;
    }

    this._isAnimationInProgress = true;
    window.requestAnimationFrame(this._handleAnimationFrame.bind(this));
  }

  public updateNow(){
    var timestamp = Date.now();
    
    this._sprites.forEach((sprite) => sprite.render(timestamp));
  }

  private _handleNotify_resizeObserver(entries:Array<ResizeObserverEntry>, observer:ResizeObserver):void{
    var entry = entries[0];

    this._sprites.forEach((sprite) => {
        if(sprite.isRendered){
          sprite.clear();
        }
    });

    this._canvas.width = entry.contentRect.width;
    this._canvas.height = entry.contentRect.height;  

    this.updateNow()
  }

  private _handleAnimationFrame(timestamp:number) {
    this._sprites.forEach((sprite) => sprite.render(timestamp));

    if(this._isAnimationInProgress) {
      window.requestAnimationFrame(this._handleAnimationFrame.bind(this));
    }
  }
}