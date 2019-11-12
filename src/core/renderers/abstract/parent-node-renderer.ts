import RteNodeRenderer from "./rte-node-renderer";
import RenderEngine from "../../render-engine";
import ParentNode from '../../nodes/abstract/parent-node';
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default abstract class ParentNodeRenderer<T extends ParentNode<any>> implements RteNodeRenderer<T>{
    abstract render(node: T, engine: RenderEngine): RenderResult;

    protected _renderChildren(node: T, renderResult: RenderResult, engine:RenderEngine) {
        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var child = node.children[index];

                var childResult = engine.render(child);
                
                renderResult.append(childResult, HierarchyPath.createRoot().createChildPath(index));
            }
        }
    } 

}