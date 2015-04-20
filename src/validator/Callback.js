
class Callback {

    constructor(callable) {
        this.callable = callable
    }

    isValid(value, context) {
        return this.callable(value, context)
    }
}

export default Callback
