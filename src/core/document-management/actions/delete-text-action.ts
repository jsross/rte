import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DeleteTextAction extends Action {

    public index: number;
    public count: number;

    constructor(path:HierarchyPath, count:number){
        super(path);

        this.count = count;
    }
    
}