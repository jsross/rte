import RteNode from "../nodes/abstract/rte-node";
import RenderResult from "../render-result";
import RenderEngine from "../render-engine";
import TextNode from "../nodes/concrete/text-node";
import RteNodeRenderer from "../rte-node-renderer";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): RenderResult {
        var map: Map<Node, RteNode> = new Map<Node, RteNode>();
        var root = document.createTextNode(node.value);
        map.set(root, node);
        
        let result = new RenderResult(root, map);

        return result;
    }
}
