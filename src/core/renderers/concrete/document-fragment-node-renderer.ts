import RenderEngine from "../../render-engine";
import DocumentFragmentNode from "../../nodes/concrete/document-fragment-node";
import ParentNodeRenderer from "../abstract/parent-node-renderer";
import RenderResult from "../../render-result";
import HierarchyPath from "../../hierarchy-path";

export default class DocumentFragmentNodeRenderer extends ParentNodeRenderer<DocumentFragmentNode> {
    public render(node: DocumentFragmentNode, engine: RenderEngine): RenderResult {
        var nodes:Node[] = [];
        var map = new Map<string, string>();
        map.set(HierarchyPath.createRoot().toString(),
                HierarchyPath.createRoot().toString());

        var root = document.createDocumentFragment();
        nodes.push(root);

        var result = new RenderResult(nodes, map);

        this._renderChildren(node, root, map, engine);

        return result;
    }
}
