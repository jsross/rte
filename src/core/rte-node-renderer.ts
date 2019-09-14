import RteNode from "../models/rte-node";
import RenderResult from "../models/render-result";
import RenderEngine from "./render-engine";

export default interface RteNodeRenderer<T extends RteNode> {
    render(node: T, engine: RenderEngine): RenderResult;
}
