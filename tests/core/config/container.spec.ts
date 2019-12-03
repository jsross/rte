import Container from '../../../src/core/config/container'
import { TextNode } from '../../../src/export';

describe('Container class', function() {

    beforeEach(function() {

    });

    describe('register() function', function(){
        it('basic test', function(){
            
            Container.register(TextNode.constructor)
        })
    });

    
});