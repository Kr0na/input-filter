import Chain from './Chain.js'

class FilterChain extends Chain {

    filter(value, context) {
        this.chain.forEach(item => {
            value = item.filter(value, context)
        })
        return value
    }
}

export default FilterChain
