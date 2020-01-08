import RenderEngine from "@src/core/render-engine";
import RootNode from "@src/core/nodes/concrete/root-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";

export default class RootNodeRenderer extends ParentNodeRenderer<RootNode> {
    public render(node: RootNode, engine: RenderEngine, context: Map<string,any>): RenderResult {
        var root = document.createDocumentFragment();

        var map = this._renderChildren(node, root, engine, context);

        var result = new RenderResult(root, map);

        return result;
    }
}
