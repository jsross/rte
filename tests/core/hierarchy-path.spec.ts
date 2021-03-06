import HierarchyPath from '../../src/core/hierarchy-path'

describe('HierarchyPath class', function() {

    beforeEach(function() {

    });

    describe('isEqual() function', function(){
        it('should return true for same path', function(){
            var target = new HierarchyPath([0,1,1,2]);
            var value = new HierarchyPath([0,1,1,2]);
            var actual = target.isEqual(value);

            expect(actual).toBeTrue();            
        });
    })

    describe('toString() function', function(){
        it('basic test', function(){
            let target = new HierarchyPath([1,2,3]);
            
            var actual = target.toString();

            expect(actual).toEqual('/1/2/3');            
        });
    });

    describe('parse() function', function(){
        it('creates root', function(){
            var actual = HierarchyPath.parse('/');

            expect(actual.isRoot()).toBeTrue();
        });

        it('should throw validation error on null', function(){
            expect( function(){ HierarchyPath.parse(null); } ).toThrow(new Error("Parse Exception"));
        });

        it('should parse a valid path with children', function(){
            var actual = HierarchyPath.parse('/2/22/31');
            var expected = new HierarchyPath([2, 22, 31]);

            expect(actual.isEqual(expected)).toBeTrue();
        });

    });

    describe('getLowestCommonAncestor function', function(){
        it('should return common ancestor', function() {
            var target = new HierarchyPath([0,3,5,1]);
            var toCompare = new HierarchyPath([0,3,6,2]);
            var expected = new HierarchyPath([0,3]);

            var actual = target.getLowestCommonAncestor(toCompare);

            expect(actual.isEqual(expected)).toBeTrue();
        });

        it('should return root when target is root', function(){
            var target = HierarchyPath.createRoot();
            var toCompare = new HierarchyPath([0,3,6,2]);

            var actual = target.getLowestCommonAncestor(toCompare);

            expect(actual.isRoot()).toBeTrue();
        });

        it('should return root when toComare is root', function(){
            var target = new HierarchyPath([0,3,6,2]); 
            var toCompare = HierarchyPath.createRoot();

            var actual = target.getLowestCommonAncestor(toCompare);

            expect(actual.isRoot()).toBeTrue();
        });

    });

    describe('getRelativePath() function', function(){
        it('should return value when target is root', function(){
            var target = HierarchyPath.createRoot();
            var value = new HierarchyPath([0,1,1,2]);

            var actual = target.getRelativePath(value);

            expect(actual.isEqual(value)).toBeTrue();
        });

        it('should return null when target is not ancestor of value', function(){
            var target = new HierarchyPath([0,1,1,2]);
            var value = new HierarchyPath([0,2,3]);

            var actual = target.getRelativePath(value);

            expect(actual).toBeNull();
        });

        it('should return root when target and value are equal', function(){
            var target = new HierarchyPath([1,2,3]);
            var value = new HierarchyPath([1,2,3]);
            var expected = HierarchyPath.createRoot();

            var actual = target.getRelativePath(value);

            expect(actual.isEqual(expected)).toBeTrue();

        });

        it('should return relavive path when target is ancestor of value', function(){
            var target = new HierarchyPath([1,2,3]);
            var value = new HierarchyPath([1,2,3,4,5,6]);
            var expected = new HierarchyPath([4,5,6]);

            var actual = target.getRelativePath(value);

            expect(actual.isEqual(expected)).toBeTrue();
        })
        
    });
});