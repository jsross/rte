import DocumentTreeNode from "./document-tree-node";

export default abstract class ParentNode<T extends DocumentTreeNode> extends DocumentTreeNode {
    private _children:Array<T> = [];

    get children(): Array<T> {
        return this._children;
    }

    constructor(children:Array<T> = null){
        super();

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

    public insertChildAtIndex(child:T, index:number){
        this._children.splice(index, 0, child);
    }
    
}