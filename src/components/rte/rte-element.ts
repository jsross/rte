import { LitElement, html, customElement, css } from 'lit-element';
import * as view from "./template.html";
import {ContentAreaElement} from "../content-area/content-area-element"
import RenderEngine from '../../core/render-engine';
import TextNode from '../../models/text-node';
import ParentNode from '../../models/parent-node';
import BlockNode from '../../models/block-node';
import RteNode from '../../models/rte-node';
import ListNode from '../../models/list-node';
const _html = html;

@customElement('mojj-rte')
export class RteElement extends LitElement {
  
  private _html: any;

  private contentArea: ContentAreaElement;
  private renderEngine: RenderEngine;
  private root: ParentNode<RteNode>;

  static get styles() {
    return [ css`
    :host { 
      display: inline-block;
    }`];
  }

  constructor(){
    super();

    this.renderEngine = new RenderEngine();
    
    this.root = new ParentNode<RteNode>();
    this.root.appendChild(new BlockNode([new TextNode('Hello '), new TextNode('World', ['bigger']), new TextNode('!!!')]));
    this.root.appendChild(new BlockNode([new TextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'), new TextNode(' magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta. Duis ultricies lacus sed turpis.')]));
    this.root.appendChild(new BlockNode([new TextNode('Signed,\nme')], ['style1', 'style2']));

    var list = new ListNode();
    list.appendChild(new ParentNode([new TextNode('Item 1')]));
    list.appendChild(new ParentNode([new TextNode('Item 2')]));

    this.root.appendChild(list);
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
  }

  private _handleEvent_keydown(event: KeyboardEvent){
    event.preventDefault();

    console.log(event);
  }

}