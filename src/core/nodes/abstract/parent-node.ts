import RteNode from "./rte-node";

export default abstract class ParentNode<T extends RteNode> implements RteNode {
    private _children:Array<T> = [];

    get children(): Array<T> {
        return this._children;
    }

    constructor(children:Array<T> = null){
        if(children){
            this._children = children;
        }
    }

    public appendChild(child:T) {
        this._children.push(child);
    }

    public hasChildren():boolean{
        return this._children.length > 0;
    }
}