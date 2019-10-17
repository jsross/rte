import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";
import RteNode from "../nodes/abstract/rte-node";

export class DeleteTextOperation extends RteOperation{

    private _index:number;
    private _count:number;

    constructor(start: HierarchyPath, index:number, count:number){
        super(start);
    }

    execute(root:RteNode): void {
        root.deleteText(this.start, this._index, this._count);
    }
}