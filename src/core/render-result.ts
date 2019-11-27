import HierarchyPath from "./hierarchy-path";
import HierarchyPathMap from "./hierachy-path-map";

export default class RenderResult {
    public readonly nodes : Node[];
    public readonly map : HierarchyPathMap;

    constructor(nodes: Node[], map: HierarchyPathMap){
        this.nodes = nodes;
        this.map = map;
    }
}