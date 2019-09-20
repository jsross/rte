import RteNode from "./nodes/abstract/rte-node";

export default class RenderResult {
    public nodes: Node[];
    public map : Map<Node, RteNode> = new Map<Node, RteNode>();

    constructor(rendered: Node | Node[], map: Map<Node, RteNode>){
        if(rendered instanceof Node){
            this.nodes = [rendered as Node];
        }
        else {
            this.nodes = rendered as Node[];
        }

        this.map = map;
    }
}