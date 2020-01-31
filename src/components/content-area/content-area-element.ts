import { LitElement, customElement, css, html } from 'lit-element';
import HierarchyPath from '@src/core/hierarchy-path';
import ContentSelection from '@src/core/content-selection';
import NodePathHelper from '@src/core/node-path-helper';
import {fromEvent, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NamedKeyAttributeValues} from '@src/core/named-key-attribute-values'

const keyWhiteList:Array<string> = [
                                      NamedKeyAttributeValues.FUNCTION_KEYS.F12,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.ARROW_DOWN,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.ARROW_LEFT,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.ARROW_RIGHT,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.ARROW_UP,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.END,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.HOME,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.PAGE_DOWN,
                                      NamedKeyAttributeValues.NAVIGATION_KEYS.PAGE_UP
                                    ];

@customElement('content-area')
export default class ContentAreaElement extends LitElement {
  
  private _root: DocumentFragment = null;
  private _contentWrapperElement: HTMLElement = null;  
  private _selectionChangeSubscription: Subscription;

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

  public connectedCallback(){
    super.connectedCallback();

    this._selectionChangeSubscription = fromEvent(document,'selectionchange')
                                            .pipe(filter(this._filter_selectionChangedEvents.bind(this)))
                                            .subscribe(this._handleEvent_selectionChange.bind(this));
  }

  public disconnectedCallback() {
    super.disconnectedCallback();

    this._selectionChangeSubscription.unsubscribe();
  }
 

  public clearContent(){
    while (this._contentWrapperElement.firstChild) {
      this._contentWrapperElement.firstChild.remove();
    }
  }

  public destroy() {
    this._selectionChangeSubscription.unsubscribe();
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

  private _filter_selectionChangedEvents(value:Event, index:number){
    var selection = this.shadowRoot.getSelection();

    return selection.anchorNode !== null;
  }

  private _handleEvent_selectionChange(event:Event) {
    var selection = this.getSelection();

    var detail = {
      selection: selection,
    }

    var rteEvent = new CustomEvent('contentArea:selectionChange', { detail: detail});

    this.dispatchEvent(rteEvent);      
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

    var rteEvent = new CustomEvent('contentArea:keyEvent', { detail: detail});

    this.dispatchEvent(rteEvent);      
    
    if(keyWhiteList.indexOf(event.key) < 0) {
      event.preventDefault();
    }
  }

  private _handleEvent_select(event: Event) {
    console.log(event);
  }
}