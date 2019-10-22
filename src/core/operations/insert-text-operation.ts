import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";
import RteNode from "../nodes/abstract/rte-node";

export class InsertTextOperation extends RteOperation{
    
    private _value:string = null;

    constructor(start: HierarchyPath, value: string){
        super(start);

        this._value = value;
    }

    execute(root: RteNode): void {
        root.insertText(this.start, this._value);
    }

}