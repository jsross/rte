import HierarchyPath from "../hierarchy-path";
import RteNode from "../nodes/abstract/rte-node";

export default abstract class RteOperation{

    public start: HierarchyPath;
    public end: HierarchyPath;

    constructor(start:HierarchyPath, end:HierarchyPath = null) {
        this.start = start;
        this.end = end;
    }

    abstract execute(root:RteNode):void;
}