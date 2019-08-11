import RenderResult from '../models/render-result'
import RteNode from "../models/rte-node";
import TextNode from '../models/text-node'
import ParentNode from '../models/parent-node';

export default class Renderer {

    private map: Map<string, string> = new Map<string,string>(
        [
            ['normal','div']
        ]
    );

    render(root:RteNode): RenderResult {
        if(root instanceof TextNode){
            let textNode = root as TextNode;

            let text:Text = document.createTextNode(textNode.value);
            let result = new RenderResult(text, root);

            return result;
        }
        else if(root instanceof ParentNode){
            let parentNode = root as ParentNode;

            let elementType = this.map.get(parentNode.type);
            let htmlElement:HTMLElement = document.createElement(elementType);
            let result = new RenderResult(htmlElement, root);

            if(parentNode.hasChildren){
                parentNode.children.forEach(function(childRteNode:RteNode){
                    var childResult = this.render(childRteNode);

                    result.append(childResult);
                }.bind(this))
            }

            return result;
        }
        else {
            throw new Error('Unexpected type: ' + root.constructor.name)
        }
    }

}