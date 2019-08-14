import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";
import TextNode from "../models/text-node";

export default class TextNodeRenderer {
    public render(node: RteNode, engine: RenderEngine): RenderResult {
        let textNode = node as TextNode;

        if(textNode === null) {
            throw Error('Unable to render node');
        }

        var text = document.createTextNode(textNode.value);

        if(textNode.styles === null){
            let result = new RenderResult(text,textNode);
            return result;
        }

        var span = document.createElement('span');
        span.appendChild(text);
        span.className = textNode.styles.join(' ');

        let result = new RenderResult(span, node)

        return result;


    }
}
