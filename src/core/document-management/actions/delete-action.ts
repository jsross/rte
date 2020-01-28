import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DeleteAction extends Action {

    public startPath:HierarchyPath;
    public endPath:HierarchyPath;

    constructor(targetPath: HierarchyPath, startPath:HierarchyPath, endPath:HierarchyPath){
        super(targetPath);

        this.startPath = startPath;
        this.endPath = endPath;
    }
    
}