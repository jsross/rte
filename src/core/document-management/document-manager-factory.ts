import RenderEngine from "@src/core/render-engine";
import RootNode from "@src/core/nodes/concrete/root-node";
import DocumentManager from "./document-manager";
import { Observable } from 'rxjs'
import KeyEvent from "./key-event";

export default class DocumentManagerFactory {
    private _renderEngine: RenderEngine;

    constructor(renderEngine: RenderEngine) {
        this._renderEngine = renderEngine;
    }

    private static $inject:string[] = ['RenderEngine'];

    public createInstance(document: RootNode, keyObservable: Observable<KeyEvent>): DocumentManager {
        return new DocumentManager(document, this._renderEngine, keyObservable);
    }
}