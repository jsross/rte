import { LitElement, customElement, css, html } from 'lit-element';
import KeyListener from './key-listener';
import ContentUpdate from './content-update';
import ContentAreaSelection from './content-area-selection';
import NodePointer from './node-pointer';

@customElement('content-area')
export default class ContentAreaElement extends LitElement {
  
  private _content: Node[] = null;
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

    if(this._content !== null){   
      this.setContent(this._content);
    }
  }

  public getSelection():ContentAreaSelection{
    var selection = this.shadowRoot.getSelection();

    var anchorPointer = new NodePointer(selection.anchorNode,
                                        this._getNodeHierarchyPath(selection.anchorNode),
                                        selection.anchorOffset);

    var focusPointer:NodePointer = null;

    if(!selection.isCollapsed) {
      var focusPointer = new NodePointer(selection.focusNode,
                                         this._getNodeHierarchyPath(selection.focusNode),
                                         selection.focusOffset);
    }

    var result = new ContentAreaSelection(anchorPointer, focusPointer);

    return result;
  }

  public render() {
    return html`<content-wrapper id='content-wrapper'></content-wrapper>`;
  }

  public removeCharAt(hierarchyPath: number[], index:number){
    var node = this._getNode(this._contentWrapperElement,hierarchyPath);

    if(!(node instanceof Text)) {
      throw 'Cannot remove char from non Text node';
    }

    var textNode = node as Text;

    textNode.nodeValue = this._removeCharAtIndex(textNode.nodeValue, index);
  }

  public setContent(content: Node[]){
    this._content = content;

    if(this._contentWrapperElement !== null) {
      this.clearContent();
    
      this._content.forEach(this._appendNode.bind(this));
    }
  }

  public updateContent(contentUpdate:ContentUpdate){
    contentUpdate.execute(this);
  }

  private _appendNode(node: Node) {
    this._contentWrapperElement.appendChild(node);
  }

  private _getNode(node:Node, hierarchyPath: number[]):Node {
    var [head, ...tail] = hierarchyPath;

    var child = node.childNodes[head];

    if(tail.length === 0) {
      return child;
    }

    var result = this._getNode(child, tail);

    return result;
  }

  private _getNodeHierarchyPath(node:Node): number[] {
    var currentIndex = Array.prototype.indexOf.call(node.parentNode.childNodes, node);

    if(node.parentNode === this._contentWrapperElement){
      return [currentIndex];
    }

    var result = this._getNodeHierarchyPath(node.parentNode);

    result.push(currentIndex);

    return result;
  }
 
  private _handleEvent_blur(event: Event){
    this._contentWrapperElement.contentEditable = 'false';
  }

  private _handleEvent_focus(event: Event){
    this._contentWrapperElement.contentEditable = 'true';
  }

  private _handleEvent_keydown(event:KeyboardEvent) {
    var selection = this.getSelection();
    var keyCode = `${!event.code.includes('Shift') && event.shiftKey ? 'SHIFT-':''}${event.code}`;
        
    for(let listener of this._keyListeners){
      var result = listener.handleKey(keyCode, selection);
      if(result != null) {
        event.preventDefault();

        this.updateContent(result);

        break;
      }
      
    }
  }

  private _removeCharAtIndex(value:string, index:number):string {
    return value.substring(0,index) + value.substring(index + 1);
  }
}