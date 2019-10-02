import RteNode from "../nodes/abstract/rte-node";
import RenderResult from "../render-result";
import RenderEngine from "../render-engine";
import RteNodeRenderer from "../rte-node-renderer";
import DocumentFragmentNode from "../nodes/concrete/document-fragment-node";

export default class DocumentFragmentNodeRenderer implements RteNodeRenderer<DocumentFragmentNode> {
    public render(node: DocumentFragmentNode, engine: RenderEngine): RenderResult {
        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        var root = document.createDocumentFragment();

        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var current = node.children[index] as RteNode;

                var currentResult = engine.render(current);

                root.appendChild(currentResult.root);

                for (let entry of currentResult.map) {
                    map.set(entry[0],entry[1]);
                }
            }
        }

        var result = new RenderResult(root, map);

        return result;
    }
}
