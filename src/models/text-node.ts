namespace rte.models {
    export class TextNode extends Node {
        public value:string;

        constructor(){
            super();
        }

        public hasChildren():boolean{
            return false;
        }
    }
}