import LeafNode from '../abstract/leaf-node';
import HierarchyPath from '../../hierarchy-path';
import StringHelper from '../../string-helper';
import RteNodeEvent from '../abstract/rte-node-event';

export default class TextNode extends LeafNode {
    private _value: string;
    private _styles: string[];

    private static $inject:string[] = ['string', 'string[]'];

    get value(): string {
        return this._value;
    }

    get styles():string[] {
        return this._styles;
    }

    constructor(value:string, styles:string[] = null){
        super();

        this._value = value;
        this._styles = styles;
    }

    public insertText(path: HierarchyPath, value: string): void {
        var index = 0;

        if(path.depth() > 1) {
            throw 'Invalid path';
        }

        if(!path.isRoot()){
            index = path.end;
        }

        this._value = StringHelper.insert(this._value, value, index);

        var event = new RteNodeEvent(HierarchyPath.createRoot(), this, this);
        this._subject.next(event); 
    }

    public deleteText(path: HierarchyPath, count: number): void {
        if(path.depth() !== 1) {
            throw 'Invalid Path'
        }

        this._value = StringHelper.remove(this._value, path.end, count);

        var event = new RteNodeEvent(HierarchyPath.createRoot(), this, this);
        this._subject.next(event);        
    }

}