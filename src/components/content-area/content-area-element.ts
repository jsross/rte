import { customElement, css } from 'lit-element';
import { Caret } from './models/caret';
import { ContentSelectableElement } from './content-selectable-element';

@customElement('content-area')
export class ContentAreaElement extends ContentSelectableElement {
  
  private _content: Node[];
  private _caret: Caret;

  static get styles() {
    return [ css`
    :host { display: block; }
    .bigger {font-size:20pt;}`];
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

    var lineEndings = this._getElementLineEndings(this.shadowRoot);

    console.log(lineEndings);
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

}