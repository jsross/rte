export default class ParentNode extends Node {
    private _children:Array<Node> = [];

    constructor(){
        super();
    }

    public hasChildren():boolean{
        return this._children.length > 0;
    }
}