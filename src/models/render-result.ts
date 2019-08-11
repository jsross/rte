import RteNode from "./rte-node";

export default class RenderResult {
    public root: Node;
    public map : Map<Node, RteNode> = new Map<Node, RteNode>();

    constructor(root: Node, source: RteNode){
        this.root = root;
        this.map.set(root, source);
    }

    public append(child: RenderResult){
        this.root.appendChild(child.root);

        for (let entry of child.map) {
            this.map.set(entry[0],entry[1]);
        }
    }
}