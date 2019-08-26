import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";
import BlockNode from "../models/block-node";
import DocumentNode from "../models/document-node";

export default class DocumentNodeRenderer {
    public render(node: RteNode, engine: RenderEngine): RenderResult {
        let documentNode = node as DocumentNode;
        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        if(documentNode === null) {
            throw Error('Unable to render node');
        }

        var nodes: Array<Node> = [];

        if(documentNode.hasChildren()){
            for(let index = 0; index < documentNode.children.length; index++) {
                var current = documentNode.children[index];

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
