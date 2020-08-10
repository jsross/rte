import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DeleteTextAction extends Action {

    public startIndex:number;
    public endIndex:number;

    constructor(targetPath: HierarchyPath, startIndex:number, endIndex:number){
        super(targetPath);

        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
    
}