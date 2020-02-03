import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import DocumentTreeNode from '../abstract/document-tree-node';
import ActionContext from '@src/core/document-management/actions/action-context';
import SelectAction from '@src/core/document-management/actions/select-action';
import HierarchyPath from '@src/core/hierarchy-path';
import ContentSelection from '@src/core/content-selection';

export default class SelectActionHandler extends ActionHandler<SelectAction, DocumentTreeNode> {
    
    do(action: SelectAction, node: DocumentTreeNode, context:ActionContext): Action {

        var originalTarget:HierarchyPath = null;
        var originalAnchor:HierarchyPath = null;
        var originalFocus:HierarchyPath;

        if(context.selection.FocusPointer){
            originalTarget = context.selection.AnchorPointer.getLowestCommonAncestor(context.selection.FocusPointer);

            originalAnchor = originalTarget.getRelativePath(context.selection.AnchorPointer);
            originalFocus = originalTarget.getRelativePath(context.selection.FocusPointer);
        }
        else {
            originalTarget = context.selection.AnchorPointer;
            originalAnchor = HierarchyPath.createRoot();
        }

        var anchor:HierarchyPath;
        var focus:HierarchyPath;

        anchor = action.targetPath.concat(action.startPath);
        focus = action.endPath ? action.targetPath.concat(action.endPath) : null;

        context.selection = new ContentSelection(anchor, focus);
        
        return new SelectAction(originalTarget, originalAnchor, originalFocus);
    }



}