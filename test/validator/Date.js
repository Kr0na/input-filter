import {assert} from 'chai'
import {Date} from '../../main.js'

describe('Validator', () => {
    describe('Date', () => {
        it('should be valid', () => {
            let defaultDate = new Date()
            let usDate = new Date(Date.FORMAT_US)

            assert.isTrue(defaultDate.isValid('15-02-1993'))
            assert.isTrue(usDate.isValid('02/15/1993'))

            let promises = []
            promises.push(defaultDate.isValid('02-15-1993'))
            promises.push(usDate.isValid('15/02/1993'))

            return Promise.all(promises).catch(() => true)
        })
    })
})
