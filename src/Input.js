import FilterChain from './FilterChain.js'
import ValidatorChain from './ValidatorChain.js'
import Eventable from './Eventable.js'

class Input extends Eventable {

    constructor(name) {
        super()
        this.required = true
        this.name = name
        this.value = null
        this.valid = null
        this.filterChain = new FilterChain()
        this.validatorChain = new ValidatorChain()
    }

    getValidation() {
        return this.validatorChain
    }

    getFiltration() {
        return this.filterChain
    }

    setValue(value) {
        try {
            //Reset Validator for validate data again
            this.validatorChain.promise = null
            this.promise = null
            this.value = this.filterChain.filter(value)
        } catch (e) {
            this.value = null
            this.promise = Promise.reject({
                [this.name]: [e]
            })
        }
        return this
    }

    reset() {
        this.value = null
        this.promise = null
        this.validatorChain.promise = null
        this.valid = null
    }

    getValue() {
        return this.value
    }

    isValid(context = {}) {
        if (this.promise) {
            return this.promise
        }
        if ((!this.getValue() || this.getValue() == "") && !this.required) {
            return true
        }
        this.promise =  this.validatorChain.isValid(this.getValue(), context, this.name)
            .then(
                () => {
                    this.valid = true
                    this.trigger('valid', this)
                    return {
                        [this.name]: this.getValue()
                    }
                },
                messages => {
                    this.valid = false
                    this.messages = messages
                    this.trigger('invalid', this)
                    throw {
                        [this.name]: messages
                    }
                }
            )
        return this.promise
    }
}

export default Input
