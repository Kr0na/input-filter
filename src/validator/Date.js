import moment from 'moment'

class Date {

    constructor(options = Date.FORMAT_DEFAULT) {
        if (typeof options === 'string') {
            this.format = options
        } else {
            this.format = options.format || Date.FORMAT_DEFAULT
        }
        this.message = options.message || 'Wrong date format'
    }

    isValid(value, context) {
        if (value instanceof Date || value.toDate) {
            return true
        }
        var a = moment(value, this.format, true)

        if (a.isValid()) {
            return true
        } else {
            return Promise.reject(this.message)
        }
    }
}

Date.FORMAT_DEFAULT = 'DD-MM-YYYY'
Date.FORMAT_US = 'MM/DD/YYYY'

export default Date
