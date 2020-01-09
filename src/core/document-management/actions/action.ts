import HierarchyPath from "@src/core/hierarchy-path";

export default abstract class Action {
 
    public path:HierarchyPath;

    constructor(path:HierarchyPath){
        this.path = path;
    }
}