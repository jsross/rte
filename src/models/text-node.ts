import Leaf from './leaf';

export default class TextNode extends Leaf {
    public value:string;

    constructor(){
        super();
    }

    public hasChildren():boolean{
        return false;
    }
}