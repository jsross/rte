import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";

export class DeleteOperation extends RteOperation{

    public value:string = null;

    constructor(start: HierarchyPath, end: HierarchyPath){
        super(start, end);
    }
}