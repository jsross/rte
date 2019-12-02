import DocumentFragmentNode from "./nodes/concrete/document-fragment-node";
import ContentSelection from "./content-selection";
import HierarchyPathMap from "./hierachy-path-map";
import RenderEngine from './render-engine';
export default class DocumentManager {

    private _initialized: boolean = false;
    private _document:DocumentFragmentNode;
    private _rendered:DocumentFragment;
    private _selection:ContentSelection;
    private _map:HierarchyPathMap;
    private _renderEngine: RenderEngine;

    constructor(document: DocumentFragmentNode, renderEngine: RenderEngine){
        this._document = document;
        this._renderEngine = renderEngine;
    }

    public init() {
        var result = this._renderEngine.render(this._document);

        this._map = result.map;
        this._rendered = result.root as DocumentFragment;
    }   


}