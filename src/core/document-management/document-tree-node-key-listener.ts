import DocumentTreeNode from "@src/core/nodes/abstract/document-tree-node";
import HierarchyPath from "@src/core/hierarchy-path";
import Action from "./actions/action";

export default interface IDocumentTreeNodeKeyListener<T extends DocumentTreeNode> {
    handleKeyEvent(node: T, key:string, modifiers: string[], start: HierarchyPath, end: HierarchyPath): Action;
}