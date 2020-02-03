import ContentSelection from "@src/core/content-selection";

export default class ActionContext {

    public selection:ContentSelection;

    constructor(selection:ContentSelection){
        this.selection = selection;
    }
    
}