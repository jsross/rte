import RenderEngine from "@src/core/render-engine";
import ListItemNode from "@src/core/nodes/concrete/list-item-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";
import HierarchyPath from "@src/core/hierarchy-path";

export default class ListItemNodeRenderer extends ParentNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('li');

        var map = this._renderChildren(node, root, engine);
        map.setLeftToRight(HierarchyPath.createRoot(), HierarchyPath.createRoot());

        var result = new RenderResult(root, map);

        return result;
    }
}
