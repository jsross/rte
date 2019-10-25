import RenderEngine from "../../render-engine";
import TextNode from "../../nodes/concrete/text-node";
import RteNodeRenderer from "../abstract/rte-node-renderer";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): Node {
        var content = node.value.replace(/ /g, '\u205f');
        
        var root = document.createTextNode(content);

        return root;
    }
}
