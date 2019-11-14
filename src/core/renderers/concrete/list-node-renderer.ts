import RenderEngine from "../../render-engine";
import ListNode from "../../nodes/concrete/list-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class ListNodeRenderer extends ParentNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine): RenderResult {
        var nodes = new Array<Node>();
        var map = new Map<HierarchyPath, HierarchyPath>();

        var root = document.createElement('ul');
        nodes.push(root);

        var result = new RenderResult(nodes, map);

        this._renderChildren(node, root, engine);

        return result;
    }
}
