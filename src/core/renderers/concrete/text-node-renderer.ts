import RenderEngine from "../../render-engine";
import TextNode from "../../nodes/concrete/text-node";
import RteNodeRenderer from "../abstract/rte-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): RenderResult {
        var nodes = new Array<Node>();
        var map = new Map<HierarchyPath, HierarchyPath>();
        
        var lines:string[] = null;
        var content = node.value;

        content = content.replace(/ /g, '\u205f');

        if(content.includes('\n')){
            lines = content.split('\n');
        }
        else {
            lines = [content];
        }

        lines.forEach((line, index) => {
            if(index > 0){
                var br = document.createElement('br');             
                nodes.push(br);
            }

            var textNode = document.createTextNode(line);
            nodes.push(textNode);
        });

        var result = new RenderResult(nodes, map);

        return result;
    }
}
