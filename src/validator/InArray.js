
class InArray {

    constructor(options) {
        if (Array.isArray(options)) {
            this.haystack = options
        } else {
            this.haystack = options.haystack
        }
        this.message = options.message || 'value is not in haystack'
    }

    isValid(value) {
        if (this.haystack.indexOf(value) !== -1) {
            return true
        } else {
            return Promise.reject(this.message)
        }
    }
}

export default InArray
