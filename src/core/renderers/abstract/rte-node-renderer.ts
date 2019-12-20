import RteNode from "@src/core/nodes/abstract/rte-node";
import RenderEngine from "@src/core/render-engine";
import RenderResult from "@src/core/render-result";

export default interface RteNodeRenderer<T extends RteNode> {
    render(node: T, engine: RenderEngine, context:Map<string,any>): RenderResult;
}