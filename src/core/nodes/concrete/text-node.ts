import LeafNode from '../abstract/leaf-node';

export default class TextNode extends LeafNode {
    private _value:string;
    private _styles:string[];

    get value(): string {
        return this._value;
    }

    get styles(): string[] {
        return this._styles;
    }    

    constructor(value:string, styles:string[] = null){
        super();

        this._value = value;
        this._styles = styles;
    }

    public hasChildren():boolean{
        return false;
    }
}