import RenderEngine from "../../render-engine";
import TextNode from "../../nodes/concrete/text-node";
import RteNodeRenderer from "../abstract/rte-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): RenderResult {
        var nodes = new Array<Node>();
        var map = new Map<string, string>();
        
        var lines:string[] = null;
        var content = node.value;

        content = content.replace(/ /g, '\u205f');
        
        var currentLine = "";
        var nodeOffset = 0;

        for (var index = 0; index < content.length; index++) {
            var char = content.charAt(index);

            if(char === '\n'){
                nodes.push(document.createTextNode(currentLine));

                map.set(HierarchyPath.parse(`/${nodes.length - 1}`).toString(),
                        HierarchyPath.parse(`/${nodeOffset}`).toString());

                var br = document.createElement('br');             
                nodes.push(br); 

                map.set(HierarchyPath.parse(`/${nodes.length - 1}`).toString(),
                        HierarchyPath.parse(`/${index}`).toString());

                nodeOffset = index + 1;
            }
            else {
                currentLine += char;
            }
        }

        nodes.push(document.createTextNode(currentLine));

        map.set(HierarchyPath.parse(`/${nodes.length - 1}`).toString(),
                HierarchyPath.parse(`/${nodeOffset}`).toString());

        var result = new RenderResult(nodes, map);

        return result;
    }
}
