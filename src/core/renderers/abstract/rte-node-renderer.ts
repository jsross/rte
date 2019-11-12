import RteNode from "../../nodes/abstract/rte-node";
import RenderEngine from "../../render-engine";
import RenderResult from "../../render-result";

export default interface RteNodeRenderer<T extends RteNode> {
    render(node: T, engine: RenderEngine): RenderResult;
}