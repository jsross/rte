import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
import {ContentAreaElement} from "../content-area/content-area-element"
import Renderer from '../../core/renderer';
import ParentNode from '../../models/parent-node'
import TextNode from '../../models/text-node';
const _html = html;

@customElement('mojj-rte')
export class RteElement extends LitElement {
  
  private _html: any;

  private contentArea: ContentAreaElement;
  private renderer: Renderer;
  private root: ParentNode;

  constructor(){
    super();

    this.renderer = new Renderer();
    this.root = new ParentNode(null);
    this.root.type = 'normal';
    this.root.children.push(new TextNode('Hello World'));
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  public firstUpdated() {
    this.contentArea = this.shadowRoot.getElementById('content-area') as ContentAreaElement;
    var content = this.renderer.render(this.root);
    this.contentArea.setContent([content.root]);
  }
}