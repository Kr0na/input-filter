
class PromiseHelper {
    static toPromise(value) {
        return (value && value.then) ? value : Promise.resolve(value)
    }

    static catchAll(promises) {
        return new Promise((resolve, reject) => {
            let messages = []
            promises = promises.map(PromiseHelper.toPromise).map(promise => promise.catch(message => messages.push(message)))
            Promise.all(promises).then(
                data => {
                    if (messages.length) {
                        reject(messages)
                    } else {
                        resolve(data)
                    }
                }
            )
        })
    }

    static assignRejects(promises) {
        return PromiseHelper.catchAll(promises).catch(errors => {
            let result = {}
            errors.forEach(error => {
                Object.keys(error).forEach(input => result[input] = error[input])
            })
            throw result
        })
    }

    static rejectedAll(promises) {
        return new Promise((resolve, reject) => {
            PromiseHelper.catchAll(promises).then(
                reject,
                (messages) => {
                    if (messages.length == promises.length) {
                        resolve(messages)
                    } else {
                        reject(messages)
                    }
                }
            )
        })
    }
}

export default PromiseHelper
