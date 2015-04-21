import {assert} from 'chai'
import {Input, InputFilter, StringLength, Callback} from '../main.js'

class FooBarFilter extends InputFilter {

    init() {
        let foo = new Input('foo')
        foo.getValidation()
            .add(new StringLength({min: 3}))
        let bar = new Input('bar')
        bar.getValidation()
            .add(new Callback((value) => {
                if (value == 5) {
                    return true
                } else {
                    return Promise.reject('value shoul be 5')
                }
            }))

        this
            .add(foo)
            .add(bar)
    }
}

describe('InputFilter', () => {
    it('should be valid', () => {
        let fooBarFilter = new FooBarFilter
        fooBarFilter.setData({foo: "1234", bar: 5})
        return fooBarFilter.isValid()
    })
    it('should be invalid', () => {
        let fooBarFilter = new FooBarFilter
        fooBarFilter.setData({foo: "123", bar: 5})
        return fooBarFilter.isValid().catch((messages) => {
            if (messages.hasOwnProperty('foo') && !messages.hasOwnProperty('bar')) {
                return true
            } else {
                throw(messages)
            }
        })
    })
})
