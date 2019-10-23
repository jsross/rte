import HierarchyPath from "../../hierarchy-path";
import RteNode from "./rte-node";

export default class RteNodeEvent {
    public readonly caretPosition:HierarchyPath;
    public readonly path:HierarchyPath;
    public readonly emitter:RteNode;
    public readonly origin:RteNode;

    constructor(path:HierarchyPath, emitter:RteNode, origin:RteNode, caretPosition:HierarchyPath = null){
        this.path = path;
        this.emitter = emitter;
        this.origin = origin;
        this.caretPosition = caretPosition;
    }
}