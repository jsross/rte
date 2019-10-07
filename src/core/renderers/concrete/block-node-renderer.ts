import RenderEngine from "../../render-engine";
import BlockNode from "../../nodes/concrete/block-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";

export default class BlockNodeRenderer extends ParentNodeRenderer<BlockNode>{
    public render(node: BlockNode, engine: RenderEngine): Node {
        var root = document.createElement('div');
        
        if(node.styles){
            root.className = node.styles.join(' ');
        }
        
        this._renderChildren(node, root, engine);

        return root;
    }
}
