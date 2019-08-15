import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";
import TextNode from "../models/text-node";

export default class TextNodeRenderer {
    
    public render(rteNode: RteNode, engine: RenderEngine): RenderResult {
        let rteTextNode = rteNode as TextNode;

        if(rteTextNode === null) {
            throw Error('Unable to render node');
        }

        var nodes:Node[] = [];
        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        var parts = rteTextNode.value.split('\n');

        parts.forEach((part, index, array) => {
            let text = document.createTextNode(part);
            nodes.push(text);
            map.set(text, rteNode);

            if (index < array.length - 1) { 
                let brElement = document.createElement('br');
                nodes.push(brElement);
            }
        });

        if(rteTextNode.styles === null){
            let result = new RenderResult(nodes, map);

            return result;
        }

        var span = document.createElement('span');
        map.set(span, rteNode);

        nodes.forEach((node) => {
            span.appendChild(node);
        });

        span.className = rteTextNode.styles.join(' ');

        let result = new RenderResult(span, map);

        return result;


    }
}
