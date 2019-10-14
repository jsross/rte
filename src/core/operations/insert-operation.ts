import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";

export class InsertOperation extends RteOperation{

    public value:string = null;

    constructor(start: HierarchyPath, end: HierarchyPath, value: string){
        super(start, end);

        this.value = value;
    }

}