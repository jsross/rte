import RenderEngine from "../render-engine";
import DocumentFragmentNode from "../nodes/concrete/document-fragment-node";
import ParentNodeRenderer from "./abstract/parent-node-renderer";

export default class DocumentFragmentNodeRenderer extends ParentNodeRenderer<DocumentFragmentNode> {
    public render(node: DocumentFragmentNode, engine: RenderEngine): Node {
        var root = document.createDocumentFragment();

        this._renderChildren(node, root, engine);

        return root;
    }
}
