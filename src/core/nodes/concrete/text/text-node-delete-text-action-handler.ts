import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextNode from './text-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteAction from '@src/core/document-management/actions/delete-action';

export default class TextNodeDeleteTextActionHandler extends ActionHandler<DeleteAction, TextNode> {
    
    do(action: DeleteAction, node: TextNode): Action {
        var startIndex = action.startPath.head;
        var endIndex = action.endPath.head;
        var content = node.content;

        var result:string = content.substring(0, startIndex) + content.substring(endIndex);
        var removed:string = content.substring(startIndex,endIndex);

        node.content = result;

        return new InsertTextAction(action.startPath, removed);
    }

}