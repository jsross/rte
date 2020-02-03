import DocumentTreeNode from "@src/core/nodes/abstract/document-tree-node";
import Action from "./action";
import ActionContext from "./action-context";

export default abstract class ActionHandler<A extends Action,T extends DocumentTreeNode>{

    abstract do(action:A, node:T, context:ActionContext):Action;
    
}