import HierarchyPath from "@src/core/hierarchy-path";
import RteNode from "./rte-node";

export default class RteNodeEvent {
    public readonly path:HierarchyPath;
    public readonly emitter:RteNode;
    public readonly origin:RteNode;

    constructor(path:HierarchyPath, emitter:RteNode, origin:RteNode){
        this.path = path;
        this.emitter = emitter;
        this.origin = origin;
    }
}