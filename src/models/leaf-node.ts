import RteNode from './rte-node';

export default class LeafNode implements RteNode {
    constructor(){}

    public hasChildren():boolean{
        return false;
    }
}