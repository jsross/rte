import HierarchyPathMap from "./hierachy-path-map";

export default class RenderResult {
    public readonly root : Node;
    public readonly map : HierarchyPathMap;

    constructor(root: Node, map: HierarchyPathMap){
        this.root = root;
        this.map = map;
    }
}