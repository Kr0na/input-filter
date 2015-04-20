# input-filter

InputFilter js implementation for Filtering/Validation data

#example

Filter Declaration:
``` js
import {InputFilter, Input, StringLength} from '../main.js'

class LoginFilter extends InputFilter {

    constructor() {
        super()
        let login = new Input('login')
        login.getValidation().add(new StringLength({min: 3}))
        let password = new Input('password')
        password.getValidation().add(new StringLength({min: 3}))

        this.add(login).add(password)
    }
}

export default LoginFilter
```
Usage:
```js
var validator = new LoginFilter
//Invalid data
validator.setData({login: 'aa', password: 'dd'})
validator.isValid().then(
    function() {
        console.log('valid')
    },
    function(messages) {
        console.log(messages)
    }
)
//Valid data
validator.setData({login: 'asa', password: 'asd'})
validator.isValid().then(
    function() {
        console.log('valid')
    },
    function(messages) {
        console.log(messages)
    }
)
```

#install

With [npm](npmjs.org) do:
```
npm install input-filter
```
