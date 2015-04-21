import {assert} from 'chai'
import {Integer} from '../../main.js'

describe('Filter', () => {
    describe('Integer', () => {
        it('should be valid', () => {
            let validator = new Integer
            assert.isNumber(validator.filter(1))
            assert.isNumber(validator.filter(1.5))
            assert.isNumber(validator.filter("1.5"))
            assert.equal(validator.filter(1), 1)
            assert.equal(validator.filter(1.5), 1)
            assert.equal(validator.filter("1.5"), 1)
        })
        it('should throw error', () => {
            let validator = new Integer
            assert.throws(validator.filter.bind(validator, "adsffda", Error))
        })
    })
})
