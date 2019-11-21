import RteNodeRenderer from "./rte-node-renderer";
import RenderEngine from "../../render-engine";
import ParentNode from '../../nodes/abstract/parent-node';
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default abstract class ParentNodeRenderer<T extends ParentNode<any>> implements RteNodeRenderer<T>{
    abstract render(node: T, engine: RenderEngine): RenderResult;

    protected _renderChildren(rteNode: T,
                              htmlNode: Node,                              
                              engine:RenderEngine) : Map<string, string> {
        var map = new Map<string, string>();

        if(rteNode.hasChildren()){
            for(let index = 0; index < rteNode.children.length; index++) {
                var child = rteNode.children[index];

                var childResult = engine.render(child);

                for(var childHtmlNode of childResult.nodes) {
                    htmlNode.appendChild(childHtmlNode);
                }

                for(var key of childResult.map.keys()) {
                    var nodeKey = HierarchyPath.parse(`/${index}`).concat(HierarchyPath.parse(key));
                    var rtePath = HierarchyPath.parse(`/${index}`).concat(HierarchyPath.parse(childResult.map.get(key)));

                    map.set(nodeKey.toString(), rtePath.toString());
                }
            }
        }

        return map;
    } 

}