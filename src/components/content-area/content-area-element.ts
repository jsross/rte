import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import CaretSprite from '../../models/sprites/caret-sprite';
import ResizeObserver from 'resize-observer-polyfill';
const _html = html;

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _html: Function;
  private isContentContainerReady: boolean = false;
  private contentContainer: HTMLDivElement;
  private overlay: HTMLCanvasElement;
  private content: Node[];
  private caret: CaretSprite = null;
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
  }
 
  private _handlePromise_updateComplete():void{
    this.overlay.width = this.contentContainer.clientWidth;
    this.overlay.height = this.contentContainer.clientHeight;

    if(this.caret) {
      this.caret.clear();
      this.caret.render();
    }
  }

  private _handleClick_contentContainer(event: MouseEvent){
    if(this.caret === null){
      var overlayContext = this.overlay.getContext('2d');

      this.caret = new CaretSprite(overlayContext, 10,0);
    }

    this.caret.render(event.x, event.y);
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