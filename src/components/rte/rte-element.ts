import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import RteNode from '../../core/nodes/abstract/rte-node';
const _html = html;

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _html: any;

  private contentArea: ContentAreaElement;
  private renderEngine: RenderEngine;
  private root: RteNode;

  static get styles() {
    return [ css`
    :host { 
      display: inline-block;
    }`];
  }

  constructor(){
    super();

    this.renderEngine = new RenderEngine();
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public setValue(root:RteNode) {
    this.root = root;

    if(this.contentArea) {
      var content = this.renderEngine.render(this.root);
      this.contentArea.setContent(content.nodes);
    }
  }

  public firstUpdated() {
    this.contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;

    if(this.root) {
      var content = this.renderEngine.render(this.root);
      this.contentArea.setContent(content.nodes);
    }
  }

  private _handleEvent_keydown(event: KeyboardEvent){
    event.preventDefault();

    console.log(event);
  }

}