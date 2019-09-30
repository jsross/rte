import { nodeMarker } from "lit-html/lib/template";

export default class NodePointer {

    private readonly _node:Node;
    private readonly _hierarchyPath:number[];
    private readonly _offset: number;

    get Node():Node{
        return this._node;
    }

    get HierarchyPath():number[]{
        return this._hierarchyPath;
    }

    get Offset():number {
        return this._offset;
    }

    constructor(node:Node, hierarchyPath:number[], offset:number) {
        this._node = node;
        this._hierarchyPath = hierarchyPath;
        this._offset = offset;
    }
}