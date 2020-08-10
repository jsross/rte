import ParentNode from '@src/core/nodes/abstract/parent-node';
import ListItemNode from './list-item-node';
import RenderEngine from '@src/core/render-engine';
import RenderResult from '@src/core/render-result';
import DocumentTreeNode from '../../abstract/document-tree-node';
import HierarchyPath from '@src/core/hierarchy-path';
import Action from '@src/core/document-management/actions/action';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class ListNode extends ParentNode<ListItemNode> {
    constructor(children: ListItemNode[] = []){
        super(children);
    }

    public do(action: Action, context:ActionContext): Action {
        return null;
    }

    public handleKeyEvent(key:string,
                          modifiers: string[],
                          rootPath:HierarchyPath,
                          relativeStartPath: HierarchyPath,
                          relativeEndPath: HierarchyPath): Action {
        console.debug('ListNode.handleKeyEvent');

        return null;
    }

    public render(engine: RenderEngine, context: Map<string, any>): RenderResult {
        var root = document.createElement('ul');

        var map = this._renderChildren(root, engine, context);

        var result = new RenderResult(root, map);

        return result;
    }
}