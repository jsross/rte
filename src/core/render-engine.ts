import DocumentTreeNode from "./nodes/abstract/document-tree-node";
import RteConfig from './config/rte-config';
import RenderResult from "./render-result";
import HierarchyPath from "./hierarchy-path";

export default class RenderEngine {
    constructor(){
        RteConfig.configure();
    }

    render(root:DocumentTreeNode, context:Map<string,any> = null): RenderResult {
        if(context === null) {
            context = new Map<string,any>();
            context.set('sourcePath', HierarchyPath.createRoot())
            context.set('destPath', HierarchyPath.createRoot())
        }

        var result = root.render(this, context);

        return result;
    }

}