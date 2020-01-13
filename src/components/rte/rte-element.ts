import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "@src/components/content-area/content-area-element"
import RootNode from '@src/core/nodes/concrete/root-node';
import KeyPipe, { KeyPipePayload } from '@src/core/keyPipeline/key-pipe';
import LoggerPipe from '@src/core/keyPipeline/logger-pipe';
import ContentSelection from '@src/core/content-selection';
import BackspaceListener from '@src/core/keyPipeline/backspace-listener';
import CharacterKeyListener from '@src/core/keyPipeline/character-key-listener';
import DocumentManager from '@src/core/document-management/document-manager';
import RteConfig from '@src/core/config/rte-config';
import KeyEvent from '@src/core/document-management/key-event';
import { Subject } from 'rxjs'
import RenderEngine from '@src/core/render-engine';
import HierarchyPathMap from '@src/core/document-management/hierachy-path-map';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _keyPipeline: KeyPipe[];
  private _renderEngine: RenderEngine;
  private _documentManager: DocumentManager;
  private _documentMap: HierarchyPathMap;
  private _keySubject: Subject<KeyEvent>;

  static get styles() {    
    return [ css`
    :host { 
      display: inline-block;
    }`];
  }

  constructor(){
    super();

    RteConfig.configure();

    this._keySubject = new Subject<KeyEvent>();

    this._keyPipeline = new Array<KeyPipe>();
    this._keyPipeline.push(new LoggerPipe());
    this._keyPipeline.push(new BackspaceListener());
    this._keyPipeline.push(new CharacterKeyListener());

    this._renderEngine = RteConfig.container.resolve(RenderEngine);
  }

  public firstUpdated() {
    this._contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this._contentArea.addEventListener('rte-keyboard-event', this._handleRteKeyboardEvent.bind(this));
  }

  public render() {
    const _html = html;
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public setValue(value:RootNode) {
    if(this._documentManager != null) {
      this._documentManager.destroy();
      this._documentManager = null;
    }

    this._documentManager = new DocumentManager(value, this._keySubject);

    var renderResult = this._renderEngine.render(value);

    this._documentMap = renderResult.map;
    this._contentArea.setContent(renderResult.root as DocumentFragment);
  }

  private _handleRteKeyboardEvent(event:CustomEvent) {
    let key:string = event.detail.key;
    let selection:ContentSelection = event.detail.selection;

    var payload = new KeyPipePayload(key, selection);

    this._keyPipeline.forEach(pipe => {
      payload = pipe.process(payload);
    });

    var start = this._documentMap.findLeft(payload.selection.AnchorPointer);
    var end = payload.selection.FocusPointer ? this._documentMap.findLeft(payload.selection.FocusPointer) : null;

    this._keySubject.next(new KeyEvent(key, start, end));
  }

}