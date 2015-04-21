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
        fooBarFilter.setData({foo: "12", bar: 5})
        return fooBarFilter.isValid()
        .then(
            (data) => {
                console.log(data)
                throw new Error('should be invalid')
            },
            (messages) => {
                if (messages.hasOwnProperty('foo') && !messages.hasOwnProperty('bar')) {
                    return true
                } else {
                    throw(messages)
                }
            }
        )
    })
    describe('Factory', () => {
        it('should create from object', () => {
            let fooBarFilter = InputFilter.factory({
                foo: {
                    validators: ['StringLength']
                },
                bar: {
                    required: false,
                    validators: [
                        new Callback((value) => {
                            if (value == 5) {
                                return true
                            } else {
                                return Promise.reject('value shoul be 5')
                            }
                        })
                    ]
                }
            })
            assert.property(fooBarFilter.inputs, 'foo')
            assert.property(fooBarFilter.inputs, 'bar')
            assert.lengthOf(fooBarFilter.inputs.foo.validatorChain.chain, 1)
            assert.lengthOf(fooBarFilter.inputs.bar.validatorChain.chain, 1)
            assert.isFalse(fooBarFilter.inputs.bar.required)
        })
    })
})
