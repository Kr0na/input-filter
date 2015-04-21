import {assert} from 'chai'
import {Integer} from '../../main.js'

describe('Filter', () => {
    describe('Integer', () => {
        it('should be valid', () => {
            let filter = new Integer
            assert.isNumber(filter.filter(1))
            assert.isNumber(filter.filter(1.5))
            assert.isNumber(filter.filter("1.5"))
            assert.equal(filter.filter(1), 1)
            assert.equal(filter.filter(1.5), 1)
            assert.equal(filter.filter("1.5"), 1)
        })
        it('should throw error', () => {
            let filter = new Integer
            assert.throws(filter.filter.bind(filter, "adsffda", Error))
        })
    })
})
