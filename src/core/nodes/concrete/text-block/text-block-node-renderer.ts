import RenderEngine from "@src/core/render-engine";
import RenderResult from "@src/core/render-result";
import TextBlockNode from "./text-block-node";
import ParentNodeRenderer from "@src/core/renderers/abstract/parent-node-renderer";

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
