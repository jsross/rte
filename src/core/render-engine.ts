import RenderResult from './render-result';
import RteNode from "./nodes/abstract/rte-node";
import RteConfig from './config/rte-config';

export default class RenderEngine {
    constructor(){
        RteConfig.configure();
    }

    render(root:RteNode): RenderResult {
        var type = root.constructor.name;
        
        var renderer = RteConfig.getRegisteredRenderer(type);

        if(renderer === null){
            throw new Error('Renderer not registered for type: ' + type);
        }
        
        var result = renderer.render(root,this);

        return result;
    }

}