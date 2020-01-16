import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class GroupAction extends Action {

    public actions: Action[];

    constructor(path: HierarchyPath, actions: Action[]){
        super(path);

        this.actions = actions;
    }
    
}