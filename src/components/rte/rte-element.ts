import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import {ContentAreaElement} from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import ParentNode from '../../models/parent-node'
import TextNode from '../../models/text-node';
import ContentEvent from '../../models/content-event';
import DocumentNode from '../../models/document-node';
import BlockNode from '../../models/block-node';
const _html = html;

@customElement('mojj-rte')
export class RteElement extends LitElement {
  
  private _html: any;

  private contentArea: ContentAreaElement;
  private renderEngine: RenderEngine;
  private root: DocumentNode;

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
    var content = this.renderEngine.render(this.root);

    this.contentArea.setContent(content.nodes);
    this.contentArea.addEventListener('content-event', this._handleEvent_contentEvent.bind(this));
  }

  private _handleEvent_contentEvent(event: ContentEvent) {
    console.log(event);
  }
}