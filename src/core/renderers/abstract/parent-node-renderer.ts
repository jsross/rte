import RteNodeRenderer from "./rte-node-renderer";
import RenderEngine from "../../render-engine";
import ParentNode from '../../nodes/abstract/parent-node';

export default abstract class ParentNodeRenderer<T extends ParentNode<any>> implements RteNodeRenderer<T>{
    abstract render(node: T, engine: RenderEngine): Node;

    protected _renderChildren(node: T, root: Node, engine:RenderEngine) {
        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var child = node.children[index];

                var childResult = engine.render(child);

                root.appendChild(childResult);
            }
        }
    } 

}