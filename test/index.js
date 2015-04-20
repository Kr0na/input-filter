require("babel/register")
var LoginFilter = require('./LoginFilter.js')

var validator = new LoginFilter
//Invalid
validator.setData({login: 'aa', password: 'dd'})
validator.isValid().then(
    function() {
        console.log('valid')
    },
    function(messages) {
        console.log(messages)
    }
)
//Valid
validator.setData({login: 'asa', password: 'asd'})
validator.isValid().then(
    function() {
        console.log('valid')
    },
    function(messages) {
        console.log(messages)
    }
)
