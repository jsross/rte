import RteNodeRenderer from "./rte-node-renderer";
import RenderEngine from "../../render-engine";
import ParentNode from '../../nodes/abstract/parent-node';
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default abstract class ParentNodeRenderer<T extends ParentNode<any>> implements RteNodeRenderer<T>{
    abstract render(node: T, engine: RenderEngine): RenderResult;

    protected _renderChildren(rteNode: T, htmlNode: Node, engine:RenderEngine) {
        if(rteNode.hasChildren()){
            for(let index = 0; index < rteNode.children.length; index++) {
                var child = rteNode.children[index];

                var childResult = engine.render(child);

                for(var childHtmlNode of childResult.nodes) {
                    htmlNode.appendChild(childHtmlNode);
                }
                
                //renderResult.append(childResult, HierarchyPath.createRoot().createChildPath(index));
            }
        }
    } 

}