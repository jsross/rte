import Renderer from '../src/core/renderer'

describe('Renderer', function() {

    beforeEach(function(){
        this.target = new Renderer();        
    });

    describe('render() function', function(){
        it('should not be null', function(){
            expect(this.target).not.toBeNull();
        })
    });
});