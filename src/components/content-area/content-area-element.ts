import { LitElement, customElement, css, html } from 'lit-element';
import HierarchyPath from '../../core/hierarchy-path';
import ContentSelection from '../../core/content-selection';

const keyCodeWhiteList = [123];

@customElement('content-area')
export default class ContentAreaElement extends LitElement {
  
  private _root: DocumentFragment = null;
  private _contentWrapperElement: HTMLElement = null;

  static get styles() {
    return [ css`
      .bigger {font-size:20pt;}
      content-wrapper {
        display: inline-block;
      }
    `];
  }

  constructor(){
    super();  

    if(!this.attributes.getNamedItem("tabindex")) {
      this.tabIndex = 0;  
    }

    this.addEventListener("focus",this._handleEvent_focus.bind(this));
    this.addEventListener("blur",this._handleEvent_blur.bind(this));
    this.addEventListener('keydown', this._handleEvent_keydown.bind(this));
  }

  public clearContent(){
    while (this._contentWrapperElement.firstChild) {
      this._contentWrapperElement.firstChild.remove();
    }
  }

  public firstUpdated(){
    this._contentWrapperElement = this.shadowRoot.getElementById('content-wrapper');

    if(this._root !== null){   
      this._contentWrapperElement.appendChild(this._root);
    }
  }

  public getSelection():ContentSelection{
    var selection = this.shadowRoot.getSelection();

    var anchorPointer = HierarchyPath.getPath(this._contentWrapperElement, selection.anchorNode).createChildPath(selection.anchorOffset);

    var focusPointer:HierarchyPath = null;

    if(!selection.isCollapsed) {
      focusPointer = HierarchyPath.getPath(this._contentWrapperElement, selection.focusNode).createChildPath(selection.focusOffset);
    }

    var result = new ContentSelection(anchorPointer, focusPointer);

    return result;
  }

  public render() {
    return html`<content-wrapper id='content-wrapper'></content-wrapper>`;
  }

  public removeNode(path:HierarchyPath) {
    if(path.isRoot()){
      this.clearContent();

      return;
    }

    var node = path.resolve(this._contentWrapperElement);

    node.parentNode.removeChild(node);    
  }

  public setContent(root: DocumentFragment){
    this._root = root.cloneNode(true) as DocumentFragment;

    if(this._contentWrapperElement !== null) {
      this.clearContent();

      this._contentWrapperElement.appendChild(this._root);
    }
  }

  public swapNode(path:HierarchyPath, node:Node){
    if(path.isRoot()){
      throw 'Cannot swap root';
    }

    var toReplace = path.resolve(this._contentWrapperElement);

    toReplace.parentNode.replaceChild(node, toReplace);
  }

  public updateTextNode(hierarchyPath:HierarchyPath, content:string){
    var node = hierarchyPath.resolve(this._contentWrapperElement);

    if(!(node instanceof Text)) {
      throw 'Cannot remove char from non Text node';
    }

    var textNode = node as Text;

    textNode.nodeValue = content;
  }

  private _handleEvent_blur(event: Event){
    this._contentWrapperElement.contentEditable = 'false';
  }

  private _handleEvent_focus(event: Event){
    this._contentWrapperElement.contentEditable = 'true';
  }

  private _handleEvent_keydown(event:KeyboardEvent) {
    var selection = this.getSelection();
    var key = `${!event.code.includes('Shift') && event.shiftKey ? 'SHIFT-':''}${event.code}`;

    var detail = {
      selection: selection,
      key: key
    }

    var rteEvent = new CustomEvent('rte-keyboard-event', { detail: detail});

    this.dispatchEvent(rteEvent);      

    if(keyCodeWhiteList.indexOf(event.keyCode) < 0) {
      event.preventDefault();
    }
  }
}