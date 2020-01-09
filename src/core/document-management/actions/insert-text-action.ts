import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class InsertTextAction extends Action {

    public value: string;

    constructor(path:HierarchyPath, value: string){
        super(path);

        this.value = value;
    }
}