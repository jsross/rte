import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
const _html = html;

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _html: Function;
  private isContentContainerReady: boolean = false;
  private contentContainer: HTMLElement;
  private overlay: HTMLCanvasElement;
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
    this.overlay = this.shadowRoot.getElementById('overlay') as HTMLCanvasElement;
    this.isContentContainerReady = true;

    this.overlay.getContext('2d');

    if(this.content) {
      this._applyContent();
    }
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }

  private _applyContent(){
    this.clearContent();
    this.content.forEach(this._appendNode.bind(this));
  }

  private _appendNode(node: Node) {
    this.contentContainer.appendChild(node);
  }

}