
class StringTrim {

    filter(value) {
        if (typeof value === 'string') {
            return value.trim()
        }

        return value
    }
}

export default StringTrim
