import RenderEngine from "@src/core/render-engine";
import ListItemNode from "@src/core/nodes/concrete/list-item-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";

export default class ListItemNodeRenderer extends ParentNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine, context:Map<string,any>): RenderResult {
        var root = document.createElement('li');

        var map = this._renderChildren(node, root, engine, context);
        
        var result = new RenderResult(root, map);

        return result;
    }
}
