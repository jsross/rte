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

    if(!selection.anchorNode){
      if(this._caret !== null){
        this._caret = null;
        this.dispatchEvent(new CustomEvent('caret-removed'));
      }
    }
    
    if(selection.type === 'Caret') {
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

      this.dispatchEvent(new CustomEvent('caret-update', {detail: this._caret}));
    }
    else if(selection.type === 'Range') {
      console.log('----------------------------------------------');
      console.log(selection);
      console.log(document.getSelection());
      
      if(this._caret !== null){
        this._caret = null;
        this.dispatchEvent(new CustomEvent('caret-removed'));
      }
    }
    else {
      console.log(selection.type);
    }

    
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