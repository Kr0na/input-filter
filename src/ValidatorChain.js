import Chain from './Chain.js'
import PromiseHelper from './PromiseHelper.js'

class ValidatorChain extends Chain {

    isValid(value, context) {
        if  (this.promise) {
            return this.promise
        }
        let promises = this.chain.map(item => item.isValid(value, context))
        this.promise = PromiseHelper.catchAll(promises)

        return this.promise
    }
}

export default ValidatorChain
