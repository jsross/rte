import RteNode from '../src/models/rte-node';
import ParentNode from '../src/models/parent-node';
import Renderer from '../src/core/renderer'
import RenderResult from '../src/models/render-result';
import {JSDOM} from 'jsdom'


describe('RenderResult Tests', function() {

    beforeEach(function(){
        this.target = new Renderer();      
        let dom = new JSDOM(`<body></body>`);
        this.document = dom.window.document
    });

    describe('constructor', function(){
        it('should set properties and map', function(){
            let root = this.document.createElement('div');
            let source = new ParentNode('normal', null);

            let target = new RenderResult(root, source);

            expect(target.root).toBe(root);
            expect(target.map.has(root)).toBe(true);
            expect(target.map.get(root)).toBe(source);
        });
    });

    describe('append() function', function(){
        it('should append param root as first child of root', function() {
            let root1 = this.document.createElement('div');
            let root2 = this.document.createElement('div');
            let source1 = new ParentNode('normal', null);
            let source2 = new ParentNode('normal', null);

            let target = new RenderResult(root1, source1);
            let child = new RenderResult(root2, source2);

            target.append(child);
            expect(target.root.lastChild).toBe(root2);
        })
    });
});