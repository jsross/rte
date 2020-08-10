import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DeleteNodeAction extends Action {

    constructor(targetPath: HierarchyPath){
        super(targetPath);
    }
    
}