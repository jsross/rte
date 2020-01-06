import RteOperation from "./rte-operation";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DeleteOperation extends RteOperation{
    constructor(start:HierarchyPath, end:HierarchyPath) {
        super(start,end);
    }
 }