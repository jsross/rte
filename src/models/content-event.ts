import RteNode from './rte-node';

export default class ContentEvent extends Event {
    public node: Node;

    
    constructor(node:Node, event:KeyboardEvent ){
        super('content-event', event);

        this.node = node;
    }    
}