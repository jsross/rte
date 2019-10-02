import LeafNode from '../abstract/leaf-node';

export default class TextNode extends LeafNode {
    private _value:string;

    get value(): string {
        return this._value;
    }

    constructor(value:string){
        super();

        this._value = value;
    }
}