import LeafNode from '../abstract/leaf-node';
import HierarchyPath from '../../hierarchy-path';
import StringHelper from '../../string-helper';
import RteNodeEvent from '../abstract/rte-node-event';

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

        var event = new RteNodeEvent(HierarchyPath.createRoot(), this, this, new HierarchyPath([path.end + 1]));
        this._subject.next(event); 
    }

    public deleteText(path: HierarchyPath, count: number): void {
        if(path.depth() !== 1) {
            throw 'Invalid Path'
        }

        this._value = StringHelper.remove(this._value, path.end, count);

        var event = new RteNodeEvent(HierarchyPath.createRoot(), this, this, new HierarchyPath([path.end]));
        this._subject.next(event);        
    }

}