import { LitElement, customElement, css, html } from 'lit-element';
import KeyListener from './key-listener';
import ContentAreaSelection from './content-area-selection';
import HierarchyPath from '../../core/hierarchy-path';

@customElement('content-area')
export default class ContentAreaElement extends LitElement {
  
  private _root: DocumentFragment = null;
  private _contentWrapperElement: HTMLElement = null;
  private _keyListeners: KeyListener[] = [];

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

  public addKeyListener(keyListener:KeyListener){
    this._keyListeners.push(keyListener);
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

  public getSelection():ContentAreaSelection{
    var selection = this.shadowRoot.getSelection();

    var anchorPointer = this._getNodeHierarchyPath(selection.anchorNode)

    var focusPointer:HierarchyPath = null;

    if(!selection.isCollapsed) {
      focusPointer = this._getNodeHierarchyPath(selection.focusNode);
    }

    var result = new ContentAreaSelection(anchorPointer, focusPointer);

    return result;
  }

  public render() {
    return html`<content-wrapper id='content-wrapper'></content-wrapper>`;
  }

  public removeCharAt(hierarchyPath:HierarchyPath) {
    var node = this._getNode(this._contentWrapperElement, hierarchyPath.getParent());

    if(!(node instanceof Text)) {
      throw 'Cannot remove char from non Text node';
    }

    var textNode = node as Text;

    textNode.nodeValue = this._removeCharAtIndex(textNode.nodeValue, hierarchyPath.end);
  }

  public setContent(root: DocumentFragment){
    this._root = root.cloneNode(true) as DocumentFragment;

    if(this._contentWrapperElement !== null) {
      this.clearContent();

      this._contentWrapperElement.appendChild(this._root);
    }
  }

  private _getNode(node:Node, hierarchyPath: HierarchyPath):Node {
    if(hierarchyPath.isRoot()){
      return node;
    }

    var child = node.childNodes[hierarchyPath.head];

    return this._getNode(child, hierarchyPath.tail);
  }

  private _getNodeHierarchyPath(node:Node): HierarchyPath {
    var currentIndex = Array.prototype.indexOf.call(node.parentNode.childNodes, node) as number;

    if(node.parentNode === this._contentWrapperElement){
      return new HierarchyPath([currentIndex]);
    }

    var result:HierarchyPath = this._getNodeHierarchyPath(node.parentNode);

    result.createChildPath(currentIndex);

    return result;
  }
 
  private _handleEvent_blur(event: Event){
    this._contentWrapperElement.contentEditable = 'false';
  }

  private _handleEvent_focus(event: Event){
    this._contentWrapperElement.contentEditable = 'true';
  }

  private _handleEvent_keydown(event:KeyboardEvent) {
    var preventDefault = false;
    var selection = this.getSelection();
    var keyCode = `${!event.code.includes('Shift') && event.shiftKey ? 'SHIFT-':''}${event.code}`;
        
    for(let listener of this._keyListeners){
      if(!listener.handleKey(keyCode, selection)) {
        preventDefault = true;
        break;
      }
    }

    if(preventDefault) {
      event.preventDefault();
    }
  }

  private _removeCharAtIndex(value:string, index:number):string {
    return value.substring(0,index) + value.substring(index + 1);
  }
}