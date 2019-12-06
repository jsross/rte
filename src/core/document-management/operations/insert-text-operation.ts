import HierarchyPath from "../../hierarchy-path";
import RteOperation from "./rte-operation";
import RteNode from "../../nodes/abstract/rte-node";

export default class InsertTextOperation extends RteOperation{
    
    private _value:string = null;

    constructor(start: HierarchyPath, value: string){
        super(start);

        this._value = value;
    }

    execute(root: RteNode): void {
        root.insertText(this.start, this._value);
    }

}