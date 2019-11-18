import RenderEngine from "../../render-engine";
import ListItemNode from "../../nodes/concrete/list-item-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class ListItemNodeRenderer extends ParentNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine): RenderResult {
        var nodes:Node[] = [];
        var map = new Map<string, string>();
        map.set(HierarchyPath.createRoot().toString(), HierarchyPath.createRoot().toString());
        
        var root = document.createElement('li');
        
        nodes.push(root);

        var result = new RenderResult(nodes, map);

        this._renderChildren(node, root, map, engine);

        return result;
    }
}
