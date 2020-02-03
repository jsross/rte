import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextNode from './text-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class TextNodeDeleteTextActionHandler extends ActionHandler<DeleteAction, TextNode> {
    
    do(action: DeleteAction, node: TextNode, context:ActionContext): Action {
        var content = node.content;

        if(action.startPath && action.startPath.depth() !== 1 || action.endPath != null && action.endPath.depth() !== 1) {
            throw new Error('Bad Path');
        }

        var startIndex = action.startPath ? action.startPath.head : 0;
        var endIndex = action.endPath ? action.endPath.head : content.length - 1;

        var result:string = content.substring(0, startIndex) + content.substring(endIndex);
        var removed:string = content.substring(startIndex, endIndex);

        node.content = result;

        return new InsertTextAction(action.targetPath, action.startPath, removed);
    }

}