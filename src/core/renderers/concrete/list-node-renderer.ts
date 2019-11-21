import RenderEngine from "../../render-engine";
import ListNode from "../../nodes/concrete/list-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class ListNodeRenderer extends ParentNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('ul');

        var map = this._renderChildren(node, root, engine);
        map.set(HierarchyPath.createRoot().toString(), HierarchyPath.createRoot().toString());

        var result = new RenderResult([root], map);

        return result;
    }
}
