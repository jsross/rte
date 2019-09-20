import RteNode from './rte-node';

export default abstract class LeafNode implements RteNode {
    constructor(){}

    public hasChildren():boolean{
        return false;
    }

}