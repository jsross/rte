import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import RenderResult from '../../models/render-result'
const _html = html;

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _html: any;
  private contentContainer: HTMLElement;

  constructor(){
    super();
  }

  public setContent(content: RenderResult){
    this.clearContent();
    this.contentContainer.appendChild( content.root );
  }

  public clearContent(){
    while (this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
  }

  public firstUpdated(){
    this.contentContainer = this.shadowRoot.getElementById('content-container');
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }
}