import Leaf from './leaf';

export default class TextNode extends Leaf {
    public value:string;

    constructor(value:string){
        super();

        this.value = value;
    }

    public hasChildren():boolean{
        return false;
    }
}