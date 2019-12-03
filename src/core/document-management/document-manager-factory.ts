import RenderEngine from "../render-engine";
import DocumentFragmentNode from "../nodes/concrete/document-fragment-node";
import DocumentManager from "./document-manager";

export default class DocumentManagerFactory {
    private _renderEngine: RenderEngine;

    constructor(renderEngine: RenderEngine) {
        this._renderEngine = renderEngine;
    }

    public createInstance(document: DocumentFragmentNode): DocumentManager {
        return new DocumentManager(document, this._renderEngine);
    }
}