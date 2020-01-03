import RteNodeRenderer from "./rte-node-renderer";
import RenderEngine from "@src/core/render-engine";
import ParentNode from '@src/core/nodes/abstract/parent-node';
import RenderResult from "@src/core/render-result";
import HierarchyPath from "@src/core/hierarchy-path";
import HierarchyPathMap from "@src/core/document-management/hierachy-path-map";
import cloneDeep = require('lodash/cloneDeep');

export default abstract class ParentNodeRenderer<T extends ParentNode<any>> implements RteNodeRenderer<T>{
    abstract render(node: T, engine: RenderEngine, context:Map<string,any>): RenderResult;

    protected _renderChildren(rteNode: T,
                              htmlNode: Node,                              
                              engine:RenderEngine,
                              context:Map<string,any>) : HierarchyPathMap {
        var resultMap = new HierarchyPathMap();

        var sourcePath = context.get('sourcePath') as HierarchyPath;
        var destPath = context.get('destPath') as HierarchyPath;

        if(rteNode.hasChildren()){
            let index = 0;

            for(; index < rteNode.children.length; index++) {
                var child = rteNode.children[index];

                var currentContext = cloneDeep(context);
                currentContext.set('sourcePath', sourcePath.getChild(index));
                currentContext.set('destPath', destPath.getChild(index));

                resultMap.addEntry(sourcePath.getChild(index), destPath.getChild(index));

                var childResult = engine.render(child, currentContext);
                
                htmlNode.appendChild(childResult.root);

                for(var entry of childResult.map.entries) {
                    resultMap.addEntry(entry[0], entry[1]);
                }
            }

            resultMap.addEntry(sourcePath.getChild(index), destPath.getChild(index));
        }

        return resultMap;
    } 

}