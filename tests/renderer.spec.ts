import Renderer from '../src/core/render-engine'

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