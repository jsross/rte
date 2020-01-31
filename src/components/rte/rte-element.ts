import { LitElement, html, customElement, css } from 'lit-element';
import ContentAreaElement from "@src/components/content-area/content-area-element"
import RootNode from '@src/core/nodes/concrete/root-node';
import KeyPipe, { KeyPipePayload } from '@src/core/keyPipeline/key-pipe';
import LoggerPipe from '@src/core/keyPipeline/logger-pipe';
import ContentSelection from '@src/core/content-selection';
import DocumentManager from '@src/core/document-management/document-manager';
import RteConfig from '@src/core/config/rte-config';
import KeyEvent from '@src/core/document-management/key-event';
import { Subject, Observer } from 'rxjs'
import RenderEngine from '@src/core/render-engine';
import HierarchyPathMap from '@src/core/hierachy-path-map';
import HierarchyPath from '@src/core/hierarchy-path';
import DocumentChangeEvent from '@src/core/document-management/document-change-event';

@customElement('mojj-rte')
export default class RteElement extends LitElement {
  
  private _contentArea: ContentAreaElement;
  private _keyPipeline: KeyPipe[];
  private _renderEngine: RenderEngine;
  private _documentChangeObserver:Observer<DocumentChangeEvent>;
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

    this._renderEngine = RteConfig.container.resolve(RenderEngine);
    this._documentChangeObserver = {
      next: this._handleDocumentChange.bind(this),
      error: null,
      complete: null
    }
  }

  public disconnectedCallback() {
    super.disconnectedCallback();

    if(this._documentManager) {
      this._documentManager.destroy();
    }
  }

  public firstUpdated() {
    this._contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this._contentArea.addEventListener('contentArea:keyEvent', this._handleEvent_contentArea_keyEvent.bind(this));
    this._contentArea.addEventListener('contentArea:selectionChange', this._handleEvent_contentArea_selectionChange.bind(this));
  }

  public render(){
    return html`<content-area id='content-area'></content-area>`;
  }

  public setValue(value:RootNode) {
    if(this._documentManager != null) {
      this._documentManager.destroy();
      this._documentManager = null;
    }

    this._documentManager = new DocumentManager(value, this._keySubject);

    this._documentManager.onChange(this._documentChangeObserver);

    var renderResult = this._renderEngine.render(value);

    this._documentMap = renderResult.map;
    this._contentArea.setContent(renderResult.root as DocumentFragment);
  }

  private _handleDocumentChange(event:DocumentChangeEvent) {
    console.log(`_handleDocumentChange:${event.path.toString()}`);
    
    var renderResult = this._renderEngine.render(event.node);

    this._documentMap = renderResult.map;
    this._contentArea.setContent(renderResult.root as DocumentFragment);

    if(event.selection) {
      var start:HierarchyPath = this._documentMap.findRight(event.selection.AnchorPointer);
      var end:HierarchyPath = event.selection.FocusPointer ? this._documentMap.findRight(event.selection.FocusPointer) : null;

      this._contentArea.setSelection(start, end);
    }
    
  }

  private _handleEvent_contentArea_selectionChange(event:CustomEvent) {
    let contentSelection:ContentSelection = event.detail.selection;
    let documentSelection:ContentSelection = null;

    if(contentSelection) {
      var anchor = this._documentMap.findLeft(contentSelection.AnchorPointer);
      var focus = contentSelection.FocusPointer ? this._documentMap.findLeft(contentSelection.FocusPointer) : null;

      documentSelection = new ContentSelection(anchor, focus);
    }

    this._documentManager.setSelection(documentSelection);
  }

  private _handleEvent_contentArea_keyEvent(event:CustomEvent) {
    let key:string = event.detail.key;
    let selection:ContentSelection = event.detail.selection;

    var payload = new KeyPipePayload(key, selection);

    this._keyPipeline.forEach(pipe => {
      payload = pipe.process(payload);
    });

    var start = this._documentMap.findLeft(payload.selection.AnchorPointer);
    var end = payload.selection.FocusPointer ? this._documentMap.findLeft(payload.selection.FocusPointer) : null;

    this._keySubject.next(new KeyEvent(key, [], start, end));
  }

}