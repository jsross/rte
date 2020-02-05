import ContentSelection from "@src/core/content-selection";
import DocumentTreeNode from "@src/core/nodes/abstract/document-tree-node";
import ActionHandler from "./action-handler";
import RteConfig from "@src/core/config/rte-config";

export default class ActionContext {

    public selection:ContentSelection;

    constructor(selection:ContentSelection){
        this.selection = selection;
    }

    public findActionHandler(actionType:string, node: DocumentTreeNode) : ActionHandler<any,any> {
        var nodeType = node.constructor.name;

        var actionHandler = RteConfig.getRegisteredActionHandler(nodeType, actionType);

        if(actionHandler != null) {
            return actionHandler;
        }

        if(nodeType === 'DocumentTreeNode')
            return null;
            
        var parentObject = Object.getPrototypeOf(node) as DocumentTreeNode;

        return this.findActionHandler(actionType, parentObject);        
    }
    
}