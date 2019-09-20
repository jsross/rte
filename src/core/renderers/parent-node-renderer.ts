import RteNode from "../nodes/abstract/rte-node";
import ParentNode from "../nodes/abstract/parent-node";
import RenderResult from "../render-result";
import RenderEngine from "../render-engine";
import RteNodeRenderer from "../rte-node-renderer";

export default class BasicParentNodeRenderer implements RteNodeRenderer<ParentNode<RteNode>> {
    public render(node: ParentNode<RteNode>, engine: RenderEngine): RenderResult {
        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        var nodes: Array<Node> = [];

        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var current = node.children[index] as RteNode;

                var currentResult = engine.render(current);

                currentResult.nodes.forEach((node) => {
                    nodes.push(node);                    
                });

                for (let entry of currentResult.map) {
                    map.set(entry[0],entry[1]);
                }
            }
        }

        var result = new RenderResult(nodes, map);

        return result;
    }
}
