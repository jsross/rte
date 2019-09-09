import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import {ContentAreaElement} from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import ParentNode from '../../models/parent-node'
import TextNode from '../../models/text-node';
import DocumentNode from '../../models/document-node';
import BlockNode from '../../models/block-node';
import { CaretSprite, CaretUpdate } from '../overlay/models/caret-sprite';
import { OverlayElement } from '../overlay/overlay-element';
const _html = html;

@customElement('mojj-rte')
export class RteElement extends LitElement {
  
  private _html: any;

  private contentArea: ContentAreaElement;
  private overlay: OverlayElement;
  private renderEngine: RenderEngine;
  private root: DocumentNode;

  private caretSprite:CaretSprite;

  static get styles() {
    return [ css`
    :host { 
      display: block;
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
    
    this.root = new DocumentNode();
    this.root.children.push(new BlockNode([new TextNode('Hello\nWorld!')]));
    this.root.children.push(new BlockNode([new TextNode('Signed, me')], ['style1', 'style2']));
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public firstUpdated() {
    this.contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    this.overlay = this.shadowRoot.getElementById('overlay') as OverlayElement;

    var content = this.renderEngine.render(this.root);
    this.contentArea.setContent(content.nodes);

    this.contentArea.addEventListener('caret-update', this._handleEvent_caret_update.bind(this));

    this.overlay.start();
  }

  private _handleEvent_keydown(event: KeyboardEvent){
    event.preventDefault();

    console.log(event);
  }

  private _handleEvent_caret_update(event: CustomEvent){
    if(event.detail) {
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
    else {
      if(this.caretSprite != null) {
        this.overlay.removeSprite(this.caretSprite);

        this.caretSprite = null;
      }
    }
  }

}