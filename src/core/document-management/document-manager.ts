import DocumentFragmentNode from "../nodes/concrete/document-fragment-node";
import ContentSelection from "../content-selection";
import HierarchyPathMap from "./hierachy-path-map";
import RenderEngine from "../render-engine";
import RteOperation from "./operations/rte-operation";

export default class DocumentManager {

    private _initialized: boolean = false;
    private _document:DocumentFragmentNode;
    private _selection:ContentSelection;
    private _map:HierarchyPathMap;
    private _renderEngine: RenderEngine;

    constructor(document: DocumentFragmentNode, renderEngine: RenderEngine){
        this._document = document;
        this._renderEngine = renderEngine;
    }

    public init() : DocumentFragment {
        if(this._initialized === true) {
            throw new Error('DocumentManager already initialized');
        }

        this._initialized = true;

        var result = this._renderEngine.render(this._document);

        this._map = result.map;

        return result.root as DocumentFragment;
    }
    
    public executeOperations(operations:RteOperation[]) {
        for(var operation of operations) {
            operation.execute(this._document);      
        }
    }


}