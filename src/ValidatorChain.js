import Chain from './Chain.js'

class ValidatorChain extends Chain {

    static toPromise(value) {
        if (value.then) {
            return value
        } else {
            return Promise.resolve(value)
        }
    }

    isValid(value, context) {
        if  (this.promise) {
            return this.promise
        }
        this.promise = new Promise((resolve, reject) => {
            let promises = []
            let messages = []
            this.chain.forEach(item => {
                promises.push(
                    ValidatorChain.toPromise(item.isValid(value, context))
                    .catch((message) => {
                        messages.push(message)
                    })
                )
            })
            Promise.all(promises).then(() => {
                if (messages.length) {
                    reject(messages)
                } else {
                    resolve(value)
                }
            })
        })

        return this.promise
    }
}

export default ValidatorChain
