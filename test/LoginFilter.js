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
