import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class InsertTextAction extends Action {

    public value: string;
    public index: number;

    constructor(target:HierarchyPath, index: number, value: string){
        super(target);

        this.index = index;
        this.value = value;
    }
}