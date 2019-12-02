import RenderEngine from "../../render-engine";
import TextNode from "../../nodes/concrete/text-node";
import RteNodeRenderer from "../abstract/rte-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";
import HierarchyPathMap from "../../hierachy-path-map";

export default class TextNodeRenderer implements RteNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine): RenderResult {
        var map = new HierarchyPathMap();

        var root = document.createElement('span');

        if(node.styles){
            root.className = node.styles.join(' ');
        }
        
        map.setLeftToRight(HierarchyPath.createRoot(), HierarchyPath.parse('/0'));
        
        var content = node.value.replace(/ /g, '\u205f');

        var currentLine = "";
        var nodeOffset = 0;
        var nodeCount = 0;

        for (var index = 0; index < content.length; index++) {
            var char = content.charAt(index);

            if(char === '\n'){
                root.appendChild(document.createTextNode(currentLine));
                nodeCount++

                map.setLeftToRight(HierarchyPath.parse(`/${nodeCount - 1}`),
                                   HierarchyPath.parse(`/${nodeOffset}`));

                var br = document.createElement('br');             
                root.appendChild(br); 
                nodeCount++;

                map.setLeftToRight(HierarchyPath.parse(`/${nodeCount - 1}`),
                                   HierarchyPath.parse(`/${index}`));

                nodeOffset = index + 1;
                currentLine = "";
            }
            else {
                currentLine += char;
            }
        }

        root.appendChild(document.createTextNode(currentLine));
        nodeCount++;

        map.setLeftToRight(HierarchyPath.parse(`/${nodeCount - 1}`), HierarchyPath.parse(`/${nodeOffset}`));

        var result = new RenderResult(root, map);

        return result;
    }
}
