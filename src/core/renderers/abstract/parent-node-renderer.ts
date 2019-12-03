import RteNodeRenderer from "./rte-node-renderer";
import RenderEngine from "../../render-engine";
import ParentNode from '../../nodes/abstract/parent-node';
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";
import HierarchyPathMap from "../../document-management/hierachy-path-map";

export default abstract class ParentNodeRenderer<T extends ParentNode<any>> implements RteNodeRenderer<T>{
    abstract render(node: T, engine: RenderEngine): RenderResult;

    protected _renderChildren(rteNode: T,
                              htmlNode: Node,                              
                              engine:RenderEngine) : HierarchyPathMap {
        var resultMap = new HierarchyPathMap();

        if(rteNode.hasChildren()){
            for(let index = 0; index < rteNode.children.length; index++) {
                var child = rteNode.children[index];

                var childResult = engine.render(child);
                
                htmlNode.appendChild(childResult.root);

                for(var entry of childResult.map.entries) {
                    var nodeKey = HierarchyPath.parse(`/${index}`).concat(entry[0]);
                    var rtePath = HierarchyPath.parse(`/${index}`).concat(entry[1]);

                    resultMap.setLeftToRight(nodeKey, rtePath);
                }
            }
        }

        return resultMap;
    } 

}