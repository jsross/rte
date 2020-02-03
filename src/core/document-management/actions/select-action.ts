import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class SelectAction extends Action {
    public startPath:HierarchyPath;
    public endPath:HierarchyPath;

    constructor(target:HierarchyPath, startPath:HierarchyPath, endPath:HierarchyPath){
        super(target);
        
        this.startPath = startPath;
        this.endPath = endPath;
    }
}