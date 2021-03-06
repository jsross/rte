import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import DocumentTreeNode from '../abstract/document-tree-node';
import GroupAction from '@src/core/document-management/actions/group-action';
import RteConfig from '@src/core/config/rte-config';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class GroupActionHandler extends ActionHandler<GroupAction, DocumentTreeNode> {
    
    do(action: GroupAction, node: DocumentTreeNode, context:ActionContext): Action {
        var undoActions = new Array<Action>();

        for(var index = 0; index < action.actions.length; index++){
            var childAction = action.actions[index];
            var childActionType:string = childAction.constructor.name;

            var actionHandler = context.findActionHandler(childActionType, node);

            if(actionHandler != null) {
                var undoAction = actionHandler.do(childAction, node, context);
                undoActions.push(undoAction);
            }
        }
        
        return new GroupAction(action.targetPath, undoActions);
    }

   

}