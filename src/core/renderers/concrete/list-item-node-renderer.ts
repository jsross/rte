import RenderEngine from "../../render-engine";
import ListItemNode from "../../nodes/concrete/list-item-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class ListItemNodeRenderer extends ParentNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('li');

        var map = this._renderChildren(node, root, engine);
        map.set(HierarchyPath.createRoot().toString(), HierarchyPath.createRoot().toString());

        var result = new RenderResult([root], map);

        return result;
    }
}
