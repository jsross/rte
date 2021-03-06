import RenderEngine from "@src/core/render-engine";
import ListNode from "@src/core/nodes/concrete/list-node";
import ParentNodeRenderer from "@src/core/renderers/abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";

export default class ListNodeRenderer extends ParentNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine, context: Map<string, any>): RenderResult {
        var root = document.createElement('ul');

        var map = this._renderChildren(node, root, engine, context);

        var result = new RenderResult(root, map);

        return result;
    }
}
