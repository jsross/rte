import HierarchyPath from "./hierarchy-path";

export default class RenderResult {
    public readonly nodes : Node[];
    public readonly map : Map<HierarchyPath, HierarchyPath> = new Map<HierarchyPath, HierarchyPath>();

    constructor(nodes: Node[], map: Map<HierarchyPath, HierarchyPath>){
        this.nodes = nodes;
        this.map = map;
    }

    append(child: RenderResult, path: HierarchyPath) {        
        //this.map.set(child.root, path);

        for(var node of child.map.keys()){
            var nodePath:HierarchyPath = child.map.get(node);
            var newNodePath = path.concat(nodePath);

            this.map.set(node, newNodePath);
        }
    }
}