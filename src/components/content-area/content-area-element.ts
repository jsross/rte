import { LitElement, customElement, css, html } from 'lit-element';

@customElement('content-area')
export class ContentAreaElement extends LitElement {
  
  private _content: Node[];
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
  }

  public firstUpdated(){
    this._contentWrapperElement = this.shadowRoot.getElementById('content-wrapper');

    if(this._content !== null){
      this.setContent(this._content);
    }
  }

  public render() {
    return html`<content-wrapper id='content-wrapper'></content-wrapper>`;
  }

  public setContent(content: Node[]){
    this._content = content;

    if(this._contentWrapperElement !== null) {
      this.clearContent();
    
      this._content.forEach(this._appendNode.bind(this));
    }
  }

  public clearContent(){
    while (this._contentWrapperElement.firstChild) {
      this._contentWrapperElement.firstChild.remove();
    }
  }
 
  private _handleEvent_blur(event: Event){
    this._contentWrapperElement.contentEditable = 'false';
  }

  private _handleEvent_focus(event: Event){
    this._contentWrapperElement.contentEditable = 'true';
  }

  public getSelection(): Selection{
    return this.shadowRoot.getSelection();
  }

  private _appendNode(node: Node) {
    this._contentWrapperElement.appendChild(node);
  }

}