import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";
import ParentNode from "../models/parent-node";
import RteNodeRenderer from "./rte-node-renderer";
import ListNode from "../models/list-node";

export default class ListNodeRenderer implements RteNodeRenderer<ListNode>{
    public render(node: ListNode, engine: RenderEngine): RenderResult {

        var map: Map<Node, RteNode> = new Map<Node, RteNode>();

        var listElement = document.createElement('ul');

        if(node.hasChildren()){
            for(let index = 0; index < node.children.length; index++) {
                var current = node.children[index] as ParentNode<any>;
                var listItemElement = document.createElement('li');
                listElement.appendChild(listItemElement);

                var currentResult = engine.render(current);

                currentResult.nodes.forEach((node) => {
                    listItemElement.appendChild(node);                    
                });

                for (let entry of currentResult.map) {
                    map.set(entry[0],entry[1]);
                }
            }
        }

        var result = new RenderResult(listElement, map);        

        return result;
    }
}
