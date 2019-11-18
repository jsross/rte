import HierarchyPath from "./hierarchy-path";

export default class RenderResult {
    public readonly nodes : Node[];
    public readonly map : Map<string, string> = new Map<string, string>();

    constructor(nodes: Node[], map: Map<string, string>){
        this.nodes = nodes;
        this.map = map;
    }
}