import LeafNode from '../abstract/leaf-node';
import HierarchyPath from '../../hierarchy-path';
import StringHelper from '../../string-helper';

export default class TextNode extends LeafNode {
    private _value:string;

    get value(): string {
        return this._value;
    }

    constructor(value:string){
        super();

        this._value = value;
    }

    public insertText(path: HierarchyPath, value: string): void {
        if(path.depth() !== 1) {
            throw 'Invalid path';
        }

        this._value = StringHelper.insert(this._value, value, path.end);
    }

    public deleteText(path: HierarchyPath, count: number): void {
        if(path.depth() !== 1) {
            throw 'Invalid Path'
        }

        this._value = StringHelper.remove(this._value, path.end, count);
    }
}