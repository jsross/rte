import RteNode from "./rte-node";
import HierarchyPath from "../../hierarchy-path";
import RteNodeEvent from "./rte-node-event";

export default abstract class ParentNode<T extends RteNode> extends RteNode {
    private _children:Array<T> = [];

    get children(): Array<T> {
        return this._children;
    }

    constructor(children:Array<T> = null){
        super();

        if(children){
            this._children = children;

            for(var child of this._children){
                child.addListener(this._childListener.bind(this));
            }
        }
    }

    public appendChild(child:T) {
        this._children.push(child);

        child.addListener(this._childListener.bind(this));
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

    protected _childListener(event:RteNodeEvent) {
        var child = event.emitter as T;

        var childIndex = this.children.indexOf(child);
        var path = (new HierarchyPath([childIndex])).concat(event.path);
        var caret = (new HierarchyPath([childIndex])).concat(event.caretPosition);
        var toEmit = new RteNodeEvent(path, this, event.origin, caret);

        this._subject.next(toEmit);
    }
}