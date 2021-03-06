import RenderEngine from "@src/core/render-engine";
import TextNode from "./text-node";
import DocumentTreeNodeRenderer from "@src/core/renderers/abstract/document-tree-node-renderer";
import RenderResult from "@src/core/render-result";
import HierarchyPath from "@src/core/hierarchy-path";
import HierarchyPathMap from "@src/core/hierachy-path-map";

export default class TextNodeRenderer implements DocumentTreeNodeRenderer<TextNode>{
    
    public render(node: TextNode, engine: RenderEngine, context:Map<string,any>): RenderResult {
        var map = new HierarchyPathMap();

        var root = document.createElement('span');

        if(node.styles){
            root.className = node.styles.join(' ');
        }

        var sourcePath = context.get('sourcePath') as HierarchyPath;
        var destPath = context.get('destPath') as HierarchyPath;   
        
        var content = node.content.replace(/ /g, '\u205f');

        var currentLine = "";

        var index = 0

        for (; index < content.length; index++) {
            var char = content.charAt(index);

            if(char === '\n'){
                if(currentLine.length > 0) {
                    root.appendChild(document.createTextNode(currentLine));
                    currentLine = "";
                }
                
                root.appendChild(document.createElement('br')); 

                map.addEntry(sourcePath.getChild(index),destPath.getChild(root.childNodes.length - 1));
            }
            else {
                currentLine += char;

                map.addEntry(sourcePath.getChild(index),destPath.getChild(root.childNodes.length).getChild(currentLine.length - 1));
            }
        }

        root.appendChild(document.createTextNode(currentLine));

        map.addEntry(sourcePath.getChild(index),destPath.getChild(root.childNodes.length - 1).getChild(currentLine.length));

        var result = new RenderResult(root, map);

        return result;
    }
}
