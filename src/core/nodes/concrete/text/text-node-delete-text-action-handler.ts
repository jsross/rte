import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextNode from './text-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteTextAction from '@src/core/document-management/actions/delete-text-action';

export default class TextNodeDeleteTextActionHandler extends ActionHandler<DeleteTextAction, TextNode> {
    
    do(action: DeleteTextAction, node: TextNode): Action {
        var startIndex = action.path.head;
        var endIndex = startIndex + action.count;
        var content = node.content;

        var result:string = content.substring(0, startIndex) + content.substring(endIndex);
        var removed:string = content.substring(startIndex,endIndex);

        node.content = result;

        return new InsertTextAction(action.path, removed);
    }

}