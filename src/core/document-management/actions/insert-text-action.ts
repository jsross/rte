import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class InsertTextAction extends Action {

    public value: string;
    public indexPath: HierarchyPath;

    constructor(target:HierarchyPath, indexPath: HierarchyPath, value: string){
        super(target);

        this.indexPath = indexPath;
        this.value = value;
    }
}