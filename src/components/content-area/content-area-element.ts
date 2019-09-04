import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import ResizeObserver from 'resize-observer-polyfill';
import { OverlayElement } from '../overlay/overlay-element';
import { CaretSprite, CaretUpdate } from '../overlay/models/caret-sprite';
const _html = html;

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _html: Function;
  private isContentContainerReady: boolean = false;
  private contentContainer: HTMLDivElement;
  private overlay: OverlayElement;
  private content: Node[];
  private caretSprite: CaretSprite = null;
  private resizeObserver:ResizeObserver;
  private _offset_x: number;
  private _offset_y: number;

  constructor(){
    super();  
    this.resizeObserver = new ResizeObserver(this._handleNotify_resizeObserver.bind(this));
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
    this.overlay = this.shadowRoot.getElementById('overlay') as OverlayElement;
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
    var targetRect = entry.target.getBoundingClientRect() as DOMRect;
    this._offset_x = targetRect.x;
    this._offset_y = targetRect.y;    
  }

  private _handleBlur_contentContainer(event: Event){
    if(this.caretSprite) {
      this.overlay.removeSprite(this.caretSprite);
      this.caretSprite = null;
    }
  }

  private _handleClick_contentContainer(event: MouseEvent){
    var selection = this.getSelection();
    var selectedNode = selection.getRangeAt(0);
    var position = selectedNode.getBoundingClientRect();

    var x = position.left - this._offset_x;
    var y = position.top - this._offset_y;

    if(this.caretSprite == null) {
      this.caretSprite = this.overlay.addCaretSprite();
    }

    var update: CaretUpdate = {x: x, y: y, timeStamp: event.timeStamp, lineHeight: position.height, stroke: 2};

    this.caretSprite.scheduleUpdate(update);

    this.overlay.start();    
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