import HierarchyPath from "../hierarchy-path";

export default abstract class RteOperation{

    public start: HierarchyPath;
    public end: HierarchyPath;

    constructor(start:HierarchyPath, end:HierarchyPath = null) {
        this.start = start;
        this.end = end;
    }
}