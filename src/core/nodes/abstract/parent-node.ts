import RteNode from "./rte-node";
import HierarchyPath from "../../hierarchy-path";

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

    public insertText(path: HierarchyPath, value: string): void {
        if(path.isRoot()){
            throw 'Cannot insert text directly on Parent Node'
        }

        var child = this.children[path.head];

        if(!child){
            throw 'Cannot resolve path: ' + path.toString();
        }

        child.insertText(path.tail, value);
    }

    public deleteText(path: HierarchyPath, count: number): void {
        if(path.isRoot()){
            throw 'Cannot insert text directly on Parent Node'
        }

        var child = this.children[path.head];

        if(!child){
            throw 'Cannot resolve path: ' + path.toString();
        }

        child.deleteText(path.tail, count);
    }
}