import Input from './Input.js'
import ValidatorRegistry from './validator/validators.js'

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
        this.promise = new Promise((resolve, reject) => {
            let promises = []
            let valid = true
            let errors = {}
            for (let name in this.inputs) {
                if (this.inputs.hasOwnProperty(name)) {
                    let input = this.inputs[name]
                    input.setValue(this.rawData[name])
                    this.data[name] = input.getValue()
                    promises.push(input.isValid(this.data).catch(
                        (messages) => {
                            valid = false
                            errors[name] = messages
                            return true
                        }
                    ))
                }
            }
            Promise.all(promises).then(
                () => {
                    if (!valid) {
                        this.valid = false
                        this.messages = errors
                        reject(errors)
                    } else {
                        this.valid = true
                        resolve(this.data)
                    }
                }
            )
        })

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
                let {validators, required} = items[name]
                if (required === false) {
                    input.required = false
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
