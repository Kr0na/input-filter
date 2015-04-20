
class Chain {

    constuctor() {
        this.chain = []
        this.messages = {}
    }

    add(item) {
        this.chain.push(item)

        return this
    }

    getMessages() {
        return this.messages
    }
}

export default Chain
