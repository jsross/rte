import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextNode from './text-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import ActionContext from '@src/core/document-management/actions/action-context';
import HierarchyPath from '@src/core/hierarchy-path';

export default class TextNodeDeleteTextActionHandler extends ActionHandler<DeleteAction, TextNode> {
    
    do(action: DeleteAction, node: TextNode, context:ActionContext): Action {
        var content = node.content;

        var startPath = action.startPath ? action.startPath : new HierarchyPath([0]);
        var endPath = action.endPath ? action.endPath : new HierarchyPath([node.content.length]);

        if(startPath.depth() !== 1 || endPath.depth() !== 1) {
            throw new Error('Bad Path');
        }

        var startIndex = startPath.head;
        var endIndex = endPath.head;

        var result:string = content.substring(0, startIndex) + content.substring(endIndex);
        var removed:string = content.substring(startIndex, endIndex);

        node.content = result;

        return new InsertTextAction(action.targetPath, action.startPath, removed);
    }

}