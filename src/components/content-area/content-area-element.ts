import { LitElement, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ResizeObserver from 'resize-observer-polyfill';
import { OverlayElement } from '../overlay/overlay-element';
import { CaretSprite, CaretUpdate } from '../overlay/models/caret-sprite';
import { Caret } from './models/caret';

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _content: Node[];
  private _caret: Caret;

  static get styles() {
    return [ css`:host { display: block; }`];
  }

  constructor(){
    super();  

    if(!this.attributes.getNamedItem("tabindex")) {
      this.tabIndex = 0;  
    }

    this.addEventListener("focusin",this._handleFocus.bind(this));
    document.addEventListener('selectionchange', this._handleEvent_selectionChange.bind(this));
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

  private _handleEvent_selectionChange(event: Event) {
    var selection = this.getSelection();

    if(!selection.anchorNode || selection.type !== 'Caret'){
      if(this._caret == null) {
        return;
      }
      
      this._caret = null;
    }
    else {
      var rect = this.getBoundingClientRect() as DOMRect;
      var offsetX = rect.x;
      var offsetY = rect.y;

      var selectedNode = selection.getRangeAt(0);
      var position = selectedNode.getBoundingClientRect();

      this._caret = {
        x: position.left,
        y: position.top,
        height: position.height,
        relativeX: position.left - offsetX,
        relativeY: position.top - offsetY
      }
    }

    var toDispatch = new CustomEvent('caret-update', {detail: this._caret});

    this.dispatchEvent(toDispatch);
  }

  private _handleFocus(event: Event){ }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }

  private _appendNode(node: Node) {
    this.shadowRoot.appendChild(node);
  }

  private _isDescendant(node:Node){
    for (; node; node = node.parentNode) {
        if (node === this) {
            return true;
        }
    }
    return false;
}

}