import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import {ContentAreaElement} from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import { CaretSprite, CaretUpdate } from '../overlay/models/caret-sprite';
import { OverlayElement } from '../overlay/overlay-element';
import RteNode from '../../core/nodes/abstract/rte-node';
const _html = html;

@customElement('mojj-rte')
export class RteElement extends LitElement {
  
  private _html: any;

  private contentArea: ContentAreaElement;
  private overlay: OverlayElement;
  private renderEngine: RenderEngine;
  private root: RteNode;

  private caretSprite:CaretSprite;

  static get styles() {
    return [ css`
    :host { 
      display: inline-block;
      width: 300px;
      position:relative;
    }

    #overlay {
      width: 100%;
      height: 100%;
      position:absolute;
      pointer-events: none;
    }

    #content-area {
        width: 100%;
        height: 100%; 
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
  }

  public firstUpdated() {
    this.contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this.overlay = this.shadowRoot.getElementById('overlay') as OverlayElement;

    if(this.root) {
      var content = this.renderEngine.render(this.root);
      this.contentArea.setContent(content.nodes);
    }

    this.contentArea.addEventListener('caret-update', this._handleEvent_caret_update.bind(this));
    this.contentArea.addEventListener('caret-removed', this._handleEvent_caret_removed.bind(this));

    this.overlay.start();
  }

  private _handleEvent_keydown(event: KeyboardEvent){
    event.preventDefault();

    console.log(event);
  }

  private _handleEvent_caret_removed(event: CustomEvent) {
    if(this.caretSprite != null) {
      this.overlay.removeSprite(this.caretSprite);

      this.caretSprite = null;
    }
  }

  private _handleEvent_caret_update(event: CustomEvent){
    if(this.caretSprite == null) {
      this.caretSprite = this.overlay.addCaretSprite();
    }

    var update: CaretUpdate = {
      x: event.detail.relativeX,
      y: event.detail.relativeY,
      timeStamp: event.timeStamp,
      lineHeight: event.detail.height,
      stroke: 2
    };

    this.caretSprite.scheduleUpdate(update);

    this.overlay.updateNow();
  }

}