import HierarchyPath from "./hierarchy-path";

export default class RenderResult {
    public readonly nodes : Node[];
    public readonly map : Map<HierarchyPath, HierarchyPath> = new Map<HierarchyPath, HierarchyPath>();

    constructor(nodes: Node[], map: Map<HierarchyPath, HierarchyPath>){
        this.nodes = nodes;
        this.map = map;
    }
}