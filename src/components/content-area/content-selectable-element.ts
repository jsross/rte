import { LitElement, customElement, css } from 'lit-element';
import { Rect } from './models/rect';

export abstract class ContentSelectableElement extends LitElement {
    protected _range: Range;
    private _isMouseDown: boolean;

    constructor() {
        super();  
    
        if(!this.attributes.getNamedItem("tabindex")) {
          this.tabIndex = 0;  
        }

        this.addEventListener("blur", this._handleEvent_blur.bind(this));
        this.addEventListener("focus", this._handleEvent_focus.bind(this));    
        this.addEventListener("mousedown", this._handleEvent_mouseDown.bind(this));
        this.addEventListener("mousemove", this._handleEvent_mouseMove.bind(this));
        this.addEventListener("mouseup", this._handleEvent_mouseUp.bind(this));
    }

    private _getRect(node:Node):Rect{
      let range = document.createRange();
      range.selectNodeContents(node);
      
      var rect:DOMRect = range.getBoundingClientRect() as DOMRect;

      range.detach();

      return new Rect(rect);
    }

    private _getNodeAtCoordinates(element:Element, x:number, y:number): Node {
      var previousNode: Node = null;

      for(let child=element.firstChild; child!==null; child=child.nextSibling) {
        var rect:Rect = this._getRect(child);
  
        if(rect.containsCoordinates(x,y)){
          return child;
        }

      }
  
      return null;
    }
  
    private _getIndexAtCoordinates(node:Node, x:number, y:number): number {
        var range = node.ownerDocument.createRange();
        range.selectNodeContents(node);
        var currentPos = 0;
        var endPos = range.endOffset;
  
        while(currentPos+1 < endPos) {
          range.setStart(node, currentPos);
          range.setEnd(node, currentPos+1);
          var rect = new Rect(range.getBoundingClientRect() as DOMRect);
  
          if(rect.containsCoordinates(x, y)) {
            range.detach();
  
            return currentPos;          
          }
          
          currentPos++;
        }
  
        range.detach();
  
        return -1;
    }  

    private _getNodePointerAtCoodrinates(x:number, y:number):NodePointer {
      var element = this.shadowRoot.elementFromPoint(x, y);

      if(element.hasChildNodes()){
        var node = this._getNodeAtCoordinates(element, x, y);
        var offset = this._getIndexAtCoordinates(node, x, y);
        
        return { Node: node, Offset: offset};
      }
    
      return {Node: element, Offset: 0};
    }

    private _handleEvent_blur(event:Event) {
        this.style.userSelect = 'auto';
    }

    private _handleEvent_focus(event:FocusEvent) {
        console.log("_handleEvent_focus");
    }

    private _handleEvent_mouseDown(event: MouseEvent){
        console.log('_handleEvent_mouseDown');
        this.style.userSelect = 'none';
        window.getSelection().removeAllRanges();

        if(this._range) {
          this._range.detach();
          this._range = null;
        }
    
        this._isMouseDown = true;
    
        this._range = document.createRange();
        
        var nodePointer = this._getNodePointerAtCoodrinates(event.x, event.y);

        this._range.setStart(nodePointer.Node, nodePointer.Offset);
      }
    
      private _handleEvent_mouseMove(event: MouseEvent) {
        if(!this._isMouseDown){
          return;
        }
    
        var nodePointer = this._getNodePointerAtCoodrinates(event.x, event.y);

        if(this._range.endContainer !== nodePointer.Node || this._range.endOffset !== nodePointer.Offset) {
          this._range.setEnd(nodePointer.Node, nodePointer.Offset);
        }          
      }
    
      private _handleEvent_mouseUp(event: MouseEvent) {
        this._isMouseDown = false;
      }
}

interface NodePointer {
  Node:Node;
  Offset:number
}