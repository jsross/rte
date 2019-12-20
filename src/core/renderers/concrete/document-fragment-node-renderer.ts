import RenderEngine from "@src/core/render-engine";
import DocumentFragmentNode from "@src/core/nodes/concrete/document-fragment-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "@src/core/render-result";
import HierarchyPath from "@src/core/hierarchy-path";

export default class DocumentFragmentNodeRenderer extends ParentNodeRenderer<DocumentFragmentNode> {
    public render(node: DocumentFragmentNode, engine: RenderEngine, context: Map<string,any>): RenderResult {
        var root = document.createDocumentFragment();
        var map = this._renderChildren(node, root, engine,context);

        var sourcePath = context.get('sourcePath') as HierarchyPath;
        var destPath = context.get('destPath') as HierarchyPath;

        map.setLeftToRight(destPath, sourcePath);

        var result = new RenderResult(root, map);

        return result;
    }
}
