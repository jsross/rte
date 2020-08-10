import RenderEngine from "@src/core/render-engine";
import RenderResult from "@src/core/render-result";
import HierarchyPath from "@src/core/hierarchy-path";
import Action from "@src/core/document-management/actions/action";
import ActionContext from "@src/core/document-management/actions/action-context";

export default interface DocumentTreeNode { 
    
    do(action: Action, context:ActionContext): Action;

    handleKeyEvent(key:string,
                   modifiers: string[],
                   rootPath:HierarchyPath,
                   relativeStartPath: HierarchyPath,
                   relativeEndPath: HierarchyPath): Action;

    hasChildren():boolean;

    render(engine: RenderEngine, context:Map<string,any>): RenderResult;

}