import Chain from './Chain.js'
import PromiseHelper from './PromiseHelper.js'

class ValidatorChain extends Chain {

    isValid(value, context) {
        if  (this.promise) {
            return this.promise
        }
        try {
            let promises = this.chain.map(item => item.isValid(value, context))
            this.promise = PromiseHelper.catchAll(promises)
        } catch(e) {
            return Promise.reject(e)
        }

        return this.promise
    }
}

export default ValidatorChain
