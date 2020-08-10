import ParentNode from '@src/core/nodes/abstract/parent-node';
import DocumentTreeNode from '@src/core/nodes/abstract/document-tree-node';
import RenderResult from '@src/core/render-result';
import RenderEngine from '@src/core/render-engine';
import HierarchyPath from '@src/core/hierarchy-path';
import Action from '@src/core/document-management/actions/action';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class RootNode extends ParentNode<DocumentTreeNode> {
    constructor(children: DocumentTreeNode[] = []){
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
        console.debug('RootNode.handleKeyEvent');

        return null;
    }

    public render(engine: RenderEngine, context: Map<string,any>): RenderResult {
        var root = document.createDocumentFragment();

        var map = this._renderChildren(root, engine, context);

        var result = new RenderResult(root, map);

        return result;
    }
}