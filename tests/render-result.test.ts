import RteNode from '../src/models/rte-node';
import ParentNode from '../src/models/parent-node';
import Renderer from '../src/core/render-engine'
import RenderResult from '../src/models/render-result';
import {JSDOM} from 'jsdom'
import BlockNode from '../src/models/block-node';


describe('RenderResult Tests', function() {

    beforeEach(function(){
        this.target = new Renderer();      
        let dom = new JSDOM(`<body></body>`);
        this.document = dom.window.document
    });

    describe('constructor', function(){
        it('should set properties and map', function(){
            let root = this.document.createElement('div');
            let source = new BlockNode();

            var map: Map<Node, RteNode> = new Map<Node, RteNode>();

            map.set(root, source);

            let target = new RenderResult(root, map);

            expect(target.map).toContain(root);
            expect(target.map.has(root)).toBe(true);
            expect(target.map.get(root)).toBe(source);
        });
    });

});