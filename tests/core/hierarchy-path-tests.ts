import HierarchyPath from '../../src/core/hierarchy-path'

describe('HierarchyPath class', function() {

    beforeEach(function() {

    });

    describe('toString() function', function(){
        it('basic test', function(){
            let target = new HierarchyPath([1,2,3]);
            
            var actual = target.toString();

            expect(actual).toEqual('/1/2/3');            
        })
    });
});