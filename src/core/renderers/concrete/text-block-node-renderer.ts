import RenderEngine from "../../render-engine";
import TextBlockNode from "../../nodes/concrete/text-block-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class TextBlockNodeRenderer extends ParentNodeRenderer<TextBlockNode>{
    public render(node: TextBlockNode, engine: RenderEngine): RenderResult {
        var nodes:Node[] = [];
        var map = new Map<string, string>();
        map.set(HierarchyPath.createRoot().toString(), HierarchyPath.createRoot().toString());
        
        var root = document.createElement('div');
        
        nodes.push(root);

        if(node.type){
            root.className = node.type;
        }

        var result = new RenderResult(nodes, map);
        
        this._renderChildren(node, root, map, engine);

        return result;
    }
}
