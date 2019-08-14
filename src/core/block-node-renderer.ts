import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";
import BlockNode from "../models/block-node";

export default class BlockNodeRenderer {
    public render(node: RteNode, engine: RenderEngine): RenderResult {
        let blockNode = node as BlockNode;

        if(blockNode === null) {
            throw Error('Unable to render node');
        }

        var div = document.createElement('div');
        
        if(blockNode.styles){
            div.className = blockNode.styles.join(' ');
        }

        var result = new RenderResult(div, blockNode);

        if(blockNode.hasChildren()){
            for(let index = 0; index < blockNode.children.length; index++) {
                var current = blockNode.children[index];

                var currentResult = engine.render(current);

                result.append(currentResult);
            }
        }

        return result;
    }
}
