import RteNode from './rte-node';

export default class Leaf implements RteNode {
    constructor(){
    }

    public hasChildren():boolean{
        return false;
    }
}