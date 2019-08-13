import RteNode from "./rte-node";

export default class ParentNode implements RteNode {
    private _children:Array<RteNode> = [];

    get children(): Array<RteNode> {
        return this._children;
    }

    public type: string;

    constructor(type: string, children:Array<RteNode>){
        this.type = type;
        
        if(children){
            this._children = children;
        }
    }

    public hasChildren():boolean{
        return this._children.length > 0;
    }
}