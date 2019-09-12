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
  private _range: Range;

  static get styles() {
    return [ css`:host { display: block; }`];
  }

  constructor(){
    super();  

    if(!this.attributes.getNamedItem("tabindex")) {
      this.tabIndex = 0;  
    }

    this.addEventListener("focusin",this._handleFocus.bind(this));
    this.addEventListener("mousedown", this._handleEvent_mouseDown.bind(this));

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

  private _handleEvent_mouseDown(event: MouseEvent){
    if(this._range) {
      this._range.detach();
      this._range = null;
    }

    var element = this.shadowRoot.elementFromPoint(event.x, event.y);

    var node = this.getNodeAtCoordinates(element, event.x, event.y);

    if(node instanceof Text) {
      var index = this.getIndexAtCoordinates(node as Text, event.x, event.y);

      console.log(`Index: ${index}`);
    }
  }

  private getNodeAtCoordinates(element:Element, x:number, y:number): Node {
    for(let child=element.firstChild; child!==null; child=child.nextSibling) {
      let range = document.createRange();
      range.selectNodeContents(child);
      
      var rect:DOMRect = range.getBoundingClientRect() as DOMRect;

      range.detach();

      if(this._areCoordinatesWithinBounds(rect, x, y)) {
        return child;       
      }
    }

    return null;
  }

  private getIndexAtCoordinates(node:Text, x:number, y:number): number {
      var range = node.ownerDocument.createRange();
      range.selectNodeContents(node);
      var currentPos = 0;
      var endPos = range.endOffset;
      while(currentPos+1 < endPos) {
        range.setStart(node, currentPos);
        range.setEnd(node, currentPos+1);
        var rect = range.getBoundingClientRect() as DOMRect;

        if(this._areCoordinatesWithinBounds(rect, x, y)) {
          range.detach();

          return currentPos;          
        }

        currentPos++;
      }

      range.detach();

      return -1;
  }  

  private _areCoordinatesWithinBounds(rect:DOMRect, x:number, y:number):boolean {
    if(x < rect.x)
      return false;

    if(x > rect.x + rect.width)
      return false;
    
    if(y < rect.y)
      return false;

    if(y > rect.y + rect.height)
      return false;

    return true;
  }

  private _handleEvent_selectionChange(event: Event) {
    var selection = this.getSelection();

    if(!selection.anchorNode || selection.type !== 'Caret'){
      if(this._caret == null) {
        return;
      }
      
      this._caret = null;

      this.dispatchEvent(new CustomEvent('caret-removed'));

      return;      
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