import RenderEngine from "@src/core/render-engine";
import TextBlockNode from "@src/core/nodes/concrete/text-block-node";
import ParentNodeRenderer from "@src/core/renderers/abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";

export default class TextBlockNodeRenderer extends ParentNodeRenderer<TextBlockNode>{
    public render(node: TextBlockNode, engine: RenderEngine, context:Map<string,any>): RenderResult {
        var root = document.createElement('div');

        if(node.type){
            root.className = node.type;
        }

        var map = this._renderChildren(node, root, engine, context);
        
        var result = new RenderResult(root, map);

        return result;
    }
}
