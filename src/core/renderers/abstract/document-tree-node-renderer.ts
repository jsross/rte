import DocumentTreeNode from "@src/core/nodes/abstract/document-tree-node";
import RenderEngine from "@src/core/render-engine";
import RenderResult from "@src/core/render-result";

export default interface DocumentTreeNodeRenderer<T extends DocumentTreeNode> {
    render(node: T, engine: RenderEngine, context:Map<string,any>): RenderResult;
}