import {assert} from 'chai'
import {Bool} from '../../main.js'

describe('Filter', () => {
    describe('Boolean', () => {
        it('should be valid', () => {
            let filter = new Bool
            assert.isBoolean(filter.filter(1))
            assert.isBoolean(filter.filter(true))
            assert.equal(filter.filter(1), true)
            assert.equal(filter.filter(true), true)
            assert.equal(filter.filter(0), false)
            assert.equal(filter.filter(false), false)
        })
        it('should throw error', () => {
            let filter = new Bool
            assert.throws(filter.filter.bind(filter, "adsffda", Error))
        })
    })
})
