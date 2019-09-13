import { LitElement, customElement, css } from 'lit-element';

export abstract class ContentSelectableElement extends LitElement {
    protected _range: Range;
    private _isMouseDown: boolean;

    constructor() {
        super();  
    
        if(!this.attributes.getNamedItem("tabindex")) {
          this.tabIndex = 0;  
        }
    
        this.addEventListener("mousedown", this._handleEvent_mouseDown.bind(this));
        this.addEventListener("mousemove", this._handleEvent_mouseMove.bind(this));
        this.addEventListener("mouseup", this._handleEvent_mouseUp.bind(this));
    }

    private _handleEvent_mouseDown(event: MouseEvent){
        console.log('_handleEvent_mouseDown');

        if(this._range) {
          this._range.detach();
          this._range = null;
        }
    
        this._isMouseDown = true;
    
        this._range = document.createRange();
        
        var offset:number = 0;
    
        var element = this.shadowRoot.elementFromPoint(event.x, event.y);
        var node = this._getNodeAtCoordinates(element, event.x, event.y);
    
        if(node === null) {
            //TODO Needs to handle if element has no nodes, if x,y is before first node, or if x,y is after last node
    
            return;
        }
    
        if(node instanceof Text) {
          offset = this._getIndexAtCoordinates(node as Text, event.x, event.y);
        }
    
        if(offset < 0) {
          this._range.setStart(node,offset);
        }
        else {
          this._range.setStartBefore(node);
        }
      }
    
      private _handleEvent_mouseMove(event: MouseEvent) {
        if(!this._isMouseDown){
          return;
        }
    
        var offset:number = 0;
    
        var element = this.shadowRoot.elementFromPoint(event.x, event.y);
        var node = this._getNodeAtCoordinates(element, event.x, event.y);
    
        if(node == null) {
          //TODO Needs to handle if element has no nodes, if x,y is before first node, or if x,y is after last node
    
          return;
        }

        console.log(node);
        
        if (node instanceof Text) {
          var offset = this._getIndexAtCoordinates(node as Text, event.x, event.y);
        }

        //TODO: need to determine if the range has changed or not
    
        if(offset < 0) {
          this._range.setEndAfter(node);
        }
        else {
          this._range.setEnd(node, offset);
        }    
      }
    
      private _handleEvent_mouseUp(event: MouseEvent) {
        this._isMouseDown = false;
      }

      private _getNodeAtCoordinates(element:Element, x:number, y:number): Node {
        for(let child=element.firstChild; child!==null; child=child.nextSibling) {
          var rect:DOMRect = this._getDomRect(child);
    
          if(this._areCoordinatesWithinBounds(rect, x, y)) {
            return child;       
          }
        }
    
        return null;
      }
    
      private _getIndexAtCoordinates(node:Text, x:number, y:number): number {
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

      private _getDomRect(node:Node):DOMRect{
        let range = document.createRange();
        range.selectNodeContents(node);
        
        var rect:DOMRect = range.getBoundingClientRect() as DOMRect;
  
        range.detach();

        return rect;
      }
}