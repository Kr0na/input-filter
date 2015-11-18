import {assert} from 'chai'
import {StringTrim} from '../../src/main.js'

describe('Filter', () => {
    describe('StringTrim', () => {
        it('should be valid', () => {
            let filter = new StringTrim
            assert.equal(filter.filter("  a  "), "a")
            assert.equal(filter.filter("    "), "")
        })
    })
})
