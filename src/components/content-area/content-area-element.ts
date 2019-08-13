import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import RenderResult from '../../models/render-result'
const _html = html;

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _html: Function;
  private isContentContainerReady: boolean = false;
  private contentContainer: HTMLElement;
  private content: Node[];

  constructor(){
    super();
  }

  public setContent(content: Node[]){
    this.content = content;

    if(this.isContentContainerReady) {
      this._applyContent();
    }
  }

  public clearContent(){
    while (this.isContentContainerReady && this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
  }

  public firstUpdated(){
    this.contentContainer = this.shadowRoot.getElementById('content-container');
    this.isContentContainerReady = true;

    if(this.content) {
      this._applyContent();
    }
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  private _applyContent(){
    this.clearContent();
    this.content.forEach(this._appendNode.bind(this));
  }

  private _appendNode(node: Node) {
    this.contentContainer.appendChild(node);
  }

  private _handleEvent_keydown(event:KeyboardEvent){
    event.preventDefault();
    var selection = this.shadowRoot.getSelection();

    var node = selection.anchorNode;
    console.log(node);

    return false;
  }
}