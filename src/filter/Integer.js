
class Integer {

    filter(value) {
        let newValue = parseInt(value)
        if (isNaN(newValue)) {
            throw new Error(`${value} is not a Number`)
        }
        return newValue
    }
}

export default Integer
