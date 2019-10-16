import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";
import RteNode from "../nodes/abstract/rte-node";

export class DeleteOperation extends RteOperation{

    constructor(start: HierarchyPath, end: HierarchyPath = null){
        super(start, end);
    }

    execute(root:RteNode): void {
        throw new Error("Method not implemented.");
    }
}