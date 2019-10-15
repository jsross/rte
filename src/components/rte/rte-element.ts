import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import DocumentFragmentNode from '../../core/nodes/concrete/document-fragment-node';
import KeyPipe, { KeyPipePayload } from '../../core/keyPipeline/key-pipe';
import LoggerPipe from '../../core/keyPipeline/logger-pipe';
import ContentSelection from '../../core/content-selection';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _renderEngine: RenderEngine;
  private _documentRoot: DocumentFragmentNode;
  private _keyPipeline: KeyPipe[];

  static get styles() {    
    return [ css`
    :host { 
      display: inline-block;
    }`];
  }

  constructor(){
    super();
    this._keyPipeline = new Array<KeyPipe>();

    this._renderEngine = new RenderEngine();
    this._keyPipeline.push(new LoggerPipe());
  }

  public firstUpdated() {
    this._contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this._contentArea.addEventListener('rte-keyboard-event', this._handleRteKeyboardEvent.bind(this))

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

  private _handleRteKeyboardEvent(event:CustomEvent) {
    let key:string = event.detail.key;
    let selection:ContentSelection = event.detail.selection;

    var payload = new KeyPipePayload(key, selection);

    this._keyPipeline.forEach(pipe => {
      payload = pipe.process(payload);
    });
  }

}