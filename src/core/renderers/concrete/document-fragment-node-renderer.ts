import RenderEngine from "../../render-engine";
import DocumentFragmentNode from "../../nodes/concrete/document-fragment-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class DocumentFragmentNodeRenderer extends ParentNodeRenderer<DocumentFragmentNode> {
    public render(node: DocumentFragmentNode, engine: RenderEngine): RenderResult {
        var root = document.createDocumentFragment();
        var map = this._renderChildren(node, root, engine);

        map.setLeftToRight(HierarchyPath.createRoot(), HierarchyPath.createRoot());

        var result = new RenderResult([root], map);

        return result;
    }
}
