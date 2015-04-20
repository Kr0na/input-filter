
class InputFilter {

    constructor() {
        this.messages = {}
        this.inputs = {}
        this.valid = null
        this.data = {}
    }

    add(input) {
        this.inputes[input.name] = input

        return this
    }

    setData(data) {
        this.data = data
        this.reset()

        return this
    }

    reset() {
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
            for (let name in this.inputs) {
                if (this.inputs.hasOwnProperty(name)) {
                    let value = this.data[name]
                    let input = this.inputs[name]
                    let promise = input.setValue(value).isValid(this.data)
                    promise.then(
                        () => {},
                        (messages) => {
                            this.messages[name] = messages
                        }
                    )
                    promises.push(promise)
                }
            }
            Promise.all(promises)
        })

        this.promise.then(
            () => {
                this.valid = true
            },
            (messages) => {
                this.valid = false
            }
        )

        return this.promise
    }
}

export default InputFilter
