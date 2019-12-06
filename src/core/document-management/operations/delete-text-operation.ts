import RteOperation from "./rte-operation";
import HierarchyPath from "@src/core/hierarchy-path";
import RteNode from "@src/core/nodes/abstract/rte-node";

export default class DeleteTextOperation extends RteOperation{

    private _count:number;

    constructor(start: HierarchyPath, count:number){
        super(start);
        this._count = count;
    }

    execute(root:RteNode): void {
        root.deleteText(this.start, this._count);
    }
}