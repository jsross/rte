import { LitElement, customElement, css, html } from 'lit-element';
import HierarchyPath from '../../core/hierarchy-path';
import ContentSelection from '../../core/content-selection';
import NodePathHelper from '../../core/node-path-helper';

const keyCodeWhiteList = [123];

@customElement('content-area')
export default class ContentAreaElement extends LitElement {
  
  private _root: DocumentFragment = null;
  private _contentWrapperElement: HTMLElement = null;

  static get styles() {
    return [ css`
      .header {
          font-weight: bold;
          font-size: 16pt;
      }
      
      .bold {
          font-weight: bold;
      }
      
      .underlined {
          text-decoration: underline;
      }

      content-wrapper {
        display: inline-block;
      }`];
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

    var anchorPointer = NodePathHelper.getPath(this._contentWrapperElement, selection.anchorNode).getChild(selection.anchorOffset);

    var focusPointer:HierarchyPath = null;

    if(selection.type === 'Range') {
      focusPointer = NodePathHelper.getPath(this._contentWrapperElement, selection.focusNode).getChild(selection.focusOffset);
    }

    var result = new ContentSelection(anchorPointer, focusPointer);

    return result;
  }

  public setSelection(start:HierarchyPath, end:HierarchyPath=null){
    var startPointer = NodePathHelper.resolvePath(this._contentWrapperElement, start);

    this.shadowRoot.getSelection().setPosition(startPointer.node, startPointer.remainder.end);
  }

  public render() {
    return html`<content-wrapper id='content-wrapper'></content-wrapper>`;
  }

  public removeNode(path:HierarchyPath) {
    if(path.isRoot()){
      this.clearContent();

      return;
    }

    var target = NodePathHelper.resolvePath(this._contentWrapperElement, path);

    if(target.remainder.isRoot()){
      target.node.parentNode.removeChild(target.node);
    }
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

    var target = NodePathHelper.resolvePath(this._contentWrapperElement, path);

    if(target.remainder.isRoot()){
      target.node.parentNode.replaceChild(node, target.node);
    }
  }

  public updateNode(path:HierarchyPath, node:Node) {
    var target = NodePathHelper.resolvePath(this._contentWrapperElement, path);
    target.node.parentNode.replaceChild(node, target.node);  
  }

  private _handleEvent_blur(event: Event){
    this._contentWrapperElement.contentEditable = 'false';
  }

  private _handleEvent_focus(event: Event){
    this._contentWrapperElement.contentEditable = 'true';
  }

  private _handleEvent_keydown(event:KeyboardEvent) {
    var selection = this.getSelection();

    var detail = {
      selection: selection,
      key: event.key
    }

    var rteEvent = new CustomEvent('rte-keyboard-event', { detail: detail});

    this.dispatchEvent(rteEvent);      

    if(keyCodeWhiteList.indexOf(event.keyCode) < 0) {
      event.preventDefault();
    }
  }
}