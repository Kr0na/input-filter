
class Between {

    constructor(options) {
        this.min = options.min || false
        this.max = options.max || false
        this.message = options.message || (options.min >= 0 && options.max >= 0)
            ? `must be between ${this.min} and ${this.max}`
            : (options.min >=0)
                ? `must be bigger than ${this.min}`
                : `must be less than ${this.max} `

    }

    isValid(value) {
        if (typeof value !== 'number' && parseFloat(value).toString() !== value) {
            throw new Error(`${value} is not an Number`)
        }
        if (this.min && this.max) {
            if (value >= this.min && value <= this.max) {
                return true
            }
        } else if (this.min) {
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
