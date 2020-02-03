import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextBlockNode from './text-block-node';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import InsertNodeAction from '@src/core/document-management/actions/insert-node-action';
import GroupAction from '@src/core/document-management/actions/group-action';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class TextBlockNodeDeleteActionHandler extends ActionHandler<DeleteAction, TextBlockNode> {
    
    do(action: DeleteAction, node: TextBlockNode, context:ActionContext): Action {
        var startIndex = action.startPath ? action.startPath.head : 0;
        var endIndex = action.endPath ? action.endPath.head : node.children.length;

        var children = node.getChildren(startIndex, endIndex);

        var undoActions:Array<Action> = new Array<Action>();

        for(var index = 0; index < children.length; index++) {
            var indexWithOffset = index + startIndex;
            node.children.splice(indexWithOffset,1);

            var childNode = children[index];
            var childPath = action.targetPath.getChild(indexWithOffset);
            
            var insertNodeAction = new InsertNodeAction(childPath, childNode);
            undoActions.push(insertNodeAction);            
        }

        return new GroupAction(action.targetPath, undoActions);
    }

}