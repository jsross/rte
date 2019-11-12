import RenderEngine from "../../render-engine";
import BlockNode from "../../nodes/concrete/block-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";

export default class BlockNodeRenderer extends ParentNodeRenderer<BlockNode>{
    public render(node: BlockNode, engine: RenderEngine): RenderResult {
        
        var root = document.createElement('div');
        
        if(node.styles){
            root.className = node.styles.join(' ');
        }

        var result = new RenderResult(root);
        
        this._renderChildren(node, result, engine);

        return result;
    }
}
