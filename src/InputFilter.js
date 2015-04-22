import Input from './Input.js'
import ValidatorRegistry from './validator/validators.js'
import FilterRegistry from './filter/filters.js'
import PromiseHelper from './PromiseHelper.js'

class InputFilter {

    constructor() {
        this.messages = {}
        this.inputs = {}
        this.valid = null
        this.rawData = {}
        this.data = {}
        this.init()
    }

    init() {

    }

    add(input) {
        this.inputs[input.name] = input

        return this
    }

    setData(data) {
        this.rawData = data
        this.reset()

        return this
    }

    getData() {
        return this.data
    }

    reset() {
        this.data = {}
        this.promise = null
        this.messages = {}
        this.valid = null
    }

    isValid() {
        if (this.promise) {
            return this.promise
        }
        let promises = Object.keys(this.inputs).map(name => {
            let input = this.inputs[name]
            this.data[name] = input.setValue(this.rawData[name]).getValue()
            return input.isValid(this.data)
        })

        this.promise = PromiseHelper.assignRejects(promises)

        return this.promise
    }

    getValue(key) {
        return this.inputs[key].getValue()
    }

    static factory(items) {
        let inputFilter = new InputFilter
        for (let name in items) {
            if (items.hasOwnProperty(name)) {
                let input = new Input(name)
                let {validators, filters, required} = items[name]
                if (required === false) {
                    input.required = false
                }
                if (Array.isArray(filters)) {
                    filters.forEach((filter) => {
                        if (typeof filter === 'string') {
                            filter = new FilterRegistry[filter]
                        }
                        input.getFiltration().add(filter)
                    })
                }
                if (Array.isArray(validators)) {
                    validators.forEach((validator) => {
                        if (typeof validator === 'string') {
                            validator = new ValidatorRegistry[validator]
                        }
                        input.getValidation().add(validator)
                    })
                }
                inputFilter.add(input)
            }
        }

        return inputFilter
    }
}

export default InputFilter
