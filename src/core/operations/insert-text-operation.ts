import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";
import RteNode from "../nodes/abstract/rte-node";

export class InsertTextOperation extends RteOperation{
    
    private _value:string = null;
    private _index:number = 0;

    constructor(start: HierarchyPath, value: string, index:number){
        super(start);

        this._value = value;
        this._index = index;
    }

    execute(root: RteNode): void {
        root.insertText(this.start, this._value, this._index);
    }

}