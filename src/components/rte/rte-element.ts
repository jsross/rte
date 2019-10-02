import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import RteNode from '../../core/nodes/abstract/rte-node';
import ArrowKeyListener from './arrow-key-listener';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _renderEngine: RenderEngine;
  private _root: RteNode;

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

    if(this._root) {
      var renderResult = this._renderEngine.render(this._root);
      this._contentArea.setContent(renderResult.root as DocumentFragment);
    }
  }

  public render() {
    const _html = html;
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public setValue(root:RteNode) {
    this._root = root;

    if(this._contentArea) {
      var renderResult = this._renderEngine.render(this._root);
      this._contentArea.setContent(renderResult.root as DocumentFragment);
    }
  }

}