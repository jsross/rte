import HierarchyPath from "../hierarchy-path"

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
}