import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import ContentAreaElement from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import DocumentFragmentNode from '../../core/nodes/concrete/document-fragment-node';
import KeyPipe, { KeyPipePayload } from '../../core/keyPipeline/key-pipe';
import LoggerPipe from '../../core/keyPipeline/logger-pipe';
import ContentSelection from '../../core/content-selection';
import BackspaceListener from '../../core/keyPipeline/backspace-listener';
import RteOperation from '../../core/operations/rte-operation';
import CharacterKeyListener from '../../core/keyPipeline/character-key-listener';
import RteNodeEvent from '../../core/nodes/abstract/rte-node-event';
import HierarchyPath from '../../core/hierarchy-path';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _renderEngine: RenderEngine;
  private _internalDocument: DocumentFragmentNode;
  private _keyPipeline: KeyPipe[];
  private _map: Map<string,string>;

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
    this._keyPipeline.push(new BackspaceListener());
    this._keyPipeline.push(new CharacterKeyListener());
  }

  public firstUpdated() {
    this._contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this._contentArea.addEventListener('rte-keyboard-event', this._handleRteKeyboardEvent.bind(this));

    if(this._internalDocument) {
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
    this._internalDocument = value;

    this._internalDocument.addListener(this._handleRteNodeEvent.bind(this));

    if(this._contentArea) {
      this._doRender();
    }
  }

  private _doRender(){
    var result = this._renderEngine.render(this._internalDocument);
    var root = result.nodes[0] as DocumentFragment;
    this._map = result.map;

    for(var key of this._map.keys()) {
      var value = this._map.get(key);
      console.log(`${key}\t\t=>\t${value}`)
    }

    this._contentArea.setContent(root);
  }

  private _handleRteKeyboardEvent(event:CustomEvent) {
    let key:string = event.detail.key;
    let selection:ContentSelection = event.detail.selection;

    var payload = new KeyPipePayload(key, selection);

    this._keyPipeline.forEach(pipe => {
      payload = pipe.process(payload);
    });

    if(payload.operations.length > 0) {
      this._processOperations(payload.operations);
    }

    console.log(`${selection.AnchorPointer.toString()} : ${this._find(selection.AnchorPointer)}`);
  }

  private _processOperations(operations:RteOperation[]) {
    for(var operation of operations) {
      operation.execute(this._internalDocument);      
    }
  }

  private _handleRteNodeEvent(event:RteNodeEvent){
    console.log(event);
    var newContent = this._renderEngine.render(event.origin);
    console.log(newContent);

    if(newContent instanceof Text){
      var text = newContent as Text;
      this._contentArea.updateTextNode(event.path, text.textContent);
      this._contentArea.setSelection(event.caretPosition);
    }
  }

  private _find(path:HierarchyPath):string {
    while(!path.isRoot()) {
      if(this._map.has(path.toString())) {
        return this._map.get(path.toString());
      }

      path = path.getParent();
    }

    return null;
  }

}