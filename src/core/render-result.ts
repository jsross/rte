import RteNode from "./nodes/abstract/rte-node";

export default class RenderResult {
    public root: Node;
    public map : Map<Node, RteNode> = new Map<Node, RteNode>();

    constructor(root: Node, map: Map<Node, RteNode>){
        this.root = root;
        this.map = map;
    }
}