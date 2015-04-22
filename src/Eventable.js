import PromiseHelper from './PromiseHelper.js'

class Eventable {

    constructor() {
        this.feed ={}
        this.feedCounter = 0
    }

    bind(event, listener) {
        this.feed[event] = this.feed[name] || {}
        let token = ++this.feedCounter
        this.feed[event][token] = listener
        return token
    }

    unbind(event, token) {
        if (this.feed[event] && this.feed[event][token]) {
            delete this.feed[event][token]
        } else if (process.env.NODE_ENV !== "production") {
            console.warn(`listener with token ${token} is not found for ${event} event`)
        }
    }

    trigger(event, data) {
        if (this.feed[event]) {
            let promises = Object.keys(this.feed[event])
                .map(token => this.feed[event][token](data, event))
            return PromiseHelper.catchAll(promises)
        }
        return Promise.resolve()
    }
}

export default Eventable
