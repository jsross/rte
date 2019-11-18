import * as nkav from '../../src/core/named-key-attribute-values'

describe('NamedKeyAttributeValues', function() {

    beforeEach(function() {
        
    });

    describe('isNamedKeyAttributeValue function', function(){
        it('basic test', function(){
            let actual = nkav.NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue('FavoriteStore2');

            expect(actual).toEqual(true);            
        });

        it('basic test', function(){
            let actual = nkav.NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue('RandomName');

            expect(actual).toEqual(false);            
        });
    });
});