import RenderEngine from "../../render-engine";
import ListNode from "../../nodes/concrete/list-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";

export default class ListNodeRenderer extends ParentNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('ul');
        var result = new RenderResult(root);

        this._renderChildren(node, result, engine);

        return result;
    }
}
