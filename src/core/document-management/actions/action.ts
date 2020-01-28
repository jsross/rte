import HierarchyPath from "@src/core/hierarchy-path";

export default abstract class Action {
 
    public targetPath:HierarchyPath;

    constructor(targetPath:HierarchyPath){
        this.targetPath = targetPath;
    }
}