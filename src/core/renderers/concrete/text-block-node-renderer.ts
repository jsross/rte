import RenderEngine from "../../render-engine";
import TextBlockNode from "../../nodes/concrete/text-block-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class TextBlockNodeRenderer extends ParentNodeRenderer<TextBlockNode>{
    public render(node: TextBlockNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('div');

        if(node.type){
            root.className = node.type;
        }

        var map = this._renderChildren(node, root, engine);
        map.set(HierarchyPath.createRoot().toString(), HierarchyPath.createRoot().toString());

        var result = new RenderResult([root], map);

        return result;
    }
}
