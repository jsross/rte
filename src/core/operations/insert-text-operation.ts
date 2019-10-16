import RteOperation from "./rte-operation";
import HierarchyPath from "../hierarchy-path";
import RteNode from "../nodes/abstract/rte-node";

export class InsertTextOperation extends RteOperation{
    
    public value:string = null;

    constructor(start: HierarchyPath, value: string){
        super(start);

        this.value = value;
    }

    execute(root: RteNode): void {
        throw new Error("Method not implemented.");
    }

}