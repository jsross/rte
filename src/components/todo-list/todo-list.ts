import {
  LitElement, html, customElement, property
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import * as view from "./template.html"
import {TodoItem} from '../../models/todo-item';
const cloneDeep = require('lodash.clonedeep');
const uuidv1 = require('uuid/v1');

const _html = html;
const _repeat = repeat;

@customElement('todo-list')
export class TodoList extends LitElement {

  @property({type: Array})
  private _todoWrappers: Array<ItemWrapper> = [];

  private _html: any;
  private _repeat: any;

  constructor(){
    super();
  }

  get value(): Array<TodoItem> {
    var result: Array<TodoItem> = [];

    this._todoWrappers.forEach(function(item){
      result.push(cloneDeep(item.model));
    }, this);

    return result;
  }

  set value(value: Array<TodoItem>) {
    this._todoWrappers = [];

    value.forEach(function(item){
      var model: TodoItem = cloneDeep(item);

      var wrapper = {
        id: uuidv1(),
        model: model
      }
      
      this._todoWrappers.push(wrapper);
    }, this);
  }

  public addTask(value: string) {
    var model: TodoItem = {
      task: value,
      isComplete: false
    }

    var wrapper: ItemWrapper = {
      id: uuidv1(),
      model: model
    }

    this._todoWrappers.push(wrapper);

    this.requestUpdate();
  }

  public render() {
    return this.__getTemplateResult();
  }

  private _handleClick_delete(wrapper: ItemWrapper, event: Event) {
    var index = this._todoWrappers.indexOf(wrapper);
    
    this._todoWrappers = this._todoWrappers.filter(function(val, i){
      return i !== index;
    });

    this.requestUpdate();
    this._sendChangEvent();
  }

  private _handleChange_todoItem(event: Event) {
    console.log(event);

    this._sendChangEvent();
  }

  private _sendChangEvent(){
    var changEvent = new Event('change');

    this.dispatchEvent(changEvent);
  }

  private __getTemplateResult(){
    let code: string = '_html`' + view + "`";

    var result = eval(code);

    return result;
  }
}

interface ItemWrapper {
  id: string;
  model: TodoItem;
}