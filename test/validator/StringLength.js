import {assert} from 'chai'
import {StringLength} from '../../main.js'

describe('Validator', () => {
    describe('StringLength', () => {
        it('should be valid', () => {
            let min5 = new StringLength({min: 5})
            let max5 = new StringLength({max: 5})
            let between3And5 = new StringLength({min: 3, max: 5})

            assert.isTrue(min5.isValid("12345"))
            assert.isTrue(min5.isValid("123456"))
            assert.isTrue(max5.isValid("1234"))
            assert.isTrue(max5.isValid("12345"))
            assert.isTrue(between3And5.isValid("123"))
            assert.isTrue(between3And5.isValid("1234"))
            assert.isTrue(between3And5.isValid("12345"))

            assert.throws(min5.isValid.bind(min5, null, Error))
            let promises = []
            promises.push(min5.isValid("1"))
            promises.push(max5.isValid("123456"))
            promises.push(between3And5.isValid("12"))
            promises.push(between3And5.isValid("123456"))

            return Promise.all(promises).catch(() => {
                return true
            })
        })
    })
})
