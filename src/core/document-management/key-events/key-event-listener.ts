import HierarchyPath from "@src/core/hierarchy-path";
import Action from "@src/core/document-management/actions/action";

export default interface IKeyEventListener {
    isHandleable(key:string, modifiers:string[]):boolean;

    handleKeyEvent(key:string,
                   modifiers: string[],
                   rootPath:HierarchyPath,
                   relativeStartPath: HierarchyPath,
                   relativeEndPath: HierarchyPath): Action;
}