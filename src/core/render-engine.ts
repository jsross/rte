import RenderResult from '../models/render-result';
import RteNode from "../models/rte-node";
import TextNode from '../models/text-node'
import ParentNode from '../models/parent-node';
import TextNodeRenderer from './text-node-renderer';
import RteNodeRenderer from './rte-node-renderer';
import BlockNodeRenderer from './block-node-renderer';
import DocumentNodeRenderer from './document-node-renderer';

export default class RenderEngine {

    private map: Map<string, RteNodeRenderer> = new Map<string,RteNodeRenderer>(
        [
            ['DocumentNode', new DocumentNodeRenderer()],
            ['TextNode', new TextNodeRenderer()],
            ['BlockNode', new BlockNodeRenderer()]
        ]
    );

    render(root:RteNode): RenderResult {
        var type = root.constructor.name;

        if(!this.map.has(type)){
            throw new Error('Renderer not registered for type: ' + type);
        }

        var renderer = this.map.get(type);
        
        var result = renderer.render(root,this);

        return result;
    }

}