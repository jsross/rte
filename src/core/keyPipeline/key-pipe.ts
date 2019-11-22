import ContentSelection from "../content-selection";
import RteOperation from "../operations/rte-operation";
import HierarchyPath from "../hierarchy-path";

export default interface KeyPipe {
    process(payload:KeyPipePayload): KeyPipePayload
}

export class KeyPipePayload {
    public key:string;
    public start: HierarchyPath;
    public end: HierarchyPath;

    public operations: RteOperation[];

    constructor(key:string, start:HierarchyPath, end:HierarchyPath){
        this.key = key;
        this.start = start;
        this.end = end;        
        this.operations = new Array<RteOperation>();
    }
}