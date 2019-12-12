import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "@src/components/content-area/content-area-element"
import DocumentFragmentNode from '@src/core/nodes/concrete/document-fragment-node';
import KeyPipe, { KeyPipePayload } from '@src/core/keyPipeline/key-pipe';
import LoggerPipe from '@src/core/keyPipeline/logger-pipe';
import ContentSelection from '@src/core/content-selection';
import BackspaceListener from '@src/core/keyPipeline/backspace-listener';
import CharacterKeyListener from '@src/core/keyPipeline/character-key-listener';
import DocumentManagerFactory from '@src/core/document-management/document-manager-factory';
import DocumentManager from '@src/core/document-management/document-manager';
import RteConfig from '@src/core/config/rte-config';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _keyPipeline: KeyPipe[];
  private _documentManagerFactory: DocumentManagerFactory;
  private _documentManager: DocumentManager;

  static get styles() {    
    return [ css`
    :host { 
      display: inline-block;
    }`];
  }

  constructor(){
    super();
    RteConfig.configure();
    
    this._keyPipeline = new Array<KeyPipe>();
    this._keyPipeline.push(new LoggerPipe());
    this._keyPipeline.push(new BackspaceListener());
    this._keyPipeline.push(new CharacterKeyListener());

    this._documentManagerFactory = RteConfig.container.resolve(DocumentManagerFactory);
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

  public setValue(value:DocumentFragmentNode) {
    this._documentManager = this._documentManagerFactory.createInstance(value);
    var root = this._documentManager.init();
    
    this._contentArea.setContent(root);
  }

  private _handleRteKeyboardEvent(event:CustomEvent) {
    let key:string = event.detail.key;
    let selection:ContentSelection = event.detail.selection;

    var payload = new KeyPipePayload(key, selection.AnchorPointer, selection.FocusPointer);

    this._keyPipeline.forEach(pipe => {
      payload = pipe.process(payload);
    });

    if(payload.operations.length > 0) {
      var result = this._documentManager.executeOperations(payload.operations);

      this._contentArea.setContent(result);
      this._contentArea.setSelection(selection.AnchorPointer);
    }
  }

}