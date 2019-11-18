import RenderEngine from "../../render-engine";
import BlockNode from "../../nodes/concrete/block-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class BlockNodeRenderer extends ParentNodeRenderer<BlockNode>{
    public render(node: BlockNode, engine: RenderEngine): RenderResult {
        var nodes:Node[] = [];
        var map = new Map<string, string>();
        map.set(HierarchyPath.createRoot().toString(), HierarchyPath.createRoot().toString());
        
        var root = document.createElement('div');
        
        nodes.push(root);

        if(node.styles){
            root.className = node.styles.join(' ');
        }

        var result = new RenderResult(nodes, map);
        
        this._renderChildren(node, root, map, engine);

        return result;
    }
}
