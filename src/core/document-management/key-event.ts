import HierarchyPath from "../hierarchy-path"

export default class KeyEvent {

    public start:HierarchyPath;
    public end:HierarchyPath;
    public key:string;

    constructor(key:string, start:HierarchyPath, end:HierarchyPath){
        this.key = key;
        this.start = start;
        this.end = end;
    }
}