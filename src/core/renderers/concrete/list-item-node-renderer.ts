import RenderEngine from "../../render-engine";
import ListItemNode from "../../nodes/concrete/list-item-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";

export default class ListItemNodeRenderer extends ParentNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine): Node {
        var root = document.createElement('li');

        this._renderChildren(node, root, engine);

        return root;
    }
}
