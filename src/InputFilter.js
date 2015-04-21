
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
        let promises = []
        for (let name in this.inputs) {
            if (this.inputs.hasOwnProperty(name)) {
                let input = this.inputs[name]
                input.setValue(this.rawData[name])
                this.data[name] = input.getValue()
                let promise = input.isValid(this.data)
                promise.catch(
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

    getValue(key) {
        return this.inputs[key].getValue()
    }
}

export default InputFilter
