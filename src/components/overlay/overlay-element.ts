import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import Sprite from '../../models/sprites/sprite';
import ResizeObserver from 'resize-observer-polyfill';

@customElement('sprite-overlay')
export class OverlayElement extends LitElement {
  private _canvas: HTMLCanvasElement;
  private _context:CanvasRenderingContext2D;
  private _isAnimationInProgress:boolean = false;
  private _sprites: Array<Sprite> = [];
  private _resizeObserver:ResizeObserver;

  constructor(){
    super();
    this._resizeObserver = new ResizeObserver(this._handleNotify_resizeObserver.bind(this));
    this._resizeObserver.observe(this.shadowRoot.host);
  }

  static get styles() {
    return [ css`:host { display: block; }`];
  }

  public firstUpdated(){
    this._canvas = this.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
    this._context = this._canvas.getContext('2d');
  }

  public start() {
    if(this._isAnimationInProgress) {
      return;
    }

    this._isAnimationInProgress = true;
    window.requestAnimationFrame(this._handleAnimationFrame.bind(this));
  } 

  public render() {
    return html`<canvas id='canvas'></canvas>`;
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

    //TODO (JSR) schedule render
  }

  private _handleAnimationFrame(timestamp:number) {
    this._renderSpites();

    if(this._isAnimationInProgress) {
      window.requestAnimationFrame(this._handleAnimationFrame.bind(this));
    }
  }

  public _renderSpites(){
    this._sprites.forEach((sprite) => sprite.render());
  }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }

}