
class Float {

    filter(value) {
        let newValue = parseFloat(value)
        if (isNaN(newValue)) {
            throw new Error(`${value} is not a Number`)
        }
        return newValue
    }
}

export default Float
