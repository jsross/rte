import ContentAreaSelection from "./content-area-selection";
import RteOperation from "../../core/operations/rte-operation";

export default interface KeyListener {
    /**
     * 
     * @param key 
     * @param selection 
     * @returns boolean true value indicates key processing should continue
     */
    handleKey(key:string, selection:ContentAreaSelection): KeyListenerResult;
}

export class KeyListenerResult {
    public preventNext:boolean;
    public operations:RteOperation[];

    constructor(){
        this.operations = new Array<RteOperation>();
    }
}