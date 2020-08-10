import HierarchyPath from "../hierarchy-path"
import { NamedKeyAttributeValues } from "../named-key-attribute-values";

export default class KeyEvent {

    public start:HierarchyPath;
    public end:HierarchyPath;
    public key:string;
    public modifiers:string[];

    constructor(key:string, modifiers:string[], start:HierarchyPath, end:HierarchyPath){
        this.key = key;
        this.modifiers = modifiers;
        this.start = start;
        this.end = end;
    }

    private readonly _NAMED_KEY_WHITE_LIST:Array<string> = [NamedKeyAttributeValues.WHITESPACE_KEYS.SPACE];

    isHandleable(key: string, modifiers:string[]): boolean {
        modifiers = modifiers.filter(obj => obj != NamedKeyAttributeValues.MODIFIER_KEYS.SHIFT);

        if(modifiers.length > 0) {
            return false;
        }

        if(this._NAMED_KEY_WHITE_LIST.includes(key)) {
            return true;
        }
        
        return !NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue(key);
    }

}