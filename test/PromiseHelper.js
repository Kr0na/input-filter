import {assert} from 'chai'
import {PromiseHelper} from '../main.js'

describe('PromiseHelper', () => {
    it('#catchAll should catch all rejected messages', () => {
        let promises = [
            'a',
            Promise.resolve('b'),
            Promise.reject('c'),
            Promise.reject('d'),
            Promise.reject('e')
        ]

        return PromiseHelper.catchAll(promises).then(
            () => {
                throw new Error('cannot be valid')
            },
            messages => {
                assert.lengthOf(messages, 3)
            }
        )
    })
    it('#rejectedAll should be successful only when all promises rejected', () => {
        let allRejected = [
            Promise.reject('a'),
            Promise.reject('b')
        ]
        let someResolved = [
            Promise.resolve('a'),
            Promise.reject('b')
        ]
        let allResolved = [
            'a',
            Promise.resolve('b')
        ]
        let promises = [
            PromiseHelper.rejectedAll(allRejected),
            PromiseHelper.rejectedAll(someResolved).then(
                () => {
                    throw new Error('cannot be resolved')
                },
                messages => {
                    assert.lengthOf(messages, 1)
                    assert.include(messages, 'b')
                }
            ),
            PromiseHelper.rejectedAll(allResolved).then(
                () => {
                    throw new Error('cannot be resolved')
                },
                messages => {
                    assert.lengthOf(messages, 2)
                    assert.include(messages, 'a')
                    assert.include(messages, 'b')
                }
            )
        ]
        return Promise.all(promises)
    })
})
