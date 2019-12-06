import RenderEngine from "@src/core/render-engine";
import DocumentFragmentNode from "@src/core/nodes/concrete/document-fragment-node";
import DocumentManager from "./document-manager";

export default class DocumentManagerFactory {
    private _renderEngine: RenderEngine;

    constructor(renderEngine: RenderEngine) {
        this._renderEngine = renderEngine;
    }

    private static $inject:string[] = ['RenderEngine'];

    public createInstance(document: DocumentFragmentNode): DocumentManager {
        return new DocumentManager(document, this._renderEngine);
    }
}