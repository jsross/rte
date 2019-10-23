import HierarchyPath from "../../hierarchy-path";
import {Subject} from 'rxjs'
import RteNodeEvent from "./rte-node-event";

export default abstract class RteNode {        
    protected _subject:Subject<RteNodeEvent>;

    constructor(){
        this._subject = new Subject<RteNodeEvent>();
    }

    abstract hasChildren():boolean;
    abstract insertText(path:HierarchyPath, value:string):void;
    abstract deleteText(path:HierarchyPath, count:number):void;

    public addListener(success:(value:RteNodeEvent) => void){
        this._subject.subscribe(success);
    }
}