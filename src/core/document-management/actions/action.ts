import HierarchyPath from "@src/core/hierarchy-path";

export default abstract class Action {
 
    public startPath:HierarchyPath;

    constructor(startPath:HierarchyPath){
        this.startPath = startPath;
    }
}