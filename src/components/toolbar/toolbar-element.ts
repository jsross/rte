import { LitElement, html, customElement, property } from 'lit-element';
import * as view from "./template.html";

@customElement('tool-bar')
export class ToolbarElement extends LitElement {
  constructor(){
    super();
  }

  public render() {
    const _html = html;
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }

  private _handleClick(){}
}