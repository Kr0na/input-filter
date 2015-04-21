import {assert} from 'chai'
import {Float} from '../../main.js'

describe('Filter', () => {
    describe('Float', () => {
        it('should be valid', () => {
            let validator = new Float
            assert.isNumber(validator.filter(1))
            assert.isNumber(validator.filter(1.5))
            assert.isNumber(validator.filter("1.5"))
            assert.equal(validator.filter("1.5"), 1.5)
        })
        it('should throw error', () => {
            let validator = new Float
            assert.throws(validator.filter.bind(validator, "adsffda", Error))
        })
    })
})
