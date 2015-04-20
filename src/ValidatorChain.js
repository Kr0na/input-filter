import Chain from './Chain.js'

class ValidatorChain extends Chain {

    isValid(value, context) {
        if  (this.promise) {
            return this.promise
        }
        this.promise = new Promise((resolve, reject) => {
            let promises = []
            this.chain.forEach(item => {
                promises.push(item.isValid(value, context))
            })
            Promise.all(promises).then(resolve, reject)
        })

        return this.promise
    }
}

export default ValidatorChain
