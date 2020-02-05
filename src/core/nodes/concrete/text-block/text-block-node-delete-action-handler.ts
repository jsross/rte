import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextBlockNode from './text-block-node';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import InsertNodeAction from '@src/core/document-management/actions/insert-node-action';
import GroupAction from '@src/core/document-management/actions/group-action';
import ActionContext from '@src/core/document-management/actions/action-context';
import HierarchyPath from '@src/core/hierarchy-path';
import DocumentTreeNode from '../../abstract/document-tree-node';

export default class TextBlockNodeDeleteActionHandler extends ActionHandler<DeleteAction, TextBlockNode> {
    
    do(action: DeleteAction, node: TextBlockNode, context:ActionContext): Action {
        var undoActions:Array<Action> = new Array<Action>();
        var startPath = action.startPath ? action.startPath : new HierarchyPath([0]);
        var endPath = action.endPath ? action.endPath : new HierarchyPath([node.children.length]);
        
        var startIndex:number = startPath.head;
        var endIndex:number = endPath.head;

        if(startPath.depth() > 1) {
            var startUndo = this._delegateToChildDelete(action.targetPath.getChild(startIndex), 
                                                        node.children[startIndex],
                                                        startPath.tail,
                                                        null,
                                                        context);

            undoActions.push(startUndo);

            startIndex++;
        }

        if(endPath.depth() > 1) {
            var endUndo = this._delegateToChildDelete(action.targetPath.getChild(endIndex), 
                                                      node.children[endIndex],
                                                      null,
                                                      endPath.tail,
                                                      context);

            undoActions.push(endUndo);

            endIndex--;
        }

        var toDelete = node.getChildren(startIndex, endIndex);

        for(var index = 0; index < toDelete.length; index++) {
            var indexWithOffset = index + startIndex;
            node.children.splice(indexWithOffset,1);

            var childNode = toDelete[index];
            var childPath = action.targetPath.getChild(indexWithOffset);
            
            var insertNodeAction = new InsertNodeAction(childPath, childNode);
            undoActions.push(insertNodeAction);            
        }

        return new GroupAction(action.targetPath, undoActions);
    }

    private _delegateToChildDelete(targetPath:HierarchyPath,
                                   target: DocumentTreeNode,
                                   startPath: HierarchyPath,
                                   endPath: HierarchyPath,
                                   context:ActionContext) {

        var deleteAction = new DeleteAction(targetPath, startPath, endPath);

        var actionHandler = context.findActionHandler(deleteAction.constructor.name, target);

        if(!actionHandler) {
            throw new Error('Handler not found');
        }

        return actionHandler.do(deleteAction, target, context);
    }

}