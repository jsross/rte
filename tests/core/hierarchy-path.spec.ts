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

    describe('parse() function', function(){
        it('creates root', function(){
            var actual = HierarchyPath.parse('/');

            expect(actual.isRoot()).toBe(true);
        });

        it('should throw validation error on null', function(){
            expect( function(){ HierarchyPath.parse(null); } ).toThrow(new Error("Parse Exception"));
        });

        it('should parse a valid path with children', function(){
            var actual = HierarchyPath.parse('/2/22/31');
            var expected = new HierarchyPath([2, 22, 31]);

            expect(actual.isEqual(expected)).toBe(true);
        });

    });
});