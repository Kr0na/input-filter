import {assert} from 'chai'
import {InArray, PromiseHelper} from '../../src/main.js'

describe('Validator', () => {
    describe('InArray', () => {
        it('should be valid', () => {
            let abc = new InArray(['a', 'b', 'c'])
            let numeric = new InArray([1, 2, 3])

            assert.isTrue(abc.isValid("a"))
            assert.isTrue(abc.isValid("b"))
            assert.isTrue(abc.isValid("c"))

            assert.isTrue(numeric.isValid(1))
            assert.isTrue(numeric.isValid(2))
            assert.isTrue(numeric.isValid(3))

            let promises = []
            promises.push(abc.isValid("d"))
            promises.push(numeric.isValid(4))

            return PromiseHelper.rejectedAll(promises)
        })
    })
})
