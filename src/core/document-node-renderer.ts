import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";
import BlockNode from "../models/block-node";
import DocumentNode from "../models/document-node";

export default class DocumentNodeRenderer {
    public render(node: RteNode, engine: RenderEngine): RenderResult {
        let documentNode = node as DocumentNode;

        if(documentNode === null) {
            throw Error('Unable to render node');
        }

        var root = document.createElement('root');

        var result = new RenderResult(root, documentNode);

        if(documentNode.hasChildren()){
            for(let index = 0; index < documentNode.children.length; index++) {
                var current = documentNode.children[index];

                var currentResult = engine.render(current);

                result.append(currentResult);
            }
        }

        return result;
    }
}
