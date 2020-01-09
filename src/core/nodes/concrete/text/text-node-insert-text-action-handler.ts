import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextNode from './text-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteTextAction from '@src/core/document-management/actions/delete-text-action';

export default class TextNodeInsertTextActionHandler extends ActionHandler<InsertTextAction, TextNode> {
    
    do(action: InsertTextAction, node: TextNode): Action {
        var content = node.content;
        var index = action.path.head;

        var result = content.substring(0, index) + action.value + content.substring(index);
        node.content = result;

        return new DeleteTextAction(action.path, action.value.length);
    }

}