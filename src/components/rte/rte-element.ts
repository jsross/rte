import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";
const _html = html;

@customElement('mojj-rte')
export class RteElement extends LitElement {
  
  private _html: any;

  constructor(){
    super();
  }

  public render() {
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }
}