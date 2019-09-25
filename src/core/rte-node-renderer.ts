import RteNode from "./nodes/abstract/rte-node";
import RenderResult from "./render-result";
import RenderEngine from "./render-engine";

export default interface RteNodeRenderer<T extends RteNode> {
    render(node: T, engine: RenderEngine): RenderResult;
}
