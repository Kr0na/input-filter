import {assert} from 'chai'
import {Between} from '../../main.js'

describe('Validator', () => {
    describe('Between', () => {
        it('should be valid', () => {
            let min5 = new Between({min: 5})
            let max5 = new Between({max: 5})
            let between3And5 = new Between({min: 3, max: 5})

            assert.isTrue(min5.isValid(5))
            assert.isTrue(min5.isValid(6))
            assert.isTrue(max5.isValid(5))
            assert.isTrue(max5.isValid(4))
            assert.isTrue(between3And5.isValid(3))
            assert.isTrue(between3And5.isValid(4))
            assert.isTrue(between3And5.isValid(5))

            assert.throws(min5.isValid.bind(min5, "sdf", Error))
            assert.throws(min5.isValid.bind(min5, null, Error))
            let promises = []
            promises.push(min5.isValid(4))
            promises.push(max5.isValid(6))
            promises.push(between3And5.isValid(2))
            promises.push(between3And5.isValid(6))

            return Promise.all(promises).catch(() => {
                return true
            })
        })
    })
})
