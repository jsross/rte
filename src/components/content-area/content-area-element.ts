import { LitElement, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ResizeObserver from 'resize-observer-polyfill';
import { OverlayElement } from '../overlay/overlay-element';
import { CaretSprite, CaretUpdate } from '../overlay/models/caret-sprite';

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _content: Node[];
  private _resizeObserver:ResizeObserver;
  private _offset_x: number;
  private _offset_y: number;

  static get styles() {
    return [ css`:host { display: block; }`];
  }

  constructor(){
    super();  
    
    this._resizeObserver = new ResizeObserver(this._handleNotify_resizeObserver.bind(this));
    this._resizeObserver.observe(this);

    if(!this.attributes.getNamedItem("tabindex")) {
      this.tabIndex = 0;  
    }

    this.addEventListener("focusin",this._handleFocus.bind(this));
  }

  public setContent(content: Node[]){
    this._content = content;

    this.clearContent();
    
    this._content.forEach(this._appendNode.bind(this));
  }

  public clearContent(){
    while (this.shadowRoot.host.firstChild) {
      this.shadowRoot.host.firstChild.remove();
    }
  }

  private _handleNotify_resizeObserver(entries:Array<ResizeObserverEntry>, observer:ResizeObserver):void{
    var entry = entries[0];
    var targetRect = entry.target.getBoundingClientRect() as DOMRect;
    this._offset_x = targetRect.x;
    this._offset_y = targetRect.y;   
  }

  private _handleFocus(event: Event){
    var selection = this.getSelection();
    var selectedNode = selection.getRangeAt(0);
    var position = selectedNode.getBoundingClientRect();

    var detail = {
      x: position.left,
      y: position.top,
      height: position.height,
      relativeX: position.left - this._offset_x,
      relativeY: position.top - this._offset_y
    }

    var toDispatch = new CustomEvent('caret-update',{detail:detail});

    this.dispatchEvent(toDispatch);
  }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }

  private _appendNode(node: Node) {
    this.shadowRoot.appendChild(node);
  }

}