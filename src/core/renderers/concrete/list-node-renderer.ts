import RenderEngine from "../../render-engine";
import ListNode from "../../nodes/concrete/list-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";

export default class ListNodeRenderer extends ParentNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine): Node {

        var root = document.createElement('ul');

        this._renderChildren(node, root, engine);

        return root;
    }
}
