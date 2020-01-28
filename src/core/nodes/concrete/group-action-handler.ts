import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import DocumentTreeNode from '../abstract/document-tree-node';
import GroupAction from '@src/core/document-management/actions/group-action';
import RteConfig from '@src/core/config/rte-config';

export default class GroupActionHandler extends ActionHandler<GroupAction, DocumentTreeNode> {
    
    do(action: GroupAction, node: DocumentTreeNode): Action {
        var undoActions = new Array<Action>();

        for(var index = 0; index < action.actions.length; index++){
            var childAction = action.actions[index];
            var childActionType:string = childAction.constructor.name;

            var actionHandler = this._findActionHandler(childActionType, node);

            if(actionHandler != null) {
                var undoAction = actionHandler.do(childAction, node);
                undoActions.push(undoAction);
            }
        }
        
        return new GroupAction(action.targetPath, undoActions);
    }

    private _findActionHandler(actionType:string, node: DocumentTreeNode) : ActionHandler<any,any> {
        var nodeType = node.constructor.name;

        var actionHandler = RteConfig.getRegisteredActionHandler(nodeType, actionType);

        if(actionHandler != null) {
            return actionHandler;
        }

        if(nodeType === 'DocumentTreeNode')
            return null;
            
        var parentObject = Object.getPrototypeOf(node) as DocumentTreeNode;

        return this._findActionHandler(actionType, parentObject);        
    }

}