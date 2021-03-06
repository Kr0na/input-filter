
class Between {

    constructor(options = {}) {
        if (options.hasOwnProperty('min')) {
            this.min = options.min
        } else {
            this.min = false
        }
        if (options.hasOwnProperty('max')) {
            this.max = options.max
        } else {
            this.max = false
        }
        this.message = options.message || (options.hasOwnProperty('min') && options.hasOwnProperty('max'))
            ? `must be between ${this.min} and ${this.max}`
            : (options.hasOwnProperty('min'))
                ? `must be bigger than ${this.min}`
                : `must be less than ${this.max} `

    }

    isValid(value) {
        if (typeof value !== 'number' && parseFloat(value).toString() !== value) {
            throw new Error(`${value} is not an Number`)
        }
        if (this.min !== false && this.max !== false) {
            if (value >= this.min && value <= this.max) {
                return true
            }
        } else if (this.min!== false) {
            if (value >= this.min) {
                return true
            }
        } else {
            if (value <= this.max) {
                return true
            }
        }

        return Promise.reject(this.message)
    }
}

export default Between
