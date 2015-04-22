import FilterChain from './FilterChain.js'
import ValidatorChain from './ValidatorChain.js'

class Input {

    constructor(name) {
        this.required = true
        this.name = name
        this.value = null
        this.filterChain = new FilterChain()
        this.validatorChain = new ValidatorChain()
        this.context = {}
    }

    getValidation() {
        return this.validatorChain
    }

    getFiltration() {
        return this.filterChain
    }

    setValue(value) {
        this.value = this.filterChain.filter(value)

        //Reset Validator for validate data again
        this.validatorChain.promise = null
        return this
    }

    getValue(value) {
        return this.value
    }

    isValid(context = {}) {
        this.context = context
        if ((!this.getValue() || this.getValue() == "") && !this.required) {
            return true
        }
        return this.validatorChain.isValid(this.getValue(), context, this.name).catch((messages) => {
            throw {
                [this.name]: messages
            }
        })
    }

    getMessages() {
        return new Promise((resolve, reject) => {
            this.validatorChain.isValid(this.getValue(), this.context).then(
                () => {
                    resolve([])
                },
                (messages) => {
                    resolve(messages)
                }
            )
        })
    }
}

export default Input
