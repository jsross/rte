import RteNode from "../nodes/abstract/rte-node";
import RenderResult from "../render-result";
import RenderEngine from "../render-engine";
import ParentNode from "../nodes/abstract/parent-node";
import RteNodeRenderer from "../rte-node-renderer";
import ListItemNode from "../nodes/concrete/list-item-node";

export default class ListItemNodeRenderer implements RteNodeRenderer<ListItemNode>{
    public render(node: ListItemNode, engine: RenderEngine): RenderResult {
        var root = document.createElement('li');
        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var current = node.children[index];

                var currentResult = engine.render(current);

                root.appendChild(currentResult.root);

                for (let entry of currentResult.map) {
                    map.set(entry[0],entry[1]);
                }
            }
        }

        var result = new RenderResult(root, map);        

        return result;
    }
}
