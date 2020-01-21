import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DeleteAction extends Action {

    public endPath: HierarchyPath;

    constructor(startPath:HierarchyPath, endPath:HierarchyPath){
        super(startPath);

        this.endPath = endPath;
    }
    
}