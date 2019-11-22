import RenderEngine from "../../render-engine";
import TextNode from "../../nodes/concrete/text-node";
import RteNodeRenderer from "../abstract/rte-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): RenderResult {
        var nodes = new Array<Node>();
        var map = new Map<string, string>();

        var root = document.createElement('span');

        if(node.styles){
            root.className = node.styles.join(' ');
        }
        
        nodes.push(root);
        map.set('/', '/0');
        
        var content = node.value.replace(/ /g, '\u205f');

        var currentLine = "";
        var nodeOffset = 0;
        var nodeCount = 0;

        for (var index = 0; index < content.length; index++) {
            var char = content.charAt(index);

            if(char === '\n'){
                root.appendChild(document.createTextNode(currentLine));
                nodeCount++

                map.set(HierarchyPath.parse(`/${nodeCount - 1}`).toString(),
                        HierarchyPath.parse(`/${nodeOffset}`).toString());

                var br = document.createElement('br');             
                root.appendChild(br); 
                nodeCount++;

                map.set(HierarchyPath.parse(`/${nodeCount - 1}`).toString(),
                        HierarchyPath.parse(`/${index}`).toString());

                nodeOffset = index + 1;
                currentLine = "";
            }
            else {
                currentLine += char;
            }
        }

        root.appendChild(document.createTextNode(currentLine));
        nodeCount++;

        map.set(HierarchyPath.parse(`/${nodeCount - 1}`).toString(),
                HierarchyPath.parse(`/${nodeOffset}`).toString());

        var result = new RenderResult(nodes, map);

        return result;
    }
}
