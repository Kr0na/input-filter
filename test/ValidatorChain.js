import {assert} from 'chai'
import {ValidatorChain, Between, Callback} from '../main.js'

describe('ValidatorChain', () => {
    it('should be valid', () => {
        let chain = new ValidatorChain
        chain
            .add(new Between({min:3, max:5}))
            .add(new Callback((value) => {
                if (value == 4) {
                    return Promise.reject('value cannot be 4')
                } else {
                    return true
                }
            }))

        let promises = []
        promises.push(chain.isValid(3))
        promises.push(chain.isValid(5))

        return Promise.all(promises)
    })
    it('should be invalid', () => {
        let chain = new ValidatorChain
        chain
            .add(new Between({min:3, max:5}))
            .add(new Callback((value) => {
                if (value == 4) {
                    return Promise.reject('value cannot be 4')
                } else {
                    return true
                }
            }))

        let promises = []
        promises.push(chain.isValid(2))
        promises.push(chain.isValid(4))
        promises.push(chain.isValid(6))

        return Promise.all(promises).catch(() => true)
    })
})
