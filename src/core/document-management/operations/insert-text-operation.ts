import HierarchyPath from "@src/core/hierarchy-path";
import RteOperation from "./rte-operation";

export default class InsertTextOperation extends RteOperation{
    
    public value:string = null;

    constructor(value: string, start: HierarchyPath, end: HierarchyPath = null){
        super(start, end);

        this.value = value;
    }

}