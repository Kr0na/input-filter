
class Bool {

    filter(value) {
        if (value === true || value === false) {
            return value
        } else if (value === 1 || value === 0) {
            return !!value
        } else {
            throw new Error(`${value} is not Boolean`)
        }
    }
}

export default Bool
