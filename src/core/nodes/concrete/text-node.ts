import LeafNode from '../abstract/leaf-node';
import HierarchyPath from '../../hierarchy-path';

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
    }

    public deleteText(path: HierarchyPath, count: number): void {
        if(path.depth() !== 1) {
            throw 'Invalid Path'
        }
    }
}