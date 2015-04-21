import moment from 'moment'

class Date {

    const FORMAT_DEFAULT = 'MM-DD-YYYY'
    const FORMAT_US = 'DD/MM/YYYY'

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

        return a.isValid()
    }
}

export default Date
