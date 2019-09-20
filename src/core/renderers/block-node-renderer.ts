import RteNode from "../nodes/abstract/rte-node";
import RenderResult from "../render-result";
import RenderEngine from "../render-engine";
import BlockNode from "../nodes/concrete/block-node";
import RteNodeRenderer from "../rte-node-renderer";

export default class BlockNodeRenderer implements RteNodeRenderer<BlockNode>{
    public render(node: BlockNode, engine: RenderEngine): RenderResult {

        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        var div = document.createElement('div');
        
        if(node.styles){
            div.className = node.styles.join(' ');
        }

        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var current = node.children[index];

                var currentResult = engine.render(current);

                currentResult.nodes.forEach((node) => {
                    div.appendChild(node);                    
                });

                for (let entry of currentResult.map) {
                    map.set(entry[0],entry[1]);
                }
            }
        }

        var result = new RenderResult(div, map);        

        return result;
    }
}
