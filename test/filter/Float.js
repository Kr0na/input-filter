import {assert} from 'chai'
import {Float} from '../../src/main.js'

describe('Filter', () => {
    describe('Float', () => {
        it('should be valid', () => {
            let filter = new Float
            assert.isNumber(filter.filter(1))
            assert.isNumber(filter.filter(1.5))
            assert.isNumber(filter.filter("1.5"))
            assert.equal(filter.filter("1.5"), 1.5)
        })
        it('should throw error', () => {
            let filter = new Float
            assert.throws(filter.filter.bind(filter, "adsffda", Error))
        })
    })
})
