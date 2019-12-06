import RenderEngine from "@src/core/render-engine";
import ListNode from "@src/core/nodes/concrete/list-node";
import ParentNodeRenderer from "@src/core/renderers/abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";
import HierarchyPath from "@src/core/hierarchy-path";

export default class ListNodeRenderer extends ParentNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('ul');

        var map = this._renderChildren(node, root, engine);
        map.setLeftToRight(HierarchyPath.createRoot(), HierarchyPath.createRoot());

        var result = new RenderResult(root, map);

        return result;
    }
}
