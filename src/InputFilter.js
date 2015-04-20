
class InputFilter {

    constructor() {
        this.messages = {}
        this.inputs = {}
        this.valid = null
        this.data = {}
    }

    add(input) {
        this.inputs[input.name] = input

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
        let promises = []
        for (let name in this.inputs) {
            if (this.inputs.hasOwnProperty(name)) {
                let value = this.data[name]
                let input = this.inputs[name]
                let promise = input.setValue(value).isValid(this.data)
                promise.then(
                    () => {},
                    (messages) => {
                        if (!this.messages[name]) {
                            this.messages[name] = []
                        }
                        this.messages[name].push(messages)
                    }
                )
                promises.push(promise)
            }
        }
        this.promise = Promise.all(promises).catch(() => {
            throw this.messages
        })

        this.promise.then(
            () => {
                this.valid = true
            },
            () => {
                this.valid = false
            }
        )

        return this.promise
    }
}

export default InputFilter
