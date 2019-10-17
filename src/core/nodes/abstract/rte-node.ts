import HierarchyPath from "../../hierarchy-path";

export default interface RteNode {        
    hasChildren():boolean;
    insertText(path:HierarchyPath, value:string):void;
    deleteText(path:HierarchyPath, count:number):void;
}