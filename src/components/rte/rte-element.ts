import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import ArrowKeyListener from './arrow-key-listener';
import DocumentFragmentNode from '../../core/nodes/concrete/document-fragment-node';
import BackspaceListener from './backspace-listener';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _renderEngine: RenderEngine;
  private _documentRoot: DocumentFragmentNode;

  static get styles() {    
    return [ css`
    :host { 
      display: inline-block;
    }`];
  }

  constructor(){
    super();

    this._renderEngine = new RenderEngine();
  }

  public firstUpdated() {
    this._contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this._contentArea.addKeyListener(new ArrowKeyListener());
    this._contentArea.addKeyListener(new BackspaceListener());

    if(this._documentRoot) {
      this._doRender();
    }
  }

  public render() {
    const _html = html;
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public setValue(value:DocumentFragmentNode) {
    this._documentRoot = value;

    if(this._contentArea) {
      this._doRender();
    }
  }

  private _doRender(){
    var root = this._renderEngine.render(this._documentRoot) as DocumentFragment;
    this._contentArea.setContent(root as DocumentFragment);
  }

}