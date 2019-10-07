import RenderEngine from "../../render-engine";
import TextNode from "../../nodes/concrete/text-node";
import RteNodeRenderer from "../abstract/rte-node-renderer";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): Node {
        var root = document.createTextNode(node.value);

        return root;
    }
}
