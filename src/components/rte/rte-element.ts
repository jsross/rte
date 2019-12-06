import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "../content-area/content-area-element"
import DocumentFragmentNode from '../../core/nodes/concrete/document-fragment-node';
import KeyPipe, { KeyPipePayload } from '../../core/keyPipeline/key-pipe';
import LoggerPipe from '../../core/keyPipeline/logger-pipe';
import ContentSelection from '../../core/content-selection';
import BackspaceListener from '../../core/keyPipeline/backspace-listener';
import RteOperation from '../../core/operations/rte-operation';
import CharacterKeyListener from '../../core/keyPipeline/character-key-listener';
import RteNodeEvent from '../../core/nodes/abstract/rte-node-event';
import HierarchyPath from '../../core/hierarchy-path';
import DocumentManagerFactory from '../../core/document-management/document-manager-factory';
import Container from '../../core/ioc/container';
import DocumentManager from '../../core/document-management/document-manager';
import RteConfig from '../../core/config/rte-config';

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

    //this._internalDocument.addListener(this._handleRteNodeEvent.bind(this));
  }

  private _handleRteKeyboardEvent(event:CustomEvent) {
    let key:string = event.detail.key;
    let selection:ContentSelection = event.detail.selection;

    var payload = new KeyPipePayload(key, selection.AnchorPointer, selection.FocusPointer);

    this._keyPipeline.forEach(pipe => {
      payload = pipe.process(payload);
    });

    if(payload.operations.length > 0) {
      this._processOperations(payload.operations);
    }
  }

  private _processOperations(operations:RteOperation[]) {
    for(var operation of operations) {
      //operation.execute(this._internalDocument);      
    }
  }

  private _handleRteNodeEvent(event:RteNodeEvent){
    //var newContent = this._renderEngine.render(event.origin);

    //this._contentArea.updateNode(event.path, newContent.root);
    //this._contentArea.setSelection(event.caretPosition);
  }

}