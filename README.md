# input-filter

InputFilter js implementation for Filtering/Validation data

## Example

### with ES6 classes
``` js
import {InputFilter, Input, StringLength} from 'input-filter'

class LoginFilter extends InputFilter {

    init() {
        let login = new Input('login')
        login.getValidation().add(new StringLength({min: 3}))
        let password = new Input('password')
        password.getValidation().add(new StringLength({min: 3}))

        this.add(login).add(password)
    }
}

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

### with InputFilter.factory
```js
import {InputFilter, StringLength, Callback} from 'input-filter'

let fooBarFilter = InputFilter.factory({
    foo: {
        required: false,
        validators: ['Date']
    },
    bar: {
        validators: [
            new StringLength({min:3}),
            new Callback((value) => {
                if (value === '***') {
                    return Promise.reject('value cannot be ***')
                }
            })
        ]
    }
})

fooBarFilter.setData({foo: "", bar: "***"}).isValid().catch((errors) => {
    console.log(errors) //{bar: ['value cannot be ***']}
})

```

## Install

With [npm](npmjs.org) do:
```
npm install input-filter
```
