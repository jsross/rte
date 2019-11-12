import RenderEngine from "../../render-engine";
import ListItemNode from "../../nodes/concrete/list-item-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";

export default class ListItemNodeRenderer extends ParentNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('li');
        var result = new RenderResult(root);

        this._renderChildren(node, result, engine);

        return result;
    }
}
