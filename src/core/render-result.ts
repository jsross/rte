import HierarchyPath from "./hierarchy-path";

export default class RenderResult {
    public readonly root : Node;
    public map : Map<Node, HierarchyPath> = new Map<Node, HierarchyPath>();

    constructor(root: Node){
        this.root = root;
    }

    append(child: RenderResult, path: HierarchyPath) {        
        this.root.appendChild(child.root);

        this.map.set(child.root, path);

        for(var node of child.map.keys()){
            var nodePath:HierarchyPath = child.map.get(node);
            var newNodePath = path.concat(nodePath);

            this.map.set(node, newNodePath);
        }
    }
}