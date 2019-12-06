import RteOperation from "./rte-operation";
import HierarchyPath from "../../hierarchy-path";
import RteNode from "../../nodes/abstract/rte-node";

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