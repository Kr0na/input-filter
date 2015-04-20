
class StringLength {

    constructor(options) {
        this.min = options.min || false
        this.max = options.max || false
        this.message = options.message || (options.min >= 0 && options.max >= 0)
            ? `must be between ${this.min} and ${this.max} characters long`
            : (options.min >=0)
                ? `must be at least ${this.min} characters long`
                : `must be lesst than ${this.max} characters long`

    }

    isValid(value) {
        let length = value.length
        if (this.min && this.max) {
            if (length >= this.min && length <= this.max) {
                return true
            }
        } else if (this.min) {
            if (length >= this.min) {
                return true
            }
        } else {
            if (length <= this.max) {
                return true
            }
        }

        return Promise.reject(this.message)
    }
}

export default StringLength
