import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import Sprite from '../../models/sprites/sprite';
import CaretSprite from '../../models/sprites/caret-sprite';
import ResizeObserver from 'resize-observer-polyfill';
import CircleSprite from '../../models/sprites/circle-sprite';
const _html = html;

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _html: Function;
  private isContentContainerReady: boolean = false;
  private contentContainer: HTMLDivElement;
  private overlay: HTMLCanvasElement;
  private content: Node[];
  private sprites: Array<Sprite> = [];
  private circleSprite: CircleSprite; 
  private resizeObserver:ResizeObserver;

  constructor(){
    super();  
    this.resizeObserver = new ResizeObserver(this._handleNotify_resizeObserver.bind(this));
    
    this.updateComplete.then(this._handlePromise_updateComplete.bind(this));
  }

  public setContent(content: Node[]){
    this.content = content;

    if(this.isContentContainerReady) {
      this._applyContent();
    }
  }

  public clearContent(){
    while (this.isContentContainerReady && this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
  }

  public firstUpdated(){
    this.contentContainer = this.shadowRoot.getElementById('content-container') as HTMLDivElement;
    this.overlay = this.shadowRoot.getElementById('overlay') as HTMLCanvasElement;
    this.isContentContainerReady = true;

    this.resizeObserver.observe(this.contentContainer);

    if(this.content) {
      this._applyContent();
    }
    
    var context = this.overlay.getContext('2d');

    this.circleSprite = new CircleSprite(context, 0, 0, 10);
    this.sprites.push(this.circleSprite);
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  private _handleNotify_resizeObserver(entries:Array<ResizeObserverEntry>, observer:ResizeObserver):void{
    var entry = entries[0];
    this.overlay.width = entry.contentRect.width;
    this.overlay.height = entry.contentRect.height;

    this.sprites.forEach((sprite) => {
      if(sprite.isRendered){
        sprite.clear();
        sprite.render();
      }
    });
  }
 
  private _handlePromise_updateComplete():void{
    this.overlay.width = this.contentContainer.clientWidth;
    this.overlay.height = this.contentContainer.clientHeight;    
  }

  private _handleClick_contentContainer(event: MouseEvent){
    var selection = this.getSelection();
    var position = selection.getRangeAt(0).getBoundingClientRect();

    console.log(position);

    this.circleSprite.update(position.left, position.top); 
    
    this._renderSpites();
  }

  public _renderSpites(){
    this.sprites.forEach((sprite) => sprite.render());
  }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }

  private _applyContent(){
    this.clearContent();
    this.content.forEach(this._appendNode.bind(this));
  }

  private _appendNode(node: Node) {
    this.contentContainer.appendChild(node);
  }

}