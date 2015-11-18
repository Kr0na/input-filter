import {assert} from 'chai'
import {Input, InputFilter, StringLength, Callback, Between, PromiseHelper} from '../src/main.js'

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
                    validators: ['StringLength'],
                    filters: ['StringTrim']
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
            assert.lengthOf(fooBarFilter.inputs.foo.filterChain.chain, 1)
            assert.lengthOf(fooBarFilter.inputs.bar.validatorChain.chain, 1)
            assert.isFalse(fooBarFilter.inputs.bar.required)
        })
        it('should filter values before validation', () => {
            let fooBarFilter = InputFilter.factory({
                foo: {
                    validators: [new StringLength({min:3})],
                    filters: ['StringTrim']
                }
            })
            return fooBarFilter.setData({foo: "   12  "}).isValid()
                .then(
                    () => {
                        throw new Error('should use filters')
                    },
                    () => {
                        assert.equal(fooBarFilter.data.foo, "12")
                        return true
                    }
                )
        })
        it('should be able to use inner InputFilter', () => {
            let fooBarFilter = InputFilter.factory({
                foo: {
                    validators: [new StringLength({min:3})],
                    filters: ['StringTrim']
                },
                bar: new FooBarFilter('bar')
            })
            fooBarFilter.setData({foo: "  123", bar: {foo: "1234", bar: 5}})
            return fooBarFilter.isValid().then(
                data => {
                    assert.equal(data.foo, "123")
                    assert.equal(data.bar.bar, 5)
                }
            )
        })
        it('should validate inner InputFilter', () => {
            let fooBarFilter = InputFilter.factory({
                foo: {
                    validators: [new StringLength({min:3})],
                    filters: ['StringTrim']
                },
                bar: new FooBarFilter('bar')
            })
            fooBarFilter.setData({foo: "  123", bar: {foo: "1234", bar: 2}})
            return fooBarFilter.isValid().then(
                data => {
                    throw new Error('cannot be valid')
                },
                messages => {
                    assert.property(messages, "bar")
                    assert.property(messages.bar, "bar")
                }
            )
        })
    })
    it('Regression for inner InputFilter', () => {
        let filter = InputFilter.factory({
            foo: {
                validators: [new StringLength({min: 3})]
            },
            bar: InputFilter.factory({
                str: {
                    filters: ['StringTrim'],
                    validators: [new StringLength({min: 4})]
                },
                num: {
                    filters: ['StringTrim', 'Integer'],
                    validators: [new Between({min: 0})]
                }
            })
        })
        let empty = filter.setData({}).isValid().then(
            data => {
                throw new Error('cannot be valid')
            },
            messages => {
                assert.property(messages, 'foo')
                assert.property(messages, 'bar')
                assert.property(messages.bar, 'str')
                assert.property(messages.bar, 'num')
                return true
            }
        )
        let part = filter.setData({bar: {str: "adsadf", num: 0}}).isValid().then(
            data => {
                throw new Error('cannot be valid')
            },
            messages => {
                assert.property(messages, 'foo')
                assert.isFalse(messages.hasOwnProperty('bar'))
                return true
            }
        )
        return PromiseHelper.catchAll([empty, part])
    })
})
