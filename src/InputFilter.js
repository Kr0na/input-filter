import Input from './Input.js'
import ValidatorRegistry from './validator/validators.js'
import FilterRegistry from './filter/filters.js'
import PromiseHelper from './PromiseHelper.js'
import Eventable from './Eventable.js'

class InputFilter extends Eventable {

    constructor(name = null) {
        super()
        this.name = name
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

    get(name) {
        return this.inputs[name]
    }

    setValue(data) {
        return this.setData(data)
    }

    getValue(key = null) {
        if (key) {
            return this.get(key).getValue()
        } else {
            return this.data
        }
    }

    setData(data) {
        this.rawData = data
        this.reset()
        this.populate()

        return this
    }

    populate() {
        Object.keys(this.inputs).forEach(name => {
            this.data[name] = this.get(name).setValue(this.rawData[name]).getValue()
        })
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
        let promises = Object.keys(this.inputs)
            .map(name => this.get(name).isValid(this.data))

        this.promise = PromiseHelper.assignRejects(promises).then(
            result => {
                this.valid = true
                this.trigger('valid', this)
                return this.data
            },
            messages => {
                this.valid = false
                this.messages = messages
                this.trigger('invalid', this)
                if (this.name) {
                    throw {
                        [this.name]: messages
                    }
                } else {
                    throw messages
                }
            }
        )

        return this.promise
    }

    static factory(items) {
        let inputFilter = new InputFilter
        for (let name in items) {
            if (items.hasOwnProperty(name)) {
                if (items[name] instanceof Input || items[name] instanceof InputFilter) {
                    inputFilter.add(items[name])
                    continue
                }
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
